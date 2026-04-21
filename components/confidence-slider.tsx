"use client";

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor="confidence"
          className="text-sm font-medium text-foreground"
        >
          Confidence Threshold
        </label>
        <span className="text-sm font-mono text-primary font-semibold">
          {value}%
        </span>
      </div>
      <input
        id="confidence"
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
