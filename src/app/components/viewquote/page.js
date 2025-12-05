"use client";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import Navbar from "../../parts/navbar/page";
import Footer from "../../parts/Footer/footer";
import { API_ENDPOINTS, getData } from "../../auth/API/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function ViewQuote() {
  // const params = useSearchParams();
  // const ref_no = params.get("ref_no");
  const ref_no=""

  const [view_data, setview_data] = useState(null);
  const router = useRouter();

 useEffect(() => {
    if (!ref_no) return;   // Wait until query param is available

    async function fetchData() {
      try {
        const response = await getData(`${API_ENDPOINTS.quotesfilter}/${ref_no}`);
        setview_data(response.data[0]);
        console.log(view_data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [ref_no]); 

  if (!view_data) return <p className="p-5">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="font-family min-h-screen p-5 mx-90 text-black">

        {/* ---------- TOP BUTTONS ---------- */}
        <div className="flex justify-between items-center mb-6 px-4">
          <button
  className="border px-4 py-2 rounded text-emerald-600 text-sm flex items-center gap-2"
  onClick={() => router.back()}
>
  Back
</button>
          <span className="text-[34px] ml-15 p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
            {view_data?.appsetting_details?.company_name || "MovWise"}
          </span>

          <button className="bg-[#F8C537] text-white px-8 py-2 text-sm font-medium mt-4 ml-5 flex items-center justify-center rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 mt-2"
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

        {/* ---------- MAIN CONTAINER ---------- */}
        <div className="border rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes">

          {/* ---------- COMPANY LOGO + RATING ---------- */}
          <div className="flex justify-between items-start">
            <div className="ml-6">
              <img
                src={
                  view_data?.appsetting_details?.logo ||
                  "/logo.png"
                }
                alt="Company Logo"
                className="w-30 mt-5 h-10"
              />

              <p className="mt-2 font-semibold text-base quotes">Contact Details</p>

              <p className="font-semibold mt-1 text-base ">
                {view_data?.appsetting_details?.phone_number || "N/A"}
              </p>

              <a
                href={`mailto:${view_data?.appsetting_details?.email}`}
                className="text-emerald-600 text-xs"
              >
                {view_data?.appsetting_details?.email}
              </a>
            </div>

            <div className="mt-6">
              <div className="flex items-center text-green-500 text-xs mt-1">
                <Rating
                  initialValue={view_data?.conveying_details?.rating || 0}
                  readonly  
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* ---------- YOUR DETAILS ---------- */}
          <div className="py-1 px-5">
            <div className="text-emerald-600">
              <h3 className="text-lg font-semibold">Your Details</h3>
            </div>

            <div className="space-y-1 text-sm  mt-3">
              <div className="flex">
                <span className="font-semibold w-26">Name</span>
                <span className="ml-5">
                  {view_data?.customer_details?.first_name}{" "}
                  {view_data?.customer_details?.last_name}
                </span>
              </div>

              <div className="flex">
                <span className="font-semibold w-20">Email</span>
                <span className="ml-10">
                  {view_data?.customer_details?.email || "--"}
                </span>
              </div>

              <div className="flex">
                <span className="font-semibold w-20">Phone #1</span>
                <span className="ml-10">
                  {view_data?.conveying_details?.phone_number || "--"}
                </span>
              </div>

              <div className="flex">
                <span className="font-semibold w-24">Phone #2</span>
                <span className="ml-6">--</span>
              </div>
            </div>
          </div>

          {/* ---------- SALE PROPERTY ---------- */}
          <div className="py-1 px-5 text-sm ">
            <div className="text-emerald-600    ">
              <h3 className="text-lg   font-semibold"> Property Details</h3>
            </div>

            <div className="flex mt-3">
              <span className="font-semibold w-32">Value</span>
              <span>£{view_data?.property_value || "--"}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Tenure</span>
              <span>{view_data?.tenure || "--"}</span>
            </div>

            <div className="flex">
              <span className="font-semibold w-32">Mortgage?</span>
              <span>{view_data?.mortgage ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* ---------- FEES SECTION ---------- */}
          <div>
            {/* Sale Fees */}
            <div className="mb-1 p-4">
              <p className="font-bold text-black mb-3">Sale Fees</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Legal Fee</span>
                  <span>£{view_data?.legal_fees}.00</span>
                </div>

                <div className="flex justify-between">
                  <span>VAT</span>
                  <span>£{view_data?.vat}.00</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold mt-3 text-base">
                <span>Total Fees</span>
                <span>£{Number(view_data?.legal_fees) + Number(view_data?.vat)}.00</span>
              </div>
            </div>

            <div className="border-t"></div>

            {/* Disbursements */}
            <div className="p-4">
              <p className="font-bold text-black mb-3">Disbursements</p>

              <div className="space-y-2    text-sm">
                <div className="flex justify-between">
                  <span>Total Disbursements</span>
                  <span>£{view_data?.disbursements}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold mt-3 text-base">
                <span>Total Fees & Disbursements</span>
                <span>£{view_data?.total}.00</span>
              </div>
            </div>
          </div>

          <div className="border-t  w-full"></div>

          {/* ---------- NOTES ---------- */}
          <div>
            <h4>Notes</h4>
            <p className="text-xs mt-4">
              {view_data?.conveying_details?.short_notes ||
                "No notes provided by the firm."}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
