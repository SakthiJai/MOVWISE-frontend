"use client";  // 
import React, { useState , useEffect,useRef  } from 'react'
import { Check, MapPin, ChevronDown , Home, DollarSign, Coins } from "lucide-react";  
import Link from "next/link";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import Navbar from "../../parts/navbar/page";
import SalesPropertyDetails from "../../components/comparequotes/Sales_Property";
import PurchasePropertyDetails from "../../components/comparequotes/PurchasePropertyDetails";
import RemortagePropertyDetails from "../../components/comparequotes/RemortagePropertyDetails";
import EquityPropertyDetails from "../../components/comparequotes/EquityPropertyDetails";

import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Signinmodal from "../../components/utility/Singingmodal";
// src/components/ServiceSelection.js

export default function ServiceSelection() {
   const [instructloader, setinstructloader] = useState(false);
   const [cardid, setcardid] = useState();
const companydata = [
  {
    quote_id: "demo-quote-7",
    guest_id: "demo-user",
    legal_fees: 0,
    supplements: 0,
    disbursements: 0,
    conveying_details: {
      conveying_id: "7",
      company_name: "deva",
      logo: null,
      language: "Language 2",
      ratings: 4.5,
      recomended: 90,
      sra: 100,
      reliable: 85,
    },
    customer_details: { customer_id: "demo-customer" },
    service_details: [
      {
        quote_ref_id: "DEMO-7",
        quote_ref_number: "DEMO-7",
        taxInfo: { quote_id: "demo-tax-7" },
      },
    ],
  },
  {
    quote_id: "demo-quote-6",
    guest_id: "demo-user",
    legal_fees: 0,
    supplements: 0,
    disbursements: 0,
    conveying_details: {
      conveying_id: "6",
      company_name: "deva2",
      logo: null,
      language: "Language 2",
      ratings: 4.2,
      recomended: 82,
      sra: 95,
      reliable: 80,
    },
    customer_details: { customer_id: "demo-customer" },
    service_details: [
      {
        quote_ref_id: "DEMO-6",
        quote_ref_number: "DEMO-6",
        taxInfo: { quote_id: "demo-tax-6" },
      },
    ],
  },
];

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
const[comparequotespayload, setcomparequotespayload]=useState();
const [navigation,setnavigation]=useState(1);

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
        localStorage.setItem("comparequotes_refno",res.data.immigration_ref_number);

         let selectedServices = selectedServicesoption.filter((service) =>
  selectedServiceIds.includes(service.id))

         console.log(selectedServices)



               const comparequotesdata = {
    user_id: localStorage.getItem("user"),
    ref_no: localStorage.getItem("comparequotes_refno"),
    service_name: selectedServices[0]?.service_name,
    language:selectedLanguage.id
  }

  let quoteslist = await postData(API_ENDPOINTS.Immigration_CompareQuotes, comparequotesdata);
  console.log("quoteslist", quoteslist);
  localStorage.setItem("comparequotesdata", JSON.stringify(quoteslist.data));
  setnavigation(2);
      }
      catch(e){
        console.log(e);
      }
  }


  
    // ✅ Handle change
  

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
<>
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
    {navigation == 1 &&(<>
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
                  </>
                  )}


                     {navigation == 2  &&
                   (companydata?.map((quote, index) => (
                    <div
                      key={index}
                      className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full"
                    >
                      {/* Card Header */}
                      <div
                        className={`flex flex-col sm:flex-row items-center justify-between   ${index % 2 === 0 ? "bg-green-50" : "bg-red-50"
                          }  mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5`}
                      >
                     
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                                                       </p>
                           <button
  className="text-green-700 text-sm font-medium hover:underline cursor-pointer"
  onClick={() => {
    toggleDropdown(quote.conveying_details.conveying_id);

    if (window.innerWidth <= 768) {
      handleDownloadFromCard(quote);
    }
  }}
>
  <u>Price Breakdown</u>
</button>


                          </div>
                       
                        </div>
                      </div>

                      {/* Expandable Content */}

                      <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          {/* Left: Reviews - Static placeholder */}
                          <div className="flex flex-col">
                            <div className="flex items-center">
                            
                              <span className="pl-2 font-bold text-green-700">
                                {quote.conveying_details.ratings || 4} out of 5
                              </span>
                            </div>
                           <div className="flex gap-4 mt-3 text-green-700">
  
                            {/* Recommended */}
                            <div className="flex flex-col items-center text-green-700">
                           {/*    <CircularProgress progress={quote.conveying_details.recomended || 80} /> */}
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Rated
                              </span>
                            </div>

                            {/* SRA */}
                            <div className="flex flex-col items-center text-green-700">
                           {/*    <CircularProgress progress={quote.conveying_details.sra || 90} /> */}
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Regulated
                              </span>
                            </div>

                            {/* Reliable */}
                            <div className="flex flex-col items-center text-green-700">
                              {/* <CircularProgress progress={quote.conveying_details.reliable || 85} /> */}
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Reliable
                              </span>
                            </div>

                          </div>

                          

                          </div>

                          {/* Middle: Features - Static placeholder */}
                          <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">

                          </ul>

                          {/* Right: Buttons */}
                          <div className="flex flex-row gap-2 justify-start lg:col-start-3 lg:justify-end">

                          
                            <button
                              disabled={instructloader}
                              className={`px-3 py-1.5 rounded-full text-sm cursor-pointer
                                ${instructloader
                                  ? "bg-[#4A7C59]/70 cursor-not-allowed"
                                  : "bg-[#4A7C59] hover:bg-[#3b6248] text-white"}
                                      mx-auto  // This will center the button horizontally
                                      block md:inline-block  // Ensures it is block on mobile and inline-block on desktop`}
                              onClick={() => {

                                 toggleDropdown(quote.conveying_details.conveying_id);

                                  handleInstructFromCard(
                                    quote.conveying_details.company_name,
                                    quote.guest_id,
                                    quote.conveying_details.conveying_id,
                                    quote.quote_id,
                                    quote.customer_details.customer_id,
                                    quote?.service_details[0]?.taxInfo?.quote_id,
                                    quote.service_details[0].quote_ref_number,
                                    quote
                                  );

                              }

                              }
                            >
                              {instructloader ? "Processing..." : "Instruct"}
                            </button>

                          </div>
                        </div>
                       






                        {cardid === quote.conveying_details.conveying_id && viewquotes && (
                          <div className="fixed inset-0  z-50 flex items-center justify-center  top-10  animate-fadeIn">
                            <div className="bg-white h-[200px] rounded-2xl  w-[90%] min-h-screen overflow-y-auto text-center shadow-2xl border border-green-200 animate-popIn">
                             <div className="absolute  right-4 md:top-3 md:right-32">
                                <button
                                  className="text-3xl md:text-4xl text-gray-700 p-2 md:p-0"
                                  onClick={() => showviewquotes(false)}
                                >
                                  ×
                                </button>
                              </div>


                              <div className="font-family min-h-screen p-5  text-black">
                                {/* ---------- TOP BUTTONS ---------- */}
                                <div className="grid grid-cols-12 items-center m-3 md:m-6 px-2 md:px-4">
                                      {/* Back button - Left */}
                                      <div className="col-span-4 md:col-span-1 flex justify-start">
                                        <button
                                          className="border px-2 py-1.5 md:px-4 md:py-2 rounded text-emerald-600 text-xs sm:text-sm"
                                          onClick={() => showviewquotes(false)}
                                        >
                                          Back
                                        </button>
                                      </div>

                                      {/* Center Title */}
                                      <div className="col-span-4 md:col-span-8 flex justify-center">
                                        <span className="text-[18px] sm:text-[22px] md:text-[34px] p-1 md:p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center truncate max-w-full">
                                          <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto md:mx-0"
                                        />
                                        </span>
                                      </div>

                                      {/* Instruct button - Right */}
                                      <div className="col-span-4 md:col-span-3 flex justify-end">
                                        <button
                                          disabled={instructloader}
                                          className={`border px-2 py-1.5 md:px-4 md:py-2 rounded text-xs sm:text-sm cursor-pointer
                                            ${
                                              instructloader
                                                ? "opacity-50 cursor-not-allowed"
                                                : "text-emerald-600"
                                            }`}
                                                onClick={() => {
                                                  handleInstructFromCard(
                                                    quote.conveying_details.company_name,
                                                    quote.guest_id,
                                                    quote.conveying_details.conveying_id,
                                                    quote.quote_id,
                                                    quote.customer_details.customer_id,
                                                    quote?.service_details[0]?.taxInfo?.quote_id,
                                                    quote.service_details[0].quote_ref_number,
                                                    quote
                                                  );
                                                }}

                                        >
                                          {instructloader ? "Processing..." : "Instruct"}
                                        </button>
                                         {/* <button className="border px-4 py-2 rounded text-emerald-600 text-sm" onClick={generatePDF}>
      Download
    </button> */}
                                      </div>
                                    </div>

                                {instructloader && (
                                  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/5 backdrop-blur-sm">
                                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"></div>
                                    <div className="mt-1 text-gray-600">
                                      Processing...
                                    </div>
                                  </div>

                                )}


                                {/* ---------- MAIN CONTAINER ---------- */}
                                  <div ref={pdfRef} id="quote-popup" className="quote-mobile border rounded-lg bg-transparent shadow px-6 py-2 mb-2 space-y-2 quotes" style={{
                                  backgroundColor: 'transparent',
                                  color: 'black',
                                  padding: '24px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                  fontFamily: 'Arial, sans-serif',
                                  lineHeight: '1.6',
                                  maxWidth: '100%',
                                  overflow: 'auto'
                                }}>
                                  {/* ---------- COMPANY LOGO + RATING ---------- */}
                                  <table className="w-full font  border-collapse mb-6">
                                    <tbody>
                                      {/* Company Logo Row */}
                                      <tr>
                                        <td colSpan="2" className="pdf-logo-cell p-4 text-left md:text-left text-center">
                                      {view_data?.appsetting_details?.logo ? (
                                        <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto"
                                        />
                                      ) : (
                                        <span className="block text-[22px] sm:text-[28px] md:text-[34px] me-1 p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center md:text-left">
                                          {view_data?.appsetting_details?.company_name || "MovWise"}
                                        </span>
                                      )}
                                    </td>


                                        <td>

                                        </td>
                                        {/* <td colSpan="2" className="p-3"> 
                                             <span className="text-[34px] col-span-2 me-1 p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
                                                {view_data?.appsetting_details?.company_name || "MovWise"}
                                              </span> 
                                             </td> */}
                                      </tr>

                                      {/* Contact Details and User Details in Single Row */}
                                 <tr className="border-gray-200 block md:table-row">
                                        {/* Contact Details Column */}
                                        <td className="p-1 border-gray-200 align-top w-full md:w-1/2 block md:table-cell">
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                            <h4 className="font-semibold text-emerald-700 mb-3">Conveyancer Details</h4>
                                            <div className="space-y-2">
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Name:</span>
                                                <span className="text-sm">{quote.conveying_details.company_name || "N/A"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Phone:</span>
                                                <span className="text-sm">{view_data?.appsetting_details?.phone_number || "N/A"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Email:</span>
                                                <a
                                                  href={`mailto:${view_data?.appsetting_details?.email}`}
                                                  className="text-emerald-600 text-sm break-all"
                                                >
                                                  {view_data?.appsetting_details?.email}
                                                </a>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Quote Ref:</span>
                                                <span className="text-sm">{quote.service_details[0].quote_ref_id || "--"}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>

                                        {/* User Details Column */}
                                        <td className="p-1 align-top w-full md:w-1/2 block md:table-cell mt-2 md:mt-0">
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                            <h4 className="font-semibold text-emerald-700 mb-3">Client Details</h4>
                                            <div className="space-y-2">
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Name:</span>
                                                <span className="text-sm">
                                                  {quote?.customer_details?.first_name} {quote?.customer_details?.last_name}
                                                </span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Email:</span>
                                                <span className="text-sm break-all">{quote?.customer_details?.email || "--"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Phone:</span>
                                                <span className="text-sm">{quote?.customer_details?.phone_number || "--"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Address:</span>
                                                <span className="text-sm">{quote?.service_details[0]?.address || "--"}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>

                                    </tbody>
                                  </table>

                                  {/* ---------- YOUR DETAILS ---------- */}

                                  <div className="grid grid-cols-1 font gap-6">
                                    <div className="">


                                      {view_data.service_details.length == 1 && (<>
                                        {(view_data.service_details[0].service_type == 1) && <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                    {(view_data.service_details[0].service_type == 4) && <RemortagePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 2) && <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                        {(view_data.service_details[0].service_type == 5) && <EquityPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}  </>
                                        
                                      )}
                                      {view_data.service_details.length > 1 && (<>
                                        <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  /> <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[1]} companydata={companydata} cardid={cardid} taxDetails={taxDetails2} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} /></>)}

                                    </div>



                                  </div>

                                  {/* ---------- FEES SECTION ---------- */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="">
                                    </div>

                                  </div>


                                  <div className="  w-full"></div>

                                  {/* ---------- NOTES ---------- */}
                                  <div className="font">
                                    <h4>Notes</h4>

                                    {quote?.conveying_details?.notes ? (
                                      <div
                                        className="text-xs mt-4 font  text-start"
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(quote.conveying_details.notes),
                                        }}
                                      />
                                    ) : (
                                      <p className="text-xs mt-4">
                                        No notes provided by the firm.
                                      </p>
                                    )}
                                  </div>

                                </div>

                                
                                <div ref={pdfRef} id="quote-popup" className=" quote-desktop border rounded-lg bg-transparent shadow px-6 py-2 mb-2 space-y-2 quotes" style={{
                                  backgroundColor: 'transparent',
                                  color: 'black',
                                  padding: '24px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                  fontFamily: 'Arial, sans-serif',
                                  lineHeight: '1.6',
                                  maxWidth: '100%',
                                  overflow: 'auto'
                                }}>
                                  {/* ---------- COMPANY LOGO + RATING ---------- */}
                                  <table className="w-full font  border-collapse mb-6">
                                    <tbody>
                                      {/* Company Logo Row */}
                                      <tr>
                                        <td colSpan="2" className="pdf-logo-cell p-4 text-left md:text-left text-center">
                                      {view_data?.appsetting_details?.logo ? (
                                        <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto md:mx-0"
                                        />
                                      ) : (
                                        <span className="block text-[22px] sm:text-[28px] md:text-[34px] me-1 p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center md:text-left">
                                          {view_data?.appsetting_details?.company_name || "MovWise"}
                                        </span>
                                      )}
                                    </td>


                                        <td>

                                        </td>
                                        {/* <td colSpan="2" className="p-3"> 
                                             <span className="text-[34px] col-span-2 me-1 p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
                                                {view_data?.appsetting_details?.company_name || "MovWise"}
                                              </span> 
                                             </td> */}
                                      </tr>

                                      {/* Contact Details and User Details in Single Row */}
                                      <tr>
                                        <td style={{ width: "50%", verticalAlign: "top", padding: "10px" }}>
                                          <div
  className="pdf-info-card"
  style={{
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "6px"
  }}
>
                                            <h4 style={{ color: "#059669", marginBottom: "12px", textAlign: "center" }}>
                                              Conveyancer Details
                                            </h4>

                                            <div style={{ fontSize: "13px", lineHeight: "1.6",textAlign: "left" }}>
                                              <div><strong>Name:</strong> {quote.conveying_details.company_name || "N/A"}</div>
                                              <div><strong>Phone:</strong> {view_data?.appsetting_details?.phone_number || "N/A"}</div>
                                              <div><strong>Email:</strong> {view_data?.appsetting_details?.email || "N/A"}</div>
                                              <div><strong>Quote Ref:</strong> {quote.service_details[0].quote_ref_id || "--"}</div>
                                            </div>
                                          </div>
                                        </td>

                                        <td style={{ width: "50%", verticalAlign: "top", padding: "10px" }}>
                                        <div
  className="pdf-info-card"
  style={{
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "6px"
  }}
>
                                            <h4 style={{ color: "#059669", marginBottom: "12px",textAlign: "center" }}>
                                              Client Details
                                            </h4>

                                            <div style={{ fontSize: "13px", lineHeight: "1.6",textAlign: "left" }}>
                                              <div>
                                                <strong>Name:</strong> {quote?.customer_details?.first_name} {quote?.customer_details?.last_name}
                                              </div>
                                              <div><strong>Email:</strong> {quote?.customer_details?.email || "--"}</div>
                                              <div><strong>Phone:</strong> {quote?.customer_details?.phone_number || "--"}</div>
                                              <div><strong>Address:</strong> {quote?.service_details[0]?.address || "--"}</div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>

                                    </tbody>
                                  </table>

                                  {/* ---------- YOUR DETAILS ---------- */}

                                  <div className="grid grid-cols-1 font gap-6">
                                    <div className="">


                                      {view_data.service_details.length == 1 && (<>
                                        {(view_data.service_details[0].service_type == 1) && <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                        {(view_data.service_details[0].service_type == 2) && <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 4) && <RemortagePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 5) && <EquityPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language}lenders={lenders}/>}  </>
                                      )}
                                      {view_data.service_details.length > 1 && (<>
                                        <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} /> <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[1]} companydata={companydata} cardid={cardid} taxDetails={taxDetails2} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} /></>)}

                                    </div>



                                  </div>

                                  {/* ---------- FEES SECTION ---------- */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="">
                                    </div>

                                  </div>


                                  <div className="  w-full"></div>

                                  {/* ---------- NOTES ---------- */}
                                  <div className="font pdf-notes-section"
                                   style={{ pageBreakBefore: "always" }}>
                                    <h4>Notes</h4>

                                    {quote?.conveying_details?.notes ? (
                                      <div
                                        className="text-xs mt-4 font  text-start"
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(quote.conveying_details.notes),
                                        }}
                                      />
                                    ) : (
                                      <p className="text-xs mt-4">
                                        No notes provided by the firm.
                                      </p>
                                    )}
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                  )))
                  }
                </section>
                </div>
                </main>
                </div> 

               
                  </>
            
  );
}

