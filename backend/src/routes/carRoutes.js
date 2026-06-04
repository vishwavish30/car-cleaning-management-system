import express from "express";

import { addCar, getCars, updateCar,  deactivateCar, } from "../controllers/carController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router()

router.post("/", protect, adminOnly, addCar)

router.get("/", protect, getCars)

router.put("/:id", protect, adminOnly, updateCar)

router.patch("/deactivate/:id", protect, adminOnly, deactivateCar)

export default router