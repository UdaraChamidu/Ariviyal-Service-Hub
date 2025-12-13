import { useLanguage } from "@/lib/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export function LanguageSelector() {
  const { setLanguage, hasSelectedLanguage } = useLanguage();

  if (hasSelectedLanguage) return null;

  return (
    <Dialog open={!hasSelectedLanguage}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border shadow-2xl [&>button]:hidden">
        <div className="bg-primary/5 p-8 text-center border-b">
          <div className="mx-auto mb-4 bg-background rounded-full p-3 w-fit shadow-sm ring-1 ring-border">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Welcome to UniHub</DialogTitle>
          <p className="text-muted-foreground">Please select your preferred language</p>
        </div>

        <div className="p-8 grid gap-4">
          <Button 
            variant="outline" 
            className="h-14 text-lg font-medium hover:border-primary hover:bg-primary/5"
            onClick={() => setLanguage("en")}
          >
            English
          </Button>
          <Button 
            variant="outline" 
            className="h-14 text-lg font-medium hover:border-primary hover:bg-primary/5 font-sinhala"
            onClick={() => setLanguage("si")}
          >
            සිංහල (Sinhala)
          </Button>
          <Button 
            variant="outline" 
            className="h-14 text-lg font-medium hover:border-primary hover:bg-primary/5 font-tamil"
            onClick={() => setLanguage("ta")}
          >
            தமிழ் (Tamil)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
