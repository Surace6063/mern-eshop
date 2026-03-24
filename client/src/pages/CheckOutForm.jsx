import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import MaxWidthContainer from "../components/ui/maxwidthcontainer"
import { ChevronsLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { checkoutValidationSchema } from "../components/validations/checkoutValidation"
import { useForm } from "react-hook-form"
import { useUserCart } from "../api/cartServices"
import { useCreateOrder } from "../api/orderServices"
import toast from "react-hot-toast"

const CheckOutForm = () => {
  const navigate = useNavigate()
  const { data, isPending, error } = useUserCart()
  // create new order
  const {mutate,isPending:isOrderPending} = useCreateOrder()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(checkoutValidationSchema)
  })

  const items = data?.cart?.items?.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price
  }))

  const handleCheckOut = (formData) => {
    const payload = {
      ...formData,
      items
    }

    mutate(payload,{
      onSuccess: (data) => {
          if(formData.paymentMethod === "cod"){
            navigate('/orders')
            toast.success("Order placed sucessfully.")
          }else{
            // if payment method is esewa navigate to esewa form
            // aslo sending order response 
            navigate('/esewa/form',{
              state: {
                orderData: data
              }
            })
          }
      }
    })
  }

  return (
    <MaxWidthContainer className="my-6 max-w-6xl">
      <Button
        className="mb-6 text-gray-700 font-semibold"
        variant="ghost"
        onClick={() => navigate("/cart")}
      >
        <ChevronsLeft />
        back
      </Button>

      <form onSubmit={handleSubmit(handleCheckOut)}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="lg:col-span-3 border-r border-border pr-12">
            <div className="space-y-6 pt-6">
              {/* General Information */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  1. General Information
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      label="Full Name *"
                      placeholder="eg: John Doe"
                      {...register("fullName")}
                      error={errors?.fullName?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      label="Email Address *"
                      placeholder="eg: john@gmail.com"
                      {...register("email")}
                      error={errors?.email?.message}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    label="Phone Number *"
                    placeholder="eg: 9800000011"
                    {...register("phoneNumber")}
                    error={errors?.phoneNumber?.message}
                  />
                </div>
              </section>

              {/* Company Info */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  2. Company Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      label="Company Name"
                      placeholder="Abc Pvt Ltd"
                      {...register("companyName")}
                      error={errors?.companyName?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panVat">PAN/VAT Number</Label>
                    <Input
                      id="panVat"
                      label="PAN/VAT Number"
                      placeholder="12XXXXXX"
                      {...register("vatNumber")}
                      error={errors?.vatNumber?.message}
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Address */}
              <section className="space-y-4">
                <h2 className="font-bold text-xl text-gray-800">
                  3. Delivery Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      label="Address *"
                      placeholder="eg: Jamal, Kathmandu"
                      {...register("address")}
                      error={errors?.address?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      label="Zip Code"
                      placeholder="eg: 446000"
                      {...register("zipCode")}
                      error={errors?.zipCode?.message}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <div className="space-y-4 pt-6">
              <h2 className="font-bold text-xl text-gray-800">Order Summary</h2>

              {/* Example cart item */}
              {isPending ? (
                <p>loading...</p>
              ) : error ? (
                <p>{error.message}</p>
              ) : (
                <>
                  {data?.cart?.items.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <img
                        src={item.product.images[0].url}
                        className="h-16 w-16 rounded"
                        alt="product"
                      />
                      <div className="text-sm">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-muted-foreground">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sub-total</span>
                      <span>${data?.totalPrice}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Charge</span>
                      <span className="text-green-600">FREE</span>
                    </div>

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${data?.totalPrice}</span>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Payment Method</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {/* COD */}
                  <label
                    className="flex items-center gap-4 border border-border shadow rounded-xl p-4 cursor-pointer
                  hover:border-primary transition
                  has-checked:border-primary
                  has-checked:bg-primary/10
                  has-checked:scale-[1.02]"
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      className="hidden"
                      value="cod"
                      {...register("paymentMethod")}
                    />

                    <img
                      src="/dollar.png"
                      alt="Cash on Delivery"
                      className="h-10 w-10 object-contain"
                    />

                    <span className="font-medium">Cash on Delivery</span>
                  </label>

                  {/* Esewa */}
                  <label
                    className="flex items-center gap-4 border border-border shadow rounded-xl p-4 cursor-pointer
                  hover:border-primary transition
                  has-checked:border-primary
                  has-checked:bg-primary/10
                  has-checked:scale-[1.02]"
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      className="hidden"
                      value="esewa"
                      {...register("paymentMethod")}
                    />

                    <img
                      src="/esewa_logo.png"
                      alt="Esewa"
                      className="h-10 w-16 object-contain bg-slate-800 px-2 rounded-md"
                    />

                    <span className="font-medium">E-sewa</span>
                  </label>
                </div>
              </div>
              {errors?.paymentMethod && (
                <p className="text-sm text-destructive">
                  {errors.paymentMethod.message}
                </p>
              )}

              <Button className="w-full mt-3" disabled={isOrderPending || isPending}>
                 {
                  isOrderPending ? "ordering..." : "Place order"
                 }
              </Button>
            </div>
          </div>
        </div>
      </form>
    </MaxWidthContainer>
  )
}

export default CheckOutForm
