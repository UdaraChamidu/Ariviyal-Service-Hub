import { MapPin, Star, CheckCircle, Phone, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/mockData";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { toggleListingLike } from "@/lib/firebase";
import { deleteAd } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type ListingCardProps = {
  listing: Listing;
  onContact: (listing: Listing) => void;
  onEdit?: (listing: Listing) => void;
  onDelete?: (id: string) => void;
};

export function ListingCard({ listing, onContact, onEdit, onDelete }: ListingCardProps) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user && listing.likes) {
      setIsLiked(listing.likes.includes(user.id));
    } else {
      setIsLiked(false);
    }
  }, [user, listing.likes]);

  const displayImage = listing.images?.[0] || listing.image;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to watch listings.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Optimistic update
      setIsLiked(!isLiked);
      await toggleListingLike(listing.id, user.id);
    } catch (error) {
      // Revert on error
      setIsLiked(!isLiked);
      toast({
        title: "Error",
        description: "Failed to update watch status.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this ad? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAd(listing.id, localStorage.getItem("token") || "");
      toast({
        title: "Ad deleted",
        description: "Your ad has been successfully removed.",
      });
      onDelete?.(listing.id);
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete ad.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  const isOwner = user?.id === listing.userId;

  if (isDeleting) return null; 

  return (
    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/40 bg-card/50 backdrop-blur-sm" data-testid={`card-listing-${listing.id}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={displayImage}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.verified && (
            <Badge className="bg-emerald-500/90 hover:bg-emerald-600 backdrop-blur-md shadow-lg border-0 text-white gap-1 px-2.5 py-1">
              <CheckCircle className="h-3 w-3" />
              {t("verified")}
            </Badge>
          )}
          <Badge variant="secondary" className="backdrop-blur-md shadow-lg border-0 bg-white/90 text-primary dark:bg-zinc-800/90 font-semibold px-2.5 py-1">
            {listing.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          {isOwner && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-lg bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(listing);
                }}
              >
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full shadow-lg"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="icon"
            className={`rounded-full shadow-lg bg-white/90 dark:bg-zinc-800/90 ${isOwner ? '' : 'opacity-0 group-hover:opacity-100 transition-all duration-300'}`}
            onClick={handleLike}
            disabled={isLoading}
          >
            <Star className={`h-4 w-4 ${isLiked ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          </Button>
        </div>
        
        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <Button
            className="pointer-events-auto rounded-full px-6 shadow-xl bg-white text-black hover:bg-white/90 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              onContact(listing);
            }}
          >
            {t("viewDetails")} <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Bottom Price Tag */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-baseline gap-1.5 drop-shadow-md">
            <span className="text-xl font-bold">{listing.price}</span>
            <span className="text-sm text-white/90 opacity-90 font-medium">/{listing.priceType}</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-2">
            {listing.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary/60" />
            <span className="truncate font-medium">{listing.location}</span>
            <span className="mx-1">•</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary-foreground font-semibold">
              {listing.distance}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3.5 w-3.5 ${i < Math.floor(listing.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted/20 text-muted/20"}`} 
              />
            ))}
            <span className="text-xs font-semibold ml-1.5 text-muted-foreground">
              {listing.rating} ({listing.reviews})
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs font-semibold text-primary hover:bg-primary/5 hover:text-primary transition-colors rounded-full"
            onClick={() => onContact(listing)}
          >
            <Phone className="h-3 w-3 mr-1.5" />
            {t("contact")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
