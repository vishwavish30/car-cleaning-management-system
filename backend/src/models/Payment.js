import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
    },

    paidDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model(
  "Payment",
  paymentSchema
)

export default Payment