'use client'
import { SearchBar } from '../components/SearchBar'
import { FilterSheet } from '../components/FilterSheet'
import { ApartmentList } from '../components/ApartmentList'

export default function Page() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-6">

        <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8 pt-2">
          <SearchBar/>
          <FilterSheet />
        </div>

        <ApartmentList />
      </main>
    </div>
  )
}
