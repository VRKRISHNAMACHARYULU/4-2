import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Scale, Loader2, Send, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  side: "A" | "B" | "judge";
  content: string;
  timestamp: Date;
}

const Verdict = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verdict, setVerdict] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [argumentsA, setArgumentsA] = useState<Message[]>([]);
  const [argumentsB, setArgumentsB] = useState<Message[]>([]);
  const [currentArgumentA, setCurrentArgumentA] = useState("");
  const [currentArgumentB, setCurrentArgumentB] = useState("");
  const [argumentCountA, setArgumentCountA] = useState(0);
  const [argumentCountB, setArgumentCountB] = useState(0);
  const MAX_ARGUMENTS = 5;

  useEffect(() => {
    const caseData = sessionStorage.getItem("currentCase");
    if (!caseData) {
      navigate("/case");
      return;
    }

    // Simulate AI processing
    setTimeout(() => {
      setVerdict(
        "After careful analysis of the evidence and arguments presented by both sides, " +
        "the court finds merit in the arguments of Side A. The documentation provided demonstrates " +
        "a clear chain of evidence supporting their claims. However, Side B has raised valid counterpoints " +
        "regarding procedural matters that warrant consideration. The verdict is rendered in favor of Side A, " +
        "with recommendations for both parties to engage in further discussion on the procedural concerns raised."
      );
      setIsLoading(false);
    }, 3000);
  }, [navigate]);

  const submitArgument = async (side: "A" | "B") => {
    const argument = side === "A" ? currentArgumentA : currentArgumentB;
    const count = side === "A" ? argumentCountA : argumentCountB;

    if (!argument.trim()) {
      toast({
        title: "Empty Argument",
        description: "Please enter an argument before submitting",
        variant: "destructive",
      });
      return;
    }

    if (count >= MAX_ARGUMENTS) {
      toast({
        title: "Argument Limit Reached",
        description: `Side ${side} has reached the maximum of ${MAX_ARGUMENTS} arguments`,
        variant: "destructive",
      });
      return;
    }

    const newMessage: Message = {
      side,
      content: argument,
      timestamp: new Date(),
    };

    // Simulate AI response
    const aiResponse: Message = {
      side: "judge",
      content: `The court acknowledges Side ${side}'s argument. This perspective provides valuable insight into ${
        side === "A" ? "the plaintiff's position" : "the defendant's defense"
      }. After reconsidering in light of this new information, the court ${
        Math.random() > 0.5 ? "maintains" : "adjusts"
      } its previous assessment.`,
      timestamp: new Date(),
    };

    if (side === "A") {
      setArgumentsA([...argumentsA, newMessage, aiResponse]);
      setCurrentArgumentA("");
      setArgumentCountA(count + 1);
    } else {
      setArgumentsB([...argumentsB, newMessage, aiResponse]);
      setCurrentArgumentB("");
      setArgumentCountB(count + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-judicial" />
            <span className="text-xl font-bold text-foreground">AI Judge</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Verdict Section */}
        <Card className="mb-8 border-2 border-gold/30 bg-gradient-to-br from-card to-gold/5 p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-gold-foreground">
              <Scale className="h-10 w-10" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-3xl font-bold text-foreground">AI Judge Verdict</h1>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-gold" />
              <p className="text-lg text-muted-foreground">Analyzing case details...</p>
            </div>
          ) : (
            <div className="rounded-lg bg-background/50 p-6">
              <p className="text-lg leading-relaxed text-foreground">{verdict}</p>
            </div>
          )}
        </Card>

        {!isLoading && (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground">Arguments Phase</h2>
              <p className="text-muted-foreground">
                Each side may present up to {MAX_ARGUMENTS} follow-up arguments
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Side A Arguments */}
              <Card className="border-2 border-sideA/20 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideA text-sideA-foreground">
                      A
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Side A Arguments</h3>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {argumentCountA}/{MAX_ARGUMENTS}
                  </span>
                </div>

                <div className="mb-4 max-h-[400px] space-y-3 overflow-y-auto">
                  {argumentsA.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 ${
                        msg.side === "judge"
                          ? "bg-gold/10 border border-gold/30"
                          : "bg-sideA/10 border border-sideA/30"
                      }`}
                    >
                      <div className="mb-1 text-xs font-semibold text-muted-foreground">
                        {msg.side === "judge" ? "AI Judge" : "Side A"}
                      </div>
                      <p className="text-sm text-foreground">{msg.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter your argument..."
                    value={currentArgumentA}
                    onChange={(e) => setCurrentArgumentA(e.target.value)}
                    disabled={argumentCountA >= MAX_ARGUMENTS}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={() => submitArgument("A")}
                    disabled={argumentCountA >= MAX_ARGUMENTS}
                    className="w-full bg-sideA text-sideA-foreground hover:bg-sideA/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Argument
                  </Button>
                </div>
              </Card>

              {/* Side B Arguments */}
              <Card className="border-2 border-sideB/20 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideB text-sideB-foreground">
                      B
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Side B Arguments</h3>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {argumentCountB}/{MAX_ARGUMENTS}
                  </span>
                </div>

                <div className="mb-4 max-h-[400px] space-y-3 overflow-y-auto">
                  {argumentsB.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 ${
                        msg.side === "judge"
                          ? "bg-gold/10 border border-gold/30"
                          : "bg-sideB/10 border border-sideB/30"
                      }`}
                    >
                      <div className="mb-1 text-xs font-semibold text-muted-foreground">
                        {msg.side === "judge" ? "AI Judge" : "Side B"}
                      </div>
                      <p className="text-sm text-foreground">{msg.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter your argument..."
                    value={currentArgumentB}
                    onChange={(e) => setCurrentArgumentB(e.target.value)}
                    disabled={argumentCountB >= MAX_ARGUMENTS}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={() => submitArgument("B")}
                    disabled={argumentCountB >= MAX_ARGUMENTS}
                    className="w-full bg-sideB text-sideB-foreground hover:bg-sideB/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Argument
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Verdict;
