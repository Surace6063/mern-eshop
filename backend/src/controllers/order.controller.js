import Order from "../models/order.model.js";
import ErrorMessage from "../utils/ErrorMessage.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getPagination } from "../utils/pagination.js";


/**
 * @desc get orders
 * @route /api/orders
 * @access Private
 */

export const getOrders = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query

  const totalOrders = await Order.countDocuments()

  const pagination = getPagination(page, limit, totalOrders)
  
  let orders

  if(req.user.role === "admin") {
    // admin can get all orders
    orders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(pagination.perPage)
    .skip(pagination.skip)
  }else{
     orders = await Order.find({user:req.user.userId})
    .sort({ createdAt: -1 })
    .limit(pagination.perPage)
    .skip(pagination.skip)
  }


  if(!orders || orders.length === 0) 
    return next(ErrorMessage("Orders not found",404))  

  res.status(200).json({
    success: true,
    orders,
    pagination 
  })
})

/**
 * @desc create new order
 * @route /api/orders
 * @access Private
 */

export const createOrder = asyncHandler(async (req, res, next) => {
  // create order
  const order = await Order.create({
    user: req.user.userId,
    ...req.body
  })

  // calculate total
  const total = order.items.reduce((acc,item) => acc + item.price * item.quantity, 0 )

  // cash on delivery
  if(order.paymentMethod === "cod"){
    return res.status(201).json({
        order,
        total
    })
  }

  // esewa

})