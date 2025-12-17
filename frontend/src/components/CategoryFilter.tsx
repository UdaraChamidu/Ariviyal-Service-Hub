import { Home, Utensils, Car, ShoppingBag, Briefcase, Shirt } from "lucide-react";
import { Card } from "@/components/ui/card";
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
            <Card
              onClick={() => onCategoryChange(null)}
              className={`flex flex-col items-center justify-center w-24 h-24 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCategory === null
                  ? "border-primary bg-primary/5 text-primary shadow-lg ring-2 ring-primary ring-offset-2"
                  : "hover:bg-muted"
              }`}
            >
              <div className="mb-2 p-2 rounded-full bg-background shadow-inner">
                <span className="text-xl font-bold">ALL</span>
              </div>
              <span className="text-sm font-medium">{t("catAll")}</span>
            </Card>

            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const isSelected = selectedCategory === category.id;
              const catKey = `cat${category.id.charAt(0).toUpperCase() + category.id.slice(1)}` as any;
              
              return (
                <Card
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex flex-col items-center justify-center w-28 h-28 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-lg ring-2 ring-primary ring-offset-2"
                      : "hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className={`mb-2 p-3 rounded-full transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
                  }`}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <span className="text-sm font-medium">{t(catKey) || category.name}</span>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </section>
  );
}
