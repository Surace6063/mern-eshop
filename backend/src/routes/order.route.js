import express from "express"
import protect from "../middlewares/jwtVerify.js"
import {
  createOrder,
  esewaSuccess,
  getOrders
} from "../controllers/order.controller.js"

const router = express.Router()

router.get("/", protect, getOrders)
router.post("/", protect, createOrder)
router.post("/esewa/verify", protect, esewaSuccess)

export default router
