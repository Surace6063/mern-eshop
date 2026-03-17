import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Edit, Upload } from "lucide-react"
import { useCategories } from "../../api/categoryServices"


const UpdateProductDialogForm = () => {
  const { data } = useCategories()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-sky-500 hover:bg-sky-500/80">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <form className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="relative flex items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer overflow-hidden">
              <div className="flex flex-col items-center text-muted-foreground gap-2">
                <Upload size={26} />
                <p className="text-sm">Upload Images</p>
              </div>

              <Input multiple type="file" accept="image/*" className="hidden" />
            </Label>
          </div>

          {/* Prduct Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="Enter product name" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="cat">Category</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>category</SelectLabel>
                  {
                    data?.categories?.map(cat =>(
                        <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                        </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 grid-cols-2">
             {/* stock */}
          <div className="space-y-2">
            <Label>Stock</Label>
            <Input type="number" placeholder="Enter product stock" />
          </div>

           {/* price */}
          <div className="space-y-2">
            <Label>Price</Label>
            <Input placeholder="Enter product price" />
          </div>
          </div>
          
          {/* description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter product description"  />
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Update Products</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateProductDialogForm
