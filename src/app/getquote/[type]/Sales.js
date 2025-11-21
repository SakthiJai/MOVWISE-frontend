"use client";  // 
import React, { useState , useEffect } from 'react'
import { Check, MapPin, ChevronDown } from "lucide-react";  
import Link from "next/link";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import LocationSearch from '../Purchase/LocationSearch';
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Signinmodal from "../../components/utility/Singingmodal";
// src/components/Sales.js

export default function Sales() {
  const [showAddressLines, setShowAddressLines] = useState(false);

const [languagepreference, setlanguagepreference] = useState(" ");

  const [formData, setFormData] = useState({
    stages:"",
  address: "",
    address_line1: "",
    address_line2: "",
    country: "",
    town: "",
  sales_price: "",
  no_of_bedrooms: "",
  leasehold_or_free: "", 
  property_type: "",
  shared_ownership: "",
  existing_mortgage:"yes",
  languages:"",
  specal_instruction:"",
  lender:"",  
  type_id:1,
});


const [errors, setErrors] = useState({});

const handleChange = (name, value) => {

  // Handle phone separately
  if (name === "sales_price") {
    const numericValue = Number(value);
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ Clear error for this specific field
  setErrors((prev) => ({ ...prev, [name]: "" }));
};


const handleSubmit = (e) => {
   e.preventDefault();

    // simple validation
    let newErrors = {};
 

 
  /*if (!formData.address.trim()) {
    newErrors.address = "Property address is required";
  } else if (formData.address.trim().length < 5) {
    newErrors.address = "Address must be at least 5 characters";
  }*/

  
  if (!formData.sales_price) {
    newErrors.sales_price = "Agreed sales price is required";
  } else if (Number(formData.sales_price) <= 0) {
    newErrors.sales_price = "Price must be a positive number";
  }

 
  if (!formData.no_of_bedrooms) {
    newErrors.no_of_bedrooms = "Please select number of bedrooms";
  }


  if (!formData.leasehold_or_free) {
    newErrors.leasehold_or_free = "Please select leasehold or freehold";
  }

 
  if (!formData.property_type) {
    newErrors.property_type = "Please select a property type";
  }

    if (!formData.shared_ownership) {
    newErrors.shared_ownership = "Please select a ownership";
  }


   setErrors(newErrors);
    console.log(errors)

    // if no errors, submit
    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form submitted:", formData);
      //alert("Form submitted successfully!");
          setModalopen(true)

    }

  };




const handleContinue = (e) => {
  e.preventDefault();
console.log(formData)
  if (validate()) {
    console.log("✅ Valid form data:", formData);
    
  } else {
    console.log("❌ Validation failed:", errors);
  }
};

    const [selectedLenders, setSelectedLenders] = useState([]);//imp
     const options_l = [
      { value: 1, label: "Lender A" },
      { value: 2, label: "Lender B" },
      { value: 3, label: "Lender C" },
      { value: 4, label: "Lender D" },
      { value: 5, label: "Lender E" },     
      { value: 6, label: "Lender F" },
      { value: 7, label: "Lender G" },
      { value: 8, label: "Lender H" },
      { value: 9, label: "Lender I" },
      { value: 10, label: "Lender J" },
      
    ];
  
    // ✅ Handle change
    const handleChange_l = (selectedOptions) => {
      setFormData((prevData) => ({
        ...prevData,
        lender: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
      }));
    };
    // Convert to react-select options
  
    // Optional: hydration-safe render
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
         
            

  
  
    // Convert lenders into react-select format
   
    const [modalopen, setModalopen] = useState(false);
      const [languages, setlanguages] = useState(" ");
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
    const [loginformshow,setloginformshow]=useState(false)
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
    "service_type":Number(localStorage.getItem("service"))
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


useEffect(() => {
  const storedData = localStorage.getItem("getquote");

  if (storedData) {
    setFormData(JSON.parse(storedData));
  }
}, []);

      const [leasehold_or_free, setleasehold_or_free] = useState("");

     const leasehold_or_freeOptions = ["Leasehold", "Freehold"];

     const [no_of_bedrooms, setno_of_bedrooms] = useState("");

     const options = ["1", "2", "3", "4", "5" , "5+"];

     const [property_type, setproperty_type] = useState("");
        const property_typeOptions = [
           { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
            { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
            { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
            { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
        ];

        //     const [formData, setFormData] = useState({
        //     shared_ownership: "",
        //     existingMortgage: "",
        // });

        
        const router = useRouter();

        function   handlelanguagechange(e){
          console.log(e.target.value);
              setlanguagepreference(e.target.value);
              setLanguage([]); 
           }
           function languagecheckboxchange(item,checked,id){
            if(checked){
              console.log(item);
        setLanguage(prev => [...prev, item]);
        handleChange("languages",[...formData.languages, id])
        console.log(language);
        
            }
            else{
              setLanguage(prev=>prev.filter(lang=>lang!==item))
            }
                
              
               }

        // Initial state for the toggle buttons
        const [scheme, setScheme] = useState("yes");
        const [existing_mortgage, setexisting_mortgage] = useState("yes");
        const [newBuild, setNewBuild] = useState("yes");
        const [shared_ownership, setshared_ownership] = useState("yes");

  return (
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
                    {/* 🏡 SALES DETAILS */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🏡</span> SALES DETAILS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                         {/* whay stages are you at? */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    What stages are you at?
                                </label>
                                <select id="stages" name="stages"
                                 value={formData.stages} // ✅ controlled value
                                 onChange={(e)=>{handleChange("stages",e.target.value)}}


                                  className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                    {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                    <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                {/* Dropdown icon */}
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
                                </div>

{/* 1. Property Address */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property address:<span className="text-red-500">*</span>
        </label>

        <LocationSearch
          readOnly={showAddressLines} 
          onSelectAddress={(selected) => {
  if (!selected) return;

  setFormData((prev) => ({
    ...prev,
    address: selected,
   town: selected.town || selected.admin_district || "", 
   country: selected.country || "",
  }));

  console.log("Address selected:", town);
  setErrors((prev) => ({
    ...prev,
    address: "",
    town: "",
    country: "",
  }));
  
}}

        />

        <p className="text-[12px] text-red-500 min-h-[16px]">{errors.address}</p>

        {!showAddressLines && (
          <button
            type="button"
            onClick={() => setShowAddressLines(true)}
            className="text-blue-600 underline w-fit mt-2"
          >
            I dont know the postcode yet
          </button>
        )}
      </div>

{/* Address Lines – should appear first */}
   {showAddressLines && (
        <>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Address Line 1</label>
            <input
              type="text"
              value={formData.address_line1}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address_line1: e.target.value }))
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Address Line 2</label>
            <input
              type="text"
              value={formData.address_line2}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address_line2: e.target.value }))
              }
              className="border p-2 rounded"
            />
          </div>
        </>
      )}

      {/* Town / City */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Town / City:<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.town}
          readOnly
          className="border p-2 rounded"
        />
        <p className="text-[12px] text-red-500 min-h-[16px]">{errors.town}</p>
      </div>

      {/* Country */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country:<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.country}
          readOnly
          className="border p-2 rounded"
        />
        <p className="text-[12px] text-red-500 min-h-[16px]">{errors.country}</p>
      </div>
    


                        {/* 2. Agreed SALES Price (Inline Input with Prefix) */}
                        <div className="flex flex-col h-full">
                            <label htmlFor="sales_price" className="block text-sm font-medium text-gray-700 mb-1">
                            Agreed Sales price:<span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                £
                            </span>
                             <input
                                id="sales_price"
                                name="sales_price"
                                type="number"
                                value={formData.sales_price}
                                onChange={(e)=>{handleChange("sales_price",e.target.value)}}
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                              />
                              

                            
                             </div>
                            <p
                            className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                              errors.sales_price ? "text-red-500 opacity-100" : "opacity-0"
                            }`}
                          >
                            {errors.sales_price || "placeholder"} {/* placeholder keeps same height */}
                          </p>
                       </div>

                        {/* 3. Number of no_of_bedrooms (Inline Select) */}
                       <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Number of Bedrooms:<span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
          // ✅ update formData
          setFormData((prev) => ({ ...prev, no_of_bedrooms: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, no_of_bedrooms: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
          ${
            formData.no_of_bedrooms === opt
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
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
                        <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Leasehold or Freehold?<span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    {leasehold_or_freeOptions.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
          // ✅ update formData
          setFormData((prev) => ({ ...prev, leasehold_or_free: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, leasehold_or_free: "" }));
        }}
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
                       <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Property Type:<span className="text-red-500">*</span>
  </label>

  <div className="flex flex-wrap gap-9">
    {property_typeOptions.map((opt) => (
      <button
        key={opt.label}
        type="button"
        onClick={() => {
          // ✅ Update property type in formData
          setFormData((prev) => ({ ...prev, property_type: opt.label }));
          // ✅ Clear the specific error
          setErrors((prev) => ({ ...prev, property_type: "" }));
        }}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
          ${
            formData.property_type === opt.label
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
      >
        <span
          className={`${
            formData.property_type === opt.label ? "text-white" : "text-gray-700"
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
</div>

                    {/* 💰 SALES FINANCE */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">💰</span> SALES FINANCE
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                          htmlFor="shared_ownership"
                          className="block text-[14px] text-[#6A7682] font-medium mb-2"
                        >
                          Shared Ownership<span className="text-red-500">*</span>
                        </label>
                        <select
                          id="shared_ownership"
                          name="shared_ownership"
                          value={formData.shared_ownership}
                          onChange={(e)=>{handleChange("shared_ownership",e.target.value)}}
                          className={"block w-full h-[44px] rounded-xl border px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"}
                        >
                          {["Please select","Yes (housing association)","Yes (Help To Buy)","No"].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                         <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.shared_ownership ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.shared_ownership || "placeholder"} {/* placeholder keeps same height */}
</p>
                      </div>


                    
                    

                    {/* Existing Mortgage */}
                   <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Existing mortgage to redeem?
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    <button
      type="button"
      name="existing_mortgage"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          existing_mortgage: 1,
        }))
      }
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.existing_mortgage === 1
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>Yes</span>
    </button>

    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          existing_mortgage: 0,
        }))
      }
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.existing_mortgage === 0
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

                    </div>
                </div>
                    

                    {/* 🌐 SPECIAL INSTRUCTIONS */}
                                               
  <div className="grid grid-cols-2   gap-4">
    {/* Prefer solicitor in your first language */}

    {/* Prefer solicitor in your first language */}
            <div className="space-y-4">
  {/* Label + Main dropdown */}
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
</div>
{/* //imp */}
 
{/* //imp */}
 <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-800 mb-1 rounded-lg focus:ring-2 focus:ring-[#1E5C3B]">
        Select Lenders
      </label>

      {isClient ? (
  <Select
        options={options_l}
        name="lender"
        isMulti
        instanceId="lenders-select"
        value={options_l.filter((opt) => formData.lender.includes(opt.value))}
        onChange={handleChange_l}
        placeholder="Choose lenders..."
        className="text-black"
      />
      ) : (
        <div className="h-[44px] bg-gray-100 rounded-lg animate-pulse" />
      )}

      {/* Debug preview */}
       <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
    </div>         
</div>    


    {/* Special instructions */}
  
      <div>
    
   <label className="block text-sm font-semibold text-gray-800 mb-1">
        Special instructions (Optional)
      </label>
       <textarea
        name="specal_instruction"
        value={formData.specal_instruction} // ✅ controlled value
        onChange={(e)=>{handleChange("specal_instruction",e.target.value)}}
        className="placeholder-gray-700 w-full border text-black border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5C3B]"
        placeholder="Enter any special instructions..."
      ></textarea>
    </div>
      
  
  
                    </form>
                    {modalopen && (
                        <Signinmodal></Signinmodal>
                        )}
                    <div className="mt-12 flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
                    >
                        Back
                    </button>
                    <button
                        href="/components/comparequotes"
                        onClick={handleSubmit}
                        className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
                    >
                        Continue &rarr;
                    </button>
                    </div>
                </section>
                </div>
  );
}

