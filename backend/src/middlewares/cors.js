import cors from "cors"
// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
]

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman or curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true) //    Allow this origin
    }
    return callback(new Error("Not allowed by CORS")) //   others Block
  },
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true // Allow cookies/auth headers
}

export default cors(corsOptions)
