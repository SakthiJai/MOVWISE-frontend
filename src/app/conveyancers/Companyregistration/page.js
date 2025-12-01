'use client';

import Link from "next/link";
import Navbar from "../../parts/navbar/page";
import { API_BASE_URL } from "../../constants/config";
import React, { useEffect, useState } from "react";
import { Languages, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "../../parts/Footer/footer";

import { useFormStore } from "../../store/useFormStore";
import Select from "react-select";
import { API_ENDPOINTS, getData, postData } from "../../auth/API/api";
import { set } from "react-hook-form";

export default function Companyregistration() {

 useEffect(()=>{
  const storedData = localStorage.getItem("companyData");
  
  if (storedData) {
    setFormData(JSON.parse(storedData));
  }
   //console.log("storedData",JSON.parse(storedData).languages);
  if(formData.languages){
    //handleChange({})
    
    const ids = formData.languages.map(item => item.id);
   handleChange({ name: "languages", value: JSON.parse(storedData).languages })
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
  });
  const [languagepreference, setlanguagepreference] = useState(" ");

  const [language, setLanguage] = useState([]);

   const [selectedLanguage, setSelectedLanguage] = useState([]); 
const [notes, setNotes] = useState("");
 let initialcompanydata={
  "company_details": {
    "company_name": "ABCdef",
    "logo": "base64string",
    "phone_number": "9876543210",
    "email": "info123@abc.com",
    "website": "www.abc.com",
    "languages": [1, 2]
  },
  "notes": "This is a sample note for testing.",
  "pricing": [
    {
      "1": [
        {
          "fees_category_id": 1,
          "price_id": null,
          "price_list": [
            {
              "min": 100,
              "max": 200,
              "purchase_leasehold": 150,
              "purchase_freehold": 180,
              "sales_leasehold": 120,
              "sales_freehold": 140,
              "remortgage": 160
            }
          ]
        }
      ]
    },
    {
      "2": [
        {
          "fees_category_id": 2,
          "type_id": 1,
          "price_list": [
            {
              "fee_amount": 50,
              "paid_to": "Lawyer",
              "description": "Purchase fee"
            }
          ]
        }
      ]
    },
    {
      "5": [
        {
          "fees_category_id": 5,
          "type_id": 40,
          "price_list": [
            {
              "fee_amount": 75,
              "paid_to": "Notary",
              "description": "Sales fee"
            }
          ]
        }
      ]
    }
  ]
}
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
console.log(data.languages);

        languageOptions.forEach(element => {
          
        if(JSON.parse(localStorage.getItem("companyData")).languages.indexOf(element.id)>=0){
        
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
  useEffect(() => {
    fetchlanguages();
  }, []);
   

// const handleChangeLang = (selectedOptions = []) => {
//      const hasNotRequired = selectedOptions.some(
//     (option) => option.value === "Not Required"
//   );
//  if (hasNotRequired) {
//     // Keep only "Not Required" selected
//     const notRequiredOption = lang.find(opt => opt.value === "Not Required");
//     setSelectedLanguage([notRequiredOption]);
//    handleChange({ name: "languages", value: [0] })
    
//   } else {
//     // Normal behavior for other lenders
//     setSelectedLanguage(selectedOptions);
//     const ids = selectedOptions.map(item => item.id);
//    handleChange({ name: "languages", value: ids })
//   }
// }

 const handleChangeLang = (lang=[]) => {
  setSelectedLanguage((prev) => {
    const exists = prev.some((item) => item.value === lang.value);

    let updated;
updated = [...prev, opt];
    

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
  const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);


const serviceoptions = [
  { value: "Purchase", label: "Purchase",id:1 },
  { value: "Sales", label: "Sales",id:2 },
  { value: "Purchase and Sales", label: "Purchase and Sales",id:3 },
  { value: "Remortgage", label: "Remortgage",id:4 },
];

const toggleJurisdiction = (selectedOptions) => {
  setSelectedJurisdictions(selectedOptions);
console.log(selectedOptions)

  // Extract only values to store in formData
  const values = selectedOptions.map(opt => opt.value);
 handleChange({ name: "regions", value: values })};

const [selectedServices, setSelectedServices] = useState([]);

const togglesercice = (opt) => {
 
  setSelectedServices((prev) => {
    const exists = prev.some(item => item.id === opt.id);

    let updated;
updated = [...prev, opt];
console.log(updated);
    // update form
    const values = updated.map(x => x.id);
    handleChange({ name: "service_id", value: values });

    return updated;
  });


}


  return (
    <div>
    <div className="min-h-screen bg-white antialiased  font-outfit mb-5">
      {/* Navbar */}
      <Navbar />
<main className="grid grid-cols-12 pt-10">
  <div className="flex gap-12 col-span-8 col-start-3 ">


          {/* Left Side Stepper */}
        

          {/* Right Side Form */}
          <section className="flex-1">
            <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-auto">
              <div className="p-6">
                {/* Breadcrumb */}
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4">
                  <Link href="/" className="other-page">Home</Link>
                  <span>/</span>
                  <span className="live-page">Company registration</span>
                  
                </nav>

                <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21]">Share your Company Details</h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280]">
                  By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.
                </p>

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
                    </div>

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
<div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="Name" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                   SRA/CLC Number <span className = "text-red-500">*</span>
                      </label>
                      <input
                        id="Name"
                        name="SRA_CLC_number"
                        value={formData.SRA_CLC_number}
                        onChange={handleChange}
                        placeholder="Enter Company name"
                        className={`block w-full h-[44px] rounded-[10px] border ${errors.company_name ? "border-red-500" : "border-[#D1D5DB]"}  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                      />
                      {errors.company_name && <p className="text-red-500 text-[12px] mt-1">{errors.company_name}</p>}
                    </div>
       
<div className="flex flex-col gap-2">
    <label className="block text-sm font-medium text-[#6A7682]">
      Services We Offered <span className="text-red-500">*</span>
    </label>

    {/* <Select
      options={serviceoptions}
      isMulti
      name="service_id"
      instanceId="region-select"
      value={selectedServices}
      onChange={togglesercice}
      placeholder="Choose Services..."
      className="text-black mt-2"
    /> */}

    <div className="grid grid-cols-4 gap-3 mt-2">
  {serviceoptions.map((opt) => (
    <label key={opt.id} className="flex items-center gap-2 ">
      <input
        type="checkbox"
        checked={selectedServices.some(s => s.id === opt.id)}
        onChange={() => togglesercice(opt)}
      />
   {opt.label.length <= 5 ? (
  <span className="text-black text-sm font-medium ">{opt.label}</span>
) :  <span className="text-black text-sm font-medium">{opt.label}</span>}

    </label>
  ))}
</div>
  </div>
         
                  </div>

                  {/* Row 3 - Logo Upload */}
             <div className="grid grid-cols-2 gap-6 mt-4">
  
  {/* LEFT COLUMN — Jurisdictions */}
  <div className="flex flex-col gap-2">
    <label className="block text-sm font-medium text-[#6A7682]">
      Jurisdictions Covered <span className="text-red-500">*</span>
    </label>

    <Select
      options={jurisdictions}
      isMulti
      name="regions"
      instanceId="region-select"
      value={selectedJurisdictions}
      onChange={toggleJurisdiction}
      placeholder="Choose regions..."
      className="text-black mt-2"
    />
  </div>

  {/* RIGHT COLUMN — Languages */}
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
                Continue to Price breakdown  →
              </button>
            </div>
   
                </form>
              </div>
            </div>

         
          </section>
        </div>
      </main>
         {/* Bottom Actions */}
           
    </div>
    <Footer />
    </div>
  );
};
