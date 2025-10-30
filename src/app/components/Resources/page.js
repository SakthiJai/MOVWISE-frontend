"use client";
import { Lightbulb, Users, Handshake, Globe } from "lucide-react";
import Head from "next/head";
import Footer from "../Footer";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";

const values = [
  {
    title: "Transparency",
    description:
      "In every quote and communication, ensuring clarity and trust in the conveyancing process.",
    icon: Lightbulb,
    color: "text-blue-600",
  },
  {
    title: "Inclusivity",
    description:
      "Through multilingual accessibility, making essential UK conveyancing services available to everyone.",
    icon: Globe,
    color: "text-emerald-600",
  },
  {
    title: "Innovation",
    description:
      "In client-conveyancer connections, leveraging technology for a seamless, digital experience.",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Partnership",
    description:
      "With regulated legal experts, ensuring all advice and service is high-quality and reliable.",
    icon: Handshake,
    color: "text-amber-600",
  },
];

export default function ResourcePage() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>

      {/* Navbar */}
      <div className="bg-white shadow-md sticky top-0 p-4 z-50">
        <Navbar originalstyle={true} />
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Our Core Values
          </h1>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            At MovWise, we believe in trust, inclusivity, and innovation. Every
            service we provide is built around these core principles to make your
            conveyancing experience simple and transparent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
              >
                <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📝 Summary Note Section */}
        <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-amber-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Summary Note
          </h2>
          <p className="text-gray-600 leading-relaxed">
            MovWise simplifies property conveyancing by connecting clients with
            trusted, regulated legal professionals across the UK. We prioritise
            transparency, inclusivity, and digital innovation — ensuring every
            user can access fair, efficient, and reliable conveyancing services
            in their preferred language. With MovWise, moving homes becomes less
            stressful and more confident.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Get Quotes
                  </a>
                </li>
                <li>
                  <a href="#solicitors" className="hover:text-amber-500">
                    For Solicitors
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-amber-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-amber-500">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Language Support */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Language Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Tamil Conveyancers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Hindi Conveyancers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Spanish Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Find Your Language
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500">
                    Complaints Procedure
                  </a>
                </li>
              </ul>
            </div>

            {/* Trust Badges & Social */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">
                Trust & Compliance
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">
                  SRA Compliant
                </span>
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">
                  GDPR Certified
                </span>
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">
                  SSL Secured
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Connect With Us
              </h3>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="hover:text-amber-500 transition duration-200">
                  Facebook
                </a>
                <a href="#" className="hover:text-amber-500 transition duration-200">
                  Twitter
                </a>
                <a href="#" className="hover:text-amber-500 transition duration-200">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-amber-500 transition duration-200">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MovWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
