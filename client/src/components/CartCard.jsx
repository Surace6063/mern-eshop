import { Plus,Minus, X } from "lucide-react"
import { Button } from "./ui/button"
import { useRemoveFromCart } from "../api/cartServices"
import toast from "react-hot-toast"

const CartCard = ({item}) => {
   const {mutate,isPending} = useRemoveFromCart()

   const handleRemoveFromCart = () => {
      mutate(item._id,{
         onSuccess: () => {
            toast.success("Item removed from cart sucessfully.")
         }
      })
   }
  return (
    <div className="p-6 flex gap-6 hover:bg-zinc-50 transition relative shadow-sm rounded-xl group">
       <img 
       src={item?.product?.images[0]?.url} 
       alt={item.product.name}  
       className="size-32 rounded-xl object-cover border border-zinc-200"
       />

       <div className="flex-1 flex justify-between">
         <div className="space-y-1">
             <h2 className="font-medium text-gray-800">
                {item.product.name}
             </h2>
             <p className="text-sm text-gray-600">
                {item.product.category.name}
             </p>
             {/* <p className="font-medium text-gray-700">
                quantity: {item.quantity}
             </p> */}
             <p className="text-primary font-semibold">
               ${item.price}
             </p>
             <div className="mt-2 flex items-center gap-2">
                <Button size="icon" variant="outline">
                    <Plus />
                </Button>
                <p>{item.quantity}</p>
                <Button size="icon" variant="outline">
                  <Minus />
                </Button>
             </div>
         </div>

         {/* <div>
            <p>$100</p>
         </div> */}

        <div onClick={handleRemoveFromCart} className="absolute right-4 top-2 opacity-0 group-hover:opacity-100 cursor-pointer transition">
             <X size={20} className="text-gray-600" />
        </div>

       </div>
    </div>
  )
}
export default CartCard