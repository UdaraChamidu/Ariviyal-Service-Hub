import { ListingCard } from "../ListingCard";
import { listings } from "@/lib/mockData";

export default function ListingCardExample() {
  return (
    <div className="max-w-sm">
      <ListingCard 
        listing={listings[0]} 
        onContact={(listing) => console.log("Contact:", listing.title)} 
      />
    </div>
  );
}
