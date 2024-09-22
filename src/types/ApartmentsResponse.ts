import { Apartment } from "./Apartment";

export interface ApartmentsResponse {
    apartments: Apartment[];
    currentPage: number;
    totalPages: number;
    totalApartments: number;
}
