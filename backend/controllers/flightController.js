import fetch from "node-fetch";

export const getFlights = async (req, res) => {
  try {
    const { from, to } = req.query;

    // ✅ ONLY dep_iata use karo
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_API_KEY}&dep_iata=${from}`
    );

    const data = await response.json();

    console.log("API RESPONSE:", data);

    // ❌ API ERROR
    if (data.success === false) {
      return res.status(400).json({
        error: data.error?.type,
        message: data.error?.info,
      });
    }

    if (!data.data) {
      return res.status(500).json({
        message: "Invalid API response",
      });
    }

    // 🔥 FILTER BY DESTINATION
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

    // ❌ STILL EMPTY
    if (flights.length === 0) {
      return res.status(404).json({
        message: "Flights exist but not matching destination",
      });
    }

    res.json(flights);

  } catch (error) {
    console.error("🔥 SERVER ERROR:", error.message);

    res.status(500).json({
      error: "Server failed to fetch flights",
    });
  }
};