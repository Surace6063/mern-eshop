import express from "express"
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from "../controllers/category.controller.js"
import { zodValidate } from "../middlewares/zodValidate.js"
import upload from "../middlewares/upload.js"
import { createCategorySchema, updateCategorySchema } from "../validators/category.schema.js"
import protect from "../middlewares/jwtVerify.js"
import adminOnly from "../middlewares/adminVerify.js"

const router = express.Router()

router.route("/")
.get(getCategories)
.post(
  protect,
  adminOnly,
  upload.single("image"), // multer file upload middleware
  zodValidate(createCategorySchema), // zod validation middleware
  createCategory
)

// get single category
router
  .route("/:id")
  .get(getCategory)
  .patch(
     protect,
     adminOnly,
    upload.single("image"),
    zodValidate(updateCategorySchema), 
    updateCategory
  )
  .delete( protect,adminOnly,deleteCategory)

export default router
