"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { postData } from "../../auth/API/api";
import LocationSearch from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';
import { getData,API_ENDPOINTS  } from "../../auth/API/api";
const surveyTypes = [
  { value: "homebuyer_report", label: "Homebuyer Report" },
  { value: "building_survey", label: "Building Survey" }
];

const SURVEYOR_API_URL = API_ENDPOINTS.createsurveyor;
export default function Surveyor() {
  const router = useRouter();
  const surveyorRef = useRef(null);
  const formFieldRefs = useRef({});
  const [showAddressLines, setShowAddressLines] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    propertyValue: "",
    surveyType: "",
    specialInstruction: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUnknownPostcode = () => {
    setShowAddressLines(true);
    setFormData(prev => ({
      ...prev,
      address: "",
      selectedId: "",
      address_line1: "",
      address_line2: "",
      city: "",
      country: "",
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    
    // Address validation - check based on whether manual address is being used
    // if (showAddressLines) {
    //   if (!formData.address_line1 || !formData.address_line1.trim()) {
    //     newErrors.address_line1 = "Address line 1 is required.";
    //   }
    // } else {
    //   if (!formData.address || !formData.address.trim()) {
    //     newErrors.address = "Address is required.";
    //   }
    // }

    if (!formData.propertyValue.trim()) {
      newErrors.propertyValue = "Property value is required.";
    }
    if (!formData.surveyType) {
      newErrors.surveyType = "Please select a survey type.";
    }
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Build the full address
    //   const fullAddress = showAddressLines 
    //     ? `${formData.address_line1}${formData.address_line2 ? ', ' + formData.address_line2 : ''}, ${formData.city}, ${formData.country}`
    //     : formData.address;

      const payload = {
  address: formData.address || "",
  address_line1: formData.address_line1 || "",
  address_line2: formData.address_line2 || "",
  country: formData.country || "",
property_values: formData.propertyValue
  ? parseInt(formData.propertyValue, 10)
  : 0,
  survey_type: formData.surveyType,
  special_instruction: formData.specialInstruction?.trim() || "",
};

      console.log("Sending payload:", payload);
      const response = await postData(SURVEYOR_API_URL, payload);

      console.log("API Response:", response);

      if (response && (response.success || response.message)) {
        setShowSuccess(true);
        setFormData({
          address: "",
          address_line1: "",
          address_line2: "",
          city: "",
          country: "",
          propertyValue: "",
          surveyType: "",
          specialInstruction: "",
        });
      } else {
        setErrors({ submit: "Failed to save surveyor request. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
   <div className="mt-8 mx-auto max-w-4xl rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
  <h1 className="mb-6 text-3xl font-semibold text-gray-900">
    Surveyor Quote
  </h1>

 <form onSubmit={handleSubmit} className="space-y-6">

    {/* Address Search */}
<div className="w-full">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Property address
  </label>

  <div className="flex items-center gap-2 w-full">

    {/* INPUT */}
    <div className="flex-1 min-w-0">
      <LocationSearch />
    </div>

    {/* LINK */}
    <button
      type="button"
      onClick={handleUnknownPostcode}
      className="text-blue-600 underline text-sm whitespace-nowrap flex-shrink-0"
    >
      I don&apos;t know the postcode yet
    </button>

  </div>
</div>

    {/* Address Fields Grid */}
    {/* Address Fields */}
{showAddressLines && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Address Line 1"
      value={formData.address_line1}
      onChange={(e) => handleChange("address_line1", e.target.value)}
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
    />

    <input
      type="text"
      placeholder="Address Line 2"
      value={formData.address_line2}
      onChange={(e) => handleChange("address_line2", e.target.value)}
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
    />

   
  </div>
)}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <input
      type="text"
      placeholder="City"
      value={formData.city}
      onChange={(e) => handleChange("city", e.target.value)}
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
    />

   <select
  value={formData.country}
  onChange={(e) => handleChange("country", e.target.value)}
  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
>
  <option value="">Select Country</option>
  <option value="England">England</option>
  <option value="Scotland">Scotland</option>
  <option value="Wales">Wales</option>
  <option value="Northern Ireland">Northern Ireland</option>
</select>
</div>
    {/* Property + Survey Type */}
  {/* Property + Survey Type */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Property Value */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Property value
    </label>
    <input
      type="number"
      min="0"
      value={formData.propertyValue}
      onChange={(e) =>
        handleChange("propertyValue", e.target.value)
      }
      placeholder="Enter property value"
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
    />
  </div>

  {/* Survey Type */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Survey type
    </label>
    <select
      value={formData.surveyType}
      onChange={(e) =>
        handleChange("surveyType", e.target.value)
      }
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm"
    >
      <option value="">Choose a survey type</option>

      {surveyTypes.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  </div>

</div>

{/* Special Instructions (FULL WIDTH + TEXTAREA) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Special instructions
  </label>

  <textarea
    value={formData.specialInstruction}
    onChange={(e) =>
      handleChange("specialInstruction", e.target.value)
    }
    placeholder="Enter instructions"
    rows={4}
    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm resize-none"
  />
</div>

    {/* Buttons */}
    <div className="flex justify-between">
   <button
  type="button"
  onClick={() => router.back()}
  className="h-12 rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-800"
>
  Back
</button>

      <button
        type="submit"
        className="h-12 rounded-full bg-[#1E5C3B] px-6 text-sm font-semibold text-white"
      >
        Continue
      </button>
    </div>

  </form>
</div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Success!</h2>
              <p className="text-gray-600 mb-6">Your surveyor request has been saved successfully 🎉</p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  router.back();
                }}
                className="w-full rounded-full bg-[#1E5C3B] px-6 py-3 font-semibold text-white transition hover:bg-[#16472F]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );


}

