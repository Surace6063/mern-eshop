import User from "../models/user.model.js"
import ErrorMessage from "../utils/ErrorMessage.js"
import asyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import hashText from "../utils/hashText.js"
import { transporter } from "../config/transporter.js"

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
  const hashedPassword = await hashText(password)

  // generate 6-digit token using crypto
  const token = crypto.randomInt(100000,1000000).toString()
  const hashedToken = await hashText(token)

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: Date.now() + 15 * 60 * 1000 // 15 min
  })

  // send token via email
  try {
    await transporter.sendMail({
      from: '"ESHOP" <no:reply@eshop.com>',
      to: email,
      subject: "Your email verification token",
      html: `
        <h2>Email Verification</h2>
        <p>Your 6-digits verification token: </p>
        <strong>${token}</strong>
        <p>
          Enter this token on the website to verify your email. It expires in 15 minutes.
        </p>
      `
    })
  } catch (error) {
    // delete user if email fails
    await User.deleteOne()
    return next(ErrorMessage("Email could not be sent", 500))
  }

  res.status(201).json({
    message: "User registered sucessfully. Check your email for the verification token.",
    user
  })
})

/* ==================================================
   @desc Verify Email (Token Only)
   @route POST /api/auth/verify-token
   @access Public
================================================== */
export const verifyEmailToken = asyncHandler(async (req, res, next) => {
  const { email, token } = req.body;

  if (!email || !token)
    return next(ErrorMessage("Email and token are required", 400));

  const user = await User.findOne({
    email,
    emailVerificationExpires: { $gt: Date.now() },
  })

  if (!user)
    return next(ErrorMessage("User not found!", 404))

  const isTokenMatch = await bcrypt.compare(token, user.emailVerificationToken)
  if (!isTokenMatch)
    return next(ErrorMessage("Invalid or expired token!", 400))

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save()

  res.status(200).json({
    success: true,
    message: "Email verified successfully. You can now login.",
  });
});


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

  if(!user.isVerified) return next(ErrorMessage("Please verify your email first!", 401))

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
      fullName: user.fullName,
      role: user.role
    }
  })
})


/**
 * @desc logout user
 * @route /api/auth/logout
 * @access Public
 */

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false, // true in production (https)
    sameSite: "none"
  })  
  res.status(200).json({
    message: "User logged out sucessfully."
  })
})
