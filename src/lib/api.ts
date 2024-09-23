'use server'
import { API_BASE_URL } from '../../environment';
import { Apartment } from '../types/Apartment';
import { ApartmentsResponse } from '../types/ApartmentsResponse';

export const fetchApartments = async (page: number = 1, limit: number = 6): Promise<ApartmentsResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/apartments?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

export const fetchApartment = async (id: string): Promise<Apartment> => {
    const response = await fetch(`${API_BASE_URL}/api/apartments/` + id);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

export const addApartment = async (apartment: Partial<Apartment>): Promise<Apartment> => {
    const response = await fetch(`${API_BASE_URL}/api/apartments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apartment),
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

