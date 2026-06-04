import express from "express"

import protect from "../middleware/authMiddleware.js"

import { markCarCleaned, getTodaySummary, getTodayCleanedCars } from "../controllers/cleaningController.js"

const router = express.Router()

router.post(
  "/",
  protect,
  markCarCleaned
)

router.get(
    "/summary",
    protect,
    getTodaySummary
)

router.get(
  "/today",
  protect,
  getTodayCleanedCars
)

export default router