import { Button } from "@/components/ui/button";
import { Scale, Upload, MessageSquare, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-judicial py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-judicial via-judicial to-judicial/80" />
        <div className="container relative mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gold/10 px-4 py-2">
            <Scale className="mr-2 h-5 w-5 text-gold" />
            <span className="text-sm font-medium text-gold">AI-Powered Legal Analysis</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-judicial-foreground md:text-6xl lg:text-7xl">
            AI Judge System
          </h1>
          <p className="mb-8 text-xl text-judicial-foreground/80 md:text-2xl">
            Present your case, receive an impartial AI verdict, and engage in legal arguments
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/case")}
            className="bg-gold text-gold-foreground hover:bg-gold/90 text-lg px-8 py-6"
          >
            <Gavel className="mr-2 h-5 w-5" />
            Start New Case
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sideA/10">
                <Upload className="h-8 w-8 text-sideA" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                1. Submit Evidence
              </h3>
              <p className="text-muted-foreground">
                Both sides upload documents, case details, and relevant evidence to present their arguments
              </p>
            </div>

            <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <Scale className="h-8 w-8 text-gold" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                2. AI Verdict
              </h3>
              <p className="text-muted-foreground">
                Our AI, trained on legal precedents, analyzes the case and delivers an impartial verdict
              </p>
            </div>

            <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sideB/10">
                <MessageSquare className="h-8 w-8 text-sideB" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                3. Legal Arguments
              </h3>
              <p className="text-muted-foreground">
                Engage in up to 5 rounds of arguments per side to challenge and refine the verdict
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-judicial/10">
                  <Scale className="h-5 w-5 text-judicial" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Impartial AI Analysis
                </h3>
                <p className="text-muted-foreground">
                  Trained on thousands of legal precedents for fair judgments
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                  <Upload className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Multi-Format Support
                </h3>
                <p className="text-muted-foreground">
                  Upload text, PDF, Word documents, and other case materials
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideA/10">
                  <MessageSquare className="h-5 w-5 text-sideA" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Interactive Arguments
                </h3>
                <p className="text-muted-foreground">
                  Challenge the verdict with follow-up arguments and counterpoints
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideB/10">
                  <Gavel className="h-5 w-5 text-sideB" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  Mock Trial System
                </h3>
                <p className="text-muted-foreground">
                  Perfect for legal training and case preparation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            Ready to Present Your Case?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Experience the future of legal analysis with our AI Judge system
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/case")}
            className="bg-judicial text-judicial-foreground hover:bg-judicial/90 text-lg px-8 py-6"
          >
            <Gavel className="mr-2 h-5 w-5" />
            Begin Your Case
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>© 2024 AI Judge System. For educational and mock trial purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
