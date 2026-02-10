import express from "express"
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from "../controllers/category.controller.js"
import { zodValidate } from "../middlewares/zodValidate.js"
import { createCategorySchema } from "../validators/category.schema.js"
import upload from "../middlewares/upload.js"

const router = express.Router()

router
.route('/')
.get(getCategories)
.post(
  upload.single('image'), // multer file upload middleware
  zodValidate(createCategorySchema), // zod validation middleware
  createCategory
)

// get single category
router
.route('/:id')
.get(getCategory)
.patch(updateCategory)
.delete(deleteCategory)


export default router
