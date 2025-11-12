import React from "react";
import { Label } from "@/components/ui/label";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

export default function ContentEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (v: string) => void;
}) {
  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    if (!selectedText) return;

    const formattedText =
      format === "bold"
        ? `**${selectedText}**`
        : format === "italic"
        ? `*${selectedText}*`
        : format === "bullet"
        ? `\n- ${selectedText}`
        : format === "numbered"
        ? `\n1. ${selectedText}`
        : selectedText;

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const buttons = [
    { icon: Bold, format: "bold", title: "Bold" },
    { icon: Italic, format: "italic", title: "Italic" },
    { icon: List, format: "bullet", title: "Bullet List" },
    { icon: ListOrdered, format: "numbered", title: "Numbered List" },
  ];

  return (
    <div>
      <Label className="text-primary-text text-sm mb-2 block">Content</Label>
      <div className="flex gap-2 mb-2 p-2 bg-input-background border border-highlight rounded-t-lg">
        {buttons.map(({ icon: Icon, format, title }) => (
          <button
            key={format}
            onClick={() => applyFormatting(format)}
            className="p-2 hover:bg-highlight rounded text-primary-text"
            title={title}
            type="button"
          >
            <Icon className="w-4 h-4 text-primary-text" />
          </button>
        ))}
      </div>

      <textarea
        id="content-editor"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content here..."
        className="w-full min-h-64 p-4 bg-input-background border border-highlight rounded-b-lg text-secondary-text placeholder-primary-text resize-y"
      />
    </div>
  );
}
