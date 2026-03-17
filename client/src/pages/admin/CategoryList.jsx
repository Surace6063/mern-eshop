import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Edit, Trash } from "lucide-react";
import { cn } from "../../lib/utils";
import { useCategories, useDeleteCategory } from "../../api/categoryServices";
import AddCategoryDialogForm from "../../components/admin/AddCategoryDialogForm";
import UpdateCategoryDialogForm from "../../components/admin/UpdateCategoryDialogForm";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner"

const CategoryList = () => {
  const { data, isPending, error } = useCategories()
  const {mutate,isPending:isDeletePending} = useDeleteCategory()

  if (isPending) return <p>loading..</p>;
  if (error) return <p>{error.message}</p>;

  const handleDelete = (id) => {
     mutate(id,{
       onSuccess: () => {
        toast.success("Category deleted sucessfully.")
       }
     })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Category List</h1>

        <AddCategoryDialogForm />
      </div>

      <Separator className="my-6" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.categories.map((cat, index) => (
            <TableRow
              key={cat._id}
              className={cn(index % 2 === 0 ? "bg-slate-50" : "bg-white")}
            >
              <TableCell className="font-semibold text-gray-800">
                {cat._id}
              </TableCell>
              <TableCell>
                <img
                  src={cat.image.url}
                  alt={cat.name}
                  className="size-16 rounded-xl shadow object-cover object-center"
                />
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {cat.name}
              </TableCell>
              <TableCell>
                <div className="flex gap-1.5 items-center">
                  <Button variant="destructive" disabled={isDeletePending} onClick={()=>handleDelete(cat._id)}>
                   {
                    isPending ? <Spinner /> : <Trash />
                   }
                </Button>
                <UpdateCategoryDialogForm category={cat} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default CategoryList;
