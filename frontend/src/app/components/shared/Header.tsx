import { Link } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">

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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-indigo-600 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>

          <Link to="/driver/login" className="hover:text-green-600 transition">
            Driver
          </Link>

          <Link to="/police/login" className="hover:text-blue-600 transition">
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
            className="block"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Contact
          </Link>

          <Link
            to="/driver/login"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Driver
          </Link>

          <Link
            to="/police/login"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Police
          </Link>

        </div>

      )}

    </header>
  );
}