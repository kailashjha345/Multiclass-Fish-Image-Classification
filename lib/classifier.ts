// Fish species class names from the original model
export const CLASS_NAMES = [
  "Fish",
  "Fish Bass",
  "Black Sea Sprat",
  "Gilt Head Bream",
  "Horse Mackerel",
  "Red Mullet",
  "Red Sea Bream",
  "Sea Bass",
  "Shrimp",
  "Striped Red Mullet",
  "Trout",
] as const;

export type FishClass = (typeof CLASS_NAMES)[number];

export interface ClassificationResult {
  className: FishClass;
  confidence: number;
}

export interface PredictionResult {
  topPrediction: ClassificationResult;
  allPredictions: ClassificationResult[];
}

// Simulate classification - in production, this would call an ML model API
export async function classifyImage(
  imageData: string
): Promise<PredictionResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate simulated predictions
  // In production, replace this with actual TensorFlow.js inference or API call
  const rawScores = CLASS_NAMES.map(() => Math.random());
  const sum = rawScores.reduce((a, b) => a + b, 0);
  const normalizedScores = rawScores.map((score) => score / sum);

  // Boost one random class to make results more realistic
  const boostedIndex = Math.floor(Math.random() * CLASS_NAMES.length);
  normalizedScores[boostedIndex] += 0.3;
  const boostedSum = normalizedScores.reduce((a, b) => a + b, 0);
  const finalScores = normalizedScores.map((score) => score / boostedSum);

  const allPredictions: ClassificationResult[] = CLASS_NAMES.map(
    (className, index) => ({
      className,
      confidence: finalScores[index] * 100,
    })
  ).sort((a, b) => b.confidence - a.confidence);

  return {
    topPrediction: allPredictions[0],
    allPredictions,
  };
}
