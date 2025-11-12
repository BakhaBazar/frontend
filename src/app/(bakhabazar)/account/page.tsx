"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AccountView() {
  const [fullName] = useState("John Doe");
  const [dob] = useState("January 15, 1990");
  const [avatarUrl, setAvatarUrl] = useState("/icons/scary.png");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-10 px-6 text-white flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Account</h1>

        <div className="flex flex-col sm:flex-row justify-center items-start gap-10">
          <div className="flex flex-col space-y-4 w-full sm:w-1/2">
            <div>
              <Label className="text-gray-400 text-sm">Full Name</Label>
              <Input
                value={fullName}
                disabled
                className="bg-zinc-800 border-zinc-700 text-white mt-1"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Date of Birth</Label>
              <Input
                value={dob}
                disabled
                className="bg-zinc-800 border-zinc-700 text-white mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-start w-full sm:w-1/2">
            <label
              htmlFor="avatar-upload"
              className="relative cursor-pointer group"
            >
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl} alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm text-gray-200 transition-opacity">
                Change
              </div>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}