import ErrorMessage from "../utils/ErrorMessage.js"

export const zodValidate = 
  (schema) => 
  (req, res, next) => { 
    const result = schema.safeParse(req.body); 
 
    if (!result.success) { 
      const errors = result.error.issues.map((err) => ({ 
          field: err.path.join("."), 
          message: err.message, 
        }))

        return next(ErrorMessage("Validation failed", 400, errors))
    } 
 
    req.body = result.data; // sanitized data 
    next(); 
  }