'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../parts/navbar/page';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from "../.././constants/config";
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";


export default function Comparequotes() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
    // console.log(isDropdownOpen);
  }

  

useEffect(() => {
  const data = localStorage.getItem("getquote");

  if (data) {
    const parsedData = JSON.parse(data); // ✅ convert string → object
    qutesdata(parsedData);
  }

  async function qutesdata(formData) {
    try {
      const response = await postData(API_ENDPOINTS.remortages, formData);
      console.log("✅ Remortgage API Response:", response);
    } catch (error) {
      console.error("❌ Failed to post remortgage:", error);
    }
  }
}, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Top bar */}
      <Navbar />

      {/* Body */}
      <main className="mx-auto max-w-[1200px] pt-10 px-4 lg:px-0">
        {/* KEY CHANGE: The main layout switches from a single column (default) to a two-column grid on 'lg' screens. */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12">
          
          {/* Left rail: stepper panel (Sidebar) */}
          {/* KEY CHANGE: Removed w-[400px] from here. It now spans the full width on small screens and is controlled by the grid on 'lg'. */}
          <aside className="relative rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] shadow-[inset_0_1px_0_rgba(0,0,0,0.03)] p-6 lg:p-0">
             {/* Added p-6 for padding on small screens since the original design had 'absolute inset-0 p-8' */}
            <div className="relative z-10 p-2 lg:p-8"> {/* Re-adjusted padding for lg */}
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
                  <div className="text-[12px] font-medium text-[#2D7C57] mt-1">Completed</div>

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
                                    <div className="text-[12px] font-medium text-[#2D7C57] mt-1">Completed</div>

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
            {/* KEY CHANGE: Changed h-[45%] to h-full and removed absolute for better stacking on mobile. Re-added lg:absolute for large screens. */}
            <div
              aria-hidden="true"
              className="h-full lg:absolute inset-x-0 bottom-0 lg:h-[45%] "
              style={{
                background:
                  'radial-gradient(120% 80% at 0% 100%, rgba(178,196,160,0.45) 0%, rgba(178,196,160,0.25) 35%, transparent 70%)',
              }}
            />
          </aside>

          {/* Right section (Main Content) */}
          {/* KEY CHANGE: Removed col-start-2. The natural flow of the grid handles the stacking on mobile and placement on 'lg' */}
          <section>
            {/* Card */}
            {/* KEY CHANGE: Adjusted h-[500px] and overflow-y-scroll to be responsive for a better mobile experience */}
            <div className="overflow-auto  space-y-6 pr-2  rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white w-full lg:h-[500px]">
              <div className="p-4 sm:p-8 "> {/* Adjusted padding for small screens */}
                <nav className="text-[13px] text-[#6B7280] mb-1 flex items-center gap-4" aria-label="Breadcrumb">
                  <Link href="/" className="other-page whitespace-nowrap">Home</Link>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Personal Details</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Property Details</span>
                  <span>/</span>
                  <span className="live-page whitespace-nowrap">Compare Quotes</span>
                </nav>

                <h1 className="text-[20px] sm:text-[24px] font-semibold font-Outfit text-[#1B1D21] font">Compare Quotes</h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit font font-regular">
                  By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.
                </p>

                {/* Quotes List */}
                <div className="mt-8 space-y-6">
                  {/* Reusable quote card 1 */}
                  {!isDropdownOpen &&
                    <div className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full font">
                      {/* Flex wrapper for the header remains */}
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5">
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          <Image width={10} height={10} src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="MyHomeMove" className="w-20 h-10 object-contain" />
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">MyHomeMove Conveyancing</h3>
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

                      <div className="p-4 sm:p-6 flex flex-col gap-6">
                        {/* KEY CHANGE: Inner card grid layout is now responsive. 
                            It's a single column by default (mobile) and a 3-column grid on 'lg' screens. */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          {/* Left: Reviews */}
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
                            <p className="text-sm">
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
                          {/* KEY CHANGE: The buttons now span the full width on small screens and use lg:col-start-3 for alignment. */}
                          <div className="flex flex-row gap-3 justify-start lg:col-start-3 lg:justify-end">
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
                  {isDropdownOpen &&
                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white font">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5">
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          <Image width={10} height={10} src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="MyHomeMove" className="w-20 h-10 object-contain" />
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">MyHomeMove Conveyancing</h3>
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
                      <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                         {/* KEY CHANGE: Inner card grid layout is now responsive. 
                            It's a single column by default (mobile) and a 3-column grid on 'lg' screens. */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          {/* Left: Reviews */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐ </div>
                            <p className="text-sm">
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
                          <div className="flex flex-row gap-3 justify-start lg:col-start-3 lg:justify-end">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50">
                              Contact
                            </button>
                            <button className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]">
                              Instruct
                            </button>
                          </div>
                        </div>

                        {/* Description + Price Breakdown */}
                        {/* KEY CHANGE: Remains a grid, but switches from one column to two columns on 'md' screens. */}
                        <div className="grid md:grid-cols-2 justify-between gap-6 border-t border-gray-200 pt-6">
                          <p className="text-xs text-gray-600">
                            PM Property Lawyers is an award winning specialist property Solicitors in Sheffield, accredited by the Conveyancing Quality Scheme with clients both locally and nationwide. We aim to provide our clients with a first class hassle free service at a very reasonable cost. Our conveyancers understand the pressures of buying and selling properties and will guide you through the process in a professional and helpful manner. A detailed quotation will be sent shortly.
                            <br /><br />
                            <span className="font-medium">PM House, 250 Shepcote Lane, Sheffield, S9 1TP</span>
                          </p>

                          <div className="text-xs text-gray-700">
                            <h4 className="font-semibold mb-3">Price Breakdown:</h4>
                            <ul className="space-y-2 text-gray-400 flex flex-col">
                              <li className="flex justify-between gap-4 sm:gap-20">
                                <span>Sale fees</span>
                                <span className="font-bold text-gray-700">£908.40</span>
                              </li>
                              <li className="flex justify-between gap-4 sm:gap-20">
                                <span>Sale disbursements</span>
                                <span className="font-bold text-gray-700">£14.00</span>
                              </li>
                              <li className="flex justify-between gap-4 sm:gap-20">
                                <span>Purchase fees</span>
                                <span className="font-bold text-gray-700">£1,807.20</span>
                              </li>
                              <li className="flex justify-between gap-4 sm:gap-20">
                                <span>Purchase disbursements</span>
                                <span className="font-bold text-gray-700">£350.00</span>
                              </li>
                              <li className="flex justify-between gap-4 sm:gap-20 border-t border-gray-300 pt-2 font-medium text-gray-400">
                                <span>Total</span>
                                <span className="text-green-700 font-bold">£3,079.60</span>
                              </li>
                              <li className="flex justify-between gap-4 sm:gap-20 text-gray-400">
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
            {/* KEY CHANGE: Adjusted margin-top and removed max-w to align properly with content card. */}
            <div className="mt-18 flex justify-end gap-4">
             <button
  onClick={() => router.back()}
  className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
>
  Back
</button>

              <Link
                    href={`${API_BASE_URL}/components/propertydetails`}
                className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}