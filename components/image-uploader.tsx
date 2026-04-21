"use client";

import { useCallback, useState } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (imageData: string, file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
  isProcessing: boolean;
}

export function ImageUploader({
  onImageSelect,
  selectedImage,
  onClear,
  isProcessing,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelect(result, file);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (selectedImage) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border bg-card">
        <img
          src={selectedImage}
          alt="Selected fish"
          className="w-full h-64 object-contain bg-muted"
        />
        {!isProcessing && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/90 hover:bg-card text-foreground shadow-lg transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 bg-card"
      )}
    >
      <label className="flex flex-col items-center justify-center gap-4 p-8 cursor-pointer">
        <div
          className={cn(
            "flex items-center justify-center w-16 h-16 rounded-2xl transition-colors",
            isDragging ? "bg-primary/20" : "bg-secondary"
          )}
        >
          {isDragging ? (
            <ImageIcon className="w-8 h-8 text-primary" />
          ) : (
            <Upload className="w-8 h-8 text-secondary-foreground" />
          )}
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">
            {isDragging ? "Drop your image here" : "Upload a fish image"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports JPG, PNG, JPEG
          </p>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload fish image"
        />
      </label>
    </div>
  );
}
