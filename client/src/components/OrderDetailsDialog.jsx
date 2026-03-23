import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

const OrderDetailsDialog = ({order}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Detail</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetailsDialog
