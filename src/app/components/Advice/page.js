// This file is assumed to be in a Next.js project (e.g., app/advice/page.tsx or app/blog/page.tsx)

import Head from 'next/head';

// import Footer from '../Footer'; // Assuming Footer is implemented below or kept simple
// import Image from 'next/image'; // Keeping Image import for potential use
import Navbar from '../../parts/navbar/page';
import Link from 'next/link';

// --- Utility Components for Icons and Buttons (simplified, retained) ---
const FeatureIcon = ({ icon, title, description }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <div className="text-3xl text-emerald-600 mb-2">{icon}</div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const baseUrl = 'https://movwise.digitalcloudies.in/';

const PrimaryCTA = ({ text, href = '#' }) => (
  // Primary Action colour: Emerald Green
  <Link href={href}>
    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
      {text} →
    </button>
  </Link>
);


// --- New/Modified Blog Components ---

const ArticleCard = ({ title, excerpt, category, date, slug }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition duration-300 hover:shadow-xl">
        {/* Placeholder for a blog image */}
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
            [Image Placeholder]
        </div>
        <div className="p-6">
            <p className="text-sm font-medium text-amber-600 uppercase mb-2">{category}</p>
            <Link href={`/advice/${slug}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition duration-150 cursor-pointer">
                    {title}
                </h3>
            </Link>
            <p className="mt-3 text-gray-600 text-sm">{excerpt}</p>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                <span>{date}</span>
                <Link href={`/advice/${slug}`} className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Read More
                </Link>
            </div>
        </div>
    </div>
);


// --- Main Page Component ---
export default function AdvicePage() {
  return (
    <div className='font'>
      <Head>
        <title>MovWise | Property Advice, Moving Guides & Conveyancing Tips</title>
      </Head>

      {/* --- 1. HEADER / NAVIGATION --- */}
      <div className='bg-white shadow-md sticky top-0 p-4 '>
         <Navbar originalstyle={true} />
      </div>


      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 2. HERO SECTION (Advice Focus) --- */}
      

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 3. HOW MOVWISE WORKS (Content Journey) --- */}
      <section id="content-journey" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Your Information Journey</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {/* Step 1: Find */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">🔍</div>
              <h3 className="font-semibold text-lg text-black">Search by Topic</h3>
              <p className="text-sm text-gray-600">Use our search to find specific guides on conveyancing, moving, and property law.</p>
            </div>
            {/* Step 2: Read */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">💡</div>
              <h3 className="font-semibold text-lg text-black">Gain Clarity</h3>
              <p className="text-sm text-gray-600">Read articles written by legal experts, simplified and often with multilingual summaries.</p>
            </div>
            {/* Step 3: Act */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">✅</div>
              <h3 className="font-semibold text-lg text-black">Take Action</h3>
              <p className="text-sm text-gray-600">Use your new knowledge to ask better questions and move forward confidently.</p>
            </div>
            {/* Step 4: Quote */}
            <div>
              <div className="text-2xl font-bold text-white mb-3 mx-auto w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">⚖️</div>
              <h3 className="font-semibold text-lg text-black">Find Your Solicitor</h3>
              <p className="text-sm text-gray-600">Ready? Get a quote from a firm matched to your specific, well-informed needs.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <PrimaryCTA text="Get a Conveyancing Quote" href={`${baseUrl}/auth/login`}/>
          </div>
        </div>
      </section>
 
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 12. FOOTER (Retained) --- */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500">Home</a></li>
                <li><a href="#featured-articles" className="hover:text-amber-500">Advice Hub</a></li>
                <li><a href="#solicitors" className="hover:text-amber-500">For Solicitors</a></li>
                <li><a href="#about" className="hover:text-amber-500">About Us</a></li>
                <li><a href="#contact" className="hover:text-amber-500">Contact</a></li>
              </ul>
            </div>

            {/* Language Support */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Popular Topics</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500">First-Time Buyer</a></li>
                <li><a href="#" className="hover:text-amber-500">Stamp Duty Guide</a></li>
                <li><a href="#" className="hover:text-amber-500">Leasehold Explained</a></li>
                <li><a href="#" className="hover:text-amber-500">Moving Checklist</a></li>
              </ul>
            </div>

            {/* Legal (Retained) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-500">Terms of Use</a></li>
                <li><a href="#" className="hover:text-amber-500">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-amber-500">Complaints Procedure</a></li>
              </ul>
            </div>

            {/* Trust Badges & Social (Retained) */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">Trust & Compliance</h3>
              <div className="flex space-x-4 mb-6">
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">SRA Compliant</span>
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">GDPR Certified</span>
                <span className="text-amber-500 font-semibold border border-amber-500 p-2 text-sm rounded">SSL Secured</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Connect With Us</h3>
              <div className="flex space-x-4 text-3xl">
                <a href="#" className="hover:text-amber-500 transition duration-200">Facebook</a> {/* Facebook icon placeholder */}
                <a href="#" className="hover:text-amber-500 transition duration-200">Twitter</a> {/* Twitter icon placeholder */}
                <a href="#" className="hover:text-amber-500 transition duration-200">LinkedIn</a> {/* LinkedIn icon placeholder */}
                <a href="#" className="hover:text-amber-500 transition duration-200">Instagram</a> {/* Instagram icon placeholder */}
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MovWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* <Footer/> */}
    </div>
  );
}