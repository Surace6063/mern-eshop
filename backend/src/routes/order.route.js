import express from "express"
import protect from "../middlewares/jwtVerify.js"
import { createOrder, getOrders } from "../controllers/order.controller.js"

const router = express.Router()

router.get('/',protect,getOrders)
router.post("/",protect,createOrder)

export default router