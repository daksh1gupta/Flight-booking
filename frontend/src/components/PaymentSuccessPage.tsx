import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 temporary redirect (demo)
    setTimeout(() => {
      navigate("/ticket");
    }, 2000);
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Payment Successful ✅</h1>
      <p className="mt-4 text-gray-500">Redirecting to your ticket...</p>
    </div>
  );
};

export default PaymentSuccessPage;