import { useState } from "react";
import { MapView } from "@/components/MapView";
import { ContactModal } from "@/components/ContactModal";
import { listings, type Listing } from "@/lib/mockData";

export default function MapPage() {
  const [contactListing, setContactListing] = useState<Listing | null>(null);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Map View</h1>
          <p className="text-muted-foreground">
            Explore services near your campus location
          </p>
        </div>

        <MapView listings={listings} onListingClick={setContactListing} />
      </div>

      <ContactModal
        listing={contactListing}
        open={!!contactListing}
        onClose={() => setContactListing(null)}
      />
    </div>
  );
}
