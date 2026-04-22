import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: String,
  price: Number,
});

export default mongoose.model("Flight", flightSchema);