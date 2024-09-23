'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Moon, RefreshCcw, Sun } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  const router = useRouter();
  const handleRefresh = () => {
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white bg-opacity-90 backdrop-blur shadow-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-3 md:gap-4 ml-6">
          <link rel="icon" href="/favicon.png" sizes="any" />
          {/* todo add logo here */}
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-xl font-bold hover:bg-transparent"
          >
            Sweet Home 
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
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
  )
}
