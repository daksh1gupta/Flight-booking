import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  { name: "Delhi", img: "/cities/delhi.svg" },
  { name: "Mumbai", img: "/cities/mumbai.svg" },
  { name: "Bangalore", img: "/cities/bangalore.svg" },
  { name: "Jaipur", img: "/cities/jaipur.svg" },
  { name: "Lucknow", img: "/cities/lucknow.svg" },
  { name: "Hyderabad", img: "/cities/hyderabad.svg" },
  { name: "Chennai", img: "/cities/chennai.svg" },
  { name: "Kolkata", img: "/cities/kolkata.svg" },
  { name: "Pune", img: "/cities/pune.svg" },
  { name: "Ahmedabad", img: "/cities/ahmedabad.svg" },
];

export default function TravelSection() {
  return (
    <div className="py-10 px-4 bg-secondary">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Trending Tourist Destinations
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-10 justify-items-center max-w-5xl mx-auto">

        {destinations.map((place, index) => (
          <div key={index} className="text-center">

            {/* Circle with ICON */}
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2 
              transition-transform duration-300 ease-out 
              hover:scale-105 hover:bg-blue-200 
              hover:ring-2 hover:ring-black/40">

              <img
                src={place.img}
                alt={place.name}
                className="w-16 h-16 object-contain pointer-events-none"
              />

            </div>

            {/* Text */}
            <p className="font-semibold text-base md:text-lg hover:text-blue-600 transition duration-200 cursor-pointer">
              {place.name}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}