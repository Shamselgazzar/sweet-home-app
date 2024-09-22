'use client'

import { useState } from 'react'
import { Moon, Sun, RefreshCcw, Home } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { ApartmentCard } from './ApartmentCard'
import { ApartmentDetails } from './ApartmentDetails'
import { SearchFilters } from './SearchFilters'
import { Pagination } from './Pagination'
import { AddApartmentForm } from './AddApartmentForm'
import { Apartment } from '../types/apartment'
import { testApartments } from '../data/testApartments'

export default function ApartmentListing() {
  const { theme, setTheme } = useTheme()
  const [apartments, setApartments] = useState(testApartments)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [bedroomFilter, setBedroomFilter] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const handleSearch = () => {
    // const filtered = testApartments.filter(apt => 
    //   apt[searchType].toLowerCase().includes(searchQuery.toLowerCase()) &&
    //   apt.price >= priceRange[0] && apt.price <= priceRange[1] &&
    //   (bedroomFilter === 0 || apt.rooms === bedroomFilter)
    // )
    // setApartments(filtered)
    // setCurrentPage(1)

  }

  const handleRefresh = () => {
    setApartments(testApartments)
    setSearchQuery('')
    setPriceRange([0, 1000000])
    setBedroomFilter(0)
    setCurrentPage(1)
  }

  const handleAddApartment = (newApartment: Partial<Apartment>) => {
    const apartmentWithId = {
      ...newApartment,
      _id: (apartments.length + 1).toString(),
      images: ['/placeholder.svg'],
      available: true,
    } as Apartment
    setApartments([...apartments, apartmentWithId])
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentApartments = apartments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(apartments.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-3 md:gap-4 ml-6">
          <Home className="h-6 w-6" />
          <h1 className="text-xl font-bold">Sweet Home</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleRefresh}>
                <RefreshCcw className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Refresh</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchType={searchType}
            setSearchType={setSearchType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            bedroomFilter={bedroomFilter}
            setBedroomFilter={setBedroomFilter}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex justify-end mb-4">
          <AddApartmentForm onAddApartment={handleAddApartment} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentApartments.map((apartment) => (
            <ApartmentCard
              key={apartment._id}
              apartment={apartment}
              onViewDetails={setSelectedApartment}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <ApartmentDetails
        apartment={selectedApartment}
        onClose={() => setSelectedApartment(null)}
      />
    </div>
  )
  
}