import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AuthPage from "@/components/AuthPage";
import CinematicTransition from "@/components/CinematicTransition";
import LandingPage from "@/components/LandingPage";

type AppState = "auth" | "transition" | "app";

const Index = () => {
  const [state, setState] = useState<AppState>("auth");

  // ✅ CHECK LOGIN ON LOAD
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setState("app");
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setState("transition");
  };

  const handleTransitionComplete = () => setState("app");

  const handleLogout = () => {
    localStorage.clear();
    setState("auth");
  };

  return (
    <AnimatePresence mode="wait">
      {state === "auth" && <AuthPage key="auth" onLogin={handleLogin} />}

      {state === "transition" && (
        <CinematicTransition key="transition" onComplete={handleTransitionComplete} />
      )}

      {state === "app" && <LandingPage key="app" onLogout={handleLogout} />}
    </AnimatePresence>
  );
};

export default Index;