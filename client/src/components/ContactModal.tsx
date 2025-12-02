import { Phone, MessageCircle, Copy, CheckCircle, MapPin, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Listing } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";
import { addReview, getReviews, type Review } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

type ContactModalProps = {
  listing: Listing | null;
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ listing, open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load reviews when listing changes
  // useEffect(() => {
  //   if (listing) {
  //     getReviews(listing.id).then(setReviews);
  //   }
  // }, [listing]);

  if (!listing) return null;

  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.image];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(listing.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = () => {
    window.location.href = `tel:${listing.phone.replace(/\s/g, "")}`;
  };

  const handleWhatsApp = () => {
    const cleanPhone = listing.phone.replace(/[^0-9+]/g, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({ title: "Please sign in to review", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }

    try {
      await addReview({
        listingId: listing.id,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        rating,
        comment: newReview,
      });
      toast({ title: "Review submitted!" });
      setNewReview("");
      setRating(0);
      // Reload reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({ title: "Failed to submit review", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 flex flex-col gap-0">
        <div className="relative h-64 md:h-80 bg-black/5">
          <img
            src={images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-contain"
          />
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="text-xl font-bold text-primary">
                  {listing.price}/{listing.priceType}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{listing.rating}</span>
                  <span>({listing.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {listing.description || "No description provided."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
                      {listing.distance}
                    </span>
                  </div>
                  {listing.locationLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(listing.locationLink, "_blank")}
                    >
                      <MapPin className="h-4 w-4" />
                      View on Google Maps
                    </Button>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Reviews</h3>
                  <div className="space-y-4">
                    {/* Review Form */}
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <p className="font-medium text-sm">Write a review</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-5 w-5 cursor-pointer ${
                              s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                            onClick={() => setRating(s)}
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="Share your experience..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button size="sm" onClick={handleSubmitReview} disabled={!rating || !newReview}>
                        Post Review
                      </Button>
                    </div>

                    {/* Reviews List (Placeholder) */}
                    {reviews.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic">No reviews yet.</p>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{review.userName}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 space-y-4">
                <div className="p-4 border rounded-lg bg-card sticky top-0">
                  <h3 className="font-semibold mb-4">Contact Seller</h3>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-md p-3 flex items-center justify-between">
                      <span className="font-mono font-medium">{listing.phone}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button className="w-full gap-2" onClick={handleCall}>
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-green-600 text-green-600 hover:bg-green-50"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
