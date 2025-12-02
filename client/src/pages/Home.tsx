import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingGrid } from "@/components/ListingGrid";
import { MapView } from "@/components/MapView";
import { ViewToggle } from "@/components/ViewToggle";
import { ContactModal } from "@/components/ContactModal";
import { listings, type Listing } from "@/lib/mockData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [contactListing, setContactListing] = useState<Listing | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesCategory = !selectedCategory || listing.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">
              {selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Listings`
                : searchQuery
                ? `Results for "${searchQuery}"`
                : "All Listings"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {view === "list" ? (
          <ListingGrid listings={filteredListings} onContact={setContactListing} />
        ) : (
          <MapView listings={filteredListings} onListingClick={setContactListing} />
        )}
      </main>

      <ContactModal
        listing={contactListing}
        open={!!contactListing}
        onClose={() => setContactListing(null)}
      />
    </div>
  );
}
