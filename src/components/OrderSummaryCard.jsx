import { Button } from "./ui/button";

const OrderSummaryCard = () => {
  return (
    <div className="border border-border rounded-2xl p-8 bg-zinc-50 h-fit sticky top-24">
      <h1 className="text-xl font-semibold mb-6 text-zinc-900">
        Order Summary
      </h1>
      <div className="space-y-4 text-sm text-zinc-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$100</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping estimate</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax estimate</span>
          <span>$0.00</span>
        </div>
      </div>

      <div className="border-t border-zinc-200 mt-6 pt-6 flex justify-between font-semibold text-zinc-900">
        <span>Order total</span>
        <span>$100</span>
      </div>

      <Button
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 rounded-xl bg-zinc-900 hover:bg-zinc-800"
      >
        Checkout
      </Button>
    </div>
  );
};
export default OrderSummaryCard;
