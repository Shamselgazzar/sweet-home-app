import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Apartment } from '../types/Apartment'

interface ApartmentCardProps {
  apartment: Apartment;
  onViewDetails: (apartment: Apartment) => void;
}

export function ApartmentCard({ apartment, onViewDetails }: ApartmentCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{apartment.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={apartment.images[0]}
          alt={apartment.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <p className="text-sm text-muted-foreground mb-2">Unit: {apartment.unitNumber}</p>
        <p className="text-sm text-muted-foreground mb-2">Project: {apartment.project}</p>
        <p className="font-semibold mb-2">${apartment.price.toLocaleString()}</p>
        <p className="text-sm line-clamp-2">{apartment.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewDetails(apartment)} className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}