'use client';

import Link from "next/link";

const Navbar = ({ originalstyle = false }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://movwise.digitalcloudies.in/';

  return (
    <div>
       <header  className={`w-full bg-white  ${
        originalstyle ? "" : "pt-3"
      }  mx-auto max-w-[1200px]   flex items-center justify-between`}>
             
        {/* Logo */}
        <Link href="/" className="flex items-center select-none">
          <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">MovWise</span>
          <span className="-translate-y-[6px] mx-[4px]" aria-hidden="true"></span>
          
        </Link>

        {/* Nav */}
        <nav className="flex items-center text-[16px] text-[#1D2630]" id="navbar-personaldetails">
          <Link href="/" className="px-4 text-green-700 relative ">
            Home
            <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-4 h-[2px] bg-green-700 rounded"></span>
          </Link>
          <Link href="/components/About" className="px-4 font-medium hover:opacity-80 font-outfit text-gray-700">About</Link>
          <Link href="/components/Service"
           className="px-4 font-medium hover:opacity-80 font-outfit">Services</Link>
          <Link href="/components/Advice"   className="px-4 font-medium hover:opacity-80">Advice / Blog</Link>
          <Link href="/components/Resources" className="px-4 font-medium hover:opacity-80">Resources</Link>
          <Link
              href={`${baseUrl}/auth/registeruser`}
            className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537]  font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
          >
            Register <span className="ml-2">→</span>
          </Link>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
