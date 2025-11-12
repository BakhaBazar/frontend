"use client";
import React, { useState } from "react";
import PostTitleType from "@/components/forms/PostTitleType";
import EntitySelector from "@/components/forms/EntitySelector";
import ImageUpload from "@/components/forms/ImageUpload";
import ContentEditor from "@/components/forms/ContentEditor";
import PostButton from "@/components/forms/PostButton";
import Cookies from "js-cookie";
import { toast } from "sonner"


export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const csrfToken = Cookies.get("csrftoken");
  const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

  // 🔹 Select endpoint based on type
  const getEndpoint = (type: string) => {
    switch (type) {
      case "story":
        return `${API_BASE_URL}/api/save/story/`;
      case "legend":
        return `${API_BASE_URL}/api/save/legend/`;
      case "entity":
        return `${API_BASE_URL}/api/save/entity/`;
      default:
        return `${API_BASE_URL}/api/save/story/`; // fallback
    }
  };

  const handlePost = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      console.log("Selected Entities:", selectedEntities);

      if (type === "entity") {
        // Entity-specific fields
        formData.append("name", title);
        formData.append("content", content);
      } else {
        // Story/Legend fields
        formData.append("title", title);
        formData.append("content", content);
        formData.append("entities", JSON.stringify(selectedEntities));
      }

      if (image) {
        formData.append("picture", image);
      }

      const endpoint = getEndpoint(type);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server error:", errorData);
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Post successful:", data);
      toast.success("Post Created Successfully");

      // reset form
      setTitle("");
      setType("");
      setContent("");
      setSelectedEntities([]);
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px] p-6 h-[calc(100vh-16rem)] overflow-y-auto scroll-smooth px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Create Podcast</h1>

      <div className="flex flex-col space-y-6">
        <PostTitleType title={title} setTitle={setTitle} type={type} setType={setType} />

        {type !== "entity" && (
          <EntitySelector
            selectedEntities={selectedEntities}
            setSelectedEntities={setSelectedEntities}
          />
        )}

        <ImageUpload image={image} setImage={setImage} />
        <ContentEditor content={content} setContent={setContent} />
        <PostButton handlePost={handlePost} isLoading={isLoading} />
      </div>
    </div>
  );
}
