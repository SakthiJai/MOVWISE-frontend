'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../../parts/navbar/page';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Swal from "sweetalert2";
import {formatGBP}from "../utility/poundconverter"

import { Check } from "lucide-react";
import { Rating } from "react-simple-star-rating";





export default function Comparequotes() {

  // State to hold companies data (initialized with static data)

  const [companydata,setcompanydata]=useState();

  const[ref,setref]=useState("")
  

  // Track which card dropdown is open (by quote_id)
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // Popup modal visibility and selected company state
  const [popupData, setPopupData] = useState({ visible: false, companyName: '' });

  // Toggle dropdown for a particular quote card
  function toggleDropdown(id) {
    setDropdownOpenId(prev => (prev === id ? null : id));
  }

  // On instruct button, show popup modal with message
  function handleInstruct(companyName,user_id,conveyancer_id,quote_id) {
    const instructpayload={
"user_id":user_id,
"conveyancer_id":conveyancer_id,
"quote_id":quote_id
    }
    console.log(instructpayload)
    const instruct = postData(API_ENDPOINTS.instruct,instructpayload)
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
    const parsedData = JSON.parse(data); 
    qutesdata(parsedData);
  }

  async function qutesdata(formData) {
    try {
      const response = await postData(API_ENDPOINTS.services, formData);
            console.log("✅ Remortgage API Response:", response?.service?.quote_ref_number);
            setref( response.service.quote_ref_number);

      const propety_id = response.data;
      console.log("property_id",propety_id);//property_id
      
     const userid = formData.user_id || formData["guest_user "]; // note the space
console.log("User ID or Guest ID:", userid);// user_id
      if (response.code === 200) {
        try{
            const filterPayload = formData.user_id
          ? { user_id: formData.user_id }   // logged-in user
          : { guest_user: "guest_user" };   // guest user

      const quoteResponse = await getData(`${API_ENDPOINTS.quotesfilter}/${response?.service.quote_ref_number}`);


console.log("Quotes Filter API Response:", quoteResponse);
const ref_no = quoteResponse.data[0].quote_ref_number;
console.log(ref_no);


// Decode Base64 logo before storing
const formatted = quoteResponse.data.map((item) => {
  return {
    ...item,
    conveying_details: {
      ...item.conveying_details,
      logo: item.conveying_details.logo
        ? `data:image/png;base64,${item.conveying_details.logo}`
        : null,
    },
  };
});

setcompanydata(formatted);
   

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
                  {companydata?.map((quote,index) => (
                    <div key={index} className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full">
                      {/* Card Header */}
                      <div  className={`flex flex-col sm:flex-row items-center justify-between   ${index % 2 === 0 ? "bg-green-50" : "bg-red-50"}  mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5`}>
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          {quote.logo ? (
<Image
  src={quote.conveying_details.logo}
alt={quote.company_name||"company logo"}
    // <- controls visible size
/>
                          ) : (
                            <Image width={35} height={35} src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt={quote.company_name||"company logo"} className="object-contain" />
                          )}
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">{quote.conveying_details.company_name}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">{formatGBP(quote.total)}</p>
                            <button
                              className="text-green-700 text-sm font-medium hover:underline"
                              onClick={() => toggleDropdown(quote.quote_id)}
                            >
                              {dropdownOpenId === quote.quote_id ? <u> Price Breakdown</u> : <u>Price Breakdown</u>}
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
                              <div className="flex items-center gap-1  text-yellow-400"><div className="flex items-center text-green-500 text-xs">
  <Rating
    initialValue={5}
    readonly
    size={20}
    className="testing rating-style"
  />
</div></div>
                              <p className="text-sm">
                                <span className="font-bold text-[#4A7C59]">{quote.conveying_details.rating} out of 5</span> <span className='text-black'>(356 reviews)</span>
                              </p>
                             
                            </div>

                            {/* Middle: Features - Static placeholder */}
                            <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">
                              <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
                              {quote?.conveying_details.short_notes?.length > 60 
  ? `${quote.conveying_details.short_notes.slice(0, 100)}...`
  : quote?.short_notes}
                              </li>
                              
                            </ul>

                            {/* Right: Buttons */}
                            <div className="flex flex-row gap-2 justify-start lg:col-start-3 lg:justify-end">
<Link
  href={`/components/viewquote?ref_no=${ref}`}
  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-100 transition font-medium"
>
  View
</Link>




  <button
    className="px-3 py-1.5 bg-[#4A7C59] text-white text-sm rounded-full hover:bg-[#3b6248]"
    onClick={() => handleInstruct(quote.company_name,quote.guest_id,quote.conveying_details.conveying_id,quote.quote_id)}
  >
    Instruct
  </button>
</div>

                          </div>

                          {/* Description + Price Breakdown */}
     {dropdownOpenId === quote.quote_id && (
  <div className="border-t border-gray-200 pt-6 flex justify-end">
    <div className="text-xs text-gray-700 w-full max-w-[280px]">
      <h4 className="font-semibold mb-3 text-left">Price Breakdown:</h4>

      <ul className="space-y-2 text-gray-600">
       <li className="flex justify-between">
  <span>Legal fees</span>
 <span className="font-bold text-gray-800">{formatGBP(quote.legal_fees)}</span>
</li>



        <li className="flex justify-between">
          <span>Disbursements</span>
          <span className="font-bold text-gray-800">
            {formatGBP(quote.disbursements)}
          </span>
        </li>

        <li className="flex justify-between border-b border-b-gray-500">
          <span>VAT</span>
          <span className="font-bold text-gray-800">
            {formatGBP(quote.vat)}
          </span>
        </li>

        <li className="flex justify-between">
          <span>Total</span>
          <span className="font-bold text-gray-800">
            {formatGBP(quote.total)}
          </span>
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white rounded-2xl p-8 w-[380px] text-center shadow-2xl border border-green-200 animate-popIn">
 
      {/* Icon */}
       <span className="text-[34px] leading-none font-extrabold text-[#1E5C3B] tracking-tight">
          MovWise
        </span>
      <div className="flex justify-center mb-3">
          
        <Check size={100} color="#15803D" className="drop-shadow-md" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-green-800">Quote Submitted</h2>

      {/* Message */}
      <p className="text-gray-700 mt-2 leading-relaxed">
        Your Instruct Quote has been sent to <br></br>
        <strong className="text-green-700"> {popupData.companyName}</strong>.
      </p>

      {/* Button */}
      <button
        className="mt-6 w-auto p-19 py-3 bg-green-700 text-white text-[15px] font-medium rounded-full 
                   hover:bg-green-800 transition-all duration-300 shadow-md"
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