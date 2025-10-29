
"use client"

import Head from 'next/head';
import Footer from '../Footer';
import Image from 'next/image';
import Navbar from '../../parts/navbar/page';
import Link from 'next/link';
 import { CheckCircleIcon,BookOpenIcon, ClockIcon, CloudIcon, PrinterIcon} from 'lucide-react';
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

export default function ServicePage() {
  // Keywords relevant to the content:
  const keywords = "conveyancing services, property forms, ID checks, document storage, case follow-up, MovWise Cloud, legal documents";

  return (
    <div className='font'>
       <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>
       <div className='bg-white shadow-md sticky top-0 p-4 '>
         <Navbar originalstyle={true} />
      </div>
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hidden element for SEO keywords (Metadata would be in the <Head> component in a real Next.js page) */}
      <div className="hidden">{keywords}</div> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Header */}
        <div className="text-center">
    

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
              <div key={service.title} className="relative">
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
    <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
            
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

            {/* Trust Badges & Social */}
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
    </div>
  );
};

