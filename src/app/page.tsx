import { SearchBar } from '../components/SearchBar'
import { ApartmentList } from '../components/ApartmentList'

export default function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-6">

        <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8 pt-2">
          <SearchBar/>
        </div>

        <hr className="block sm:hidden border-t border-muted-foreground my-4" />

        <ApartmentList />

      </main>
    </div>
  )
}
