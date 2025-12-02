import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onSearch: (query: string) => void;
};

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Everything a Student Needs,{" "}
            <span className="text-primary">In One Place.</span>
          </h1>
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for university life. Find boarding, food, transport, and academic resources—all connected to your campus.
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <div className="relative flex gap-2 p-1 rounded-full border shadow-sm hover:shadow-md transition-shadow bg-card">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-0 shadow-none focus-visible:ring-0 bg-transparent rounded-full"
                  data-testid="input-search"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 rounded-full" data-testid="button-search">
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <span className="font-medium py-1">Trending:</span>
          {["Boarding Places", "Lunch Packets", "Tuk Rides", "Used Books"].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                onSearch(term);
              }}
              className="px-3 py-1 rounded-full bg-secondary/50 hover:bg-secondary hover:text-foreground transition-colors"
              data-testid={`link-popular-${term.toLowerCase().replace(/ & /g, "-").replace(" ", "-")}`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
