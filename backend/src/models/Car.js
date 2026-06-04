import mongoose from "mongoose"

const carSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },

    flatName: {
      type: String,
      required: true,
    },

    carNumber: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
    },

    monthlyAmount: {
      type: Number,
      required: true,
    },

    carPhoto: {
      type: String,
    },

    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Car = mongoose.model("Car", carSchema)

export default Car