import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import FlightsPage from "@/components/FlightsPage";
import ProfilePage from "@/components/ProfilePage";
import MyBookingsPage from "@/components/MyBookingsPage"; // ✅ ADD
import BookingPage from "@/components/BookingPage";
import TicketPage from "@/components/TicketPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flights" element={<FlightsPage />} />

          {/* 🔥 PROFILE */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* 🔥 MY BOOKINGS */}
          <Route path="/bookings" element={<MyBookingsPage />} />

          {/* Booking System Page */}
          <Route path="/booking" element={<BookingPage />} />

          {/* Ticket Page */}
          <Route path="/ticket" element={<TicketPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;