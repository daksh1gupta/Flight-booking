# ✈️ FlightX – Full Flight Booking Frontend System

A fully functional and modern **Flight Booking Web Application Frontend** built using **React, TypeScript, Tailwind CSS, and Framer Motion**.

This project is not just UI — it includes a **complete booking flow** from searching flights → booking → ticket generation → managing bookings.

---

## 🚀 Features

### 🔍 Smart Flight Search

* Search flights using **City Name (Delhi, Mumbai, etc.)**
* Auto dropdown with **City + Airport Code (Delhi - DEL)**
* Date validation (past dates disabled)
* Passenger selection

---

### ✈️ Flight Listing System

* Dynamic flight cards
* Filters:

  * Price range slider
  * Airline filter
* Real-time updates
* Clean & modern UI

---

### 🧾 Booking System

* Passenger form (Name, Email, Mobile)
* Price breakdown (Base + Taxes)
* Auto-generated **PNR number**
* Booking stored in **localStorage**

---

### 🎫 Premium Ticket Generation

* Beautiful boarding pass UI
* Includes:

  * Passenger details
  * Flight details
  * Price
  * **QR Code (real)**
* **Download as PDF (print system)**
* Manual navigation (Download + Next buttons)

---

### 📂 My Bookings Dashboard

* Tabs:

  * ✅ Booked
  * ❌ Cancelled
  * ⏳ Waiting
* Cancel booking functionality
* Auto-remove expired flights
* Search bookings
* Clean card UI

---

### 🎨 UI/UX Highlights

* Glassmorphism design
* Gradient UI theme
* Smooth animations (Framer Motion)
* Fully responsive (mobile + tablet + desktop)

---

### 🤖 AI Chat Assistant

* Interactive assistant UI
* Helps users with booking guidance

---

## 🛠️ Tech Stack

* ⚛️ React + TypeScript
* 🎨 Tailwind CSS
* 🎬 Framer Motion
* 🎯 Lucide Icons
* 📦 LocalStorage (data persistence)

---

## 📂 Project Structure

```id="frontendstructure"
frontend/
│── public/
│   ├── airlines/            # Airline logos (IndiGo, Air India, etc.)
│   ├── cities/              # City SVG icons
│   ├── banner.jpg
│   ├── booking-banner.jpg
│   ├── flight.png
│   ├── plane.png
│   └── no-booking.png
│
│── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SearchBox.tsx
│   │   ├── FlightsPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── TicketPage.tsx
│   │   ├── MyBookingsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── Footer.tsx
│   │   └── AIChatAssistant.tsx
│   │
│   ├── data/
│   │   ├── airports.ts      # Airport codes mapping
│   │   └── flights.ts
│   │
│   ├── utils/
│   │   └── formatCity.ts    # Convert code → city name
│   │
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="clonecmd"
git clone https://github.com/daksh1gupta/Booking-Management-System.git
```

### 2️⃣ Navigate to frontend

```bash id="navcmd"
cd Booking-Management-System/frontend
```

### 3️⃣ Install dependencies

```bash id="installcmd"
npm install
```

### 4️⃣ Run the project

```bash id="runcmd"
npm run dev
```

---

## 🌐 Usage

* Open → `http://localhost:5173`
* Search flights
* Book tickets
* Generate ticket with QR
* Download ticket
* Manage bookings

---

## 🎯 Key Implementations

* 🔹 City Name ↔ Airport Code mapping system
* 🔹 Auto PNR generation
* 🔹 QR-based ticket system
* 🔹 Booking state management (localStorage)
* 🔹 Expired booking auto-removal
* 🔹 Smooth UI transitions

---

## 🚧 Future Enhancements

* 🔌 Backend API integration (real flight data)
* 💳 Payment gateway integration
* 🧠 AI-based recommendations
* 🎤 Voice assistant
* 📱 Mobile app version

---

## 👨‍💻 Author

**Daksh Gupta**

> Designed and developed the complete frontend system including UI, booking flow, and ticket system.

---

## 📄 License

This project is created for educational and portfolio purposes.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
