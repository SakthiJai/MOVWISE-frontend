
"use client"

import Head from 'next/head';
import Footer from '../../parts/Footer/footer';
import Image from 'next/image';
import Navbar from '../../parts/navbar/page';
import Link from 'next/link';
 import { CheckCircleIcon,BookOpenIcon, ClockIcon, CloudIcon, PrinterIcon} from 'lucide-react';

export default function ServicePage() {
  // Keywords relevant to the content:
  const keywords = "conveyancing services, property forms, ID checks, document storage, case follow-up, MovWise Cloud, legal documents";
const services = [
  { 
    title: "Form Completion & ID Checks", 
    description: "Expert assistance with all necessary forms and secure identity verification.", 
    icon: CheckCircleIcon 
  },
  { 
    title: "Multilingual Document Explanations", 
    description: "Clear explanations of all documents provided in your language of choice.", 
    icon: BookOpenIcon 
  },
  { 
    title: "Regular Case Follow-ups", 
    description: "Stay informed with consistent updates and communication from your dedicated conveyancer.", 
    icon: ClockIcon 
  },
  { 
    title: "Secure Document Storage", 
    description: "All your sensitive documents safely stored and accessible in MovWise Cloud.", 
    icon: CloudIcon 
  },
  { 
    title: "Optional Printed Documents", 
    description: "The choice to receive printed copies of all final legal documents.", 
    icon: PrinterIcon 
  },
];

  return (
    <div className='font'>
       <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>
       <div className='bg-white shadow-md fixed w-full z-50 top-0 p-4  '>
         <Navbar originalstyle={true} />
      </div>
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hidden element for SEO keywords (Metadata would be in the <Head> component in a real Next.js page) */}
      <div className="hidden">{keywords}</div> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Service Header */}
        <div className="text-center ">
    

        <h2 className="text-base font-semibold tracking-wide uppercase" style={{ color: '#008236' }}>Your Stress-Free Conveyancing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Services Included
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We handle the complexities of your property transaction so you can focus on your move.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{service.title}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{service.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Call to Action Example */}
        <div className="mt-20 text-center">
          <a
            href="#" // Replace with actual link
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Get a Free Quote Today
          </a>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

