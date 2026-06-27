import { Link } from 'react-router-dom';
import { Shield, User, Settings, ArrowRight, Camera, Gauge, CheckCircle2, MoveRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isDescHovered, setIsDescHovered] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  const slides = [
    "https://www.amn.gov.et/en/wp-content/uploads/sites/3/2026/06/243e2f49-0f74-4a84-a130-478a3cc11078.webp",
    "https://media.gettyimages.com/id/1233537527/photo/ethiopia-police-parade.jpg?s=1024x1024&w=gi&k=20&c=KVwH2CMk03swk03Q_HafoA2-OpHSxayCKwLUU22DEgU=",
    "https://addismayor.gov.et/uploads/Gallery/bole-corridor-2024-08-02-66ac9ba76a987.jpg",
    "https://www.globaltimes.cn/Portals/0/attachment/2021/2021-06-20/2e68224f-30b6-4515-972c-99ed46afab46.jpeg",
    "https://www.ena.et/documents/d/eng/636762608_1219320083718410_6107222925591152459_n-jpg"
  ];

  const stats = [
    { icon: Gauge, value: "2.4s", label: "Avg. detection time" },
    { icon: Camera, value: "128", label: "Active monitoring points" },
    { icon: CheckCircle2, value: "99.1%", label: "Verified accuracy rate" },
  ];

  const portals = [
    {
      key: "police",
      to: "/police/login",
      icon: Shield,
      iconBg: "bg-blue-50 border border-blue-100",
      iconBgHover: "bg-blue-100/80 border-blue-200",
      iconColor: "text-blue-600",
      ringColor: "ring-blue-100",
      title: "Traffic Police",
      summary: "Capture traffic violations and issue AI-supported penalties instantly.",
      detail: "Log violations on the spot with photo evidence, GPS location, and instant penalty issuance synced to the driver's record.",
      cta: "Officer sign in",
    },
    {
      key: "driver",
      to: "/driver/login",
      icon: User,
      iconBg: "bg-emerald-50 border border-emerald-100",
      iconBgHover: "bg-emerald-100/80 border-emerald-200",
      iconColor: "text-emerald-600",
      ringColor: "ring-emerald-100",
      title: "Driver Portal",
      summary: "View violations, pay fines digitally, and receive AI assistance.",
      detail: "Check every penalty on your record, pay securely online, and ask the AI assistant about any charge or appeal process.",
      cta: "Driver sign in",
    },
    {
      key: "admin",
      to: "/admin/login",
      icon: Settings,
      iconBg: "bg-purple-50 border border-purple-100",
      iconBgHover: "bg-purple-100/80 border-purple-200",
      iconColor: "text-purple-600",
      ringColor: "ring-purple-100",
      title: "Administrator",
      summary: "Manage vehicles, drivers, officers, analytics, and system operations.",
      detail: "Oversee the entire system — manage accounts, audit penalties, monitor analytics, and configure how enforcement runs citywide.",
      cta: "Admin sign in",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const registerReveal = (el: HTMLElement | null, index: number) => {
    if (el) revealRefs.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = revealRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setVisibleSections(prev => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => revealRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  const revealStyle = (index: number, delayMs = 0): React.CSSProperties => ({
    opacity: visibleSections.has(index) ? 1 : 0,
    transform: visibleSections.has(index) ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.21, 1.02, 0.43, 1.01) ${delayMs}ms, transform 0.8s cubic-bezier(0.21, 1.02, 0.43, 1.01) ${delayMs}ms`,
  });

  return (
    <div className="homepage min-h-screen bg-[#fdfaf5] text-[#1f2430] antialiased selection:bg-amber-400 selection:text-slate-900">
      
      {/* ================= HEADER ================= */}
      <div
        style={{
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Header />
      </div>

      {/* ================= HERO ARTIFACT VIEW ================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-8 md:pt-16 pb-4 flex flex-col items-center justify-center overflow-hidden">
        
        {/* RESPONSIVE SCALED WORDMARK */}
        <h1 className="absolute top-4 sm:top-0 left-1/2 -translate-x-1/2 text-[12vw] md:text-[160px] font-black text-[#0b2545]/[0.05] leading-none text-center uppercase tracking-wider md:tracking-widest select-none pointer-events-none w-full max-w-7xl px-2 z-0">
          AI TRAFFIC
        </h1>

        <div className="relative flex flex-col md:flex-row justify-center items-center w-full max-w-4xl z-10 mt-8 md:mt-0">
          
          {/* INTERACTIVE FLOATING DESCRIPTION CARD */}
          <div 
            onMouseEnter={() => setIsDescHovered(true)}
            onMouseLeave={() => setIsDescHovered(false)}
            className={`absolute md:left-0 top-[65%] md:top-[50%] -translate-y-1/2 backdrop-blur-xl bg-white/20 border border-white/40 rounded-2xl p-5 md:p-6 w-[280px] md:w-[340px] z-20 shadow-[0_8px_32px_0_rgba(11,37,69,0.08)] transition-all duration-500 ease-out cursor-pointer ${
              isDescHovered ? 'bg-white/35 shadow-[0_20px_40px_rgba(11,37,69,0.15)] -translate-y-[52%] scale-[1.02]' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b2545]/70">
                System Status: Live
              </span>
            </div>
            
            <p className="text-xs md:text-sm text-[#1f2430] leading-relaxed font-semibold">
              AI-powered traffic monitoring and penalty management, built to modernize enforcement and automate violation processing citywide.
            </p>

            <div 
              className="transition-all duration-500 ease-in-out opacity-0 overflow-hidden"
              style={{ 
                maxHeight: isDescHovered ? '120px' : '0px', 
                opacity: isDescHovered ? 1 : 0,
                marginTop: isDescHovered ? '12px' : '0px'
              }}
            >
              <p className="text-xs text-[#1f2430]/75 border-t border-white/30 pt-3 leading-relaxed">
                Utilizing state-of-the-art computer vision pipelines to record parameters instantly while securing real-time telemetry pipelines for civic drivers.
              </p>
              
              <Link 
                to="/about" 
                className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#0b2545] hover:underline"
              >
                Learn more about system <MoveRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* POLICE PNG ASSET */}
          {!heroImgFailed ? (
            <img
              src="/images/police.png"
              alt="Traffic officer"
              onError={() => setHeroImgFailed(true)}
              className="w-[260px] sm:w-[340px] md:w-[460px] object-contain drop-shadow-[0_25px_60px_rgba(11,37,69,0.2)] transition-transform duration-700 hover:scale-[1.02] mx-auto z-10"
            />
          ) : (
            <div className="w-[240px] sm:w-[300px] md:w-[360px] aspect-square flex items-center justify-center z-10">
              <div
                className="flex flex-col items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-[#0b2545] to-[#143a6b] shadow-xl"
                style={{ animation: 'badgePulse 3.5s ease-in-out infinite' }}
              >
                <Shield className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                <span className="mt-3 text-white/90 text-xs font-bold uppercase tracking-widest">
                  Traffic Authority
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= HERO TEXT & DETAILS ================= */}
      <section className="relative px-6 pb-16 md:pb-24 pt-8 md:pt-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={(el) => registerReveal(el, 0)}
            style={revealStyle(0)}
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#0b2545] leading-none">
              Digital Traffic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b2545] via-[#143a6b] to-amber-600">
                Penalty System
              </span>
            </h2>

            <p className="mt-6 text-[#1f2430]/70 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              A smart, AI-assisted platform for detecting violations, issuing penalties, and managing payments — built for Ethiopia's roads.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/driver/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b2545] text-white text-sm md:text-base font-semibold px-8 py-4 rounded-xl hover:bg-[#143a6b] active:scale-98 transition-all shadow-lg shadow-[#0b2545]/10"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#0b2545] bg-white border border-[#0b2545]/15 text-sm md:text-base font-semibold px-8 py-4 rounded-xl hover:bg-white/60 active:scale-98 transition-all shadow-sm"
              >
                Explore portals
              </a>
            </div>
          </div>

          {/* METRIC CARD STRIP */}
          <div
            ref={(el) => registerReveal(el, 1)}
            style={revealStyle(1, 100)}
            className="mt-16 md:mt-20 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center bg-white/90 border border-slate-200/60 rounded-2xl py-6 px-3 shadow-md shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
              >
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 mb-2.5">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                </div>
                <span className="font-mono text-xl md:text-3xl font-black text-[#0b2545] tabular-nums tracking-tight">
                  {value}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-[#1f2430]/55 uppercase tracking-wide mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WIDER & SHORTER IMAGE SLIDER ================= */}
      <section
        ref={(el) => registerReveal(el as HTMLElement, 2)}
        style={revealStyle(2)}
        className="py-12 bg-white border-y border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              On the road
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0b2545] tracking-tight mt-2">
              Where the system works
            </h3>
          </div>

          <div className="flex justify-center">
            {/* Height reduced by 40% (460px -> 275px) & Length broadened (+30%) via max-w-6xl */}
            <div className="relative w-full max-w-6xl h-[145px] sm:h-[200px] md:h-[275px] overflow-hidden rounded-2xl shadow-xl bg-slate-900 group">
              {slides.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Ethiopian road landscape scene"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: index === currentSlide ? 1 : 0 }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <button
                onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                aria-label="Previous image"
                className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md md:opacity-0 md:group-hover:opacity-100 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 z-10 text-sm font-bold"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                aria-label="Next image"
                className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md md:opacity-0 md:group-hover:opacity-100 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 z-10 text-sm font-bold"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="h-1.5 rounded-full bg-white transition-all duration-300"
                    style={{
                      width: index === currentSlide ? '20px' : '6px',
                      opacity: index === currentSlide ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE PORTALS ================= */}
      <section
        id="services"
        ref={(el) => registerReveal(el as HTMLElement, 3)}
        style={revealStyle(3)}
        className="max-w-6xl mx-auto py-20 px-6"
      >
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Three portals, one system
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b2545] tracking-tight mt-3">
            Built for everyone on the road
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {portals.map(({ key, to, icon: Icon, iconBg, iconBgHover, iconColor, ringColor, title, summary, detail, cta }) => {
            const isActive = activeCard === key;

            return (
              <Link
                key={key}
                to={to}
                onMouseEnter={() => setActiveCard(key)}
                onMouseLeave={() => setActiveCard(null)}
                onFocus={() => setActiveCard(key)}
                onBlur={() => setActiveCard(null)}
                className={`flex flex-col justify-between rounded-2xl bg-white border p-8 transition-all duration-300 relative ${
                  isActive
                    ? `shadow-2xl -translate-y-1.5 ring-2 ${ringColor} border-transparent`
                    : 'shadow-md border-slate-100 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className={`p-3.5 rounded-xl inline-block mb-5 transition-colors duration-300 ${isActive ? iconBgHover : iconBg}`}>
                    <Icon
                      className={`w-7 h-7 ${iconColor} transition-transform duration-300`}
                      style={{ transform: isActive ? 'scale(1.08) rotate(-2deg)' : 'none' }}
                    />
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                    {title}
                  </h4>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    {summary}
                  </p>

                  <div
                    style={{
                      maxHeight: isActive ? '100px' : '0px',
                      opacity: isActive ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    }}
                  >
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                      {detail}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center">
                  <span className={`inline-flex items-center gap-1.5 text-sm font-bold tracking-wide transition-all ${iconColor}`}>
                    {cta} 
                    <MoveRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'translate-x-1' : ''}`} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 0 16px rgba(251, 191, 36, 0); }
        }
      `}</style>

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
