import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Bot, Car, Database, Smartphone } from 'lucide-react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-gray-800">

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[6px] text-indigo-600 text-sm mb-4">
            About The Project
          </p>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-tight
              mb-6
            "
          >
            AI-Based Digital
            <br />
            Traffic Penalty
            <br />
            Management System
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-8 text-lg">
            A modern intelligent traffic management platform developed to improve
            road safety, automate traffic violation handling, reduce corruption,
            and simplify communication between drivers and traffic police officers
            using artificial intelligence technologies.
          </p>

        </div>

      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border border-white/20
            rounded-3xl
            shadow-xl
            p-8 md:p-12
          "
        >

          <h2 className="text-3xl font-bold mb-6">
            System Overview
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            The AI-Based Digital Traffic Penalty Management System is designed to
            modernize traditional traffic law enforcement processes through digital
            automation and artificial intelligence.
          </p>

          <p className="text-gray-600 leading-8">
            The system enables traffic police officers to capture vehicle license
            plates using mobile devices, automatically verify vehicle information,
            issue penalties digitally, and notify drivers instantly.
          </p>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-black mb-4">
            Core Features
          </h2>

          <p className="text-gray-500">
            Intelligent and automated traffic management capabilities
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <div
            className="
              bg-white/50
              backdrop-blur-xl
              rounded-3xl
              p-8
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >

            <Shield className="w-12 h-12 text-blue-600 mb-5" />

            <h3 className="text-2xl font-bold mb-4">
              Smart Enforcement
            </h3>

            <p className="text-gray-600 leading-7">
              Police officers can digitally capture violations and issue penalties
              directly from mobile devices in real-time.
            </p>

          </div>

          {/* FEATURE 2 */}
          <div
            className="
              bg-white/50
              backdrop-blur-xl
              rounded-3xl
              p-8
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >

            <Bot className="w-12 h-12 text-purple-600 mb-5" />

            <h3 className="text-2xl font-bold mb-4">
              AI Assistance
            </h3>

            <p className="text-gray-600 leading-7">
              AI technologies help identify license plates, automate verification,
              and assist users through intelligent support systems.
            </p>

          </div>

          {/* FEATURE 3 */}
          <div
            className="
              bg-white/50
              backdrop-blur-xl
              rounded-3xl
              p-8
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >

            <Database className="w-12 h-12 text-green-600 mb-5" />

            <h3 className="text-2xl font-bold mb-4">
              Centralized Records
            </h3>

            <p className="text-gray-600 leading-7">
              Driver records, vehicle data, and penalties are stored securely in a
              centralized database for easier management and monitoring.
            </p>

          </div>

        </div>

      </section>

      {/* ================= MODULES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div
          className="
            bg-gradient-to-br
            from-indigo-600
            to-blue-700
            text-white
            rounded-3xl
            p-10
            shadow-2xl
          "
        >

          <h2 className="text-4xl font-black mb-10 text-center">
            System Modules
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <Smartphone className="w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                Police Module
              </h3>
              <p className="text-white/80 leading-7">
                Used by traffic officers for vehicle verification and penalty issuance.
              </p>
            </div>

            <div>
              <Car className="w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                Driver Module
              </h3>
              <p className="text-white/80 leading-7">
                Allows drivers to view penalties, pay fines, and manage profiles.
              </p>
            </div>

            <div>
              <Database className="w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                Admin Module
              </h3>
              <p className="text-white/80 leading-7">
                Provides system administration, analytics, and centralized control.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}