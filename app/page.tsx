import { Header } from "@/components/header";
import { FishClassifier } from "@/components/fish-classifier";
import { SpeciesList } from "@/components/species-list";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground text-balance">
              Identify Fish Species with AI
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-pretty">
              Upload an image of a fish and our AI model will classify it among
              11 different species with confidence scores for each prediction.
            </p>
          </div>

          <FishClassifier />

          <div className="mt-8">
            <SpeciesList />
          </div>
        </div>
      </main>
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          Fish Classification App - Powered by Machine Learning
        </div>
      </footer>
    </div>
  );
}
