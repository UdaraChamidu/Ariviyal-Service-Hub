import { MapPin, Star, CheckCircle, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/mockData";
import { useLanguage } from "@/lib/LanguageContext";

type ListingCardProps = {
  listing: Listing;
  onContact: (listing: Listing) => void;
};

export function ListingCard({ listing, onContact }: ListingCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50" data-testid={`card-listing-${listing.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {listing.verified && (
          <Badge className="absolute top-2 left-2 gap-1 bg-green-600/90 hover:bg-green-700 backdrop-blur-sm shadow-sm">
            <CheckCircle className="h-3 w-3" />
            {t("verified")}
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            className="w-full gap-2 bg-white/90 text-black hover:bg-white"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onContact(listing);
            }}
          >
            <Phone className="h-4 w-4" />
            {t("quickContact")}
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1 flex-1 group-hover:text-primary transition-colors" data-testid={`text-title-${listing.id}`}>
            {listing.title}
          </h3>
        </div>

        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-lg font-bold text-primary" data-testid={`text-price-${listing.id}`}>
            {listing.price}
          </span>
          <span className="text-sm text-muted-foreground">/{listing.priceType}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
          <span className="truncate">{listing.location}</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {listing.distance}
          </span>
        </div>

        {listing.rating > 0 && (
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3.5 w-3.5 ${i < Math.floor(listing.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <span className="text-sm font-medium ml-1">{listing.rating}</span>
            <span className="text-xs text-muted-foreground">({listing.reviews})</span>
          </div>
        )}

        <Button
          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant="outline"
          onClick={() => onContact(listing)}
          data-testid={`button-contact-${listing.id}`}
        >
          {t("viewDetails")}
        </Button>
      </CardContent>
    </Card>
  );
}
