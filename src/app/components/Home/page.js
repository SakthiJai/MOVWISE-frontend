// This file is assumed to be in a Next.js project (e.g., app/page.tsx)
import Head from 'next/head';

// --- Utility Components for Icons and Buttons (simplified) ---
const FeatureIcon = ({ icon, title, description }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <div className="text-3xl text-emerald-600 mb-2">{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const PrimaryCTA = ({ text }) => (
  // Primary Action colour: Emerald Green
  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
    {text} →
  </button>
);

// --- Main Page Component ---
export default function HomePage() {
  return (
    <div className='font'>
      <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>

      {/* --- 1. HEADER / NAVIGATION (Simplified) --- */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold text-emerald-800">🏠 MovWise</div>
          <nav className="hidden md:flex space-x-6 text-gray-600">
            <a href="#how-it-works" className="hover:text-emerald-600">How It Works</a>
            <a href="#why-choose" className="hover:text-emerald-600">Why Choose Us</a>
            <a href="#solicitors" className="hover:text-emerald-600">For Solicitors</a>
          </nav>
          <PrimaryCTA text="Get Your Free Quote" />
        </div>
      </header>

      {/* --- 2. HERO SECTION --- */}
      <section className="bg-white pt-16 pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Compare Conveyancing Quotes & Move with Confidence
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              **Your Move. Your Choice. Your Conveyancer.**
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Compare fixed-fee quotes from trusted UK conveyancers and solicitors in minutes. MovWise helps you find the right legal partner to buy, sell, or remortgage your home — faster, clearer, and smarter.
            </p>
            <div className="mt-8">
              <PrimaryCTA text="Get Your Free Quote" />
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="hidden md:block">
             <div className="bg-gray-200 h-96 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
                [Image Placeholder: Happy couple receiving keys]
             </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 3. HOW MOVWISE WORKS --- */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How MovWise Works</h2>
        
<div className="grid md:grid-cols-4 gap-8 text-center">
    {/* Step 1 */}
    <div>
      {/* Container styled with Emerald Green background */}
      <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          1
      </div>
      <h3 className="font-semibold text-lg">Tell Us About Your Move</h3>
      <p className="text-sm text-gray-600">Complete our simple 2-minute form.</p>
    </div>
    {/* Step 2 */}
    <div>
      {/* Container styled with Emerald Green background */}
      <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          2
      </div>
      <h3 className="font-semibold text-lg">Compare Instant Quotes</h3>
      <p className="text-sm text-gray-600">Receive up to 5 fixed-fee quotes.</p>
    </div>
    {/* Step 3 */}
    <div>
      {/* Container styled with Emerald Green background */}
      <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          3
      </div>
      <h3 className="font-semibold text-lg">Choose & Connect</h3>
      <p className="text-sm text-gray-600">Select your preferred solicitor.</p>
    </div>
    {/* Step 4 */}
    <div>
      {/* Container styled with Emerald Green background */}
      <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          4
      </div>
      <h3 className="font-semibold text-lg">Track Your Progress</h3>
      <p className="text-sm text-gray-600">Monitor your case 24/7 via the Cloud Portal.</p>
    </div>
</div>

          <div className="text-center mt-12">
            <PrimaryCTA text="Start My Quote" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 4. WHY CHOOSE MOVWISE? --- */}
      <section id="why-choose" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose MovWise?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureIcon icon="⚖️" title="Transparent Pricing" description="Instant fixed quotes with no hidden extras. See exactly what you'll pay upfront." />
            {/* Highlight the USP using the Accent colour (Amber Yellow) for attention */}
            <div className="text-center p-4 bg-amber-50 rounded-lg shadow-md border-2 border-amber-300">
                <div className="text-3xl text-amber-600 mb-2">💬</div>
                <h3 className="font-semibold text-lg">Multilingual Support</h3>
                <p className="text-sm text-gray-700">Get explanations in your preferred language. We speak Tamil, Hindi, Spanish & more.</p>
            </div>
            <FeatureIcon icon="🧑‍💼" title="Verified Professionals" description="Every conveyancer is regulated by the SRA or CLC for your peace of mind." />
            <FeatureIcon icon="🔁" title="Smart Matching" description="We pair you with firms experienced in your specific property type and location." />
            <FeatureIcon icon="☁️" title="Secure Case Tracking" description="Monitor your conveyancing progress 24/7 through our secure cloud portal." />
            {/* Add more icons/features here */}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 5. MULTILINGUAL CONVEYANCING HUB (USP) --- */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Property Law Without Language Barriers</h2>
          <p className="text-xl text-center text-emerald-800 font-medium mb-10">Conveyancing in Your Language</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Search & Testimonials */}
            <div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Find a solicitor who speaks:</h3>
                <div className="flex space-x-3">
                  <select className="flex-1 border border-gray-300 p-2 rounded-lg">
                    <option>Select Language</option>
                    <option>Tamil</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                  <button className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700">Search</button>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {/* Use Amber accent for testimonials */}
                <blockquote className="p-4 border-l-4 border-amber-500 bg-white shadow-sm italic text-gray-700">
                  "Finally found a **Tamil-speaking conveyancer!**" – Karthick Raja, Reading
                </blockquote>
                <blockquote className="p-4 border-l-4 border-amber-500 bg-white shadow-sm italic text-gray-700">
                  "Legal documents explained clearly in **Hindi**" – Rohan Patel, London
                </blockquote>
              </div>
            </div>

            {/* Right Column: Support Services */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Language Support Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center text-emerald-600">✅ <span className="text-gray-700 ml-2">Document explanations in your chosen language</span></li>
                <li className="flex items-center text-emerald-600">✅ <span className="text-gray-700 ml-2">Help completing forms and ID checks</span></li>
                <li className="flex items-center text-emerald-600">✅ <span className="text-gray-700 ml-2">Regular case follow-ups with your conveyancer</span></li>
              </ul>
              <p className="mt-6 text-sm text-gray-500">Languages available: English, Spanish, Tamil, Hindi, Malayalam, Telugu, Polish, Punjabi, Urdu, Arabic, Romanian, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 6. FOR SOLICITORS & CONVEYANCERS (Footer CTA) --- */}
      <section id="solicitors" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Grow Your Practice with Qualified Clients</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Get Verified Leads, Pay on Completion, and benefit from our Multilingual Client Liaison support.
          </p>
          <div className="mt-8">
            {/* Secondary CTA colour: Amber Yellow */}
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
              Join as a Partner →
            </button>
          </div>
        </div>
      </section>
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 7. FOOTER --- */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-sm">
              **MovWise Support Fee:** Includes translation, case tracking, and secure digital storage. A small price for complete peace of mind.
            </p>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} MovWise. All rights reserved.</p>
            <div className="flex space-x-4">
               {/* SRA/CLC Logos Placeholder */}
               <span className="font-semibold text-amber-500">Regulated by SRA & CLC</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}