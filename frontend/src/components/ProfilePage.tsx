import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const Section = ({ title, children }: any) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h2 className="font-semibold text-lg">{title}</h2>
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const ProfilePage = () => {
  const [data, setData] = useState<any>({});
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD: local + backend
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) setData(JSON.parse(saved));

    setImage(localStorage.getItem("userImage"));

    // backend se fetch
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((res) => {
        if (res && Object.keys(res).length > 0) {
          setData(res);
        }
      })
      .catch(() => {});
  }, []);

  // 🔥 INPUT CHANGE
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔥 IMAGE UPLOAD (same as before)
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("userImage", reader.result as string);
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 SAVE (local + backend)
  const handleSaveAll = async () => {
    try {
      setLoading(true);

      // local backup
      localStorage.setItem("profileData", JSON.stringify(data));

      // backend save
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.message || "Saved ✅");
    } catch (err) {
      console.log(err);
      alert("Error saving ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 🔥 TOP CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl flex items-center gap-6 mb-6">
        <div className="relative">
          <img
            src={
              image ||
              `https://ui-avatars.com/api/?name=${data.firstName || "User"}`
            }
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />

          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
            <Upload className="w-4 h-4 text-black" />
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {data.firstName || "User"} {data.lastName || ""}
          </h1>
          <p>{localStorage.getItem("userEmail")}</p>
        </div>
      </div>

      {/* 🔥 GENERAL */}
      <Section title="General Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="type" placeholder="Passenger Type" onChange={handleChange} className="input" />
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />

          {/* ✅ Date picker already OK */}
          <input type="date" name="dob" onChange={handleChange} className="input" />

          <input name="address" placeholder="Address" onChange={handleChange} className="input" />
          <input name="city" placeholder="City" onChange={handleChange} className="input" />
          <input name="state" placeholder="State" onChange={handleChange} className="input" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input" />
        </div>
      </Section>

      {/* 🔥 CONTACT */}
      <Section title="Contact Details">
        <div className="grid grid-cols-2 gap-4">
          <input value={localStorage.getItem("userEmail") || ""} disabled className="input" />
          <input name="mobile" placeholder="Mobile Number" onChange={handleChange} className="input" />
        </div>
      </Section>

      {/* 🔥 PASSPORT */}
      <Section title="Passport Details">
        <div className="grid grid-cols-3 gap-4">
          <input name="passport" placeholder="Passport Number" onChange={handleChange} className="input" />
          <input type="date" name="expiry" onChange={handleChange} className="input" />
          <input type="file" className="input" />
        </div>
      </Section>

      {/* EXTRA */}
      <Section title="Visa Details">Coming soon...</Section>
      <Section title="Frequent Flyer Details">Coming soon...</Section>
      <Section title="Covid-19 Certificates">Coming soon...</Section>

      {/* 🔥 MAIN SAVE BUTTON */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="btn"
        >
          {loading ? "Saving..." : "Save Details"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;