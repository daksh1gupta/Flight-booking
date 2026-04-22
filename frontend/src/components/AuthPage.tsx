import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Mail, Lock, User } from "lucide-react";

interface AuthPageProps {
  onLogin: () => void; // ✅ ADD
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isSignup && !name)) {
      alert("⚠️ Please fill all fields");
      return;
    }

    // ✅ SAVE LOGIN
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    if (name) {
      localStorage.setItem("userName", name);
    }

    // ✅ IMPORTANT: CALL INDEX FUNCTION
    onLogin();
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT */}
      <div className="hidden lg:flex lg:w-1/2 gradient-sky items-center justify-center">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-center"
        >
          <Plane className="w-32 h-32 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white">FlightX</h2>
          <p className="text-white/80">Your journey begins here</p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <div className="flex items-center gap-2 justify-center mb-6">
              <Plane className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">FlightX</span>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <AnimatePresence>
              {isSignup && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border"
              />
            </div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </motion.button>
          </form>

          {/* SWITCH */}
          <p className="text-center mt-6">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary font-semibold"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;