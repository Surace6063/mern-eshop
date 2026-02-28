import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js"
import upload from "../middlewares/upload.js"
import { zodValidate } from "../middlewares/zodValidate.js"
import { createProductSchema, updateProductSchema } from "../validators/product.schema.js"
import protect from "../middlewares/jwtVerify.js"
import adminOnly from "../middlewares/adminVerify.js"

const router = express.Router()

router
.route("/")
.get(getProducts)
.post(
    protect,
    adminOnly,
    upload.array('images'),
    // zodValidate(createProductSchema),
    createProduct
)

router
.route('/:slug')
.get(getProduct)
.delete( protect,adminOnly,deleteProduct)
.patch(
      protect,
      adminOnly,
     upload.array('images'),
     zodValidate(updateProductSchema),
     updateProduct
)

export default router
