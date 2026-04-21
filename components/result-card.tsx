"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionResult } from "@/lib/classifier";

interface ResultCardProps {
  result: PredictionResult;
  confidenceThreshold: number;
}

export function ResultCard({ result, confidenceThreshold }: ResultCardProps) {
  const { topPrediction } = result;
  const isConfident = topPrediction.confidence >= confidenceThreshold;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-colors",
        isConfident
          ? "border-primary/30 bg-primary/5"
          : "border-yellow-500/30 bg-yellow-500/5"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl",
            isConfident ? "bg-primary/20" : "bg-yellow-500/20"
          )}
        >
          {isConfident ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Prediction</p>
          <h3 className="text-xl font-semibold text-foreground mt-0.5">
            {topPrediction.className}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isConfident ? "bg-primary" : "bg-yellow-500"
                )}
                style={{ width: `${topPrediction.confidence}%` }}
              />
            </div>
            <span
              className={cn(
                "text-sm font-mono font-semibold",
                isConfident ? "text-primary" : "text-yellow-600"
              )}
            >
              {topPrediction.confidence.toFixed(1)}%
            </span>
          </div>
          {!isConfident && (
            <p className="text-sm text-yellow-600 mt-3">
              Confidence is below threshold. Try uploading a clearer image.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
