import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"


/*
Helper: Recalculate total number of quantity and total price of cart
*/
const recalculateCart = (cart) => {
  const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return { totalQuantity, totalPrice }
}

/**
 * @desc get current user cart
 * @route /api/cart
 * @access Private
 */
export const getUserCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId
  if (!userId) return next(ErrorMessage("User not found!", 404))

  let cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    populate: "category"
  })

  // create cart if not exists
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    })
  }
  const { totalQuantity, totalPrice } = recalculateCart(cart)

  res.status(200).json({
    success: true,
    cart,
    totalQuantity,
    totalPrice
  })
})

/**
 * @desc add to  cart
 * @route POST /api/cart
 * @access Private
 */
export const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId
  if (!userId) return next(ErrorMessage("User not found!", 404))

  let { product, quantity } = req.body

  // convert to number
  quantity = Number(quantity)

  if (!product || quantity <= 0)
    return next(ErrorMessage("Product Id and valid quantity are required!"))

  let cart = await Cart.findOne({ user: userId })
  const existingProduct = await Product.findById(product)

  // create new cart if not exists
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    })
  }

  const existingItem = cart.items.find((item) => 
    item.product.toString() == product)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    // prevent exceeding stock in new order
    if (quantity > existingProduct.stock) {
      return next(
        ErrorMessage(
          `Only ${existingProduct.stock} items avaliable in stock`,
          400
        )
      )
    }

    cart.items.push({
      product,
      price: existingProduct.price,
      quantity
    })
  }

  await cart.save()

  res.status(201).json({
    success: true,
    message: "Item added to cart.",
    cart
  })
})



/**
 * @desc remove single item from user cart
 * @route DELETE /api/cart/:itemId
 * @access Private
 */

export const removeCartItem = asyncHandler(async (req, res, next) => {
    const userId = req.user.userId
    const itemId = req.params.itemId

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        return next(ErrorMessage("Cart not found!", 404))
    }

    const itemIndex = cart.items.findIndex((item) => item._id == itemId)
    if (itemIndex === -1) {
        return next(ErrorMessage("Item not found in cart!", 404))
    }

    cart.items.splice(itemIndex, 1)
    await cart.save()

    res.status(200).json({
        success: true,
        message: "Item removed from cart.",
    })

})



/**
 * @desc clear user cart
 * @route DELETE /api/cart/clear
 * @access Private
 */

export const clearUserCart = asyncHandler(async (req, res, next) => {
    const userId = req.user.userId

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        return next(ErrorMessage("Cart not found!", 404))
    }

    cart.items = []

    await cart.save()

    res.status(200).json({
        success: true,
        message: "Cart cleared.",
    })

})