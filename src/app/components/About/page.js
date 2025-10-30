"use client";
import { Lightbulb, Users, Handshake, Globe } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from '../../parts/Footer/footer';


const values = [
  { 
    title: "Transparency", 
    description: "In every quote and communication, ensuring clarity and trust in the conveyancing process.", 
    icon: Lightbulb,
    color: "text-blue-600"
  },
  { 
    title: "Inclusivity", 
    description: "Through multilingual accessibility, making essential UK conveyancing services available to everyone.", 
    icon: Globe,
    color: "text-emerald-600"
  },
  { 
    title: "Innovation", 
    description: "In client-conveyancer connections, leveraging technology for a seamless, digital experience.", 
    icon: Users, // Using Users for connection/network
    color: "text-purple-600"
  },
  { 
    title: "Partnership", 
    description: "With regulated legal experts, ensuring all advice and service is high-quality and reliable.", 
    icon: Handshake,
    color: "text-amber-600"
  },
];

export default function AboutPage() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Compare Conveyancing Quotes &amp; Move with Confidence</title>
      </Head>

      {/* Sticky Navigation Bar */}
      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="">
          
          {/* Header/Hero Section */}
          <header className="text-white p-8 sm:p-12 text-center rounded-t-2xl">
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About MovWise
            </h1>
            <p className="text-base font-semibold tracking-wide uppercase mt-2" style={{ color: '#008236' }} >
              Your Smart Conveyancing Comparison Platform
            </p>
          </header>

          {/* Core Content Section */}
          <main className="p-6 sm:p-12 space-y-12">
            
            {/* Mission & Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                Our Vision
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;To make every home move smarter, simpler, and more supported through technology and transparency.&rdquo;
                </p>
              </div>

              <p className="mt-6 text-gray-600 leading-relaxed">
                MovWise is at the forefront of the <strong>UK conveyancing service</strong> market. We developed our platform as a direct response to the complexity and confusion often associated with moving home. As a dedicated <strong>conveyancing comparison platform</strong>, our goal is to simplify this essential process by providing homeowners with instant, accurate, and truly comparable quotes from regulated legal experts. We are driven by <strong>conveyancing technology</strong> designed to bring clarity and efficiency to one of life&apos;s biggest milestones.
              </p>
            </section>

            {/* Values Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                The Principles That Guide Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                    {value.icon && (
                      <value.icon className={`w-8 h-8 mb-3 ${value.color}`} />
                    )}

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology & Accessibility Section */}
            <section className="bg-gray-100 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Technology and Trust in Every Transaction
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe great <strong>conveyancing technology</strong> should do more than just compare prices—it should connect people. Our innovative tools streamline the document exchange and communication between you and your chosen firm. We ensure every <strong>Partnership</strong> is with firms that are verified and regulated, providing you with peace of mind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Furthermore, embodying our <strong>Inclusivity</strong> value, we offer <strong>multilingual support</strong> options. We recognize the diverse nature of the UK population and are committed to breaking down language barriers, ensuring a smooth, supported journey for every customer navigating the complexities of the UK property market.
              </p>
              <div className="mt-6 text-center">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300 transform hover:scale-105"
                  onClick={() => console.log("Navigate to Comparison Tool")}
                  aria-label="Start comparing conveyancers"
                >
                  Start Your Smart Move Today
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer Section (Simplified for display) */}
   <Footer/>
    </div>
  );
}
 