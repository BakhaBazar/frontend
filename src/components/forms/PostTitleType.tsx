import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostTitleType({
  title,
  setTitle,
  type,
  setType,
}: {
  title: string;
  setTitle: (v: string) => void;
  type: string;
  setType: (v: string) => void;
}) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <Label className="text-primary-text text-sm">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          className="bg-[#2a2a2a] border border-highlight text-gray-100 mt-1 w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div className="w-40">
        <Label className="text-gray-300 text-sm">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-[#2a2a2a] border border-highlight text-gray-100 mt-1 w-full">
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border border-highlight text-gray-100">
            <SelectItem value="entity">Entity</SelectItem>
            <SelectItem value="story">Story</SelectItem>
            <SelectItem value="legend">Legend</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
