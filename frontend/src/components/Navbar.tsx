import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Menu, X, MapPin, Users, AlertTriangle, LayoutGrid, Loader2, Globe, Plus, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavbarProps = {
  onPostAdClick: () => void;
};

// ... (imports)

export function Navbar({ onPostAdClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { t, setLanguage, language } = useLanguage();

  const navLinks = [
    { href: "/", label: t("browse"), icon: LayoutGrid },
    { href: "/map", label: t("mapView"), icon: MapPin },
    { href: "/community", label: t("community"), icon: Users },
    { href: "/emergency", label: t("emergency"), icon: AlertTriangle },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-2 shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none tracking-tight">UniHub</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-secondary/5 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={`gap-2 rounded-full px-4 text-sm font-medium transition-all duration-300 ${
                    isActive(link.href) 
                      ? "bg-white dark:bg-zinc-800 shadow-sm text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${isActive(link.href) ? "text-primary" : ""}`} />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/10">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="gap-2">
                  <span className="text-lg">🇺🇸</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("si")} className="gap-2">
                  <span className="text-lg">🇱🇰</span> Sinhala
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ta")} className="gap-2">
                  <span className="text-lg">🇱🇰</span> Tamil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
            
            <Button
              onClick={onPostAdClick}
              className="hidden sm:flex rounded-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              {t("postAd")}
            </Button>

            {/* Auth Menu */}
            {isLoading ? (
              <Button variant="ghost" size="icon" disabled className="rounded-full">
                <Loader2 className="h-5 w-5 animate-spin" />
              </Button>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full p-0.5 ring-2 ring-border hover:ring-primary/50 transition-all">
                    <Avatar className="h-8 w-8">
                      {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-xs">
                        {user.displayName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <div className="px-2 py-2 mb-2 bg-secondary/10 rounded-lg">
                    <p className="font-semibold text-sm">{user.displayName || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2 my-1">
                      <User className="h-4 w-4" /> {t("profile") || "Profile"}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive gap-2">
                    <LogOut className="h-4 w-4" /> {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md border-b shadow-xl p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 h-12 text-base font-medium"
                  >
                    <div className={`p-1.5 rounded-md ${isActive(link.href) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPostAdClick();
                }}
                className="w-full mt-4 h-12 gap-2 text-base shadow-lg shadow-primary/20"
              >
                <Plus className="h-5 w-5" />
                {t("postAd")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
