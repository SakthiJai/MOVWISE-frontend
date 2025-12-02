"use client"

import React, { useState,useEffect } from 'react'
import Navbar from '../../parts/navbar/page';
import Footer from '../../parts/Footer/footer';
import PriceBreakdownCard from './PartnersPricebreakdown'
import { useRouter } from "next/navigation";
import { useFormStore } from "../../store/useFormStore";
import { Languages, Pencil } from "lucide-react";

import Select from "react-select";
import { API_ENDPOINTS, getData, postData } from "../../auth/API/api";
import { set } from "react-hook-form";

const Partnersprofile = () => {
  const [show, setshow] = useState(1);
  const [logintype,setlogintype]=useState()
  const [showpricebreakdown,setshowpricebreakdown]=useState();

  useEffect(()=>{
    if(localStorage.getItem("logintype")){
    setlogintype(localStorage.getItem("logintype"));

    }
  })
  
  
   useEffect(()=>{
    const storedData = localStorage.getItem("companyData");
    
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
     //console.log("storedData",JSON.parse(storedData).languages);
    if(formData.languages){
      //handleChange({})
      
      const ids = formData.languages.map(item => item.id);
      if(storedData!=undefined && storedData!=""){
     handleChange({ name: "languages", value: JSON.parse(storedData).languages })
      }
    }
   },[]);
  
   const [lang, setLang] = useState ([
     
   ]);
  
    const router = useRouter();
     const { updateCompanyData } = useFormStore();
    // Form data state
    const [formData, setFormData] = useState({
      company_name: "",
      phone_number: "",
      email: "",
      websiter: "",
      languages:[]
    });
    const [languagepreference, setlanguagepreference] = useState(" ");
  
    const [language, setLanguage] = useState([]);
  
     const [selectedLanguage, setSelectedLanguage] = useState([]); 
       const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
  const [notes, setNotes] = useState("");
  
  const [jurisdictions,setjuisdictions]=useState([])
  
  
  const fetchlanguages = async () => {
      try {
        const  languages = await getData(API_ENDPOINTS.languages)
        const region = await getData(API_ENDPOINTS.region);
  
    setjuisdictions(
    region.users.map(item => ({
      label: item.region_name,
      value: item.id
    }))
  );
  
  
     
        
    
     console.log(languages.users)
     if(Array.isArray(languages.users)){
        const languageOptions = languages.users.map((l) => ({
          value: l.language_name,
          label: l.language_name,
          id: l.id,
        }));
  
        setLanguage([ ...languageOptions]);
  
        // handleChange({ name: "languages", value: JSON.parse(localStorage.getItem("companyData")).languages })
  
        if(localStorage.getItem("companyData"))
        {
         
          let templang =[];
  
  const data = JSON.parse(localStorage.getItem("companyData"));
  console.log(data)
  console.log(data.languages);
  
          languageOptions.forEach(element => {
            
          if(JSON.parse(localStorage.getItem("companyData")).languages?.indexOf(element.id)>=0){
          
            templang.push(element)
          }
        });
         setSelectedLanguage(templang);
        }
       
     }
     
     if(localStorage.getItem("companyData") && JSON.parse(localStorage.getItem("companyData")).regions)
        {
         
          let templang =[];
          region.users.forEach(element => {
           // console.log(element.id,JSON.parse(localStorage.getItem("companyData")).regions,JSON.parse(localStorage.getItem("companyData")).regions.indexOf(element.id))
          if(JSON.parse(localStorage.getItem("companyData")).regions.indexOf(element.id)>=0){
             element.value= element.id,
          element.label=element.region_name;
            templang.push(element)
          }
        });
         setSelectedJurisdictions(templang);
        }
        if(localStorage.getItem("companyData"))
        {
         
          let templang =[];
          serviceoptions.forEach(element => {
           // console.log(element.id,JSON.parse(localStorage.getItem("companyData")).regions,JSON.parse(localStorage.getItem("companyData")).regions.indexOf(element.id))
          if(JSON.parse(localStorage.getItem("companyData")).service_id.indexOf(element.id)>=0){
            
            templang.push(element)
          }
        });
         setSelectedServices(templang);
        }
        //selectedServices
      }
      catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
const fetchCompanyInforamtion = async ()=>
  {
     const user     = localStorage.getItem("user");
     const  details = await getData(API_ENDPOINTS.getCompanyInformation+"/"+user);
     
     if(details && details.data) {
       setFormData({
         company_name: details.data.company_name || "",
         phone_number: details.data.phone_number || "",
         email: details.data.email || "",
         websiter: details.data.website || "",
         SRA_CLC_number: details.data.SRA_CLC_number || "",
         additional_info: details.data.additional_info || "",
         languages: details.data.languages || []
       });
       
       if(details.data.logo) {
         setImage(details.data.logo);
       }
     }
  } ;   
    useEffect(() => {
      fetchlanguages();
      fetchCompanyInforamtion();
    }, []);
     
  
  
   const handleChangeLang = (lang=[]) => {
    setSelectedLanguage((prev) => {
      const exists = prev.some((item) => item.value === lang.value);
  
      let updated;
  updated = [...prev, lang];
      
  
  console.log("updataed",updated)
      // update form data also
      setFormData((f) => ({
        ...f,
        languages: updated.map((x) => x.id), // or array
      }));
  
      return updated;
    });
  };
  
  
  
    // Error & Image states
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState("");
  
    // ✅ Unified handleChange function
      const handleChange = (e) => {
    // If called from input event
  
    if((e.target && e.target!=undefined)){
  console.log(e.target);
      let { name, value } = e.target;
        setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));    // For phone number: allow only digits and limit to 12
      if (name === "phone_number") {
        const numericValue = value.replace(/\D/g, "").slice(0, 12);
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    
  
    // Handle phone separately
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  
    // ✅ Clear error for this specific field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  
    setFormData((prev)=>({
      ...prev,
      [name]:value
      }))
  
    }
  
    else{
      let{name, value}=e
      console.log(name,value)
      if(name=="languages"){
       setFormData(prev => ({
      ...prev,
      languages: Array.isArray(value) 
        ? value                     // replace entire array
        : [...prev.languages, value] // push if single value // 👈 push value into array
    }));
      }
      if(name=="regions"){
      setFormData(prev => ({
      ...prev,
      regions: Array.isArray(value)
        ? value
        : [...prev.regions, value] // 👈 push value into array
    }));    }
    if(name=="service_id"){
      setFormData(prev => ({
      ...prev,
      service_id: Array.isArray(value)
        ? value
        : [...prev.service_id, value]  // 👈 push value into array
    }));
    }
        setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));    // For phone number: allow only digits and limit to 12
      if (name === "phone_number") {
        const numericValue = value.replace(/\D/g, "").slice(0, 12);
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    
  
    // Handle phone separately
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  
    // ✅ Clear error for this specific field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  
    setFormData((prev)=>({
      ...prev,
      [name]:value
      }))
  console.log(formData)
    }
  
  
  
    }
    
  
    // ✅ Validation function
    const validate = () => {
      const newErrors = {};
  
      if (!formData.phone_number) {
        newErrors.phone_number = "Phone number is required";
      } else if (!/^\d+$/.test(formData.phone_number)) {
        newErrors.phone_number = "Phone number must contain only digits";
      } else if (formData.phone_number.length < 10) {
        newErrors.phone_number = "Phone number must be at least 10 digits";
      } else if (formData.phone_number.length > 12) {
        newErrors.phone_number = "Phone number cannot exceed 12 digits";
      }
  
      setErrors(newErrors);
      console.log(errors)
      return Object.keys(newErrors).length === 0;
    };
  
    // ✅ Handle submit
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        console.log("✅ Valid form:", formData);
        alert("");
        // router.push("/next-page"); // if you want navigation
      }
    };
  
    // Handle image upload
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setImage(base64String); // ✅ for preview
   
          // ✅ also set inside form data
          setFormData((prev) => ({
            ...prev,
            logo: base64String+"deva", // <-- your required key
          }));
        };
       
        reader.readAsDataURL(file);
      }
    };
  
    // Handle Continue button click
    const handleContinue = () => {
      console.log("inside continue")
      const newErrors = {};
  
      // Name validation
      if (!formData.company_name.trim()) {
        newErrors.company_name = "Company name is required";
      } else if (formData.company_name.trim().length < 3) {
        newErrors.company_name = "Name must be at least 3 characters";
      }
  
      // Phone validation
      if (!formData.phone_number.trim()) {
        newErrors.phone_number = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(formData.phone_number)) {
        newErrors.phone_number = "Enter a valid 10-digit phone number";
      }
  
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email address";
      }
      // Logo validation 
  
      setErrors(newErrors);
      console.log(errors);
      // Navigate only if valid
      if (Object.keys(newErrors).length === 0) {
        updateCompanyData({ ...formData, logo: image });
        localStorage.removeItem("companyData")
        localStorage.setItem("companyData", JSON.stringify({ ...formData}));
        console.log("inside navigation")
        router.push(`${API_BASE_URL}/quotationdetails`);
      }
      console.log(errors)
    };
  
  
  
  const serviceoptions = [
    { value: "Purchase", label: "Purchase",id:1 },
    { value: "Sales", label: "Sales",id:2 },
    { value: "Purchase and Sales", label: "Purchase and Sales",id:3 },
    { value: "Remortgage", label: "Remortgage",id:4 },
  ];
  
  const toggleJurisdiction = (option) => {
    setSelectedJurisdictions(prev => {
      prev = prev || []; // ensure array
  
      const exists = prev.some(item => item.value === option.value);
  
      const updated = exists
        ? prev.filter(item => item.value !== option.value)
        : [...prev, option];
  
      handleChange({
        name: "regions",
        value: updated.map(x => x.value),
      });
  
      return updated;
    });
  };
  
  
  const [selectedServices, setSelectedServices] = useState([]);
  
  const togglesercice = (opt) => {
   
    setSelectedServices((prev) => {
      const exists = prev.some(item => item.value === opt.value);
  
    const updated = exists
        ? prev.filter(item => item.value !== opt.value)
        : [...prev, opt];
  
  console.log(updated);
      // update form
      const values = updated.map(x => x.id);
      handleChange({ name: "service_id", value: values });
  
      return updated;
    });
  
  
  }

  // --- Mock Data for Illustration (Unchanged) ---
  const userDetails = {
    name: "DevaPrasad A.S",
    email: "deva@example.com",
  };

  const quotesList = [
    { id: 1, text: "ABC Legal Hub", status: "Status" },
   
  ];
  // -----------------------------------

  function handlechangepage(val) {
    // Toggle: if val is 1, set show to 1; if val is 2, set show to 2
    // If show is already 1 and val is 1, set to 2 (toggle), vice versa
    setshow(show === val ? (val === 1 ? 2 : 1) : val);
  }

  // Helper component to render the status button with dynamic colors (Unchanged)
  const StatusButton = ({ status }) => {
    let colorClass = '';
    switch (status) {
      case 'Status':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'Published':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'Draft':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  // Content for the 'MY Profile' section (Unchanged)
  const ProfileContent = () => (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">User Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-2xl font-bold">
            {userDetails.name[0]}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{userDetails.name}</p>
            <p className="text-sm text-gray-600">{userDetails.email}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-lg font-medium text-gray-700 mb-1">About Me</p>
          <p className="text-gray-600 italic">{userDetails.bio}</p>
        </div>
        
        {/* <button className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150">
          Edit Profile
        </button> */}
      </div>
    </div>
  );
 

  // Content for the 'MY Quotes' section (Unchanged)
  const QuotesContent = () => (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">My Quotes List ({quotesList.length})</h2>
      <div className="space-y-4">
        {quotesList.map((quote) => (
          <div
            key={quote.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150"
          >
            <p className="text-gray-700 italic font-medium mb-2 sm:mb-0 max-w-2xl">
              "{quote.text}"
            </p>
            <div className="flex items-center space-x-3 flex-shrink-0" onClick={()=>{setshowpricebreakdown(true)}}>
              <StatusButton status={quote.status} />
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
 const Partnerquotescontent = () => {
  return (
    <div>
          <section className="flex-1">
            <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-auto">
              <div className="p-6">
                {/* Breadcrumb */}
               

                {/* FORM */}
                <form className="mt-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="Name" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                      Firm Name<span className = "text-red-500">*</span>
                      </label>
                      <input
                        id="Name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Enter Company name"
                        className={`block w-full h-[44px] rounded-[10px] border ${errors.company_name ? "border-red-500" : "border-[#D1D5DB]"}  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                      />
                      {errors.company_name && <p className="text-red-500 text-[12px] mt-1">{errors.company_name}</p>}
                       <div>
  <label
    htmlFor="phone"
    className="block text-[14px] text-[#6A7682] font-medium mb-1"
  >
    Phone No.<span className = "text-red-500">*</span>
  </label>
  <input
    id="phone"
    name="phone_number"
    value={formData.phone_number}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only numbers and limit to 12 digits
      if (/^\d{0,10}$/.test(value)) {
        handleChange(e);
      }
    }}
    placeholder="Enter Phone number"
    className={`block w-full h-[44px] rounded-[10px] text-[#1B1D21] placeholder-[#1B1D21] border ${
      errors.phone_number ? "border-red-500" : "border-[#D1D5DB]"
    } px-3 text-[14px] focus:outline-none`}
  />
  {errors.phone_number && (
    <p className="text-red-500 text-[12px] mt-1">{errors.phone_number}</p>
  )}
   <div>
                      <label htmlFor="c_website" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                        Website Url
                      </label>
                      <input
                        id="c_website"
                        name="websiter"
                        type="text"
                        value={formData.websiter}
                        onChange={handleChange}
                        placeholder="Enter Website Url"
                        className="block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] focus:outline-none"
                      />
                    </div>
</div>
                    
                    </div>
<div className="flex flex-col items-start">
<label className="text-[14px] text-[#6A7682] font-medium mb-2 block">
    Company Logo
  </label>

  {/* Container */}
  <div className="relative flex items-center gap-4">

    {/* Logo circle */}
    <div className="relative">
      <div
        className={`w-[120px] h-[120px] rounded-full  
        ${errors.logo ? "border-red-500" : "border-gray-300"} 
        bg-center bg-cover flex items-center justify-center text-gray-400 text-sm`}
       
      >
        <img src={image?image:"https://www.clipartmax.com/png/small/283-2833048_small-business-logo-icon-company-name-icon.png"} style={{ width: "100%" } }></img>
       
      </div>

      {/* Pencil Icon (Edit Button) */}
      <label
        htmlFor="imageUpload"
        className="absolute bottom-1 right-1 bg-white hover:bg-gray-200 border rounded-full p-2 shadow cursor-pointer"
      >
        <Pencil size={14} className="text-gray-700" />
      </label>

      {/* Hidden Input */}
      <input
        type="file"
        id="imageUpload"
        accept=".png, .jpg, .jpeg"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

  </div>
  </div>
                 
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                        Email<span className = "text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className={`block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border ${errors.email ? "border-red-500" : "border-[#D1D5DB]"} px-3 text-[14px] focus:outline-none`}
                      />
                      {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                    </div>

                      <div>
                      <label htmlFor="Name" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                   SRA/CLC Number <span className = "text-red-500">*</span>
                      </label>
                      <input
                        id="Name"
                        name="SRA_CLC_number"
  value={formData.SRA_CLC_number || ""}
                          onChange={handleChange}
                        placeholder="Enter Company name"
                        className={`block w-full h-[44px] rounded-[10px] border ${errors.company_name ? "border-red-500" : "border-[#D1D5DB]"}  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                      />
                      {errors.company_name && <p className="text-red-500 text-[12px] mt-1">{errors.company_name}</p>}
                    </div>
                  </div>
<div className="grid grid-cols-2 gap-4 mt-4">
                 
       

         
                  </div>

                  {/* Row 3 - Logo Upload */}
            
  
  {/* LEFT COLUMN — Jurisdictions */}
          <div className="grid grid-cols-1 mt-2">
<div className="flex flex-col gap-2">
    <label className="block text-sm font-medium text-[#6A7682]">
      Services We Offered <span className="text-red-500">*</span>
    </label>

    <div className="grid grid-cols-4 gap-3 mt-2">
  {serviceoptions.map((opt) => (
    <label key={opt.id} className="flex items-center gap-2 ">
      <input
        type="checkbox"
        checked={selectedServices.some(s => s.id === opt.id)}
        onChange={() => togglesercice(opt)}
        className="w-4 h-4"
      />
   {opt.label.length <= 5 ? (
  <span className="text-[#6A7682] text-sm font-medium ">{opt.label}</span>
) :  <span className="text-[#6A7682] text-sm font-medium">{opt.label}</span>}
    </label>
  ))}
</div>
 
   

</div>
        <div className="flex flex-col gap-2 mt-2">
    <label className="block text-sm font-medium text-[#6A7682]">
      Jurisdictions Covered <span className="text-red-500">*</span>
    </label>



    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
  {jurisdictions.map((opt, index) => (
    <label key={index} className="flex items-center gap-2 cursor-pointer text-[#6A7682]">
      <input
        type="checkbox"
checked={ (selectedJurisdictions).some(item => item.value === opt.value) }
        onChange={() => toggleJurisdiction(opt)}
        className="w-4 h-4"
      />
      <span>{opt.label}</span>
    </label>
  ))}
</div>

  </div>
          </div>

              
<div className="mt-5 grid grid-cols-1 gap-4">
 
  {/* Label */}
 
            <div className="flex flex-col gap-2 w-full">
    <label className="block text-sm font-medium text-[#6A7682]">
      Language Availability <span className="text-red-500">*</span>
    </label>

   
  <div className="grid grid-cols-9 gap-3 mt-3 border p-2 w-full font">
  {language.map((lang, index) => (
    <label key={index} className="flex items-center gap-2">
      <input
        type="checkbox"
        value={lang.value}
        checked={selectedLanguage?.some(l => l.value === lang.value)}
        onChange={() => handleChangeLang(lang)}
      />
      <span className="font text-[#6A7682]" >{lang.label}</span>
    </label>
  ))}
</div>


  </div>
 
       
</div>
<div className="mt-5 grid grid-cols-1 gap-4">

</div>
     <div className="mt-10">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Enter Additional Information
      </label>

   <div className="bg-white border border-gray-300 rounded-md">
  <textarea
  name="additional_info"
    onChange={handleChange}
    placeholder="Type your message here..."
    className="min-h-[150px] w-full text-black p-2 outline-none rounded-md"
  ></textarea>
</div>

    </div>
    

               <div className="mt-20 flex justify-end gap-4 w-full ">
            

              <button
                type="button"
                onClick={handleContinue}
                className="font-outfit mb-6  font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Update →
              </button>
            </div>
   
                </form>
              </div>
            </div>

         
          </section>
   
    </div>
  );
};



  return (
    // 1. GRID CONTAINER: Establishes the grid layout
    <div className='min-h-screen  '>
      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>
      <div className='mx-auto px-4 lg:px-16  grid grid-cols-1 md:grid-cols-4  gap-8 govt_by_scheme mt-30 mb-10'>

        {/* 2. ASIDE/SIDEBAR: Spans 1 column. Styled for a menu look. */}
        <aside className="govt_by_scheme md:col-span-1 govt_by_scheme p-6 h-auto max-h-80 bg-white shadow-lg rounded-xl font">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">DevaPrasad</h3>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2">
            <span
              onClick={() => handlechangepage(1)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                show
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
            👤 Company Profile
            </span>
            <span
              onClick={() => handlechangepage(2)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                !show
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
           
                   📜 Fee Details
            </span>
          </div>
        </aside>

        {/* 3. SECTION/MAIN CONTENT: Spans the remaining 3 columns */}
        <section className="govt_by_scheme md:col-span-3 govt_by_scheme">
          <main>
          
              <div>
                <div>

                {show == 1 && <Partnerquotescontent/>}

                <div className='mt-5'>
                  {show == 2 && <PriceBreakdownCard/>}
                  
                   </div>
                   </div>

              

               
                 
                
            
               
               
              </div>
              
           
           
          </main>
        </section>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Partnersprofile