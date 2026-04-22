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
  pnr: String,

  status: {
    type: String,
    default: "Booked",
  },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);