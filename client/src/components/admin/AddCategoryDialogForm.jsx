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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { yupResolver } from "@hookform/resolvers/yup"
import { Plus, Upload } from "lucide-react"
import {  useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useAddCategory } from "../../api/categoryServices"
import toast from "react-hot-toast"

const categorySchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters"),

  image: yup
    .mixed()
    .required("Image is required")
})

const AddCategoryDialogForm = () => {
  // const [previewImage, setPreviewImage] = useState(null)
  const [open,setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(categorySchema)
  })

  const {mutate,isPending} = useAddCategory()

  // watch image file
  const imageFile = watch("image")
  const preview =
    imageFile && imageFile.length > 0 ? URL.createObjectURL(imageFile[0]) : null

  const handleAddCategory = (data) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("image", data.image[0])

    mutate(formData, {
        onSuccess: () => {
            toast.success("New category added sucessfully.")
            reset()
            setOpen(false)
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Error adding category!")
        }
    })
  }

  // reset form when dialog box close
  const handleClose = (isOpen) => {
    setOpen(isOpen)
    reset()  // reset form
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button>
          Add Category <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-6">
            <Label
              htmlFor="img"
              className="h-40 border-2 border-border border-dashed flex items-center justify-center cursor-pointer relative"
            >
              {preview ? (
                <div className="p-4">
                  <img src={preview} alt="category_img" className="absolute inset-0 w-full h-full rounded-md object-contain" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Upload />
                  <p>Upload an image</p>
                </div>
              )}

              <Input
                {...register("image")}
                id="img"
                type="file"
                className="hidden"
              />
            
            </Label>
              {
                errors?.image && <p className="text-destructive text-sm">{errors.image.message}</p>
              }
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              id="name"
              placeHolder="eg: men's colth"
              error={errors?.name?.message}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
                {
                    isPending ? "adding..." : "Add Category"
                }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default AddCategoryDialogForm
