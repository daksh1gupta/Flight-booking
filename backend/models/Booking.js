import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,

  airline: String,
  from: String,
  to: String,

  departure: Date,
  arrival: Date,

  price: Number,

  pnr: {
    type: String,
    unique: true,
  },

  paymentStatus: {
    type: String,
    default: "Pending",
  },

  status: {
    type: String,
    default: "Pending",
  },

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);