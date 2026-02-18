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
import { useProducts } from "../../api/productServices";
import { cn } from "../../lib/utils";

const LIMIT = 5

const ProductList = () => {
  const {data,isPending,error} = useProducts({limit:LIMIT})

  if(isPending) return <p>loading...</p>
  if(error) return <p>{error.message}</p>

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>

        <Button>
          Add Product <Plus />
        </Button>
      </div>

      <Separator className="my-6" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {
              data.products.map((item,index) => (
                <TableRow key={item._id} className={cn(
                  index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                )}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <img src={item.images[0].url} alt={item.name} className="size-16 rounded-xl shadow object-cover" />
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    {item.category.name}
                  </TableCell>
                  <TableCell className="text-primary font-semibold">
                    ${item.price}
                  </TableCell>
                  <TableCell>
                    {item.stock}
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
              ))
            }
        </TableBody>
      </Table>
    </div>
  );
};
export default ProductList;
