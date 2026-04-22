import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getCityName } from "@/utils/formatCity";

const tabs = ["Booked", "Cancelled", "Waiting", "Unsuccessful"];

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState("Booked");
  const [bookings, setBookings] = useState<any[]>([]);
  const [showPlane, setShowPlane] = useState(true);
  const navigate = useNavigate();

  // 🔥 FETCH FROM BACKEND
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();

      // 🔥 AUTO REMOVE EXPIRED
      const now = new Date();
      const valid = data.filter((b: any) => new Date(b.departure) > now);

      setBookings(valid);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();

    setTimeout(() => {
      setShowPlane(false);
    }, 2500);
  }, []);

  // 🔥 CANCEL API
  const handleCancel = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
      });

      fetchBookings(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FILTER
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "Booked") return b.status === "Booked";
    if (activeTab === "Cancelled") return b.status === "Cancelled";
    if (activeTab === "Waiting") return b.status === "Waiting";
    if (activeTab === "Unsuccessful") return b.status === "Unsuccessful";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">

      {/* HERO */}
      <div className="relative h-60 overflow-hidden">

        <img src="/banner.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>

        {showPlane && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: 2 }}
              transition={{ duration: 2.5 }}
              className="absolute left-1/2 top-1/2 w-[450px] h-[180px] -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-3xl rounded-full z-10"
            />

            <motion.img
              src="/plane.png"
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 2.8, y: -140, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5 }}
              className="absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2 z-20"
            />
          </>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30">
          <h1 className="text-4xl font-bold">My Bookings</h1>
          <p>Manage all your journeys ✈️</p>
        </div>

      </div>

      <div className="p-6">

        {/* HOME BUTTON */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:scale-105 transition"
          >
            ⬅ Back to Home
          </button>
        </div>

        {/* TABS */}
        <div className="bg-white/80 rounded-2xl p-2 flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-blue-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-3">

            {filteredBookings.length === 0 ? (
              <div className="bg-white p-10 rounded-xl text-center">
                No bookings here 😢
              </div>
            ) : (
              <div className="space-y-4">

                {filteredBookings.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white rounded-xl p-5 flex justify-between shadow"
                  >

                    <div>
                      <h2 className="font-bold text-lg">
                        {getCityName(b.from)} → {getCityName(b.to)}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {new Date(b.departure).toLocaleDateString()} • {b.name}
                      </p>

                      <p className="text-xs mt-1 text-gray-400">
                        PNR: {b.pnr}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-blue-600">
                        ₹ {b.price}
                      </p>

                      {b.status === "Booked" && (
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="mt-2 text-red-500 text-sm"
                        >
                          Cancel
                        </button>
                      )}

                      <p className="text-xs mt-2 text-gray-400">
                        {b.status}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold mb-3">Search 🔍</h3>
              <input placeholder="Enter PNR" className="input" />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold mb-3">Why FlightX ✈️</h3>
              <ul className="text-sm space-y-2">
                <li>⚡ Instant Booking</li>
                <li>💰 Best Price</li>
                <li>🎯 AI Suggestions</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 flex items-center justify-between hover:shadow-lg hover:border-blue-400 transition-all">
              <div>
                <h3 className="font-semibold text-gray-800">
                  FlightX App →
                </h3>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>📱 Book tickets instantly</p>
                  <p>⚡ Track journeys live</p>
                  <p>🎯 Smart AI travel help</p>
                </div>
              </div>

              <img
                src="/flight.png"
                className="w-14 h-14 object-contain animate-float"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;