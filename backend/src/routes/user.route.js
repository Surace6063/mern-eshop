import express from "express"
import protect from "../middlewares/jwtVerify.js"
import adminOnly from "../middlewares/adminVerify.js"
import { getUserProfile, getUsers } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/profile/me",protect,getUserProfile)
router.get('/users',protect,adminOnly, getUsers)

export default router