// This file is assumed to be in a Next.js project (e.g., app/page.tsx)
"use client";
import Head from 'next/head';
import Footer from "../../parts/Footer/footer";
import Image from 'next/image';
import Navbar from '../../parts/navbar/page';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram,Tag, MessageCircle, Clock, PhoneCall, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState , useEffect } from 'react'
import Signinmodal from "./../utility/Singingmodal";
import {
  Home,
  ShoppingBag,
  Landmark,
  Building2,
  ArrowRight,
} from "lucide-react";

import {
  Scale,
  Languages,
  UserCheck,
  Repeat,
  Cloud,
  Zap,
} from "lucide-react";
import { API_BASE_URL } from "../.././constants/config";
import { FaSalesforce } from 'react-icons/fa';
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";


const Loader = () => (
<div className="absolute bottom-0 left-0 w-full">
  <div className="c-slidingLoader h-1 relative overflow-hidden rounded">
    <div className="c-slidingLoader-inner absolute h-full w-full rounded"></div>
  </div>
</div>

);
// --- Utility Components for Icons and Buttons (simplified) ---
const iconColors = {
  Scale: "text-green-700",      
  Languages: "text-yellow-400", 
  UserCheck: "text-red-600",
  Repeat: "text-red-600",   
  Cloud: "text-yellow-400",       
  Zap: "text-green-700", 
};

const icons = {
  Scale,
  Languages,
  UserCheck,
  Repeat,
  Cloud,
  Zap,
};





const FeatureIcon = ({ icon, title, description }) => {
  const Icon = icons[icon];
  const iconColor = iconColors[icon] || "text-gray-500";

  return (
    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm 
                    transition-all duration-300 hover:bg-amber-50 hover:border-amber-300 
                    hover:shadow-lg hover:scale-[1.03]">
      <div className="flex justify-center mb-4">
        <Icon
          className={`h-10 w-10 ${iconColor} transition-colors duration-300 hover:text-amber-600`}
        />
      </div>
      <h3 className="font-bold text-lg text-gray-900 transition-colors duration-300 hover:text-amber-700">
        {title}
      </h3>
      <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-amber-800">
        {description}
      </p>
    </div>
  );
};



const PrimaryCTA = ({ text }) => (
  // Primary Action colour: Emerald Green
  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
    {text} →
  </button>
);

// --- Main Page Component ---
export default  function HomePage() {
  useEffect(()=>{
  fetchdata()
},[])

async function fetchdata(){
try{
    const data = await getData(API_ENDPOINTS.servicelist);
    const lang = await getData(API_ENDPOINTS.languages);
    console.log(lang.users)
    setlang(lang.users)
  console.log(data.users)
  setdata(data.users)
}
catch(e){
  console.log(e);
}
}



    const router = useRouter();
const [modalopen, setModalopen] = useState(false);
const [loginformshow,setloginformshow]=useState(false);
const [lang,setlang]=useState([])
const [loginformdata, setloginformdata] = useState({
  email: "",
  password: "",
});

 const [loading, setLoading] = useState(false);
 const[data,setdata]=useState()
  const options = [
    {
  label: "Sales",
  icon: <Tag className="w-10 h-10 text-[#256041]" />,
  desc: "Quick and easy property sales.",
  "service_id":1,
  page:"Sales"
},
    {
      label: "Purchase",
      icon: <Home className="w-10 h-10 text-[#256041]" />,
      desc: "Buying your dream property ",
      "service_id":2,
      page:"purchase"
    },
  
    {
      label: "Sales & Purchase",
      icon: <Repeat className="w-10 h-10 text-[#256041]" />,
      desc: "Buy and sell in one smooth move",
      "service_id":3,
      page:"saleswithpurchase"
    },
    {
      label: "Remortgage",
      icon: <Landmark className="w-10 h-10 text-[#256041]" />,
      desc: "Refinancing for better rates",
      "service_id":4,
      page:"remortage"
    },
    {
      label: "Transfer of Equity",
      icon: <Building2 className="w-10 h-10 text-[#256041]" />,
      desc: "Changing ownership easily",
      "service_id":5,
      page:"equity"
    },
    

    
  ];


  const [services, setservices] = useState([]);



  const handleSelect = (type,id) => {
    localStorage.setItem("service",id);
    setLoading(true); 

    setTimeout(() => {
      setLoading(false);
      router.push(`/getquote/${type.replace(/\s+/g, "").toLowerCase()}`);
    }, 3000);
  };
  const closeModal = () => {
    console.log("closing...");
    setModalopen(false);
  };

   
  return (
    <div className='font'>
      <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>

      {/* --- 1. HEADER / NAVIGATION --- */}
      <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
         <Navbar originalstyle={true} />
           {loading && <Loader />}
      </div>


      {/* --- 2. HERO SECTION --- */}
      <section className="bg-white pt-16 pb-24 border-b border-gray-100 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Compare Conveyancing Quotes & Move with Confidence
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              <strong>Your Move. Your Choice. Your Conveyancer.</strong>
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Compare fixed-fee quotes from trusted UK conveyancers and solicitors in minutes. MovWise helps you find the right legal partner to buy, sell, or remortgage your home — faster, clearer, and smarter.
            </p>
            <div className="mt-8">
              
            <Link href="#" passHref>
                <div
                  onClick={(e) => {
                    localStorage.removeItem("service");
                    const userId = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                    e.preventDefault();
                    if (userId) {
                      // If user is logged in, go to the getquote flow
                      router.push('/#quote_type');
                    } else {
                      // If not logged in, open sign-in modal
                      setModalopen(true);
                    }
                  }}
                  className="text-blue-500 underline"
                >
                  <PrimaryCTA text="Get Your Free Quote" />
                </div>
              </Link>
            </div> 
          </div>
          {/* Image Placeholder */}
       <div className="hidden md:block">
  <div className="relative    h-96 rounded-xl  overflow-hidden">
    <Image
      src="/homepage.png"
      alt="conveyancing"
      fill
      className="object-cover rounded-xl "
    />
  </div>
</div>

        </div>
      </section>
        <div className=" scroll-mt-24 px-6 py-14 mt-5.5" id='quote_type'>
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-3 tracking-tight">
          Choose Your Quote Type
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Select the type of quote or service you’re looking for below.
        </p>

        {/* Card Row */}
        <div className="flex flex-wrap gap-6 justify-center">
          {options.map((opt) => (
            <div onClick={() => handleSelect(opt.page,opt.service_id)}
              key={opt.label} style={{ cursor: "pointer" }}
              className="bg-white w-60 sm:w-64 lg:w-64 hover:shadow-2xl hover:border-[#256041] transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-3">
                {opt.icon}
                <h2 className="text-lg font-semibold text-[#256041]">
                  {opt.label}
                </h2>
                <p className="text-gray-600 text-sm">{opt.desc}</p>
              </div>

              <button
                onClick={() => handleSelect(opt.page,opt.service_id)}
                className="mt-6 flex items-center justify-center gap-3 bg-[#256041] hover:bg-[#1B4E34] text-white font-semibold py-2.5 px-5 rounded-full text-sm transition-all"
              >
                Get Quote
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

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
           {/* <Link href="components/personaldetails"> <PrimaryCTA text="Start My Quote"  /></Link> */}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 4. WHY CHOOSE MOVWISE? --- */}


  <section id="why-choose" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Why Choose MovWise?
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
    <FeatureIcon
  icon="Scale"
  title="Transparent Pricing"
  description="Instant fixed quotes with no hidden extras. See exactly what you'll pay upfront."
  
/>

<FeatureIcon
  icon="Languages"
  title="Multilingual Support"
  description="Get explanations in your preferred language — we speak Tamil, Hindi, Spanish & more."
/>

<FeatureIcon
  icon="UserCheck"
  title="Verified Professionals"
  description="Every conveyancer is regulated by the SRA or CLC for your peace of mind."
/>

<FeatureIcon
  icon="Repeat"
  title="Smart Matching"
  description="We pair you with firms experienced in your specific property type and location."
/>

<FeatureIcon
  icon="Cloud"
  title="Secure Case Tracking"
  description="Monitor your conveyancing progress 24/7 through our secure cloud portal."
/>

<FeatureIcon
  icon="Zap"
  title="Faster Exchange Times"
  description="Our proactive platform and dedicated support streamline the legal process."
/>

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
                <h3 className="text-xl font-semibold mb-3 text-black">Find a solicitor who speaks:</h3>
                <div className="flex space-x-3">
                  <select className="flex-1 border border-gray-300 p-2 rounded-lg text-black">
                    <option>Select Language</option>
                         {lang?.map((lang, index) => (
        <option key={index} className='text-black'>{lang.language_name}</option>
      ))}
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
                  MovWise includes a <strong>small support fee</strong> covering essential services that guarantee a smoother, clearer process:
              </p>
              
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 list-none p-0 mb-6">
                  <li className="flex items-center">
                      <span className="text-xl text-red-600 mr-3"><MessageCircle /></span> Translation and explanation services
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-green-700 mr-3"><Clock /></span> Case tracking and regular follow-ups
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-yellow-400 mr-3"><Cloud /></span> Secure digital document storage
                  </li>
                  <li className="flex items-center">
                      <span className="text-xl text-red-600 mr-3"><PhoneCall /></span> Multilingual client support
                  </li>
              </ul>

              <p className="text-xl font-semibold text-emerald-800 border-t border-emerald-200 pt-4 mt-4">
                  <strong>Value Proposition:</strong> A small price for complete peace of mind — especially when every property detail matters.
              </p>
          </div>
      </section>
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 7. ABOUT MOVWISE SECTION --- */}
      {/* <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">About MovWise</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To make every home move <strong>smarter, simpler, and more supported</strong> through technology and transparency. We aim to remove the stress and confusion from the conveyancing process.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Our Values</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li><strong>Transparency</strong> in every quote and communication</li>
                <li><strong>Inclusivity</strong> through multilingual accessibility</li>
                <li><strong>Innovation</strong> in client-conveyancer connections</li>
                <li><strong>Partnership</strong> with regulated legal experts</li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 8. FAQ SECTION --- */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Are MovWise quotes fixed-fee estimates?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: <strong>Yes</strong> — all quotes are fixed-fee estimates provided directly by SRA or CLC-regulated firms. This ensures transparency with no hidden costs.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Do I have to pay to get a quote?</summary>
              <p className="mt-2 pl-4 text-gray-700"> No it&apos;s <strong>100% free</strong> to compare quotes and contact conveyancers through MovWise. 
  You only pay the firm you instruct.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: How secure is my data?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: MovWise uses encrypted servers and complies fully with <strong>UK GDPR standards</strong> to protect your personal and property data.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Q: Can I access my documents anytime?</summary>
              <p className="mt-2 pl-4 text-gray-700">A: <strong>Absolutely</strong>. All documents are stored safely in your MovWise Cloud Portal 24/7, giving you full control over your case files.</p>
            </details>
          </div>
        </div>
      </section> */}
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 9. CONTACT SECTION --- */}
      <section id="contact" className=" scroll-mt-24 py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">We&apos;re Here to Help!</h2>
          <p className="text-gray-700 text-lg mb-8">We&apos;re happy to help! Get in touch with our multilingual support team for assistance.</p>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className="text-3xl text-emerald-600 mb-1 pl-17"><Mail /></p>
              <p className="font-semibold text-gray-800">Email Support</p>
              <a href="mailto:support@movwise.co.uk" className="text-emerald-600 hover:underline">support@movwise.co.uk</a>
            </div>
            <div className="text-center">
              <p className="text-3xl text-emerald-600 mb-1 pl-10"><PhoneCall /></p>
              <p className="font-semibold text-gray-800">Call Us</p>
              <a href="tel:08001234567" className="text-emerald-600 hover:underline">0800 123 4567</a>
            </div>
          </div>
          <div className="flex justify-center mt-6">
           <p className="mt-6 text-sm text-gray-500 flex items-center gap-2">
    <Clock className="w-6 h-6 text-gray-700" />
    Mon–Fri, 9am–6pm (UK time)
  </p></div></div>
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
          <Link onClick={(e) => { 
                    localStorage.removeItem("companyData");
                   
                   }} href="/conveyancers/Companyregistration" className='cursor-pointer'>
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
              Join as a Partner →

            </button></Link>
          </div>
        </div> 
      </section>

      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 11. FINAL CTA SECTION --- */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Moving?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Get transparent quotes from trusted conveyancers and make your move with total confidence. <strong>Your next chapter starts with MovWise.</strong>
        </p>
      </section>
        {modalopen && (
                        <Signinmodal closeModal={closeModal} page={"home"} ></Signinmodal>
                        )}
      
      {/* ---------------------------------------------------------------------------------- */}

      {/* --- 12. FOOTER --- */}
     <Footer />
      {/* <Footer/> */}
    </div>
  );
}