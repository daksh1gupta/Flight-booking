import express from "express";
import {
  createBooking,
  getBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

import Booking from "../models/Booking.js"; // 🔥 ADD THIS

const router = express.Router();

// CREATE
router.post("/", createBooking);

// GET ALL
router.get("/", getBookings);

// 🔥 GET BY PNR (IMPORTANT)
router.get("/:pnr", async (req, res) => {
  try {
    const booking = await Booking.findOne({ pnr: req.params.pnr });

    if (!booking) {
      return res.status(404).json({ message: "Ticket not found ❌" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CANCEL
router.put("/:id", cancelBooking);

export default router;