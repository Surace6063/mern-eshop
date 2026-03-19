import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Separator } from "../../components/ui/separator"
import { Button } from "../../components/ui/button"
import {  Trash } from "lucide-react"
import { useDeleteProduct, useProducts } from "../../api/productServices"
import { cn } from "../../lib/utils"
import { Input } from "../../components/ui/input"
import Pazination from "../../components/Pazination"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import AddProductDialogForm from "../../components/admin/AddProductDialogForm"
import UpdateProductDialogForm from "../../components/admin/UpdateProductDialogForm"
import toast from "react-hot-toast"

const LIMIT = 5

const ProductList = () => {
  const [searchParams, setSerachParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get("page") || 1)
  const [searchValue, setSerachValue] = useState(
    searchParams.get("search") || ""
  )

  // debounce serachValue state
  const [debouncedSerachValue] = useDebounce(searchValue, 500)

  const { data, isPending, error } = useProducts({
    limit: LIMIT,
    page,
    search: debouncedSerachValue
  })

  // delete product
  const {mutate,isPending:isDeletePending} = useDeleteProduct()



  // reset page when query are applied
  useEffect(()=>{
     setPage(1)
  },[searchValue])

  useEffect(() => {
    const params = {}
    if (page) params.page = page
    if (searchValue) params.search = searchValue

    setSerachParams(params)
  }, [page, searchValue])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>

        <Input
          placeHolder="search products..."
          className="max-w-lg hidden lg:block"
          value={searchValue}
          onChange={(e) => setSerachValue(e.target.value)}
        />

        <AddProductDialogForm />
      </div>

       <Input
          placeHolder="search products..."
          className="w-full lg:hidden mt-4"
          value={searchValue}
          onChange={(e) => setSerachValue(e.target.value)}
        />

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
          isPending ? <TableRow>
            <TableCell>loading...</TableCell>
          </TableRow> :
          error ? <TableRow>
            <TableCell>{error.message}</TableCell>
          </TableRow>:
          data.products.length === 0 ? <TableRow>
            <TableCell>Products not found!</TableCell>
          </TableRow>:
          data.products.map((item, index) => (
            <TableRow
              key={item._id}
              className={cn(index % 2 === 0 ? "bg-slate-50" : "bg-white")}
            >
              <TableCell>{item._id}</TableCell>
              <TableCell>
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="size-16 rounded-xl shadow object-cover"
                />
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
              <TableCell>{item.stock}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="destructive" 
                disabled={isDeletePending} 
                onClick={() => mutate(
                  item.slug,
                  {
                    onSuccess: () => {
                      toast.success("Product deleted sucessfully.")
                    }
                  }
                )}
                >
                  <Trash />
                </Button>
                <UpdateProductDialogForm product={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="mt-6 flex justify-end">
        <Pazination setPage={setPage} pagination={data?.pagination} />
      </div>
    </div>
  )
}
export default ProductList
