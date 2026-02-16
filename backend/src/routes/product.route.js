import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js"
import upload from "../middlewares/upload.js"
import { zodValidate } from "../middlewares/zodValidate.js"
import { createProductSchema, updateProductSchema } from "../validators/product.schema.js"

const router = express.Router()

router
.route("/")
.get(getProducts)
.post(
    upload.array('images'),
    // zodValidate(createProductSchema),
    createProduct
)

router
.route('/:id')
.get(getProduct)
.delete(deleteProduct)
.patch(
     upload.array('images'),
     zodValidate(updateProductSchema),
     updateProduct
)

export default router
