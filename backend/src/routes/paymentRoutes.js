import express from "express"

import protect from "../middleware/authMiddleware.js"
import adminOnly from "../middleware/adminMiddleware.js"

import {
  markPaymentReceived,
  getPaymentSummary,
  getCurrentMonthPayments,
} from "../controllers/paymentController.js"

const router = express.Router()

router.post(
  "/",
  protect,
  adminOnly,
  markPaymentReceived
)

router.get(
  "/summary",
  protect,
  adminOnly,
  getPaymentSummary
)

router.get(
  "/current-month",
  protect,
  getCurrentMonthPayments
)

export default router