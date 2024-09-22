'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, RefreshCcw, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ApartmentCard } from './ApartmentCard'
import { ApartmentDetails } from './ApartmentDetails'
import { SearchFilters } from './SearchFilters'
import { Pagination } from './Pagination'
import { AddApartmentForm } from './AddApartmentForm'
import { Apartment } from '../types/Apartment'
import { fetchApartments } from '../lib/api'
import { ApartmentsResponse } from '../types/ApartmentsResponse'

export default function ApartmentListing() {
  const [theme, setTheme] = useState('dark')
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)


  const [apartments, setApartments] = useState<Apartment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(0)
  const [totalApartments, setTotalApartments] = useState(0)
  // const [loading, setLoading] = useState(false)
  // Fetch apartments on component mount

  useEffect(() => {
    console.log('fetching apartments')
    fetchApartments(currentPage, itemsPerPage)
      .then((response : ApartmentsResponse) => {
        console.log(response)
        setApartments(response.apartments);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setTotalApartments(response.totalApartments);
      });

  }, [currentPage]);



  const handleRefresh = async () => {
    const response = await fetchApartments(currentPage, itemsPerPage)
    setApartments(response.apartments)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-white bg-opacity-90 backdrop-blur ">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-3 md:gap-4 ml-6">
            <Home className="h-6 w-6" />
            <h1 className="text-xl font-bold">Sweet Home {totalApartments}</h1>
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
          <SearchFilters/>
        </div>
        <div className="flex justify-end mb-4">
          <AddApartmentForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
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
