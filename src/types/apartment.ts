export interface Apartment {
  _id?: string;
  name: string;
  unitNumber: string;
  project: string;
  price: number;
  location: string;
  description: string;
  moreDetails?: string;
  images: string[];
  rooms: number;
  bathrooms: number;
  size: number;
  yearBuilt: number;
  available: boolean;
}
