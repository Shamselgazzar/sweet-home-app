import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

interface Props {
    onFilterChange: (priceRange: number[], bedroomFilter: number) => void;
}

const ApartmentFilters: React.FC<Props> = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [bedroomFilter, setBedroomFilter] = useState(0);

    const handleApplyFilters = () => {
        onFilterChange(priceRange, bedroomFilter);
    };

    return (
        <div className="grid gap-4">
            <div>
                <label>Price Range</label>
                <Slider value={priceRange} onValueChange={setPriceRange} />
                <div>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
            <div>
                <label>Bedrooms</label>
                <Select value={bedroomFilter.toString()} onValueChange={(value) => setBedroomFilter(parseInt(value))}>
                    <option value="0">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                </Select>
            </div>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
    );
};

export default ApartmentFilters;
