"use client";  // 
import React, { useState , useEffect,useRef  } from 'react'
import { Check, MapPin, ChevronDown , Home, DollarSign, Coins } from "lucide-react";  
import Link from "next/link";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Navbar from "../../parts/navbar/page";


import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Signinmodal from "../../components/utility/Singingmodal";
// src/components/ServiceSelection.js

export default function ServiceSelection() {
  const stageOptions = [
  { value: "Just researching / budgeting", label: "Just researching / budgeting" },
  { value: "Have received an offer", label: "Have received an offer" },
  { value: "Sale agreed", label: "Sale agreed" }
];
const sharedOwnershipOptions = [
  {value: "No", label: "Not Applicable"},
  { value: "Yes (housing association)", label: "Yes (housing association)" },
  { value: "Yes (Help To Buy)", label: "Yes (Help To Buy)" },
  { value: "No", label: "No" },
];
    const addition_applicable = [ 
      {label:"Not Applicable", value:""},
  { label: "Islamic Mortgage", value: "Islamic Mortgage" },
  { label: "Equity Transfer", value: "Equity Transfer" },
  { label: "Expats / Overseas Client", value: "Expats / Overseas Client" },
  {label:"Right to Buy", value:"Right to Buy"}
];

const partnerloginshow=false;

const sharedOwnershipStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "12px",
    borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
    "&:hover": {
      borderColor: "#1E5C3B",
    },
    fontSize: "14px",
    fontWeight: 500,
  }),
  option: (base, state) => ({
    ...base,
   backgroundColor: state.isFocused
      ? "#F6CE53"
      : "white",
    color: "#111",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
  }),
};
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "12px",
    borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
    "&:hover": {
      borderColor: "#1E5C3B",
    },
    fontSize: "14px",
    fontWeight: 500,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#F6CE53"
      : "white",  
    color: "#111",
    cursor: "pointer",
  }),
};
const lender_languagestyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#F6CE53"
      : state.isFocused
      ? "#F6CE53"
      : "white",
    color: "#111",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#F6CE53",
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#111827",
  }),
};
  const formFieldRefs = useRef({});
   const [addresskey,setaddresskey]=useState("");
  const [showAddressLines, setShowAddressLines] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [lender, setLender] = useState([
        { value: "Not Known", label: "Not Known", id: 0 },
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
  //shared_ownership: "",
    //existing_mortgage:"yes",
  existing_mortgage:0,
  languages:"",
  specal_instruction:"",
  lenders:"",  
  user_id:null,
  service_type:null,
  "addition_applicable" :"",
  // sales_mode can be 'personal' or 'company'
  sales_mode: "personal",
});

const [categoryVat, setCategoryVat] = useState({});
const [categoryServices, setCategoryServices] = useState([]);
const [selectedServicesoption, setSelectedServicesoption] = useState([]);
const [selectedAudience, setSelectedAudience] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedServiceIds, setSelectedServiceIds] = useState([]);

useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await getData(API_ENDPOINTS.Immigration_category_services);
      const services = response.CategoryService;

      if (Array.isArray(services)) {
        setCategoryServices(services);
        setSelectedServicesoption(
          services.map((item) => ({
            ...item,
            includeVat: false,
            fees: "",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  fetchServices();
}, []);

const categories = [
  ...new Set(
    categoryServices
      .filter((service) => service.target_audience === selectedAudience)
      .map((service) => service.category)
  ),
];

const filteredServices = categoryServices.filter(
  (service) =>
    service.target_audience === selectedAudience &&
    service.category === selectedCategory
);
 console.log("formdata:" , selectedServicesoption)

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
 const purchaseRef = useRef(null);
useEffect(() => {
  console.log(purchaseRef.current); // now defined
}, []);

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
  
  // Address validation - check based on whether manual address is being used
  if (showAddressLines) {
    // Manual address entry validation
    if (!formData.sales_address_line1 || !formData.sales_address_line1.trim()) {
      newErrors.sales_address_line1 = "Address line 1 is required";
    }
  }
  
  if (!formData.sales_country) {
  newErrors.sales_country = "Please select a country";
}

  if (!selectedLanguage || selectedLanguage.length === 0) {
    newErrors.preferLanguage = "Please select a language";
  }

  if (!selectedLenders || selectedLenders.length === 0 && formData.existing_mortgage==1) {
  newErrors.lenders = "Please select at least one lender";
}
// if(!formData.addition_applicable){
//       newErrors.addition_applicable="please select addition_applicable"
//     }

 
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

 
  //   if (!formData.shared_ownership) {
  //   newErrors.shared_ownership = "Please select a ownership";
  // }
 const errorOrder = [
      "sales_stages",
      "sales_country",
      "address",
      "sales_price",
      "sales_no_of_bedrooms",
      "sales_leasehold_or_free",
      "sales_property_type",
     // "shared_ownership",
      "existing_mortgage",
      "preferLanguage",
      "lenders",
      "addition_applicable"
    ];
    for (const field of errorOrder) {
      if (newErrors[field] || (field === "sales_country" && newErrors.sales_country) || (field === "address" && newErrors.address)) {
        const refKey = (field === "sales_country" || field === "address") ? "sales_address" : field;
        const element = formFieldRefs.current[refKey];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
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
            localStorage.setItem("service", JSON.stringify(1));

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
    const handleChange_l = (selectedOptions ) => {
       if (!selectedOptions) {
    setSelectedLenders(null);
    handleChange("lenders", null);
    return;
  }
       const hasNotRequired = selectedOptions.value === "Not Known";

    
    if (hasNotRequired) {
    const notRequiredOption = lender.find(
      (opt) => opt.value === "Not Known"
    );

    setSelectedLenders(notRequiredOption);
    console.log("Selected lender: Not Known");

    handleChange("lenders", [0]);
  } else {
    setSelectedLenders(selectedOptions);

    console.log("Selected lender:", selectedOptions.id);
    handleChange("lenders", [selectedOptions.id]);
  }}

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
     const addresskey = await getData(API_ENDPOINTS.api_key).then((value)=>value.data.postal_code);
           console.log(addresskey);
           setaddresskey(addresskey)
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
    
               setLender([{ value: "Not Known", id: 0,label: "Not Known" }, ...lenderOptions]);
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
                <div className="min-h-screen bg-white font">
                <div className="bg-white shadow-md sticky top-0 p-4 z-50">
                  <Navbar />
                </div>

                <main className="pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 mt-7">
                {/* Left stepper */}
                 <aside className="hidden lg:block z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-1/2 lg:h-[80vh] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white lg:top-22" style={{height: "88.5%"}}>
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

                {/* Right Form */}
                <section className="flex-1 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-8 lg:p-10 lg:ml-83 mt-8">
                    <nav
                    className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2"
                    aria-label="Breadcrumb"
                    >
                    <Link href="/" className="hover:text-[#1E5C3B]">Home</Link>
                    <span>/</span>
                    <span>Personal Details</span>
                    <span>/</span>
                    <span className="text-[#1E5C3B] font-medium">Service Details</span>
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900">
                    Share your Service Details
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                    We need a few details about the Service to get you the most accurate quotes.
                    </p>

                    <form className="mt-8 space-y-10">
                    {/* 🏡 SALES DETAILS */}

                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        < Home  className="w-7 h-7 text-[#1E5C3B]" /> SERVICE DETAILS
                        </h2>

                      <div className="mt-5 flex flex-col gap-5">
                        <div>
                          <label className="block text-sm font-medium text-[#6A7682] mb-2">
                            Target Audience<span className="text-red-500">*</span>
                          </label>

                          <div className="flex gap-3">
                            {["Individuals", "Businesses"].map((audience) => (
                              <button
                                key={audience}
                                type="button"
                                onClick={() => {
                                  setSelectedAudience(audience);
                                  setSelectedCategory("");
                                }}
                                className={`px-5 py-2 border rounded-md ${
                                  selectedAudience === audience
                                    ? "bg-[#1E5C3B] text-white"
                                    : "bg-white text-[#6A7682]"
                                }`}
                              >
                                {audience}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedAudience && (
                          <div>
                            <label className="block text-sm font-medium text-[#6A7682] mb-2">
                              Category<span className="text-red-500">*</span>
                            </label>

                            <div className="flex flex-wrap gap-3">
                              {categories.map((category) => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setSelectedServiceIds([]);
                                  }}
                                  className={`px-5 py-2 border rounded-md ${
                                    selectedCategory === category
                                      ? "bg-[#1E5C3B] text-white"
                                      : "bg-white text-[#6A7682]"
                                  }`}
                                >
                                  {category}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedCategory && (
                          <div>
                            <label className="block text-sm font-medium text-[#6A7682] mb-2">
                              Select Services<span className="text-red-500">*</span>
                            </label>

                            <div className="border rounded-md overflow-hidden">
                              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-3 font-medium text-[#6A7682]">
                                <div>Service Name</div>
                              </div>

                              {filteredServices.map((service) => {
                                const isSelected = selectedServiceIds.includes(service.id);

                                return (
                                  <div
                                    key={service.id}
                                    className="grid grid-cols-3 gap-4 items-center border-t p-3"
                                  >
                                    <label className="flex items-center gap-2 text-[#6A7682]">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(event) => {
                                          const includeService = event.target.checked;

                                          setSelectedServiceIds((previous) =>
                                            includeService
                                              ? [...previous, service.id]
                                              : previous.filter((id) => id !== service.id)
                                          );

                                          setSelectedServicesoption((previous) =>
                                            previous.map((item) =>
                                              item.id === service.id
                                                ? { ...item, service_support: includeService }
                                                : item
                                            )
                                          );
                                        }}
                                      />
                                      <span>{service.service_name}</span>
                                    </label>
                                  </div>
                                  
                                );
                              })}

                            </div>
                          </div>
                        )}
                      </div>
      
  
                    </form>
                    {modalopen && (
                        <Signinmodal closeModal={closeModal} partnerloginshow={partnerloginshow}></Signinmodal>
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
                </main>
                </div>
  );
}

