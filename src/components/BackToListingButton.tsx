import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function BackToListingButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.push('/')}
      className="mb-4 bg-primary text-secondary"
    >
      <ChevronLeft className="mr-2 h-4 w-4" /> Back to Listings
    </Button>
  );
}
