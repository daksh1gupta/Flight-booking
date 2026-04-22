import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Flight from "./models/Flight.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Flight.deleteMany(); // purana data clear

    await Flight.insertMany([
      { from: "Delhi", to: "Mumbai", date: "2026-05-01", price: 3500 },
      { from: "Delhi", to: "Mumbai", date: "2026-05-02", price: 3200 },
      { from: "Bangalore", to: "Goa", date: "2026-05-03", price: 2800 },
      { from: "Mumbai", to: "Kolkata", date: "2026-05-04", price: 4200 }
    ]);

    console.log("Data Inserted ✅");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();