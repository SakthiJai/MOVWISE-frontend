"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";



const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditorPage() {
  const [value, setValue] = useState("<p>Hello from Tailwind Editor!</p>");
    const router = useRouter();


  // ✅ Define toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headings (H1, H2, H3)
      ["bold", "italic", "underline", "strike"], // Basic styles
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image"], // Insert links and images
      [{ align: [] }], // Alignment
      ["blockquote", "code-block"], // Quotes/code
      ["clean"], // Clear formatting
    ],
  };

  // ✅ Define which formats are allowed
//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "code-block",
//     "align",
//   ];
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",        // ✅ Covers both "ordered" and "bullet"
  "link",
  "image",
  "code-block",
  "align",
];
        const API_BASE_URL = 'https://movwise.digitalcloudies.in/';

  return (
      <div className="min-h-screen bg-white antialiased font">
          {/* Top bar */}

          <Navbar/>
    
          {/* Body */}
          <main className="mx-auto max-w-[1200px] pt-10">
            <div className="flex gap-12">
              {/* Left rail: stepper panel */}
              <aside className="relative w-[400px]    rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)]
    shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]">
                <div className="absolute inset-0 p-8">
                  {/* Step 1 */}
                  <div className="flex items-start">
                    <div className="relative mr-4">
                      <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white flex items-center justify-center text-[#1E5C3B]">
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="10" cy="10" r="3" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
                    </div>
                     <div>
                  <div className="text-[12px] font-semibold tracking-wide text-[#1E1E1E]">STEP 1</div>
                  <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Company  Details</div>
                  <div className="text-[12px] font-medium text-[#2D7C57] mt-1">Completed</div>
                </div>
                  </div>
    
                  {/* Step 2 */}
                  <div className="flex items-start mt-8">
                    <div className="relative mr-4">
                      <div className="w-11 h-11 rounded-full border-[2px] border-[#B7B7B7] bg-white text-[#B7B7B7] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#E4E4E7]" />
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy ">STEP 2</div>
                      <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Quotation   Details</div>
                                        <div className="text-[12px] font-medium text-[#2D7C57] mt-1">Completed</div>

                    </div>
                  </div>
    
                  {/* Step 3 */}
                  <div className="flex items-start mt-8">
                    <div className="mr-4">
                      <div className="w-11 h-11 rounded-full border-[2px] border-[#B7B7B7] bg-white text-[#B7B7B7] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy ">STEP 3</div>
                      
                      <div className="font-outfit text-[20px] text-gray-900 font-semibold ">Notes Section</div>
                                        <div className="text-[12px] font-medium text-[#A38320] mt-1">In Progress</div>  

                    </div>
                  </div>
                </div>
    
                {/* Decorative wave */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[45%]"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 0% 100%, rgba(178,196,160,0.45) 0%, rgba(178,196,160,0.25) 35%, transparent 70%)',
                  }}
                />

              </aside>
    
              {/* Right: form card and actions */}
             <section className="flex-1 flex justify-center">
  {/* Card */}
  <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-full h-[85vh] flex flex-col">
    {/* Scrollable content */}
    <div className="p-6 overflow-y-auto flex-1">
      {/* Breadcrumb */}
      <nav
        className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="other-page">Home</Link>
        <span>/</span>
        <span className="other-page">Company Details</span>
        <Link href="/" className="live-page">Notes</Link>
        <span>/</span>
      </nav>

      <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21]">
        Share your Company Details
      </h1>
      <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-Outfit font-regular">
        By completing this form your details are shared with up to 5 firms
        providing the quotes, but absolutely no one else.
      </p>

      {/* 🧠 Scrollable Editor Section */}
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

        {/* 🧩 Preview stays inside the card */}
        <div
          className="mt-6 bg-gray-100 p-4 rounded-lg prose prose-green text-black 
                     overflow-y-auto overflow-x-hidden break-words max-h-[300px]"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>

    {/* Buttons pinned at bottom */}
    <div className=" border-gray-200 px-6 py-4 flex justify-end gap-4">
      <button
  onClick={() => router.back()}
  className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
>
  Back
</button>
      <Link
        href={`${API_BASE_URL}`}
        className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center 
                   rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
      >
        Continue  →
      </Link>
    </div>
  </div>
</section>

            </div>
          </main>
              
          
        </div>
   
  );
}