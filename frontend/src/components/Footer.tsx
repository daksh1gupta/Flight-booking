const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-sky-mid to-sky-end text-white pt-14 pb-0 px-8">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/flight.png" alt="logo" className="w-8 h-8" />
            <h2 className="text-2xl font-bold">FlightX</h2>
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            Your gateway to the world. Seamlessly book flights and explore top destinations with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/80 text-lg">

            <li>
              <a href="#home" className="inline-block transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="inline-block transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">
                About
              </a>
            </li>

            <li>
              <a href="#search" className="inline-block transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">
                Search Flights
              </a>
            </li>

            <li>
              <a href="#routes" className="inline-block transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">
                Popular Routes
              </a>
            </li>

          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-white/80 text-lg">
            {["Travel Tips", "FAQs", "Customer Support", "Booking Guide"].map((item, i) => (
              <li key={i}>
                <span className="inline-block cursor-pointer transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-white/80 text-lg">

            <li>
              Daksh Gupta:{" "}
              <a href="tel:+918791577847" className="text-yellow-300 ">
                📞 <span>+91 87915 77847</span>
              </a>
            </li>

            <li>
              Tanuj Dixit:{" "}
              <a href="tel:+918400900994" className="text-yellow-300">
                📞 <span>+91 84009 00994</span>
              </a>
            </li>

            <li>
              Jeevesh Jain:{" "}
              <a href="tel:+918433452789" className="text-yellow-300">
                📞 <span>+91 84334 52789</span>
              </a>
            </li>

            <li>
              Digvijay Singh:{" "}
              <a href="tel:+919639506029" className="text-yellow-300">
                📞 <span>+91 96395 06029</span>
              </a>
            </li>

            <li>
              Ashutosh Das:{" "}
              <a href="tel:+917073552528" className="text-yellow-300">
                📞 <span>+91 70735 52528</span>
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-20 text-center pb-8 text-base text-white">
        © 2026 FlightX. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;