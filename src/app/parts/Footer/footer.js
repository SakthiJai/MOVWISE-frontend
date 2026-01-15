"use client"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";


export const metadata = {
  title: "Contact Movwise – We're Here to Help",
  description:
    "Get in touch with Movwise for customer support, conveyancing assistance, or general enquiries. Our team is here to help you with conveyancing quotes, services, and support.",

  keywords: [
    "contact conveyancing company",
    "Movwise contact",
    "Movwise customer service",
    "conveyancing support"
  ],

  other: {
    search_intent: "Navigational",
  },

};


export default function Footer(){
  const router = useRouter();

  // ...existing code...
  const [filterselected,setfilterselected]=useState([])

  // Idle logout: clear localStorage after 2 minutes of no activity and redirect to home
  const idleLimitMs = 30 * 60 * 1000; // 2 minutes
  const idleTimerRef = useRef(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      console.log("[IdleTimer] 30 minutes passed: clearing localStorage and redirecting to home page");
      try {
        localStorage.clear();
      } catch (e) {
        console.error("Failed to clear localStorage", e);
      }
      router.push("/");
    }, idleLimitMs);
  }, [router]);

  useEffect(() => {
    // start timer on mount
    resetIdleTimer();

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));

    return () => {
      // cleanup
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);
// ...existing code...
    
    return(
            <footer className="bg-gray-800 text-gray-400 py-12 font relative-z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8 text-center md:text-left">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-amber-500">Home</Link></li>
              <li><Link href="/#quote_type" className="hover:text-amber-500">Get Quotes</Link></li>
              <li><Link href="/conveyancers/Companyregistration" className="hover:text-amber-500">For Solicitors</Link></li>
              <li><Link href="/components/About" className="hover:text-amber-500">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-amber-500">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="hover:text-amber-500">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="hover:text-amber-500">Terms of Use</a></li>
              {/* <li><a href="/cookie-policy" className="hover:text-amber-500">Cookie Policy</a></li>
              <li><a href="/complaints-procedure" className="hover:text-amber-500">Complaints Procedure</a></li> */}
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
    )
}