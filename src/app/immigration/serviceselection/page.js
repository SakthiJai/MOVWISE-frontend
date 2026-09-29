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


const partnerloginshow=false;


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

  const formFieldRefs = useRef({});
   const [addresskey,setaddresskey]=useState("");
  const [showAddressLines, setShowAddressLines] = useState(false);
      const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [lender, setLender] = useState([
        { value: "Not Known", label: "Not Known", id: 0 },
      ]);




  const [formData, setFormData] = useState({
   
  languages:"",
 
});


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


const fetched_Target_audience = [
  ...new Set(categoryServices.map(item => item.target_audience))
];


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
 
  if (!selectedLanguage || selectedLanguage.length === 0) {
    newErrors.preferLanguage = "Please select a language";
  }

   const selectedServices = selectedServicesoption.filter((service) =>
  selectedServiceIds.includes(service.id)
);


if (selectedServices.length === 0) {
  newErrors.service_error = "Please select at least one service";
} 

   setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
  const updatedFormData = {
    user_id: localStorage.getItem("user"),
     languages: selectedLanguage.id,
    services: selectedServices
   
  };

  setFormData(updatedFormData);
  console.log("updated formdata =>", updatedFormData);

       saveuser(updatedFormData);
}

     console.log("formasdfasdfdata =>", formData);
  
  };
   

   async function saveuser(formData){
      try{
        let res = await postData(API_ENDPOINTS.Immigration_createUser, formData);
        console.log(res);
      }
      catch(e){
        console.log(e);
      }
  }


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
                        <fieldset>
                          <legend className="block text-sm font-medium text-[#6A7682] mb-2">
                            Target Audience<span className="text-red-500">*</span>
                          </legend>

                          <div className="flex flex-wrap gap-3">
                            {fetched_Target_audience.map((audience) => (
                              <label
                                key={audience}
                                className={`flex min-w-[150px] cursor-pointer items-center gap-3 rounded-md border px-5 py-3 transition-colors ${
                                  selectedAudience === audience
                                    ? "border-[#1E5C3B] bg-[#F0F7F3] text-[#1E5C3B]"
                                    : "border-gray-300 bg-white text-[#6A7682] hover:border-[#1E5C3B]"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="targetAudience"
                                  value={audience}
                                  checked={selectedAudience === audience}
                                  onChange={() => {
                                    setSelectedAudience(audience);
                                    setSelectedCategory("");
                                  }}
                                  className="h-4 w-4 accent-[#1E5C3B]"
                                />
                                <span className="text-sm font-medium">{audience}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

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
                              <div className="bg-gray-100 p-3 font-medium text-[#6A7682]">
                                <div>Service Name</div>
                              </div>

                              <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredServices.map((service) => {
                                  const isSelected = selectedServiceIds.includes(service.id);

                                  return (
                                    <div
                                      key={service.id}
                                      className="flex items-center rounded-md  p-3"
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
                          </div>
                        )}

                        <div className="space-y-4">
                          <div ref={(element) => { formFieldRefs.current.preferLanguage = element; }}>
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                              Prefer solicitor in your first language? <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                              <Select
                                options={lang}
                                instanceId="language-select"
                                value={selectedLanguage || formData.languages}
                                styles={selectStyles}
                                onChange={(selectedOption) => {
                                  handleChangeLang(selectedOption);
                              
                                  if (errors.preferLanguage) {
                                    setErrors((previous) => ({ ...previous, preferLanguage: "" }));
                                  }
                                }}
                                placeholder="Choose languages..."
                                className="text-black mt-2"
                              />
                            </div>
                            <p className="text-[12px] mt-1 min-h-[16px] text-red-500">
                              {errors.preferLanguage}
                            </p>
                          </div>
                        </div>
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

