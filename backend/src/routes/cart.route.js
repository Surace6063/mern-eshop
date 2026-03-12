import express from "express"
import {
  getUserCart,
  addToCart,
  removeCartItem,
  clearUserCart
} from "../controllers/cart.controller.js"
import protect from "../middlewares/jwtVerify.js"

const router = express.Router()

router.get("", protect, getUserCart)
router.post("", protect, addToCart)

// important: must be before dynamic param
router.delete("/clear", protect, clearUserCart) 

router.delete("/:itemId", protect, removeCartItem)


export default router
