import { ListingGrid } from "../ListingGrid";
import { listings } from "@/lib/mockData";

export default function ListingGridExample() {
  return (
    <div className="p-4">
      <ListingGrid 
        listings={listings.slice(0, 3)} 
        onContact={(listing) => console.log("Contact:", listing.title)} 
      />
    </div>
  );
}
