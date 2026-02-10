import Category from "../models/category.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import { createSlugify } from "../utils/createSlug.js"
import cloudinary from "../config/cloudinary.js"
import path from 'path'
import DataURIParser from "datauri/parser.js"

const parser = new DataURIParser()

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

  if(categoryExists) return next(ErrorMessage('Category name already exists', 400))

  // get file extension (.png, .jpg, etc) 
    const extName = path.extname(req.file.originalname)
 
    // convert buffer to data URI 
    const fileUri = parser.format(extName, req.file.buffer) 
 
    const result = await cloudinary.uploader.upload(fileUri.content, { 
      folder: "eshop/categories", 
    })
  
  const newCategory = await Category.create({
    ...req.body,
    image: {
      url: result.secure_url,
      public_id: result.public_id
    }
  })

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
    updateData.slug = createSlugify(req.body.name);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedCategory)
    return next(ErrorMessage("Category not found!", 404));

  res.status(200).json({
    message: "Category updated successfully.",
    category: updatedCategory
  });
});


/** 
 * @desc delete category
 * @route DELETE /api/categories/:id
 * @access Admin
 */
export const deleteCategory = asyncHandler(async (req, res, next) => {

  const category = await Category.findByIdAndDelete(req.params.id)
   
  if (!category) return next(ErrorMessage("Category not found!", 404));

  res.status(200).json({
    message: "Category deleted successfully."
  })
})