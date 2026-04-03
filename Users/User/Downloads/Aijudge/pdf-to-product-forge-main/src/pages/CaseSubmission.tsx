import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Scale, Upload, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CaseSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sideAText, setSideAText] = useState("");
  const [sideBText, setSideBText] = useState("");
  const [sideAFiles, setSideAFiles] = useState<File[]>([]);
  const [sideBFiles, setSideBFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (side: "A" | "B", files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    
    if (side === "A") {
      setSideAFiles(prev => [...prev, ...fileArray]);
    } else {
      setSideBFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeFile = (side: "A" | "B", index: number) => {
    if (side === "A") {
      setSideAFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setSideBFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!sideAText.trim() && sideAFiles.length === 0) {
      toast({
        title: "Side A Required",
        description: "Please provide case details for Side A",
        variant: "destructive",
      });
      return;
    }

    if (!sideBText.trim() && sideBFiles.length === 0) {
      toast({
        title: "Side B Required",
        description: "Please provide case details for Side B",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const caseData = {
        sideA: { text: sideAText, files: sideAFiles.map(f => f.name) },
        sideB: { text: sideBText, files: sideBFiles.map(f => f.name) },
      };
      
      sessionStorage.setItem("currentCase", JSON.stringify(caseData));
      navigate("/verdict");
    }, 2000);
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
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Submit Your Case</h1>
          <p className="text-lg text-muted-foreground">
            Both sides present their evidence and arguments
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Side A */}
          <Card className="border-2 border-sideA/20 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideA text-sideA-foreground">
                A
              </div>
              <h2 className="text-2xl font-bold text-foreground">Side A - Plaintiff</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Case Details
                </label>
                <Textarea
                  placeholder="Enter case details, arguments, and evidence for Side A..."
                  value={sideAText}
                  onChange={(e) => setSideAText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Upload Documents
                </label>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:bg-muted/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Click to upload files
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => handleFileUpload("A", e.target.files)}
                    />
                  </label>

                  {sideAFiles.length > 0 && (
                    <div className="space-y-2">
                      {sideAFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-muted p-3"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{file.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile("A", index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Side B */}
          <Card className="border-2 border-sideB/20 p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sideB text-sideB-foreground">
                B
              </div>
              <h2 className="text-2xl font-bold text-foreground">Side B - Defendant</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Case Details
                </label>
                <Textarea
                  placeholder="Enter case details, arguments, and evidence for Side B..."
                  value={sideBText}
                  onChange={(e) => setSideBText(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Upload Documents
                </label>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:bg-muted/50">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Click to upload files
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => handleFileUpload("B", e.target.files)}
                    />
                  </label>

                  {sideBFiles.length > 0 && (
                    <div className="space-y-2">
                      {sideBFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-muted p-3"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{file.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile("B", index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-judicial text-judicial-foreground hover:bg-judicial/90 px-12 py-6 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Case...
              </>
            ) : (
              <>
                <Scale className="mr-2 h-5 w-5" />
                Submit to AI Judge
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseSubmission;
