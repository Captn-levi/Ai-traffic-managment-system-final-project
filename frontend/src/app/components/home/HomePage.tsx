import { Link } from 'react-router-dom';
import { Shield, User, Settings, Bot } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl mb-2 text-gray-900">AI-Based Digital Traffic Penalty Management System</h1>
          <p className="text-gray-600">Academic Final Year Project Prototype</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Traffic Police Officer */}
          <Link
            to="/police/login"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-xl mb-2 text-gray-900">Traffic Police Officer</h2>
              <p className="text-gray-600 text-sm mb-4">
                Mobile app for field officers to capture violations and issue penalties
              </p>
              <div className="mt-auto">
                <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Enter →
                </span>
              </div>
            </div>
          </Link>

          {/* Driver / Civilian User */}
          <Link
            to="/driver/login"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-xl mb-2 text-gray-900">Driver / Civilian</h2>
              <p className="text-gray-600 text-sm mb-4">
                Mobile app to view penalties, pay fines, and get AI support
              </p>
              <div className="mt-auto">
                <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg">
                  Enter →
                </span>
              </div>
            </div>
          </Link>

          {/* System Administrator */}
          <Link
            to="/admin/login"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Settings className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-xl mb-2 text-gray-900">System Administrator</h2>
              <p className="text-gray-600 text-sm mb-4">
                Web dashboard for system management and analytics
              </p>
              <div className="mt-auto">
                <span className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg">
                  Enter →
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2026 AI Traffic Penalty Management System - Academic Project</p>
        </div>
      </div>
    </div>
  );
}
