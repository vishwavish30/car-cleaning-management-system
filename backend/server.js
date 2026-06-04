import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import protect from "./src/middleware/authMiddleware.js"
import adminOnly from "./src/middleware/adminMiddleware.js"

import carRoutes from "./src/routes/carRoutes.js"
import dashboardRoutes from "./src/routes/dashboardRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import cleaningRoutes from "./src/routes/cleaningRoutes.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"

import authRoutes from "./src/routes/authRoutes.js"
import connectDB from "./src/config/db.js"



dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  })
})

app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  })
})

app.use("/api/cars", carRoutes)

app.use("/api/dashboard", dashboardRoutes)


app.use("/api/users", userRoutes)


app.use("/api/cleaning", cleaningRoutes)


app.use("/api/payments", paymentRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running Successfully")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})