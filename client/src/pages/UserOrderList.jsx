import { useGetOrders } from "../api/orderServices"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { Spinner } from "@/components/ui/spinner"
import MaxWidthContainer from "@/components/ui/maxwidthcontainer"
import OrderDetailsDialog from "../components/OrderDetailsDialog"

const UserOrderList = () => {
  const { data, isPending, error } = useGetOrders()

  if (isPending) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  console.log(data)

  if (data?.orders?.length === 0)
    return <p>No order history.</p>

  return (
    <MaxWidthContainer className="min-h-[60vh] my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Category List</h1>
      </div>

      <Separator className="my-6" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map((order, index) => (
            <TableRow
              key={order._id}
              className={cn(index % 2 === 0 ? "bg-slate-50" : "bg-white")}
            >
              <TableCell className="font-semibold text-gray-800">
                {order._id}
              </TableCell>
              <TableCell>{order.fullName}</TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.email}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.address}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.paymentMethod}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.status}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.items.map((item) => (
                  <p key={item._id}>{item.product}</p>
                ))}
              </TableCell>
              <TableCell>
                <OrderDetailsDialog />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MaxWidthContainer>
  )
}
export default UserOrderList
