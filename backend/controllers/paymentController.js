import fetch from "node-fetch";
import Booking from "../models/Booking.js";

// 🔥 DYNAMIC AIRLINE CODE (BEST VERSION)
const getAirlineCode = (airline) => {
  if (!airline) return "FLT";
  return airline.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
};

// 🔥 PNR GENERATOR (AIRLINE STYLE)
const generatePNR = (airline, length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";

  for (let i = 0; i < length; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const code = getAirlineCode(airline);

  return `${code}-${randomPart}`;
};

export const createOrder = async (req, res) => {
  try {
    const { amount, name, from, to, airline } = req.body;

    // 🔥 NEW PNR
    const pnr = generatePNR(airline);

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify({
        order_id: pnr,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_name: name,
          customer_email: "test@test.com",
          customer_phone: "9999999999",
        },
        order_meta: {
          return_url: `http://localhost:8080/ticket/${pnr}`,
        },
      }),
    });

    const data = await response.json();

    console.log("CASHFREE RESPONSE:", data);

    if (!data.payment_session_id) {
      return res.status(400).json({
        error: "Payment session not created",
        details: data,
      });
    }

    // 🔥 FUTURE TIME FIX
    const departureTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const arrivalTime = new Date(Date.now() + 4 * 60 * 60 * 1000);

    // ✅ SAVE BOOKING
    await Booking.create({
      name,
      airline: airline || "Unknown Airline",
      from,
      to,
      departure: departureTime,
      arrival: arrivalTime,
      price: amount,
      pnr,
      status: "Booked",
      paymentStatus: "Paid",
    });

    res.json({
      session_id: data.payment_session_id,
      pnr,
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    res.status(500).json({
      error: "Payment failed",
    });
  }
};