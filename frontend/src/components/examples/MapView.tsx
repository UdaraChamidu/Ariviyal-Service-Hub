import { MapView } from "../MapView";
import { listings } from "@/lib/mockData";

export default function MapViewExample() {
  return (
    <MapView 
      listings={listings} 
      onListingClick={(listing) => console.log("Clicked:", listing.title)} 
    />
  );
}
