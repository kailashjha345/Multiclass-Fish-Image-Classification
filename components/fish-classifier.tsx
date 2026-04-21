"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { ConfidenceSlider } from "./confidence-slider";
import { ResultCard } from "./result-card";
import { ProbabilityChart } from "./probability-chart";
import { classifyImage, type PredictionResult } from "@/lib/classifier";

export function FishClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleImageSelect = useCallback(
    async (imageData: string, file: File) => {
      setSelectedImage(imageData);
      setSelectedFile(file);
      setIsProcessing(true);
      setResult(null);

      try {
        const prediction = await classifyImage(imageData);
        setResult(prediction);
      } catch (error) {
        console.error("Classification failed:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <ImageUploader
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          onClear={handleClear}
          isProcessing={isProcessing}
        />

        {selectedFile && (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">File</p>
            <p className="text-foreground font-medium truncate">
              {selectedFile.name}
            </p>
          </div>
        )}

        <ConfidenceSlider
          value={confidenceThreshold}
          onChange={setConfidenceThreshold}
        />
      </div>

      <div className="space-y-6">
        {isProcessing && (
          <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Analyzing image...</p>
          </div>
        )}

        {result && !isProcessing && (
          <>
            <ResultCard
              result={result}
              confidenceThreshold={confidenceThreshold}
            />
            <ProbabilityChart predictions={result.allPredictions} />
          </>
        )}

        {!selectedImage && !isProcessing && (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 flex flex-col items-center justify-center gap-3 h-64">
            <p className="text-muted-foreground text-center">
              Upload an image to see classification results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
