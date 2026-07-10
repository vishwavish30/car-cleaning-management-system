import Car from "../models/Car.js"
import User from "../models/User.js"
import Payment from "../models/Payment.js"

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

    const currentMonth = new Date().toISOString().slice(0, 7)

    //for-Charts
    const paidCustomers = await Payment.countDocuments({
      month: currentMonth,
      paid: true,
    })

    const pendingPayments = totalCars - paidCustomers

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          paid: true,
        },
      },
      {
        $group: {
          _id: "$month",
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])

    const monthNames = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }

    const revenueChart = monthlyRevenue.map((item) => ({
      month: monthNames[item._id.split("-")[1]],
      revenue: item.revenue,
    }))

    res.status(200).json({
      totalCars,
      totalWorkers,
      activeCars,
      inactiveCars,
      paidCustomers,
      pendingPayments,
      monthlyRevenue: revenueChart,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}