import express from "express"
import { getUserCart, addToCart } from "../controllers/cart.controller.js"
import protect from "../middlewares/jwtVerify.js"

const router = express.Router()

router.get('',protect, getUserCart)
router.post('',protect, addToCart)

export default router