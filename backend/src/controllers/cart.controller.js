import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"

/**
 * @desc get current user cart
 * @route /api/cart
 * @access Private
 */
export const getUserCart = asyncHandler(async(req,res,next)=> {
    const userId = req.user?.id

    const cart = await Cart.findOne({user:userId})
    if(!cart) return next(ErrorMessage("Cart not found!", 400))

    res.status(200).json({
        success: true,
        cart
    })
})


/**
 * @desc add to  cart
 * @route POST /api/cart
 * @access Private
 */
export const addToCart = asyncHandler(async(req,res,next)=> {
    const userId = req.user?.id

    let {product, quantity} = req.body

    // convert to number 
    quantity = Number(quantity)

    if(!product || quantity <= 0) return next(ErrorMessage("Product Id and valid quantity are required!"))
    
    let cart = await Cart.findOne({user: userId})
    const existingProduct = await Product.findById(product)   
    
    // create new cart if not exists
    if(!cart){
        cart = Cart.create({
            user: userId,
            items: []
        })
    }

    const existingItem = cart.items.find(
        item => item.product == product
    )

    if(existingItem){
     existingItem.quantity += quantity
    }else{
        // prevent exceeding stock in new order
        if(quantity > existingProduct.stock ){
            return next(ErrorMessage(`Only ${existingProduct.stock} items avaliable in stock`,400))
        }
    }
   
    cart.items.push({
        product,
        price: existingProduct.price,
        quantity
    })

    await cart.save()

    res.status(201).json({
        success: true,
        message: "Item added to cart.",
        cart
    })
})