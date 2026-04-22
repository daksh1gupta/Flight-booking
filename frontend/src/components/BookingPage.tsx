import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { getCityName } from "@/utils/formatCity";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  if (!flight) {
    return <div className="p-10 text-center">No Flight Selected ❌</div>;
  }

  const total = flight.price + 499;

  // 🔥 UPDATED BOOKING FUNCTION
  const handleBooking = async () => {
    if (!name || !email || !mobile) {
      alert("⚠️ Please fill all details");
      return;
    }

    const booking = {
      ...flight,
      name,
      email,
      mobile,
      price: total,
      pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: "Booked",
    };

    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      alert("Booking Confirmed ✈️🔥");

      navigate("/ticket", { state: booking });

    } catch (error) {
      console.error("Booking Error:", error);
      alert("❌ Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 p-6">

      {/* HERO */}
      <div className="h-56 rounded-3xl overflow-hidden mb-8 relative shadow-xl">
        <img
          src="/booking-banner.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
            Confirm Your Journey ✈️
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* FLIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/40"
          >
            <h2 className="text-xl font-bold mb-4">Flight Details</h2>

            <p className="text-2xl font-bold text-blue-700">
              {flight.airline}
            </p>

            <p className="text-lg mt-2">
              {getCityName(flight.from)} → {getCityName(flight.to)}
            </p>

            <p className="text-gray-600 mt-2">
              {new Date(flight.departure).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(flight.arrival).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>

          {/* PASSENGER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/40"
          >
            <h2 className="text-xl font-bold mb-5">Passenger Details</h2>

            <div className="space-y-4">

              <input
                placeholder="Full Name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="Mobile Number"
                className="input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

            </div>
          </motion.div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6 sticky top-6">

          {/* PRICE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/40"
          >
            <h2 className="text-lg font-bold mb-4">Price Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Base Fare</span>
              <span>₹{flight.price}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Taxes & Fees</span>
              <span>₹499</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold text-blue-700">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </motion.div>

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBooking}
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all"
          >
            Confirm Booking ✈️
          </motion.button>

        </div>

      </div>
    </div>
  );
};

export default BookingPage;