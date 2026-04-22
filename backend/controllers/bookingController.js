import Booking from "../models/Booking.js";

// CREATE
export const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
};

// GET ALL
export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

// CANCEL
export const cancelBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "Cancelled",
  });
  res.json({ message: "Cancelled" });
};