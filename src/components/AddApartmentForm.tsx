import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Apartment } from '../types/Apartment'
import { addApartment } from '../lib/api'



export function AddApartmentForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newApartment = Object.fromEntries(formData.entries())
    handleAddApartment(newApartment as Partial<Apartment>)
  }

  const handleAddApartment = (newApartment: Partial<Apartment>) => {
    const apartment = {
      ...newApartment,
      images: ['/placeholder.svg'],
      available: true,
    } as Apartment

    addApartment(apartment).then(() => {
      // TODO: handle success by adding a notifaction to the user by a toast
      console.log('Apartment added successfully')
    }).catch((error) => {
      // TODO: handle error by adding a notifaction to the user by a toast
      console.error('Error adding apartment:', error)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Apartment</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
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
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input id="location" name="location" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rooms" className="text-right">Rooms</Label>
              <Input id="rooms" name="rooms" type="number" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">Size (square meters)</Label>
              <Input id="size" name="size" type="number" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" name="description" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="moreDetails" className="text-right">More Details</Label>
              <Input id="moreDetails" name="moreDetails" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Apartment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}