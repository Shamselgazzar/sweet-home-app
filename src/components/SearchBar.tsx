'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function SearchBar() {
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')

  const onSearch = () => {
    console.log('searching for:', searchType, searchQuery)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-grow">
          <Label htmlFor="search-input" className="sr-only">Search apartments</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search-input"
              type="text"
              placeholder="Search apartments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="search-type" className="whitespace-nowrap font-medium">
            Search by:
          </Label>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger id="search-type" className="w-[140px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="unitNumber">Unit Number</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onSearch} className={cn(
          "w-full sm:w-auto",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "transition-colors duration-200"
        )}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  )
}