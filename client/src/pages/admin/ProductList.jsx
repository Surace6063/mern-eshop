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
import { Input } from "../../components/ui/input";
import Pazination from "../../components/Pazination";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LIMIT = 5

const ProductList = () => {
  const [searchParams,setSerachParams] = useSearchParams()
  const [page,setPage] = useState(searchParams.get('page') || 1)
  const [serachValue,setSerachValue] = useState(
    searchParams.get('search') || "")


  const {data,isPending,error} = useProducts({limit:LIMIT, page})

  useEffect(()=>{
    const params = {}
    if(page) params.page = page

    setSerachParams(params)
  },[page])

  if(isPending) return <p>loading...</p>
  if(error) return <p>{error.message}</p>

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>

        <Input placeHolder="search products..." className="max-w-lg" />

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

      {/* pagination */}
      <div className="mt-6 flex justify-end">
        <Pazination setPage={setPage} pagination={data?.pagination} />
      </div>
    </div>
  );
};
export default ProductList;
