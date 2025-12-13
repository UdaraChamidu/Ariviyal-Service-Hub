import { useState } from "react";
import { PostAdModal } from "../PostAdModal";
import { Button } from "@/components/ui/button";

export default function PostAdModalExample() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Post Ad Modal</Button>
      <PostAdModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
