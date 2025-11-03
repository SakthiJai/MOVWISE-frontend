"use client";
import React, { useState } from "react";
import { Check, X, MapPin, Home, Building2, House, Warehouse, ChevronDown } from "lucide-react";

export default function App() {
  // State for form controls
  const [scheme, setScheme] = useState("no");
  const [mortgage, setMortgage] = useState("yes");
  const [newBuild, setNewBuild] = useState("no");
  const [sharedOwnership, setSharedOwnership] = useState("no");
  const [propertyType, setPropertyType] = useState("Flat"); // State for property type

  // Options for Property Type
  const propertyTypeOptions = [
    { label: "Flat", icon: <Building2 size={18} /> },
    { label: "Terraced", icon: <Home size={18} /> },
    { label: "Semi-detached", icon: <House size={18} /> },
    { label: "Detached", icon: <Warehouse size={18} /> },
  ];

  // Mock navigation functions (replacing useRouter and Link)
  const handleBack = (e) => {
    e.preventDefault();
    console.log("Navigation: Going back...");
    // In a real environment, this would be: router.back();
  };

  const handleContinue = (e) => {
    e.preventDefault();
    console.log("Navigation: Continuing to compare quotes...");
    // In a real environment, this would be: router.push("/components/comparequotes");
  };

  return (
    <div className="min-h-screen bg-gray-50 antialiased font-sans">
      
      {/* --- START: Simplified Navbar Header --- */}
      <div className='bg-white shadow-lg sticky top-0 p-4 z-50'>
        <header className="max-w-7xl mx-auto flex justify-between items-center h-12">
            <div className="text-2xl font-extrabold text-[#1E5C3B]">ConveyFlow</div>
            <div className="flex items-center space-x-4">
                <button className="text-sm font-medium text-gray-600 hover:text-[#1E5C3B] transition">Help</button>
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-semibold">JD</div>
            </div>
        </header>
      </div>
      {/* --- END: Simplified Navbar Header --- */}

      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Stepper / Progress Bar */}
          <aside className="bg-white p-6 shadow-xl rounded-2xl border border-gray-100 h-full lg:min-h-[600px] lg:w-[320px] w-full lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-3">Application Progress</h3>
            
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="relative mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center shadow-lg">
                  <Check size={18} />
                </div>
                <div className="absolute left-[19px] top-[40px] w-[2px] h-[50px] bg-[#CFE3CF]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">STEP 1</div>
                <div className="text-lg font-extrabold text-[#1E1E1E]">Personal Details</div>
                <div className="text-xs text-[#2D7C57] mt-1 font-medium">Completed</div>
              </div>
            </div>

            {/* Step 2 (Current) */}
            <div className="flex items-start mt-6">
              <div className="relative mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-[#1E5C3B]" />
                </div>
                <div className="absolute left-[19px] top-[40px] w-[2px] h-[50px] bg-gray-200" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">STEP 2</div>
                <div className="text-lg font-extrabold text-[#1E1E1E]">Property Details</div>
                <div className="text-xs text-[#A38320] mt-1 font-medium">In Progress</div>
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
                <div className="text-xs font-semibold text-gray-500">STEP 3</div>
                <div className="text-lg font-bold text-[#1E1E1E]">Compare Quotes</div>
              </div>
            </div>
          </aside>

          {/* Right Form Content */}
          <section className="flex-1 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8 lg:p-10">
            <nav
              className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2"
              aria-label="Breadcrumb"
            >
              {/* Refactored Link to simple <a> tag */}
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#1E5C3B]">Home</a>
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
              {/* 🏡 PURCHASE DETAILS */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">🏡</span> PURCHASE DETAILS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

                  {/* 2. Agreed Purchase Price (Inline Input with Prefix) */}
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
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Bedrooms:
                    </label>
                    <div className="relative mt-auto">
                        <select id="bedrooms" defaultValue="1" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["1", "2", "3", "4", "5", "above-5"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>
              
                  {/* 4. Leasehold or Freehold (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-1">
                      Leasehold or Freehold?
                    </label>
                    <div className="relative mt-auto">
                        <select id="tenure" defaultValue="Freehold" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["Leasehold", "Freehold"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 5. New build? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New build?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setNewBuild("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          newBuild === "yes"
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewBuild("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          newBuild === "no"
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                
                </div> {/* End grid-cols-2 */}

                {/* Property Type buttons */}
                <div className="w-full pt-4">
                  <label className="block text-sm text-gray-800 font-semibold mb-3">
                    Property Type:
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {propertyTypeOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setPropertyType(opt.label)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm
                          ${propertyType === opt.label 
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        <span className={`${propertyType === opt.label ? "text-[#1E5C3B]" : "text-gray-700"} text-[18px]`}>{opt.icon}</span>
                        <span className="text-sm font-semibold">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div> {/* End PURCHASE DETAILS */}

              {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
                  
                  {/* 12. Prefer solicitor in your first language? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="language_pref" className="block text-sm font-medium text-gray-700 mb-1">
                      Prefer solicitor in your first language?
                    </label>
                    <div className="relative mt-auto">
                        <select id="language_pref" defaultValue="No Preference" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["No Preference", "Yes", "Maybe"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 13. Special instructions (Inline Textarea) */}
                  <div className="md:col-span-2">
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Special instructions (Optional)
                    </label>
                    <textarea
                      id="instructions"
                      defaultValue=""
                      rows={4}
                      className="block w-full rounded-xl border border-gray-300 p-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                    />
                  </div>

                </div>
              </div> {/* End SPECIAL INSTRUCTIONS */}

            </form>

            <div className="mt-12 flex justify-end gap-4">
              <button
                onClick={handleBack}
                className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
              >
                Back
              </button>
              {/* Refactored Link to simple <a> tag */}
              <a
                href="#"
                onClick={handleContinue}
                className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
              >
                Continue &rarr;
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
