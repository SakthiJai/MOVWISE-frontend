"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin,ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import Select from "react-select"; //imp


const Link = ({ href, children, className }) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);


const useRouter = () => ({
  back: () => console.log("Navigation: Going back..."),
});

export default function App() {
useEffect(() => {
  const storedData = localStorage.getItem("getquote");

  if (storedData) {
    setFormData(JSON.parse(storedData));
  }
}, []);
   const [formData, setFormData] = useState({
    address: "",
    price: "",
    bedrooms: "",
    tenure: "", 
    propertyType: "",
    sharedOwnership: "",
    address_purchase: "",
    price_purchase: "",
    bedrooms_purchase: "",
    tenure_purchase: "", 
    propertyType_purchase: "",
    sharedOwnership_purchase: "",
    b2l:"",
  });
  
  const [errors, setErrors] = useState({});
  

   const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle phone separately
  if (name === "phone") {
    const numericValue = value.replace(/\D/g, "").slice(0, 12);
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ Clear error for this specific field
  setErrors((prev) => ({ ...prev, [name]: "" }));
};

  const validate = () => {
    const newErrors = {};
  
   
    if (!formData.address.trim()) {
      newErrors.address = "Property address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }
  
    
    if (!formData.price) {
      newErrors.price = "Agreed sales price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
  
   
    if (!formData.bedrooms) {
      newErrors.bedrooms = "Please select number of bedrooms";
    }
  
  
    if (!formData.tenure) {
      newErrors.tenure = "Please select leasehold or freehold";
    }
  
   
    if (!formData.propertyType) {
      newErrors.propertyType = "Please select a property type";
    }
  
      if (!formData.sharedOwnership) {
      newErrors.sharedOwnership = "Please select a ownership";
    }

    if (!formData.address_purchase.trim()) {
      newErrors.address_purchase = "Property address is required";
    } else if (formData.address_purchase.trim().length < 5) {
      newErrors.address_purchase = "Address must be at least 5 characters";
    }
  
    
    if (!formData.price_purchase) {
      newErrors.price_purchase = "Agreed sales price is required";
    } else if (Number(formData.price_purchase) <= 0) {
      newErrors.price_purchase = "Price must be a positive number";
    }
  
   
    if (!formData.bedrooms_purchase) {
      newErrors.bedrooms_purchase = "Please select number of bedrooms";
    }
  
  
    if (!formData.tenure_purchase) {
      newErrors.tenure_purchase = "Please select leasehold or freehold";
    }
  
   
    if (!formData.propertyType_purchase) {
      newErrors.propertyType_purchase = "Please select a property type";
    }
  
      if (!formData.sharedOwnership_purchase) {
      newErrors.sharedOwnership_purchase = "Please select a ownership";
      }
      if (!formData.b2l || formData.b2l === "No") {
  newErrors.b2l = "Please select a Buy to Let option";
}
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}
  
  
  const handleContinue = (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log("✅ Valid form data:", formData);
      
    } else {
      console.log("❌ Validation failed:", errors);
    }
  };
  

    const [selectedLenders, setSelectedLenders] = useState([]);//imp
          const lenders = [//imp
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
        const options_l = lenders.map((lender) => ({//imp
          value: lender.id,
          label: lender.lenders_name,
        }));
      
        const handleChange_l = (selectedOptions) => {//imp
          setSelectedLenders(selectedOptions);
          const ids = selectedOptions.map(item => item.value);
          console.log("Selected lenders:", ids);
          handleChange("Lenders",ids)
        };
  

      const [modalopen, setModalopen] = useState(false);
      const [languagepreference, setlanguagepreference] = useState(" ");
      const [language, setLanguage] = useState([]);
            const lang=["English","Spanish","French","German","Chinese","Hindi","Arabic","Portuguese","Russian","Japanese"]

    
      const [tenure, setTenure] = useState("");

     const tenureOptions = ["Leasehold", "Freehold"];

     const [bedrooms, setBedrooms] = useState("");

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
  

        return (
            <div className="min-h-screen bg-white antialiased font-inter font-outfit">
 <div className='sticky top-0 z-50'>
   <div className='sticky top-0 z-50'>
                       <Navbar />
            </div>            </div>
            <main className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                {/* Left stepper */}
           <aside className="z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-full lg:max-h-[600px] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white   lg:top-22">
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
                                <select id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                    {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                    <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>


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
                                value={formData.address}
                                onChange={handleChange}
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                              /></div>
                              {errors.address && (
                                <span className="text-red-500 text-xs mt-1">{errors.address}</span>
                              )}
                           
                        </div>

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
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="block w-full h-[44px] rounded-xl border border-gray-300 pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors"
                              />
                              

                            
                             </div>
                           
                            {errors.address && (
                                <span className="text-red-500 text-xs mt-1">{errors.price}</span>
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
          setFormData((prev) => ({ ...prev, bedrooms: opt }));
          // ✅ clear error for this field
          setErrors((prev) => ({ ...prev, bedrooms: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
          ${
            formData.bedrooms === opt
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
      >
        <span>{opt}</span>
      </button>
    ))}
  </div>

  {errors.bedrooms && (
    <p className="text-red-500 text-[12px] mt-1">{errors.bedrooms}</p>
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
          setFormData((prev) => ({ ...prev, propertyType: opt.label }));
          // ✅ Clear the specific error
          setErrors((prev) => ({ ...prev, propertyType: "" }));
        }}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm w-[170.76px]
          ${
            formData.propertyType === opt.label
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
      >
        <span
          className={`${
            formData.propertyType === opt.label ? "text-white" : "text-gray-700"
          } text-[18px]`}
        >
          {opt.icon}
        </span>
        <span className="text-sm font-semibold">{opt.label}</span>
      </button>
    ))}
  </div>
  {errors.propertyType && (
    <p className="text-red-500 text-[12px] mt-1">{errors.propertyType}</p>
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
                          value={formData.sharedOwnership}
                          onChange={handleChange}
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
                                 <select id="stage" name="stage" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                                {[ "Please select", "Just researching / budgeting", "Have received an offer", "Sale agreed",].map((opt) => (
                                <option key={opt} value={opt === "Please select" ? "" : opt}> {opt} </option>))}
                                </select>
                                </div>               
                                  {/* 1. Property Address (Inline Input) */}
                          <div className="flex flex-col h-full">
  <label
    htmlFor="address_purchase"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Property address:<span className="text-red-500">*</span>
  </label>

  <div className="relative mt-auto">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
      <MapPin size={16} />
    </span>

    <input
      id="address_purchase"
      name="address_purchase"
      type="text"
      value={formData.address_purchase}
      onChange={(e) => {
        const { name, value } = e.target;

        // ✅ Update form data
        setFormData((prev) => ({ ...prev, [name]: value }));

        // ✅ Clear only this field’s error when typing
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }}
      placeholder="Enter property address"
      className={`block w-full h-[44px] rounded-xl border pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
    />
  </div>

  {errors.address_purchase && (
    <span className="text-red-500 text-xs mt-1">
      {errors.address_purchase}
    </span>
  )}
</div>

                    
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
      type="number"
      value={formData.price_purchase}
      onChange={(e) => {
        const { name, value } = e.target;

        // ✅ Prevent non-numeric characters and negatives
        const cleanValue = value.replace(/[^0-9]/g, "");

        // ✅ Update form data
        setFormData((prev) => ({ ...prev, [name]: cleanValue }));

        // ✅ Clear only this field’s error
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }}
      placeholder="Enter sales price"
      className={`block w-full h-[44px] rounded-xl border pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
    />
  </div>

  {errors.price_purchase && (
    <span className="text-red-500 text-xs mt-1">{errors.price_purchase}</span>
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
          setFormData((prev) => ({ ...prev, bedrooms_purchase: opt }));
          setBedrooms_purchase(opt);
          // ✅ Clear error when clicked
          setErrors((prev) => ({ ...prev, bedrooms_purchase: "" }));
        }}
        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm
          ${
            formData.bedrooms_purchase === opt
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
      >
        <span>{opt}</span>
      </button>
    ))}
  </div>

  {errors.bedrooms_purchase && (
    <p className="text-red-500 text-[12px] mt-1">{errors.bedrooms_purchase}</p>
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
            setFormData((prev) => ({ ...prev, tenure_purchase: opt }));
            setTenure_purchase(opt);
            // ✅ Clear error when clicked
            setErrors((prev) => ({ ...prev, tenure_purchase: "" }));
          }}
          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${
            formData.tenure_purchase === opt
              ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>

    {errors.tenure_purchase && (
      <p className="text-red-500 text-[12px] mt-1">{errors.tenure_purchase}</p>
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
    htmlFor="b2l"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Buy to Let?<span className="text-red-500">*</span>
  </label>

  <div className="relative mt-auto">
    <select
      id="b2l"
      name="b2l"
      value={formData.b2l} // ✅ controlled input
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

  {errors.b2l && (
    <p className="text-red-500 text-[12px] mt-1">{errors.b2l}</p>
  )}
</div>

                  {/* 7. Government Right to Buy scheme? (Inline ButtonGroup) */}
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
                  <div className="flex flex-col h-full">
                    <label htmlFor="lender" className="block text-sm font-medium text-gray-700 mb-1">
                      Mortgage Lender (If Known)
                    </label>
                    <div className="relative mt-auto">
                        <select id="lender" defaultValue="Not Known" className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10">
                            {["Not Known", "Not required", "Lender Name", "Look up"].map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>

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
                    <div className="grid grid-cols-2 gap-3 mt-auto">
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
  </div>

  {/* Show only when needed */}
  {(languagepreference === "Yes" || languagepreference === "Maybe") && (
    <div className="mt-2">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Select preferred language(s)
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-gray-200 p-3 rounded-lg bg-gray-50">
        {lang.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-green-50 transition"
          >
            <input
              type="checkbox"
              value={item}
              onChange={(e) => languagecheckboxchange(item, e.target.checked)}
              className="accent-[#1E5C3B] w-4 h-4"
            />
            <span className="text-gray-800 text-sm font-medium">{item}</span>
          </label>
        ))}
      </div>
    </div>
  )}
</div>
 <div className="flex flex-col h-full ">
      <label className="block text-sm font-semibold text-gray-800 mb-1 rounded-lg focus:ring-2 focus:ring-[#1E5C3B]">
        Select Lenders
      </label>
      <Select
        options={options_l}
        isMulti
          instanceId="lenders-select"
        value={selectedLenders}
        onChange={handleChange_l}
        placeholder="Choose lenders..."
        className="text-black "

      />
    </div>
    </div>     




{/* Special instructions */}
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-1">
    Special instructions (Optional)
  </label>
  <textarea
    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E5C3B] text-black placeholder-black"
    placeholder="Enter any special instructions..."
  ></textarea>
</div>

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

        <button className="mt-8 mx-auto bg-white text-[#1E5C3B] font-semibold px-8 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-md">
          Sign Up
        </button>
      </div>

      {/* RIGHT SIDE (Content Section - 70%) */}
      <div className="relative p-8 flex flex-col justify-center text-center md:text-left">
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
            onClick={() => alert('Proceeding as Logged-in User')}
            className="bg-[#1E5C3B] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm"
          >
            Continue as Logged-in User
          </button>
          <button
            onClick={() => alert('Proceeding as Guest User')}
            className="border border-[#1E5C3B] text-[#1E5C3B] px-6 py-3 rounded-lg hover:bg-[#1E5C3B] hover:text-white transition-all duration-200 shadow-sm"
          >
            Continue as Guest User
          </button>
        </div>
      </div>
    </div>
  </div>
)}
                    </form>

                    <div className="mt-12 flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="font-semibold text-base h-[48px] px-8 rounded-full border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-50 transition duration-150"
                    >
                        Back
                    </button>
                    <button
                        href="/components/comparequotes"
                         onClick={handleContinue}
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