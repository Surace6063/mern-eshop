import express from "express"
import protect from "../middlewares/jwtVerify.js"
import adminOnly from "../middlewares/adminVerify.js"
import { getUserProfile, getUsers } from "../controllers/user.controller.js"

const router = express.Router()

router.get('/users',protect,adminOnly, getUsers)
router.get("/profile/me",protect,getUserProfile)

export default router