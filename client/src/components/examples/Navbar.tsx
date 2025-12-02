import { Navbar } from "../Navbar";
import { AuthProvider } from "@/lib/AuthContext";

export default function NavbarExample() {
  return (
    <AuthProvider>
      <Navbar onPostAdClick={() => console.log("Post Ad clicked")} />
    </AuthProvider>
  );
}
