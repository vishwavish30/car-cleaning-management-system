import User from "../models/User.js"

export const getWorkers = async (req, res) => {
  try {
    const workers = await User.find(
      {
        role: "worker",
      },
      {
        password: 0,
      }
    )

    res.status(200).json(workers)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}


export const deactivateWorker = async (req, res) => {
  try {
    const worker = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      {
        returnDocument: "after",
      }
    ).select("-password")

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      })
    }

    res.status(200).json({
      message: "Worker deactivated successfully",
      worker,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}