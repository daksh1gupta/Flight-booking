import fetch from "node-fetch";

export const getFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    // 🔥 Aviation API call
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_API_KEY}&dep_iata=${from}&arr_iata=${to}`
    );

    const data = await response.json();

    // ❌ no data
    if (!data.data || data.data.length === 0) {
      return res.json([]);
    }

    // 🔥 clean formatted data (NO LOGO STUFF)
    const flights = data.data.slice(0, 12).map((f, index) => ({
      id: index,

      // airline name only
      airline: f.airline?.name || "Unknown Airline",

      // route
      from: f.departure?.iata || from,
      to: f.arrival?.iata || to,

      // time
      departure: f.departure?.scheduled || null,
      arrival: f.arrival?.scheduled || null,

      // duration (static for now)
      duration: "2h 30m",

      // fake price (realistic range)
      price: Math.floor(Math.random() * 4000) + 3000,
    }));

    res.json(flights);
  } catch (error) {
    console.error("Flight API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};