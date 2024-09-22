import { useEffect, useState } from 'react';
import { fetchApartments } from '../utils/api';
import { Apartment } from '../models/Apartment';

export const useApartments = () => {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadApartments = async () => {
            const data = await fetchApartments();
            setApartments(data);
            setLoading(false);
        };
        loadApartments();
    }, []);

    return { apartments, loading };
};
