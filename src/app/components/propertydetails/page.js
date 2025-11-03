"use client";
import React, { useState } from "react";
import { Check, X, MapPin } from "lucide-react";
import Navbar from "../../parts/navbar/page";

// --- START: Stubbed/Placeholder Components & Hooks for single-file environment ---
// Placeholder for external component


// Placeholder for next/navigation/Link
const Link = ({ href, children, className }) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

// Placeholder for next/navigation/useRouter
const useRouter = () => ({
  back: () => console.log("Navigation: Going back..."),
});
// --- END: Stubbed/Placeholder Components & Hooks ---

export default function App() {
  const router = useRouter();

  // Initial state for the toggle buttons
  const [scheme, setScheme] = useState("no");
  const [mortgage, setMortgage] = useState("yes");
  const [newBuild, setNewBuild] = useState("no");
  const [sharedOwnership, setSharedOwnership] = useState("no");

  return (
    <div className="min-h-screen bg-white antialiased font-inter">
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
              {/* 🏡 PURCHASE DETAILS */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">🏡</span> PURCHASE DETAILS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Input
                    label="Property address:"
                    defaultValue="24 Arab Street, Singapore"
                    icon={<MapPin size={16} />}
                  />
                  <Input
                    label="Agreed purchase price:"
                    defaultValue="987,654"
                    prefix="£"
                  />
                  <Input
                    label="Number of Bedrooms:"
                    defaultValue="2"
                    type="number"
                  />
                  <Select
                    label="Property type:"
                    options={["Flat", "Terraced", "Semi-detached", "Detached"]}
                  />
                  <Input
                    label="Leasehold or freehold?"
                    defaultValue="Freehold"
                    readOnly
                  />
                  <ButtonGroup
                    label="New build?"
                    selected={newBuild}
                    setSelected={setNewBuild}
                  />
                </div>
              </div>

              {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Select
                    label="Buy to Let?"
                    options={["No", "Yes - Personal name", "Yes - Company name"]}
                  />
                  <ButtonGroup
                    label="Using Government Right to Buy scheme?"
                    selected={scheme}
                    setSelected={setScheme}
                  />
                  <ButtonGroup
                    label="Obtaining a mortgage?"
                    selected={mortgage}
                    setSelected={setMortgage}
                  />
                  <Select
                    label="Mortgage Lender (If Known)"
                    options={["Not Known", "Not required", "Lender Name", "Look up"]}
                  />
                  <Select
                    label="Receiving a gifted deposit?"
                    options={["None", "1 Gifted deposit", "2 Gifted deposit", "3 Gifted deposit"]}
                  />
                  <ButtonGroup
                    label="Shared Ownership via housing association?"
                    selected={sharedOwnership}
                    setSelected={setSharedOwnership}
                  />
                </div>
              </div>

              {/* 🌐 SPECIAL INSTRUCTIONS */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">🌐</span> SPECIAL INSTRUCTIONS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Prefer solicitor in your first language?"
                    options={["No Preference", "Yes", "Maybe"]}
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
            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
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
            ? "border-[#1E5C3B] bg-[#EEF4F2] text-[#1E5C3B]"
            // Unselected: White background, gray border
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <span>No</span>
      </button>
    </div>
  </div>
);