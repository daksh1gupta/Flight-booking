export const getFakeFlights = ({
  from,
  to,
  date,
  passengers,
}: {
  from: string;
  to: string;
  date: string;
  passengers: number;
}) => {
  return [
    {
      id: 1,
      airline: "IndiGo",
      from,
      to,
      departure: "10:00 AM",
      arrival: "12:10 PM",
      duration: "2h 10m",
      price: 4599 + passengers * 200,
    },
    {
      id: 2,
      airline: "Air India",
      from,
      to,
      departure: "2:00 PM",
      arrival: "4:20 PM",
      duration: "2h 20m",
      price: 5899 + passengers * 300,
    },
    {
      id: 3,
      airline: "Vistara",
      from,
      to,
      departure: "6:00 PM",
      arrival: "8:10 PM",
      duration: "2h 10m",
      price: 6299 + passengers * 250,
    },
  ];
};