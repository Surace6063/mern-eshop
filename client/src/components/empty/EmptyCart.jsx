import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const EmptyCart = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <img src="empty-cart.png" alt="Empty cart" className="size-20" />
        </EmptyMedia>

        <EmptyTitle>Your cart is empty</EmptyTitle>

        <EmptyDescription>
          Looks like you haven’t added any products to your cart yet. Start
          shopping and add items you like.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
       <Link to="/products">
           <Button>Browse Products</Button>
       </Link>
      </EmptyContent>
    </Empty>
  )
}
export default EmptyCart
