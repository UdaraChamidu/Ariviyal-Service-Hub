import { useState } from "react";
import { Upload, Loader2, X, Info, Image as ImageIcon } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-card border-border shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6 border-b bg-muted/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Post a New Ad</DialogTitle>
            <DialogDescription className="text-center text-base">
              Share your listing with the university community
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Spacious Single Room near Campus"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="h-11 text-base"
                data-testid="input-ad-title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-semibold">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="h-11" data-testid="select-category">
                    <SelectValue placeholder="Select Category" />
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
                <div className="flex items-center gap-2">
                  <Label htmlFor="priceType" className="font-semibold">Price Type</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How is the price calculated?</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={formData.priceType}
                  onValueChange={(value) => setFormData({ ...formData, priceType: value })}
                >
                  <SelectTrigger className="h-11" data-testid="select-price-type">
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
              <Label htmlFor="price" className="font-semibold">Price (Rs.)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rs.</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="8500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="pl-10 h-11"
                  data-testid="input-price"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Wijemanne Road"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="h-11"
                  data-testid="input-location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance" className="font-semibold">Distance to Gate</Label>
                <Input
                  id="distance"
                  placeholder="e.g., 500m to gate"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="h-11"
                  data-testid="input-distance"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold">Contact Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+94 77 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-11"
                data-testid="input-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your listing in detail... Mention key features, rules, or availability."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="resize-none"
                data-testid="input-description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="font-semibold">Image URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="h-11 flex-1"
                  data-testid="input-image-url"
                />
              </div>
              
              {imageUrl ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden mt-3 border bg-muted/20 group">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImageUrl("")}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setImageUrl("")}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground bg-muted/10 mt-2">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Enter an image URL to see a preview</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t mt-6">
            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting || !formData.category} data-testid="button-submit-ad">
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
