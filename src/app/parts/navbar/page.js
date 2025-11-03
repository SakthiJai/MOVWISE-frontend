'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "../.././constants/config";


const Navbar = ({ originalstyle = false }) => {

  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/components/About" },
    { name: "Services", href: "/components/Service" },
    { name: "Advice / Blog", href: "/components/Advice" },
    { name: "Resources", href: "/components/Resources" },
  ];

  return (
    <header
      className={`w-full bg-white z-50 ${
        originalstyle ? "" : "pt-3"
      } mx-auto max-w-[1200px] flex items-center justify-between`} 
    >
      {/* Logo */}
      <Link href="/" className="flex items-center select-none">
        <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">
          MovWise
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex items-center text-[16px] text-[#1D2630]">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 font-medium font-outfit relative transition-all duration-200 ${
                isActive
                  ? "text-green-700 font-semibold after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-4 after:h-[2px] after:bg-green-700 after:rounded"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Register button */}
        <Link
          href={`${API_BASE_URL}/auth/registeruser`}
          className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
        >
          Get Quote 
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;