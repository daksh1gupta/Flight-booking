import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCityName } from "@/utils/formatCity";

const API_URL = "http://localhost:5000/api/flights";

const FlightsPage = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [priceLimit, setPriceLimit] = useState(7000);
  const [airline, setAirline] = useState("All");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  const from = query.get("from") || "DEL";
  const to = query.get("to") || "BOM";
  const passengers = Number(query.get("passengers")) || 1;

  // 🔥 FETCH API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}?from=${from}&to=${to}&date=2026-05-01&passengers=${passengers}`
        );

        const data = await res.json();

        setFlights(data);
        setFiltered(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, passengers]);

  // 🔥 FILTER
  useEffect(() => {
    let updated = flights.filter((f) => Number(f.price) <= priceLimit);

    if (airline !== "All") {
      updated = updated.filter((f) => f.airline?.includes(airline));
    }

    setFiltered(updated);
  }, [priceLimit, airline, flights]);

  const formatTime = (time: string) => {
    if (!time) return "N/A";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔥 SKELETON CARD
  const SkeletonCard = () => (
    <div className="bg-white/70 rounded-2xl p-7 shadow-lg space-y-4 animate-pulse">
      <div className="h-5 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="h-4 w-48 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="h-4 w-40 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-5 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        <div className="h-10 w-24 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 p-6">

      <h1 className="text-5xl font-bold text-center mb-10 tracking-wide">
        {getCityName(from)} → {getCityName(to)} ✈️ Flights
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* FILTER */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-md p-6 h-fit sticky top-6">
          <h2 className="font-bold text-xl mb-5 text-gray-800">Filters</h2>

          <div className="mb-6">
            <p className="text-base font-semibold mb-2">
              Max Price: ₹{priceLimit}
            </p>

            <input
              type="range"
              min="3000"
              max="8000"
              value={priceLimit}
              onChange={(e) => setPriceLimit(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <p className="text-base font-semibold mb-2">Airline</p>

            <select
              onChange={(e) => setAirline(e.target.value)}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="IndiGo">IndiGo</option>
              <option value="Air India">Air India</option>
              <option value="Vistara">Vistara</option>
            </select>
          </div>
        </div>

        {/* FLIGHTS */}
        <div className="lg:col-span-3 space-y-6">

          {/* 🔥 SKELETON LOADER */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4,5,6].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && filtered.length === 0 && (
            <div className="text-center text-gray-400 text-lg">
              No flights found 😢
            </div>
          )}

          {/* REAL DATA */}
          {!loading &&
            filtered.map((flight, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-7 flex justify-between items-center hover:scale-[1.02] transition-all duration-300"
              >

                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {flight.airline}
                  </p>

                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {getCityName(flight.from)} → {getCityName(flight.to)}
                  </p>

                  <p className="text-base mt-1 font-medium">
                    {formatTime(flight.departure)} - {formatTime(flight.arrival)}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {flight.duration}
                  </p>

                  <div className="text-green-600 text-sm mt-1">
                    ⚡ Non-stop • Premium Deal
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm line-through text-gray-400">
                    ₹{Number(flight.price) + 1500}
                  </p>

                  <p className="text-4xl font-bold text-blue-600">
                    ₹{Number(flight.price).toLocaleString()}
                  </p>

                  <p className="text-green-600 text-sm font-medium">
                    Save ₹1500 🔥
                  </p>

                  <button
                    onClick={() => navigate("/booking", { state: flight })}
                    className="mt-4 px-7 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 hover:shadow-lg transition-all"
                  >
                    Book Now ✈️
                  </button>
                </div>

              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default FlightsPage;