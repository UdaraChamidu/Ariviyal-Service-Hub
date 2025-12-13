import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocation } from "wouter";
import { ListingGrid } from "@/components/ListingGrid";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Heart, List, MessageSquare } from "lucide-react";
import { 
  getUserListings, 
  getUserLikedListings, 
  getUserReviews, 
  type FirebaseListing, 
  type Review 
} from "@/lib/firebase";
import { type Listing } from "@/lib/mockData";

export default function Profile() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [_, setLocation] = useLocation();
  
  const [activeTab, setActiveTab] = useState("listings");
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [likedListings, setLikedListings] = useState<Listing[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contactListing, setContactListing] = useState<Listing | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [authLoading, isAuthenticated, setLocation]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch user's listings
        const userListingsData = await getUserListings(user.uid);
        setMyListings(convertListings(userListingsData));

        // Fetch liked listings
        const likedListingsData = await getUserLikedListings(user.uid);
        setLikedListings(convertListings(likedListingsData));

        // Fetch user's reviews
        const userReviewsData = await getUserReviews(user.uid);
        setMyReviews(userReviewsData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const convertListings = (fbListings: FirebaseListing[]): Listing[] => {
    return fbListings.map((fb) => ({
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
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {user.displayName?.charAt(0) || user.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{user.displayName || "User"}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex gap-4 text-sm text-muted-foreground mt-2 justify-center md:justify-start">
              <div className="flex items-center gap-1">
                <List className="h-4 w-4" />
                <span>{myListings.length} Listings</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{likedListings.length} Likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{myReviews.length} Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto md:mx-0">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="likes">Liked Items</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myListings.length > 0 ? (
              <ListingGrid listings={myListings} onContact={setContactListing} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>You haven't posted any listings yet.</p>
                <Button variant="outline" className="mt-2">Post an Ad</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="likes" className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : likedListings.length > 0 ? (
              <ListingGrid listings={likedListings} onContact={setContactListing} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>You haven't liked any listings yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
             {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myReviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myReviews.map((review) => (
                  <div key={review.id} className="bg-card p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-lg">{review.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.createdAt?.toDate?.().toLocaleDateString() || "Recent"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>You haven't written any reviews yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <ContactModal
        listing={contactListing}
        open={!!contactListing}
        onClose={() => setContactListing(null)}
      />
    </div>
  );
}
