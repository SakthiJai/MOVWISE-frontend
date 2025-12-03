"use client";  // 
import React, { useState , useEffect } from 'react'
import { Check, MapPin, ChevronDown } from "lucide-react";  
import Link from "next/link";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import LocationSearch, { fetchAddressDetails } from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Signinmodal from "../../components/utility/Singingmodal";
// src/components/Sales.js

export default function Sales() {
  const [showAddressLines, setShowAddressLines] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [lender, setLender] = useState([
        { value: "Not Required", label: "Not Required", id: 0 },
      ]);

const [languagepreference, setlanguagepreference] = useState(" ");

  const options = ["1", "2", "3", "4", "5" , "5+"];

  const [formData, setFormData] = useState({
    "sales_stages":"",
 "sales_address": "",
 "sales_address_line1": "",
  "sales_address_line2": "",
  "sales_country": "",
  "sales_city": "",
  sales_price: "",
    //sales_no_of_bedrooms: "",
  sales_no_of_bedrooms: options[0],
    //sales_leasehold_or_free: "", 
  sales_leasehold_or_free: "Leasehold", 
    //sales_property_type: "",
  sales_property_type: "Flat",
  shared_ownership: "",
    //existing_mortgage:"yes",
  existing_mortgage:0,
  languages:"",
  specal_instruction:"",
  lenders:"",  
  user_id:null,
  service_type:null,
});
 console.log("formdata:" , formData)

const [rawValue, setRawValue] = useState("");
const handleUnknownPostcode = () => {
  // 1️⃣ Condition: user clicked "I don’t know the postcode yet"
  setShowAddressLines(true); // show address fields

  // 2️⃣ Reset address-related fields
  setFormData(prev => ({
    ...prev,
    [`sales_address`]: "",          // ← THIS is the missing one
    [`selectedId`]: "",
    [`sales_address_line1`]: "",
    [`sales_address_line2`]: "",
    [`sales_city`]: "",
    [`sales_country`]: "",
  }));
};
 const closeModal = () => {
    console.log("closing...");
    setModalopen(false);
  };
 const handleChangeLang = (selectedOptions) => {
      //    const hasNotRequired = selectedOptions.some(
      //   (option) => option.value === "Not Required"
      // );
     const  hasNotRequired=false
      console.log(selectedOptions)
      if(selectedOptions=="Not Required"){
      const  hasNotRequired=true
      }
 

     if (hasNotRequired) {
        // Keep only "Not Required" selected
        const notRequiredOption = lang.find(opt => opt.value === "Not Required");
        setSelectedLanguage([notRequiredOption]);
        console.log("Selected language: [0]");
        handleChange("languages", [0]);
      } else {
        // Normal behavior for other lenders
        setSelectedLanguage(selectedOptions);
      console.log(selectedOptions)
     handleChange("languages",[selectedOptions.id]);
      }
    
  }

const [errors, setErrors] = useState({});
useEffect(() => {
    if (rawValue === "") return;

    const timer = setTimeout(() => {
      const num = Number(rawValue.replace(/,/g, ""));

      if (!isNaN(num)) {
        // Format as UK number WITHOUT pound symbol
        const formatted = new Intl.NumberFormat("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(num);

       // setValue(formatted);
         setFormData((prev) => ({ ...prev, sales_price: formatted }))
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [rawValue]);
const handleChange = (name, value) => {
  // Handle phone separately
  if (name === "sales_price") {
  const cleaned = value.replace(/[^0-9.]/g, "");

    const numericValue = Number(value);
    setRawValue(cleaned);
    setFormData((prev) => ({ ...prev, [name]: cleaned}));
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
 
  
  
  if (!formData.sales_stages) {
  newErrors.sales_stages = "Please select a stage";
  }
  
  if (!formData.sales_country) {
  newErrors.sales_country = "Please select a country";
}

  if (!selectedLanguage || selectedLanguage.length === 0) {
    newErrors.preferLanguage = "Please select a language";
  }

  if (!selectedLenders || selectedLenders.length === 0) {
  newErrors.lenders = "Please select at least one lender";
}



 
  /*if (!formData.sales_address.trim()) {
    newErrors.address = "Property address is required";
  } else if (formData.sales_address.trim().length < 5) {
    newErrors.address = "Address must be at least 5 characters";
  }*/

  
  if (!formData.sales_price) {
    newErrors.sales_price = "Agreed sales price is required";
  } else if (Number(formData.sales_price) <= 0) {
    newErrors.sales_price = "Price must be a positive number";
  }

 


  if (!formData.sales_leasehold_or_free) {
    newErrors.sales_leasehold_or_free = "Please select leasehold or freehold";
  }

 
    if (!formData.shared_ownership) {
    newErrors.shared_ownership = "Please select a ownership";
  }


   setErrors(newErrors);
    
  setFormData((prev) => ({ ...prev, ['service_type']: localStorage.getItem("service")}));
    // if no errors, submit
    if (Object.keys(newErrors).length === 0) {
           // localStorage.removeItem("getquote");
      formData.service_type=localStorage.getItem("service");
      console.log(formData)
       localStorage.setItem("getquote", JSON.stringify(formData));
      console.log("✅ Form submitted:", formData);
            localStorage.setItem("service", JSON.stringify(3));

      //alert("Form submitted successfully!");
      
      if(localStorage.getItem("user")){
        formData.user_id=localStorage.getItem("user");
        localStorage.setItem("getquote", JSON.stringify(formData));
         router.push("/components/comparequotes");
      }
      else{
       setModalopen(true)
      }
      
      

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
   
      
    ];
  
    // ✅ Handle change
    const handleChange_l = (selectedOptions = []) => {
      const hasNotRequired = selectedOptions.some(
        (option) => option.value === "Not Required"
      );
    
      if (hasNotRequired) {
        // Keep only "Not Required" selected
        const notRequiredOption = lender.find(opt => opt.value === "Not Required");
        setSelectedLenders([notRequiredOption]);
        console.log("Selected lenders: [0]");
        handleChange("lenders", [0]);
      } else {
        // Normal behavior for other lenders
        setSelectedLenders(selectedOptions);
        const ids = selectedOptions.map(item => item.id);
        console.log("Selected lenders:", ids);
        handleChange("lenders", ids);
      }
    };

    // Convert to react-select options
  
    // Optional: hydration-safe render
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
         
            

  
  
    // Convert lenders into react-select format
   
    const [modalopen, setModalopen] = useState(false);
      const [languages, setlanguages] = useState(" ");
      const [language, setLanguage] = useState([]);
       const [lang, setLang] = useState ([
            { value: "Not Required", label: "Not Required", id: 0 },
          ]);
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



async function fetchdata(){
  try{
 const languages = await getData(API_ENDPOINTS.languages);
            const lenderData = await getData(API_ENDPOINTS.lenders);
 
              if(Array.isArray(languages.users)){
          const languageOptions = languages.users.map((l) => ({
            value: l.language_name,
            label: l.language_name,
            id: l.id,
          }));
          setLang([{ value: "Not Required", id: 0,label: "Not Required" }, ...languageOptions]);
       }
          if (Array.isArray(lenderData.users)) {
          const lenderOptions = lenderData.users.map((l) => ({
            value: l.lenders_name,
            label: l.lenders_name,
            id: l.id,
          }));
             console.log(lenderOptions)
    
               setLender([{ value: "Not Required", id: 0,label: "Not Required" }, ...lenderOptions]);
                   console.log(lender)
              }
  }
  catch(e){
console.log(e);
  }
  
}

useEffect(() => {
  fetchdata()

 
}, []);

      const [sales_leasehold_or_free, setsales_leasehold_or_free] = useState("");

     const sales_leasehold_or_freeOptions = ["Leasehold", "Freehold"];

     const [no_of_bedrooms, setno_of_bedrooms] = useState("");

    //  const options = ["1", "2", "3", "4", "5" , "5+"];

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

       
       

        // Initial state for the toggle buttons
        const [scheme, setScheme] = useState("yes");
        const [existing_mortgage, setexisting_mortgage] = useState("yes");
        const [newBuild, setNewBuild] = useState("yes");
        const [shared_ownership, setshared_ownership] = useState("yes");

  return (
                <div className="flex flex-col lg:flex-row gap-8 mt-7">
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
                                    What stages are you at? <span className="text-red-500">*</span>
                                </label>
                                <select id="stages" name="sales_stages"
                                 value={formData.sales_stages} // ✅ controlled value
                                 onChange={(e)=>{handleChange("sales_stages",e.target.value)}}


                                  className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                    {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                    <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                {/* Dropdown icon */}
                              <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                errors.sales_stages ? "text-red-500 opacity-100" : "opacity-0"
              }`}>
                {errors.sales_stages || "placeholder"}
              </p>

        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
                                </div>
 {/* 1. Property Address */}
                       <div className="flex flex-col h-full">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                         Property address:<span className="text-red-500">*</span>
                         </label>
                        <LocationSearch
                        readOnly={showAddressLines}
                        onSelectAddress={async (selected) => {
                          if (!selected) return;
                          // Clear address error immediately when selecting
                           if (errors.address) {
                            setErrors((prev) => ({ ...prev, address: "" }));
                            }
                            // Update formData with selected suggestion
                            setFormData((prev) => ({
                              ...prev,
                              selectedId: selected.id,
                              sales_address: selected.suggestion,
                            }));
                            // Fetch full address details
                            const details = await fetchAddressDetails(selected.udprn);
                              if (details) {
                                setFormData((prev) => ({
                                  ...prev,
                                  sales_city: details.post_town || details.admin_district || "",
                                  sales_country: details.country || "",
                                  }));
                                } else {
                                  setErrors((prev) => ({
                                    ...prev,
                                    address: "Failed to fetch full address details.",
                                    }));
                                  }
                                }}
                                onInputChange={() => {
                                  // Clear the error immediately when user types
                                if (errors.address) {
                                  setErrors((prev) => ({ ...prev, address: "" }));
                                   }
                                  }}
                                  />

                                          <div className="flex justify-between items-center mt-1">
                                            {/* Left: Error message */}
                                            <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                              errors.address ? "text-red-500 opacity-100" : "opacity-0"
                            }`}>
                              {errors.address || "placeholder"} {/* placeholder keeps same height */}
                            </p>

                    {/* “I don’t know postcode” button */}
                    {!showAddressLines && (
                      <button
                        type="button"
                         onClick={handleUnknownPostcode}
                        className="text-blue-600 underline text-xs"
                      >
                        I don’t know the postcode yet
                      </button>
                    )}
                  </div>
                </div>
{/* Always render AddressFields */}
                    <AddressFields
                      formData={formData}
                      errors={errors}
                      showAddressLines={showAddressLines} // only used inside AddressFields
                      onChange={(field, value) =>
                        
                        setFormData((prev) => ({ ...prev, [field]: value }))
                      }
                      prefix='sales_'
                    />

    


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
                                type="text"
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
          setFormData((prev) => ({ ...prev, sales_no_of_bedrooms: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, no_of_bedrooms: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
          ${
            formData.sales_no_of_bedrooms === opt
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
    {sales_leasehold_or_freeOptions.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
          // ✅ update formData
          setFormData((prev) => ({ ...prev, sales_leasehold_or_free: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, sales_leasehold_or_free: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
          formData.sales_leasehold_or_free === opt
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
   errors.sales_leasehold_or_free ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.sales_leasehold_or_free || "placeholder"} {/* placeholder keeps same height */}
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
          setFormData((prev) => ({ ...prev, sales_property_type: opt.label }));
          // ✅ Clear the specific error
          setErrors((prev) => ({ ...prev, sales_property_type: "" }));
        }}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
          ${
            formData.sales_property_type === opt.label
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
      >
        <span
          className={`${
            formData.sales_property_type === opt.label ? "text-white" : "text-gray-700"
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
          Prefer solicitor in your first language? <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
      
    <Select
  options={lang}
  instanceId="language-select"
  value={selectedLanguage || formData.languages}
  onChange={(selectedOption) => {
    handleChangeLang(selectedOption); // existing handler to update formData / state

    // Clear the error immediately
    if (errors.preferLanguage) {
      setErrors((prev) => ({ ...prev, preferLanguage: "" }));
    }
  }}
  placeholder="Choose languages..."
  className="text-black mt-2"
/>

     
                </div>
                
                <p className="text-[12px] mt-1 min-h-[16px] text-red-500">
  {errors.preferLanguage}
</p>

     
        <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
      </div>

  {/* Show only when needed */}
 
</div>
{/* //imp */}
 
{/* //imp */}
 <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-800 mb-1 rounded-lg focus:ring-2 focus:ring-[#1E5C3B]">
        Select Lenders <span className="text-red-500">*</span>
      </label>

      {isClient ? (
    <Select
            options={lender}
              instanceId="lenders-select"
            isMulti
            value={selectedLenders}
            onChange={handleChange_l}
            placeholder="Choose lenders..."
            className="text-black"
    
          /> 
      
      ) : (
        <div className="h-[44px] bg-gray-100 rounded-lg animate-pulse" />
      )}

              <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
  errors.lenders ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.lenders || "placeholder"}
</p>
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

