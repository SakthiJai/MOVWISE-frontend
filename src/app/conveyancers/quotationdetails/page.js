"use client"
import Link from "next/link";
import  Navbar  from "../../parts/navbar/page";// app/personal-details/page.js
import {API_BASE_URL} from "../../constants/config"
import { useState } from "react";

// export const metadata = {
//   title: 'Quotationdetails | Movwise',
//   description: 'Share your Personal Details',
// };

export default function Quotationdetails() {
console.log(API_BASE_URL);

const baseUrl = API_BASE_URL;

const data = 
 
     [
        {
            "LEGAL COSTS": [
                {
                    "id": 1,
                    "name": "OUR ESTIMATED FEES",
                    "type": 1
                },
                {
                    "id": 2,
                    "name": "FEE TO ACT FOR THE LENDER (PER LENDER)",
                    "type": 0
                },
                {
                    "id": 3,
                    "name": "STAMP DUTY FORM (IF APPLICABLE-PER TITLE)",
                    "type": 0
                },
                {
                    "id": 4,
                    "name": "BANK TRANSFER FEES (PER TRANSFER)",
                    "type": 0
                },
                {
                    "id": 5,
                    "name": "ADMIN & POSTAGE COSTS",
                    "type": 0
                }
            ]
        },
        {
            "DISBURSEMENT": [
                {
                    "id": 6,
                    "name": "LAND REGISTRY FEE",
                    "type": 1
                },
                {
                    "id": 7,
                    "name": "SEARCHES (TBC-DEPENDS ON LOCAL AUTHORITY)",
                    "type": 0
                },
                {
                    "id": 8,
                    "name": "ID CHECKS(PER PERSON)",
                    "type": 0
                },
                {
                    "id": 9,
                    "name": "INFOTRACK SDLT SUBMISSION FEE",
                    "type": 0
                },
                {
                    "id": 10,
                    "name": "LAND CHARGES SEARCH (PER TITLE)",
                    "type": 0
                },
                {
                    "id": 11,
                    "name": "BANKRUPTCY SEARCH (PER PERSON)",
                    "type": 0
                }
            ]
        },
        {
            "RATE OF STAMP DUTY": [
                {
                    "id": 12,
                    "name": "FIRST TIME BUYER",
                    "type": 1
                },
                {
                    "id": 13,
                    "name": "STANDARD RATE",
                    "type": 1
                },
                {
                    "id": 14,
                    "name": "HIGHER RATE",
                    "type": 1
                }
            ]
        }
    ]

    const [openIndex, setOpenIndex] = useState(null);
  const [formValues, setFormValues] = useState({});

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 const handleAddRow = (categoryName, item) => {
  console.log(formValues)
  setFormValues((prev) => {
    const current = prev[categoryName]?.[item.id] || [];

if (item.type === 1 && current.length > 0) {
  const lastRow = current[current.length - 1];

  // If last row min is empty → show alert
  if (!lastRow.min || lastRow.min === "") {
    alert("Please enter min value before adding a new row!");
    return;
  }

  // If max is empty → treat it as 'final' range
  if (!lastRow.max || lastRow.max === "") {
    // You can set a flag or just stop adding further rows
    alert(`this is the final range is above ${lastRow.min}`);
    return;
  }
}
    return {
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        [item.id]: [...current, { min: "", max: "", price: "" }],
      },
    };
  });
};


  const handleInputChange = (categoryName, itemId, rowIndex, field, value) => {
    setFormValues((prev) => {
      const newRows = [...(prev[categoryName]?.[itemId] || [])];
      newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
      return {
        ...prev,
        [categoryName]: {
          ...prev[categoryName],
          [itemId]: newRows,
        },
      };
    });
  };



console.log(data);

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
           <div
  className="rounded-[18px] border border-[#EDF0F2] shadow-[0_6px_24px_rgba(16,24,40,0.04)] 
  bg-white max-w-[760px] h-[440px] overflow-y-auto"
>
  <div className="p-8">
    {/* Breadcrumb */}
    <nav
      className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="other-page">
        Home
      </Link>
      <span>/</span>
      <span className="other-page">Company Details</span>
      <span>/</span>
      <span className="live-page">Quotation Details</span>
    </nav>

    <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21]">
      Share your Quotation Details
    </h1>
    <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-Outfit">
      By completing this form your details are shared with up to 5 firms
      providing the quotes, but absolutely no one else.
    </p>

   <form className="mt-6">
      <div className="p-6">
        {data.map((category, index) => {
          const categoryName = Object.keys(category)[0];
          const items = category[categoryName];

          return (
            <div
              key={index}
              className="border rounded-lg mb-4 shadow-sm overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                type="button"
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
              >
                {categoryName}
                <span
                  className={`transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-[500px] p-4" : "max-h-0 p-0"
                }`}
              >
                <ul className="list-disc pl-5 text-gray-700">
                  {items.map((item) => {
                    const rows =
                      formValues[categoryName]?.[item.id] || [
                        { min: "", max: "", price: "" },
                      ];

                    return (
                      <li key={item.id} className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <strong>{item.name}</strong>
                        </div>

                        {rows.map((row, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="flex items-center gap-2 mb-2"
                          >
                            {item.type === 1 && (
                              <>
                                <input
                                  type="number"
                                  placeholder="Min value"
                                  value={row.min||""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      categoryName,
                                      item.id,
                                      rowIndex,
                                      "min",
                                      e.target.value
                                    )
                                  }
                                  className="border rounded px-2 py-1 text-sm w-24"
                                />
                                <input
                                  type="number"
                                  placeholder="Max value"
                                  value={row.max||""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      categoryName,
                                      item.id,
                                      rowIndex,
                                      "max",
                                      e.target.value
                                    )
                                  }
                                  className="border rounded px-2 py-1 text-sm w-24"
                                />
                              </>
                            )}
                            <input
                              type="number"
                              placeholder="Price"
                              value={row.price||""}
                              onChange={(e) =>
                                handleInputChange(
                                  categoryName,
                                  item.id,
                                  rowIndex,
                                  "price",
                                  e.target.value
                                )
                              }
                              className="border rounded px-2 py-1 text-sm w-24"
                            />

                            <button
                              type="button"
                              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                              onClick={() => handleAddRow(categoryName, item)}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
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
              <Link
                href={`${baseUrl}/components/comparequotes`}
                className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Property Details →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>

  //  
  );

}