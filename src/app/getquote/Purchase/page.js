


"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin, ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import Select from 'react-select';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Footer from "../../parts/Footer/footer";
import LocationSearch from './LocationSearch';
import { v4 as uuidv4 } from 'uuid';


// const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       borderRadius: "0.5rem", // rounded-xl
//       borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB", // focus green, default gray
//       boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
//       "&:hover": {
//         borderColor: "#1E5C3B",
//       },
//       minHeight: "40px",
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       color: "black ", // Tailwind gray-500
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: "#DCFCE7", // light green background
//       borderRadius: "0.25rem",
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: "#166534", // dark green text
//       fontWeight: 500,
//     }),
//     multiValueRemove: (provided) => ({
//       ...provided,
//       color: "#166534",
//       ":hover": {
//         backgroundColor: "#BBF7D0",
//         color: "#166534",
//       },
//     }),
//     menu: (provided) => ({
//       ...provided,
//       borderRadius: "0.5rem",
//       overflow: "hidden",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#DCFCE7"
//         : state.isFocused
//         ? "#ECFDF5"
//         : "white",
//       color: "#111827",
//       cursor: "pointer",
//     }),
//   };








  
export default function App() {
const [lender, setLender] = useState([
  { value: "Not Required", label: "Not Required", id: 0 },
]);
const [lang, setLang] = useState ([
  { value: "Not Required", label: "Not Required", id: 0 },
]);
const [selectedLanguage, setSelectedLanguage] = useState([]);
const handleChangeLang = (selectedOptions = []) => {
     const hasNotRequired = selectedOptions.some(
    (option) => option.value === "Not Required"
  );
 if (hasNotRequired) {
    // Keep only "Not Required" selected
    const notRequiredOption = lang.find(opt => opt.value === "Not Required");
    setSelectedLanguage([notRequiredOption]);
    console.log("Selected language: [0]");
    handleChange("languages", [0]);
  } else {
    // Normal behavior for other lenders
    setSelectedLanguage(selectedOptions);
    const ids = selectedOptions.map(item => item.id);
    console.log("Selected languages:", ids);
    handleChange("languages", ids);
  }
}

const handleChange_l = (selectedOptions = []) => {
  const hasNotRequired = selectedOptions.some(
    (option) => option.value === "Not Required"
  );

  if (hasNotRequired) {
    // Keep only "Not Required" selected
    const notRequiredOption = lender.find(opt => opt.value === "Not Required");
    setSelectedLenders([notRequiredOption]);
    console.log("Selected lenders: [0]");
    handleChange("lender", [0]);
  } else {
    // Normal behavior for other lenders
    setSelectedLenders(selectedOptions);
    const ids = selectedOptions.map(item => item.id);
    console.log("Selected lenders:", ids);
    handleChange("lender", ids);
  }
};

const [formData, setFormData] = useState({

    "languages": [],
    "service_type":2,
  });
  async function createguestuser(){
  
   try {
    const guest_id = uuidv4();
  console.log(guest_id);
     
        const updatedForm = {
      ...formData,
      "guest_user ": guest_id,
      "service_type":2
    };
  
    // ✅ Update React state
    setFormData(updatedForm);
      localStorage.setItem("getquote", JSON.stringify(updatedForm));
   router.push("/components/comparequotes");
        }
  
       
      
     catch (error) {
      console.error("Error logging in:", error);
    }
  }
  
useEffect(() => {
  const storedData = localStorage.getItem("getquote");


  if (storedData) {
    setFormData(JSON.parse(storedData));
  }
 
  fetchPropertyTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);



  async function logindata() {
  
    try {
      console.log(loginformdata)
      const loginResponse = await postData(API_ENDPOINTS.login, loginformdata);
      console.log("Login response:", loginResponse);
  
      if (loginResponse.code === 200) {
        const userId = loginResponse.user?.id; // <-- get it from API response
  console.log(userId)
        if (userId) {

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

const router = useRouter();

function handleloginformchange(name, value) {
  setloginformdata((prev) => ({
    ...prev,
    [name]: value,
  }));
}


 
  // Convert lenders into react-select format
 

 
const [selectedOptions, setSelectedOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

const [errors, setErrors] = useState({});

    const [selectedLenders, setSelectedLenders] = useState([]);



const handleChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
  console.log(formData)

  // Clear error immediately when user types/selects valid input
  if (errors[field]) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }
};


  const [query, setQuery] = useState("");

 const addressapi = async (query) => {
  // if (!query) return;

  // try {
  //   const res = await fetch(`https://api.postcodes.io/postcodes?q=${query}`);
  //   const data = await res.json();

  //   if (data.status === 200 && data.result) {
  //     console.log("Matching results:", data.result);
  //   } else {
  //     console.log("No matching results found");
  //   }
  // } catch (err) {
  //   console.error("API error:", err);
  // }
};


   
    const fetchPropertyTypes = async () => {
         console.log(lender)
      try {
        const data = await getData(API_ENDPOINTS.compareQuotes);
       const lenderData = await getData(API_ENDPOINTS.lenders);
       const languages = await getData(API_ENDPOINTS.languages);
          if(Array.isArray(languages.users)){
      const languageOptions = languages.users.map((l) => ({
        value: l.language_name,
        label: l.language_name,
        id: l.id,
      }));
      setLang([{ value: "Not Required", id: 0,label: "Not Required" }, ...languageOptions]);
   }
   console.log(lenderData)
   console.log(languages);

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
    
        if (data.propertyTypes && Array.isArray(data.propertyTypes)) {
          const mappedOptions = data.propertyTypes.map((item) => ({
            id: item.id,
            label: item.property_type,
            icon: getIconForType(item.property_type),
          }));
          setPropertyTypeOptions(mappedOptions);
        }
        if(data.purchaseStages && Array.isArray(data.purchaseStages)){
          setStageOptions(data.purchaseStages);
        }

      } catch (error) {
        console.error("Failed to load property types:", error);
      }
    };
 const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  
  const [modalopen, setModalopen] = useState(false);
  const [languagepreference, setlanguagepreference] = useState(" ");
  const [language, setLanguage] = useState([]);


  
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    let newErrors = {};

 
  
  if(!formData.languages){
    newErrors.languages="please select a language"
  }

  if(!formData.address){
    newErrors.address="please select a address"
  }

  if (!formData.purchase_price) {
        newErrors.purchase_price = "purchase_price  is required";
      } else if (Number(formData.purchase_price) <= 0) {
        newErrors.purchase_price = "purchase_price must be a positive number";
      }

 if(!formData.no_of_bedrooms){
  newErrors.no_of_bedrooms="please select a no. of bedrooms"
 }
  if(!formData.property_type){
  newErrors.property_type="please select a property type"
 }
   if(!formData.leasehold_or_free){
  newErrors.leasehold_or_free="please select a leasehold or free"
 }


if(!formData.property_type){
  newErrors.property_type="please select propertytype"
}



if(!formData.buy_to_let){
  newErrors.buy_to_let="please select buy to let"
}
    setErrors(newErrors);
    console.log(errors)

    // if no errors, submit
    if (Object.keys(newErrors).length === 0) {
      console.log("✅ Form submitted:", formData);
      alert("");
          setModalopen(true)

    }

  };
  const [leasehold_or_free, setleasehold_or_free] = useState("");

  const leasehold_or_freeOptions = ["Leasehold", "Freehold"];

  const [bedrooms, setBedrooms] = useState("");


  const options = ["1", "2", "3", "4", "5", "5+"];

  const [propertyType, setPropertyType] = useState("");

  // const propertyTypeOptions = [
  //   { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
  //   { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
  //   { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
  //   { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
  // ];

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

 

  // const lang=[
  //   { id: 1, language_name: "English" },
  //   { id: 2, language_name: "Spanish" },
  //   { id: 3, language_name: "French" },
  //   { id: 4, language_name: "German" },
  //   { id: 5, language_name: "Chinese" },
  //   { id: 6, language_name: "Hindi" },
  //   { id: 7, language_name: "Arabic" },
  //   { id: 8, language_name: "Portuguese" },
  //   { id: 9, language_name: "Russian" },
  //   { id: 10, language_name: "Japanese" },
  // ]; 

  const [loginformdata, setloginformdata] = useState({
    email: "",
    password: "",
  });

  
  function handlelanguagechange(e) {
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

    const [loginformshow,setloginformshow]=useState(false)




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



            <form className="mt-8 space-y-10" >
              {/* 🏡 PURCHASE DETAILS */}
              <div className="space-y-6 mb-4">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">🏡</span> PURCHASE DETAILS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="flex flex-col">
        <label
          htmlFor="stages"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Stage:<span className="text-red-500">*</span>
        </label>

        <select
          id="stages"
          value={formData.stages}
          onChange={(e) => handleChange("stages", e.target.value)}
          className={`block w-full h-[44px] rounded-xl border px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10 ${
            errors.stages ? "border-red-500" : "border-gray-300"
          }`}
        >
             {stageOptions.map((stage) => (
              <option key={stage.id} value={stage.purchase_stage} >{stage.purchase_stage}</option>
             ))} 
{/* 
          <option value="">Please select</option>
          <option value="Initial Stage">Initial Stage</option>
          <option value="Just researching / budgeting">
            Just researching / budgeting
          </option>
          <option value="Have received an offer">
            Have received an offer
          </option>
          <option value="Sale agreed">Sale agreed</option> */}
        </select>

 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.stages ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.stages || "placeholder"} {/* placeholder keeps same height */}
</p>

      </div>

                  {/* 1. Property Address (Inline Input) */}
                   <div className="flex flex-col h-full">
                                             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                             Property address:<span className="text-red-500">*</span>
                                             </label>
                                                   <LocationSearch  onSelectAddress={(selectedAddress) => {
      setFormData({ ...formData, address: selectedAddress });

      if (errors.address) {
        setErrors({ ...errors, address: "" });
      }
    }} />

                                             {/* <!--<div className="relative mt-auto">
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
                                             </div>--> */}
 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.address ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.address || "placeholder"} {/* placeholder keeps same height */}
</p>
                                         </div>
     

                  {/* 2. Agreed purchase Price (Inline Input with Prefix) */}
                  <div className="flex flex-col h-full">
  <label htmlFor="purchase_price" className="block text-sm font-medium text-gray-700 mb-1">
    Agreed purchase price:<span className="text-red-500">*</span>
  </label>

  <div className="relative mt-auto">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
      £
    </span>

    <input
      id="purchase_price"
      name="purchase_price"
      type="number"
      value={formData.purchase_price || ""}
      onChange={(e) => {
        setFormData({ ...formData, purchase_price: Number( e.target.value ) });

        // clear error when typing
        if (errors.purchase_price) {
          setErrors({ ...errors, purchase_price: "" });
        }
      }}
      className={`block w-full h-[44px] rounded-xl border pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
    />
  </div>

 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.purchase_price ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.purchase_price || "placeholder"} {/* placeholder keeps same height */}
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
 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
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
                                {leasehold_or_freeOptions.map((opt) => (
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
                                 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.leasehold_or_free ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.leasehold_or_free || "placeholder"} {/* placeholder keeps same height */}
</p>
                                </div>

                            </div>

                            <div>

  <label className="block text-sm font-medium text-gray-700 mb-1">
    New build?
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, new_build: 1 }); // ✅ store numeric 1
      
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.new_build === 1
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>Yes</span>
    </button>

    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, new_build: 0 }); // ✅ store numeric 0
        if (errors.new_build) {
          setErrors({ ...errors, new_build: "" }); // clear error
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.new_build === 0
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>No</span>
    </button>
    
  </div>
  <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
 

</div>


                </div>
              
                <div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                            Property Type:<span className="text-red-500">*</span>
                            </label>

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
              </div>

              {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
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
 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
   errors.buy_to_let ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.buy_to_let || "placeholder"} {/* placeholder keeps same height */}
</p>
                           </div>


                  {/* 7. Government Right to Buy scheme? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Using Government Right to Buy scheme?
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, govt_buy_scheme: 1 }); // ✅ store 1 for yes
        if (errors.govt_buy_scheme) {
          setErrors({ ...errors, govt_buy_scheme: "" }); // clear error
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.govt_buy_scheme === 1
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>Yes</span>
    </button>

    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, govt_buy_scheme: 0 }); // ✅ store 0 for no
        if (errors.govt_buy_scheme) {
          setErrors({ ...errors, govt_buy_scheme: "" }); // clear error
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.govt_buy_scheme === 0
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>No</span>
    </button>
  </div>

<p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
</div>




<div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Obtaining a mortgage?
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, obtaining_mortgage: 1 }); // ✅ store 1 for yes
        if (errors.obtaining_mortgage) {
          setErrors({ ...errors, obtaining_mortgage: "" }); // clear error on change
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.obtaining_mortgage === 1
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>Yes</span>
    </button>

    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, obtaining_mortgage: 0 }); // ✅ store 0 for no
        if (errors.obtaining_mortgage) {
          setErrors({ ...errors, obtaining_mortgage: "" });
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.obtaining_mortgage === 0
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>No</span>
    </button>
  </div>
<p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
</div>




                  {/* 9. Mortgage Lender (Inline Select) */}
           {/* <div className="flex flex-col h-full">
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
               <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
             </div>
           </div> */}


                  {/* 10. Receiving a gifted deposit? (Inline Select) */}
                  <div className="flex flex-col h-full">
  <label htmlFor="gift_deposit" className="block text-sm font-medium text-gray-700 mb-1">
    Receiving a gifted deposit?
  </label>

  <div className="relative mt-auto">
    <select
      id="gift_deposit"
      name="gift_deposit"
      value={formData.gift_deposit || ""}
      onChange={(e) => {
        setFormData({ ...formData, gift_deposit: e.target.value });
        if (errors.gift_deposit) {
          setErrors({ ...errors, gift_deposit: "" });
        }
      }}
      className={`block w-full h-[44px] rounded-xl border px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10 ${
        errors.gift_deposit ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="" disabled>Select...</option>
      {[0, 1, 2, 3].map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>

    <ChevronDown
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>

<p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
</div>



                  {/* 11. Shared Ownership? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Shared Ownership via housing association?
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    <button
      type="button"
      onClick={() => {
        setFormData({ ...formData, ownership_housing_asso: 1 });
        if (errors.ownership_housing_asso) {
          setErrors({ ...errors, ownership_housing_asso: "" });
        }
      }}
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
      onClick={() => {
        setFormData({ ...formData, ownership_housing_asso: 0 });
        if (errors.ownership_housing_asso) {
          setErrors({ ...errors, ownership_housing_asso: "" });
        }
      }}
      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
        formData.ownership_housing_asso === 0
          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span>No</span>
    </button>
  </div>

<p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
</div>


                </div>
              </div> {/* End PURCHASE FINANCE */}

              {/* 🌐 SPECIAL INSTRUCTIONS */}

              {/* Prefer solicitor in your first language */}
              <div className="space-y-4">
  {/* Label + Main dropdown */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-semibold text-gray-800 mb-1">
      Prefer solicitor in your first language?
    </label>
    <div className="mt-2">
  

  
  <Select
    options={lang}
    isMulti
              instanceId="language-select"
    value={selectedLanguage || formData.languages}
    onChange={handleChangeLang}
    placeholder="Choose languages..."
    className="text-black mt-2"
  />
 
</div>
    <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
  </div>

 


  <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Select Lenders
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
    </div> {/* Show only when needed */}
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
               onClick={createguestuser}   >
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

