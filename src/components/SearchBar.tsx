'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useState } from 'react'

export function SearchBar() {
  
  const [searchType, setSearchType] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')

  const onSearch = () => {
    //todo add logic for searching
    console.log('searching for:', searchType, searchQuery)
  }

  return (
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
  )
}