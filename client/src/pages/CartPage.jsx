import MaxWidthContainer from "../components/ui/maxwidthcontainer";
import { Button } from "../components/ui/button";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useProducts } from "../api/productServices";
import CartCard from "../components/CartCard";

const CartPage = () => {
    const {data:carts,isPending,error} = useProducts({limit:2})

    if(isPending) return <p>loading...</p>
    if(error) return <p>{error.message}</p>
    
  return (
    <MaxWidthContainer className="my-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Shopping Cart
        </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2 space-y-4">
            {
                carts.map(item => (
                    <CartCard key={item.id} item={item} />
                ))
            }
        </div>

        <OrderSummaryCard />
      </div>
    </MaxWidthContainer>
  );
};
export default CartPage;
