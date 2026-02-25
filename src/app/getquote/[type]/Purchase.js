"use client";
import React, { use, useEffect, useMemo, useState, useRef } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin, ChevronDown, Home, Coin, CoinsIcon } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import Select from 'react-select';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import LocationSearch, { onSelectAddressFullDetails } from '../Purchase/LocationSearch';
import AddressFields from './AddressFields';
import Signinmodal from "../../components/utility/Singingmodal";


export default function Purchase() {

  const closeModal = () => {
    console.log("closing...");
    setModalopen(false);
  };
  const partnerloginshow = false;
  const [showAddressLines, setShowAddressLines] = useState(false);
  const [rawValue, setRawValue] = useState("");
  const [lender, setLender] = useState([
    { value: "Not Known", label: "Not Known", id: 0 },
  ]);
  const [lang, setLang] = useState([
    { value: "Not Required", label: "Not Required", id: 0 },
  ]);
  const [buytolet_readonlyfield, setbuytolet_readonlyfield] = useState(false);
  const [addresskey, setaddresskey] = useState("");

  const stampDutyOptions = [
    { label: "First-Time Buyer ", value: "firstTime" },
    { label: "Additional Property (Second Home)", value: "additional" },
    { label: "Additional Property (Buy to let)", value: "Buy to let" },
    { label: "Home Moving", value: "HomeMoving" }
  ];
  const addition_applicable = [
   {label:  "Not Applicable" , value: "" },
    { label: "Islamic Mortgage", value: "Islamic Mortgage" },
    { label: "Equity Transfer", value: "Equity Transfer" },
    { label: "Expats / Overseas Client", value: "Expats / Overseas Client" }
  ];
  const buyToLetOptions = [
    { value: "personal", label: "Yes - Personal name" },
    { value: "company", label: "Yes - Company name" },
  ];
  const giftDepositOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];
  const purchaseRef = useRef(null);
  const formFieldRefs = useRef({});

  console.log(stampDutyOptions)


  useEffect(() => {
    console.log(purchaseRef.current); // now defined
  }, []);

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


  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const handleChangeLang = (selectedOptions = []) => {
    //    const hasNotRequired = selectedOptions.some(
    //   (option) => option.value === "Not Required"
    // );
    const hasNotRequired = false
    console.log(selectedOptions)
    if (selectedOptions == "Not Required") {
      const hasNotRequired = true
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

      handleChange("languages", [selectedOptions.id]);
    }

  }

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


  const options = ["1", "2", "3", "4", "5", "5+"];

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
      [`town_city`]: "",
      [`country`]: "",
    }));
  };

  const [formData, setFormData] = useState({
    "address": "",
    "address_line1": "",
    "address_line2": "",
    "country": "",
    "town_city": "",
    "languages": [],
    "service_type": 2,
    "stages": "",
    "purchase_price": "",
    "no_of_bedrooms": options[0],
    "property_type": "Flat",
    "leasehold_or_free": "Freehold",
    "new_build": "",
    "buy_to_let": "",
    "govt_by_scheme": 0,
    "obtaining_mortgage": 0,
    "lifetime_isa": 0,
    "need_hmo": 0,
    "gift_deposit": "",
    "ownership_housing_asso": 0,
    "specal_instruction": "",
    "lenders": "",
    "service_type": null,
    "purchase_mode": "",
    "high_raise_support": 0,
    "addition_applicable": "",
  });



  useEffect(() => {


    fetchPropertyTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);







  const router = useRouter();


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

  const [errors, setErrors] = useState({});

  const [selectedLenders, setSelectedLenders] = useState();



  const handleChange = (field, value) => {
    console.log(field, value);
    if (field == "property_type" && value != "Flat") {
      formData.high_raise_support = 0;
    }



    console.log(field, value);
    if (field == "purchase_mode" && (value == "firstTime" || value == "standard" || value == "additional" || value == "HomeMoving")) {
      console.log("check")
      setbuytolet_readonlyfield(true);
      formData.buy_to_let = "No";
      console.log(formData.buy_to_let)
    }
    else {
      setbuytolet_readonlyfield(false);
    }

    if (field === "purchase_price") {
      const cleaned = value.replace(/[^0-9.]/g, "");
      setRawValue(cleaned);
      setFormData(prev => ({ ...prev, purchase_price: cleaned }));
    }
    else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    console.log("updated", formData)
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
        setFormData((prev) => ({ ...prev, purchase_price: formatted }))
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [rawValue]);


  const [highRaiseSupport, setHighRaiseSupport] = useState("");

//fff
  const [query, setQuery] = useState("");
  const fetchPropertyTypes = async () => {
    localStorage.removeItem("getquote");
    console.log(lender)
    try {
      const data = await getData(API_ENDPOINTS.compareQuotes);
      const lenderData = await getData(API_ENDPOINTS.lenders);
      const languages = await getData(API_ENDPOINTS.languages);
      const addresskey = await getData(API_ENDPOINTS.api_key).then((value) => value.data.postal_code);
      console.log(addresskey);
      setaddresskey(addresskey)
      console.log("dchedk")

      if (Array.isArray(languages.users)) {
        const languageOptions = languages.users.map((l) => ({
          value: l.language_name,
          label: l.language_name,
          id: l.id,
        }));
        setLang([{ value: "Not Required", id: 0, label: "Not Required" }, ...languageOptions]);
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

        setLender([{ value: "Not Known", id: 0, label: "Not Known" }, ...lenderOptions]);
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
      if (data.purchaseStages && Array.isArray(data.purchaseStages)) {
        setStageOptions(data.purchaseStages.map((item, index) => ({ label: item.purchase_stage, value: item.purchase_stage })));
      }

    } catch (error) {
      console.log("Failed to load property types:", error);
    }
  };
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [modalopen, setModalopen] = useState(false);
  const [languagepreference, setlanguagepreference] = useState(" ");
  const [language, setLanguage] = useState([]);

  const scrollToFirstError = (errorObj) => {
    if (Object.keys(errorObj).length === 0) return;

    const firstErrorKey = Object.keys(errorObj)[0];
    const element = formFieldRefs.current[firstErrorKey];

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (element.focus && typeof element.focus === 'function') {
        setTimeout(() => {
          element.focus();
        }, 500);
      }
    }
  };

  const handleSubmit = (e) => {
    setFormData((prev) => ({ ...prev, ['service_type']: localStorage.getItem("service") }));
    e.preventDefault();

    let newErrors = {};

    if (!formData.stages) {
      newErrors.stages = "Please select a stage";
    }


    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.languages) {
      newErrors.languages = "please select a language"
    }

    if (!selectedLanguage || selectedLanguage.length === 0) {
      newErrors.preferLanguage = "Please select a language";
    }
    if ((!selectedLenders || selectedLenders.length === 0) && formData.obtaining_mortgage == 1) {
      newErrors.lenders = "Please select at least one lender";
    }

    /*  if (!formData.address.trim()) {
    newErrors.address = "Property address is required";
  } else if (formData.address.trim().length < 5) {
    newErrors.address = "Address must be at least 5 characters";
        }*/

    if (!formData.purchase_price) {
      newErrors.purchase_price = "purchase_price  is required";
    } else if (Number(formData.purchase_price) <= 0) {
      newErrors.purchase_price = "purchase_price must be a positive number";
    }

    if (!formData.no_of_bedrooms) {
      newErrors.no_of_bedrooms = "please select a no. of bedrooms"
    }
    if (!formData.property_type) {
      newErrors.property_type = "please select a property type"
    }
    if (!formData.leasehold_or_free) {
      newErrors.leasehold_or_free = "please select a leasehold or free"
    }
    if (!formData.property_type) {
      newErrors.property_type = "please select propertytype"
    }

    if (!formData.buy_to_let && formData.purchase_mode == "Buy to let") {
      newErrors.buy_to_let = "please select buy to let"
    }
    if (!formData.purchase_mode) {
      newErrors.purchase_mode = "please select purchase_mode"
    }
    /*if(!formData.addition_applicable){
      newErrors.addition_applicable="please select addition_applicable"
    }*/
    setErrors(newErrors);
    console.log(errors)

    // 🔴 SCROLL TO FIRST ERROR IF VALIDATION FAILS
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return;
    }

    // if no errors, submit
    if (Object.keys(newErrors).length === 0) {
      localStorage.removeItem("getquote");

      console.log("✅ Form submitted:", formData);
      localStorage.setItem("getquote", JSON.stringify(formData));
      localStorage.setItem("service", JSON.stringify(2))
      if (localStorage.getItem("user")) {
        formData.user_id = localStorage.getItem("user");
        localStorage.setItem("getquote", JSON.stringify(formData));
        router.push("/components/comparequotes");
      }
      else {
        setModalopen(true)
      }

    }

  };
  const [leasehold_or_free, setleasehold_or_free] = useState("");

  const leasehold_or_freeOptions = ["Leasehold", "Freehold"];

  const [bedrooms, setBedrooms] = useState("");


  // const options = ["1", "2", "3", "4", "5", "5+"];

  const [propertyType, setPropertyType] = useState("");

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
        return <FaHome size={22} color="#6c757d" />;
    }
  };



  const [loginformdata, setloginformdata] = useState({
    email: "",
    password: "",
  });


  function handlelanguagechange(e) {
    console.log(e.target.value);
    setlanguagepreference(e.target.value);
    setLanguage([]);
  }

  function languagecheckboxchange(item, checked, id) {
    if (checked) {
      setLanguage(prev => [...prev, item]);
      handleChange("languages", [...formData.languages, id])
      console.log(language);

    }
    else {
      setLanguage(prev => prev.filter(lang => lang !== item))
    }
  }

  const [loginformshow, setloginformshow] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-7">
      {/* Left stepper */}
      <aside className="hidden lg:block z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-1/2 lg:h-[80vh] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white lg:top-22" style={{ height: "88.5%" }}>
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



        <form className="mt-8 space-y-10" >
          {/* 🏡 PURCHASE DETAILS */}
          <div className="space-y-6 mb-4">
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
              < Home className="w-7 h-7 text-[#1E5C3B]" /> PURCHASE DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col">
                <label
                  htmlFor="stages"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  What stages are you at?<span className="text-red-500">*</span>
                </label>

                <Select
                  ref={(el) => { formFieldRefs.current['stages'] = el?.inputRef || el; }}
                  options={stageOptions}
                  styles={selectStyles}
                  value={stageOptions.find(
                    (opt) => opt.value === formData.stages
                  )}
                  onChange={(selected) =>
                    handleChange("stages", selected?.value || "")
                  }
                  isSearchable={false}
                  placeholder="Not Applicable"
                />



                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.stages ? "text-red-500 opacity-100" : "opacity-0"
                  }`}>
                  {errors.stages || "placeholder"} {/* placeholder keeps same height */}
                </p>

              </div>

              {/* 1. Property Address (Inline Input) */}
              <div className="flex flex-col h-full">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Property address:<span className="text-red-500">*</span>
                </label>
                <LocationSearch
                  ref={purchaseRef}
                  readOnly={showAddressLines}
                  // onSelectAddress={async (selected) => {
                  //   if (!selected) return;
                  //   // Clear address error immediately when selecting
                  //   //  if (errors.address) {
                  //   //   setErrors((prev) => ({ ...prev, address: "" }));
                  //   //   }
                  //   // Update formData with selected suggestion
                  //   setFormData((prev) => ({
                  //     ...prev,
                  //     selectedId: selected.id,
                  //     address: selected.suggestion,
                  //   }));
                  //   // Fetch full address details
                  //   console.log(purchaseRef);
                  //   const details = purchaseRef.current?.onSelectAddressFullDetails?.();
                  //   if (details) {
                  //     setFormData((prev) => ({
                  //       ...prev,
                  //       town_city: details.post_town || details.admin_district || "",
                  //       country: details.country || "",
                  //     }));
                  //   } else {
                  //     setErrors((prev) => ({
                  //       ...prev,
                  //       address: "Failed to fetch full address details.",
                  //     }));
                  //   }
                  // }}
                  onSelectAddress={async (selected) => {
                    if (!selected) return;

                    const details = purchaseRef.current?.onSelectAddressFullDetails?.();

                    if (details) {
                      // Build full postcode correctly
                      const fullPostcode = details.postcode || "";

                      // If suggestion already contains postcode, don't duplicate
                      const fullAddress = selected.suggestion.includes(fullPostcode)
                        ? selected.suggestion
                        : `${selected.suggestion} ${fullPostcode}`;

                      setFormData((prev) => ({
                        ...prev,
                        selectedId: selected.id,
                        address: fullAddress,                 // ✅ FULL ADDRESS STORED
                        postcode: fullPostcode,               // ✅ store separately (recommended)
                        town_city: details.post_town || details.admin_district || "",
                        country: details.country || "",
                      }));

                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        address: "Failed to fetch full address details.",
                      }));
                    }
                  }}
                  onInputChange={() => {
                    // Clear the error immediately when user types
                    if (errors.address) {
                      setErrors((prev) => ({ ...prev, address: "" }));
                    }
                  }}
                />

                <div className="flex justify-between items-center mt-1">
                  {/* Left: Error message */}
                  <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.address ? "text-red-500 opacity-100" : "opacity-0"
                    }`}>
                    {errors.address || "placeholder"} {/* placeholder keeps same height */}
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
                formData={formData}
                errors={errors}
                showAddressLines={showAddressLines} // only used inside AddressFields
                onChange={(field, value) => {
                  setFormData((prev) => ({ ...prev, [field]: value }))
                  setErrors((prev) => ({ ...prev, [field]: "" }))

                }}
              />


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
                    ref={(el) => { formFieldRefs.current['purchase_price'] = el; }}
                    id="purchase_price"
                    name="purchase_price"
                    type="text"
                    onFocus={(e) => e.target.select()}
                    value={formData.purchase_price || ""}
                    // onChange={(e) => {
                    //   setFormData({ ...formData, purchase_price: Number( e.target.value ) });

                    //   // clear error when typing
                    //   if (errors.purchase_price) {
                    //     setErrors({ ...errors, purchase_price: "" });
                    //   }
                    // }}

                    onChange={(e) => { handleChange("purchase_price", e.target.value) }}
                    className={`hover:border-[#1E5C3B]  outline-none block w-full h-[44px] rounded-xl border pl-10 pr-3 text-[14px] text-gray-900 font-medium focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors `}
                  />
                </div>

                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.purchase_price ? "text-red-500 opacity-100" : "opacity-0"
                  }`}>
                  {errors.purchase_price || "placeholder"} {/* placeholder keeps same height */}
                </p>
              </div>


              {/* 3. Number of Bedrooms (Inline Select) */}
              <div ref={(el) => { formFieldRefs.current['no_of_bedrooms'] = el; }} className="flex flex-col h-full">
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
                                        ${formData.no_of_bedrooms == opt ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.no_of_bedrooms ? "text-red-500 opacity-100" : "opacity-0"
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
                  <div ref={(el) => { formFieldRefs.current['leasehold_or_free'] = el; }} className="grid grid-cols-2 gap-3 mt-auto">
                    {leasehold_or_freeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleChange("leasehold_or_free", opt)}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.leasehold_or_free === opt
                          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.leasehold_or_free ? "text-red-500 opacity-100" : "opacity-0"
                    }`}>
                    {errors.leasehold_or_free || "placeholder"}
                  </p>
                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New build?
                </label>

                <div ref={(el) => { formFieldRefs.current['new_build'] = el; }} className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, new_build: 1 }); // ✅ store numeric 1

                    }}
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.new_build === 1
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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.new_build === 0
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

                <div ref={(el) => { formFieldRefs.current['property_type'] = el; }} className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-9">
                  {propertyTypeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {

                        handleChange("property_type", opt.label);

                        if (opt.label === "Flat") {
                          setHighRaiseSupport("Yes");
                        } else {
                          setHighRaiseSupport("");
                        }
                      }}
                      className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl border-2 transition-all duration-200 shadow-sm
                                        w-full md:w-[170.76px]
                                        ${formData.property_type === opt.label
                          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span
                        className={`${formData.property_type === opt.label ? "text-white" : "text-gray-700"
                          } text-[16px] md:text-[18px]`}
                      >
                        {opt.icon}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-left">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.property_type ? "text-red-500 opacity-100" : "opacity-0"
                  }`}>
                  {errors.property_type || "placeholder"} {/* placeholder keeps same height */}
                </p>
              </div>

              {formData.property_type === "Flat" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      High Raise Support:
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, high_raise_support: 1 }); // ✅ store numeric 1

                        }}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.high_raise_support === 1
                          ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <span>Yes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, high_raise_support: 0 }); // ✅ store numeric 0
                          if (errors.high_raise_support) {
                            setErrors({ ...errors, high_raise_support: "" }); // clear error
                          }
                        }}
                        className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.high_raise_support === 0
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
              )}
            </div>
          </div>

          {/* 💰 PURCHASE FINANCE */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-[#1E5C3B] pb-2 flex items-center gap-2">
              < CoinsIcon className="w-7 h-7 text-yellow-400" /> PURCHASE FINANCE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

              {/* 6. Buy to Let? (Inline Select) */}
              <div ref={(el) => { formFieldRefs.current['purchase_mode'] = el; }} className="flex flex-col h-full">
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
                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.purchase_mode ? "text-red-500 opacity-100" : "opacity-0"
                  }`}>
                  {errors.purchase_mode || "placeholder"} {/* placeholder keeps same height */}
                </p>
              </div>


              {/* 7. Government Right to Buy scheme? (Inline ButtonGroup) */}

              <div ref={(el) => { formFieldRefs.current['buy_to_let'] = el; }} className="flex flex-col h-full">
                <label htmlFor="b2l" className="block text-sm font-medium text-gray-700 mb-1">
                  Buy to Let?<span className="text-red-500">*</span>
                </label>
                <div className="relative mt-auto">
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
                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.buy_to_let ? "text-red-500 opacity-100" : "opacity-0"
                  }`}>
                  {errors.buy_to_let || "placeholder"} {/* placeholder keeps same height */}
                </p>
              </div>

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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.obtaining_mortgage === 1
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
                        setErrors({ ...errors, obtaining_mortgage: "", lenders: "" });
                      }
                    }}
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.obtaining_mortgage === 0
                      ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>No</span>
                  </button>
                </div>
                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
              </div>

              <div ref={(el) => { formFieldRefs.current['lenders'] = el; }} className="flex flex-col h-full">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select Lenders <span className="text-red-500">*</span>
                </label>
                <Select
                  options={lender}
                  isDisabled={formData.obtaining_mortgage == 0}
                  instanceId="lenders-select"
                  styles={selectStyles}

                  value={selectedLenders}
                  onChange={handleChange_l}
                  placeholder="Choose lenders..."
                  className="text-black"

                />
                {formData.obtaining_mortgage == 1 && (
                  <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.lenders ? "text-red-500 opacity-100" : "opacity-0"
                    }`}>
                    {errors.lenders || "placeholder"}
                  </p>
                )}
                <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200`} ></p>
              </div> {/* Show only when needed */}



              {/* 11. Shared Ownership? (Inline ButtonGroup) */}

              <div className="flex flex-col h-full">
                <label htmlFor="gift_deposit" className="block text-sm font-medium text-gray-700 mb-1">
                  Receiving a gifted deposit?
                </label>

                <div className="relative mt-auto">
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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.govt_by_scheme === 1
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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.govt_by_scheme === 0
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
              <div ref={(el) => { formFieldRefs.current['preferLanguage'] = el; }}>
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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.ownership_housing_asso === 1
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
                    className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.ownership_housing_asso === 0
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lifetime ISA / Help to Buy ISA Supplement
                  </label>

                  <div className="grid grid-cols-2 gap-3 ">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, lifetime_isa: 1 }); // ✅ store 1 for yes
                        if (errors.lifetime_isa) {
                          setErrors({ ...errors, lifetime_isa: "" }); // clear error on change
                        }
                      }}
                      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.lifetime_isa === 1
                        ? "border-[#1E5C3B] bg-[#1E5C3B] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span>Yes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, lifetime_isa: 0 });
                        console.log(formData)
                        setSelectedLenders("") // ✅ store 0 for no
                        if (errors.lifetime_isa) {
                          setErrors({ ...errors, lifetime_isa: "", lenders: "" });
                        }
                      }}
                      className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.lifetime_isa === 0
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
                  <label htmlFor="addition_applicable" className="block text-sm font-medium text-gray-700 mb-1">
                    Select the addition if applicable to your purchase
                  </label>
                  <div className="relative mt-auto">
                    <Select
                      inputId="addition_applicable"
                      name="addition_applicable"
                      options={addition_applicable}
                      styles={selectStyles}
                      value={addition_applicable.find(
                        (opt) => opt.value === formData.addition_applicable
                      )}
                      onChange={(selected) =>
                        handleChange("addition_applicable", selected?.value || "")
                      }
                      placeholder="Not Applicable"
                      isSearchable={false}
                    />

                  </div>
                  <p className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${errors.addition_applicable ? "text-red-500 opacity-100" : "opacity-0"
                    }`}>
                    {errors.addition_applicable || "placeholder"} {/* placeholder keeps same height */}
                  </p>
                </div>
                <div>
                  {formData.buy_to_let === "personal" && (
                    <div className="mt-4">
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
                          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.need_hmo === 1
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
                              setErrors({ ...errors, need_hmo: "", lenders: "" });
                            }
                          }}
                          className={`h-[44px] rounded-xl border-2 text-base font-semibold transition-all duration-200 flex items-center justify-center relative shadow-sm ${formData.need_hmo === 0
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
            </div>
          </div>

          {/* 🌐 SPECIAL INSTRUCTIONS */}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Special instructions (Optional)
            </label>
            <textarea
              name="specal_instruction"
              onChange={(e) => handleChange("specal_instruction", e.target.value)}
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
            type="submit"
            onClick={handleSubmit}
            className="font-semibold text-base h-[48px] px-8 rounded-full bg-[#1E5C3B] text-white shadow-lg hover:bg-[#16472F] flex items-center justify-center transition duration-150"
          >
            Continue &rarr;
          </button>
        </div>

      </section>
    </div>
  );
}