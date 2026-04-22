import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface CinematicTransitionProps {
  onComplete: () => void;
}

const CinematicTransition = ({ onComplete }: CinematicTransitionProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 gradient-sky flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Clouds */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary-foreground/20"
          style={{
            width: `${120 + i * 50}px`,
            height: `${40 + i * 15}px`,
            top: `${10 + i * 15}%`,
            filter: "blur(15px)",
          }}
          initial={{ x: "100vw" }}
          animate={{ x: "-200px" }}
          transition={{ duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}

      {/* Airplane flying across */}
      <motion.div
        initial={{ x: "-200px", y: 10, rotate: -3 }}
        animate={{ x: "calc(100vw + 200px)", y: -10, rotate: 3 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
        <Plane className="w-24 h-24 text-primary-foreground drop-shadow-2xl" strokeWidth={1.2} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, times: [0, 0.2, 0.7, 1] }}
        className="absolute bottom-20 text-primary-foreground text-xl font-light tracking-widest"
      >
        Preparing your journey...
      </motion.p>
    </motion.div>
  );
};

export default CinematicTransition;
