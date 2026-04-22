import { motion } from "framer-motion";
import skyHero from "@/assets/sky-hero.jpg";
import airplaneImg from "@/assets/airplane.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={skyHero} alt="Sky background" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/50" />
      </div>

      {/* Realistic flying airplane */}
      <div className="absolute top-1/4 left-0 w-full pointer-events-none z-[5]">
        <div className="animate-fly-plane">
          <div className="animate-float">
            <img
              src={airplaneImg}
              alt="Flying airplane"
              className="w-40 md:w-56 h-auto drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3)) blur(0.3px)",
              }}
              width={1024}
              height={512}
            />
          </div>
        </div>
      </div>

      {/* Vapor trail */}
      <div className="absolute top-1/4 left-0 w-full pointer-events-none z-[4]">
        <div className="animate-fly-plane-trail">
          <div className="w-64 h-[2px] bg-gradient-to-l from-primary-foreground/40 to-transparent rounded-full" 
               style={{ filter: "blur(2px)", transform: "translateX(-260px) translateY(28px)" }} />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          Fly Anywhere.
          <br />
          <span className="text-gold">Dream Everywhere.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto"
        >
          Smart AI-powered flight booking for destinations all across India
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
