import { Link } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header
      className="
        sticky
        top-0
        z-50
        bg-white/5
        backdrop-blur-lg
        border-b
        border-gray-200
      "
    >

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Bot className="w-7 h-7 text-indigo-600" />

          <h1 className="text-xl font-bold text-gray-800">
            AI Traffic System
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">

          <Link
            to="/"
            className="
              relative
              font-medium
              transition-all
              duration-300
              hover:text-indigo-600
              hover:-translate-y-[2px]
              after:content-['']
              after:absolute
              after:w-0
              after:h-[2px]
              after:left-0
              after:-bottom-1
              after:bg-indigo-600
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            Home
          </Link>

          <Link
            to="/about"
            className="
              relative
              font-medium
              transition-all
              duration-300
              hover:text-indigo-600
              hover:-translate-y-[2px]
              after:content-['']
              after:absolute
              after:w-0
              after:h-[2px]
              after:left-0
              after:-bottom-1
              after:bg-indigo-600
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            About
          </Link>

          <Link
            to="/contact"
            className="
              relative
              font-medium
              transition-all
              duration-300
              hover:text-indigo-600
              hover:-translate-y-[2px]
              after:content-['']
              after:absolute
              after:w-0
              after:h-[2px]
              after:left-0
              after:-bottom-1
              after:bg-indigo-600
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            Contact
          </Link>

          <Link
            to="/driver/login"
            className="
              relative
              font-medium
              transition-all
              duration-300
              hover:text-green-600
              hover:-translate-y-[2px]
              after:content-['']
              after:absolute
              after:w-0
              after:h-[2px]
              after:left-0
              after:-bottom-1
              after:bg-green-600
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            Driver
          </Link>

          <Link
            to="/police/login"
            className="
              relative
              font-medium
              transition-all
              duration-300
              hover:text-blue-600
              hover:-translate-y-[2px]
              after:content-['']
              after:absolute
              after:w-0
              after:h-[2px]
              after:left-0
              after:-bottom-1
              after:bg-blue-600
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
          >
            Police
          </Link>

        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Open menu"
        >
          {menuOpen
            ? <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />
          }
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden border-t bg-white px-6 py-5 space-y-4 text-gray-700">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="
              block
              transition-all
              duration-300
              hover:text-indigo-600
              hover:pl-2
            "
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="
              block
              transition-all
              duration-300
              hover:text-indigo-600
              hover:pl-2
            "
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="
              block
              transition-all
              duration-300
              hover:text-indigo-600
              hover:pl-2
            "
          >
            Contact
          </Link>

          <Link
            to="/driver/login"
            onClick={() => setMenuOpen(false)}
            className="
              block
              transition-all
              duration-300
              hover:text-green-600
              hover:pl-2
            "
          >
            Driver
          </Link>

          <Link
            to="/police/login"
            onClick={() => setMenuOpen(false)}
            className="
              block
              transition-all
              duration-300
              hover:text-blue-600
              hover:pl-2
            "
          >
            Police
          </Link>

        </div>

      )}

    </header>
  );
}