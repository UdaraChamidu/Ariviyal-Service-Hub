import { useState } from "react";
import { CategoryFilter } from "../CategoryFilter";

export default function CategoryFilterExample() {
  const [selected, setSelected] = useState<string | null>(null);
  return <CategoryFilter selectedCategory={selected} onCategoryChange={setSelected} />;
}
