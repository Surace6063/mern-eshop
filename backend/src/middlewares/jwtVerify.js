import jwt from "jsonwebtoken"
import ErrorMessage from "../utils/ErrorMessage.js"

const protect = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) return next(ErrorMessage("Not authorized!", 401))
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return next(ErrorMessage("Invalid token!", 401))
  }
}

export default protect
