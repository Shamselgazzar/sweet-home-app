import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

interface Props {
    onSearch: (query: string, type: string) => void;
}

const ApartmentSearch: React.FC<Props> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('name');

    const handleSearch = () => {
        onSearch(searchQuery, searchType);
        setSearchQuery('');
    };

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                placeholder="Search apartments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={searchType} onValueChange={setSearchType}>
                <option value="name">Name</option>
                <option value="unitNumber">Unit Number</option>
                <option value="project">Project</option>
            </Select>
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default ApartmentSearch;
