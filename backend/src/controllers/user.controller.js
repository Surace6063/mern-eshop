import User from "../models/user.model.js";
import ErrorMessage from "../utils/ErrorMessage.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getPagination } from "../utils/pagination.js";
import SearchFilter from "../utils/serachFilter.js";

/**
 * @desc get all users
 * @route /api/users
 * @access Admin
 */
export const getUsers = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, search } = req.query

  const filter = {
    ...SearchFilter(search, ["fullName","email"])
  }

  const totalUsers = await User.countDocuments(filter)

  const pagination = getPagination(page, limit, totalUsers)

  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .limit(pagination.perPage)
    .skip(pagination.skip)
    .select("-__v -updatedAt -password")

  if(!users || users.length === 0) 
    return next(ErrorMessage("Users not found",404))  

  res.status(200).json({
    success: true,
    message: "User fetched sucessfully.",
    users,
    pagination 
  })
})



/**
 * @desc get user profile
 * @route /api/profile/me
 * @access private
 */
export const getUserProfile = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user.userId)
    .select("-__v -updatedAt -password")

  if(!user) 
    return next(ErrorMessage("User not found",404))  

  res.status(200).json({
    success: true,
    message: "User fetched sucessfully.",
    user
  })
})
