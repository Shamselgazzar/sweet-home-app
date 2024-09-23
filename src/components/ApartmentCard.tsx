import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Apartment } from '../types/Apartment';
import { useRouter } from 'next/navigation';


interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const router = useRouter();
  const navigateToDetails = () => router.push(`/apartments/${apartment._id}`);

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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <p className="text-sm text-muted-foreground mb-2">Unit: {apartment.unitNumber}</p>
        <p className="text-sm text-muted-foreground mb-2">Project: {apartment.project}</p>
        <p className="font-semibold mb-2">${apartment.price.toLocaleString()}</p>
        <p className="text-sm line-clamp-2">{apartment.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={navigateToDetails} className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}