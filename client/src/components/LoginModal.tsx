import { useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/LanguageContext";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Welcome to UniHub!",
        description: "You've successfully signed in.",
      });
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Sign in failed",
        description: error?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        <div className="bg-primary/5 p-8 text-center border-b">
          <div className="mx-auto mb-4 bg-background rounded-full p-3 w-fit shadow-sm ring-1 ring-border">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">{t("welcomeTitle")}</DialogTitle>
          <DialogDescription className="text-base max-w-xs mx-auto">
            {t("welcomeDescription")}
          </DialogDescription>
        </div>

        <div className="p-8 space-y-6">
          <Button
            variant="outline"
            className="w-full h-12 gap-3 text-base font-medium hover:bg-secondary/50 transition-all hover:border-primary/30"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            data-testid="button-google-login"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <SiGoogle className="h-5 w-5" />
            )}
            {t("continueGoogle")}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t("secureAuth")}
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground px-4">
            {t("agreeText")} <span className="underline hover:text-primary cursor-pointer">{t("terms")}</span> {t("and")} <span className="underline hover:text-primary cursor-pointer">{t("privacy")}</span>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
