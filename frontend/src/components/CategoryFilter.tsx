import { Home, Utensils, Car, ShoppingBag, Briefcase, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/lib/mockData";
import { useLanguage } from "@/lib/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section className="py-8 border-b bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4">
            <button
              onClick={() => onCategoryChange(null)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 transition-all duration-300 ${
                selectedCategory === null
                  ? "border-primary bg-primary/5 text-primary shadow-lg scale-105"
                  : "border-transparent bg-white dark:bg-zinc-800 text-muted-foreground hover:bg-muted hover:scale-105 shadow-sm"
              }`}
            >
              <div className="mb-2 p-2 rounded-full bg-background shadow-inner">
                <span className="text-xl font-bold">ALL</span>
              </div>
              <span className="text-sm font-medium">{t("catAll")}</span>
            </button>

            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const isSelected = selectedCategory === category.id;
              const catKey = `cat${category.id.charAt(0).toUpperCase() + category.id.slice(1)}` as any;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex flex-col items-center justify-center w-28 h-28 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-lg scale-105"
                      : "border-transparent bg-white dark:bg-zinc-800 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105 shadow-sm"
                  }`}
                >
                  <div className={`mb-2 p-3 rounded-full transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
                  }`}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <span className="text-sm font-medium">{t(catKey) || category.name}</span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </section>
  );
}
