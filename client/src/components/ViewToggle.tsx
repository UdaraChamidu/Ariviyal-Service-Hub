import { LayoutGrid, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewToggleProps = {
  view: "list" | "map";
  onViewChange: (view: "list" | "map") => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-muted rounded-md p-1">
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className="gap-2"
        data-testid="button-view-list"
      >
        <LayoutGrid className="h-4 w-4" />
        List
      </Button>
      <Button
        variant={view === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("map")}
        className="gap-2"
        data-testid="button-view-map"
      >
        <Map className="h-4 w-4" />
        Map
      </Button>
    </div>
  );
}
