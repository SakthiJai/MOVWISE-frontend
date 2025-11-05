"use client";
import { Lightbulb, Users, Handshake, Globe } from "lucide-react";
import Head from "next/head";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from '../../parts/Footer/footer';


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
      {/* <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
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
        </section> */}

        {/* 📝 Summary Note Section */}
        {/* <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-amber-500">
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
      </div> */}

           <Footer/>
    
    </div>
  );
}
