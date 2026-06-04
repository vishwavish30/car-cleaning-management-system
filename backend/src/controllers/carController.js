import Car from "../models/Car.js"



// Add te new car(POST)
export const addCar = async (req, res) => {
  try {
    const {
      ownerName,
      flatName,
      carNumber,
      phoneNumber,
      monthlyAmount,
      assignedWorker,
    } = req.body

    const carExists = await Car.findOne({ carNumber })

    if (carExists) {
      return res.status(400).json({
        message: "Car already exists",
      })
    }

    const newCar = await Car.create({
      ownerName,
      flatName,
      carNumber,
      phoneNumber,
      monthlyAmount,
      assignedWorker,
    })

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}


// fetch the Cars(GET)
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate(
      "assignedWorker",
      "name email role"
    )

    res.status(200).json(cars)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// Update the car(PUT)
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    )

    if (!updatedCar) {
      return res.status(404).json({
        message: "Car not found",
      })
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}


// delete the car AKA deactive (delete)
export const deactivateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      {
        returnDocument: "after",
      }
    )

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      })
    }

    res.status(200).json({
      message: "Car deactivated successfully",
      car,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}