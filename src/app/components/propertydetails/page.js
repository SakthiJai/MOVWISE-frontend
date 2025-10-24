import React from 'react'
import  Navbar  from "../../parts/navbar/page";// app/personal-details/page.js
import Link from 'next/link';
export default function PropertyDetails ()  {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    
         <div className="min-h-screen bg-white antialiased">
      {/* Header */}
         <Navbar/>

      {/* Main */}
      <main className="mx-auto max-w-[1200px]  pt-10">
        <div className="flex gap-12">
          {/* Left stepper */}
          <aside className="relative w-[400px] font   rounded-[40px] overflow-hidden bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)]
shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 p-8">
              {/* Step 1 (completed) */}
              <div className="flex items-start">
                <div className="relative mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold tracking-wide text-[#1E1E1E]">STEP 1</div>
                  <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Personal Details</div>
                  <div className="text-[12px] font-medium text-[#2D7C57] mt-1">Completed</div>
                </div>
              </div>

              {/* Step 2 (in progress) */}
              <div className="flex items-start mt-8">
                <div className="relative mr-4">
                  <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white text-[#1E5C3B] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute left-[22px] top-[44px] w-[2px] h-[56px] bg-[#E4E4E7]" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold tracking-wide text-[#1E1E1E]">STEP 2</div>
                  <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Property Details</div>
                  <div className="text-[12px] font-medium text-[#A38320] mt-1">In Progress</div>  
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
                  <div className="text-[12px] font-semibold tracking-wide text-[#1E1E1E]">STEP 3</div>
                  <div className="text-[20px] font-bold text-[#1E1E1E]  leading-tight">Compare Quotes</div>
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

          {/* Right: form card */}
          <section className="flex-1">
            <div className="rounded-[18px] border border-[#EDF0F2] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[760px]">
              <div className="p-8">
                {/* Breadcrumb */}
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4" aria-label="Breadcrumb">
                  <Link href="/" className=" other-page">Home</Link>
                  <span>/</span>
                  <span className="other-page">Personal Details</span>
                   <span>/</span>
               
                  <span className="live-page">Property Details</span>
                </nav>

                <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21] font ">Share your Property Details</h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-Outfit font-regular font">
                  By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.
                </p>

                <form className="mt-6">
                  {/* Row 1: Address + Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Property address:</label>
                      <div className="relative">
                        <input
                          id="address"
                          name="address"
                          defaultValue="24 Arab Street, Singapore"
                          className=" block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                          {/* location icon placeholder */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" />
                            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Agreed sale price:</label>
                     <div className="relative w-full">
  {/* Prefix container for £ and icon */}
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 space-x-1 text-[#111827]">
    <span className="text-[14px] font-semibold">£</span>
    <svg width="10" height="10" viewBox="0 0 20 20" aria-hidden="true" className="text-[#6B7280]">
      <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>

  {/* Input field */}
  <input
    id="price"
    name="price"
    defaultValue="9876543210"
    className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] pl-10 pr-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 font-semibold"
  />
</div>


                    </div>
                  </div>

                  {/* Row 2: Bedrooms + Property type */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Number of Bedrooms:</label>
                      <div className="relative">
                        <input
                          defaultValue="1 bed"
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21]   font-semibold font"
                          readOnly
                        />
                        <button type="button" className="absolute right-0 bottom-2 h-[44px] w-[44px] grid place-items-center text-[#1E1E1E] font-bold">
                          +
                        </button>
                        <button type="button" className="absolute right-0 top-3 h-[44px] w-[44px] grid place-items-center text-[#1E1E1E] font-bold">
                          –
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ptype" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Property type:</label>
                      <div className="relative">
                        <input
                          id="ptype"
                          name="ptype"
                          defaultValue="Semi Detached"
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21]   font-semibold font"
                          readOnly
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Tenure */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                       <label htmlFor="tenure" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Leasehold or freehold?</label>
                    <div className="relative ">
                      <input
                        id="tenure"
                        name="tenure"
                        defaultValue="Freehold"
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                        readOnly
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </span>
                    </div>
                    </div>
                   
                  </div>
                </form>
              </div>
            </div>

           {/* Bottom actions */}
            <div className="mt-30 flex justify-end gap-4 max-w-[760px] ">
              <a
                  href={`${baseUrl}`}
                className=" font-outfit  font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21] "
              >
                Cancel
              </a>
              <a
                href={`${baseUrl}/components/comparequotes`}
                className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Property Details →
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
      
  )
}

