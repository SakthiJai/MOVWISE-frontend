'use client';
import React, { useState } from 'react';
import Navbar from '../../parts/navbar/page';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';




export default function Comparequotes() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
    // console.log(isDropdownOpen);
    
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-white antialiased   ">
      {/* Top bar */}
      <Navbar />

      {/* Body */}
      <main className="mx-auto max-w-[1200px]  pt-10">
        <div className="flex gap-12">
          {/* Left rail: stepper panel */}
          <aside className=" relative w-[400px] rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 p-8">
              {/* Step 1 */}
           {/* Step 1 - Completed */}
        <div className="flex items-start">
  <div className="relative mr-4">
    <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-[#1E5C3B] flex items-center justify-center text-white">
      {/* Check icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
  </div>
  <div>
    <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">STEP 1</div>
    <div className="font-outfit text-[20px] text-gray-900 font-semibold">Personal Details</div>
  </div>
        </div>

{/* Step 2 - Completed */}
<div className="flex items-start mt-8">
  <div className="relative mr-4">
    <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-[#1E5C3B] flex items-center justify-center text-white">
      {/* Check icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
  </div>
  <div>
    <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">STEP 2</div>
    <div className="font-outfit text-[20px] text-gray-900 font-semibold">Property Details</div>
  </div>
</div>

{/* Step 3 - In progress (keep as current) */}
<div className="flex items-start mt-8">
  <div className="mr-4">
    <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="10" r="3" fill="currentColor" />
      </svg>
    </div>
  </div>
  <div>
    <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">STEP 3</div>
    <div className="font-outfit text-[20px] font-semibold text-gray-900">Compare Quotes</div>
    <div className="text-[12px] mt-1 font-semibold font-gilroy text-[#A38320]">In Progress</div>
  </div>
</div>


          
            </div>

            {/* Decorative wave */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[45%] "
              style={{
                background:
                  'radial-gradient(120% 80% at 0% 100%, rgba(178,196,160,0.45) 0%, rgba(178,196,160,0.25) 35%, transparent 70%)',
              }}
            />
          </aside>

          {/* Right section */}
          <section className="flex-1">
            {/* Card */}
            <div className="max-h-[450px] overflow-y-scroll space-y-6 pr-2 scrollbar-hidden rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[10 00px] w-full  ">
              <div className="p-8">
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4" aria-label="Breadcrumb">
                  <Link href="/" className="other-page">Home</Link>
                  <span>/</span>
                  <span className="other-page">Personal Details</span>
                   <span>/</span>
                  <span className="other-page">Property Details</span>
                   <span>/</span>
                  <span className="live-page">Compare Quotes</span>
                </nav>

                <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21] font">Compare Quotes </h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit font font-regular">
By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.                </p>

                {/* Quotes List */}
                <div className="mt-8 space-y-6">
                  {/* Reusable quote card 1 */}
                  {!isDropdownOpen&&
                    <div className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full font">
                 <div className="flex items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl px-8 py-5">
    <div className="flex items-center gap-5 ">
      {/* <img src="public\globe.svg" alt="MyHomeMove" className="w-24 h-14 object-contain" /> */}
            <img  alt="MyHomeMove" className="w-24 h-14 object-contain" />

      <h3 className="font-semibold text-lg text-gray-800">MyHomeMove Conveyancing</h3>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">£3,079.60</p>
        <button className="text-green-700 text-sm font-medium hover:underline underline" onClick={toggleDropdown}>Price Breakdown</button>
      </div>
      <div className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>

                    <div className="p-6 flex flex-col gap-6">
                   <div className="flex items-start gap-10  ">
      {/* Left: Reviews */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
        <p className=" text-sm">
          <span className="font-bold text-[#4A7C59]">4.4 out of 5</span> <span className='text-black'>(356 reviews)</span>
        </p>
        <p className="text-xs text-[#1B1D21] font-medium">Reviews on the web</p>
        <div className="flex items-center gap-2 text-xs mt-1">
          <Link href="#" className="text-gray-800 underline">TrustPilot</Link>
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
      <div className="flex flex-row gap-3">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
          Contact
        </button>
        <button className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]">
          Instruct
        </button>
      </div>
    </div>
                    </div>
                  </div>
                  }
                
                  {/* End card 1 */}
                {isDropdownOpen&& 
                 <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white font">
  {/* Header */}
  <div className="flex items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl px-8 py-5">
    <div className="flex items-center gap-5">
      <img  alt="MyHomeMove" className="w-24 h-14 object-contain" />
      <h3 className="font-semibold text-lg text-gray-800">MyHomeMove Conveyancing</h3>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">£3,079.60</p>
        <button className="text-green-700 text-sm font-medium hover:underline" onClick={toggleDropdown}><u>Price Breakdown</u></button>
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
    <div className="flex items-start gap-10  ">
      {/* Left: Reviews */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
        <p className=" text-sm">
          <span className="font-bold text-[#4A7C59]">4.4 out of 5</span> <span className='text-black'>(356 reviews)</span>
        </p>
        <p className="text-xs text-[#1B1D21] font-medium">Reviews on the web</p>
        <div className="flex items-center gap-2 text-xs mt-1">
          <Link href="#" className="text-gray-800 underline">TrustPilot</Link>
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
      <div className="flex flex-row gap-3">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
          Contact
        </button>
        <button className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]">
          Instruct
        </button>
      </div>
    </div>

    {/* Description + Price Breakdown */}
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

    </div>
  </div>
</div>

                } 
                </div>
              </div>
            </div>

            {/* Bottom actions */}
           <div className="mt-30 flex justify-end gap-4 max-w-[760px] ">
              <a
                  href={`${baseUrl}`}
                className=" font-outfit  font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21] "
              >
                Cancel
              </a>
              <a
                href="http://localhost:3000/components/comparequotes"
                className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Property Details →
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
 

);
}
