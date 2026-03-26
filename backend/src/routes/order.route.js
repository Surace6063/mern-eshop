import express from "express"
import protect from "../middlewares/jwtVerify.js"
import {
  createOrder,
  esewaSuccess,
  getOrders,
  markOrderCompleted
} from "../controllers/order.controller.js"
import adminOnly from "../middlewares/adminVerify.js"

const router = express.Router()

router.get("/", protect, getOrders)
router.post("/", protect, createOrder)
router.post("/esewa/verify", protect, esewaSuccess)

router.patch("/complete/:id",protect,adminOnly,markOrderCompleted)

export default router
