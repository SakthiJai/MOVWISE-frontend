'use client';

import Link from "next/link";
import Navbar from "../../parts/navbar/page";
import { API_BASE_URL } from "../../constants/config";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Companyregistration() {

 

  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    Name: "",
    phone: "",
    email: "",
    c_website: "",
  });

  // Error & Image states
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");

  // ✅ Unified handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone number: allow only digits and limit to 12
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    } else if (formData.phone.length > 12) {
      newErrors.phone = "Phone number cannot exceed 12 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Valid form:", formData);
      alert("Form submitted successfully!");
      // router.push("/next-page"); // if you want navigation
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Continue button click
  const handleContinue = () => {
    const newErrors = {};

    // Name validation
    if (!formData.Name.trim()) {
      newErrors.Name = "Company name is required";
    } else if (formData.Name.trim().length < 3) {
      newErrors.Name = "Name must be at least 3 characters";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
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
    if (!image) {
      newErrors.logo = "Company logo is required";
    }

    setErrors(newErrors);

    // Navigate only if valid
    if (Object.keys(newErrors).length === 0) {
      router.push(`${API_BASE_URL}/conveyancers/quotationdetails`);
    }
  };

  return (
    <div className="min-h-screen bg-white antialiased  font-outfit">
      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-[1200px] pt-10">
        <div className="flex gap-12">
          {/* Left Side Stepper */}
          <aside className="relative w-[400px] rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 p-8">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="relative mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white flex items-center justify-center text-[#1E5C3B]">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold font-gilroy">STEP 1</div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold">Company Details</div>
                  <div className="text-[12px] mt-1 font-semibold font-gilroy text-[#A38320]">In Progress</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start mt-8">
                <div className="relative mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#B7B7B7] bg-white text-[#B7B7B7] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#E4E4E7]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold font-gilroy">STEP 2</div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold">Quotation Details</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start mt-8">
                <div className="mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#B7B7B7] bg-white text-[#B7B7B7] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold font-gilroy">STEP 3</div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold">Notes Section</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side Form */}
          <section className="flex-1">
            <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-auto">
              <div className="p-6">
                {/* Breadcrumb */}
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4">
                  <Link href="/" className="other-page">Home</Link>
                  <span>/</span>
                  <span className="live-page">Company Details</span>
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
                        Name<span className = "text-red-500">*</span>
                      </label>
                      <input
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Enter Company name"
                        className={`block w-full h-[44px] rounded-[10px] border ${errors.Name ? "border-red-500" : "border-[#D1D5DB]"}  text-[#1B1D21] placeholder-[#1B1D21] px-3 text-[14px] focus:outline-none`}
                      />
                      {errors.Name && <p className="text-red-500 text-[12px] mt-1">{errors.Name}</p>}
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
    name="phone"
    value={formData.phone}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only numbers and limit to 12 digits
      if (/^\d{0,10}$/.test(value)) {
        handleChange(e);
      }
    }}
    placeholder="Enter Phone number"
    className={`block w-full h-[44px] rounded-[10px] text-[#1B1D21] placeholder-[#1B1D21] border ${
      errors.phone ? "border-red-500" : "border-[#D1D5DB]"
    } px-3 text-[14px] focus:outline-none`}
  />
  {errors.phone && (
    <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>
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
                        name="c_website"
                        type="text"
                        value={formData.c_website}
                        onChange={handleChange}
                        placeholder="Enter Website Url"
                        className="block w-full h-[44px] text-[#1B1D21] placeholder-[#1B1D21] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3 - Logo Upload */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="logo" className="block text-[14px] text-[#6A7682] font-medium mb-1">
                        Company Logo<span className = "text-red-500">*</span>
                      </label>
                      <div className="relative w-full flex flex-col items-center">
                        <div className="relative mr-[198px]">
                          <div
                            className={`w-[120px] h-[120px] rounded-full border ${errors.logo ? "border-red-500" : "border-gray-300"} bg-center bg-cover flex items-center justify-center text-gray-400 text-sm`}
                            style={{ backgroundImage: image ? `url(${image})` : "none" }}
                          >
                            {!image && <span>Upload logo</span>}
                          </div>
                          <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageChange}
                            className="hidden text-[#1B1D21] placeholder-[#1B1D21]"
                          />
                          <label htmlFor="imageUpload" className="absolute -top-3 -right-3 hover:bg-gray-300 text-black p-2 rounded-full cursor-pointer shadow-md">
                            <Pencil size={14} />
                          </label>
                        </div>
                      </div>
                      {errors.logo && <p className="text-red-500 text-[12px] mt-1">{errors.logo}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-28 flex justify-end gap-4 max-w-[760px]">
              <button
                onClick={() => router.back()}
                className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Quotation Details →
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
