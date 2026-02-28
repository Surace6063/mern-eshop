import asyncHandler from "../utils/asyncHandler.js";
import ErrorMessage from "../utils/ErrorMessage.js";

const adminOnly = asyncHandler(async (req,res,next)=>{
    if(!req.user || req.user.role !== "admin") 
        return next(ErrorMessage("Admin access only", 403))

    next()
}) 

export default adminOnly