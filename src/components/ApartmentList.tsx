'use client'

import { useState, useEffect } from 'react'
import { Pagination } from './Pagination'
import { fetchApartments } from '../lib/api'
import { ApartmentsResponse } from '../types/ApartmentsResponse'
import { Apartment } from '../types/apartment'
import { ApartmentCard } from './ApartmentCard'
import { Skeleton } from '@/components/ui/skeleton'
import { AddApartmentForm } from './AddApartmentForm'

export function ApartmentList() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(0)
  const [totalApartments, setTotalApartments] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchApartments(currentPage, itemsPerPage)
      .then((response: ApartmentsResponse) => {
        setApartments(response.apartments)
        setTotalPages(response.totalPages)
        setCurrentPage(response.currentPage)
        setTotalApartments(response.totalApartments)
        setIsLoading(false)
      }).catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }, [currentPage, itemsPerPage])

  const ApartmentSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-60 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )

  return (
    <main>
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8 pt-2 ">
        <p><b>Apartments: </b> {isLoading ? '...' : `${totalApartments} results`}</p>
        <AddApartmentForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(itemsPerPage).fill(0).map((_, index) => (
              <ApartmentSkeleton key={index} />
            ))
          : apartments.map((apartment) => (
              <ApartmentCard
                key={apartment._id}
                apartment={apartment}
              />
            ))
        }
      </div>
      
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  )
}