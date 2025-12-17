import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

type HeroSectionProps = {
  onSearch: (query: string) => void;
};

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-fade-in" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-fade-in delay-700" />

      <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
        <div className="animate-slide-up space-y-6" style={{ animationDelay: "0.1s" }}>
          <Badge variant="secondary" className="mb-4 animate-in fade-in zoom-in duration-500">
            For University Students
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            {t("heroTitle")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t("heroTitleHighlight")}
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>

        <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
            <div className="relative flex items-center p-2 rounded-full border-2 border-border/50 shadow-lg bg-background/80 backdrop-blur-sm transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary/50 hover:shadow-xl hover:scale-[1.01]">
              <Search className="absolute left-6 h-6 w-6 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-12 h-14 text-lg border-0 shadow-none focus-visible:ring-0 bg-transparent rounded-full truncate"
                data-testid="input-search"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-36 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <Button 
                type="submit" 
                size="lg" 
                className="hidden sm:flex absolute right-2 h-12 px-8 rounded-full text-base font-semibold shadow-md transition-all hover:scale-105 active:scale-95" 
                data-testid="button-search"
              >
                {t("searchButton")}
              </Button>
            </div>
            {/* Mobile Search Button */}
            <Button 
              type="submit" 
              className="w-full mt-4 sm:hidden h-12 rounded-full font-semibold shadow-lg"
            >
              {t("searchButton")}
            </Button>
          </form>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <span className="font-medium py-1.5">{t("trending")}:</span>
          {[
            { label: "Boarding Places", query: "Boarding" },
            { label: "Lunch Packets", query: "Lunch" },
            { label: "Tuk Rides", query: "Tuk" },
            { label: "Used Books", query: "Books" }
          ].map((item) => (
            <Badge
              key={item.label}
              variant="outline"
              onClick={() => {
                setSearchQuery(item.query);
                onSearch(item.query);
              }}
              className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-all px-4 py-1.5 text-sm font-normal"
            >
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
