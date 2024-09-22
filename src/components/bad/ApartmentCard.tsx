import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Apartment {
  _id: string;
  name: string;
  unitNumber: string;
  project: string;
  price: number;
  images: string[];
}

const ApartmentCard = ({ apartment }: { apartment: Apartment }) => {
  return (
    <Card key={apartment._id} className="flex flex-col justify-between">
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
      </CardContent>
    </Card>
  )
}

export default ApartmentCard
