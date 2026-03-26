import express from "express"
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmailToken
} from "../controllers/auth.controller.js"
import passport from "../config/passport.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.post("/verify-token", verifyEmailToken)

// google auth
// /api/auth/google
router.get("/google", (req, res, next) => {
  const redirectUrl = req.query.redirect || "/"
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirectUrl
  })(req, res, next)
})

router.get( 
  "/google/callback", 
  passport.authenticate("google", { 
    failureRedirect: "/login", 
    session: false, 
  }), 
  (req, res) => { 
 
    const token = jwt.sign(
        { userId: req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )
 
    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    }); 
 
    const redirectUrl = req.query.state || "/"; 
 
    res.redirect(`${process.env.CLIENT_URL}${redirectUrl}`); 
  } 
);


export default router
