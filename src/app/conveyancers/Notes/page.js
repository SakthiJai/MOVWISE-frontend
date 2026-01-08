"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStore } from "../../store/useFormStore";
import { API_ENDPOINTS, postData } from "../../auth/API/api";
import Footer from "../../parts/Footer/footer";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditorPage() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { companyData, quotationData, updateNotesData } = useFormStore();
  console.log(companyData, quotationData,)

  const API_BASE_URL = "https:// movwise.com/";

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "code-block",
    "align",
  ];
  const [showSuccess, setShowSuccess] = useState(false);


  // ✅ Save notes & submit final payload
  const handleSubmitAll = async () => {
    updateNotesData({ notes: value });

    const finalPayload = {
      ...companyData,
      ...quotationData,
      notes: value,
    };
setShowSuccess(true)

function normalizePayload(form) {
  // defensive defaults
  const companyDetails = {
    company_name: form.company_name || form.company_details?.company_name || "",
    phone_number: form.phone_number || form.company_details?.phone_number || "",
    email: form.email || form.company_details?.email || "",
    website: form.c_website || form.website || form.company_details?.website || "",
    logo: form.logo || form.company_details?.logo || "", // base64 or url
    languages: form.languages || form.company_details?.languages || []
  };

  // Convert weird keys like "legal costs" into the expected arrays
  // Adjust the mapping below if your form uses different keys.
  const quotes = {
    legalcosts: form["legal costs"] || form.quotes?.legalcosts || [],
    disbursement: form.disbursement || form.quotes?.disbursement || [],
    rateofstampduty: form.rateofstampduty || form.quotes?.rateofstampduty || []
  };

  const notes = form.notes || form.company_details?.notes || form.quotes?.notes || "";

  return {
    company_details: companyDetails,
    quotes,
    notes
  };
}

const payload = normalizePayload(finalPayload);
console.log(payload);

  //   try {

  //     const res = await postData(API_ENDPOINTS.createQuote,payload) 
  //     console.log(res);
      

     
  // }catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  }
  return (
    <div>
    <div className="min-h-screen bg-white antialiased font">
      <Navbar />
      <main className="mx-auto max-w-[1200px] pt-10">
        <div className="flex gap-12">
          {/* Left Stepper */}
         

          {/* Right Side */}
          <section className="flex-1 flex justify-center">
            <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-full h-[85vh] flex flex-col">
              <div className="p-6 overflow-y-auto flex-1">
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4">
                  <Link href="/">Home</Link>
                  <span>/</span>
                  <span>Company registration</span>
                  <span>/</span>
                  <span className="other-page hidden sm:inline">Price Breakdown</span>
                  <span>/</span>
                  <Link href="/conveyancers/Notes" className="live-page">
                    Notes
                  </Link>
                </nav>

                <h1 className="text-[24px] font-semibold text-[#1B1D21]">
                  Share your Notes Details
                </h1>

                <div className="mt-6 bg-gray-50 rounded-2xl p-6">
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      modules={modules}
                      formats={formats}
                      className="h-[250px] text-black"
                    />
                  </div>

                  <div
                    className="mt-6 bg-gray-100 p-4 rounded-lg prose text-black overflow-y-auto max-h-[300px]"
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="border-gray-200 px-6 py-4 flex justify-end gap-4">
                <button
                  onClick={() => router.back()}
                  className="font-outfit font-semibold text-[16px] h-[44px] px-8 rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
                >
                  Back
                </button>

                <button
                  onClick={handleSubmitAll}
                  className="font-outfit font-semibold text-[16px] h-[44px] px-8 rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
                >
                  Continue →
                </button>
              </div>
            </div>
          </section>
        </div>
        {showSuccess && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 w-[90%] max-w-sm text-center shadow-xl">
      <h2 className="text-xl font-semibold text-green-700">
        Company Details Registered Successfully 🎉
      </h2>

      <p className="mt-2 text-gray-600 text-sm">
        Your company details have been saved.
      </p>

      <button
        onClick={() => {
          setShowSuccess(false);
          router.push("/conveyancers/summary"); // change route if needed
        }}
        className="mt-6 w-full bg-[#1E5C3B] text-white py-2 rounded-lg font-semibold"
      >
        Continue
      </button>
    </div>
  </div>
)}
      </main>
      </div>
      <Footer />
    </div>
  );
}
