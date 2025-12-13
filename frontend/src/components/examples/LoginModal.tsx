import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { AuthProvider } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";

export default function LoginModalExample() {
  const [open, setOpen] = useState(true);
  return (
    <AuthProvider>
      <Button onClick={() => setOpen(true)}>Open Login Modal</Button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </AuthProvider>
  );
}
