import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';


export default function ContactPage() {

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-gray-800">

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
      <section className="py-24 px-6 text-center">

        <p className="uppercase tracking-[6px] text-indigo-600 text-sm mb-4">
          Contact Us
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
          Get In Touch
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 leading-8 text-lg">
          Have questions, suggestions, or feedback about the AI-Based Digital
          Traffic Penalty Management System? Contact the development team below.
        </p>

      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-10">

          {/* ================= LEFT INFO ================= */}
          <div
            className="
              bg-white/60
              backdrop-blur-xl
              rounded-3xl
              p-10
              shadow-xl
            "
          >

            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">

              {/* EMAIL */}
              <div className="flex items-start gap-4">

                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    support@aitrafficsystem.com
                  </p>
                </div>

              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">

                <div className="bg-green-100 p-3 rounded-2xl">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +251 900 000 000
                  </p>
                </div>

              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-4">

                <div className="bg-red-100 p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Location
                  </h3>

                  <p className="text-gray-600">
                    Addis Ababa, Ethiopia
                    <br />
                    Unity University
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ================= CONTACT FORM ================= */}
          <div
            className="
              bg-white/60
              backdrop-blur-xl
              rounded-3xl
              p-10
              shadow-xl
            "
          >

            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <form className="space-y-6">

              {/* NAME */}
              <div>

                <label className="block mb-2 text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-5
                    py-4
                    outline-none
                    focus:border-indigo-500
                    bg-white/70
                  "
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block mb-2 text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-5
                    py-4
                    outline-none
                    focus:border-indigo-500
                    bg-white/70
                  "
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="block mb-2 text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    px-5
                    py-4
                    outline-none
                    focus:border-indigo-500
                    resize-none
                    bg-white/70
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  rounded-2xl
                  py-4
                  font-semibold
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
     <Footer />

    </div>
  );
}