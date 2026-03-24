import { useLocation } from "react-router-dom"

const EsewaForm = () => {
  const location = useLocation()
  const orderData = location?.state?.orderData

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input
        type="text"
        id="amount"
        name="amount"
        value={orderData.amount}
        required
      />
      <input
        type="text"
        id="tax_amount"
        name="tax_amount"
        value={orderData.tax_amount}
        required
      />
      <input
        type="text"
        id="total_amount"
        name="total_amount"
        value={orderData.total_amount}
        required
      />
      <input
        type="text"
        id="transaction_uuid"
        name="transaction_uuid"
        value={orderData.transaction_uuid}
        required
      />
      <input
        type="text"
        id="product_code"
        name="product_code"
        value={orderData.product_code}
        required
      />
      <input
        type="text"
        id="product_service_charge"
        name="product_service_charge"
        value={orderData.product_service_charge}
        required
      />
      <input
        type="text"
        id="product_delivery_charge"
        name="product_delivery_charge"
        value={orderData.product_delivery_charge}
        required
      />
      <input
        type="text"
        id="success_url"
        name="success_url"
        value={orderData.success_url}
        required
      />
      <input
        type="text"
        id="failure_url"
        name="failure_url"
        value={orderData.failure_url}
        required
      />
      <input
        type="text"
        id="signed_field_names"
        name="signed_field_names"
        value={orderData.signed_field_names}
        required
      />
      <input
        type="text"
        id="signature"
        name="signature"
        value={orderData.signature}
        required
      />
      <input value="Submit" type="submit" />
    </form>
  )
}
export default EsewaForm
