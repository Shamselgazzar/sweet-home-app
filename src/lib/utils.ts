import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Apartment } from "../types/Apartment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createApartment(): Apartment {
  return {
    name: "",
    unitNumber: "",
    project: "",
    price: 0,
    location: "",
    description: "",
    moreDetails: "",
    images: [],
    rooms: 0,
    bathrooms: 0,
    size: 0,
    yearBuilt: 0,
    available: false,
  }
}
