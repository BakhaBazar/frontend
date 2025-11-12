import React from "react";
import { Button } from "@/components/ui/button";

export default function PostButton({
  handlePost,
  isLoading,
}: {
  handlePost: () => void;
  isLoading?: boolean;
}) {
  return (
    <div className="flex justify-end">
      <Button
        onClick={handlePost}
        disabled={isLoading}
        className={`bg-secondary-button-background text-secondary-button-foreground font-semibold px-8 py-2 transition cursor-pointer ${
          isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-secondary-button-background/90"
        }`}
      >
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
