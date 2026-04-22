import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Home, Ticket, LogOut, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const userImage = localStorage.getItem("userImage"); // ✅ ADD

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 glass-dark"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Plane className="w-7 h-7 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground">
            FlightX
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* HOME */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Home</span>
          </button>

          {/* USER PROFILE */}
          <div className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {/* 🔥 UPDATED DP */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                {userImage ? (
                  <img
                    src={userImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* NAME */}
              <span className="text-sm text-primary-foreground hidden sm:inline">
                {userName}
              </span>

              <ChevronDown className="w-4 h-4 text-primary-foreground" />
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-44 bg-white text-black rounded-xl shadow-xl border backdrop-blur-md overflow-hidden"
                >

                  {/* PROFILE */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>

                  {/* BOOKINGS */}
                  <button
                    onClick={() => {
                      navigate("/bookings"); // ✅ ADD
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    My Bookings
                  </button>
                  
                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 hover:bg-red-100 text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;