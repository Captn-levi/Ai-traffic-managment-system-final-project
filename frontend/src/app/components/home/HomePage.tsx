import { Link } from 'react-router-dom';
import { Shield, User, Settings, Bot, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import './HomePage.css';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

// ✅ IMPORT YOUR PNG


export default function HomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 🔥 SLIDES
  const slides = [
    "https://www.ebc.et/admin/news/2025/10/1/243e2f49-0f74-4a84-a130-478a3cc11078.webp",
    "https://tse4.mm.bing.net/th/id/OIP.TVvHyr7NdXLdaqPMn80OyQHaEK?pid=Api&h=220&P=0",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://ethiopianstoday.com/wp-content/uploads/2024/04/6496_1713623262-1024x564.jpeg"
  ];

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    const handleScroll = () => {
      controlHeader();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
useEffect(() => {
  const elements = document.querySelectorAll(
    ".blur-reveal, .fade-up, .stagger-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
}, []);
  return (
    <div className="homepage min-h-screen bg-gray-50 overflow-x-hidden">
  
  
      {/* ================= HEADER ================= */}
   <Header />

      {/* ================= HERO SECTION ================= */}
<section className="hero-section fadeup relative min-h-screen bg-[#fdfaf5] overflow-hidden flex items-center justify-center">

  <div className="max-w-7xl mx-auto w-full px-5 md:px-12 relative">

    {/* CENTER IMAGE + FLOATING DESCRIPTION */}
    <div className="relative flex justify-center items-start">

      {/* BACKGROUND TEXT */}
      <h1
        className="
          absolute
          top-10 md:top-24
          text-[50px]
          sm:text-[70px] md:text-[150px]
          font-extrablack md:font-black
          text-gray-200
          leading-none
          text-center
          uppercase
          tracking-wider
          select-none
          opacity-100
        "
      >
        AI TRAFFIC
      </h1>

      {/* FLOATING DESCRIPTION CARD */}
      <div className=" absolute left-0 md:left-16 top-[53%] md:top-[40%]
          -translate-y-1/2 backdrop-blur-xl bg-white/40 border border-white/20
          rounded-2xl shadow-2xl p-2 md:p-6 w-[210px] md:w-[380px]
          z-20 hover:scale-105 transition-all duration-300
        "
      >
        <p className="text-sm md:text-base text-gray-700 leading-6 tracking-wide">
          AI-powered smart traffic monitoring and penalty management system
          designed to modernize traffic law enforcement and automate traffic
          violation processing across the city.
        </p>
      </div>

      {/* POLICE PNG */}
      <img
        src="/images/police.png"
        alt="Traffic Police Officer"
        className="
          relative
          -mt-10
          md:mt-0
          z-10
          w-[300px]
          sm:w-[380px]
          md:w-[620px]
          object-contain
          drop-shadow-2xl
          hover:scale-105
          transition-all
          duration-500
        "
      />

    </div>

    {/* MAIN TITLE */}
    <div className="text-center -mt-4 md:-mt-16 relative z-20">

      <h2
        className="
          text-3xl
          sm:text-5xl
          md:text-7xl
          font-black
          uppercase
          tracking-wide
          text-gray-900
          leading-tight
        "
      >
        Digital Traffic
        <br />
        Penalty System
      </h2>

      <p className="mt-5 text-gray-500 text-sm md:text-lg max-w-2xl mx-auto">
        Smart, fast, secure, and AI-assisted traffic violation management platform.
      </p>

    </div>

  </div>

</section>

      {/* ================= SLIDER ================= */}
      <section className="py-10 bg-white fade-up">

        <div className="flex justify-center">

          <div className="image-container relative w-[92%] md:w-[70%] h-[170px] md:h-[320px] overflow-hidden rounded-2xl shadow-2xl">

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
              className="slider-arrow left-3"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrentSlide((currentSlide + 1) % slides.length)
              }
              className="slider-arrow right-3"
            >
              ›
            </button>

          </div>

        </div>

      </section>

      {/* ================= CARDS ================= */}
      <section
        id="services"
        className="max-w-6xl mx-auto py-14 px-4 grid md:grid-cols-3 gap-8 stagger-card"
      >

        {/* POLICE */}
        <Link
          to="/police/login"
          className="card stagger-card"
        >
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <Shield className="w-9 h-9 text-blue-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Traffic Police
            </h2>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Capture traffic violations and issue AI-supported penalties instantly.
            </p>
          </div>
        </Link>

        {/* DRIVER */}
        <Link
          to="/driver/login"
          className="card stagger-card"
        >
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <User className="w-9 h-9 text-green-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Driver Portal
            </h2>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              View violations, pay fines digitally, and receive AI assistance.
            </p>
          </div>
        </Link>

        {/* ADMIN */}
        <Link
          to="/admin/login"
          className="card stagger-card"
        >
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
              <Settings className="w-9 h-9 text-purple-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Administrator
            </h2>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Manage vehicles, drivers, officers, analytics, and system operations.
            </p>
          </div>
        </Link>

      </section>

      {/* ================= FOOTER ================= */}
     <Footer />

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
