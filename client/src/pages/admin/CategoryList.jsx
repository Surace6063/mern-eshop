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
import { Edit, Plus, Trash } from "lucide-react";
import { cn } from "../../lib/utils";
import { useCategories } from "../../api/categoryServices";

const CategoryList = () => {
  const { data: categories, isPending, error } = useCategories();

  if (isPending) return <p>loading..</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Category List</h1>

        <Button>
          Add Category <Plus />
        </Button>
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
          {categories.map((cat, index) => (
            <TableRow
              key={cat.id}
              className={cn(index % 2 === 0 ? "bg-slate-50" : "bg-white")}
            >
              <TableCell className="font-semibold text-gray-800">
                {cat.id}
              </TableCell>
              <TableCell>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="size-16 rounded-xl shadow object-cover object-center"
                />
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {cat.name}
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="destructive">
                  <Trash />
                </Button>
                <Button className="bg-sky-600 hover:bg-sky-600/80">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default CategoryList;
