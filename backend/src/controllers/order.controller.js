import Order from "../models/order.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import { getPagination } from "../utils/pagination.js"
import Cart from "../models/cart.model.js"
import crypto from "crypto"

// generate signature
const generateSignature = (key, message) => {
  // Create HMAC with SHA-256 and secret key
  const hmac = crypto.createHmac("sha256", key)

  // Add message to be signed
  hmac.update(message)

  // Generate Base64 encoded signature
  return hmac.digest("base64")
}

/**
 * @desc get orders
 * @route /api/orders
 * @access Private
 */

export const getOrders = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query

  const totalOrders =
    req.user.role === "admin"
      ? await Order.countDocuments()
      : await Order.countDocuments({ user: req.user.userId })

  const pagination = getPagination(page, limit, totalOrders)

  let orders

  if (req.user.role === "admin") {
    // admin can get all orders
    orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(pagination.perPage)
      .skip(pagination.skip)
      .populate({
        path: "items.product",
        populate: "category"
      })
  } else {
    orders = await Order.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(pagination.perPage)
      .skip(pagination.skip)
      .populate({
        path: "items.product",
        populate: "category"
      })
  }

  res.status(200).json({
    success: true,
    orders: orders || [],
    pagination
  })
})

/**
 * @desc create new order
 * @route /api/orders
 * @access Private
 */

export const createOrder = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.userId })
  if (!cart) {
    return next(ErrorMessage("Cart not found!", 404))
  }

  // create order
  const order = await Order.create({
    user: req.user?.userId,
    ...req.body
  })

  // calculate total
  const total = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  // clear cart after order is sucessfull
  cart.items = []
  await cart.save()

  // cash on delivery
  if (order.paymentMethod === "cod") {
    return res.status(201).json({
      order,
      total
    })
  }

  // esewa
  if (order.paymentMethod === "esewa") {
    const amount = total
    const tax_amount = 0
    const total_amount = (amount + tax_amount).toFixed(2)
    const transaction_uuid = crypto.randomUUID()
    const product_code = "EPAYTEST"
    const product_service_charge = 0
    const product_delivery_charge = 0
    const success_url = `http://localhost:3000/esewa/success/${order._id}`
    const failure_url = "https://developer.esewa.com.np/failure"
    const signed_field_names = "total_amount,transaction_uuid,product_code"

    // creating signature
    const secret_key = "8gBm/:&EnhH.1/q"
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`

    const signature = generateSignature(secret_key, message)

    return res.status(201).json({
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge,
      product_delivery_charge,
      success_url,
      failure_url,
      signed_field_names,
      signature
    })
  }
})



/**
 * @desc verify esewa payment
 * @route /api/orders/esewa/verify
 * @access Private
 */
export const esewaSuccess = async (req, res) => {
  try {
    // Extract order_id and encoded data from request body
    const { order_id, data } = req.body;

    // Validate required fields
    if (!order_id || !data) {
      return res.status(400).json({
        message: "Missing order_id or data",
      });
    }

    // Find order in database using order_id
    const order = await Order.findById(order_id);

    // If order does not exist, return 404 error
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Decode Base64 encoded response data from eSewa
    const decoded = Buffer.from(data, "base64").toString("utf8");

    // Parse decoded JSON string into JavaScript object
    const parsed = JSON.parse(decoded);

    // Extract and normalize payment status (convert to uppercase)
    const statusValue = parsed.status?.toUpperCase();

    // If payment is successful
    if (statusValue === "COMPLETE") {
      // Update order status to completed
      order.status = "completed";

      // Save updated order in database
      await order.save();

      // Send success response
      return res.json({
        message: "Payment successful. Order completed.",
      });
    }

    // For other statuses (FAILED, PENDING, etc.)
    res.json({
      message: `Transaction status: ${statusValue}`,
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: error.message });
  }
};