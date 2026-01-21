import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analyzer } from "@/components/analyzer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="flex-1 container px-4 py-8 mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            AI-driven tillgänglighetsanalys
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Analysera webbsidor och kod för WCAG 2.1 AA-efterlevnad.
            Få konkreta åtgärdsförslag på sekunder.
          </p>
        </div>
        <Analyzer />
      </main>
      <Footer />
    </div>
  );
}
