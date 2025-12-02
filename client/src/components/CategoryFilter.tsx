import { Home, Utensils, Car, ShoppingBag, Briefcase, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/lib/mockData";

const iconMap: Record<string, typeof Home> = {
  Home,
  Utensils,
  Car,
  ShoppingBag,
  Briefcase,
  Shirt,
};

type CategoryFilterProps = {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
};

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-4 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => onCategoryChange(null)}
              className="flex-shrink-0"
              data-testid="button-category-all"
            >
              All
            </Button>
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const isSelected = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onCategoryChange(category.id)}
                  className="flex-shrink-0 gap-2"
                  data-testid={`button-category-${category.id}`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {category.name}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
