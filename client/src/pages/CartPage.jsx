import MaxWidthContainer from "../components/ui/maxwidthcontainer";
import { Button } from "../components/ui/button";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useProducts } from "../api/productServices";
import CartCard from "../components/CartCard";
import { useUserCart } from "../api/cartServices";

const CartPage = () => {
    const {data,isPending,error} = useUserCart()

    if(isPending) return <p>loading...</p>
    if(error) return <p>{error.message}</p>

    console.log(data)

    if(!data || data?.cart?.items?.length === 0 ) {
      return <p>Cart is empty!</p>
    }
    
  return (
    <MaxWidthContainer className="my-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Shopping Cart
        </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2 space-y-4">
            {
                data.cart.items.map(item => (
                    <CartCard key={item._id} item={item} />
                ))
            }
        </div>

        <OrderSummaryCard totalPrice={data?.totalPrice} />
      </div>
    </MaxWidthContainer>
  );
};
export default CartPage;
