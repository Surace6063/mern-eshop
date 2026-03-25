import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const EsewaForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderData = location?.state?.orderData
  const formRef = useRef(null)

  useEffect(() => {
    if (!orderData) {
      navigate("/")
      return
    }

    // auto-submit form
    const timer = setTimeout(() => {
      formRef?.current?.submit()
    }, 500)

    return () => clearTimeout(timer)
  }, [orderData, navigate])

  if (!orderData) return null

  return (
    <>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        ref={formRef}
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={orderData.amount}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value={orderData.tax_amount}
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={orderData.total_amount}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={orderData.transaction_uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value={orderData.product_code}
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value={orderData.product_service_charge}
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={orderData.product_delivery_charge}
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value={orderData.success_url}
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={orderData.failure_url}
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value={orderData.signed_field_names}
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={orderData.signature}
          required
        />
        <input value="Submit" type="submit" className="hidden" />
      </form>

      <div className="mt-12 h-screen flex justify-center items-center">
        <div className="text-center ">
          <h2 className="text-2xl font-semibold">Redirecting to eSewa...</h2>
          <p className="text-gray-600 mt-2">
            Please wait while we process your payment.
          </p>
        </div>
      </div>
    </>
  )
}
export default EsewaForm
