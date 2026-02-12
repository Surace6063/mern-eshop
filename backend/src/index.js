import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import globalErrorHandler from "./middlewares/globalErrorhandler.js";

dotenv.config();

const PORT = process.env.PORT || 4500

// mongodb connection
connectDB()

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

// category route
app.use('/api/categories', categoryRoute)
// product route
app.use('/api/products', productRoute)


// global error handler
app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})