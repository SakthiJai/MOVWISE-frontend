'use client';
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiUserCheck,
  FiSettings,
} from "react-icons/fi";

import HistorySidebar from "../YourHistory/page";
import { useState } from "react";
import Image from "next/image";

export default function Ouotesdetails() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
  function toggleDropdown() {
      setIsDropdownOpen(!isDropdownOpen);
      console.log(isDropdownOpen);
    }
    
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="w-full h-[80px] bg-[#F9FAFF] border-b border-gray-200 flex justify-between items-center px-6 flex-shrink-0">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-800 ">Movwise</h1>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Settings */}
          <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#DEE4EB] shadow-[0_2px_40px_2px_rgba(0,0,0,0.06)] rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="16.5,19.79 21,12 16.5,4.21 7.5,4.21 3,12 7.5,19.79"
                stroke="#292D32"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="#292D32" strokeWidth="1.5" />
            </svg>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 px-4 py-1 bg-white border border-[#DEE4EB] shadow-[0_2px_40px_2px_rgba(0,0,0,0.06)] rounded-[32px]">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                alt="User Avatar"
                className="absolute w-[26px] h-[26px] object-cover"
                width={10}
                height={10}
              />
            </div>
            <span className="text-sm font-medium text-gray-900 select-none">
              Jessica Samson
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Body Section (fills remaining screen) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 bg-white border-r flex flex-col py-10 px-4 flex-shrink-0">
          <nav className="flex flex-col gap-4">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
              <FiHome className="w-5 h-5" />
              <span className="font font-regular text-base text-[#6A7682]">Home</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#4A7C59] text-white">
              <FiFileText className="w-5 h-5" />
              <span className="font-outfit font-medium text-base ">Quotes</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
              <FiUsers className="w-5 h-5" />
              <span className="font-outfit font-regular text-base text-[#6A7682]">Users</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
              <FiUserCheck className="w-5 h-5" />
              <span className="font-outfit text-base text-[#6A7682]">Partner</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
              <FiSettings className="w-5 h-5" />
              <span className="font-outfit text-base text-[#6A7682]">Setting</span>
            </button>
          </nav>
        </aside>

        {/* Main Content (scrolls internally only) */}
        <main className="flex-1 p-10 bg-white overflow-y-auto scrollbar-thin">
          <div className="min-h-full flex flex-col space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 font text-[32px]">
                Your Quotes <span className="text-lg">🚀</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1 font">
                Two liner descriptions of some kinda content
              </p>
            </div>

            {/* --- your quote cards go here (unchanged) --- */}
           <div className="mt-6 space-y-6">
            {/* Card 1 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              {/* Header */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white font">
  {/* Header */}
  <div className="flex items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl px-8 py-5">
    <div className="flex items-center gap-5">
      <Image                 src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="MyHomeMove" className="w-24 h-14 object-contain"  width={10}
                height={10} />
      <h3 className="font-semibold text-lg text-gray-800">MyHomeMove Conveyancing</h3>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">£3,079.60</p>
        <button className="text-green-700 text-sm font-medium hover:underline" onClick={toggleDropdown}>Price Breakdown</button>
      </div>
      <div className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>

  {/* Body */}
  <div className="p-6 flex flex-col gap-6 font">
    <div className="flex items-start gap-10   ">
      {/* Left: Reviews */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
        <p className=" text-sm">
          <span className="font-bold text-[#4A7C59]">4.4 out of 5</span> <span className='text-black'>(356 reviews)</span>
        </p>
        <p className="text-xs text-[#1B1D21] font-medium">Reviews on the web</p>
        <div className="flex items-center gap-2 text-xs mt-1">
          <a href="#" className="text-gray-800 underline">TrustPilot</a>
          <span className="text-gray-500">• 4.7/5 • 9,308 reviews</span>
        </div>
      </div>

      {/* Middle: Features */}
  <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    Instruct us online in under two minutes
  </li>
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    No move, no legal fee GUARANTEED
  </li>
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    Track the progress of your case through eWay
  </li>
</ul>


      {/* Right: Buttons */}
      <div className="flex flex-row gap-3 justify-end align-self ml-auto">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
          Contact
        </button>
        <button className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]">
          Instruct
        </button>
      </div>
    </div>

    {/* Description + Price Breakdown */}
    {isDropdownOpen&&
    <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-gray-200 pt-6">
      <p className="text-xs text-gray-600 md:max-w-2xl w-1/2 ">
        PM Property Lawyers is an award winning specialist property Solicitors in Sheffield, accredited by the Conveyancing Quality Scheme with clients both locally and nationwide. We aim to provide our clients with a first class hassle free service at a very reasonable cost. Our conveyancers understand the pressures of buying and selling properties and will guide you through the process in a professional and helpful manner. A detailed quotation will be sent shortly.
        <br /><br />
        <span className="font-medium">PM House, 250 Shepcote Lane, Sheffield, S9 1TP</span>
      </p>

   <div className="text-xs text-gray-700">
  <h4 className="font-semibold mb-3">Price Breakdown:</h4>
  <ul className="space-y-2 text-gray-400 flex flex-col">
    <li className="flex justify-between gap-20">
      <span>Sale fees</span>
      <span className="font-bold text-gray-700">£908.40</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Sale disbursements</span>
      <span className="font-bold text-gray-700">£14.00</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Purchase fees</span>
      <span className="font-bold text-gray-700">£1,807.20</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Purchase disbursements</span>
      <span className="font-bold text-gray-700">£350.00</span>
    </li>
    <li className="flex justify-between gap-20 border-t border-gray-300 pt-2 font-medium text-gray-400">
      <span>Total</span>
      <span className="text-green-700 font-bold">£3,079.60</span>
    </li>
    <li className="flex justify-between gap-20 text-gray-400">
      <span>Stamp Duty</span>
      <span className="text-gray-700 font-bold">£20,000.00</span>
    </li>
  </ul>
</div>

    </div>}
  </div>
</div>

            
            </div>

            {/* Card 2 */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
              {/* Header */}
              <div className="flex items-center justify-between bg-green-50 mx-2 mt-2 rounded-2xl px-8 py-5">
                <div className="flex items-center gap-10">
                  <Image
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                    alt="PM Property Lawyers"
                    className="w-24 h-14 object-contain"
                      width={10}
                height={10}
                  />
                  <h3 className="font-semibold text-lg text-gray-800">
                    PM Property Lawyers
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">£3,079.60</p>
                    <button className="text-green-700 text-sm font-medium hover:underline">
                      Price Breakdown
                    </button>
                  </div>
                  <div className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-6 font">
    <div className="flex items-start gap-10   ">
      {/* Left: Reviews */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
        <p className=" text-sm">
          <span className="font-bold text-[#4A7C59]">4.4 out of 5</span> <span className='text-black'>(356 reviews)</span>
        </p>
        <p className="text-xs text-[#1B1D21] font-medium">Reviews on the web</p>
        <div className="flex items-center gap-2 text-xs mt-1">
          <a href="#" className="text-gray-800 underline">TrustPilot</a>
          <span className="text-gray-500">• 4.7/5 • 9,308 reviews</span>
        </div>
      </div>

      {/* Middle: Features */}
  <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    Instruct us online in under two minutes
  </li>
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    No move, no legal fee GUARANTEED
  </li>
  <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
    Track the progress of your case through eWay
  </li>
</ul>


      {/* Right: Buttons */}
      <div className="flex flex-row gap-3 justify-end align-self ml-auto">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
          Contact
        </button>
        <button className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]">
          Instruct
        </button>
      </div>
    </div>

    {/* Description + Price Breakdown */}
    {isDropdownOpen&&
    <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-gray-200 pt-6">
      <p className="text-xs text-gray-600 md:max-w-2xl w-1/2 ">
        PM Property Lawyers is an award winning specialist property Solicitors in Sheffield, accredited by the Conveyancing Quality Scheme with clients both locally and nationwide. We aim to provide our clients with a first class hassle free service at a very reasonable cost. Our conveyancers understand the pressures of buying and selling properties and will guide you through the process in a professional and helpful manner. A detailed quotation will be sent shortly.
        <br /><br />
        <span className="font-medium">PM House, 250 Shepcote Lane, Sheffield, S9 1TP</span>
      </p>

   <div className="text-xs text-gray-700">
  <h4 className="font-semibold mb-3">Price Breakdown:</h4>
  <ul className="space-y-2 text-gray-400 flex flex-col">
    <li className="flex justify-between gap-20">
      <span>Sale fees</span>
      <span className="font-bold text-gray-700">£908.40</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Sale disbursements</span>
      <span className="font-bold text-gray-700">£14.00</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Purchase fees</span>
      <span className="font-bold text-gray-700">£1,807.20</span>
    </li>
    <li className="flex justify-between gap-20">
      <span>Purchase disbursements</span>
      <span className="font-bold text-gray-700">£350.00</span>
    </li>
    <li className="flex justify-between gap-20 border-t border-gray-300 pt-2 font-medium text-gray-400">
      <span>Total</span>
      <span className="text-green-700 font-bold">£3,079.60</span>
    </li>
    <li className="flex justify-between gap-20 text-gray-400">
      <span>Stamp Duty</span>
      <span className="text-gray-700 font-bold">£20,000.00</span>
    </li>
  </ul>
</div>

    </div>}
  </div>
            </div>
          </div>
          </div>
        </main>

        {/* Right History Sidebar (scrolls internally) */}
        <div className="w-[260px] h-full flex-shrink-0">
          <HistorySidebar />
        </div>
      </div>
    </div>
  );
}

