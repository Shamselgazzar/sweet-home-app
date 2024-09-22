import { Apartment } from '../models/Apartment';

export const fetchApartments = async (): Promise<Apartment[]> => {
    const response = await fetch('localhost:5000/api/apartments'); // Update with actual API endpoint
    return response.json();
};
