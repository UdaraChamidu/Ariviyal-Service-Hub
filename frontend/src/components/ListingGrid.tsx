import { ListingCard } from "./ListingCard";
import type { Listing } from "@/lib/mockData";

type ListingGridProps = {
  listings: Listing[];
  onContact: (listing: Listing) => void;
};

export function ListingGrid({ listings, onContact }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No listings found. Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onContact={onContact}
        />
      ))}
    </div>
  );
}
