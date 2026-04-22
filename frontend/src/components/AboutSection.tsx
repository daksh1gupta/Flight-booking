const AboutSection = () => {
  return (
    <div className="py-20 px-6 bg-secondary text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        About FlightX
      </h2>

      {/* Content Box */}
      <div className="max-w-4xl mx-auto bg-black/5 p-8 rounded-xl border border-black/10 text-left space-y-5">

        <p>
          ✈️ FlightX is a modern and intelligent flight booking platform designed to make travel planning simple, fast, and interactive 🌍.
        </p>

        <p>
          💻 <span className="font-semibold">Frontend (React + Tailwind CSS):</span>  
          The frontend provides a responsive and visually appealing interface where users can search flights, explore destinations, and enjoy smooth UI interactions 🎨.
        </p>

        <p>
          ⚙️ <span className="font-semibold">Backend (Node.js + Express):</span>  
          Handles booking logic, API integration, and ensures fast and efficient data processing 🔗.
        </p>

        <p>
          🗄️ <span className="font-semibold">Database (MongoDB):</span>  
          Stores user data, bookings, and flight details in a scalable and efficient manner 📊.
        </p>

        <p>
          🔐 <span className="font-semibold">Security:</span>  
          Includes authentication, encryption, and secure APIs to protect user data and transactions 🔒.
        </p>

        <p>
          🤖 <span className="font-semibold">AI Assistant:</span>  
          Helps users with flight queries, suggestions, and booking guidance in real time 💬.
        </p>

        <p>
          💳 <span className="font-semibold">Payment Gateway (Upcoming):</span>  
          Secure online payments will allow seamless flight booking experience 💸.
        </p>

        <p>
          🚀 <span className="font-semibold">Future Vision:</span>  
          Real-time APIs, smart recommendations, and voice-enabled features to build a complete travel ecosystem.
        </p>

      </div>

    </div>
  );
};

export default AboutSection;