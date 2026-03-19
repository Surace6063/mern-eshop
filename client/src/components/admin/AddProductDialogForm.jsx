import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { Plus, Upload, X } from "lucide-react"
import { useCategories } from "../../api/categoryServices"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "../validations/productValidation"
import { useState } from "react"
import { useAddProduct } from "../../api/productServices"
import toast from "react-hot-toast"

const AddProductDialogForm = () => {
  const [open, setOpen] = useState(false)

  const { data } = useCategories()
  const {mutate,isPending} = useAddProduct()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(productSchema)
  })

  let images = watch("images")
  // changing above images to array
  images = images ? Array.from(images) : []

  const previewImages = images?.map((file) => URL.createObjectURL(file))

  const handleAddProduct = (data) => {
    const formData = new FormData()
    formData.append("name",data.name)
    formData.append("stock",data.stock)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("description",data.description)

    const productImages =  Array.from(data.images)

    productImages?.map(img => {
      formData.append("images",img)
    })

    mutate(formData,{
      onSuccess: () => {
        toast.success("New product added sucessfully.")
        setOpen(false)
      }
    })
  }

  const handleClose = (isOpen) => {
    setOpen(isOpen)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button>
          Add Product <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="relative flex items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer overflow-hidden">
              <div className="flex flex-col items-center text-muted-foreground gap-2">
                <Upload size={26} />
                <p className="text-sm">Upload Images</p>
              </div>

              <Input
                {...register("images")}
                multiple
                type="file"
                accept="image/*"
                className="hidden"
              />
            </Label>
            {errors?.images && (
              <p className="text-destructive text-sm">
                {errors?.images?.message}
              </p>
            )}

            {previewImages && (
              <div className="grid grid-cols-4 gap-2">
                {previewImages.map((img) => (
                  <img src={img} key={img} alt="img" className="rounded-md shadow" />
                ))}
              </div>
            )}
          </div>

          {/* Prduct Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Enter product name"
              {...register("name")}
              error={errors?.name?.message}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="cat">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>category</SelectLabel>
                  {data?.categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.category && (
              <p className="text-destructive text-sm">
                {errors?.category?.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 grid-cols-2">
            {/* stock */}
            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                {...register("stock")}
                error={errors?.stock?.message}
                type="number"
                placeholder="Enter product stock"
              />
            </div>

            {/* price */}
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                {...register("price")}
                error={errors?.price?.message}
                placeholder="Enter product price"
              />
            </div>
          </div>

          {/* description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              error={errors?.description?.message}
              placeholder="Enter product description"
            />
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" 
              disabled={isPending}>Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {
                isPending ? "adding..." : "Add Product"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default AddProductDialogForm
