'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({ originalstyle = false ,hide=true}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userlogin, setuserlogin] = useState();
  const [logintype, setlogintype] = useState();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/components/About" },
    { name: "Services", href: "/components/Service" },
    { name: "Advice / Blog", href: "/blog" },
    { name: "Resources", href: "/components/Resources" },
  ];

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("logintype")) {
      setuserlogin(localStorage.getItem("user"));
      setlogintype(localStorage.getItem("logintype"));
    }
  }, []);

  return (
    <header
      className={`w-full bg-white z-100 ${
        originalstyle ? "" : "pt-1"
      } flex items-center px-5 relative p-0`}

      style={{padding:0}}
      
    >
      {/* Logo */}
      <Link href="/" className="flex-1 items-center select-none">
        <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">
          MovWise
        </span>
      </Link>

      {/* DESKTOP NAV */}
    
      <nav className="hidden md:flex items-center text-[16px] text-[#1D2630] justify-end">
        {links.map((link,index) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <span key={index}>
              {hide && 
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
            </Link> }
            </span>
          
      
          );
        })}

  {hide && 
    <Link
          href="/#quote_type"
          className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
        >
          Get Quote
        </Link> }    
      </nav>

      {/* DESKTOP PROFILE */}
      {userlogin && (
        <div className="relative hidden md:block">
          <button
            onClick={() => setOpen(!open)}
            className="ml-2 flex items-center justify-center bg-white hover:bg-gray-100 text-black rounded-full pr-2 transition"
          >
            <CircleUserRound size={32} className="text-black" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white border rounded-base shadow-lg w-44 z-50">
              <ul className="p-0.5 text-sm font-medium">
                {logintype === "user" && (
                  <li className="hover:bg-yellow-400 text-black">
                    <Link className="block p-2 text-black" href="/components/profile">
                      My Profile
                    </Link>
                  </li>
                )}

                {logintype === "partner" && (
                  <li className="hover:bg-yellow-400 text-black">
                    <Link className="block p-2 text-black" href="/components/account">
                      My Account
                    </Link>
                  </li>
                )}

                {/* <li className="hover:bg-yellow-400 text-black">
                  <Link
                    className="block p-2 text-black"
                    href="/"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Sign outtt
                  </Link>
                </li> */}
               <Link
                  href="/"
                  className="block p-2 text-black"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Sign out
                </Link>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MOBILE BUTTONS */}
      <div className="flex items-center gap-2 md:hidden sm:ml-4">
        <Link
          href="/#quote_type"
          className="h-[40px] px-4 rounded-full bg-[#F8C537] font-extrabold flex items-center justify-center"
        >
          Get Quote
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-black"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-17 left-0 right-0 w-full bg-white border-t md:hidden z-50">
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-3 text-black hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {userlogin && (
              <div className="border-t px-5 py-3">
                {logintype === "user" && (
                  <Link
                    href="/components/profile"
                    className="block py-2 text-black"
                  >
                    My Profile
                  </Link>
                )}

                <Link
                  href="/"
                  className="block py-2 text-black"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Sign out
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
