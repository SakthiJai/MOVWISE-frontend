'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../parts/navbar/page';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from "../.././constants/config";
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import { Check } from "lucide-react";




const staticQuotesData = [
  {
    company_id: 2,
    company_name: "ABC Legal Ltd",
    email: "info@abclegal.com",
    website: "www.abclegal.com",
    phone_number: "9876543210",
    logo: null,
    notes: "Initial quote for property sale",
    quote_id: 2,
    category: "rateofstampduty",
    quote_price: "250.00",
    property_value: 250,
    languages: [1]
  },
  {
    company_id: 3,
    company_name: "XYZ Conveyancing",
    email: "info@xyzconveyance.com",
    website: "www.xyzconveyance.com",
    phone_number: "1234567890",
    logo: null,
    notes: "Special rate for first-time buyers",
    quote_id: 3,
    category: "rateofstampduty",
    quote_price: "300.00",
    property_value: 300,
    languages: [1]
  }
  // Add more static objects as needed
];

export default function Comparequotes() {

  // State to hold companies data (initialized with static data)
  const [quotesData, setQuotesData] = useState(staticQuotesData);

  // Track which card dropdown is open (by quote_id)
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // Popup modal visibility and selected company state
  const [popupData, setPopupData] = useState({ visible: false, companyName: '' });

  // Toggle dropdown for a particular quote card
  function toggleDropdown(id) {
    setDropdownOpenId(prev => (prev === id ? null : id));
  }

  // On instruct button, show popup modal with message
  function handleInstruct(companyName) {
    setPopupData({ visible: true, companyName });
  }

  // Close popup
  function closePopup() {
    setPopupData({ visible: false, companyName: '' });
    router.push('/'); // Redirect to home page after closing
  }


  const router = useRouter();


  

useEffect(() => {
  const data = localStorage.getItem("getquote");

  if (data) {
    const parsedData = JSON.parse(data); // ✅ convert string → object
    qutesdata(parsedData);
  }

  async function qutesdata(formData) {
    try {
      const response = await postData(API_ENDPOINTS.service, formData);
      console.log("✅ Remortgage API Response:", response.data.id);
      const propety_id = response.data.id;
      console.log("property_id",propety_id);//property_id
      
     const userid = formData.user_id || formData["guest_user "]; // note the space
console.log("User ID or Guest ID:", userid);// user_id
      if (response.code === 200) {
        try{
            const filterPayload = formData.user_id
          ? { user_id: formData.user_id }   // logged-in user
          : { guest_user: "guest_user" };   // guest user

        const quoteResponse = await postData(API_ENDPOINTS.quotesfilter, filterPayload);
        console.log("✅ Quotes Filter API Response:", quoteResponse);
  const { company_id } = quoteResponse.data;
   console.log("companyid", company_id);

  // 4️⃣ Extract the specific fields you want
    if (quoteResponse.status == true) {
      const { company_id } = quoteResponse.data;
   console.log("companyid", company_id);

      // Return them for later use
      return { company_id };
    } else {
      console.warn("⚠️ No data object found in quoteResponse");
      return null;
    }
      
  }
        
        
        catch(error){
          console.error("❌ Failed to post services:", error);
        }
      
      }
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
            <div className="overflow-auto space-y-6 pr-2 rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white w-full lg:h-[500px]">
              <div className="p-4 sm:p-8">
                <nav className="text-[13px] text-[#6B7280] mb-1 flex items-center gap-4" aria-label="Breadcrumb">
                  <Link href="/" className="other-page whitespace-nowrap">Home</Link>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Personal Details</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Property Details</span>
                  <span>/</span>
                  <span className="live-page whitespace-nowrap">Compare Quotes</span>
                </nav>

                <h1 className="text-[20px] sm:text-[24px] font-semibold font-Outfit text-[#1B1D21]">Compare Quotes</h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit">
                  By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.
                </p>

                <div className="mt-8 space-y-6">
                  {quotesData.map((quote) => (
                    <div key={quote.quote_id} className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full">
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row items-center justify-between bg-red-50 mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5">
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          {quote.logo ? (
                            <Image src={quote.logo} alt={quote.company_name} width={80} height={40} className="object-contain" />
                          ) : (
                            <Image width={80} height={40} src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt={quote.company_name} className="object-contain" />
                          )}
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">{quote.company_name}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">£{quote.quote_price}</p>
                            <button
                              className="text-green-700 text-sm font-medium hover:underline"
                              onClick={() => toggleDropdown(quote.quote_id)}
                            >
                              {dropdownOpenId === quote.quote_id ? <u>Hide Price Breakdown</u> : <u>Price Breakdown</u>}
                            </button>
                          </div>
                          <div
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer"
                            onClick={() => toggleDropdown(quote.quote_id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                              className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${dropdownOpenId === quote.quote_id ? 'rotate-180' : ''}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content */}
                   
                        <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                            {/* Left: Reviews - Static placeholder */}
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-1 text-yellow-400">⭐⭐⭐⭐⭐</div>
                              <p className="text-sm">
                                <span className="font-bold text-[#4A7C59]">4.4 out of 5</span> <span className='text-black'>(356 reviews)</span>
                              </p>
                              <p className="text-xs text-[#1B1D21] font-medium">Reviews on the web</p>
                              <div className="flex items-center gap-2 text-xs mt-1">
                                <Link href="#" className="text-gray-800 underline">TrustPilot</Link>
                                <span className="text-gray-500">• 4.7/5 • 9,308 reviews</span>
                              </div>
                            </div>

                            {/* Middle: Features - Static placeholder */}
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
                              <button
                                className="px-4 py-2 bg-[#4A7C59] text-white rounded-full hover:bg-[#3b6248]"
                                onClick={() => handleInstruct(quote.company_name)}
                              >
                                Instruct
                              </button>
                            </div>
                          </div>

                          {/* Description + Price Breakdown */}
                     {dropdownOpenId === quote.quote_id && (        <div className="grid md:grid-cols-2 justify-between gap-6 border-t border-gray-200 pt-6">
                            <p className="text-xs text-gray-600">
                              {quote.notes || "No description available."}<br /><br />
                              <span className="font-medium">{quote.website}</span>
                            </p>

                            <div className="text-xs text-gray-700">
                              <h4 className="font-semibold mb-3">Price Breakdown:</h4>
                              <ul className="space-y-2 text-gray-400 flex flex-col">
                                <li className="flex justify-between gap-4 sm:gap-20">
                                  <span>Quote Price</span>
                                  <span className="font-bold text-gray-700">£{quote.quote_price}</span>
                                </li>
                                <li className="flex justify-between gap-4 sm:gap-20">
                                  <span>Property Value</span>
                                  <span className="font-bold text-gray-700">£{quote.property_value}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                    
                      )}
                          </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-18 flex justify-end gap-4">
              <button
                onClick={() => router.back()}
                className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
              >
                Back
              </button>

             
            </div>
          </section>

          {/* Popup Modal for Instruct */}
          {popupData.visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center space-y-4 border-2">
            <p className='text-center justify-center items-center flex  '>    <Check size={90} color="#16A34A" className='text-center' /> </p> {/* green tick */}

                <h2 className="text-lg font-semibold text-green-900">Quote Submitted</h2>
                <p className='text-black'>Your quote details have been submitted for <strong>{popupData.companyName}</strong>.</p>
                <button
                  className="mt-4 px-4 py-2 bg-[#1E5C3B] text-white rounded-full hover:bg-[#154427]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}