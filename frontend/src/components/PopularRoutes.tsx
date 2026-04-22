import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const routes = [
  { from: "Delhi", to: "Mumbai", price: "₹3,599" },
  { from: "Bangalore", to: "Goa", price: "₹2,899" },
  { from: "Mumbai", to: "Kolkata", price: "₹4,199" },
  { from: "Chennai", to: "Delhi", price: "₹3,999" },
];

const PopularRoutes = () => {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        >
          Popular Routes
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border bg-card">
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 text-card-foreground">
                    <span className="font-semibold text-lg">{route.from}</span>
                    <Plane className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">{route.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <span className="text-2xl font-bold text-accent">{route.price}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
