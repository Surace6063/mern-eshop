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
