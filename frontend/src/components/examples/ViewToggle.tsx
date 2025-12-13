import { useState } from "react";
import { ViewToggle } from "../ViewToggle";

export default function ViewToggleExample() {
  const [view, setView] = useState<"list" | "map">("list");
  return <ViewToggle view={view} onViewChange={setView} />;
}
