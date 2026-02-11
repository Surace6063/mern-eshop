import Category from "../models/category.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import { createSlugify } from "../utils/createSlug.js"
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"

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

/**
 * @desc create new category
 * @route POST /api/categories
 * @access Admin
 */
export const createCategory = asyncHandler(async (req, res, next) => {
  // check if category with the same name already exists
  const categoryExists = await Category.findOne({
    name: req.body.name
  })

  if (categoryExists)
    return next(ErrorMessage("Category name already exists", 400))

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "eshop/categories")

    req.body.image = {
      url: result.secure_url,
      public_id: result.public_id
    }
  }

  const newCategory = await Category.create(req.body)

  res.status(201).json({
    message: "New category created sucessfully.",
    category: newCategory
  })
})

/**
 * @desc update category
 * @route PATCH /api/categories/:id
 * @access Admin
 */
export const updateCategory = asyncHandler(async (req, res, next) => {
  const updateData = { ...req.body }

  // if name is updated → regenerate slug
  if (req.body.name) {
    updateData.slug = createSlugify(req.body.name)
  }

  // update image in cloudinary... also delete previous image
  if (req.file) {
    // find existing image of category
    const oldCategory = await Category.findById(req.params.id).select("image")
    if (!oldCategory) return next(ErrorMessage("Category not found!", 404))

    // if catgeory image has public_id delete existing image
    if (oldCategory?.image?.public_id) {
      await deleteFromCloudinary(oldCategory?.image?.public_id)
    }

    const result = await uploadToCloudinary(req.file.buffer, "eshop/categories")

    updateData.image = {
      url: result.secure_url,
      public_id: result.public_id
    }
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedCategory) return next(ErrorMessage("Category not found!", 404))

  res.status(200).json({
    message: "Category updated successfully.",
    category: updatedCategory
  })
})

/**
 * @desc delete category
 * @route DELETE /api/categories/:id
 * @access Admin
 */
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) return next(ErrorMessage("Category not found!", 404))
  // if catgeory image has public_id delete existing image
  if (category?.image?.public_id) {
    await deleteFromCloudinary(category?.image?.public_id)
  }

  await category.deleteOne()

  res.status(200).json({
    message: "Category deleted successfully."
  })
})
