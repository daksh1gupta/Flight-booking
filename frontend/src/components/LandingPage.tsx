import { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SearchBox from "./SearchBox";
import FeaturesSection from "./FeaturesSection";
import PopularRoutes from "./PopularRoutes";
import AIChatAssistant from "./AIChatAssistant";
import TravelSection from "./TravelSection";
import Footer from "./Footer";
import AboutSection from "./AboutSection";

interface LandingPageProps {
  onLogout: () => void;
}

const LandingPage = ({ onLogout }: LandingPageProps) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* TOP BLUE SECTION */}
      <div className="gradient-sky">
        <Navbar onLogout={onLogout} />

        <div id="home">
          <HeroSection />
        </div>

        <div id="search">
          <SearchBox />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-grow">
        
        <FeaturesSection />

        <div id="about">
          <AboutSection />
        </div>

        <div id="routes">
          <PopularRoutes />
        </div>

        <TravelSection />
      </div>

      {/* FOOTER */}
      <Footer />

      {/* CHAT */}
      <AIChatAssistant
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />
    </div>
  );
};

export default LandingPage;