import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";



export default function Footer(){
    
    return(
            <footer className="bg-gray-800 text-gray-400 py-12 font">
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
    )
}