import fetch from "node-fetch";

export const getFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_API_KEY}&dep_iata=${from}`
    );

    const data = await response.json();

    console.log("API DATA:", data);

    // ❌ API ERROR
    if (data.error) {
      return res.status(400).json({
        message: data.error.message,
      });
    }

    // ❌ NO DATA
    if (!data.data || data.data.length === 0) {
      return res.json([]);
    }

    // ✅ FILTER BY DESTINATION
    const flights = data.data
      .filter((f) => f.arrival?.iata === to)
      .slice(0, 12)
      .map((f, index) => ({
        id: index,
        airline: f.airline?.name || "Unknown Airline",
        from: f.departure?.iata || from,
        to: f.arrival?.iata || to,
        departure: f.departure?.scheduled || null,
        arrival: f.arrival?.scheduled || null,
        duration: "2h 30m",
        price: Math.floor(Math.random() * 4000) + 3000,
      }));

    // ❌ NO MATCH FOUND
    if (flights.length === 0) {
      return res.json([]);
    }

    res.json(flights);

  } catch (error) {
    console.error("🔥 Flight API Error:", error.message);
    res.status(500).json({ message: "Failed to fetch flights" });
  }
};