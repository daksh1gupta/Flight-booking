# 🚀 FlightX – Backend API (Flight Booking System)

A scalable and structured **Backend API** for the FlightX booking system built using **Node.js, Express.js, and MongoDB**.

This backend powers the flight search system and handles flight data management with a clean MVC architecture.

---

## 🚀 Features

### ✈️ Flight API

* Fetch flights based on:

  * Departure airport (IATA code)
  * Arrival airport (IATA code)
* External API integration (**AviationStack API**)
* Clean and formatted flight data response

---

### 📊 Data Handling

* Flight data modeling using MongoDB
* Seed script for inserting initial data
* Structured data formatting for frontend usage

---

### 🔌 REST API Routes

#### 🔹 Flights

```id="flightapi"
/api/flights?from=DEL&to=BOM
```

#### 🔹 Profile

```id="profileapi"
/api/profile
```

---

### 🧠 Backend Logic Highlights

* API data transformation (external → frontend friendly)
* Randomized pricing system for realistic UI
* Duration handling (static fallback)
* Error handling for failed API responses

---

## 🛠️ Tech Stack

* 🟢 Node.js
* ⚡ Express.js
* 🍃 MongoDB
* 🌐 AviationStack API
* 📦 node-fetch

---

## 📂 Project Structure

```id="backendstructure"
backend/
│── config/
│   └── db.js              # MongoDB connection
│
│── controllers/
│   └── flightController.js
│
│── models/
│   └── Flight.js
│
│── routes/
│   ├── flightRoutes.js
│   └── profileRoutes.js
│
│── .env                   # API keys & config
│── seed.js                # Seed script
│── server.js              # Entry point
│── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Navigate to backend

```bash id="cdbackend"
cd backend
```

### 2️⃣ Install dependencies

```bash id="installbackend"
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env id="envsetup"
PORT=5000
MONGO_URI=your_mongodb_connection
AVIATION_API_KEY=your_api_key
```

---

### 4️⃣ Run server

```bash id="runbackend"
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🌐 API Usage

Example request:

```bash id="apiexample"
GET /api/flights?from=DEL&to=BOM
```

Example response:

```json id="apiresponse"
[
  {
    "airline": "IndiGo",
    "from": "DEL",
    "to": "BOM",
    "departure": "2026-05-01T10:00:00",
    "arrival": "2026-05-01T12:30:00",
    "duration": "2h 30m",
    "price": 4500
  }
]
```

---

## 🎯 Key Implementations

* 🔹 External API integration (AviationStack)
* 🔹 MVC architecture (Controller, Routes, Models)
* 🔹 Dynamic query-based filtering
* 🔹 Error handling & fallback system
* 🔹 Clean API response formatting

---

## 🚧 Future Enhancements

* 🔐 Authentication system (JWT)
* 💳 Payment integration
* 📦 Booking database integration
* 🧠 Smart pricing engine
* 🔔 Notifications system

---

## 👨‍💻 Author

**Daksh Gupta**

> Backend architecture, API integration, and data handling fully implemented by me.

---

## 📄 License

This project is created for educational and portfolio purposes.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

