"use client";
import React, { useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon


const Link = ({ href, children, className }) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

const useRouter = () => ({
  back: () => console.log("Navigation: Going back..."),
});

export default function App() {

  
    
      const [tenure, setTenure] = useState("");

     const tenureOptions = ["Leasehold", "Freehold"];

     const [bedrooms, setBedrooms] = useState("");

     const options = ["1", "2", "3", "4", "5+"];

     const [propertyType, setPropertyType] = useState("");
        const propertyTypeOptions = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
                  ];
        

            const [formData, setFormData] = useState({
            sharedOwnership: "",
            existingMortgage: "",
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
        
        const router = useRouter();

        // Initial state for the toggle buttons
        const [scheme, setScheme] = useState("");
        const [mortgage, setMortgage] = useState("");
        const [newBuild, setNewBuild] = useState("");
        const [sharedOwnership, setSharedOwnership] = useState("");

        return (
            <div className="min-h-screen bg-white antialiased font-inter font-outfit">
            <Navbar />

            <main className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                {/* Left stepper */}
                <aside className="bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-full lg:min-h-[600px] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white  lg:sticky lg:top-8">
                    <div className="p-6">
                    {/* Step 1 */}
                    <div className="flex items-start">
                        <div className="relative mr-4">
                        <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                            <Check size={18} />
                        </div>
                        <div className="absolute left-[19px] top-[40px] w-[2px] h-[50px] bg-[#CFE3CF]" />
                        </div>
                        <div>
                        <div className="text-xs font-semibold text-[#1E1E1E]">STEP 1</div>
                        <div className="text-lg font-extrabold text-[#1E1E1E]">Personal Details</div>
                        <div className="text-xs text-[#2D7C57] mt-1">Completed</div>
                        </div>
                    </div>

                    {/* Step 2 (Current) */}
                    <div className="flex items-start mt-6">
                        <div className="relative mr-4">
                        <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[#1E5C3B]" />
                        </div>
                        <div className="absolute left-[19px] top-[40px] w-[2px] h-[50px] bg-gray-200" />
                        </div>
                        <div>
                        <div className="text-xs font-semibold text-[#1E1E1E]">STEP 2</div>
                        <div className="text-lg font-extrabold text-[#1E1E1E]">Property Details</div>
                        <div className="text-xs text-[#A38320] mt-1">In Progress</div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start mt-6">
                        <div className="mr-4">
                        <div className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                        </div>
                        </div>
                        <div>
                        <div className="text-xs font-semibold text-[#1E1E1E]">STEP 3</div>
                        <div className="text-lg font-bold text-[#1E1E1E]">Compare Quotes</div>
                        </div>
                    </div>
                    </div>
                </aside>

                {/* Right Form */}
                <section className="flex-1 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8 lg:p-10">
                    <nav
                    className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2"
                    aria-label="Breadcrumb"
                    >
                    <Link href="/" className="hover:text-[#1E5C3B]">Home</Link>
                    <span>/</span>
                    <span>Personal Details</span>
                    <span>/</span>
                    <span className="text-[#1E5C3B] font-medium">Property Details</span>
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900">
                    Share your Property Details
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                    We need a few details about the property to get you the most accurate quotes.
                    </p>

                    <form className="mt-8 space-y-10">
                    {/* 🏡 SALES DETAILS */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🏡</span> SALES DETAILS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    What stage are you at?
                                </label>
                                <select id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                    {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                    <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>


                        {/* 1. Property Address (Inline Input) */}
                        <div className="flex flex-col h-full">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Property address:
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <MapPin size={16} />
                            </span>
                            <input
                                id="address"
                                type="text"
                                defaultValue="24 Arab Street, Singapore"
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                            />
                            </div>
                        </div>

                        {/* 2. Agreed SALES Price (Inline Input with Prefix) */}
                        <div className="flex flex-col h-full">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Agreed Sales price:
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                £
                            </span>
                            <input
                                id="price"
                                type="number"
                                defaultValue="250000"
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                            />
                            </div>
                        </div>

                        {/* 3. Number of Bedrooms (Inline Select) */}
                        <div className="flex flex-col h-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Bedrooms:
                            </label>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
                                {options.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setBedrooms(opt)}
                                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
                                    ${
                                        bedrooms === opt
                                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span>{opt}</span>
                                </button>
                                ))}
                            </div>
                            </div>
                    
                        {/* 4. Leasehold or Freehold (Inline Select) */}
                        <div className="flex flex-col gap-6">
                            {/* Leasehold / Freehold Section */}
                            <div className="flex flex-col h-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Leasehold or Freehold?
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                {tenureOptions.map((opt) => (
                                    <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setTenure(opt)}
                                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                        tenure === opt
                                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                    >
                                    {opt}
                                    </button>
                                ))}
                                </div>
                                </div>
                            </div>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Type:
                            </label>

                            <div className="flex flex-wrap gap-4">
                            {propertyTypeOptions.map((opt) => (
                                <button
                                key={opt.label}
                                type="button"
                                onClick={() => setPropertyType(opt.label)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
                                    ${
                                    propertyType === opt.label
                                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                <span
                                    className={`${
                                    propertyType === opt.label ? "text-[#1E5C3B]" : "text-gray-700"
                                    } text-[18px]`}
                                >
                                    {opt.icon}
                                </span>
                                <span className="text-sm font-semibold">{opt.label}</span>
                                </button>
                            ))}
                            </div>

                        
                        
                        </div>

                    {/* 💰 SALES FINANCE */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">💰</span> SALES FINANCE
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div >
                        <label
                        htmlFor="sharedOwnership"
                        className="block text-[14px] text-[#6A7682] font-medium mb-2"
                        >
                        Shared Ownership
                        </label>
                        <select id="sharedOwnership" name="sharedOwnership"  value={formData.sharedOwnership || ""} onChange={handleChange} className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"> 
                            {["Please select","Yes (housing association)","Yes (Help To Buy)","No",
                            ].map((option) => (
                                <option key={option} value={option}> {option} </option> ))}
                        </select>

                    </div>
                      {/* Existing Mortgage */}
                    <div className="flex flex-col h-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Existing mortgage to redeem?
                            </label>
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button
                                type="button"
                                onClick={() => setScheme("yes")}
                                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                scheme === "yes"
                                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>Yes</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setScheme("no")}
                                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                scheme === "no"
                                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>No</span>
                            </button>
                            </div>
                        </div>
                        </div>
 {/* 🏡 PURCHASE DETAILS */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🏡</span> PURCHASE DETAILS
                          </h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="">
                               <label className="block text-sm font-medium text-gray-700 mb-1">
                                 What stage are you at?
                                </label>
                                 <select id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>               
                                  {/* 1. Property Address (Inline Input) */}
                                <div className="flex flex-col h-full">
                                 <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Property address:
                                </label>
                                <div className="relative mt-auto">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <MapPin size={16} />
                                    </span>
                                    <input
                                        id="address"
                                        type="text"
                                        defaultValue="24 Arab Street, Singapore"
                                        className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                                    />
                                </div>
                                </div>
                    
                                 {/* 2. Agreed purchase Price (Inline Input with Prefix) */}
                                 <div className="flex flex-col h-full">
                                   <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Agreed purchase price:
                                   </label>
                                    <div className="relative mt-auto">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                     £
                                    </span>
                                       <input
                                          id="price"
                                          type="number"
                                          defaultValue="250000"
                                          className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                                        />
                                      </div>
                                    </div>
                    
                                   {/* 3. Number of Bedrooms (Inline Select) */}
                                      <div className="flex flex-col h-full">
                                       <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Bedrooms:
                                         </label>
                                         <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
                                            {options.map((opt) => (
                                          <button
                                               key={opt}
                                               type="button"
                                               onClick={() => setBedrooms(opt)}
                                               className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
                                          ${
                                              bedrooms === opt
                                              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                          }`}
                                            >
                                          <span>{opt}</span>
                                       </button>
                                      ))}
                                   </div>
                                  </div>
                    
                    {/* 4. Leasehold or Freehold (Inline Select) */}
                          <div className="flex flex-col gap-6">
                                {/* Leasehold / Freehold Section */}
                                   <div className="flex flex-col h-full">
                                     <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Leasehold or Freehold?
                                     </label>
                                     <div className="grid grid-cols-2 gap-3 mt-auto">
                                       {tenureOptions.map((opt) => (
                                      <button
                                         key={opt}
                                        type="button"
                                        onClick={() => setTenure(opt)}
                                       className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                         tenure === opt
                                      ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                   }`}
                                  >
                                 {opt}
                              </button>
                             ))}
                          </div>
                         </div>
                         </div>

                       <div >
                    <div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        New build?
      </label>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        {/* YES button */}
        <button
          type="button"
          onClick={() => setNewBuild("yes")}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            newBuild === "yes"
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Yes
        </button>

        {/* NO button */}
        <button
          type="button"
          onClick={() => setNewBuild("no")}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            newBuild === "no"
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          No
        </button>
      </div></div>
      </div>
      </div>
    
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type:
                </label>
               <div className="flex flex-wrap gap-4">
             {propertyTypeOptions.map((opt) => (
                <button
                    key={opt.label}
                    type="button"
                    onClick={() => setPropertyType(opt.label)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
                    ${
                        propertyType === opt.label
                       ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                       : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
              <span
                className={`${
                propertyType === opt.label ? "text-[#1E5C3B]" : "text-gray-700"
                } text-[18px]`}
              >
              {opt.icon}
               </span>
           <span className="text-sm font-semibold">{opt.label}</span>
          </button>
        ))}
         </div>
         </div></div>
                
                    {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                  {/* 6. Buy to Let? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="b2l" className="block text-sm font-medium text-gray-700 mb-1">
                      Buy to Let?
                    </label>
                    <div className="relative mt-auto">
                        <select id="b2l" defaultValue="No" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["No", "Yes - Personal name", "Yes - Company name"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 7. Government Right to Buy scheme? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Using Government Right to Buy scheme?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setScheme("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          scheme === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheme("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          scheme === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>

                  {/* 8. Obtaining a mortgage? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obtaining a mortgage?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setMortgage("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          mortgage === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMortgage("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          mortgage === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>

                  {/* 9. Mortgage Lender (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
                      Mortgage Lender (If Known)
                    </label>
                    <div className="relative mt-auto">
                        <select id="lender" defaultValue="Not Known" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["Not Known", "Not required", "Lender Name", "Look up"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 10. Receiving a gifted deposit? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="gifted_deposit" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiving a gifted deposit?
                    </label>
                    <div className="relative mt-auto">
                        <select id="gifted_deposit" defaultValue="None" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["None", "1 Gifted deposit", "2 Gifted deposit", "3 Gifted deposit"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 11. Shared Ownership? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shared Ownership via housing association?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setSharedOwnership("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          sharedOwnership === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSharedOwnership("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          sharedOwnership === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div> {/* End PURCHASE FINANCE */}

                    {/* 🌐 SPECIAL INSTRUCTIONS */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🌐</span> SPECIAL INSTRUCTIONS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Prefer solicitor in your first language?"
                            options={[ "Please select","No Preference", "Yes", "Maybe"]}
                        />
                        <Textarea label="Special instructions (Optional)" />
                        </div>
                    </div>
                    </form>

                    <div className="mt-12 flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
                    >
                        Back
                    </button>
                    <Link
                        href="/components/comparequotes"
                        className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
                    >
                        Continue &rarr;
                    </Link>
                    </div>
                </section>
                </div>
            </main>
            </div>
        );
        }

        /* 🔧 Reusable Form Components */
        const Input = ({ label, defaultValue, readOnly, prefix, icon, type = "text" }) => (
        // ADDED: flex flex-col h-full to make the container fill the grid cell vertically
        <div className="flex flex-col h-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            </label>
            {/* ADDED: mt-auto to push the input field to the bottom of the container */}
            <div className="relative mt-auto">
            {(prefix || icon) && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {prefix || icon}
                </span>
            )}
            <input
                type={type}
                defaultValue={defaultValue}
                readOnly={readOnly}
                className={`block w-full h-[44px] rounded-xl border border-gray-300 ${
                prefix || icon ? "pl-10" : "pl-4"
                } pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors`}
            />
            </div>
        </div>
        );

        const Select = ({ label, options }) => (
        // ADDED: flex flex-col h-full to make the container fill the grid cell vertically
        <div className="flex flex-col h-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            </label>
            {/* ADDED: mt-auto to push the select field to the bottom of the container */}
            <select className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10 mt-auto">
            {options.map((opt) => (
                <option key={opt}>{opt}</option>
            ))}
            </select>
        </div>
        );

        const Textarea = ({ label, defaultValue = "" }) => (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            </label>
            <textarea
            defaultValue={defaultValue}
            rows={4}
            className="block w-full rounded-xl border border-gray-300 p-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
            />
        </div>
        );

        /* 🚀 REVISED ButtonGroup Component for subtle, modern selection */
        const ButtonGroup = ({ label, selected, setSelected }) => (
        // ADDED: flex flex-col h-full to make the container fill the grid cell vertically
        <div className="flex flex-col h-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            </label>
            {/* ADDED: mt-auto to push the button group container to the bottom of the cell */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
            {/* Option: YES */}
            <button
                type="button"
                onClick={() => setSelected("yes")}
                // Set height to 44px to match inputs, subtle shadow for depth
                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                selected === "yes"
                    // Selected: Light cool tint and primary brand color border
                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-[#1E5C3B]"
                    // Unselected: White background, gray border
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span>Yes</span>
            </button>

            {/* Option: NO */}
            <button
                type="button"
                onClick={() => setSelected("no")}
                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                selected === "no"
                    // Selected: Light cool tint and primary brand color border (Consistent style for both choices)
                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-[#1E5C3B]"
                    // Unselected: White background, gray border
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
                <span>No</span>
            </button>
            </div>
        </div>
);