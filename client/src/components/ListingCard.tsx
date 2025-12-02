import { MapPin, Star, CheckCircle, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/mockData";

type ListingCardProps = {
  listing: Listing;
  onContact: (listing: Listing) => void;
};

export function ListingCard({ listing, onContact }: ListingCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group" data-testid={`card-listing-${listing.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {listing.verified && (
          <Badge className="absolute top-2 left-2 gap-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-2 flex-1" data-testid={`text-title-${listing.id}`}>
            {listing.title}
          </h3>
        </div>

        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-lg font-bold text-primary" data-testid={`text-price-${listing.id}`}>
            {listing.price}
          </span>
          <span className="text-sm text-muted-foreground">/{listing.priceType}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{listing.location}</span>
          <span className="text-xs">- {listing.distance}</span>
        </div>

        {listing.rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{listing.rating}</span>
            <span className="text-sm text-muted-foreground">({listing.reviews} reviews)</span>
          </div>
        )}

        <Button
          className="w-full gap-2"
          variant="outline"
          onClick={() => onContact(listing)}
          data-testid={`button-contact-${listing.id}`}
        >
          <Phone className="h-4 w-4" />
          Contact
        </Button>
      </CardContent>
    </Card>
  );
}
