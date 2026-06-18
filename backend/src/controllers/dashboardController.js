import Car from "../models/Car.js"
import User from "../models/User.js"

export const getDashboardStats = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments({
      isActive: true,
    })

    const totalWorkers = await User.countDocuments({
      role: "worker",
    })

    const activeCars = await Car.countDocuments({
      isActive: true,
    })

    const inactiveCars = await Car.countDocuments({
      isActive: false,
    })

    res.status(200).json({
      totalCars,
      totalWorkers,
      activeCars,
      inactiveCars,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}