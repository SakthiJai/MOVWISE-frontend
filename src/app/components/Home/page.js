// This file is assumed to be in a Next.js project (e.g., app/page.tsx)
import Head from 'next/head';
import Footer from '../Footer';
import Image from 'next/image';
import Navbar from '../../parts/navbar/page';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// --- Utility Components for Icons and Buttons (simplified) ---
const FeatureIcon = ({ icon, title, description }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <div className="text-3xl text-emerald-600 mb-2">{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);
  const baseUrl = 'https://movwise.digitalcloudies.in/';

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

      {/* --- 1. HEADER / NAVIGATION --- */}
      <div className='bg-white shadow-md sticky top-0 p-4 '>
         <Navbar originalstyle={true} />
      </div>


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
        <Link href="components/personaldetails">      <PrimaryCTA  text="Get Your Free Quote" /></Link>
            </div> 
          </div>
          {/* Image Placeholder */}
       <div className="hidden md:block">
  {/* <div className="relative bg-gray-200 h-96 rounded-xl shadow-lg overflow-hidden">
    <Image
      src="/homepagedesign.jpeg"
      alt="conveyancing"
      fill
      className="object-cover rounded-xl"
    />
  </div> */}
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
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">1</div>
              <h3 className="font-semibold text-lg text-black">Tell Us About Your Move</h3>
              <p className="text-sm text-gray-600">Complete our simple 2-minute form. Share your property details and language preference.</p>
            </div>
            {/* Step 2 */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">2</div>
              <h3 className="font-semibold text-lg text-black">Compare Instant Quotes</h3>
              <p className="text-sm text-gray-600">Receive up to 5 fixed-fee quotes from trusted, regulated conveyancers.</p>
            </div>
            {/* Step 3 */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">3</div>
              <h3 className="font-semibold text-lg text-black">Choose & Connect</h3>
              <p className="text-sm text-gray-600">Select your preferred solicitor. Our team helps you understand everything in your language.</p>
            </div>
            {/* Step 4 */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">4</div>
              <h3 className="font-semibold text-lg text-black">Track Your Progress</h3>
              <p className="text-sm text-gray-600">Monitor your case through our secure MovWise Cloud Portal.</p>
            </div>
          </div>
          <div className="text-center mt-12">
           <Link href={`${baseUrl}/auth/login`}> <PrimaryCTA text="Start My Quote"  /></Link>
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
            
            <FeatureIcon icon="⚡" title="Faster Exchange Times" description="Our proactive platform and dedicated support streamline the legal process." />
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
                <p className="mt-6 text-sm text-gray-500 font-semibold">Languages Available: English, Spanish, Tamil, Hindi, Malayalam, Telugu, Polish, Punjabi, Urdu, Arabic, Romanian, and more.</p>
              </div>

              <div className="mt-8 space-y-4">
                <blockquote className="p-4 border-l-4 border-amber-500 bg-white shadow-sm italic text-gray-700">
                 Finally found a Tamil-speaking conveyancer  Karthick Raja Reading
                </blockquote>
                <blockquote className="p-4 border-l-4 border-amber-500 bg-white shadow-sm italic text-gray-700">
                 Legal documents explained clearly in Hindi Rohan Patel, London
                </blockquote>
              </div>
            </div>

            {/* Right Column: Support Services */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Language Support Services</h3>
              <ul className="space-y-3 text-gray-700 list-none p-0">
                <li className="flex items-center text-emerald-600">✓ <span className="text-gray-700 ml-2">Help completing forms and ID checks</span></li>
                <li className="flex items-center text-emerald-600">✓ <span className="text-gray-700 ml-2">Document explanations in your chosen language</span></li>
                <li className="flex items-center text-emerald-600">✓ <span className="text-gray-700 ml-2">Regular case follow-ups with your conveyancer</span></li>
                <li className="flex items-center text-emerald-600">✓ <span className="text-gray-700 ml-2">Secure document storage in MovWise Cloud</span></li>
                <li className="flex items-center text-emerald-600">✓ <span className="text-gray-700 ml-2">Optional printed final documents</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 6. SUPPORT FEE SECTION --- */}
      <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-8 rounded-xl border border-emerald-300 bg-emerald-50 shadow-lg">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">MovWise Support Fee: Complete Peace of Mind</h2>
              <p className="text-lg text-gray-700 mb-6">
                  MovWise includes a **small support fee** covering essential services that guarantee a smoother, clearer process:
              </p>
              
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 list-none p-0 mb-6">
                  <li className="flex items-center">
                      <span className="text-xl text-emerald-600 mr-3">💬</span> Translation and explanation services
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-emerald-600 mr-3">⏱️</span> Case tracking and regular follow-ups
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-emerald-600 mr-3">☁️</span> Secure digital document storage
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-emerald-600 mr-3">📞</span> Multilingual client support
                  </li>
              </ul>

              <p className="text-xl font-semibold text-emerald-800 border-t border-emerald-200 pt-4 mt-4">
                  **Value Proposition:** A small price for complete peace of mind — especially when every property detail matters.
              </p>
          </div>
      </section>
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 7. ABOUT MOVWISE SECTION --- */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">About MovWise</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To make every home move **smarter, simpler, and more supported** through technology and transparency. We aim to remove the stress and confusion from the conveyancing process.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Our Values</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>**Transparency** in every quote and communication</li>
                <li>**Inclusivity** through multilingual accessibility</li>
                <li>**Innovation** in client-conveyancer connections</li>
                <li>**Partnership** with regulated legal experts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 8. FAQ SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Are MovWise quotes fixed-fee estimates?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: **Yes** — all quotes are fixed-fee estimates provided directly by SRA or CLC-regulated firms. This ensures transparency with no hidden costs.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Do I have to pay to get a quote?</summary>
              <p className="mt-2 pl-4 text-gray-700"> No it&apos;s 100% free to compare quotes and contact conveyancers through MovWise. 
  You only pay the firm you instruct.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: How secure is my data?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: MovWise uses encrypted servers and complies fully with **UK GDPR standards** to protect your personal and property data.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Can I access my documents anytime?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: **Absolutely**. All documents are stored safely in your MovWise Cloud Portal 24/7, giving you full control over your case files.</p>
            </details>
          </div>
        </div>
      </section>
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 9. CONTACT SECTION --- */}
      <section id="contact" className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">We&apos;re Here to Help!</h2>
          <p className="text-gray-700 text-lg mb-8">We&apos;re happy to help! Get in touch with our multilingual support team for assistance.</p>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className="text-3xl text-emerald-600 mb-1">📧</p>
              <p className="font-semibold text-gray-800">Email Support</p>
              <a href="mailto:support@movwise.co.uk" className="text-emerald-600 hover:underline">support@movwise.co.uk</a>
            </div>
            <div className="text-center">
              <p className="text-3xl text-emerald-600 mb-1">📞</p>
              <p className="font-semibold text-gray-800">Call Us</p>
              <a href="tel:08001234567" className="text-emerald-600 hover:underline">0800 123 4567</a>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500">🕘 Mon–Fri, 9am–6pm (UK time)</p>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 10. FOR SOLICITORS & CONVEYANCERS (Partner CTA) --- */}
      <section id="solicitors" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Grow Your Practice with Qualified Clients</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Get Verified Leads, Pay on Completion, and benefit from our Multilingual Client Liaison support.
          </p>
          <div className="mt-8">
            {/* Secondary CTA colour: Amber Yellow */}
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
             <Link href="/conveyancers/Companyregistration"> Join as a Partner →</Link>

            </button>
          </div>
        </div> 
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 11. FINAL CTA SECTION --- */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Moving?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Get transparent quotes from trusted conveyancers and make your move with total confidence. **Your next chapter starts with MovWise.**
        </p>
      </section>
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 12. FOOTER --- */}
      <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8 text-center md:text-left">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-500">Home</a></li>
              <li><a href="#" className="hover:text-amber-500">Get Quotes</a></li>
              <li><a href="#solicitors" className="hover:text-amber-500">For Solicitors</a></li>
              <li><a href="#about" className="hover:text-amber-500">About Us</a></li>
              <li><a href="#contact" className="hover:text-amber-500">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500">Terms of Use</a></li>
              <li><a href="#" className="hover:text-amber-500">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-amber-500">Complaints Procedure</a></li>
            </ul>
          </div>

          {/* Trust & Social */}
          <div className="flex flex-col items-center md:items-end justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Trust & Compliance</h3>
              <div className="flex flex-wrap justify-center md:justify-end gap-2 mb-6">
                <span className="text-amber-500 font-semibold border border-amber-500 px-3 py-1 text-sm rounded">
                  SRA Compliant
                </span>
                <span className="text-amber-500 font-semibold border border-amber-500 px-3 py-1 text-sm rounded">
                  GDPR Certified
                </span>
                <span className="text-amber-500 font-semibold border border-amber-500 px-3 py-1 text-sm rounded">
                  SSL Secured
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center md:text-right">
                Connect With Us
              </h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MovWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
      {/* <Footer/> */}
    </div>
  );
}