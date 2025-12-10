"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import Swal from "sweetalert2";
import { formatGBP } from "../utility/poundconverter";

import { Check, Rows, X } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import Footer from "../../parts/Footer/footer";
import SalesPropertyDetails from "./Sales_Property";
import PurchasePropertyDetails from "./PurchasePropertyDetails";
import SalesPurchasePropertyDetails from "./Sales_Purchase_PropertyDetails";
import RemortagePropertyDetails from "./RemortagePropertyDetails"

export default function Comparequotes() {
  // State to hold companies data (initialized with static data)

  const [companydata, setcompanydata] = useState();

  const [ref, setref] = useState("");
  const [quotefound, setquotefound] = useState(false);
  const [view_data, setview_data] = useState({});
  const [quoteData, setquoteData] = useState([]);
  const [viewquotes, showviewquotes] = useState(false);
  const [instructloader,setinstructloader]=useState(false);
  const [quoteid,setquoteid]=useState("");
  const [cardid,setcardid]=useState();
  const [cardshow,setcardshown]=useState(false);
  const [vattax,setvattax]=useState(0);
  const [dropdownshow,setdropdownshow]=useState(false);

  // Track which card dropdown is open (by quote_id)
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // Popup modal visibility and selected company state
  const [popupData, setPopupData] = useState({
    visible: false,
    companyName: "",
  });
  const [taxDetails, settaxDetails] = useState();

  // Toggle dropdown for a particular quote card
  function toggleDropdown(id) {
    showviewquotes(true);
    quoteData.forEach((elememt)=>{
      if(elememt.quote_id==id){
        setview_data(elememt)
      }
    })
    setcardid(id);
    setcardshown(!cardshow);
    //view_data
    console.log(quoteData);
    
  fetchtaxdetails(id);
  }

function handleprice()
{
console.log(companydata)

}
  // On instruct button, show popup modal with message
  function handleInstruct(
    companyName,
    guest_id,
    conveyancer_id,
    quote_id,
    user_id
  )
   {

 setinstructloader(true);
      console.log(instructloader);
setquoteid(quote_id);
    instructquote(quote_id)


    async function instructquote(quote_id){
      try{
const instruct = await getData(API_ENDPOINTS.instruct + "/" + quote_id);
console.log(instruct)
if(instruct){
  setinstructloader(false);
router.push(`/Instruct?id=${quote_id}`);
  console.log(instructloader);
}
      }
      catch(e){
        console.log(e);
      }
    
    
   
    console.log(companyName);
    console.log(popupData);
  }
   }
  // Close popup
  function closePopup() {
    setPopupData({ visible: false, companyName: "" });
    router.push("/"); // Redirect to home page after closing
  }

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("getquote")) {
      console.log("check1");
      const data = localStorage.getItem("getquote");
      if (localStorage.getItem("service")) {
        console.log("check1");

        if (data) {
          const parsedData = JSON.parse(data);
          parsedData.service_type = localStorage.getItem("service");

          qutesdata(parsedData);
          console.log(parsedData);
        }

        async function qutesdata(formData) {
          try {
            const response = await postData(API_ENDPOINTS.services, formData);
            console.log(
              "✅ service API Response:",
              response?.service?.quote_ref_number
            );

            localStorage.setItem("ref_no", response?.service?.quote_ref_number);

            if (response.code == 200) {
              setref(localStorage.getItem("ref_no"));

              // localStorage.removeItem("getquote");
              // localStorage.removeItem("service");

              setquotefound(true);
            } else {
              setquotefound(false);
            }

            // const propety_id = response.data;
            // console.log("property_id",propety_id);//property_id

            const userid = formData.user_id || formData["guest_user "]; // note the space
            console.log("User ID or Guest ID:", userid); // user_id
            if (response.code === 200) {
              try {
                const filterPayload = formData.user_id
                  ? { user_id: formData.user_id } // logged-in user
                  : { guest_user: "guest_user" }; // guest user

                const quoteResponse = await getData(
                  `${API_ENDPOINTS.quotesfilter}/${localStorage.getItem(
                    "ref_no"
                  )}`
                );
                if (quoteResponse?.data?.[0] != undefined) {
                  setview_data(quoteResponse.data[0]);
                  setquoteData(quoteResponse.data);
                }
                console.log(quoteResponse);

                console.log("Quotes Filter API Response:", quoteResponse);

                // Decode Base64 logo before storing
                const formatted = quoteResponse?.data?.map((item) => {
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
                console.log("Formatted Company Data:", formatted);
                
          

                
              } catch (error) {
                console.error("❌ Failed to post services:", error);
              }
            }
          } catch (error) {
            console.error("❌ Failed to post remortgage:", error);
          }
        }
      }
    }
  }, []);

function toggleDropdowncard(id) {
   if (dropdownOpenId === id) {
    // toggle same card
    setDropdownOpenId(prev => !prev);
  } else {
    // open new card
    setDropdownOpenId(id);
    setdropdownshow(true);
  }
  
}



function fetchtaxdetails(id){

let selectedquote=companydata.filter((item)=>item.quote_id==id);
console.log(selectedquote)
console.log(selectedquote[0].conveying_details.taxDetails);

     const grouped = selectedquote[0].conveying_details.taxDetails.reduce((acc, item) => {
  if (!acc[item.fee_category]) {
    acc[item.fee_category] = [];
  }
  acc[item.fee_category].push(item);

 
  return acc;
 
}, {})

  console.log(grouped);
  settaxDetails(grouped);

  const totalTaxVat = selectedquote[0].conveying_details.taxDetails.reduce((sum, item) => {
  return sum + Number(item.vat || 0);
}, 0);

console.log("Total VAT:", totalTaxVat);
setvattax(totalTaxVat);

}

  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Top bar */}
      <Navbar />

      {/* Body */}
      <main className="mx-auto max-w-[1200px] pt-10 px-4 lg:px-0 mb-10">
        {/* KEY CHANGE: The main layout switches from a single column (default) to a two-column grid on 'lg' screens. */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12">
          {/* Left rail: stepper panel (Sidebar) */}
          {/* KEY CHANGE: Removed w-[400px] from here. It now spans the full width on small screens and is controlled by the grid on 'lg'. */}
          <aside className="relative rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] shadow-[inset_0_1px_0_rgba(0,0,0,0.03)] p-6 lg:p-0">
            {/* Added p-6 for padding on small screens since the original design had 'absolute inset-0 p-8' */}
            <div className="relative z-10 p-2 lg:p-8">
              {" "}
              {/* Re-adjusted padding for lg */}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">
                    STEP 1
                  </div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold">
                    Personal Details
                  </div>
                  <div className="text-[12px] font-medium text-[#2D7C57] mt-1">
                    Completed
                  </div>
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">
                    STEP 2
                  </div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold">
                    Property Details
                  </div>
                  <div className="text-[12px] font-medium text-[#2D7C57] mt-1">
                    Completed
                  </div>
                </div>
              </div>
              {/* Step 3 - In progress (keep as current) */}
              <div className="flex items-start mt-8">
                <div className="mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">
                    STEP 3
                  </div>
                  <div className="font-outfit text-[20px] font-semibold text-gray-900">
                    Compare Quotes
                  </div>
                  <div className="text-[12px] mt-1 font-semibold font-gilroy text-[#A38320]">
                    In Progress
                  </div>
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
                  "radial-gradient(120% 80% at 0% 100%, rgba(178,196,160,0.45) 0%, rgba(178,196,160,0.25) 35%, transparent 70%)",
              }}
            />
          </aside>

          {/* Right section (Main Content) */}
          {/* KEY CHANGE: Removed col-start-2. The natural flow of the grid handles the stacking on mobile and placement on 'lg' */}
          <section>
            <div className="overflow-auto space-y-6 pr-2 rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white w-full lg:h-[500px]">
              <div className="p-4 sm:p-8">
                <nav
                  className="text-[13px] text-[#6B7280] mb-1 flex items-center gap-4"
                  aria-label="Breadcrumb"
                >
                  <Link href="/" className="other-page whitespace-nowrap">
                    Home
                  </Link>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">
                    Personal Details
                  </span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">
                    Property Details
                  </span>
                  <span>/</span>
                  <span className="live-page whitespace-nowrap">
                    Compare Quotes
                  </span>
                </nav>

                <h1 className="text-[20px] sm:text-[24px] font-semibold font-Outfit text-[#1B1D21]">
                  Compare Quotes
                </h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit">
                  By completing this form your details are shared with up to 5
                  firms providing the quotes, but absolutely no one else.
                </p>

                <div className="mt-8 space-y-6">
                  {companydata?.map((quote, index) => (
                    <div
                      key={index}
                      className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full"
                    >
                      {/* Card Header */}
                      <div
                        className={`flex flex-col sm:flex-row items-center justify-between   ${
                          index % 2 === 0 ? "bg-green-50" : "bg-red-50"
                        }  mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5`}
                      >
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          {quote.logo ? (
                            <Image
                              src={quote.conveying_details.logo}
                              alt={quote.company_name || "company logo"}
                              // <- controls visible size
                            />
                          ) : (
                            <Image
                              width={35}
                              height={35}
                              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                              alt={quote.company_name || "company logo"}
                              className="object-contain"
                            />
                          )}
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                            {quote.conveying_details.company_name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              {formatGBP(quote.total)}
                            </p>
                            <button
                              className="text-green-700 text-sm font-medium hover:underline"
                              onClick={() => toggleDropdown(quote.quote_id)}
                            >
                              {dropdownOpenId === quote.quote_id ? (
                                <u> Price Breakdown</u>
                              ) : (
                                <u>Price Breakdown</u>
                              )}
                            </button>
                          </div>
                          <div
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer"
                            onClick={() => toggleDropdowncard(quote.quote_id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
                                dropdownOpenId === quote.quote_id
                                  ? "rotate-180"
                                  : ""
                              }`}
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

                      {/* Expandable Content */}

                      <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          {/* Left: Reviews - Static placeholder */}
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Rating
                                initialValue={
                                  quote.conveying_details?.rating ?? 0
                                } // dynamic rating from API
                                readonly
                                size={20}
                                allowFraction
                              />
                            </div>

                            <p className="text-sm mt-1">
                              <span className="font-bold text-[#4A7C59]">
                                {quote.conveying_details?.rating ?? 0} out of 5
                              </span>

                              {quote.conveying_details?.reviews_count && (
                                <span className="text-black">
                                  {" "}
                                  ({quote.conveying_details.reviews_count}{" "}
                                  reviews)
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Middle: Features - Static placeholder */}
                          <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">
                            <li className="relative before:content-['•'] before:absolute before:left-0 before:text-[#4A7C59] before:text-base pl-3">
                              {quote?.conveying_details.short_notes?.length > 60
                                ? `${quote.conveying_details.short_notes.slice(
                                    0,
                                    100
                                  )}...`
                                : quote?.short_notes}
                            </li>
                          </ul>

                          {/* Right: Buttons */}
                          <div className="flex flex-row gap-2 justify-start lg:col-start-3 lg:justify-end">
                            <Link
                              href={`/viewquote?ref_no=${ref}&id=${quote.quote_id}`}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-100 transition font-medium"
                            >
                              View
                            </Link>

                            <button
                              className="px-3 py-1.5 bg-[#4A7C59] text-white text-sm rounded-full hover:bg-[#3b6248]"
                             onClick={() =>
                                handleInstruct(
                                  quote.conveying_details.company_name,
                                  quote.guest_id,
                                  quote.conveying_details.conveying_id,
                                  quote.quote_id,
                                  quote.customer_details.customer_id
                                )
                                
                             }
                            >
                              {quoteid==quote.quote_id?<>
                                                     <div className="flex items-center gap-2">
  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  <span>{instructloader ? "Instructing..." : "Instruct"}</span>
</div>
                              </>:"Instruct"

                                                       
                           }
                           
                            </button>
                          </div>
                        </div>

                        {/* Description + Price Breakdown */}
                       {(dropdownOpenId === quote.quote_id && dropdownshow) && (
                          <div className="border-t border-gray-200 pt-6 flex justify-end">
                           <table className=" border-collapse text-black font">
                              <thead>
                                <tr className="border-b border-gray-300 text-left grid grid-cols-3 w-full gap-5">
                                  <th className=" text-sm font-semibold  ">Type</th>
                                  <th className="text-sm font-semibold  ">Fee Amount</th>
                                  <th className="text-sm font-semibold ">VAT</th>
                                </tr>
                              </thead>
                          
                          <tbody>

  {/* Legal Fees */}
  <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
    <td className="text-sm ">Legal Fees</td>
    <td className="text-sm ">{formatGBP(quote.legal_fees)}</td>
    <td className="text-sm ">-</td>
  </tr>

  {/* Disbursements */}
  <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
    <td className="text-sm ">Disbursements</td>
    <td className="text-sm ">{formatGBP(quote.disbursements)}</td>
    <td className="text-sm ">
      {formatGBP(quote.disbursements * 0.2)}
    </td>
  </tr>

  {/* Country-Based Taxes (Optional Rows) */}
  {quote.service_details[0].service_type == 2 && (
    <>
      {(quote.service_details[0].country === "England" ||
        quote.service_details[0].country === "Northern Ireland") && (
        <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
          <td className="text-sm ">Stamp Duty</td>
          <td className="text-sm ">{formatGBP(quote.stamp_duty)}</td>
          <td className="text-sm">-</td>
        </tr>
      )}

      {quote.service_details[0].country === "Scotland" && (
        <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
          <td className="text-sm ">LLT</td>
          <td className="text-sm ">{formatGBP(quote.llt)}</td>
          <td className="text-sm ">-</td>
        </tr>
      )}

      {quote.service_details[0].country === "Wales" && (
        <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
          <td className="text-sm ">LBTT</td>
          <td className="text-sm ">{formatGBP(quote.lbtt)}</td>
          <td className="text-sm ">-</td>
        </tr>
      )}
    </>
  )}

  {/* TOTAL — Border ONLY ABOVE */}
  <tr className="grid grid-cols-3 w-full gap-5 border-t border-gray-300 bg-gray-50">
    <td className="text-sm font-semibold">Total</td>
    <td className="text-sm font-semibold text-indigo-600">
      {formatGBP(quote.total)}
    </td>
    <td className="text-sm font-semibold text-indigo-600">{formatGBP(vattax)}</td>
  </tr>

</tbody>

                            </table>
                          </div>
                        )}
                       
                       
                        {cardid === quote.quote_id && viewquotes && (
                          <div className="fixed inset-0  z-50 flex items-center justify-center  top-10  animate-fadeIn">
                            <div className="bg-white h-[200px] rounded-2xl  w-[90%] min-h-screen overflow-y-auto text-center shadow-2xl border border-green-200 animate-popIn">
                              <div className="absolute top-3 right-32 ">
                                <button
                                  className="text-4xl text-gray-700"
                                  onClick={() => showviewquotes(false)}
                                >
                                  ×
                                </button>
                              </div>
                              <div className="font-family min-h-screen p-5  text-black">
                                {/* ---------- TOP BUTTONS ---------- */}
                                <div className="grid grid-cols-12 items-center m-6 px-4 ">
                                  <button
                                    className="border px-4 py-2 rounded text-emerald-600 text-sm  items-center gap-2"
                                    onClick={() => showviewquotes(false)}
                                  >
                                    Back
                                  </button>
                                  <span className="  text-[34px] col-span-11  p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
                                    {view_data?.appsetting_details
                                      ?.company_name || "MovWise"}
                                  </span>

                                                              </div>

                                {/* ---------- MAIN CONTAINER ---------- */}
                                <div className="border  rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes">
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

                                      <p className="mt-2 font-semibold text-base quotes">
                                        Contact Details
                                      </p>

                                      <p className="font-semibold mt-1 text-base ">
                                        {view_data?.appsetting_details
                                          ?.phone_number || "N/A"}
                                      </p>

                                      <a
                                        href={`mailto:${view_data?.appsetting_details?.email}`}
                                        className="text-emerald-600 text-xs"
                                      >
                                        {view_data?.appsetting_details?.email}
                                      </a>
                                    </div>

                                   
                                  </div>

                                  {/* ---------- YOUR DETAILS ---------- */}

                                  <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                                    <div className="">
                                      <div className="text-emerald-600">
                                        <h3 className="text-lg font-semibold text-start mt-2">
                                          User Details
                                        </h3>
                                      </div>

                                      <div className="space-y-1 text-sm  mt-3">
                                        <div className="flex">
                                          <span className="font-semibold w-20 text-left">
                                            Name
                                          </span>
                                          <span className="">
                                            {
                                              quote?.customer_details
                                                ?.first_name
                                            }{" "}
                                            {quote?.customer_details?.last_name}
                                          </span>
                                        </div>

                                        <div className="flex">
                                          <span className="font-semibold w-20 text-left">
                                            Email
                                          </span>
                                          <span className="">
                                            {quote?.customer_details?.email ||
                                              "--"}
                                          </span>
                                        </div>

                                        <div className="flex">
                                          <span className="font-semibold w-20 text-left">
                                            Phone
                                          </span>
                                          <span className="">
                                            {quote?.conveying_details
                                              ?.phone_number || "--"}
                                          </span>
                                        </div>
                                      </div>

                                      {(view_data.service_details[0].service_type == 3 ) && <SalesPropertyDetails quote={quote}/>}   
                                   {(view_data.service_details[0].service_type == 2 ) && <PurchasePropertyDetails quote={quote} />}   
                                   {(view_data.service_details[0].service_type == 1 ) && <SalesPurchasePropertyDetails quote={quote} />}   
                                   {(view_data.service_details[0].service_type == 4 ) && <RemortagePropertyDetails quote={quote} />}  
                                    </div>

                                    <div className="col-span-2 ">
                                     
                                     
                               <div className=" p-3 ">
                            <h3 className="text-lg text-start text-emerald-600 font-semibold  mb-3" onClick={()=>{
                                        handleprice()
                                      }}>
                              Fee Breakdown
                            </h3>
                          
                            <table className="w-full border-collapse text-black font">
                              <thead>
                                <tr className="border-b border-gray-300 text-left">
                                  <th className="p-2 w-1/2">Type</th>
                                  <th className="p-2 w-1/4 text-right">Fee Amount</th>
                                  <th className="p-2 w-1/4 text-right">VAT</th>
                                </tr>
                              </thead>
                          
                              <tbody>
                                {companydata
                                  .filter((item) => item.quote_id == cardid)
                                  .map((item, index) => (
                                    <React.Fragment key={index}>
                                    
                                      <tr className="border-b border-gray-200" >
                                        <td className="p-2 text-sm font-semibold text-start ">{`Legal Fees`}</td>
                                        <td className="p-2 text-sm text-right ">{formatGBP(item.legal_fees)}</td>
                                        <td className="p-2 text-sm text-right">
                                          {"-"}
                                        </td>
                                      </tr>
                          
                                  
                                     
            {Object.entries(taxDetails || {}).map(([category, items]) => (
              <React.Fragment key={category}>
                {/* Category Row */}
                <tr className="bg-gray-50 border-b border-gray-300">
                  <td className="p-2 font-semibold text-start text-sm" colSpan={3}>
                    {category}
                  </td>
                </tr>

                {items?.map((fee, i) => (
                  <tr key={i} className="border-b border-gray-200 text-start">
                    <td className="p-2 break-words text-sm "> <div className="ml-4"> {/* margin-left works here */}
        {fee.fee_type}
      </div></td>
                    <td className="p-2 text-right text-sm">
                      {formatGBP(fee.fee_amount)}
                    </td>
                    <td className="p-2 text-right text-sm">{formatGBP(fee.vat)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
                          
                                      {/* Country-specific taxes */}
                                      
                          
                                      {/* TOTAL */}
                                      <tr className="bg-gray-100 font-semibold text-gray-800">
                                        <td className="p-2 text-start">Total </td>
                                        <td className="p-2 text-right text-indigo-600">
                                          {formatGBP(item.total)}
                                         
                                        </td>
                                        <td className="p-2 text-right text-indigo-600" > {formatGBP(vattax)}</td>
                                      </tr>
                                      {item.service_type == 2 && (
                                        <>
                                          {item.purchase_country == "England" && (
                                            <tr className="border-b border-gray-200">
                                              <td className="p-2">Stamp Duty</td>
                                              <td className="p-2 text-right">
                                                {formatGBP(item.stamp_duty)}
                                              </td>
                                              <td></td>
                                            </tr>
                                          )}
                          
                                          {item.purchase_country == "Scotland" && (
                                            <tr className="border-b border-gray-200">
                                              <td className="p-2">LLT</td>
                                              <td className="p-2 text-right">{formatGBP(item.llt)}</td>
                                              <td></td>
                                            </tr>
                                          )}
                          
                                          {item.purchase_country == "Wales" && (
                                            <tr className="border-b border-gray-200">
                                              <td className="p-2">LBTT</td>
                                              <td className="p-2 text-right">{formatGBP(item.lbtt)}</td>
                                              <td></td>
                                            </tr>
                                          )}
                                        </>
                                      )}
                                    </React.Fragment>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                       
                                      </div>
                                 
                                    
                                  </div>

                                  {/* ---------- FEES SECTION ---------- */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="">
                                       </div>
                                  {/* <div>
                                    
                                    <div className="mb-1 p-4">
                                      <h3 className="font-bold text-emerald-600 mb-3 ">
                                        Sale Fees
                                      </h3>

                                      
                                        <div className="flex">
                                        <span className=" w-60 text-left">Legal Fee</span>
                                          <span>£{quote?.legal_fees}.00</span>
                                        </div>

                                       <div className="flex">
                                        <span className=" w-60 text-left">VAT</span>
                                          <span>£{quote?.vat}.00</span>
                                        </div>
                                      

                                      <div className="flex">
                                        <span className=" w-60 text-left">Total Fees</span>
                                        <span>
                                          £
                                          {Number(quote?.legal_fees) +
                                            Number(quote?.vat)}
                                          .00
                                        </span>
                                      </div>
                                    </div>

                                    <div className="border-t"></div>

                                    <div className="p-4">
                                      <h3 className="font-bold text-emerald-600 mb-3 ">
                                        Disbursements
                                      </h3>

                                      
                                       <div className="flex">
                                        <span className=" w-60 text-left">Total Disbursements</span>
                                          <span>£{quote?.disbursements}</span>
                                        </div>
                                      

                                      <div className="flex">
                                        <span className=" w-60 text-left">Total Fees & Disbursements</span>
                                        <span>
                                          {formatGBP(quote.total)}.00
                                        </span>
                                      </div>
                                    </div>
                                  </div> */}
                                   </div>
                                   

                                  <div className="border-t  w-full"></div>

                                  {/* ---------- NOTES ---------- */}
                                  <div>
                                    <h4>Notes</h4>
                                    <p className="text-xs mt-4">
                                      {quote?.conveying_details?.short_notes ||
                                        "No notes provided by the firm."}
                                    </p>
                                  </div>
                                </div>
                              </div>
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
          </section>

          {/* Popup Modal for Instruct */}
         
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
