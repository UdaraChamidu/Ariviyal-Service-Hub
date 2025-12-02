import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { addListing } from "@/lib/firebase";

type PostAdModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function PostAdModal({ open, onClose, onSuccess }: PostAdModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    priceType: "month",
    description: "",
    location: "",
    phone: "",
    distance: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please sign in to post an ad.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addListing({
        title: formData.title,
        category: formData.category,
        price: `Rs. ${formData.price}`,
        priceType: formData.priceType,
        description: formData.description,
        location: formData.location,
        distance: formData.distance || "Near campus",
        phone: formData.phone,
        image: imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        verified: user.emailVerified || false,
        rating: 0,
        reviews: 0,
        userId: user.uid,
        userEmail: user.email || "",
      });
      
      toast({
        title: "Ad Posted Successfully!",
        description: "Your listing is now live and visible to students.",
      });
      
      setFormData({
        title: "",
        category: "",
        price: "",
        priceType: "month",
        description: "",
        location: "",
        phone: "",
        distance: "",
      });
      setImageUrl("");
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Error posting ad:", error);
      toast({
        title: "Failed to post ad",
        description: error?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Ad</DialogTitle>
          <DialogDescription>
            Create a listing to reach students near campus
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Spacious Single Room near Campus"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              data-testid="input-ad-title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceType">Price Type</Label>
              <Select
                value={formData.priceType}
                onValueChange={(value) => setFormData({ ...formData, priceType: value })}
              >
                <SelectTrigger data-testid="select-price-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Per Month</SelectItem>
                  <SelectItem value="meal">Per Meal</SelectItem>
                  <SelectItem value="trip">Per Trip</SelectItem>
                  <SelectItem value="hour">Per Hour</SelectItem>
                  <SelectItem value="once">One-time</SelectItem>
                  <SelectItem value="load">Per Load</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.)</Label>
            <Input
              id="price"
              type="number"
              placeholder="8500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              data-testid="input-price"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Wijemanne Road"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                data-testid="input-location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance to Gate</Label>
              <Input
                id="distance"
                placeholder="e.g., 500m to gate"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                data-testid="input-distance"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your listing in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              data-testid="input-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              data-testid="input-image-url"
            />
            {imageUrl && (
              <div className="relative w-full h-32 rounded-md overflow-hidden mt-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageUrl("")}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setImageUrl("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting || !formData.category} data-testid="button-submit-ad">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                "Post Ad"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
