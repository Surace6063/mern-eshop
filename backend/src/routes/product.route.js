import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts } from "../controllers/product.controller.js"
import upload from "../middlewares/upload.js"

const router = express.Router()

router
.route("/")
.get(getProducts)
.post(
    upload.array('images'),
    createProduct
)

router
.route('/:id')
.get(getProduct)
.delete(deleteProduct)

export default router
