'use client'

import { useState, useEffect } from 'react'

import { SearchFilters } from '../components/SearchFilters'
import { Pagination } from '../components/Pagination'
import { AddApartmentForm } from '../components/AddApartmentForm'
import { fetchApartments } from '../lib/api'
import { ApartmentsResponse } from '../types/ApartmentsResponse'
import { Apartment } from '../types/apartment'
import { ApartmentCard } from '../components/ApartmentCard'


export default function Page() {

  const [apartments, setApartments] = useState<Apartment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(0)
  const [totalApartments, setTotalApartments] = useState(0)

  useEffect(() => {
    fetchApartments(currentPage, itemsPerPage)
      .then((response : ApartmentsResponse) => {
        setApartments(response.apartments);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setTotalApartments(response.totalApartments);
      }).catch((error) => console.error(error));
  }, [currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <SearchFilters/>
        </div>
        <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8 pt-2 ">
          <p><b>Apartments: </b> {totalApartments} results</p>
          <AddApartmentForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <ApartmentCard
              key={apartment._id}
              apartment={apartment}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  )
}
