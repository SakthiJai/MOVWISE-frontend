'use client';
import Link from "next/link";

import { usePathname } from "next/navigation";
import { API_BASE_URL } from "../.././constants/config";
import { CircleUserRound, Menu, MenuIcon, MenuSquareIcon, SquareMenu } from "lucide-react";
import { useState } from "react";


const Navbar = ({ originalstyle = false }) => {

  const pathname = usePathname();
 const [open, setOpen] = useState(false);


  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/components/About" },
    { name: "Services", href: "/components/Service" },
    { name: "Advice / Blog", href: "/components/Advice" },
    { name: "Resources", href: "/components/Resources" },
  ];

  return (
    <header
      className={`w-full bg-white z-50   ${
        originalstyle ? "" : "pt-3"
      }  flex items-center `} 
    >
      {/* Logo */}
      <Link href="/" className="flex-1 items-center select-none">
        <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">
          MovWise
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 items-center text-[16px] text-[#1D2630] justify-end ">
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
          href="/#quote_type"
          className="ml-6 inline-flex items-center justify-center  h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
        >
          Get Quote 
        </Link>
    

  

      </nav>
      <div className="relative inline-block">
      {/* Button */}
     <button
  onClick={() => setOpen(!open)}
  className="ml-2 flex items-center justify-center 
             bg-white  border-gray-300 
             hover:bg-gray-100 
             text-gray-700 
             rounded-full pr-2 transition"
>
  <CircleUserRound size={32} className="text-gray-600" />
</button>


      {/* Dropdown */}
      {open && (
        <div className="absolute right-0  z-10 bg-neutral-primary-medium border bg-white  rounded-base shadow-lg w-44 animate-fade-in">
          <ul className="p-0.5 text-sm text-body font-medium">
            <li className="hover:bg-yellow-400 hover:rounded-sm text-black">
              <Link className="block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="/components/Myprofile">
             MY Profile
              </Link>
            </li>
            <li className="hover:bg-yellow-400 hover:rounded-sm text-black ">
              <Link className="block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
My Quotes
              </Link>
            </li>
           
            <li className="hover:bg-yellow-400 hover:rounded-sm text-black">
              <Link className="block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
    </header>
  );
};

export default Navbar;