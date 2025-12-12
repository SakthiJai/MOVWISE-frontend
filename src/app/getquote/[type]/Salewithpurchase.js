"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import Select from "react-select"; //imp
import { API_ENDPOINTS, getData,postData } from "../../auth/API/api";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import Signinmodal from "../../components/utility/Singingmodal";
import LocationSearch, { fetchAddressDetails } from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';



const Link = ({ href, children, className }) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);



export default function Salewithpurchase() {
    const [buytolet_readonlyfield,setbuytolet_readonlyfield]=useState(false);

  const [showAddressLines_purchase, setShowAddressLines_purchase] = useState(false);
    const [showAddressLines, setShowAddressLines] = useState(false);

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
    [`town`]: "",
    [`country`]: "",
  }));
};
 const closeModal = () => {
    console.log("closing...");
    setModalopen(false);
  };

const handleUnknownPostcode_purchase = () => {
  // 1️⃣ Condition: user clicked "I don’t know the postcode yet"
  setShowAddressLines_purchase(true); // show address fields

  // 2️⃣ Reset address-related fields
  setFormData(prev => ({
    ...prev,
    [`address_purchase`]: "",          // ← THIS is the missing one
    [`selectedId_purchase`]: "",
    [`address_line1_purchase`]: "",
    [`address_line2_purchase`]: "",
    [`town_purchase`]: "",
    [`country_purchase`]: "",
  }));
};

const [rawValue, setRawValue] = useState("");
const [rawValuePurchase, setRawValuePurchase] = useState("");
useEffect(() => {
  const storedData = localStorage.getItem("getquote");

  if (storedData) {
    setFormData(JSON.parse(storedData));
  }
  fetchdata()
}, []);
   const [formData, setFormData] = useState({
    sales_address: "",
    sales_address_line1: "",    
    sales_address_line2: "",
    sales_country: "",
    sales_city: "",
    price: "",
    bedrooms: "",
    tenure: "", 
    propertyType: "",
    sharedOwnership: "",
    sales_shared_ownership:"",
    purchase_address: "",
    purchase_address_line1: "",
    purchase_address_line2: "",
    purchase_country: "",
    purchase_town: "",
    purchase_price: "",
    purchase_mode:"",
    bedrooms_purchase: "",
    tenure_purchase: "", 
    propertyType_purchase: "",
    sharedOwnership_purchase: "",
    buy_to_let:"",
    languages:[],
    service_type:1
  });
  const [postData, setPostData] = useState({user_id: null, guest_user: null, service_type: null,
  // SALES FIELDS
  sales_address_line1: "",sales_address_line2: "", sales_city: null, sales_country: null,
  sales_stages: null,sales_address: "",sales_price: "",sales_no_of_bedrooms:null,
  sales_property_type: null,
  sales_leasehold_or_free: null,

  // PURCHASE FIELDS
  address_line1: "",
  address_line2: "",
  town_city: null,
  country: null,
  stages: null,
  address: "",
  no_of_bedrooms: null,
  property_type: null,
  leasehold_or_free: null,
  purchase_price: null,

  // ADDITIONAL FIELDS
  sales_shared_ownership: null,
  existing_mortgage: null,
  new_build: null,
  buy_to_let: null,
  govt_by_scheme:null,
  obtaining_mortgage: null,
  gift_deposit: null,
  ownership_housing_asso: null,
  specal_instruction: null,

  // ARRAYS
  languages: null,
  lenders: null
});

     const stampDutyOptions = [
  { label: "Standard Residential", value: "standard" },
  { label: "First-Time Buyer Relief", value: "firstTime" },
  { label: "Additional Property (Second Home)", value: "additional" },
  { label: "Additional Property (Buy to let)", value: "Buy to let" },
  { label: "Commercial / Non-Residential", value: "commercial" }
];


  const [errors, setErrors] = useState({});
  
  const [lender, setLender] = useState([
      { value: "Not Known", label: "Not Known", id: 0 },
    ]);
     const [loginformdata, setloginformdata] = useState({
            email: "",
            password: "",
          });


const handleChange = (name,value) => {
  if(name=="purchase_mode" && (value=="firstTime"|| value=="standard"||value=="additional") ){
    console.log("check")
    setbuytolet_readonlyfield(true);
    formData.buy_to_let="No"
  }
  else{
    setbuytolet_readonlyfield(false);
  }
  //const { name, value } = e.target;

  if (name === "price") {
    const cleaned = value.replace(/[^0-9.]/g, ""); 
    setRawValue(cleaned); 
    setFormData((prev) => ({ ...prev, price: cleaned })); 
  }
  else if (name === "sales_price" || name === "purchase_price") {
  const cleaned = value.replace(/[^0-9.]/g, "");

    const numericValue = Number(value);
    setRawValue(cleaned);
    setFormData((prev) => ({ ...prev, [name]: cleaned}));
  }
  else if (name === "phone") {
    const numericValue = value.replace(/\D/g, "").slice(0, 12);
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  }
  else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  //console.log(formData);
  setErrors((prev) => ({ ...prev, [name]: "" }));
};


useEffect(() => {
    if (rawValuePurchase === "") return;

    const timer = setTimeout(() => {
      const num = Number(rawValuePurchase.replace(/,/g, ""));

      if (!isNaN(num)) {
        // Format as UK number WITHOUT pound symbol
        const formatted = new Intl.NumberFormat("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(num);

       // setValue(formatted);
         setFormData((prev) => ({ ...prev, purchase_price: formatted }))
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [rawValuePurchase])



  const validate = () => {
    const newErrors = {};
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}
  
  
  const handleContinue = (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log("✅ Valid form data:", formData);
                  localStorage.setItem("service", JSON.stringify(1));

      localStorage.setItem("getquote", JSON.stringify(formData));
      if(localStorage.getItem("user")){
            formData.user_id=localStorage.getItem("user");
            localStorage.setItem("getquote", JSON.stringify(formData));
            router.push("/components/comparequotes");
          }
          else{
          setModalopen(true)
          }
    }
     else {
      console.log("❌ Validation failed:", errors);
    }
  };
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
  

    const [selectedLenders, setSelectedLenders] = useState([]);
        
      
        // Convert lenders into react-select format
        const options_l = lender.map((lender) => ({//imp
          value: lender.id,
          label: lender.lenders_name,
        }));
      
        
    const handleChange_l = (selectedOptions = []) => {
      const hasNotRequired = selectedOptions.some(
        (option) => option.value === "Not Known"
      );
    
      if (hasNotRequired) {
        // Keep only "Not Required" selected
        const notRequiredOption = lender.find(opt => opt.value === "Not Known");
        setSelectedLenders([notRequiredOption]);
        console.log("Selected lenders: [0]");
        
     handleChange({
    target: {
      name:"lender",
     value: [0]
    }
  })
      } else {
        // Normal behavior for other lenders
        setSelectedLenders(selectedOptions);
        const ids = selectedOptions.map(item => item.id);
         setFormData((prev) => ({ ...prev, ["lender"]: ids }));
        console.log("Selected lenders:", ids);
      /*handleChange({
    target: {
     name: "lender",
      value:ids
    }
  });*/
      }
    };
    
    const [lang, setLang] = useState ([
        { value: "Not Required", label: "Not Required", id: 0 },
      ]);
          const [selectedLanguage, setSelectedLanguage] = useState([]);
      

      const [modalopen, setModalopen] = useState(false);
      const [languagepreference, setlanguagepreference] = useState(" ");
      const [language, setLanguage] = useState([]);

    
      const [tenure, setTenure] = useState("");

     const tenureOptions = ["Leasehold", "Freehold"];

     const [bedrooms, setBedrooms] = useState("");
        const [loginformshow,setloginformshow]=useState(false)

     const options = ["1", "2", "3", "4","5", "5+"];

     const [propertyType, setPropertyType] = useState("");
        const propertyTypeOptions = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
                  ];
      
        
        const router = useRouter();

        // Initial state for the toggle buttons
        const [scheme, setScheme] = useState("yes");
        const [mortgage, setMortgage] = useState("yes");
        const [newBuild, setNewBuild] = useState("yes");
        const [sharedOwnership, setSharedOwnership] = useState("yes");


        //purchase
              const [tenure_purchase, setTenure_purchase] = useState("");

     const tenureOptions_purchase = ["Leasehold", "Freehold"];

     const [bedrooms_purchase, setBedrooms_purchase] = useState("");

     const options_purchase = ["1", "2", "3", "4","5", "5+"];

     const [propertyType_purchase, setPropertyType_purchase] = useState("");
        const propertyTypeOptions_purchase = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
                  ];
        

            const [formData_purchase, setFormData_purchase] = useState({
            sharedOwnership: "",
            existingMortgage: "",
        });

        const handleChange_purchase = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
        
        const router_purchase = useRouter();

        // Initial state for the toggle buttons
        const [scheme_purchase, setScheme_purchase] = useState("yes");
        const [mortgage_purchase, setMortgage_purchase] = useState("yes");
        const [newBuild_purchase, setNewBuild_purchase] = useState("yes");
        const [sharedOwnership_purchase, setSharedOwnership_purchase] = useState("yes");

          function   handlelanguagechange(e){
      console.log(e.target.value);
          setlanguagepreference(e.target.value);
          setLanguage([]); 
       }

       function languagecheckboxchange(item,checked){
    if(checked){
setLanguage(prev => [...prev, item]);
console.log(language);

    }
    else{
      setLanguage(prev=>prev.filter(lang=>lang!==item))
    }
        
      
       }
         const handleChangeLang = (selectedOptions = []) => {
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
                    handleChange("languages",selectedOptions.id);
      } else {
        // Normal behavior for other lenders
        setSelectedLanguage(selectedOptions);
      
        handleChange("languages",selectedOptions.id);
  console.log(selectedOptions.id)
      }
    
  }
  const onSelectAddress = (type) => async (selected) => {
  if (!selected) return;

  // Clear purchase error if there was one
  clearAddressError();

  // Save the selected address
  saveSelectedAddress(selected);

  // Fetch full details based on selected address
  await fetchAddressDetailsAndUpdate(selected.udprn,type);
};

// Function to clear the address error
const clearAddressError = () => {
  if (errors.address) {
    setErrors((prev) => ({ ...prev, address: "" }));
  }
};

// Function to save selected address and update formData
const saveSelectedAddress = (selected) => {
  setFormData((prev) => ({
    ...prev,
    selectedId_purchase: selected.id,
    address: selected.suggestion,
  }));
};

// Function to fetch full address details based on UDPRN
const fetchAddressDetailsAndUpdate = async (udprn,type) => {
  const details = await fetchAddressDetails(udprn);

  if (details) {
    updateFormDataWithAddressDetails(details,type);
  } else {
    setErrors((prev) => ({
      ...prev,
      address: "Failed to fetch full address details.",
    }));
  }
};

// Function to update formData with address details
const updateFormDataWithAddressDetails = (details,type) => { console.log(details,type)
  if(type=="sales"){
     setFormData((prev) => ({
    ...prev,
    sales_city: details.post_town || details.admin_district || "",
    sales_country: details.country || "",
  }));
  }
  else{
  setFormData((prev) => ({
    ...prev,
    purchase_city: details.post_town || details.admin_district || "",
    purchase_country: details.country || "",
  }));
}
};


  async function fetchdata() {
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
        
                 console.log(languages);
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
         function handleloginformchange(name, value) {
      setloginformdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
        return (

                            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left stepper */}
           <aside className="z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)]  lg:max-h-[600px] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white   lg:top-22">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    What stage are you at?
                                </label>
                                <select value={formData.sales_stages}  onChange={(e)=>{handleChange("sales_stages",e.target.value)}} id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                    {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                    <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>


                        {/* 1. Property Address (Inline Input) */}
                       <div className="flex flex-col h-full">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                         Property address:<span className="text-red-500">*</span>
                         </label>
                        <LocationSearch readOnly={showAddressLines}   onSelectAddress={onSelectAddress("sales")}  />

                           <div className="flex justify-between items-center mt-1">
                              <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                              errors.sales_address ? "text-red-500 opacity-100" : "opacity-0" }` } >
                              {errors.sales_address || "placeholder"} {/* placeholder keeps same height */}
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
                    prefix="sales_"
                      formData={formData}
                      errors={errors}
                      showAddressLines={showAddressLines} // only used inside AddressFields
                      onChange={(field, value) =>
                        setFormData((prev) => ({ ...prev, [field]: value }))
                      }
                    />

                        {/* 2. Agreed SALES Price (Inline Input with Prefix) */}
                        <div className="flex flex-col h-full">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Agreed Sales price:<span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                £
                            </span>
                             <input
                                id="price"
                                name="price"
                                type="text"
                                value={formData.sales_price ?? ""} 
                                onChange={(e)=>{handleChange("sales_price",e.target.value)}} 
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                              />
                              

                            
                             </div>
                           
                            {errors.sales_address && (
                                <span className="text-red-500 text-xs mt-1">{errors.sales_price}</span>
                              )}
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
        onClick={() => {
          // ✅ update formData
          setFormData((prev) => ({ ...prev, sales_no_of_bedrooms: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, sales_no_of_bedrooms: "" }));
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

  {errors.sales_no_of_bedrooms && (
    <p className="text-red-500 text-[12px] mt-1">{errors.sales_no_of_bedrooms}</p>
  )}
</div>

                    
                        {/* 4. Leasehold or Freehold (Inline Select) */}
                        <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Leasehold or Freehold?<span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-2 gap-3 mt-auto">
    {tenureOptions.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
          // ✅ update formData
          setFormData((prev) => ({ ...prev, tenure: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, tenure: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
          formData.tenure === opt
            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
  {errors.tenure && (
    <p className="text-red-500 text-[12px] mt-1">{errors.tenure}</p>
  )}
</div>

                        </div>
                       <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Property Type:<span className="text-red-500">*</span>
  </label>

  <div className="flex flex-wrap gap-9">
    {propertyTypeOptions.map((opt) => (
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
  {errors.sales_property_type && (
    <p className="text-red-500 text-[12px] mt-1">{errors.sales_property_type}</p>
  )}

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
                          htmlFor="sharedOwnership"
                          className="block text-[14px] text-[#6A7682] font-medium mb-2"
                        >
                          Shared Ownership<span className="text-red-500">*</span>
                        </label>
                        <select
                          id="sharedOwnership"
                          name="sharedOwnership"
                          value={formData.sales_shared_ownership}
                          onChange={(e)=>{handleChange("sales_shared_ownership",e.target.value)}} 
                          className={"block w-full h-[44px] rounded-xl border px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"}
                        >
                          {["Please select","Yes (housing association)","Yes (Help To Buy)","No"].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.sharedOwnership && (
                          <p className="text-red-500 text-[12px] mt-1">{errors.sharedOwnership}</p>
                        )}
                      </div>

                      {/* Existing Mortgage */}
                    <div className="flex flex-col h-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Existing mortgage to redeem?
                            </label>
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button
                                type="button"
                                onClick={() => setScheme("yes")}
                                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                scheme === "yes"
                                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>Yes</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setScheme("no")}
                                className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                                scheme === "no"
                                    ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <span>No</span>
                            </button>
                            </div>
                        </div>
                        </div>
 {/* 🏡 PURCHASE DETAILS */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <span className="text-2xl">🏡</span> PURCHASE DETAILS
                          </h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="">
                               <label className="block text-sm font-medium text-gray-700 mb-1">
                                 What stage are you at?
                                </label>
                                 <select  value={formData.stages}  onChange={(e)=>{handleChange("stages",e.target.value)}}  id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>               
                                  {/* 1. Property Address (Inline Input) */}
                <div className="flex flex-col h-full">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                         Property address:<span className="text-red-500">*</span>
                         </label>
                        <LocationSearch readOnly={showAddressLines}   onSelectAddress={onSelectAddress("purchase")}  />

                                          <div className="flex justify-between items-center mt-1">
                                            {/* Left: Error message */}
                                            <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                              errors.address ? "text-red-500 opacity-100" : "opacity-0"
                            }`}>
                              {errors.address || "placeholder"} {/* placeholder keeps same height */}
                            </p>

                    {/* “I don’t know postcode” button */}
                    {!showAddressLines_purchase && (
                      <button
                        type="button"
                        onClick={handleUnknownPostcode_purchase}
                        className="text-blue-600 underline text-xs"
                      >
                        I don’t know the postcode yet
                      </button>
                    )}
                  </div>
                </div>


                {/* Always render AddressFields */}
<AddressFields
  prefix="purchase_"
  formData={formData}
  errors={errors}
  showAddressLines={showAddressLines_purchase}
  onChange={(field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
/>
                    
                                 {/* 2. Agreed purchase Price (Inline Input with Prefix) */}
                                   <div className="flex flex-col h-full">
  <label
    htmlFor="price_purchase"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Agreed purchase price:<span className="text-red-500">*</span>
  </label>

  <div className="relative mt-auto">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
      £
    </span>

    <input
      id="price_purchase"
      name="price_purchase"
      type="text"
      value={formData.purchase_price}
      onChange={(e)=>{handleChange("purchase_price",e.target.value)}} 
      placeholder="Enter purchase price"
      className={`block w-full h-[44px] rounded-xl border pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
    />
  </div>

  {errors.purchase_price && (
    <span className="text-red-500 text-xs mt-1">{errors.purchase_price}</span>
  )}
</div>

                    {/* 3. Number of Bedrooms (Inline Select) */}
<div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Number of Bedrooms:<span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
    {options_purchase.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
          // ✅ Update form data
          setFormData((prev) => ({ ...prev, no_of_bedrooms: opt }));
          setBedrooms_purchase(opt);
          // ✅ Clear error when clicked
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

  {errors.no_of_bedrooms && (
    <p className="text-red-500 text-[12px] mt-1">{errors.no_of_bedrooms}</p>
  )}
</div>

{/* 4. Leasehold or Freehold (Inline Select) */}
<div className="flex flex-col gap-6">
  <div className="flex flex-col h-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Leasehold or Freehold?<span className="text-red-500">*</span>
    </label>

    <div className="grid grid-cols-2 gap-3 mt-auto">
      {tenureOptions_purchase.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => {
            // ✅ Update form data
            setFormData((prev) => ({ ...prev, leasehold_or_free: opt }));
            setTenure_purchase(opt);
            // ✅ Clear error when clicked
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

    {errors.leasehold_or_free && (
      <p className="text-red-500 text-[12px] mt-1">{errors.leasehold_or_free}</p>
    )}
  </div>
</div>


                       <div >
                    <div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        New build?
      </label>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        {/* YES button */}
        <button
          type="button"
          onClick={() => setNewBuild_purchase("yes")}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            newBuild_purchase === "yes"
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Yes
        </button>

        {/* NO button */}
        <button
          type="button"
          onClick={() => setNewBuild_purchase("no")}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            newBuild_purchase === "no"
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          No
        </button>
      </div>
      </div>
      </div>
      </div>
    
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type:<span className="text-red-500">*</span>
                </label>
               <div className="flex flex-wrap gap-9">
             {propertyTypeOptions_purchase.map((opt) => (
                <button
                    key={opt.label}
                    type="button"
                    onClick={() => setPropertyType_purchase(opt.label)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm  w-[170.76px]
                    ${
                        propertyType_purchase === opt.label
                       ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                       : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
              <span
                className={`${
                propertyType_purchase === opt.label ? "text-[#1E5C3B]" : "text-gray-700"
                } text-[18px]`}
              >
              {opt.icon}
               </span>
           <span className="text-sm font-semibold">{opt.label}</span>
          </button>
        ))}
         </div>
         {errors.propertyType_purchase && (
          <p className="text-red-500 text-[12px] mt-1">{errors.propertyType_purchase}</p>
           )}
         </div></div>
                
                    {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  <span className="text-2xl">💰</span> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                  {/* 6. Buy to Let? (Inline Select) */}
                  <div className="flex flex-col h-full">
  <label
    htmlFor="buy_to_let"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Buy to Let?<span className="text-red-500">*</span>
  </label>

  <div className="relative ">
    <select
      id="buy_to_let"
      name="buy_to_let"
                       disabled={buytolet_readonlyfield}  

      value={formData.buy_to_let} // ✅ controlled input
      onChange={(e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // ✅ clear this field's error
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }}
      className={`block w-full h-[44px] rounded-xl border px-4 text-[14px] text-gray-900 font-medium bg-white appearance-none pr-10 focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
    >
      {["No", "Yes - Personal name", "Yes - Company name"].map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>

    <ChevronDown
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>

  {errors.buy_to_let && (
    <p className="text-red-500 text-[12px] mt-1">{errors.buy_to_let}</p>
  )}
</div>

                  {/* 7. Government Right to Buy scheme? (Inline ButtonGroup) */}
                   <div className="flex flex-col h-full">
                                                   <label htmlFor="b2l" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Purchase mode<span className="text-red-500">*</span>
                                                   </label>
                                               <div className="relative mt-auto">
                                 <select
                                   name="purchase_mode"
                                   id="b2l"
                                   value={formData.purchase_mode || ""}  // ✅ controlled value
                                   onChange={(e) => handleChange("purchase_mode", e.target.value)}  // ✅ update formData
                                   className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
                                 >
                                   {stampDutyOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                                 </select>
                               
                                 <ChevronDown
                                   size={16}
                                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                 />
                               </div>
                       <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                         errors.purchase_mode ? "text-red-500 opacity-100" : "opacity-0"
                      }`}>
                        {errors.purchase_mode || "placeholder"} {/* placeholder keeps same height */}
                      </p>
                                                 </div>

                  {/* 8. Obtaining a mortgage? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obtaining a mortgage?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setMortgage_purchase("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          mortgage_purchase === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMortgage_purchase("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          mortgage_purchase === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>

                  {/* 9. Mortgage Lender (Inline Select) */}
                

                  {/* 10. Receiving a gifted deposit? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="gifted_deposit" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiving a gifted deposit?
                    </label>
                    <div className="relative mt-auto">
                        <select id="gifted_deposit" defaultValue="None" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["None", "1 Gifted deposit", "2 Gifted deposit", "3 Gifted deposit"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

                  {/* 11. Shared Ownership? (Inline ButtonGroup) */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shared Ownership via housing association?
                    </label>
                    <div className="grid grid-cols-2 gap-3 ">
                      <button
                        type="button"
                        onClick={() => setSharedOwnership_purchase("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          sharedOwnership_purchase === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSharedOwnership_purchase("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          sharedOwnership_purchase === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                 
                                                   <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Using Government Right to Buy scheme?
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <button
                        type="button"
                        onClick={() => setScheme_purchase("yes")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          scheme_purchase === "yes"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>Yes</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheme_purchase("no")}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
                          scheme_purchase === "no"
                            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div> {/* End PURCHASE FINANCE */}

                    {/* 🌐 SPECIAL INSTRUCTIONS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">        
  {/* Prefer solicitor in your first language */}
<div className="space-y-4">
  {/* Label + Main dropdown */}
     <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
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
        <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
      </div>

  {/* Show only when needed */}

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
        </div>
    </div>     




{/* Special instructions */}
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    Special instructions (Optional)
  </label>
  <textarea onChange={(e)=>{handleChange("specal_instruction",e.target.value)}}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5C3B] text-black placeholder-black"
    placeholder="Enter any special instructions..."
  ></textarea>
</div>

                    </form>
                     {modalopen && (
                          <Signinmodal closeModal={closeModal}></Signinmodal>
                        )}

                    <div className="mt-12 flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
                    >
                        Back
                    </button>
                    <button
                         onClick={handleContinue}
                        className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
                    >
                        Continue &rarr;
                    </button>
                    </div>
                </section>
                </div>
        );
      }