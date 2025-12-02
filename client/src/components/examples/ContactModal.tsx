import { useState } from "react";
import { ContactModal } from "../ContactModal";
import { Button } from "@/components/ui/button";
import { listings } from "@/lib/mockData";

export default function ContactModalExample() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Contact Modal</Button>
      <ContactModal listing={listings[0]} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
