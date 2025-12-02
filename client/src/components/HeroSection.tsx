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
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/5" />
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Everything a Student Needs,{" "}
          <span className="text-primary">In One Place.</span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Find boarding, food delivery, tuk-tuks, and sold textbooks nearby.
        </p>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for boarding, food, transport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
                data-testid="input-search"
              />
            </div>
            <Button type="submit" size="lg" data-testid="button-search">
              Search
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span>Popular:</span>
          {["Single Room", "Rice & Curry", "Tuk-tuk", "Textbooks"].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                onSearch(term);
              }}
              className="hover:text-primary transition-colors"
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
