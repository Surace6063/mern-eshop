import Category from "../models/category.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"

/** 
 * @desc get all categories
 * @route /api/categories
 * @access Public
 */
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find()

  if (categories.length === 0) {
    return next(ErrorMessage("Categories not found", 404))
  }

  res.status(200).json(categories)
})

/** 
 * @desc get single category
 * @route /api/categories/:id
 * @access Public
 */
export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(ErrorMessage("Categories not found", 404))
  }

  res.status(200).json(category)
})
