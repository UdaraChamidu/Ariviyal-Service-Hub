import { MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/lib/mockData";

type MapViewProps = {
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
};

// todo: remove mock functionality - integrate with real maps API

const mockPinPositions = [
  { x: 25, y: 30 },
  { x: 45, y: 45 },
  { x: 70, y: 25 },
  { x: 60, y: 60 },
  { x: 30, y: 70 },
  { x: 80, y: 50 },
];

export function MapView({ listings, onListingClick }: MapViewProps) {
  return (
    <Card className="relative w-full h-[500px] overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30">
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M20,20 L80,20 L80,80 L20,80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            className="text-muted-foreground"
          />
          <path
            d="M30,10 L30,90 M50,10 L50,90 M70,10 L70,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-muted-foreground"
          />
          <path
            d="M10,30 L90,30 M10,50 L90,50 M10,70 L90,70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-muted-foreground"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary/30 bg-primary/10 flex items-center justify-center">
            <Navigation className="h-8 w-8 text-primary" />
          </div>
          <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            University Gate
          </Badge>
        </div>
      </div>

      {listings.slice(0, 6).map((listing, index) => {
        const pos = mockPinPositions[index];
        return (
          <button
            key={listing.id}
            onClick={() => onListingClick(listing)}
            className="absolute transform -translate-x-1/2 -translate-y-full group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            data-testid={`map-pin-${listing.id}`}
          >
            <div className="relative">
              <MapPin className="h-8 w-8 text-primary fill-primary drop-shadow-md transition-transform group-hover:scale-125" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Card className="p-2 min-w-[150px] shadow-lg">
                  <p className="text-xs font-medium line-clamp-1">{listing.title}</p>
                  <p className="text-xs text-primary font-semibold">{listing.price}</p>
                </Card>
              </div>
            </div>
          </button>
        );
      })}

      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-md p-3 shadow-md">
        <p className="text-xs text-muted-foreground mb-1">Showing</p>
        <p className="text-sm font-semibold">{listings.length} listings nearby</p>
      </div>

      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur rounded-md p-2 shadow-md">
        <p className="text-xs text-muted-foreground">Interactive map placeholder</p>
      </div>
    </Card>
  );
}
