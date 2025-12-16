"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown, CoinsIcon, Home } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import NextLink from 'next/link';
import { API_BASE_URL } from "../../constants/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Select from "react-select";
import Footer from "../../parts/Footer/footer";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import Swal  from "sweetalert2";
import LocationSearch, { fetchAddressDetails } from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';
import Signinmodal from "../../components/utility/Singingmodal";


// import Select from "react-select";






export default function Remortage() {
  useEffect(() => {
 
 
  fetchPropertyTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const handleUnknownPostcode = () => {
  // 1️⃣ Condition: user clicked "I don’t know the postcode yet"
  setShowAddressLines(true); // show address fields

  // 2️⃣ Reset address-related fields
  setFormData(prev => ({
    ...prev,
    [`address`]: "",          // ← THIS is the missing one
    [`selectedId`]: "",
    [`address_line1`]: "",
    [`address_line2`]: "",
    [`town_city`]: "",
    [`country`]: "",
  }));
};
 
const [lender, setLender] = useState([
  { value: "Not Known", label: "Not Known", id: 0 },
]);
const [lang, setLang] = useState ([
  { value: "Not Required", label: "Not Required", id: 0 },
]);
  
    const [selectedLenders, setSelectedLenders] = useState([]);
    const [loginformshow,setloginformshow]=useState(false)
   

  

const [selectedLanguage, setSelectedLanguage] = useState([]);
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
const handleChange_l = (selectedOptions = []) => {
  const hasNotRequired = selectedOptions.some(
    (option) => option.value === "Not Known"
  );

  if (hasNotRequired) {
    // Keep only "Not Required" selected
    const notRequiredOption = lender.find(opt => opt.value === "Not Known");
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

  const [showAddressLines, setShowAddressLines] = useState(false);

  const [formData, setFormData] = useState({
  "address": "",
  "address_line1": "",
  "address_line2": "",
  "town_city" : "",
  "country" : "" ,
  "property_values": 0,
  "no_of_bedrooms": "",
  "property_type": "",
  "leasehold_or_free": "",
  "buy_to_let": "",
  "mortgage_lender": "not required",
  "ownership_housing_asso": 1,
  "languages": [],
  "specal_instruction": "",
 "service_type":4, 
   
  
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

 
  
  // if(!formData.languages){
  //   newErrors.languages="please select a language"
  // }

     
      // if (!formData?.address?.trim()) {
      //   newErrors.address = "Property address is required";
      // } else if (formData.address.trim().length < 5) {
      //   newErrors.address = "Address must be at least 5 characters";
      // }
    
      
//       if (!formData.property_values
// ) {
//         newErrors.property_values
//  = "property_valuesis required";
//       } else if (Number(formData.property_values
// ) <= 0) {
//         newErrors.property_values
//  = "property_values must be a positive number";
//       }

//  if(!formData.no_of_bedrooms){
//   newErrors.no_of_bedrooms="please select a no. of bedrooms"
//  }
//   if(!formData.property_type){
//   newErrors.property_type="please select a property_type"
//  }
//    if(!formData.leasehold_or_free){
//   newErrors.leasehold_or_free="please select a leasehold_or_free"
//  }

// if(!formData.buy_to_let){
//   newErrors.buy_to_let="please select buy_to_let"
// }
//     setErrors(newErrors);
//     console.log(errors)

    // if no errors, submit
  if (Object.keys(newErrors).length === 0) {
     localStorage.removeItem("getquote");

      console.log("✅ Form submitted:", formData);
      console.log("property_values =", formData.property_values);
console.log("type =", typeof formData.property_values);

formData.property_values=formData.property_values.toString()

            localStorage.setItem("service", JSON.stringify(4));
                  localStorage.setItem("getquote", JSON.stringify(formData));


  setModalopen(true); // if you still want to open your modal
}
else{
  Swal.fire({
    title: "Error!",
    text: "Fix Validation Errors!",
    icon: "error",
    confirmButtonText: "OK",
    life:1000
  });

}


  };

   

    const [modalopen, setModalopen] = useState(false);
      const [languagepreference, setlanguagepreference] = useState(" ");
      const [language, setLanguage] = useState([]);
     

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
      

         
        
        const router = useRouter();
        const [sharedOwnership, setSharedOwnership] = useState("");


const getIconForType = (type) => {
  switch (type.toLowerCase()) {
    case "flat":
      return <FaBuilding size={22} color="#007BFF" />;
    case "terraced":
      return <FaHome size={22} color="#28A745" />;
    case "semidetached":
    case "semi-detached":
      return <MdHolidayVillage size={22} color="#FFC107" />;
    case "detached":
      return <FaWarehouse size={22} color="#DC3545" />;
    default:
      return <FaHome size={22} color="#6c757d" />; // default gray icon
  }
};


 const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);


 const fetchPropertyTypes = async () => {
         console.log(lender)
      try {
        const data = await getData(API_ENDPOINTS.compareQuotes);
      
       const lenderData = await getData(API_ENDPOINTS.lenders);
       const languages = await getData(API_ENDPOINTS.languages);
        setLang( languages.users)
   console.log(languages.users)
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

           setLender([{ value: "Not Known", id: 0,label: "Not Known" } ,...lenderOptions]);
               console.log(lender)

        
    }
    
        if (data.propertyTypes && Array.isArray(data.propertyTypes)) {
       
          const mappedOptions = data.propertyTypes.map((item) => ({
            id: item.id,
            label: item.property_type,
            icon: getIconForType(item.property_type),
          }));
          setPropertyTypeOptions(mappedOptions);
          console.log(mappedOptions);
        }
       

      } catch (error) {
        console.error("Failed to load property types:", error);
      }
    };

        return (
                         <div className="flex flex-col lg:flex-row gap-8 mt-8">
                {/* Left stepper */}
                        <aside className="z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-1/2 lg:h-[800px] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white   lg:top-22">
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
                        <Home  className="w-7 h-7 text-[#1E5C3B]" />REMORTGAGE DETAILS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                                 {/* 1. Property Address (Inline Input) */}
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
                              address: selected.suggestion,
                            }));
                            // Fetch full address details
                            const details = await fetchAddressDetails(selected.udprn);
                              if (details) {
                                setFormData((prev) => ({
                                  ...prev,
                                  town_city: details.post_town || details.admin_district || "",
                                  country: details.country || "",
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
                      prefix=""
                    />


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
                                type="text"
                                  value={formData?.property_values ?? ""}
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                            name="property_values
"
                            onChange={(e)=>{handleChange("property_values",Number(e.target.value))}}
                            />
                            </div>
  <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.property_values
 ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.property_values
 || "placeholder"} {/* placeholder keeps same height */}
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
         <div>
                 

                            <div className="flex flex-wrap  gap-9">
                            {propertyTypeOptions.map((opt) => (
                                <button
                                key={opt.id}
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
                                <span className="text-sm font-semibold">{opt.label
}</span>
                                </button>
                            ))}
                            </div>
                           
 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.property_type ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.property_type || "placeholder"} {/* placeholder keeps same height */}
</p>
</div>

                        
                        </div>

                         {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6 mb-4">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                 < CoinsIcon  className="w-7 h-7 text-yellow-400" /> PURCHASE FINANCE
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
                    <label className=" text-sm font-medium text-gray-700 mb-1">
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


                </div>
              </div> {/* End PURCHASE FINANCE */}
              <div className="space-y-4">
  {/* Label + Main dropdown */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Prefer solicitor in your first language?
    </label>
   <div className="mt-2">
  

   <Select
        options={lang}
    
                  instanceId="language-select"
        value={selectedLanguage || formData.languages}
        onChange={handleChangeLang}
        placeholder="Choose languages..."
        className="text-black mt-2"
      />
 
</div>
    <p
className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`}
></p>
  </div>

  {/* Show only when needed */}
 


 <div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
     Mortgage Lender
      </label>
       <Select
        options={lender}
          instanceId="lenders-select"
        isMulti
        value={selectedLenders}
        onChange={handleChange_l}
        placeholder="Choose lenders..."
        className="text-black"

      /> 
      <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
    </div>
    
    
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
                    type="submit"
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