'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchApartment } from '@/lib/api';
import { Apartment } from '@/types/Apartment';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bed, Bath, Square, Calendar, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BackToListingButton } from '@/components/BackToListingButton';

const ApartmentDetailsPage = () => {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;
    fetchApartment(id as string).then((data) => {
      setApartment(data);
      setActiveImage(data.images[0]);
    });
  }, [id]);

  if (!apartment) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <div className="flex justify-end">
          <BackToListingButton />
        </div>
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
        <div className="flex justify-end">
          <BackToListingButton />
        </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex justify-center items-center">
            <CardTitle className="text-3xl font-bold">{apartment.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <Image
                  src={activeImage || apartment.images[0]}
                  alt={apartment.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {apartment.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-24 cursor-pointer overflow-hidden rounded-md ${
                      activeImage === image ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${apartment.name} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Apartment Details */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                 <p><strong>Unit Number:</strong> {apartment.unitNumber}</p>
                <p><strong>Project:</strong> {apartment.project}</p>
                <p><strong>Price:</strong> ${apartment.price.toLocaleString()}</p>
                
              </div>
              <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{apartment.location}</span>
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Bed className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{apartment.rooms} Rooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{apartment.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{apartment.size} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Built in {apartment.yearBuilt}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-muted-foreground">{apartment.description}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Additional Details</h3>
                <p className="text-muted-foreground">{apartment.moreDetails}</p>
              </div>
              <div className="flex space-x-2 justify-center ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className='rounded-full bg-gray-200'>
                        <Phone className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Call Agent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className='rounded-full bg-gray-200'>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email Agent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className='rounded-full bg-gray-200'>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Message Agent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApartmentDetailsPage;