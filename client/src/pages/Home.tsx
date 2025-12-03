import { useState, useMemo, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingGrid } from "@/components/ListingGrid";
import { MapView } from "@/components/MapView";
import { ViewToggle } from "@/components/ViewToggle";
import { ContactModal } from "@/components/ContactModal";
import { listings as mockListings, type Listing } from "@/lib/mockData";
import { getListings, type FirebaseListing } from "@/lib/firebase";
import { Loader2, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [contactListing, setContactListing] = useState<Listing | null>(null);
  const [firebaseListings, setFirebaseListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fbListings = await getListings();
        const converted: Listing[] = fbListings.map((fb) => ({
          id: fb.id || "",
          title: fb.title,
          price: fb.price,
          priceType: fb.priceType,
          location: fb.location,
          distance: fb.distance,
          rating: fb.rating,
          reviews: fb.reviews,
          category: fb.category,
          image: fb.image,
          verified: fb.verified,
          phone: fb.phone,
          description: fb.description,
        }));
        setFirebaseListings(converted);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const allListings = useMemo(() => {
    return [...firebaseListings, ...mockListings];
  }, [firebaseListings]);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      const matchesCategory = !selectedCategory || listing.category === selectedCategory;
      
      if (!searchQuery) return matchesCategory;

      const searchTokens = searchQuery.toLowerCase().split(" ").filter(token => token.length > 0);
      
      const matchesSearch = searchTokens.every(token => {
        return (
          listing.title.toLowerCase().includes(token) ||
          listing.location.toLowerCase().includes(token) ||
          listing.category.toLowerCase().includes(token) ||
          (listing.description && listing.description.toLowerCase().includes(token))
        );
      });

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allListings]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const getCategoryName = (catId: string) => {
    const key = `cat${catId.charAt(0).toUpperCase() + catId.slice(1)}` as any;
    return t(key) || catId;
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
            <h2 className="text-xl font-semibold flex items-center gap-3">
              {selectedCategory
                ? `${getCategoryName(selectedCategory)}`
                : searchQuery
                ? (
                  <>
                    {`${t("resultsFor")} "${searchQuery}"`}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleSearch("")}
                      className="h-8 px-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </>
                )
                : t("allListings")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {t("loadingListings")}
                </span>
              ) : (
                `${filteredListings.length} ${t("listingsFound")}`
              )}
            </p>
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : view === "list" ? (
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
