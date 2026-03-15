import MaxWidthContainer from "../components/ui/maxwidthcontainer"
import { Button } from "../components/ui/button"
import OrderSummaryCard from "../components/OrderSummaryCard"
import CartCard from "../components/CartCard"
import { useClearCart, useUserCart } from "../api/cartServices"
import  toast  from "react-hot-toast"
import EmptyCart from "../components/empty/EmptyCart"
import useAuthStore from "../zustand/useAuth"
import UserNotAuthenticated from "../components/empty/UserNotAuthenticated"

const CartPage = () => {
  const {isAuthenticated} = useAuthStore()

  const { data, isPending, error } = useUserCart()
  const { mutate, isPending: isClearPending } = useClearCart()

    if(!isAuthenticated) {
    return <div className="min-h-[60vh] flex justify-center items-center">
      <UserNotAuthenticated />
    </div>
  }


  if (isPending) return <p>loading...</p>
  if (error) return <p>{error.message}</p>

  // console.log(data)

  if (!data || data?.cart?.items?.length === 0) {
    return <div className="min-h-[60vh] flex justify-center items-center">
      <EmptyCart />
    </div>
  }

  const clearCart = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Cart cleard sucessfully.")
      }
    })
  }

  return (
    <MaxWidthContainer className="my-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Shopping Cart
            </h1>

            <Button
              onClick={clearCart}
              variant="secondary"
              disabled={isClearPending}
            >
              {isClearPending ? "clearing..." : "clear cart"}
            </Button>
          </div>

          <div className="space-y-4">
            {data.cart.items.map((item) => (
              <CartCard key={item._id} item={item} />
            ))}
          </div>
        </div>

        <OrderSummaryCard totalPrice={data?.totalPrice} />
      </div>
    </MaxWidthContainer>
  )
}
export default CartPage
