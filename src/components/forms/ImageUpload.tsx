"use client";

import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function ImageUpload({
  image,
  setImage,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <Label className="text-primary-text text-sm mb-4 block">Upload Image</Label>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-1">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="bg-input-background border border-highlight text-primary-text px-4 py-2 rounded-md cursor-pointer hover:bg-highlight transition mb-2"
          >
            Browse
          </label>
          {image && (
            <p className="text-sm text-primary-text mt-4">Selected: {image.name}</p>
          )}
        </div>

        {image && (
          <div className="relative w-32 h-32 border border-highlight rounded-lg overflow-hidden shadow-md">
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
