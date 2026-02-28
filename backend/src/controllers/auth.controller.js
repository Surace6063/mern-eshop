import User from "../models/user.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

/**
 * @desc register user
 * @route /api/auth/register
 * @access Public
 */

export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body

  // check if user with email already exists
  const existingUser = await User.findOne({ email })

  if (existingUser) return next(ErrorMessage("Email already in use.", 400))

  // encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    message: "User registered sucessfully.",
    user
  })
})

/**
 * @desc login user
 * @route /api/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // check if user exists
  const user = await User.findOne({ email })
  if (!user) return next(ErrorMessage("Invalid email or password.", 401))

  // compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch)
    return next(ErrorMessage("Invalid email or password.", 401))

  // generate jwt token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  // store token in cookie  and send that cookie to client
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: false, // true in production (https)
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({
    message: "User loggedIn sucessfully.",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName
    }
  })
})
