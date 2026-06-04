import mongoose from "mongoose"

const cleaningRecordSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["cleaned"],
      default: "cleaned",
    },
  },
  {
    timestamps: true,
  }
)

const CleaningRecord = mongoose.model(
  "CleaningRecord",
  cleaningRecordSchema
)

export default CleaningRecord