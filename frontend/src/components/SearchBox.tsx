import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { airports } from "@/data/airports";

const SearchBox = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  // 🔥 OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setShowFrom(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setShowTo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterAirports = (value: string) => {
    return airports.filter((a) =>
      a.city.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearch = () => {
    const fromCode = airports.find(a => a.city === from)?.code;
    const toCode = airports.find(a => a.city === to)?.code;

    if (!fromCode || !toCode || !date) {
      alert("⚠️ Please select valid cities and date");
      return;
    }

    if (date < today) {
      alert("❌ Past dates not allowed");
      return;
    }

    navigate(
      `/flights?from=${fromCode}&to=${toCode}&date=${date}&passengers=${passengers}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="relative z-10 -mt-24 mx-auto max-w-5xl px-6"
    >
      <div className="glass rounded-2xl p-6 md:p-8">
        <h3 className="text-primary-foreground text-lg font-semibold mb-6">
          Search Flights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* FROM */}
          <div ref={fromRef} className="relative">
            <InputField
              icon={<MapPin className="w-5 h-5 text-black" />}
              placeholder="From"
              value={from}
              onChange={(v) => {
                setFrom(v);
                setShowFrom(v.length > 0); // 🔥 FIX
              }}
            />

            {showFrom && (
              <div className="absolute z-50 bg-white text-black w-full mt-1 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {filterAirports(from).map((a) => (
                  <div
                    key={a.code}
                    onClick={() => {
                      setFrom(a.city);
                      setShowFrom(false);
                    }}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                  >
                    {a.city} ({a.code})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TO */}
          <div ref={toRef} className="relative">
            <InputField
              icon={<MapPin className="w-5 h-5 text-black" />}
              placeholder="To"
              value={to}
              onChange={(v) => {
                setTo(v);
                setShowTo(v.length > 0); // 🔥 FIX
              }}
            />

            {showTo && (
              <div className="absolute z-50 bg-white text-black w-full mt-1 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {filterAirports(to).map((a) => (
                  <div
                    key={a.code}
                    onClick={() => {
                      setTo(a.city);
                      setShowTo(false);
                    }}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                  >
                    {a.city} ({a.code})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DATE */}
          <div className="relative custom-date">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer"
              onClick={() => {
                const input = document.getElementById("search-date") as HTMLInputElement;
                (input as any).showPicker?.() || input.focus();
              }}
            />

            <input
              id="search-date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all cursor-pointer"
            />
          </div>

          {/* PASSENGERS */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="text-black">
                  {n} Passenger{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH */}
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gold text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="w-5 h-5" />
            Search
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon, placeholder, value, onChange }: any) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
      {icon}
    </div>

    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-11 pr-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
    />
  </div>
);

export default SearchBox;