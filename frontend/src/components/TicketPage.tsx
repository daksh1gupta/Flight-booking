import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { airports } from "@/data/airports";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pnr } = useParams();

  const [data, setData] = useState<any>(location.state || null);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    if (!data && pnr) {
      const fetchTicket = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/bookings/${pnr}` // 🔥 BETTER API
          );
          const ticket = await res.json();

          setData(ticket);
        } catch (err) {
          console.log(err);
        }
      };

      fetchTicket();
    }
  }, [pnr, data]);

  if (!data) {
    return <div className="p-10 text-center">Loading Ticket...</div>;
  }

  const getCityName = (code: string) => {
    const airport = airports.find((a) => a.code === code);
    return airport ? `${airport.city} (${code})` : code;
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-50 p-6 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6">Your Ticket 🎫</h1>

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">FlightX</h2>
            <p className="text-sm opacity-80">Boarding Pass</p>
          </div>
          <div className="text-right">
            <p className="text-sm">PNR</p>
            <p className="font-bold text-lg">{data.pnr}</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Passenger</p>
            <p className="font-bold text-lg">{data.name}</p>

            <p className="text-gray-500 text-sm mt-4">From</p>
            <p className="font-bold text-lg">{getCityName(data.from)}</p>

            <p className="text-gray-500 text-sm mt-4">Departure</p>
            <p>{new Date(data.departure).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Airline</p>
            <p className="font-bold text-lg">{data.airline}</p>

            <p className="text-gray-500 text-sm mt-4">To</p>
            <p className="font-bold text-lg">{getCityName(data.to)}</p>

            <p className="text-gray-500 text-sm mt-4">Arrival</p>
            <p>{new Date(data.arrival).toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Price</p>
            <p className="text-xl font-bold text-blue-600">₹{data.price}</p>
          </div>

          {/* 🔥 QR CODE */}
          <QRCodeCanvas
            value={`http://localhost:8080/ticket/${data.pnr}`} // 🔥 FIXED
            size={80}
          />
        </div>

      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Download Ticket 📥
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-105 transition"
        >
          Next ➡️
        </button>
      </div>

    </div>
  );
};

export default TicketPage;