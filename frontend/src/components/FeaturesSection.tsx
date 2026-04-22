import { motion } from "framer-motion";
import { DollarSign, Shield, Zap, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: DollarSign,
    title: "Lowest Fares",
    description: "Compare prices across 100+ airlines instantly",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "256-bit encrypted payments for peace of mind",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get your e-ticket within seconds of booking",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "AI-powered assistant + human agents always ready",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-background bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        >
          Why Choose <span className="text-primary">FlightX</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow border-border bg-card">
                <CardContent className="p-0 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
