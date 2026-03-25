import { useGetOrders } from "../api/orderServices"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import MaxWidthContainer from "@/components/ui/maxwidthcontainer"
import OrderDetailsDialog from "../components/OrderDetailsDialog"
import { Badge } from "../components/ui/badge"
import useAuthStore from "../zustand/useAuth"
import { Navigate  } from "react-router-dom"

const UserOrderList = () => {
  const {isAuthenticated} = useAuthStore()

  if(!isAuthenticated) return <Navigate to="/" replace />

  const { data, isPending, error } = useGetOrders()

  if (isPending) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  if (data?.orders?.length === 0)
    return <p>No order history.</p>

  return (
    <MaxWidthContainer className="min-h-[60vh] my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Order List</h1>
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
                 {order.status && <Badge className={cn(
                  order.status === "pending" ? "bg-yellow-400" : "bg-green-500"
                 )}>
                  {order.status}
                  </Badge>}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {order.items.map((item,index) => (
                  <p key={item._id}>
                   {index+1}. {item.product.name}
                  </p>
                ))}
              </TableCell>
              <TableCell>
                <OrderDetailsDialog order={order} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MaxWidthContainer>
  )
}
export default UserOrderList
