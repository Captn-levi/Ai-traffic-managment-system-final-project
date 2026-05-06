import { Link } from 'react-router-dom';
import { Shield, User, Settings, Bot, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 SLIDES
  const slides = [
    "https://www.ebc.et/admin/news/2025/10/1/243e2f49-0f74-4a84-a130-478a3cc11078.webp",
    "https://tse4.mm.bing.net/th/id/OIP.TVvHyr7NdXLdaqPMn80OyQHaEK?pid=Api&h=220&P=0",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://www.eastafricanreview.com/wp-content/uploads/2024/06/Abye-After-Displacing-Piassa-residents-780x470.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.zj74WLRgMgko5tN5onJfYgHaFH?pid=Api&h=220&P=0",
    "https://ethiopianstoday.com/wp-content/uploads/2024/04/6496_1713623262-1024x564.jpeg",
    "https://tse3.mm.bing.net/th/id/OIP.4iLYSFrk_pmI5m6VgzCjCQHaE7?pid=Api&h=220&P=0"
  ];

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-gray-800 text-lg">
              AI Traffic System
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
            <Link to="/driver/login" className="hover:text-indigo-600">Driver</Link>
            <Link to="/police/login" className="hover:text-indigo-600">Police</Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden"
  aria-label="Toggle navigation menu"
  title="Menu"
>
  <Menu className="w-6 h-6 text-gray-600" />
</button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3 text-gray-600">

            <Link to="/" onClick={() => setMenuOpen(false)} className="block">
              Home
            </Link>

            <a href="#about" onClick={() => setMenuOpen(false)} className="block">
              About
            </a>

            <a href="#contact" onClick={() => setMenuOpen(false)} className="block">
              Contact
            </a>

            <Link to="/driver/login" onClick={() => setMenuOpen(false)} className="block">
              Driver
            </Link>

            <Link to="/police/login" onClick={() => setMenuOpen(false)} className="block">
              Police
            </Link>

          </div>
        )}

      </header>

      {/* ================= SLIDER ================= */}
      <div className="flex justify-center mt-4">
        <div className="relative w-[90%] md:w-[70%] h-[80px] md:h-[240px] overflow-hidden rounded-xl shadow">

          {slides.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="slide"
              className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* ARROWS */}
          <button
            onClick={() =>
              setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 rounded"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % slides.length)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 rounded"
          >
            ›
          </button>

        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="text-center mt-10 px-4">
        <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
          AI-Based Digital Traffic Penalty System
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Smart, fast, and automated traffic violation management
        </p>
      </div>

      {/* ================= CARDS ================= */}
      <div className="max-w-6xl mx-auto mt-10 px-4 grid md:grid-cols-3 gap-6">

        <Link
          to="/police/login"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition"
        >
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg text-gray-900">Traffic Police</h2>
            <p className="text-sm text-gray-600 mt-2">
              Capture violations and issue penalties using AI
            </p>
          </div>
        </Link>

        <Link
          to="/driver/login"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition"
        >
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full inline-block mb-3">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-lg text-gray-900">Driver</h2>
            <p className="text-sm text-gray-600 mt-2">
              View penalties, pay fines, and get assistance
            </p>
          </div>
        </Link>

        <Link
          to="/admin/login"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition"
        >
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
              <Settings className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-lg text-gray-900">Administrator</h2>
            <p className="text-sm text-gray-600 mt-2">
              Manage users, vehicles, and system analytics
            </p>
          </div>
        </Link>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="mt-16 text-center text-gray-500 text-sm pb-6">
        © 2026 AI Traffic Penalty System — Unity University
      </footer>

    </div>
  );
}

// the first home page component, 
// which was a simple static page, 
// has been replaced with a more dynamic 
// and visually appealing version. 

// import { Link } from 'react-router-dom';
// import { Shield, User, Settings, Bot } from 'lucide-react';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-6xl w-full">
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-4">
//             <Bot className="w-16 h-16 text-indigo-600" />
//           </div>
//           <h1 className="text-4xl mb-2 text-gray-900">AI-Based Digital Traffic Penalty Management System</h1>
//           <p className="text-gray-600">Academic Final Year Project Prototype <br /> by NASSA</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Traffic Police Officer */}
//           <Link
//             to="/police/login"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
//           >
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-blue-100 p-4 rounded-full mb-4">
//                 <Shield className="w-12 h-12 text-blue-600" />
//               </div>
//               <h2 className="text-xl mb-2 text-gray-900">Traffic Police Officer</h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Mobile app for field officers to capture violations and issue penalties
//               </p>
//               <div className="mt-auto">
//                 <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
//                   Enter →
//                 </span>
//               </div>
//             </div>
//           </Link>

//           {/* Driver / Civilian User */}
//           <Link
//             to="/driver/login"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
//           >
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-green-100 p-4 rounded-full mb-4">
//                 <User className="w-12 h-12 text-green-600" />
//               </div>
//               <h2 className="text-xl mb-2 text-gray-900">Driver / Civilian</h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Mobile app to view penalties, pay fines, and get AI support
//               </p>
//               <div className="mt-auto">
//                 <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg">
//                   Enter →
//                 </span>
//               </div>
//             </div>
//           </Link>

//           {/* System Administrator */}
//           <Link
//             to="/admin/login"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
//           >
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-purple-100 p-4 rounded-full mb-4">
//                 <Settings className="w-12 h-12 text-purple-600" />
//               </div>
//               <h2 className="text-xl mb-2 text-gray-900">System Administrator</h2>
//               <p className="text-gray-600 text-sm mb-4">
//                 Web dashboard for system management and analytics
//               </p>
//               <div className="mt-auto">
//                 <span className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg">
//                   Enter →
//                 </span>
//               </div>
//             </div>
//           </Link>
//         </div>

//         <div className="mt-12 text-center text-gray-600 text-sm">
//           <p>© 2026 AI Traffic Penalty Management System - Academic Project <br /> Unity university</p>
//         </div>
//       </div>
//     </div>
//   );
//}
