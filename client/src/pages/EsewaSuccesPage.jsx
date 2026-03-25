import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useVerifyEsewaPayment } from "../api/orderServices"
import { Link } from "react-router-dom"

const EsewaSuccesPage = () => {
  const navigate = useNavigate()
  const {orderId} = useParams()
  const [searchParams,setSearchParams] = useSearchParams()
  const data = searchParams.get('data')

  const {mutate,isPending,isSuccess,error} = useVerifyEsewaPayment()
  
  useEffect(()=>{
     mutate({order_id:orderId,data},{
      onSuccess: () => {
        setTimeout(()=>{
          navigate('/orders')
        },5000)
      }
     })
  },[orderId,mutate,navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Loading */}
        {isPending && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Processing your payment...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we verify your transaction.
            </p>
          </>
        )}

        {/* Success */}
        {isSuccess && (
          <>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h1>

            <p className="text-gray-600 mt-2">
              Your order has been successfully placed.
            </p>

            <div className="mt-6">
              <Link
                to="/orders"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                View Orders
              </Link>
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <>
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-red-600">
              Payment Failed
            </h1>

            <p className="text-gray-600 mt-2">
              {error?.message || "Something went wrong during payment."}
            </p>

            <div className="mt-6">
              <Link
                to="/cart"
                className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
              >
                Try Again
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default EsewaSuccesPage