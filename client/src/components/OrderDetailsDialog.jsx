import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Badge } from "./ui/badge"
import { cn } from "../lib/utils"
import { Separator } from "./ui/separator"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Eye } from "lucide-react"
import useAuthStore from "../zustand/useAuth"
import { useOrderCompleted } from "../api/orderServices"
import toast from "react-hot-toast"

const OrderDetailDialog = ({ order }) => {
  const {user} = useAuthStore()
  const {mutate,isPending} = useOrderCompleted()
  
  // Calculate total quantity and total price
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleOrderCompleted = () => {
    mutate(order._id,{
      onSuccess: () => {
        toast.success("Order marked as completed.")
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Eye className="text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Order Details</DialogTitle>
        </DialogHeader>

        {/* Customer Info */}
        <div className="space-y-2 mb-4 p-4 bg-gray-50 rounded shadow-sm">
          <p>
            <span className="text-gray-900 font-bold">Customer:</span>{" "}
            {order.fullName}
          </p>
          <p>
            <span className="text-gray-900 font-bold">Email:</span>{" "}
            {order.email}
          </p>
          <p>
            <span className="text-gray-900 font-bold">Phone:</span>{" "}
            {order.phoneNumber}
          </p>
          <p>
            <span className="text-gray-900 font-bold">Address:</span>{" "}
            {order.address}, {order.zipCode}
          </p>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex flex-wrap gap-2 ">
              <Badge>Payment: {order.paymentMethod}</Badge>
            <Badge
              className={cn(
                "text-xs",
                order.status === "completed"
                  ? "bg-green-500 text-white"
                  : order.status === "pending"
                    ? "bg-yellow-400 text-white"
                    : "bg-red-500 text-white"
              )}
            >
              Status: {order.status}
            </Badge>
            </div>
            {user?.role === "admin" && order.status === "pending" && (
            <Button disabled={isPending} onClick={handleOrderCompleted} size="sm" className="bg-slate-900 hover:bg-slate-900/80 cursor-pointer">
              Mark as completed
            </Button>
          )}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Products List */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item, index) => (
                <TableRow key={item._id}  className={cn(index % 2 === 0 ? "bg-slate-50" : "bg-white")}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Order Totals */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between font-semibold">
          <p>Total Items: {totalQuantity}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailDialog