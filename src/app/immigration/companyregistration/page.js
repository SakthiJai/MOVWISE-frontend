"use client";

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
let audience_target = ["Individuals", "Businesses"]
let category_types=["general, visit, study, work, family, settlement, citizenship, appeals, protection, euss, bno, sponsor, cos, compliance"]
let Category_service =  [
  {
    "id": 1,
    "service_code": "CON",
    "service_name": "Initial Consultation",
    "category": "General",
    "target_audience": "Individuals",
    "home_office_fee_ref": "N/A",
    "service_support":"false"
  },
  {
    "id": 2,
    "service_code": "VIS",
    "service_name": "Standard Visitor Visa",
    "category": "Visit",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£115 - £200",
    "service_support":"false"
  },
  {
    "id": 3,
    "service_code": "STS",
    "service_name": "Short-Term Study Visa",
    "category": "Study",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£200",
    "service_support":"false"
  },
  {
    "id": 4,
    "service_code": "STU",
    "service_name": "Student Visa",
    "category": "Study",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£490",
    "service_support":"false"
  },
  {
    "id": 5,
    "service_code": "GRAD",
    "service_name": "Graduate Visa",
    "category": "Study",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£822",
    "service_support":"false"
  },
  {
    "id": 6,
    "service_code": "SKW",
    "service_name": "Skilled Worker Visa",
    "category": "Work",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£719 - £1,500",
    "service_support":"false"
  },
  {
    "id": 7,
    "service_code": "GLO",
    "service_name": "Global Talent Visa",
    "category": "Work",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£167 - £623",
    "service_support":"false"
  },
  {
    "id": 8,
    "service_code": "INN",
    "service_name": "Innovator Founder Visa",
    "category": "Work",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,036",
    "service_support":"false"
  },
  {
    "id": 9,
    "service_code": "ANC",
    "service_name": "UK Ancestry Visa",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£637",
    "service_support":"false"
  },
  {
    "id": 10,
    "service_code": "YMS",
    "service_name": "Youth Mobility Scheme",
    "category": "Work",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£298",
    "service_support":"false"
  },
  {
    "id": 11,
    "service_code": "SPO",
    "service_name": "Spouse/Partner Visa (First)",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,846",
    "service_support":"false"
  },
  {
    "id": 12,
    "service_code": "SPX",
    "service_name": "Spouse/Partner Visa (Extension)",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,048",
    "service_support":"false"
  },
  {
    "id": 13,
    "service_code": "FIAN",
    "service_name": "Fiancé(e) Visa",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,846",
    "service_support":"false"
  },
  {
    "id": 14,
    "service_code": "DEP",
    "service_name": "Dependent Visas",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,846",
    "service_support":"false"
  },
  {
    "id": 15,
    "service_code": "ADR",
    "service_name": "Adult Dependent Relative Visa",
    "category": "Family",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£3,250",
    "service_support":"false"
  },
  {
    "id": 16,
    "service_code": "ILR-F",
    "service_name": "ILR - Family Route (SET M)",
    "category": "Settlement",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£2,885",
    "service_support":"false"
  },
  {
    "id": 17,
    "service_code": "ILR-W",
    "service_name": "ILR - Work Route (SET O)",
    "category": "Settlement",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£2,885",
    "service_support":"false"
  },
  {
    "id": 18,
    "service_code": "ILR-L",
    "service_name": "ILR - Long Residence (10+ yrs)",
    "category": "Settlement",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£2,885",
    "service_support":"false"
  },
  {
    "id": 19,
    "service_code": "CIT-N",
    "service_name": "British Citizenship - Naturalisation",
    "category": "Citizenship",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,580"
  },
  {
    "id": 20,
    "service_code": "CIT-R",
    "service_name": "British Citizenship - Registration",
    "category": "Citizenship",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£1,580"
  },
  {
    "id": 21,
    "service_code": "AR",
    "service_name": "Administrative Review",
    "category": "Appeals",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£80 - £120",
    "service_support":"false"
  },
  {
    "id": 22,
    "service_code": "APP",
    "service_name": "Appeal Representation (First-Tier)",
    "category": "Appeals",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£140",
    "service_support":"false"
  },
  {
    "id": 23,
    "service_code": "JR",
    "service_name": "Judicial Review",
    "category": "Appeals",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£154 - £225",
    "service_support":"false"
  },
  {
    "id": 24,
    "service_code": "BAIL",
    "service_name": "Immigration Bail Applications",
    "category": "Appeals",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£80"
  },
  {
    "id": 25,
    "service_code": "ASYL",
    "service_name": "Asylum Application",
    "category": "Protection",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£0"
  },
  {
    "id": 26,
    "service_code": "EUSS-P",
    "service_name": "EUSS - Pre-Settled/Settled",
    "category": "EUSS",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£0 - £80",
    "service_support":"false"
  },
  {
    "id": 27,
    "service_code": "EUSS-F",
    "service_name": "EUSS - Family Permit",
    "category": "EUSS",
    "target_audience": "Individuals",
    "home_office_fee_ref": "£80 - £180",
    "service_support":"false"
  },
  {
    "id": 28,
    "service_code": "BNO",
    "service_name": "BN(O) Status Holder Visa",
    "category": "BNO",
    "target_audience": "Individuals",
    "service_support":"false",
    "home_office_fee_ref": "£180 - £250"
  },
  {
    "id": 29,
    "service_code": "SPL",
    "service_name": "Sponsor Licence Application",
    "category": "Sponsor",
    "target_audience": "Businesses",
    "home_office_fee_ref": "£536 - £1,476",
    "service_support":"false"
  },
  {
    "id": 30,
    "service_code": "SPR",
    "service_name": "Sponsor Licence Renewal/Re-rating",
    "category": "Sponsor",
    "target_audience": "Businesses",
    "home_office_fee_ref": "£536 - £1,476"
  },
  {
    "id": 31,
    "service_code": "SPC",
    "service_name": "Sponsor Licence Compliance Audit",
    "category": "Sponsor",
    "target_audience": "Businesses",
    "home_office_fee_ref": "N/A"
  },
  {
    "id": 32,
    "service_code": "SPA",
    "service_name": "Sponsor Duty Action Plan",
    "category": "Sponsor",
    "target_audience": "Businesses",
    "home_office_fee_ref": "N/A",
    "service_support":"false"
  },
  {
    "id": 33,
    "service_code": "COS-D",
    "service_name": "COS - Defined Allocation Request",
    "category": "COS",
    "target_audience": "Businesses",
    "home_office_fee_ref": "£25",
    "service_support":"false"
  },
  {
    "id": 34,
    "service_code": "COS-U",
    "service_name": "COS - Undefined Assignment Advice",
    "category": "COS",
    "target_audience": "Businesses",
    "home_office_fee_ref": "£25"
  },
  {
    "id": 35,
    "service_code": "BULK",
    "service_name": "Skilled Worker - Bulk Applications",
    "category": "Work",
    "target_audience": "Businesses",
    "home_office_fee_ref": "£719 - £1,500"
  },
  {
    "id": 36,
    "service_code": "RTS",
    "service_name": "Right to Work Check Training & Audit",
    "category": "Compliance",
    "target_audience": "Businesses",
    "home_office_fee_ref": "N/A",
    "service_support":"false"
  }
]
const [categoryVat, setCategoryVat] = useState({});

const [selectedServicesoption, setSelectedServicesoption] = useState(() =>
  Category_service.map((item) => ({
    ...item,
    includeVat: false,
    fees: "",
  }))
);
let service_error = ""

console.log("check =>",selectedServicesoption)


  useEffect(() => {
    const storedData = localStorage.getItem("companyData");

    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    //console.log("storedData",JSON.parse(storedData).languages);
    if (formData.languages) {
      //handleChange({})

      const ids = formData.languages.map((item) => item.id);
      handleChange({
        name: "languages",
        value: JSON.parse(storedData).languages,
      });
    }
  }, []);

  const [lang, setLang] = useState([]);
  const router = useRouter();
  const { updateCompanyData } = useFormStore();
  const [formData, setFormData] = useState({
    company_name: "",
    phone_number: "",
    email: "",
    website: "",
    password: "",
    logo: "",
  });
  const [languagepreference, setlanguagepreference] = useState(" ");
  const [imageerror, setimageerror] = useState("");
  const [language, setLanguage] = useState([]);
  const [lender, setLender] = useState([]);
  const [selectedlender, setselectedLender] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
  const [notes, setNotes] = useState("");
  const [jurisdictions, setjuisdictions] = useState([]);

const [selectedAudience, setSelectedAudience] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

const [selectedServices, setSelectedServices] = useState([]);
const [showServicePopup, setShowServicePopup] = useState(false);
const [selectedServiceIds, setSelectedServiceIds] = useState([]);


const categories = [
  ...new Set(
    Category_service
      .filter((service) => service.target_audience === selectedAudience)
      .map((service) => service.category)
  )
];

const filteredServices = Category_service.filter(
  (service) =>
    service.target_audience === selectedAudience &&
    service.category === selectedCategory
);


  const fetchlanguages = async () => {  
    try {
      const languages = await getData(API_ENDPOINTS.languages);
      const region = await getData(API_ENDPOINTS.region);

      setjuisdictions(
        region.users.map((item) => ({
          label: item.region_name,
          value: item.id,
        }))
      );

      console.log(languages.users);
      if (Array.isArray(languages.users)) {
        const languageOptions = languages.users.map((l) => ({
          value: l.language_name,
          label: l.language_name,
          id: l.id,
        }));

        setLanguage([...languageOptions]);

        // handleChange({ name: "languages", value: JSON.parse(localStorage.getItem("companyData")).languages })

        if (localStorage.getItem("companyData")) {
          let templang = [];

          const data = JSON.parse(localStorage.getItem("companyData"));
          console.log(data);
          console.log(data.languages);

          languageOptions.forEach((element) => {
            if (
              JSON.parse(
                localStorage.getItem("companyData")
              ).languages?.indexOf(element.id) >= 0
            ) {
              templang.push(element);
            }
          });
          setSelectedLanguage(templang);
        }
      }

      if (
        localStorage.getItem("companyData") &&
        JSON.parse(localStorage.getItem("companyData")).regions
      ) {
        let templang = [];
        region.users.forEach((element) => {
          // console.log(element.id,JSON.parse(localStorage.getItem("companyData")).regions,JSON.parse(localStorage.getItem("companyData")).regions.indexOf(element.id))
          if (
            JSON.parse(localStorage.getItem("companyData")).regions.indexOf(
              element.id
            ) >= 0
          ) {
            (element.value = element.id), (element.label = element.region_name);
            templang.push(element);
          }
        });
        setSelectedJurisdictions(templang);
      }
      if (localStorage.getItem("companyData")) {
        let templang = [];
        serviceoptions.forEach((element) => {
          // console.log(element.id,JSON.parse(localStorage.getItem("companyData")).regions,JSON.parse(localStorage.getItem("companyData")).regions.indexOf(element.id))
          if (
            JSON.parse(localStorage.getItem("companyData")).service_id.indexOf(
              element.id
            ) >= 0
          ) {
            templang.push(element);
          }
        });
        setSelectedServices(templang);
      }
      //selectedServices
    } catch (error) {
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
const toggleLender = (lenderItem) => {
  setselectedLender((prev) => {
    const exists = prev.includes(lenderItem.id);

    const updated = exists
      ? prev.filter((id) => id !== lenderItem.id)
      : [...prev, lenderItem.id];

    // Update form data
    setFormData((f) => ({
      ...f,
      lender: updated,
    }));

    // Clear error
    setErrors((e) => ({ ...e, lender: "" }));

    return updated;
  });
};
useEffect(() => {
  const fetchLenders = async () => {
    try {
      const res = await getData(API_ENDPOINTS.lenders);

      // Example: API returns { users: [...] }
      if (Array.isArray(res.users)) {
        const lenderOptions = res.users.map((l) => ({
          value: l.lenders_name,
          label: l.lenders_name,
          id: l.id,
        }));

        setLender([
          { value: "Not Known", id: 0, label: "Not Known" },
          ...lenderOptions,
        ]);
      }
    } catch (err) {
      console.error("Error fetching lenders:", err);
    }
  };

  fetchLenders();
}, []);



  const handleChangeLang = (lang = {}) => {
    setSelectedLanguage((prev) => {
      const exists = prev.some((item) => item.value === lang.value);

      let updated;

      if (exists) {
        // REMOVE → uncheck
        updated = prev.filter((item) => item.value !== lang.value);
      } else {
        // ADD → check
        updated = [...prev, lang];
      }

      console.log("updated:", updated);

      // update form data
      setFormData((f) => ({
        ...f,
        languages: updated.map((x) => x.id),
      }));

      // Clear error
    setErrors((prevErr) => ({ ...prevErr, language: "" }));

      return updated;
    });
  };

  // Error & Image states
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");

  // ✅ Unified handleChange function
  const handleChange = (e) => {
    // If called from input event

    if (e.target && e.target != undefined) {
      console.log(e.target);
      let { name, value } = e.target;
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      })); // For phone number: allow only digits and limit to 12
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

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      let { name, value } = e;
      console.log(name, value);
      if (name == "languages") {
        setFormData((prev) => ({
          ...prev,
          languages: Array.isArray(value)
            ? value // replace entire array
            : [...prev.languages, value], // push if single value // 👈 push value into array
        }));
      }
      if (name == "regions") {
        setFormData((prev) => ({
          ...prev,
          regions: Array.isArray(value) ? value : [...prev.regions, value], // 👈 push value into array
        }));
      }
      if (name == "service_id") {
        setFormData((prev) => ({
          ...prev,
          service_id: Array.isArray(value)
            ? value
            : [...prev.service_id, value], // 👈 push value into array
        }));
      }
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      })); // For phone number: allow only digits and limit to 12
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

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(formData);
    }
  };

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
    console.log(errors);
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
      setimageerror("");
      const file = e.target.files[0];
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  if (file.size > MAX_SIZE) {
    setimageerror("File size exceeds 2MB limit");
    console.log(imageerror)
    e.target.value = ""; // reset input
    return;
  }
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setImage(base64String); // ✅ for preview

          // ✅ also set inside form data
          setFormData((prev) => ({
            ...prev,
            logo: base64String  // <-- your required key
          }));
        };

        reader.readAsDataURL(file);
      }
    };

  // Handle Continue button click
  const handleContinue = () => {

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

    if (!formData.password?.trim()) {
  newErrors.password = "Password is required";
} else if (formData.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters";
}

  
    if (selectedLanguage.length === 0) {
      newErrors.language = "Please select at least one language";
    }
 
    if (!formData.sra_clc_number?.trim()) {
      newErrors.sra_clc_number = "SRA / CLC Number is required";
    } else if (formData.sra_clc_number.trim().length < 3) {
      newErrors.sra_clc_number = "Enter a valid SRA / CLC Number";
    }

   if(!imageerror==""){
    console.log(imageerror)
    newErrors.logo = "Enter a valid logo";
   }

 const selectedServices = selectedServicesoption.filter((service) =>
  selectedServiceIds.includes(service.id)
);





if (selectedServices.length === 0) {
  newErrors.service_error = "Please select at least one service";
} 



    // Logo validation

    setErrors(newErrors);
    console.log(errors,Object.keys(newErrors).length);
    // Navigate only if valid
    if (Object.keys(newErrors).length === 0) {
      console.log("checking error")
      updateCompanyData({ ...formData, logo: image });
setFormData((prev) => ({
  ...prev,
  logo: image,
  services: selectedServicesoption
}));
      localStorage.removeItem("companyData");
      localStorage.setItem("companyData", JSON.stringify({ ...formData }));
      console.log("inside navigation",formData);
    }
    console.log(errors);
setShowServicePopup(true);

  };

  const serviceoptions = [
    { value: "Purchase", label: "Purchase", id: 2 },
    { value: "Sales", label: "Sales", id: 1 },
    { value: "Purchase and Sales", label: "Purchase and Sales", id: 3 },
    { value: "Remortgage", label: "Remortgage", id: 4 },
  ];

  const toggleJurisdiction = (option) => {
    setSelectedJurisdictions((prev) => {
      prev = prev || []; // ensure array

      const exists = prev.some((item) => item.value === option.value);

      const updated = exists
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option];

      handleChange({
        name: "regions",
        value: updated.map((x) => x.value),
      });

       // Clear error
    setErrors((prevErr) => ({ ...prevErr, jurisdictions: "" }));

      return updated;
    });
  };


const togglesercice = (opt) => {
  setSelectedServices((prev) => {
    const exists = prev.some((item) => item.value === opt.value);

    const updated = exists
      ? prev.filter((item) => item.value !== opt.value)
      : [...prev, opt];

    // Update form
    const values = updated.map((x) => x.id);
    handleChange({ name: "service_id", value: values });

    // Clear error using the SAME key as validation
    setErrors((prevErr) => ({ ...prevErr, services: "" }));

    return updated;
  });
};


  return (
    <div>
      <div className="min-h-screen bg-white antialiased  font-outfit mb-5">
        {/* Navbar */}
        <div className="bg-white shadow-md sticky top-0 p-4">
          <Navbar originalstyle={true} />
        </div>
        <main className="grid grid-cols-12 pt-10">
          <div className="flex gap-12 col-span-8 col-start-3 ">
            {/* Left Side Stepper */}

            {/* Right Side Form */}
            <section className="flex-1">
              <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-auto">
                <div className="p-6">
                  {/* Breadcrumb */}
                  <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4 mt-7">
                    <Link href="/" className="other-page">
                      Home
                    </Link>
                    <span>/</span>
                    <span className="live-page">Company registration</span>
                  </nav>

                  <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21]">
                    Share your Company Details
                  </h1>
                  <p className="mt-1 text-[14px] leading-5 text-[#6B7280]">
                    By completing this form your details are shared with up to 5
                    firms providing the quotes, but absolutely no one else.
                  </p>

                  {/* FORM */}
                  <form className="mt-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="Name"
                          className="block text-[14px] text-[#6A7682] font-medium mb-1"
                        >
                          Firm Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="Name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="Enter Company name"
                          className={`block w-full h-[44px] rounded-[10px] border ${
                            errors.company_name
                              ? "border-red-500"
                              : "border-[#D1D5DB]"
                          }  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                        />
                        {errors.company_name && (
                          <p className="text-red-500 text-[12px] mt-1">
                            {errors.company_name}
                          </p>
                        )}
                        <div className="mt-3">
                          <label
                            htmlFor="phone"
                            className="block text-[14px] text-[#6A7682] font-medium mb-1"
                          >
                            Phone No.<span className="text-red-500">*</span>
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
                              errors.phone_number
                                ? "border-red-500"
                                : "border-[#D1D5DB]"
                            } px-3 text-[14px] focus:outline-none`}
                          />
                          {errors.phone_number && (
                            <p className="text-red-500 text-[12px] mt-1">
                              {errors.phone_number}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <label className="text-[14px] text-[#6A7682] font-medium mb-2 block">
                          Firm Logo
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
                              <img
                                src={
                                  image
                                    ? image
                                    : "https://www.clipartmax.com/png/small/283-2833048_small-business-logo-icon-company-name-icon.png"
                                }
                                style={{ width: "100%" }}
                              ></img>
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
                            <span className="text-red-600">{imageerror}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 ">
                      <div>
                        <label
                          htmlFor="c_website"
                          className="block text-[14px] text-[#6A7682] font-medium mb-1"
                        >
                          Website Url
                        </label>
                        <input
                          id="c_website"
                          name="website"
                          type="text"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="Enter Website Url"
                          className="block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          className="block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] focus:outline-none"
                        />
                        {errors.password && (
    <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
  )}
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[14px] text-[#6A7682] font-medium mb-1"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          className={`block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border ${
                            errors.email ? "border-red-500" : "border-[#D1D5DB]"
                          } px-3 text-[14px] focus:outline-none`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[12px] mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="Name"
                          className="block text-[14px] text-[#6A7682] font-medium mb-1"
                        >
                          SRA/CLC Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="sra_clc_number"
                          name="sra_clc_number"
                          value={formData.sra_clc_number || ""}
                          onChange={handleChange}
                          placeholder="Enter sra_clc_number "
                          className={`block w-full h-[44px] rounded-[10px] border ${
                            errors.company_name
                              ? "border-red-500"
                              : "border-[#D1D5DB]"
                          }  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                        />
                        {errors.sra_clc_number && (
                          <p className="text-red-500 text-[12px] mt-1">
                            {errors.sra_clc_number}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3 - Logo Upload */}

              

                    <div className="mt-5 grid grid-cols-1 gap-4">
                      {/* Label */}

                      <div className="flex flex-col gap-2 w-full">
                        <label className="block text-sm font-medium text-[#6A7682]">
                          Language Availability{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="grid grid-cols-9 gap-3 mt-3 border p-2 w-full font">
                          {language.map((lang, index) => (
                            <label
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                value={lang.value}
                                checked={selectedLanguage?.some(
                                  (l) => l.value === lang.value
                                )}
                                onChange={() => handleChangeLang(lang)}
                              />
                              <span className="font text-[#6A7682]">
                                {lang.label}
                              </span>
                            </label>
                          ))}
                        </div>

                        {errors.language && (
  <p className="text-red-500 text-[12px] mt-1">
    {errors.language}
  </p>
)}

                      </div>
                    </div>

<div className="mt-5 flex flex-col gap-5">

  {/* Target Audience */}
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


  {/* Category */}
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
              setSelectedServices([]);
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


  {/* Services */}
  {selectedCategory && (
    <div>
      <label className="block text-sm font-medium text-[#6A7682] mb-2">
        Select Services<span className="text-red-500">*</span>
      </label>

      <div className="border rounded-md overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-3 font-medium text-[#6A7682]">
  <div>Service Name</div>

</div>

        {/* Service Rows */}
       {filteredServices.map((service) => {
  const selected = selectedServicesoption.find(
    (item) => item.id === service.id
  );

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
              event.target.checked
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

<div className="flex items-center gap-2 border-t bg-gray-50 p-3">
<input
  id={`vat-${selectedCategory}`}
  type="checkbox"
 disabled={
    !filteredServices.some((service) =>
      selectedServiceIds.includes(service.id)
    )
  }  
  checked={categoryVat[selectedCategory] || false}
  onChange={(event) => {
    const includeVat = event.target.checked;

    // Store VAT selection separately for each category
    setCategoryVat((previous) => ({
      ...previous,
      [selectedCategory]: includeVat,
    }));

    // Add the category VAT value to the existing service payload
   setSelectedServicesoption((previous) =>
  previous.map((item) =>
    item.category === selectedCategory
      ? { ...item, includeVat }
      : item
  )
);
  }}
/>

  <label
    htmlFor={`vat-${selectedCategory}`}
    className="text-sm font-medium text-[#6A7682]"
  >
    Include VAT for {selectedCategory} services
  </label>
</div>

      </div>
    </div>



  )}


  {errors.service_error? <p className="text-red-500 text-[12px] mt-1">{errors.service_error}</p>:""}

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

                    <div className="mt-6 flex justify-end gap-4 w-full ">
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="font-outfit mb-6  font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
                      >
                        Submit 
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

      {showServicePopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[18px] bg-white p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#1B1D21]">
            Selected Services
          </h2>
          <p className="mt-1 text-sm text-[#6A7682]">
            Review the service fees and VAT settings before submitting.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowServicePopup(false)}
          className="text-2xl text-gray-500 hover:text-gray-800"
          aria-label="Close popup"
        >
          &times;
        </button>
      </div>

      <div className="overflow-hidden rounded-md border">
        <div className="grid grid-cols-4 gap-4 bg-gray-100 p-4 font-semibold text-[#6A7682]">
          <div>Service</div>
          <div>Category</div>
          {/* <div>Fees</div> */}
          <div>VAT</div>
        </div>

        {selectedServicesoption
          
          .map((service) => (
            <div
              key={service.id}
              className="grid grid-cols-4 gap-4 border-t p-4 text-sm text-[#1B1D21]"
            >
              <div>{service.service_name}</div>
              <div>{service.category}</div>
              <div>{service.includeVat ? "Included" : "Excluded"}</div>
              {/* <div>{service.fees}</div> */}
              {/* <div>{service.includeVat ? "Included" : "Excluded"}</div> */}
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setShowServicePopup(false)}
          className="rounded-full border border-gray-300 px-6 py-2 text-gray-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            setShowServicePopup(false);
            // Continue with final API submission here
          }}
          className="rounded-full bg-[#1E5C3B] px-6 py-2 text-white"
        >
          Confirm and Submit
        </button>
      </div>
    </div>
  </div>
)}
    </div>



  );
}
