import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Apartment } from '../types/apartment'

interface AddApartmentFormProps {
  onAddApartment: (apartment: Partial<Apartment>) => void;
}

export function AddApartmentForm({ onAddApartment }: AddApartmentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newApartment = Object.fromEntries(formData.entries())
    onAddApartment(newApartment as Partial<Apartment>)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Apartment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Apartment</DialogTitle>
          <DialogDescription>Enter the details of the new apartment listing.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unitNumber" className="text-right">Unit Number</Label>
              <Input id="unitNumber" name="unitNumber" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right">Project</Label>
              <Input id="project" name="project" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" name="description" className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Apartment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}