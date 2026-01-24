"use client";
import React, { useEffect, useState ,useRef } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown, CoinsIcon, Home, HomeIcon } from "lucide-react";
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
  const stageOptions = [
  { value: "Just researching / budgeting", label: "Just researching / budgeting" },
  { value: "Have received an offer", label: "Have received an offer" },
  { value: "Sale agreed", label: "Sale agreed" },
];
const sharedOwnershipOptions = [
  { value: "Yes (housing association)", label: "Yes (housing association)" },
  { value: "Yes (Help To Buy)", label: "Yes (Help To Buy)" },
  { value: "No", label: "No" },
];
const giftDepositOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];
    const stampDutyOptions = [
  { label: "First-Time Buyer ", value: "firstTime" },
  { label: "Additional Property (Second Home)", value: "additional" },
  { label: "Additional Property (Buy to let)", value: "Buy to let" },
  { label: "Home Moving", value: "commercial" }
];
const buyToLetOptions = [
  { value: "personal", label: "Yes - Personal name" },
  { value: "company", label: "Yes - Company name" },
];

const partnerloginshow=false;
    const [buytolet_readonlyfield,setbuytolet_readonlyfield]=useState(false);

  const [showAddressLines_purchase, setShowAddressLines_purchase] = useState(false);
    const [showAddressLines, setShowAddressLines] = useState(false);
const [addresskey,setaddresskey]=useState("");
 const purchaseRef = useRef(null);
 const salesRef = useRef(null);
const [rawSalesPrice, setRawSalesPrice] = useState("");
const [rawPurchasePrice, setRawPurchasePrice] = useState("");

useEffect(() => {
  const stored = localStorage.getItem("getquote");
  if (stored) {
    const parsed = JSON.parse(stored);

    setFormData(prev => ({
      ...prev,
      ...parsed,
      sales_price: parsed.sales_price ?? "",
      purchase_price: parsed.purchase_price ?? "",
    }));
  }
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
    [`town`]: "",
    [`sales_country`]: "",
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
    [`purchase_country`]: "",
  }));
};
const options = ["1", "2", "3", "4","5", "5+"];
const options_purchase = ["1", "2", "3", "4","5", "5+"];
const [rawValue, setRawValue] = useState("");
const [rawValuePurchase, setRawValuePurchase] = useState("");

useEffect(() => {
  if (typeof window === "undefined") return; 

  const storedData = localStorage.getItem("getquote");
  if (storedData) {
    setFormData(prev => ({
  ...prev,
  ...JSON.parse(storedData),
  purchase_price: JSON.parse(storedData).purchase_price ?? "",
  sales_price: JSON.parse(storedData).sales_price ?? "",
}));

  }

  fetchdata();
}, []);

   const [formData, setFormData] = useState({
    sales_stages: "", 
    sales_address: "",
    sales_address_line1: "",    
    sales_address_line2: "",
    sales_country: "",
    sales_city: "",
    sales_price: "",
    sales_no_of_bedrooms: options[0],
    tenure: "Freehold", 
    sales_property_type: "Flat",
    sales_shared_ownership:"",
    address: "",
    purchase_address_line1: "",
    purchase_address_line2: "",
    country: "",
    town: "",
    purchase_city :"",
    purchase_country : "",
    new_build:0,
    govt_by_scheme: 0,
    obtaining_mortgage: 0,
    ownership_housing_asso: 0,
    gift_deposit: "",
    purchase_price: "",
    purchase_mode:"",
    no_of_bedrooms: options_purchase[0],
    property_type: "Flat",
    leasehold_or_free: "Freehold", 
    sharedOwnership_purchase: 0,
    buy_to_let:"",
    need_hmo : 0,
    "languages": [],
    service_type:1,
    high_raise_support:0,
    mortgage_purchase:0,
    specal_instruction :"",
    lenders: []
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

  
const handleBuyToLetChange = (option) => {
  setFormData(prev => ({
    ...prev,
    buy_to_let: option.value,
    need_hmo: option.value === "personal" ? null : null, // reset always
  }));

  // clear dependent state
  setSelectedLenders(null);

  setErrors(prev => ({
    ...prev,
    need_hmo: "",
    lenders: "",
  }));
};


  const [errors, setErrors] = useState({});
  
  const [lender, setLender] = useState([
      { value: "Not Known", label: "Not Known", id: 0 },
    ]);
     const [loginformdata, setloginformdata] = useState({
            email: "",
            password: "",
          });


const handleChange = (name,value) => {

  if (name === "property_type" && value !== "Flat") {
    setFormData((prev) => ({ ...prev, high_raise_support: 0 }));
  }
  if(name=="purchase_mode" && (value=="firstTime"|| value=="standard"||value=="additional"||value=="commercial") ){
    console.log("check")
    setbuytolet_readonlyfield(true);
    formData.buy_to_let=""
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
if (name === "sales_price") {
  const cleaned = value.replace(/[^0-9.]/g, "");
  setRawSalesPrice(cleaned);
  setFormData(prev => ({ ...prev, sales_price: cleaned }));
}

else if (name === "purchase_price") {
  const cleaned = value.replace(/[^0-9.]/g, "");
  setRawPurchasePrice(cleaned);
  setFormData(prev => ({ ...prev, purchase_price: cleaned }));
}

  else if (name === "phone") {
    const numericValue = value.replace(/\D/g, "").slice(0, 12);
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  }
  else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  console.log(formData);
  setErrors((prev) => {
  const copy = { ...prev };
  delete copy[name];
  return copy;
});

};


useEffect(() => {
  if (!rawSalesPrice) return;

  const t = setTimeout(() => {
    const num = Number(rawSalesPrice);
    if (!isNaN(num)) {
      setFormData(prev => ({
        ...prev,
        sales_price: new Intl.NumberFormat("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num),
      }));
    }
  }, 800);

  return () => clearTimeout(t);
}, [rawSalesPrice]);



const validate = () => {
  const errors = {};

if (!formData.sales_stages) {
  errors.sales_stages = "Please select a stage";
}
if (!formData.sales_country) {
 errors.sales_country = "Please select a country";
}
if (!formData.purchase_country) {
 errors.purchase_country = "Please select a country";
}
  if (!formData.sales_price || Number(formData.sales_price) <= 0) {
    errors.sales_price = "Enter a valid sales price";
  }

  if (!formData.sales_no_of_bedrooms) {
    errors.sales_no_of_bedrooms = "Select bedrooms";
  }

  if (!formData.tenure) {
    errors.tenure = "Select leasehold or freehold";
  }

  if (!formData.sales_property_type) {
    errors.sales_property_type = "Select property type";
  }

  if (!formData.sales_shared_ownership) {
    errors.sales_shared_ownership = "Select shared ownership";
  }

  if (!formData.purchase_price || Number(formData.purchase_price) <= 0) {
    errors.purchase_price = "Enter a valid purchase price";
  }

  if (!formData.no_of_bedrooms) {
    errors.no_of_bedrooms = "Select bedrooms";
  }

  if (!formData.leasehold_or_free) {
    errors.leasehold_or_free = "Select leasehold or freehold";
  }

  if (!formData.property_type) {
    errors.property_type = "Select property type";
  }

  if (!formData.purchase_mode) {
    errors.purchase_mode = "Select purchase mode";
  }

  if (!formData.buy_to_let) {
    errors.buy_to_let = "Select Buy to Let option";
  }

  /* ---------- CONDITIONAL ⭐ ---------- */
  if (
    formData.mortgage_purchase === 1 &&
    (!formData.lenders || formData.lenders.length === 0)
  ) {
    console.log(formData.lenders)
    errors.lenders = "Select at least one lender";
  }

  if (
    formData.buy_to_let === "personal" &&
    formData.need_hmo === null
  ) {
    errors.need_hmo = "Select HMO option";
  }

  if (
    formData.property_type === "Flat" &&
    formData.high_raise_support === null
  ) {
    errors.high_raise_support = "Select high-rise support";
  }
  if(!formData.languages){
               errors.languages="please select a language"
        }

        if (!selectedLanguage || selectedLanguage.length === 0) {
    errors.preferLanguage = "Please select a language";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};


  
  
  const handleContinue = (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log("✅ Valid form data:", formData);
                  localStorage.setItem("service", JSON.stringify(3));

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
  if (!rawPurchasePrice) return;

  const t = setTimeout(() => {
    const num = Number(rawPurchasePrice);
    if (!isNaN(num)) {
      setFormData(prev => ({
        ...prev,
        purchase_price: new Intl.NumberFormat("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num),
      }));
    }
  }, 800);

  return () => clearTimeout(t);
}, [rawPurchasePrice]);

  

    const [selectedLenders, setSelectedLenders] = useState([]);
        
      
        // Convert lenders into react-select format
        const options_l = lender.map((lender) => ({//imp
          value: lender.id,
          label: lender.lenders_name,
        }));
      
        
   const handleChange_l = (selectedOption) => {
  if (!selectedOption) {
    setSelectedLenders(null);
    handleChange("lenders", null);
    return;
  }

  const hasNotRequired = selectedOption.value === "Not Known";

  if (hasNotRequired) {
    const notRequiredOption = lender.find(
      (opt) => opt.value === "Not Known"
    );

    setSelectedLenders(notRequiredOption);
    console.log("Selected lender: Not Known");

    handleChange("lenders", 0);
  } else {
    setSelectedLenders(selectedOption);

    console.log("Selected lender:", selectedOption.id);
    handleChange("lenders", [selectedOption.id]);
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

     
     const [propertyType, setPropertyType] = useState("");
        const propertyTypeOptions = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
                  ];
      
        
        const router = useRouter();

        // Initial state for the toggle buttons
        const [scheme, setScheme] = useState("no");
        const [mortgage, setMortgage] = useState("no");
        const [newBuild, setNewBuild] = useState("no");


        //purchase
              const [tenure_purchase, setTenure_purchase] = useState("");

     const tenureOptions_purchase = ["Leasehold", "Freehold"];

     const [bedrooms_purchase, setBedrooms_purchase] = useState("");

    

     const [propertyType_purchase, setPropertyType_purchase] = useState("");
        const propertyTypeOptions_purchase = [
          { label: "Flat", icon: <FaBuilding size={22} color="#007BFF" /> },
          { label: "Terraced", icon: <FaHome size={22} color="#28A745" /> },
          { label: "Semi-detached", icon: <MdHolidayVillage size={22} color="#FFC107" /> },
          { label: "Detached", icon: <FaWarehouse size={22} color="#DC3545" /> },
                  ];
        

      
        
        const router_purchase = useRouter();

        // Initial state for the toggle buttons
        const [scheme_purchase, setScheme_purchase] = useState("no");
        const [mortgage_purchase, setMortgage_purchase] = useState("yes");
        const [newBuild_purchase, setNewBuild_purchase] = useState("no");
        const [sharedOwnership_purchase, setSharedOwnership_purchase] = useState("no");

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

  clearAddressError(type);
  saveSelectedAddress(selected, type);

  await fetchAddressDetailsAndUpdate(selected.udprn, type);
};


const clearAddressError = (type) => {
  const errorKey =
    type === "sales" ? "sales_address" : "address";

  if (errors[errorKey]) {
    setErrors((prev) => ({ ...prev, [errorKey]: "" }));
  }
};

// Function to save selected address and update formData
const saveSelectedAddress = (selected, type) => {
  if (type === "sales") {
    setFormData((prev) => ({
      ...prev,
      selectedId: selected.id,
      sales_address: selected.suggestion,
    }));
  } else if(type === "purchase") {
    setFormData((prev) => ({
      ...prev,
      selectedId_purchase: selected.id,
      address: selected.suggestion,
    }));
  }
};


const fetchAddressDetailsAndUpdate = async (udprn, type) => {
  const ref =
    type === "sales" ? salesRef : purchaseRef;

  const details = ref.current?.onSelectAddressFullDetails?.();

  if (!details) {
    const errorKey =
      type === "sales" ? "sales_address" : "address";

    setErrors((prev) => ({
      ...prev,
      [errorKey]: "Failed to fetch full address details.",
    }));
    return;
  }

  updateFormDataWithAddressDetails(details, type);
};


const updateFormDataWithAddressDetails = (details, type) => {
  if (type === "sales") {
    setFormData((prev) => ({
      ...prev,
      sales_city:
        details.post_town || details.admin_district || "",
      sales_country: details.country || "",
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      purchase_city:
        details.post_town || details.admin_district || "",
      purchase_country: details.country || "",
    }));
  }
};



  async function fetchdata() {
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
                        <Home  className="w-7 h-7 text-[#1E5C3B]" />SALES DETAILS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="">
                                                           <label className="block text-sm font-medium text-gray-700 mb-1">
                                                               What stages are you at? <span className="text-red-500">*</span>
                                                           </label>
                                                                       <Select
  options={stageOptions}
  styles={selectStyles}
  value={stageOptions.find(
    (opt) => opt.value === formData.sales_stages
  )}
  onChange={(selected) =>
    handleChange("sales_stages", selected?.value || "")
  }
  isSearchable={false}
  placeholder="Not Applicable"
/>
                                           {/* Dropdown icon */}
                                                         <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                                           errors.sales_stages ? "text-red-500 opacity-100" : "opacity-0"
                                         }`}>
                                           {errors.sales_stages || "placeholder"}
                                         </p>
                           
                             
                                                           </div>


                        {/* 1. Property Address (Inline Input) */}
                       <div className="flex flex-col h-full">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                         Property address:<span className="text-red-500">*</span>
                         </label>
                       <LocationSearch ref={salesRef} readOnly={showAddressLines} onSelectAddress={onSelectAddress("sales")}/>


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
                            <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                                £
                            </span>
                             <input
                                id="price"
                                name="price"
                                type="text"
                                onFocus={(e) => e.target.select()}
                                value={formData.sales_price ?? ""} 
                                onChange={(e)=>{handleChange("sales_price",e.target.value)}} 
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors outline-none"
                              />
                              

                            
                             </div>
                           
                            {errors.sales_price && (
                                <span className="text-red-500 text-xs mt-1">{errors.sales_price}</span>
                              )}
                       </div>

                        {/* 3. Number of Bedrooms (Inline Select) */}
                        <div className="flex flex-col h-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Number of Bedrooms:<span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => {
  setFormData((prev) => ({ ...prev, sales_no_of_bedrooms: opt }));
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

  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-9">
  {propertyTypeOptions.map((opt) => (
    <button
      key={opt.label}
      type="button"
      onClick={() => {
        setFormData((prev) => ({ ...prev, sales_property_type: opt.label }));
        setErrors((prev) => ({ ...prev, sales_property_type: "" }));
      }}
      className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm
        w-full md:w-[170.76px]
        ${
          formData.sales_property_type === opt.label
            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span
        className={`${
          formData.sales_property_type === opt.label ? "text-white" : "text-gray-700"
        } text-[16px] md:text-[18px]`}
      >
        {opt.icon}
      </span>
      <span className="text-xs md:text-sm font-semibold text-left">{opt.label}</span>
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
                        < CoinsIcon  className="w-7 h-7 text-yellow-400" /> SALES FINANCE
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                          htmlFor="sales_shared_ownership"
                          className="block text-[14px] text-[#6A7682] font-medium mb-2"
                        >
                          Shared Ownership<span className="text-red-500">*</span>
                        </label>
                                 <Select
  inputId="shared_ownership"
  options={sharedOwnershipOptions}
  styles={selectStyles}
  value={sharedOwnershipOptions.find(
    (opt) => opt.value === formData.sales_shared_ownership
  )}
  onChange={(selected) =>
    handleChange("sales_shared_ownership", selected?.value || "")
  }
  placeholder="Not Applicable"
  isSearchable={false}
/>
                        {errors.sales_shared_ownership && (
                          <p className="text-red-500 text-[12px] mt-1">{errors.sales_shared_ownership}</p>
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
                        </div>
 {/* 🏡 PURCHASE DETAILS */}
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                        <HomeIcon  className="w-7 h-7 text-[#1E5C3B]" /> PURCHASE DETAILS
                          </h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                           
                                  {/* 1. Property Address (Inline Input) */}
                <div className="flex flex-col h-full">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                         Property address:<span className="text-red-500">*</span>
                         </label>
                       <LocationSearch ref={purchaseRef}  readOnly={showAddressLines_purchase}  onSelectAddress={onSelectAddress("purchase")}/>


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

  <div className="relative ">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
      £
    </span>

    <input
     id="purchase_price"
  name="purchase_price"
      type="text"
      onFocus={(e) => e.target.select()}
      value={formData.purchase_price?? ""}
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

  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-9">
  {propertyTypeOptions_purchase.map((opt) => (
    <button
      key={opt.label}
      type="button"
      onClick={() => {
        setFormData((prev) => ({ ...prev, sales_property_type: opt.label }));
        setErrors((prev) => ({ ...prev, sales_property_type: "" }));
         handleChange("property_type", opt.label);

          // Reset high_raise_support if not Flat
          if (opt.label !== "Flat") {
            handleChange("high_raise_support", 0);
          }
      }}
      className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm
        w-full md:w-[170.76px]
        ${
          formData.property_type === opt.label
            ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span
        className={`${
          formData.property_type === opt.label ? "text-white" : "text-gray-700"
        } text-[16px] md:text-[18px]`}
      >
        {opt.icon}
      </span>
      <span className="text-xs md:text-sm font-semibold text-left">{opt.label}</span>
    </button>
  ))}
</div>

  {errors.property_type && (
    <p className="text-red-500 text-[12px] mt-1">{errors.property_type}</p>
  )}

  {formData.property_type === "Flat" && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          High Raise Support:
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              handleChange("high_raise_support", 1) // store numeric 1
            }
            className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
              formData.high_raise_support === 1
                ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Yes</span>
          </button>

          <button
            type="button"
            onClick={() => handleChange("high_raise_support", 0)} // store numeric 0
            className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
              formData.high_raise_support === 0
                ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>No</span>
          </button>
        </div>
        <p className="text-[12px] mt-1 min-h-[16px] transition-all duration-200"></p>
      </div>
    </div>
  )}
</div>

         </div></div>
                
                    {/* 💰 PURCHASE FINANCE */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
                  < CoinsIcon  className="w-7 h-7 text-yellow-400" /> PURCHASE FINANCE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                  {/* purchase mode */}
                    <div className="flex flex-col h-full">
                                                   <label htmlFor="b2l" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Purchase mode<span className="text-red-500">*</span>
                                                   </label>
                                               <div className="relative mt-auto">
                                       <Select
                                 inputId="b2l"
                                 name="purchase_mode"
                                 options={stampDutyOptions}
                                 styles={selectStyles}
                                 value={stampDutyOptions.find(
                                   (opt) => opt.value === formData.purchase_mode
                                 )}
                                 onChange={(selected) =>
                                   handleChange("purchase_mode", selected?.value || "")
                                 }
                                 placeholder="Not Applicable"
                                 isSearchable={false}
                               />
                                            
                              
                               </div>
                       <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
                         errors.purchase_mode ? "text-red-500 opacity-100" : "opacity-0"
                      }`}>
                        {errors.purchase_mode || "placeholder"} {/* placeholder keeps same height */}
                      </p>
                                                 </div>
                  {/* 6. Buy to Let? (Inline Select) */}
                  <div className="flex flex-col h-full">
  <label
    htmlFor="buy_to_let"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Buy to Let?<span className="text-red-500">*</span>
  </label>

  <div className="relative ">
          <Select
      inputId="b2l"
      name="buy_to_let"
      options={buyToLetOptions}
      styles={selectStyles}
      value={buyToLetOptions.find(
        (opt) => opt.value === (formData.buy_to_let ?? "No")
      )}
      onChange={(selected) =>
        handleChange("buy_to_let", selected?.value || "")
      }
      isDisabled={buytolet_readonlyfield}
      placeholder="Not Applicable"
      isSearchable={false}
    />

  
  </div>

  {errors.buy_to_let && (
    <p className="text-red-500 text-[12px] mt-1">{errors.buy_to_let}</p>
  )}
</div>
                   

                  {/* 8. Obtaining a mortgage? (Inline ButtonGroup) */}
<div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Obtaining a mortgage?
      </label>
    
      <div className="grid grid-cols-2 gap-3 ">
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
            setFormData({ ...formData, obtaining_mortgage: 0 });
            console.log(formData)
            setSelectedLenders("") // ✅ store 0 for no
            if (errors.obtaining_mortgage) {
              setErrors({ ...errors, obtaining_mortgage: "",lenders:"" });
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
                 
               <div className="flex flex-col h-full">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Select Lenders <span className="text-red-500">*</span>
          </label>
           <Select
            options={lender}
            isDisabled={formData.obtaining_mortgage==0}
              instanceId="lenders-select"
              styles={selectStyles}
          
            value={selectedLenders}
            onChange={handleChange_l}
            placeholder="Choose lenders..."
            className="text-black"
    
              /> 
        {formData.obtaining_mortgage==1&&(
 <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
  errors.lenders ? "text-red-500 opacity-100" : "opacity-0"
}`}>
  {errors.lenders || "placeholder"}
</p>
        )}     
        </div> 

                  {/* 10. Receiving a gifted deposit? (Inline Select) */}
                  <div className="flex flex-col h-full">
                    <label htmlFor="gifted_deposit" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiving a gifted deposit?
                    </label>
                    <div className="relative ">
                        <Select
  inputId="gift_deposit"
  name="gift_deposit"
  options={giftDepositOptions}
  styles={selectStyles}
  value={giftDepositOptions.find(
    (opt) => opt.value === formData.gift_deposit
  )}
  onChange={(selected) => {
    setFormData({
      ...formData,
      gift_deposit: selected?.value ?? "",
    });

    if (errors.gift_deposit) {
      setErrors({ ...errors, gift_deposit: "" });
    }
  }}
  placeholder="Select..."
  isSearchable={false}
/>
                    </div>
                  </div>

                  {/* 11. Shared Ownership? (Inline ButtonGroup) */}
            <div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Shared Ownership via housing association?
      </label>
    
      <div className="grid grid-cols-2 gap-3">
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
                 
                   <div className="flex flex-col h-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Using Government Right to Buy scheme?
      </label>
    
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          type="button"
          onClick={() => {
            setFormData({ ...formData, govt_by_scheme: 1 }); // ✅ store 1 for yes
            if (errors.govt_by_scheme) {
              setErrors({ ...errors, govt_by_scheme: "" }); // clear error
            }
          }}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            formData.govt_by_scheme === 1
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span>Yes</span>
        </button>
    
        <button
          type="button"
          onClick={() => {
            setFormData({ ...formData, govt_by_scheme: 0 }); // ✅ store 0 for no
            if (errors.govt_by_scheme) {
              setErrors({ ...errors, govt_by_scheme: "" }); // clear error
            }
          }}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            formData.govt_by_scheme === 0
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span>No</span>
        </button>
      </div>
    
    <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
    </div>
<div>
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
      </div>
                
    {formData.buy_to_let === "personal" && (
  <div >
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Need HMO Support
    </label>

  <div className="grid grid-cols-2 gap-3 ">
        <button
          type="button"
          onClick={() => {
            setFormData({ ...formData, need_hmo: 1 }); // ✅ store 1 for yes
            if (errors.need_hmo) {
              setErrors({ ...errors, need_hmo: "" }); // clear error on change
            }
          }}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            formData.need_hmo === 1
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span>Yes</span>
        </button>
    
        <button
          type="button"
          onClick={() => {
            setFormData({ ...formData, need_hmo: 0 });
            console.log(formData)
            setSelectedLenders("") // ✅ store 0 for no
            if (errors.need_hmo) {
              setErrors({ ...errors, need_hmo: "",lenders:"" });
            }
          }}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            formData.need_hmo === 0
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span>No</span>
        </button>
      </div>
  </div>
)}
</div>
                </div>
              {/* End PURCHASE FINANCE */}

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