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
import { Edit, Upload } from "lucide-react"
import {  useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useUpdateCategory } from "../../api/categoryServices"
import toast from "react-hot-toast"

const UpdateCategoryDialogForm = ({category}) => {
 // const [previewImage, setPreviewImage] = useState(null)
  const [open,setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver(categorySchema),
  })

  const {mutate,isPending} = useUpdateCategory()

  // add category info to input field
  useEffect(()=>{
      if(category){
        setValue("name",category.name)
      }
  },[category,setValue])

  // watch image file
  const imageFile = watch("image")
  const preview =
    imageFile && imageFile.length > 0 ? URL.createObjectURL(imageFile[0]) : null

  const handleUpdateCategory = (data) => {
    const formData = new FormData()

    formData.append("name", data.name)
    if(data?.image && data?.image?.length !== 0 ){
       formData.append("image", data.image[0])
    }

    mutate({
      id: category._id,
      payload: formData
    }, {
        onSuccess: () => {
            toast.success("Category updated sucessfully.")
            reset()
            setOpen(false)
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Error updating category!")
        }
    })
  }

  // reset form when dialog box close
  const handleClose = (isOpen) => {
    setOpen(isOpen)
    // reset()  // reset form
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button className="bg-sky-500 hover:bg-sky-500/90">
             <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
           <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-6">
            <Label htmlFor="img" className="relative h-40 border-2 border-border border-dashed flex items-center justify-center cursor-pointer">
                {
                  !preview || !category?.image &&  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Upload />
                    <p>Upload an image</p>
                 </div>
                }

                {preview ? (
                <div className="p-4">
                  <img src={preview} alt="category_img" className="absolute inset-0 w-full h-full rounded-md object-contain" />
                </div>
              ) : (
                <div className="p-4">
                  <img src={category?.image?.url} alt="category_img" className="absolute inset-0 w-full h-full rounded-md object-contain" />
                </div>
              )}

                 <Input {...register("image")} id="img" type="file" className="hidden"  />
            </Label>
           
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
          <Input {...register("name")} id="name" placeHolder="eg: men's colth" />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "updating..." : "Update Category"}
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}
export default UpdateCategoryDialogForm
