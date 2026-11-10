"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { Check } from "lucide-react";
import { postData } from "../../auth/API/api";
import LocationSearch from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';
import { API_ENDPOINTS } from "../../auth/API/api";
import Surveyorsigninmodal from "../../surveyor/surveyorsigninmodal";
const surveyTypes = [
  { value: "RICS Level 2 - Home Buyer Report", label: "RICS Level 2 - Home Buyer Report" },
  { value: "RICS Level 3 - Building Survey", label: "RICS Level 3 - Building Survey" }
];

const countryOptions = [
  { value: "England", label: "England" },
  { value: "Scotland", label: "Scotland" },
  { value: "Wales", label: "Wales" },
  { value: "Northern Ireland", label: "Northern Ireland" },
];

const countrySelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "12px",
    borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
    "&:hover": {
      borderColor: "#1E5C3B",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#F6CE53" : "white",
    color: "#111",
    cursor: "pointer",
  }),
};

const SURVEYOR_API_URL = API_ENDPOINTS.createsurveyor;
export default function Surveyor() {
  const router = useRouter();
  const surveyorRef = useRef(null);
  const formFieldRefs = useRef({});
  const [showAddressLines, setShowAddressLines] = useState(false);
  const [modalopen, setModalopen] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const partnerloginshow = false;
  const closeModal = () => {
    setModalopen(false);
  };

  const [formData, setFormData] = useState({
    address: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    propertyValue: "",
    surveyType: "",
    specialInstruction: "",

    // NEW
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    valuation: "0",
  });
  const [errors, setErrors] = useState({});

  const handleUnknownPostcode = () => {
    setShowAddressLines(true);
    setFormData({
      address: "",
      address_line1: "",
      address_line2: "",
      city: "",
      country: "",
      propertyValue: "",
      surveyType: "",
      specialInstruction: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      valuation: "",
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getStoredSurveyorRef = () => {
    const fromStorage = localStorage.getItem("ref_no") || localStorage.getItem("quote_ref_number");
    if (fromStorage) return fromStorage;

    try {
      const quoteData = JSON.parse(localStorage.getItem("getquote") || "{}");
      return (
        quoteData?.quote_ref_number ||
        quoteData?.quote_ref_id ||
        quoteData?.ref_no ||
        ""
      );
    } catch (error) {
      return "";
    }
  };

  const handleLoginSuccess = async () => {
    console.log("🔵 handleLoginSuccess called!");
    setModalopen(false);

    if (pendingSubmit) {
      setPendingSubmit(false);
      await submitSurveyorRequest();
      return;
    }

    const quoteRefNumber = getStoredSurveyorRef();
    router.replace(
      quoteRefNumber
        ? `/components/surveyorquotes?ref_no=${encodeURIComponent(quoteRefNumber)}`
        : "/components/surveyorquotes"
    );
  };

  const submitSurveyorRequest = async () => {
    try {
      const payload = {
        address: formData.address || "",
        address_line1: formData.address_line1 || "",
        address_line2: formData.address_line2 || "",
        city: formData.city || "",
        country: formData.country || "",
        property_values: formData.propertyValue
          ? parseInt(formData.propertyValue, 10)
          : 0,
        survey_type: formData.surveyType,
        special_instruction: formData.specialInstruction?.trim() || "",
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone_number: Number(formData.phone_number),
        valuation:
          formData.surveyType === "RICS Level 2 - Home Buyer Report"
            ? Number(formData.valuation)
            : null,
        service_type: 6,
        user_id: Number(localStorage.getItem("user")) || null,
        guest_user: localStorage.getItem("guest_uuid") || null,
      };

      console.log("Sending payload:", payload);
      const response = await postData(SURVEYOR_API_URL, payload);

      console.log("API Response:", response);
      const savedRefNumber =
        response?.newSurveyor?.quote_ref_number ||
        response?.newSurveyor?.id ||
        response?.service?.quote_ref_number ||
        response?.quote_ref_number ||
        response?.data?.quote_ref_number ||
        response?.data?.newSurveyor?.quote_ref_number ||
        response?.data?.newSurveyor?.id ||
        response?.data?.ref_no ||
        response?.data?.ref_number ||
        response?.data?.id ||
        response?.service?.quote_ref_id ||
        response?.quote_ref_id ||
        response?.ref_no ||
        response?.ref_number ||
        response?.id ||
        "";


      if (savedRefNumber) {
        localStorage.setItem("ref_no", savedRefNumber);
        // window.alert("Surveyor quote created successfully.");
      } else {
        console.warn("No ref number available after surveyor create response.");
      }

      const createSucceeded =
        response &&
        response.success !== false &&
        response.status !== false &&
        !response.error;

      if (createSucceeded) {
        setFormData({
          address: "",
          address_line1: "",
          address_line2: "",
          city: "",
          country: "",
          propertyValue: "",
          surveyType: "",
          specialInstruction: "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          valuation: ""
        });
        router.replace(
          savedRefNumber
            ? `/components/surveyorquotes?ref_no=${encodeURIComponent(savedRefNumber)}`
            : "/components/surveyorquotes"
        );
      } else {
        setErrors({ submit: "Failed to save surveyor request. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (showAddressLines && !formData.address_line1.trim()) {
      newErrors.address_line1 = "Address Line 1 is required.";
    }

    if (!formData.propertyValue.trim()) {
      newErrors.propertyValue = "Property value is required.";
    }
    if (!formData.surveyType) {
      newErrors.surveyType = "Please select a survey type.";
    }
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }
    //     if (!formData.first_name.trim()) {
    //   newErrors.first_name = "First name is required.";
    // }

    // if (!formData.last_name.trim()) {
    //   newErrors.last_name = "Last name is required.";
    // }

    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required.";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Invalid email format.";
    // }

    // if (!formData.phone_number.toString().trim()) {
    //   newErrors.phone_number = "Phone number is required.";
    // }

    if (formData.surveyType === "RICS Level 2 - Home Buyer Report" && formData.valuation === "") {
      newErrors.valuation = "Please select whether you require a valuation.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    if (!localStorage.getItem("user")) {
      setPendingSubmit(true);
      setModalopen(true);
      return;
    }

    await submitSurveyorRequest();
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 mt-7">
        {/* Left stepper */}
        <aside className="hidden lg:block z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-1/2 lg:h-[80vh] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white lg:top-22" style={{ height: "88.5%" }}>
          <div className="p-6 h-full flex flex-col justify-around">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="relative mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                  <Check size={18} />
                </div>
                <div className="absolute left-[19px] top-[40px] w-[2px] h-[520%] bg-[#CFE3CF]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1E1E1E]">STEP 1</div>
                <div className="text-lg font-extrabold text-[#1E1E1E]">Property Details</div>
                <div className="text-xs text-[#2D7C57] mt-1">In Progress</div>
              </div>
            </div>

            {/* Step 2 (Current) */}
            <div className="flex items-start mt-6">
              <div className="relative mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#1E5C3B]" />
                </div>
                <div className="absolute left-[19px] top-[40px] w-[2px] h-[480%] bg-gray-200" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1E1E1E]">STEP 2</div>
                <div className="text-lg font-extrabold text-[#1E1E1E]">Personal Details</div>
                <div className="text-xs text-[#A38320] mt-1"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start mt-6">
              <div className="mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#1E5C3B]" />
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1E1E1E]">STEP 3</div>
                <div className="text-lg font-extrabold text-[#1E1E1E]">Compare Quotes</div>
              </div>
            </div>
          </div>
        </aside>
        <section className="flex-1 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8 lg:p-10 lg:ml-83">
          <h1 className="mb-6 text-3xl font-semibold text-gray-900">
            Surveyor Quote
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Address Search */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address
              </label>

              <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">

                {/* INPUT */}
                <div className="w-full min-w-0 sm:w-auto sm:flex-1">
                  <LocationSearch
                    ref={surveyorRef}
                    readOnly={showAddressLines}
                    onSelectAddress={(selected) => {
                      if (!selected) return;

                      const details = surveyorRef.current?.onSelectAddressFullDetails?.();
                      if (!details) {
                        setErrors((prev) => ({
                          ...prev,
                          address: "Failed to fetch full address details.",
                        }));
                        return;
                      }

                      const postcode = details.postcode || "";
                      const address = !postcode || selected.suggestion.includes(postcode)
                        ? selected.suggestion
                        : `${selected.suggestion} ${postcode}`.trim();

                      setFormData((prev) => ({
                        ...prev,
                        address,
                        city: details.post_town || details.admin_district || "",
                        country: details.country || "",
                      }));
                      setErrors((prev) => ({ ...prev, address: "" }));
                    }}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                {/* LINK */}
                <button
                  type="button"
                  onClick={handleUnknownPostcode}
                  className="self-start text-left text-sm text-blue-600 underline sm:whitespace-nowrap"
                >
                  I don&apos;t know the postcode yet
                </button>

              </div>
            </div>

            {/* Address Fields Grid */}
            {/* Address Fields */}
            {showAddressLines && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="surveyor-address-line1" className="mb-1 block text-sm font-medium text-gray-700">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="surveyor-address-line1"
                    type="text"
                    placeholder="Address Line 1"
                    value={formData.address_line1}
                    onChange={(e) => handleChange("address_line1", e.target.value)}
                    aria-describedby={errors.address_line1 ? "surveyor-address-line1-error" : undefined}
                    className="block h-[44px] w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-900 outline-none hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B]"
                  />
                  {errors.address_line1 && (
                    <p id="surveyor-address-line1-error" className="mt-1 text-sm text-red-500">
                      {errors.address_line1}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="surveyor-address-line2" className="mb-1 block text-sm font-medium text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    id="surveyor-address-line2"
                    type="text"
                    placeholder="Address Line 2"
                    value={formData.address_line2}
                    onChange={(e) => handleChange("address_line2", e.target.value)}
                    className="block h-[44px] w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-900 outline-none hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B]"
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town / City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-gray-900 hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <Select
                  options={countryOptions}
                  styles={countrySelectStyles}
                  value={countryOptions.find((option) => option.value === formData.country) || null}
                  onChange={(selected) => handleChange("country", selected?.value || "")}
                  isSearchable={false}
                  placeholder="Select country"
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                )}
              </div>
            </div>
            {/* Property + Survey Type */}
            {/* Property + Survey Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property value <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.propertyValue}
                  onChange={(e) =>
                    handleChange("propertyValue", e.target.value)
                  }
                  placeholder="Enter property value"
                  className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-gray-900 hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B] outline-none"
                />
                {errors.propertyValue && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.propertyValue}
                  </p>
                )}
              </div>

              {/* Survey Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey type <span className="text-red-500">*</span>
                </label>

                <Select
                  options={surveyTypes}
                  styles={countrySelectStyles}
                  value={surveyTypes.find((option) => option.value === formData.surveyType) || null}
                  onChange={(selected) => handleChange("surveyType", selected?.value || "")}
                  isSearchable={false}
                  placeholder="Choose a survey type"
                />
                {errors.surveyType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.surveyType}
                  </p>
                )}
              </div>

            </div>
            {formData.surveyType === "RICS Level 2 - Home Buyer Report" && (
              <div className="flex flex-col h-full mt-4">

                {/* LABEL */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you require a Valuation in addition to Survey? <span className="text-red-500">*</span>
                </label>

                {/* TOGGLE */}
                <div className="grid grid-cols-2 gap-3">

                  {/* YES */}
                  <button
                    type="button"
                    onClick={() => handleChange("valuation", 1)}
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center shadow-sm
          ${formData.valuation === 1
                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    Yes
                  </button>

                  {/* NO */}
                  <button
                    type="button"
                    onClick={() => handleChange("valuation", 0)}
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center shadow-sm
          ${formData.valuation === 0
                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    No
                  </button>

                </div>

                {/* ERROR SPACE (optional like your design) */}
                <p className="text-[12px] mt-1 min-h-[16px] text-red-500">
                  {errors.valuation}
                </p>

              </div>
            )}

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
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm resize-none text-gray-900"
              />

            </div>
            {/* <h1 className="mb-6 text-3xl font-semibold text-gray-900">
    Personal Details
  </h1>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div>
  <input
    type="text"
    placeholder="First Name"
    value={formData.first_name || ""}
    onChange={(e) => handleChange("first_name", e.target.value)}
    className={`w-full rounded-2xl border px-4 py-3 text-sm
      ${errors.first_name ? "border-red-500" : "border-gray-300"}`}
  />
  {errors.first_name && (
    <p className="text-red-500 text-xs mt-1">
      {errors.first_name}
    </p>
  )}
</div>

<div>
  <input
    type="text"
    placeholder="Last Name"
    value={formData.last_name || ""}
    onChange={(e) => handleChange("last_name", e.target.value)}
    className={`w-full rounded-2xl border px-4 py-3 text-sm
      ${errors.last_name ? "border-red-500" : "border-gray-300"}`}
  />
  {errors.last_name && (
    <p className="text-red-500 text-xs mt-1">
      {errors.last_name}
    </p>
  )}
</div>

<div>
  <input
    type="email"
    placeholder="Email"
    value={formData.email || ""}
    onChange={(e) => handleChange("email", e.target.value)}
    className={`w-full rounded-2xl border px-4 py-3 text-sm
      ${errors.email ? "border-red-500" : "border-gray-300"}`}
  />
  {errors.email && (
    <p className="text-red-500 text-xs mt-1">
      {errors.email}
    </p>
  )}
</div>

 <div>
  <input
    type="tel"
    placeholder="Phone Number"
    value={formData.phone_number || ""}
    onChange={(e) => handleChange("phone_number", e.target.value)}
    className={`w-full rounded-2xl border px-4 py-3 text-sm
      ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
  />
  {errors.phone_number && (
    <p className="text-red-500 text-xs mt-1">
      {errors.phone_number}
    </p>
  )}
</div>
</div> */}
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
                className="h-12 rounded-full bg-[#1E5C3B] px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#16472F]"
              >
                Continue
              </button>
            </div>

          </form>
        </section>
      </div>


      {modalopen && (
        <Surveyorsigninmodal
          closeModal={closeModal}
          partnerloginshow={partnerloginshow}
          onLoginSuccess={handleLoginSuccess}
          isSurveyorFlow={true}
        />
      )}

    </>
  );


}
