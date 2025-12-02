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

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 bg-primary rounded-md p-2 w-fit">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl">Welcome to UniHub</DialogTitle>
          <DialogDescription>
            Sign in to post ads and connect with the campus community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            data-testid="button-google-login"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SiGoogle className="h-4 w-4" />
            )}
            Sign in with Google
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
