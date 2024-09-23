'use client'

import { Search, ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

export function SearchBar() {
  
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [bedroomFilter, setBedroomFilter] = useState(0)

  const onSearch = () => {
    console.log('searching')
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search apartments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px]"
        />
         <b>By</b>
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="unitNumber">Unit Number</SelectItem>
            <SelectItem value="project">Project</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <ListFilter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent className='bg-white'>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Adjust your search criteria</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="price-range">Price Range</Label>
              <Slider
                id="price-range"
                min={0}
                max={1000000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={bedroomFilter.toString()} onValueChange={(value) => setBedroomFilter(parseInt(value))}>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={onSearch}>Apply Filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}