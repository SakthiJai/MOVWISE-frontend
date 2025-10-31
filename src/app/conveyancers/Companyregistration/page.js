'use client'
import Link from "next/link";
import  Navbar  from "../../parts/navbar/page";// app/personal-details/page.js
import {API_BASE_URL} from "../../constants/config"
import { useRouter } from "next/navigation";




export default function Companyregistration() {
  
console.log(API_BASE_URL);

  const router = useRouter();

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
                  <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">STEP 1</div>
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold ">Company  Details</div>
                  <div className="text-[12px]   mt-1 font-semibold font-gilroy  text-[#A38320]">In Progress</div>
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
                  <div className="font-outfit text-[20px] text-gray-900 font-semibold ">Quotation   Details</div>
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
          <section className="flex-1">
            {/* Card */}
            <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[1000px] w-auto">
              <div className="p-6">
                {/* Breadcrumb */}
                <nav className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4" aria-label="Breadcrumb">
                  <Link href="/" className=" other-page">Home</Link>
                  <span>/</span>
                  <span className="live-page">Company Details</span>
                </nav>

                <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21] font">Share your Company Details</h1>
                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-Outfit font-regular font">
                  By completing this form your details are shared with up to 5 firms providing the quotes, but absolutely no one else.
                </p>

                <form className="mt-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="Name" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"> Name</label>
                      <input
                        id="Name"
                        name="Name"
                       
                        placeholder="Enter Company name"
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1b1d215d] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                    <div>
                      <label htmlFor="logo" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Company Logo</label>
                      <input
                        id="logo"
                        name="logo"
                        placeholder="Upload company logo"
                    
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1b1d215d] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1b1d215d] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Phone No.</label>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          placeholder="Enter Phone number"
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1b1d215d] focus:outline-none focus:ring-2  font-semibold font"
                        />
                        {/* optional divider mimic for country code */}
                        <div className="pointer-events-none absolute left-[108px] top-1/2 -translate-y-1/2 h-[28px] w-px bg-[#E5E7EB]" />
                      </div>
                    </div>
                  </div>
                   {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="c_website" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Website Url</label>
                      <input
                        id="c_website"
                        name="c_website"
                        type="text"
                        placeholder="Enter Website Url"
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1b1d215d] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                    <div>
                  
                    </div>
                  </div>

                  {/* Checkbox */}
               
                </form>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-28 flex justify-end gap-4 max-w-[760px] ">
              <button
  onClick={() => router.back()}
  className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
>
  Back
</button>

              <Link
       href={`${API_BASE_URL}/conveyancers/quotationdetails`}
                className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Quotation Details →
              </Link>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
}
