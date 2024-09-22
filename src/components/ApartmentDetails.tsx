import Image from 'next/image'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Apartment } from '../types/apartment';

interface ApartmentDetailsProps {
  apartment: Apartment | null;
  onClose: () => void;
}

export function ApartmentDetails({ apartment, onClose }: ApartmentDetailsProps) {
  if (!apartment) return null;

  return (
    <Dialog open={!!apartment} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle>{apartment.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="grid gap-2">
                <p><strong>Unit Number:</strong> {apartment.unitNumber}</p>
                <p><strong>Project:</strong> {apartment.project}</p>
                <p><strong>Price:</strong> ${apartment.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {apartment.location}</p>
                <p><strong>Rooms:</strong> {apartment.rooms}</p>
                <p><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
                <p><strong>Size:</strong> {apartment.size} sq ft</p>
                <p><strong>Year Built:</strong> {apartment.yearBuilt}</p>
                <p><strong>Description:</strong> {apartment.description}</p>
                <p><strong>More Details:</strong> {apartment.moreDetails}</p>
              </div>
            </TabsContent>
            <TabsContent value="gallery">
              <div className="grid grid-cols-2 gap-4">
                {apartment.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${apartment.name} - Image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}