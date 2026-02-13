import Product from "../models/product.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import { createSlugify } from "../utils/createSlug.js"
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"

/**
 * @desc get all products
 * @route /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .populate("category", "name")
    .select("-__v -updatedAt")

  if (products.length === 0) {
    return next(ErrorMessage("Product not found", 404))
  }

  res.status(200).json(products)
})

/**
 * @desc get single product
 * @route /api/products/:id
 * @access Public
 */
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).select(
    "-__v -updatedAt"
  )

  if (!product) {
    return next(ErrorMessage("Product not found", 404))
  }

  res.status(200).json(product)
})

/**
 * @desc create new product
 * @route POST /api/products
 * @access Admin
 */
export const createProduct = asyncHandler(async (req, res, next) => {
  // Upload images
  if (req.files?.length) {
    const uploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, "eshop/products"))
    )

    req.body.images = uploads.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id
    }))
  }

  const newProduct = await Product.create(req.body)

  res.status(201).json({
    message: "New product created sucessfully.",
    product: newProduct
  })
})

/**
 * @desc delete product
 * @route DELETE /api/products/:id
 * @access Admin
 */
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) return next(ErrorMessage("Product not found!", 404))
  // if product images has public_id delete existing images
  if (product?.images?.length) {
    await Promise.all(
      product?.images?.map((img) => deleteFromCloudinary(img.public_id))
    )
  }

  await product.deleteOne()

  res.status(200).json({
    message: "Produuct deleted successfully."
  })
})

/**
 * @desc update product
 * @route PUT /api/products/:id
 * @access Admin
 */
export const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) return next(ErrorMessage("Product not found!", 404))

  // update fields dynamically (partial update)
  Object.assign(product, req.body)

  // if name is updated → regenerate slug
  if (req.body.name) {
    product.slug = createSlugify(req.body.name)
  }

  // update image in cloudinary... also delete previous image
  if (req.file) {
    if (product?.images?.length) {
      await Promise.all(
        product?.images?.map((img) => deleteFromCloudinary(img.public_id))
      )
    }

    if (req.files?.length) {
      const uploads = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, "eshop/products")
        )
      )

      req.body.images = uploads.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id
      }))
    }
  }

  await product.save()

  res.status(200).json({
    message: "Category updated successfully.",
    product
  })
})
