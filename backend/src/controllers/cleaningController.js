import CleaningRecord from "../models/CleaningRecord.js"

export const markCarCleaned = async (req, res) => {
  try {
    const { carId } = req.body

    const today = new Date().toISOString().split("T")[0]

    const alreadyCleaned = await CleaningRecord.findOne({
      car: carId,
      date: today,
    })

    if (alreadyCleaned) {
      return res.status(400).json({
        message: "Car already marked as cleaned today",
      })
    }

    const record = await CleaningRecord.create({
      car: carId,
      worker: req.user.id,
      date: today,
    })

    res.status(201).json({
      message: "Car marked as cleaned",
      record,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getTodaySummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]

    const cleanedToday = await CleaningRecord.countDocuments({
      date: today,
    })

    res.status(200).json({
      cleanedToday,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}


export const getTodayCleanedCars = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]

    const records = await CleaningRecord.find({
      date: today,
    })
      .populate("car")
      .populate("worker", "name")

    res.status(200).json(records)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}