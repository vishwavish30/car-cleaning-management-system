import Payment from "../models/Payment.js"
import Car from "../models/Car.js"

export const markPaymentReceived = async (req, res) => {
  try {
    const { carId } = req.body

    const currentMonth =
      new Date().toISOString().slice(0, 7)

    const car = await Car.findById(carId)

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      })
    }

    const existingPayment =
      await Payment.findOne({
        car: carId,
        month: currentMonth,
      })

    if (existingPayment) {
      return res.status(400).json({
        message:
          "Payment already recorded for this month",
      })
    }

    const payment = await Payment.create({
      car: carId,
      month: currentMonth,
      amount: car.monthlyAmount,
      paid: true,
      paidDate: new Date(),
    })

    res.status(201).json({
      message:
        "Payment recorded successfully",
      payment,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getPaymentSummary = async (req, res) => {
  try {
    const currentMonth =
      new Date().toISOString().slice(0, 7)

    const payments = await Payment.find({
      month: currentMonth,
    })

    const totalRevenue = payments.reduce(
      (total, payment) => total + payment.amount,
      0
    )

    const paidCustomers = payments.length

    res.status(200).json({
      totalRevenue,
      paidCustomers,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}


export const getCurrentMonthPayments = async (req, res) => {
  try {
    const currentMonth =
      new Date().toISOString().slice(0, 7)

    const payments = await Payment.find({
      month: currentMonth,
    }).populate(
      "car",
      "ownerName carNumber monthlyAmount"
    )

    res.status(200).json(payments)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}