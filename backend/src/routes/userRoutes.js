import express from "express"

import protect from "../middleware/authMiddleware.js"
import adminOnly from "../middleware/adminMiddleware.js"

import { getWorkers,deactivateWorker, } from "../controllers/userController.js"

const router = express.Router()

router.get(
  "/workers",
  protect,
  adminOnly,
  getWorkers
)

router.patch(
  "/deactivate/:id",
  protect,
  adminOnly,
  deactivateWorker
)

export default router