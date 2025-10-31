"use client"
import Link from "next/link";
import  Navbar  from "../../parts/navbar/page";// app/personal-details/page.js
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../.././constants/config";


// export const metadata = {
//   title: 'Quotationdetails | Movwise',
//   description: 'Share your Personal Details',
// };

export default function Quotationdetails() {
// console.log(API_BASE_URL);

  const router = useRouter();

  const data = {
    "Legalcosts": [
      { id: 1, name: "OUR ESTIMATED FEES", type: 1 },
      { id: 2, name: "FEE TO ACT FOR THE LENDER (PER LENDER)", type: 0 },
      { id: 3, name: "STAMP DUTY FORM (IF APPLICABLE-PER TITLE)", type: 0 },
      { id: 4, name: "BANK TRANSFER FEES (PER TRANSFER)", type: 0 },
      { id: 5, name: "ADMIN & POSTAGE COSTS", type: 0 },
    ],
    "Disbursement": [
      { id: 6, name: "LAND REGISTRY FEE", type: 1 },
      { id: 7, name: "SEARCHES (TBC-DEPENDS ON LOCAL AUTHORITY)", type: 0 },
      { id: 8, name: "ID CHECKS(PER PERSON)", type: 0 },
      { id: 9, name: "INFOTRACK SDLT SUBMISSION FEE", type: 0 },
      { id: 10, name: "LAND CHARGES SEARCH (PER TITLE)", type: 0 },
      { id: 11, name: "BANKRUPTCY SEARCH (PER PERSON)", type: 0 },
    ],
    "Rate of stamp duty": [
      { id: 12, name: "FIRST TIME BUYER", type: 1 },
      { id: 13, name: "STANDARD RATE", type: 1 },
      { id: 14, name: "HIGHER RATE", type: 1 },
    ],
  };

  const [openAccordion, setOpenAccordion] = useState(null);
  const [visibleItemIndex, setVisibleItemIndex] = useState({});
  const [formValues, setFormValues] = useState({}); // structure: { category: { itemId: [ {min,max,price}, ... ] } }
  const [errors, setErrors] = useState({}); // keyed by `${key}-${itemId}-${rowIndex}-field` and add errors `${key}-${itemId}-add`
  const [lockedIndex, setLockedIndex] = useState({}); // locks previous items when Next pressed: { category: lockedUpToIndex }
const [showbelow, setshowbelow] = useState({});

  // Toggle accordion open/close
 const toggleAccordion = (key) => {
  setOpenAccordion((prev) => {
    const isSame = prev === key;
    if (!isSame) {
      // Accordion is opening — check if rows exist
      setFormValues((prevValues) => {
        if (!prevValues[key] || prevValues[key].length === 0) {
          return {
            ...prevValues,
            [key]: [{ itemId: "", min: "", max: "", price: "" }],
          };
        }
        return prevValues;
      });
    }
    return isSame ? null : key;
  });
};


  // Show next item AND lock earlier items for this category
  const handleItemClick = (key, index) => {
    setVisibleItemIndex((prev) => ({
      ...prev,
      [key]: index + 1,
    }));

    // lock earlier items (hide their Add / Next buttons)
   
  }
  // Update field for a specific row of a specific item
const handleInputChange = (key, rowIndex, field, value) => {
  setFormValues((prev) => {
    const updated = { ...prev };
    const rows = [...(updated[key] || [])];
    const row = { ...rows[rowIndex] };

    if (field === "itemId") {
      const selectedItem = data[key].find((i) => i.id === Number(value));

      // 🔹 Reset dependent fields when dropdown changes
      row.itemId = value;
      row.type = selectedItem?.type || 0;
      row.min = "";
      row.max = "";
      row.price = "";

      // 🔹 Remove all previous validation errors for this row
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        Object.keys(newErrors).forEach((errKey) => {
          if (errKey.startsWith(`${key}-${rowIndex}-`)) {
            delete newErrors[errKey];
          }
        });
        return newErrors;
      });
    } else {
      // Normal field update
      row[field] = value;

      // 🔹 Dynamic error clearing logic (real-time)
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        const errorKey = `${key}-${rowIndex}-${field}`;
        const selectedItem = data[key].find((i) => i.id === Number(row.itemId));
        const itemType = selectedItem?.type || 0;

        if (field === "min") {
          if (value !== "" && !isNaN(value)) delete newErrors[errorKey];
          if (row.max && Number(value) < Number(row.max)) {
            delete newErrors[`${key}-${rowIndex}-max`]; // remove max error if now valid
          }
        }

        if (field === "max") {
          if (value !== "" && !isNaN(value) && Number(value) > Number(row.min)) {
            delete newErrors[errorKey];
            delete newErrors[`${key}-${rowIndex}-min`];
          }
        }

        if (field === "price") {
          if (value !== "" && !isNaN(value)) delete newErrors[errorKey];
        }

        if (field === "itemId" && value) {
          delete newErrors[errorKey];
        }

        return newErrors;
      });
    }

    rows[rowIndex] = row;
    updated[key] = rows;
    return updated;
  });
};







  // Add a new empty row for a specific item — blocked if an existing row's max is empty
const addRow = (key) => {
  setshowbelow((prev) => ({
    ...prev,
    [key]: false, // hide only for this accordion
  }));

  setFormValues((prev) => {
    const rows = prev[key] || [];
    return {
      ...prev,
      [key]: [
        ...rows,
        { itemId: "", min: "", max: "", price: "" },
      ],
    };
  });
};





  // Validate rows for an item — used on submit or when explicitly validating
const validateRows = (key, itemId) => {
  const rows = formValues[key]?.[itemId] || [];
  let newErrors = {};

  // ✅ Always start fresh for this specific item
  const filteredErrors = Object.fromEntries(
    Object.entries(errors).filter(([errKey]) => !errKey.startsWith(`${key}-${itemId}-`))
  );

  rows.forEach((row, index) => {
    const isEmptyRow =
      (!row.min && !row.max && !row.price) ||
      (row.min === "" && row.max === "" && row.price === "");

    const isOpenEndedRow = row.max === "" || row.max === undefined;

    if (isEmptyRow) {
      newErrors[`${key}-${itemId}-${index}-min`] = "Min is required";
      newErrors[`${key}-${itemId}-${index}-price`] = "Price is required";
      return;
    }

    // Required checks
    if (row.min === "" || row.min === undefined)
      newErrors[`${key}-${itemId}-${index}-min`] = "Min is required";
    if (row.price === "" || row.price === undefined)
      newErrors[`${key}-${itemId}-${index}-price`] = "Price is required";

    // Logical order checks
    if (!isOpenEndedRow && row.min !== "" && row.min !== undefined) {
      if (Number(row.min) >= Number(row.max)) {
        newErrors[`${key}-${itemId}-${index}-max`] = "Max should be > Min";
      }
    }

    // No negative numbers
    if (row.min !== "" && Number(row.min) < 0)
      newErrors[`${key}-${itemId}-${index}-min`] = "Min must be ≥ 0";
    if (row.max !== "" && Number(row.max) < 0)
      newErrors[`${key}-${itemId}-${index}-max`] = "Max must be ≥ 0";
    if (row.price !== "" && Number(row.price) < 0)
      newErrors[`${key}-${itemId}-${index}-price`] = "Price must be ≥ 0";
  });

  // ✅ Merge safely — React will detect change
  setErrors({ ...filteredErrors, ...newErrors });

  // Return validity
  return Object.keys(newErrors).length === 0;
};





  // Build API payload: convert empty max -> null, use item.id as typeid
 const buildApiPayload = () => {
  let payload = {};

  Object.keys(formValues).forEach((category) => {
    const rows = formValues[category] || [];
    const formattedRows = rows.map((r) => ({
      typeid: Number(r.itemId),
      min: r.min === "" || r.min === undefined ? null : Number(r.min),
      max: r.max === "" || r.max === undefined ? null : Number(r.max),
      price: r.price === "" || r.price === undefined ? null : Number(r.price),
    }));

    payload[category] = formattedRows;
  });

  return payload;
};


  // Submit: validate every visible item (or all items) and if valid, build payload
const handleSubmit = () => {
  let allValid = true;
  let tempErrors = {};

    const isCompletelyEmpty = Object.values(formValues).every((rows) =>
    (rows || []).every(
      (row) =>
        !row.itemId &&
        (row.min === "" || row.min === undefined) &&
        (row.max === "" || row.max === undefined) &&
        (row.price === "" || row.price === undefined)
    )
  );

  if (isCompletelyEmpty) {
    Swal.fire({
      icon: "warning",
      title: "Empty Form",
      text: "Please fill in at least one item before submitting.",
      confirmButtonColor: "#f59e0b", // amber
    });
    return;
  }

  Object.keys(formValues).forEach((key) => {
    const rows = formValues[key] || [];

    // 🧩 Track duplicates for type=0
    const type0ItemIds = new Set();

    rows.forEach((row, index) => {
      const isEmptyRow =
        (!row.min && !row.max && !row.price && !row.itemId) ||
        (row.min === "" && row.max === "" && row.price === "" && !row.itemId);

      if (!row.itemId) {
        tempErrors[`${key}-${index}-itemId`] = "Item selection is required";
        allValid = false;
        return;
      }

      const selectedItem = data[key].find((i) => i.id === Number(row.itemId));
      const itemType = selectedItem?.type || 0;

      // 🚫 Prevent same type=0 item selection multiple times
      if (itemType === 0) {
        if (type0ItemIds.has(row.itemId)) {
          tempErrors[`${key}-${index}-itemId`] =
            "This item can only be selected once";
          allValid = false;
        } else {
          type0ItemIds.add(row.itemId);
        }
      }

      // ✅ Case 1 — Empty row
      if (isEmptyRow) {
        if (itemType === 1) {
          tempErrors[`${key}-${index}-min`] = "Min is required";
        }
        tempErrors[`${key}-${index}-price`] = "Price is required";
        allValid = false;
        return;
      }

      // ✅ Case 2 — Required fields for type=1
      if (itemType === 1) {
        if (row.min === "" || row.min === undefined) {
          tempErrors[`${key}-${index}-min`] = "Min is required";
          allValid = false;
        }

        if (row.price === "" || row.price === undefined) {
          tempErrors[`${key}-${index}-price`] = "Price is required";
          allValid = false;
        }

        // ✅ Case 3 — Open-ended max only for last row of same item
        const sameItemRows = rows.filter((r) => r.itemId === row.itemId);
        const hasAnotherOpen = sameItemRows.filter((r) => !r.max).length > 1;

        if (!row.max && hasAnotherOpen) {
          tempErrors[`${key}-${index}-max`] =
            "Only one open-ended Max allowed per item";
          allValid = false;
        }

        // ✅ Case 4 — Min < Max (if max exists)
        if (row.max && Number(row.min) >= Number(row.max)) {
          tempErrors[`${key}-${index}-max`] = "Max must be greater than Min";
          allValid = false;
        }
        if (!row.max) {
  const isLast = index === rows.length - 1;
  if (!isLast) {
    tempErrors[`${key}-${index}-max`] = "Empty Max allowed only in last range";
    allValid = false;
  }
}
      } else {
        // ✅ For type=0: only price required
        if (row.price === "" || row.price === undefined) {
          tempErrors[`${key}-${index}-price`] = "Price is required";
          allValid = false;
        }
      }
      // Ensure only last range can have empty max


    });

    // ✅ Check overlapping ranges (type=1 only)
    const type1Rows = (rows || []).filter((r) => {
      const selected = data[key].find((i) => i.id === Number(r.itemId));
      return selected?.type === 1;
    });

   const overlapFound = hasOverlap(type1Rows);
if (overlapFound) {
  allValid = false;
  type1Rows.forEach((r, idx) => {
    tempErrors[`${key}-${idx}-min`] =
      tempErrors[`${key}-${idx}-min`] || "Overlapping ranges found";
  });
}

  });

  setErrors(tempErrors);

if (!allValid) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please correct the highlighted fields before submitting.",
      confirmButtonColor: "#dc2626", // red
    });
    console.log("❌ Validation Errors:", tempErrors);
    return;
  }

  const payload = buildApiPayload();
  console.log("✅ Final Payload:", payload);

  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Your form was submitted successfully.",
    confirmButtonColor: "#16a34a", // green
  }).then(() => {
    router.push("/conveyancers/Notes/");
  });
};







// ✅ Prevent overlapping min–max for same item
// Check for overlapping ranges within same itemId
const hasOverlap = (rows) => {
  const rangesByItem = {};

  rows.forEach((row, index) => {
    if (!row.itemId || row.min === "" || row.min === undefined) return;
    const itemKey = row.itemId;
    if (!rangesByItem[itemKey]) rangesByItem[itemKey] = [];
    const min = Number(row.min);
    const max = row.max === "" || row.max === undefined ? Infinity : Number(row.max);
    rangesByItem[itemKey].push({ index, min, max });
  });

  for (const itemId in rangesByItem) {
    const ranges = rangesByItem[itemId].sort((a, b) => a.min - b.min);
    for (let i = 0; i < ranges.length - 1; i++) {
      const current = ranges[i];
      const next = ranges[i + 1];
      if (current.max > next.min) {
        // Found an overlap — return true
        return true;
      }
    }
  }

  return false; // ✅ No overlaps
};









  return (

   <div className="min-h-screen bg-white antialiased font">
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
                  <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Company  Details</div>
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
                  <div className="text-[20px] font-extrabold text-[#1E1E1E] leading-tight">Quotation   Details</div>
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
                  <div className="text-[20px] font-bold text-[#1E1E1E]  leading-tight">Notes Section</div>
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
  bg-white max-w-[760px] h-[520px] overflow-y-auto"
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

  <div className="max-w-2xl mx-auto p-4">
  {Object.keys(data).map((key) => (
    <div key={key} className="border rounded-lg mb-4 shadow-sm overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => toggleAccordion(key)}
        className="w-full flex justify-between items-center p-4 font-semibold text-gray-800"
      >
        {key}
        <span>{openAccordion === key ? "-" : "+"}</span>
      </button>

      {/* Accordion Content */}
  {openAccordion === key && (
  <div className="p-4 bg-white transition-all">
    {(formValues[key] || []).map((row, rowIndex) => (
      <div key={rowIndex} className="mb-4 border-b pb-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Dropdown */}
          <div>
            <select
              value={row.itemId}
              onChange={(e) =>
                handleInputChange(key, rowIndex, "itemId", e.target.value)
              }
              className={`border p-2 rounded w-full text-black ${
                errors[`${key}-${rowIndex}-itemId`] ? "border-red-500" : ""
              }`}
            >
              <option value="">-- Select Item --</option>
              {data[key].map((item) => (
                <option key={item.id} value={item.id} className="font">
                  {item.name}
                </option>
              ))}
            </select>
            {errors[`${key}-${rowIndex}-itemId`] && (
              <p className="text-red-600 text-sm mt-1">
                {errors[`${key}-${rowIndex}-itemId`]}
              </p>
            )}
          </div>

          {/* ✅ Show Min & Max only if selected item has type=1 */}
          {(() => {
            const selectedItem = data[key].find(
              (i) => i.id === Number(row.itemId)
            );
            if (selectedItem?.type === 1) {
              return (
                <>
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={row.min || ""}
                      onChange={(e) => {
                        handleInputChange(
                          key,
                          rowIndex,
                          "min",
                          e.target.value
                        );
                      }}
                      className={`border p-2 rounded w-full text-black ${
                        errors[`${key}-${rowIndex}-min`] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[`${key}-${rowIndex}-min`] && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[`${key}-${rowIndex}-min`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Max (optional)"
                      value={row.max || ""}
                      onChange={(e) => {
                        handleInputChange(
                          key,
                          rowIndex,
                          "max",
                          e.target.value
                        );
                      }}
                      className={`border p-2 rounded w-full text-black ${
                        errors[`${key}-${rowIndex}-max`] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[`${key}-${rowIndex}-max`] && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[`${key}-${rowIndex}-max`]}
                      </p>
                    )}
                  </div>
                </>
              );
            }
            return null;
          })()}

          {/* Price */}
        <div>
  <div className="flex flex-row gap-3 items-stretch">
    <input
      type="number"
      placeholder="Charge"
      value={row.price || ""}
      onChange={(e) =>
        handleInputChange(key, rowIndex, "price", e.target.value)
      }
      className={`border p-1 rounded w-full text-black ${
        errors[`${key}-${rowIndex}-price`] ? "border-red-500" : ""
      }`}
    />

    <button
      onClick={() => addRow(key)}
      className="text-green-600 text-sm border rounded flex items-center justify-center px-3 py-2 h-full"
    >
      <PlusCircle size={22} />
    </button>
  </div>

  {errors[`${key}-${rowIndex}-price`] && (
    <p className="text-red-600 text-sm mt-1">
      {errors[`${key}-${rowIndex}-price`]}
    </p>
  )}
</div>

        </div>
      </div>
      
    ))}


  </div>
)}


    </div>
  ))}
</div>
 {/* <button  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit
      </button> */}
  </div>


</div>


           {/* Bottom actions */}
            <div className="mt-10 flex justify-end gap-4 max-w-[760px] ">
                   <button
  onClick={() => router.back()}
  className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
>
  Back
</button>
              <button
              onClick={handleSubmit}
                className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
              >
                Continue to Notes Section →
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>

  //  
  );

}