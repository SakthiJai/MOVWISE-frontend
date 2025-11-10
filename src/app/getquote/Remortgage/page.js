"use client";
import React, { useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import NextLink from 'next/link';
import { API_BASE_URL } from "../../constants/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Select from "react-select";
import Footer from "../../parts/Footer/footer";
// import Select from "react-select";






export default function App() {

    const [selectedLenders, setSelectedLenders] = useState([]);
    const [loginformshow,setloginformshow]=useState(false)
    const lenders = [
  { id: 1, lenders_name: "Lender A" },
  { id: 2, lenders_name: "Lender B" },
  { id: 3, lenders_name: "Lender C" },
  { id: 4, lenders_name: "Lender D" },
  { id: 5, lenders_name: "Lender E" },
  { id: 6, lenders_name: "Lender F" },
  { id: 7, lenders_name: "Lender G" },
  { id: 8, lenders_name: "Lender H" },
  { id: 9, lenders_name: "Lender I" },
  { id: 10, lenders_name: "Lender J" },
];

  // Convert lenders into react-select format
  const options_l = lenders.map((lender) => ({
    value: lender.id,
    label: lender.lenders_name,
  }));

  const handleChange_l = (selectedOptions) => {
    setSelectedLenders(selectedOptions);
    const ids = selectedOptions.map(item => item.value);
    console.log("Selected lenders:", ids);
    handleChange("lender",ids)
  };


  const [formData, setFormData] = useState({
   
  
  "address":  "",
  "property_value": 0,
  "no_of_bedrooms": "",
  "property_type": "",
  "leasehold_or_free": "",
  "buy_to_let": "",
  "mortgage_lender": "not required",
  "ownership_housing_asso": 1,
  "languages": [],
  "specal_instruction": "",
  "user_id":[],
  "lender":[],
        
  });

  const [loginformdata, setloginformdata] = useState({
  email: "",
  password: "",
});

function handleloginformchange(name, value) {
  setloginformdata((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    let newErrors = {};

 
  
  if(!formData.languages){
    newErrors.languages="please select a language"
  }

     
      if (!formData.address.trim()) {
        newErrors.address = "Property address is required";
      } else if (formData.address.trim().length < 5) {
        newErrors.address = "Address must be at least 5 characters";
      }
    
      
      if (!formData.property_value) {
        newErrors.property_value = "property_value  is required";
      } else if (Number(formData.property_value) <= 0) {
        newErrors.property_value = "property_value must be a positive number";
      }

 if(!formData.no_of_bedrooms){
  newErrors.no_of_bedrooms="please select a no. of bedrooms"
 }
  if(!formData.property_type){
  newErrors.property_type="please select a property_type"
 }
   if(!formData.leasehold_or_free){
  newErrors.leasehold_or_free="please select a leasehold_or_free"
 }

if(!formData.buy_to_let){
  newErrors.buy_to_let="please select buy_to_let"
}
    setErrors(newErrors);
    console.log(errors)

    // if no errors, submit
    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form submitted:", formData);
      alert("Form submitted successfully!");
          setModalopen(true)

    }

  };

   

    const [modalopen, setModalopen] = useState(false);
      const [languagepreference, setlanguagepreference] = useState(" ");
      const [language, setLanguage] = useState([]);
            const lang=[
  { id: 1, language_name: "English" },
  { id: 2, language_name: "Spanish" },
  { id: 3, language_name: "French" },
  { id: 4, language_name: "German" },
  { id: 5, language_name: "Chinese" },
  { id: 6, language_name: "Hindi" },
  { id: 7, language_name: "Arabic" },
  { id: 8, language_name: "Portuguese" },
  { id: 9, language_name: "Russian" },
  { id: 10, language_name: "Japanese" },
];

      function   handlelanguagechange(e){
      console.log(e.target.value);
          setlanguagepreference(e.target.value);
          setLanguage([]); 
       }

       function languagecheckboxchange(item,checked,id){
    if(checked){
setLanguage(prev => [...prev, item]);
handleChange("languages",[...formData.languages, id])
console.log(language);

    }
    else{
      setLanguage(prev=>prev.filter(lang=>lang!==item))
    }
        
      
       }


      const [tenure, setTenure] = useState("");

     const tenureOptions = ["Leasehold", "Freehold"];


     const options = ["1", "2", "3", "4","5","5+"];

     const [propertyType, setPropertyType] = useState("");
        const propertyTypeOptions = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
        ];

         
        
        const router = useRouter();
        const [sharedOwnership, setSharedOwnership] = useState("");

  async function logindata() {

  try {
    console.log(loginformdata)
    const loginResponse = await postData(API_ENDPOINTS.login, loginformdata);
    console.log("Login response:", loginResponse);

    if (loginResponse.code === 200) {
      const userId = loginResponse.user?.id; // <-- get it from API response
console.log(userId)
      if (userId) {
        // ✅ Update formData
      const updatedForm = {
    ...formData,
    "user_id": userId,
  };

  // ✅ Update React state
  setFormData(updatedForm);
    localStorage.setItem("getquote", JSON.stringify(updatedForm));

      }

      router.push("/components/comparequotes");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}


        return (
          <div>
            <div className="min-h-screen bg-white antialiased font-inter font-outfit">
        <div className='sticky top-0 z-50'>
                       <Navbar />
            </div>

            <main className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                {/* Left stepper */}
                   <aside className="z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-50% lg:max-h-[600px] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white   lg:top-22">
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
                <section className="flex-1 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8 lg:p-10 lg:ml-83">
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
                    {/* 🏡 REMORTGAGE DETAILS */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🏡</span>REMORTGAGE DETAILS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        {/* 1. Property Address (Inline Input) */}
                        <div className="flex flex-col h-full">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Property address:<span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <MapPin size={16} />
                            </span>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                              onChange={(e)=>{handleChange("address",e.target.value)}}
                            />
                            </div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.address ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.address || "placeholder"} {/* placeholder keeps same height */}
</p>
                        </div>

                        <div className="flex flex-col h-full">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Property value:<span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                £
                            </span>
                            <input
                                id="price"
                                type="number"
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                            name="property_value"
                            onChange={(e)=>{handleChange("property_value",Number(e.target.value))}}
                            />
                            </div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.property_value ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.property_value || "placeholder"} {/* placeholder keeps same height */}
</p>
                        </div>

                        {/* 3. Number of Bedrooms (Inline Select) */}
                        <div className="flex flex-col h-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Bedrooms:<span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
                                {options.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
 onClick={() => handleChange("no_of_bedrooms", opt)}                 
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
                                    ${
   formData.no_of_bedrooms === opt                                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <span>{opt}</span>
                                </button>
                                ))}
                            </div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.no_of_bedrooms ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.no_of_bedrooms || "placeholder"} {/* placeholder keeps same height */}
</p>
                            </div>
                    
                        {/* 4. Leasehold or Freehold (Inline Select) */}
                        <div className="flex flex-col gap-6">
                            {/* Leasehold / Freehold Section */}
                            <div className="flex flex-col h-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Leasehold or Freehold?<span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                {tenureOptions.map((opt) => (
                                    <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleChange("leasehold_or_free",opt)}
                                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                     formData.leasehold_or_free === opt
                                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                    >
                                    {opt}
                                    </button>
                                ))}
                                </div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.leasehold_or_free ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.leasehold_or_free || "placeholder"} {/* placeholder keeps same height */}
</p>
                                </div>
                            </div>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ">
                            Property Type:<span className="text-red-500">*</span>
                            </label>

                            <div className="flex flex-wrap gap-9">
                            {propertyTypeOptions.map((opt) => (
                                <button
                                key={opt.label}
                                type="button"
                                onClick={()=> handleChange ( "property_type",opt.label)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
                                    ${
                                   formData.property_type === opt.label
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

  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.property_type ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.property_type || "placeholder"} {/* placeholder keeps same height */}
</p>
                        
                        </div>

                         {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6 mb-4">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

                  {/* 6. Buy to Let? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="b2l" className="block text-sm font-medium text-gray-700 mb-1">
                      Buy to Let?<span className="text-red-500">*</span>
                    </label>
                <div className="relative mt-auto">
  <select
    name="buy_to_let"
    id="b2l"
    value={formData.buy_to_let || ""}  // ✅ controlled value
    onChange={(e) => handleChange("buy_to_let", e.target.value)}  // ✅ update formData
    className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
  >
    {["Please select", "No", "Yes - Personal name", "Yes - Company name"].map(
      (opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      )
    )}
  </select>

  <ChevronDown
    size={16}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
  />
</div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.buy_to_let ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.buy_to_let || "placeholder"} {/* placeholder keeps same height */}
</p>
                  </div>

                  {/* 11. Shared Ownership? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shared Ownership via housing association?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={(e) => handleChange("ownership_housing_asso",1)}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                        formData.ownership_housing_asso === 1
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleChange("ownership_housing_asso",0)}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          formData.ownership_housing_asso === 0
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                      <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
                  </div>
<div className="flex flex-col h-full">
  <label
    htmlFor="b2l"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Mortgage Lender
  </label>

  <div className="relative mt-auto">
    <select
      id="b2l"
      name="mortgage_lender"
      value={formData.mortgage_lender || ""} // ✅ controlled value
      onChange={(e) => handleChange("mortgage_lender", e.target.value)} // ✅ updates formData
      className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
    >
      {["Please select", "Not Known", "Not Required", "Lender Name Look Up"].map(
        (opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        )
      )}
    </select>

    <ChevronDown
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>
    <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
</div>


                </div>
              </div> {/* End PURCHASE FINANCE */}
              <div className="space-y-4">
  {/* Label + Main dropdown */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      Prefer solicitor in your first language?
    </label>
    <select
      className="text-black placeholder-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E5C3B]"
      onChange={handlelanguagechange}
      value={languagepreference}
    >
      <option value="">Please select</option>
      <option>No Preference</option>
      <option>Yes</option>
      <option>Maybe</option>
    </select>
    <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
  </div>

  {/* Show only when needed */}
 


 <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Select Lenders
      </label>
      <Select
        options={options_l}
          instanceId="lenders-select"
        isMulti
        value={selectedLenders} 
        onChange={handleChange_l}
        placeholder="Choose lenders..."
        className="text-black"

      />
        <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
    </div>
    
     {(languagepreference === "Yes" || languagepreference === "Maybe") && (
<div className="mt-2">
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Select preferred language(s)
  </label>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-200 p-3 rounded-lg bg-gray-50">
    {lang.map((item) => (
      <label
        key={item.id}
        className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-green-50 transition"
      >
        <input
          type="checkbox"
          value={item.language_name}
          onChange={(e) => languagecheckboxchange(item.language_name, e.target.checked,item.id)}
          className="accent-[#1E5C3B] w-4 h-4"
        />
        <span className="text-gray-800 text-sm font-medium">
          {item.language_name}
        </span>
      </label>
    ))}
  </div>
 
</div>

  )}
    </div></div>
          
                    {/* 🌐 SPECIAL INSTRUCTIONS */}
  
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    Special instructions (Optional)
  </label>
  <textarea
  name="specal_instruction"
  onChange={(e)=>handleChange("specal_instruction",e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5C3B] text-black placeholder-black"
    placeholder="Enter any special instructions..."
  ></textarea>
</div>


  
                    </form>
 {modalopen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl h-[500px] grid grid-cols-1 md:grid-cols-[35%_65%] animate-scale-in relative">
      
      {/* LEFT SIDE (Brand Section - 30%) */}
      <div className="text-center bg-gradient-to-br from-[#1E5C3B] to-green-600 text-white flex flex-col justify-between items-center md:items-start p-8">
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold tracking-wide mb-2">MOVWISE</h2>
          <p className="text-sm opacity-90 leading-relaxed mt-20">
            Making property transactions simple, secure, and smart.
          </p>
        </div>

        <Link
        type="button"
 href="/components/personaldetails" 
         className="mt-8 mx-auto bg-white text-[#1E5C3B] font-semibold px-8 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-md">
          Sign Up
        </Link>
      </div>

      {/* RIGHT SIDE (Content Section - 70%) */}
    {!loginformshow &&  ( <div className="relative p-8 flex flex-col justify-center text-center md:text-left">
        {/* Close Button */}
        <button
          onClick={() => setModalopen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold leading-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#1E5C3B] mb-3">Confirm Submission</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          You’re about to submit your <b>Property Details</b>.  
          Would you like to continue as a <b>logged-in user</b> or a <b>guest user</b>?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
  // use your actual route path
  className="border border-[#1E5C3B] text-[#1E5C3B] px-6 py-3 rounded-lg hover:bg-[#1E5C3B] hover:text-white transition-all duration-200 shadow-sm flex items-center justify-center"
onClick={()=>{setloginformshow(true)}}
>
  Continue as Logged-in User
</button>
          <Link
 href="/components/comparequotes"
             className="border border-[#1E5C3B] text-[#1E5C3B] px-6 py-3 rounded-lg hover:bg-[#1E5C3B] hover:text-white transition-all duration-200 shadow-sm"
          >
            Continue as Guest User
          </Link>
        </div>
      </div>)}
{loginformshow && (
  <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 rounded-xl shadow-md p-6">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        logindata();
       
      }}
      className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#1E5C3B] mb-6 text-center">
        Welcome Back 👋
      </h2>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          value={loginformdata.email || ""}
          onChange={(e) => handleloginformchange("email", e.target.value)}
          className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
          value={loginformdata.password || ""}
          onChange={(e) => handleloginformchange("password", e.target.value)}
          autoComplete="current-password"
          className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#1E5C3B] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
      >
        Login
      </button>
    </form>
  </div>
)}


    </div>
  </div>
)}
                    <div className="mt-12 flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
                    >
                        Back
                    </button>
                    <button 
                    type="submit"
                    onClick={handleSubmit}
                        className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
                    >
                        Continue &rarr;
                    </button>
                    </div>
                </section>
                </div>
            </main>
            </div>
            <Footer />
            </div>
        );
        }