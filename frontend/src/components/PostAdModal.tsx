import { useState, useEffect } from "react";
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
import { categories, type Listing } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { createAd, updateAd } from "@/lib/api";
import { useLanguage } from "@/lib/LanguageContext";

type PostAdModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: Listing | null;
};

export function PostAdModal({ open, onClose, onSuccess, initialData }: PostAdModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    priceType: "month",
    description: "",
    location: "",
    locationLink: "",
    phone: "",
    distance: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category.toLowerCase(),
        price: initialData.price.replace(/[^0-9.]/g, ''),
        priceType: initialData.priceType,
        description: initialData.description || "",
        location: initialData.location,
        locationLink: initialData.locationLink || "",
        phone: initialData.phone,
        distance: initialData.distance,
      });
      setImageUrls(initialData.images || (initialData.image ? [initialData.image] : []));
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        priceType: "month",
        description: "",
        location: "",
        locationLink: "",
        phone: "",
        distance: "",
      });
      setImageUrls([]);
    }
  }, [initialData, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
          const url = URL.createObjectURL(file);
          newUrls.push(url);
          await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setImageUrls((prev) => [...prev, ...newUrls]);
      toast({ title: "Images uploaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: "Failed to upload images", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const removeImageField = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

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
      const validImages = imageUrls.filter(url => url.trim() !== "");
      
      const payload = {
        title: formData.title || "Untitled Listing",
        category: formData.category.toUpperCase(),
        price: parseFloat(formData.price),
        priceType: formData.priceType,
        description: formData.description,
        location: formData.location,
        locationLink: formData.locationLink,
        distance: formData.distance || "",
        phone: formData.phone,
        images: validImages,
        latitude: 0, 
        longitude: 0,
      };

      const token = localStorage.getItem("token") || "";

      if (initialData) {
        await updateAd(initialData.id, payload, token);
        toast({
          title: "Ad Updated Successfully!",
          description: "Your listing has been updated.",
        });
      } else {
        await createAd(payload, token);
        toast({
          title: "Ad Posted Successfully!",
          description: "Your listing is now live.",
        });
      }
      
      setFormData({
        title: "",
        category: "",
        price: "",
        priceType: "month",
        description: "",
        location: "",
        locationLink: "",
        phone: "",
        distance: "",
      });
      setImageUrls([]);
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Error saving ad:", error);
      toast({
        title: "Failed to save ad",
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
            <DialogTitle className="text-2xl font-bold text-center">
              {initialData ? "Edit Ad" : t("postAdTitle")}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {initialData ? "Update your listing details below" : t("postAdDescription")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">{t("labelTitle")} (Optional)</Label>
              <Input
                id="title"
                placeholder="e.g., Spacious Single Room near Campus"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-11 text-base"
                data-testid="input-ad-title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="font-semibold">{t("labelCategory")} *</Label>
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
                  <Label htmlFor="priceType" className="font-semibold">{t("labelPriceType")}</Label>
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
              <Label htmlFor="price" className="font-semibold">{t("labelPrice")} *</Label>
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
                <Label htmlFor="location" className="font-semibold">{t("labelLocation")} *</Label>
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
                <Label htmlFor="distance" className="font-semibold">{t("labelDistance")} (Optional)</Label>
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
              <Label htmlFor="locationLink" className="font-semibold">Location Link (Google Maps) (Optional)</Label>
              <Input
                id="locationLink"
                type="url"
                placeholder="https://maps.google.com/..."
                value={formData.locationLink}
                onChange={(e) => setFormData({ ...formData, locationLink: e.target.value })}
                className="h-11"
                data-testid="input-location-link"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold">{t("labelPhone")} *</Label>
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
              <Label htmlFor="description" className="font-semibold">{t("labelDescription")} (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe your listing..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="resize-none"
                data-testid="input-description"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">{t("labelImage")}s (Optional)</Label>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading || imageUrls.length >= 5}
                    className="cursor-pointer"
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>

                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                        <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImageField(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  Upload up to 5 images. Supported formats: JPG, PNG.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t mt-6">
            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
              {t("buttonCancel")}
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting || !formData.category} data-testid="button-submit-ad">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {initialData ? "Updating..." : "Posting..."}
                </>
              ) : (
                initialData ? "Update Ad" : t("buttonPost")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
