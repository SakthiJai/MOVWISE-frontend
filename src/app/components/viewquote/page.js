"use client"
import React, { useEffect, useState } from 'react'

import { API_ENDPOINTS, getData } from '../../auth/API/api'
import { Rating } from "react-simple-star-rating";
import { formatGBP } from '../utility/poundconverter'
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function ViewQuote() {
  //   const params = useSearchParams();
  // const ref_no = params.get("ref_no");

    //  console.log("REF NO:", ref_no);

const [rating, setRating] = useState();

const router = useRouter()

  const [data, setData] = useState(null);   // ✔ create state for data
  
useEffect(() => {
  async function fetchviewquote() {
    try {
      const viewquotedata = await getData(API_ENDPOINTS.quotesfilter);
      const result = viewquotedata.data[0];

      console.log("Fetched:", result);

      setData(result);                     // ✔ save API response to state
    } catch (e) {
      console.log(e);
    }
  }
    fetchviewquote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto container-max px-4 grid grid-cols-17 gap-6">

        <aside className="col-span-5">
         <> <div className="border rounded-md shadow-sm py-2 px-6 mt-50.5 text-sm leading-relaxed">


    {/* Logo */}
    {/* <img src={logo} alt="Firm Logo" className="w-55" /> */}

    {/* Section: Contact Details */}
    <p className="mt-7 font-semibold">Contact Details</p>
    <p className="font-semibold mt-1">{data?.conveying_details.company_name}</p>

    {/* Rating */}
<div className="flex items-center text-green-500 text-xs mt-1">
  <Rating
    initialValue={data?.conveying_details.rating}
    readonly
    size={20}
    className="testing"
  />
</div>


    {/* Show rating text */}
    <div className="font-semibold ml-1">{data?.conveying_details.rating} / 5</div>

    <p className="mt-3 font-semibold">The Conveyancing Team</p>
    <p className="font-semibold mt-1">{data?.appsetting_details.phone_number}</p>

    <a
      href="mailto:instruct@conveyancingindex.co.uk"
      className="text-emerald-600 text-xs"
    >
     {data?.appsetting_details.email}
    </a>

    {/* About text */}
    <p className="text-gray-700 text-xs mt-4">
      At <b>{data?.conveying_details.company_name}</b>, we take the hassle out of the legal side of things, so
      that you can concentrate on moving forward with your life. We offer
      straightforward legal advice so that you know where you stand at every
      step in the legal process without all the jargon. With offices in
      Edinburgh, Glasgow & Dundee we have all of Scotland covered. Our team
      are experts in all areas of Residential & Commercial Conveyancing. Our
      main focus is providing our clients with a personal approach and
      excellent communication. On Review Solicitors, we are ranked 2nd in
      Scotland with a rating of 4.9*/5* which is something we are very proud
      of.
    </p>

    <p className="text-gray-700 text-xs mt-3">
      We use technology to our advantage and clients do not need to attend
      our offices (unless they want to!) as we can accept ID using our
      online verification software.
    </p>

    <p className="text-gray-700 text-xs mt-3">
      Conveyancing Index is a leading UK comparison service to help
      consumers find trusted and reliable solicitors for their property
      transaction in England, Wales & Scotland.
    </p>

    <p className="text-gray-700 text-xs mt-3">
      We provide a nationwide panel of quality law firms saving you time and
      money and will use our expertise to ensure you choose a law firm who
      can meet your requirements.
    </p>

    {/* Subheader */}
    <p className="underline text-gray-700 text-xs mt-4">
      Compared to instructing a law firm direct, Conveyancing Index offer:
    </p>

    {/* Bullet List */}
    <ul className="mt-2 list-disc pl-5 text-xs text-gray-700 space-y-1">
     <li>{data?.conveying_details.short_notes}</li>
    </ul>
  </div>
</>    {/* ✔ render only if data exists */}
        </aside>

        <main className="col-span-7">
          {data &&   <div className="max-w-md mx-auto font-display bg-white">
      {/* Top Summary Box */}
      <div className="border rounded-md shadow-sm mb-6">
        <div className="bg-emerald-600 text-white text-center py-2 font-semibold text-base">
          Total Fees & Disbursements
        </div>

        <div className="py-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">{formatGBP(data.total)}</p>
          <p className=" text-xs  font-semibold">(including VAT)</p>

          <button className="bg-[#F8C537] text-white px-32.5 py-2 rounded text-sm font-medium mt-4 ml-5 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="white"
    className="w-6   mt-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687 1.687m-8.03 8.03l-3.01.753.753-3.01 8.03-8.03a1.5 1.5 0 012.121 0l.146.146a1.5 1.5 0 010 2.121l-8.03 8.03z"
    />
  </svg>

  <span className="text-base">Instruct Firm</span>
</button>
        </div>
        
        
      </div>

      {/* Main Sale Quote */}
      <div className="border rounded-md mb-6">
        <div className="bg-emerald-600 text-white text-center py-2 font-semibold text-base">
          Sale Quote
        </div>

        <div>
          {/* Sale Fees */}
          <div className="mb-1 p-4">
            <p className="font-bold text-black mb-3">Sale Fees</p>

            <div className="space-y-2 ml-5 text-sm">
              <div className="flex justify-between  ">
                <span>Legal Fee</span>
                <span>{formatGBP(data.legal_fees)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Disbursements</span>
                <span>{formatGBP(data.disbursements)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT</span>
                <span>{formatGBP(data.vat)}</span>
              </div>
             
            </div>
             <div className="flex justify-between font-semibold mt-3 text-base  ">
                <span>Total Fees</span>
                <span>{formatGBP(data.total)}</span>
              </div>
          </div>
          <div  className=" border-t   ">

          </div>

          {/* Disbursements */}
          <div className="   p-4">
            <p className="font-bold text-black  mb-3 ">Disbursements</p>

            <div className="space-y-2 ml-5 text-sm">
              <div className="flex justify-between">
                <span>Land Register Discharge Dues</span>
                <span>£90.00</span>
              </div>
              <div className="flex justify-between">
                <span>Advance Notice of Standard Security</span>
                <span>£20.00</span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Search</span>
                <span>£105.00</span>
              </div>
             
            </div>
             <div className="flex justify-between font-semibold  mt-3 text-base  ">
                <span>Total Disbursements</span>
                <span>£215.00</span>
              </div>  
          </div>
        </div>
      </div>

      {/* Bottom Summary Box */}
      <div className="border rounded-md">
        <div className="bg-emerald-600 text-white text-center py-2 font-semibold text-base ">
          Total Fees & Disbursements
        </div>

        <div className="py-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">{formatGBP(data.total)}</p>
          <p className="text-xs  font-semibold ">(including VAT)</p>
<button className="bg-[#F8C537] text-white px-32.5 py-2 rounded text-sm font-medium mt-4 ml-5 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="white"
    className="w-6   mt-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687 1.687m-8.03 8.03l-3.01.753.753-3.01 8.03-8.03a1.5 1.5 0 012.121 0l.146.146a1.5 1.5 0 010 2.121l-8.03 8.03z"
    />
  </svg>

  <span className="text-base">Instruct Firm</span>
</button>

        </div>
      </div>
    </div>}       {/* ✔ avoid undefined errors */}
        </main>

        <aside className="col-span-5">
          {data &&  <div className="font-display ">
      {/* Header Button */}
      <div className="flex justify-center  mb-15 mt-26 ml-32  ">
        <button className="border px-4 py-2 rounded  text-emerald-600  text-sm flex items-center gap-2">
          <MdEmail className="text-emerald-600" />
          Email My Quote
        </button>
      </div>

      {/* Quote Container */}
      <div className="border rounded  space-y-4  ">
        {/* Quote Header */}
        <div className="py-3 px-5    ">
          <h2 className="text-lg  mb-2 font-semibold text-emerald-600">
            Conveyancing Quote
          </h2>

          <div className="text-sm mt-1">
            <div className="flex">
              <span className="font-semibold w-20">Type</span>
              <span>Sale Only</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-20 ">Client Ref</span>
              <span className="text-white  bg-emerald-600">
                EX-CNS112203596
              </span>
            </div>
          </div>
        </div>
        <div className=" border-t  "></div>

        {/* Your Details Section */}
        <div className=" py-1 px-5">
          <h3 className="text-lg  mb-2 font-semibold text-emerald-600">
            Your Details
          </h3>

          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="font-semibold w-19">Name</span>
              <span>{data?.customer_details.first_name+data?.customer_details.last_name}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-20 ">Email</span>
              <span className="ml-1 ">{data.customer_details.email}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-19">Phone</span>
              <span>{data.customer_details.phone}</span>
            </div>
           
          </div>

          <p className="text-xs text-gray-500 mt-3">
            If any of these details are incorrect, email: 
            <span className="text-emerald-600   ">
            {" "+data.appsetting_details.email}
            </span>
              <span className="ml-1">
                or call us on            {data.appsetting_details.phone_number}

                </span> 
          </p>
        </div>
        <div className=" border-t   "></div>

        {/* Sale Property Section */}
        <div className="py-2 px-5">
          <h3 className="text-lg mb-2 font-semibold text-emerald-600">
            Sale Property
          </h3>

          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="font-semibold w-32">Postcode:</span>
              <span>ML6 7BF</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Value</span>
              <span>£300,000</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Tenure</span>
              <span>Freehold</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Mortgage?</span>
              <span>Yes</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">No. of sellers</span>
              <span>1</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Instruct</span>
              <span>Within 1</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32"></span>
              <span>week</span>
            </div>

            <div className="space-y-1 text-sm">
              {/* First row */}
              <div className="flex">
                <span className="font-semibold w-32">Shared Ownership</span>
                <span>Yes</span>
              </div>

              {/* Second row */}
              <div className="flex">
                <span className="font-semibold w-32">Scheme?</span>
                {/* replace '---' with actual scheme if available */}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-1">Test</p>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex justify-center mt-10 ml-32  ">
        <button className="border px-4 py-2 rounded text-emerald-600 text-sm flex items-center gap-2">
          <MdEmail className="text-emerald-600" />
          Email My Quote
        </button>
      </div>
    </div>}      {/* ✔ safe rendering */}
        </aside>

      </div>
    </div>
  )
}
