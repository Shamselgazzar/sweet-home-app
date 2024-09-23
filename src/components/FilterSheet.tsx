'use client'

import { useState } from 'react'
import { ListFilter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface FilterState {
  priceRange: [number, number]
  bedrooms: string
  bathrooms: string
  size: [number, number]
  yearBuilt: [number, number]
  amenities: string[]
}

const currentYear = new Date().getFullYear()

export function FilterSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000000],
    bedrooms: '0',
    bathrooms: '0',
    size: [0, 500],
    yearBuilt: [1900, currentYear],
    amenities: [],
  })

  const handlePriceChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: value }))
  }

  const handleSizeChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, size: value }))
  }

  const handleYearBuiltChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, yearBuilt: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleApplyFilters = () => {
    // Here you would typically update your global state or fetch filtered data
    console.log('Applying filters:', filters)
  }

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 1000000],
      bedrooms: '0',
      bathrooms: '0',
      size: [0, 500],
      yearBuilt: [1900, currentYear],
      amenities: [],
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <ListFilter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto bg-slate-100">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Adjust your search criteria</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="price-range">Price Range</Label>
            <Slider
              id="price-range"
              min={0}
              max={1000000}
              step={10000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={filters.bathrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bathrooms: value }))}>
                <SelectTrigger id="bathrooms">
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
          <div className="space-y-2">
            <Label htmlFor="size-range">Size Range (m²)</Label>
            <Slider
              id="size-range"
              min={0}
              max={500}
              step={10}
              value={filters.size}
              onValueChange={handleSizeChange}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.size[0]} m²</span>
              <span>{filters.size[1]} m²</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year-built">Year Built</Label>
            <Slider
              id="year-built"
              min={1900}
              max={currentYear}
              step={1}
              value={filters.yearBuilt}
              onValueChange={handleYearBuiltChange}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.yearBuilt[0]}</span>
              <span>{filters.yearBuilt[1]}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Parking', 'Pool', 'Gym', 'Elevator', 'Balcony', 'Security'].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Switch
                    id={`amenity-${amenity.toLowerCase()}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity.toLowerCase()}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter className="flex justify-between">
          <Button variant="outline" onClick={handleResetFilters}>
            <X className="mr-2 h-4 w-4" /> Reset
          </Button>
          <SheetClose asChild>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}