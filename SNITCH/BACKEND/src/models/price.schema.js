import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["INR", "USD", "AFN", "JPY", "GBP", "CHF", "EUR"],
      default: "INR",
    },
  },
  {
    _id: false,
    _v: false,
  },
);

export default priceSchema;
