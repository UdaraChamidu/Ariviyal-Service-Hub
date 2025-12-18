import { useState, useMemo, useEffect, useCallback } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingGrid } from "@/components/ListingGrid";
import { MapView } from "@/components/MapView";
import { ViewToggle } from "@/components/ViewToggle";
import { ContactModal } from "@/components/ContactModal";
import { PostAdModal } from "@/components/PostAdModal";
import { listings as mockListings, type Listing } from "@/lib/mockData";
import { getAds } from "@/lib/api";
import { Loader2, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [contactListing, setContactListing] = useState<Listing | null>(null);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [firebaseListings, setFirebaseListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const backendAds = await getAds();
      const converted: Listing[] = backendAds.map((ad: any) => ({
        id: ad.id,
        title: ad.title,
        price: `Rs. ${ad.price}`,
        priceType: ad.priceType || "month",
        location: ad.location || "",
        distance: ad.distance || "",
        rating: 0,
        reviews: 0,
        category: ad.category,
        image: ad.images && ad.images.length > 0 ? ad.images[0] : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        verified: ad.verified || false,
        phone: ad.phone || ad.contact,
        description: ad.description,
        userId: ad.userId,
        images: ad.images,
        locationLink: ad.locationLink
      }));
      setFirebaseListings(converted);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const allListings = useMemo(() => {
    return [...firebaseListings, ...mockListings];
  }, [firebaseListings]);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      const matchesCategory = !selectedCategory || listing.category.toLowerCase() === selectedCategory.toLowerCase();
      
      if (!searchQuery) return matchesCategory;
      const searchTokens = searchQuery.toLowerCase().split(" ").filter(token => token.length > 0);
      return searchTokens.every(token => 
        listing.title.toLowerCase().includes(token) ||
        listing.location.toLowerCase().includes(token) ||
        listing.category.toLowerCase().includes(token) ||
        (listing.description && listing.description.toLowerCase().includes(token))
      ) && matchesCategory;
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
          <ListingGrid 
            listings={filteredListings} 
            onContact={setContactListing} 
            onEdit={setEditingListing}
            onDelete={(id) => fetchListings()}
          />
        ) : (
          <MapView listings={filteredListings} onListingClick={setContactListing} />
        )}
      </main>

      <ContactModal
        listing={contactListing}
        open={!!contactListing}
        onClose={() => setContactListing(null)}
      />

      <PostAdModal
        open={!!editingListing}
        onClose={() => setEditingListing(null)}
        initialData={editingListing}
        onSuccess={fetchListings}
      />
    </div>
  );
}
