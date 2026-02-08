import { Plus,Minus, X } from "lucide-react"
import { Button } from "./ui/button"

const CartCard = ({item}) => {
  return (
    <div className="p-6 flex gap-6 hover:bg-zinc-50 transition relative shadow-sm rounded-xl group">
       <img 
       src={item.images[0]} 
       alt={item.title}  
       className="size-40 rounded-xl object-cover border border-zinc-200"
       />

       <div className="flex-1 flex justify-between">
         <div className="space-y-1">
             <h2 className="font-medium text-gray-800">
                {item.title}
             </h2>
             <p className="text-sm text-gray-600">
                {item.category.name}
             </p>
             <p className="font-medium text-gray-700">
                quantity: 2
             </p>
             <p className="text-primary font-semibold">
               ${item.price}
             </p>
             <div className="mt-2 flex items-center gap-1.5">
                <Button size="icon" variant="outline">
                    <Plus />
                </Button>
                <p>1</p>
                <Button size="icon" variant="outline">
                  <Minus />
                </Button>
             </div>
         </div>

         {/* <div>
            <p>$100</p>
         </div> */}

        <div className="absolute right-4 top-2 opacity-0 group-hover:opacity-100 cursor-pointer transition">
             <X size={20} className="text-gray-600" />
        </div>

       </div>
    </div>
  )
}
export default CartCard