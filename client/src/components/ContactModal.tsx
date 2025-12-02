import { Phone, MessageCircle, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/mockData";

type ContactModalProps = {
  listing: Listing | null;
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ listing, open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  if (!listing) return null;

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <p className="font-medium line-clamp-1">{listing.title}</p>
              <p className="text-primary font-semibold">{listing.price}/{listing.priceType}</p>
            </div>
          </div>

          <div className="bg-muted rounded-md p-4 flex items-center justify-between">
            <span className="text-lg font-mono" data-testid="text-phone-number">{listing.phone}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              data-testid="button-copy-phone"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleCall} className="gap-2" data-testid="button-call">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="gap-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
              data-testid="button-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
