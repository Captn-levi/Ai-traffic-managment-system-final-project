import { Link } from 'react-router-dom';

export default function Footer() {

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* SYSTEM INFO */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              AI Traffic System
            </h2>

            <p className="text-gray-600 text-sm leading-7">
              AI-Based Digital Traffic Penalty Management System
              developed for improving traffic law enforcement,
              digital penalty processing, and smart monitoring.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-gray-600">

              <Link to="/" className="hover:text-indigo-600">
                Home
              </Link>

              <Link to="/about" className="hover:text-indigo-600">
                About
              </Link>

              <Link to="/contact" className="hover:text-indigo-600">
                Contact
              </Link>

              <Link to="/driver/login" className="hover:text-green-600">
                Driver Portal
              </Link>

              <Link to="/police/login" className="hover:text-blue-600">
                Police Portal
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Contact
            </h3>

            <p className="text-sm text-gray-600 leading-7">
              Addis Ababa, Ethiopia
              <br />
              Unity University
              <br />
              support@aitrafficsystem.com
            </p>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">

          © 2026 AI Traffic Penalty System — Final Year Project

        </div>

      </div>

    </footer>
  );
}