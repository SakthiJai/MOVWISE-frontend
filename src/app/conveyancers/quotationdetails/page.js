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
// console.log(API_BASE_URL);

const baseUrl = API_BASE_URL;

  const data = {
    Legalcosts: [
      { id: 1, name: "OUR ESTIMATED FEES", type: 1 },
      { id: 2, name: "FEE TO ACT FOR THE LENDER (PER LENDER)", type: 0 },
      { id: 3, name: "STAMP DUTY FORM (IF APPLICABLE-PER TITLE)", type: 0 },
      { id: 4, name: "BANK TRANSFER FEES (PER TRANSFER)", type: 0 },
      { id: 5, name: "ADMIN & POSTAGE COSTS", type: 0 },
    ],
    Disbursement: [
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

  // Toggle accordion open/close
  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
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
  const handleInputChange = (key, itemId, index, field, value) => {
    setFormValues((prev) => {
      const rows = prev[key]?.[itemId] || [];
      const updatedRows = [...rows];
      updatedRows[index] = { ...(updatedRows[index] || { min: "", max: "", price: "" }), [field]: value };
      return {
        ...prev,
        [key]: { ...(prev[key] || {}), [itemId]: updatedRows },
      };
    });

    // clear related errors when user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${key}-${itemId}-${index}-${field}`];
      delete newErrors[`${key}-${itemId}-add`]; // clear add-row block message if any
      return newErrors;
    });
  };

  // Add a new empty row for a specific item — blocked if an existing row's max is empty
 const addRow = (key, itemId) => {
  const rows = formValues[key]?.[itemId] || [];

  // ✅ Block add only if last row is incomplete
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    if (!lastRow.min || !lastRow.price) {
      setErrors((prev) => ({
        ...prev,
        [`${key}-${itemId}-add`]: "Fill min and price before adding a new row.",
      }));
      return;
    }

    if (
      lastRow.max !== "" &&
      lastRow.max !== undefined &&
      Number(lastRow.max) <= Number(lastRow.min)
    ) {
      setErrors((prev) => ({
        ...prev,
        [`${key}-${itemId}-add`]: "Max must be greater than Min.",
      }));
      return;
    }
  }

  // ✅ Add new empty row
  setFormValues((prev) => ({
    ...prev,
    [key]: {
      ...(prev[key] || {}),
      [itemId]: [...(prev[key]?.[itemId] || []), { min: "", max: "", price: "" }],
    },
  }));

  // ✅ Clear add-row error
  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[`${key}-${itemId}-add`];
    return newErrors;
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
      let allRows = [];
      Object.keys(formValues[category]).forEach((itemId) => {
        const rows = formValues[category][itemId] || [];
        rows.forEach((r) => {
          // only include rows that at least have min and price (you could also include after validation)
          allRows.push({
            typeid: Number(itemId),
            min: r.min === "" || r.min === undefined ? null : Number(r.min),
            max: r.max === "" || r.max === undefined ? null : Number(r.max),
            price: r.price === "" || r.price === undefined ? null : Number(r.price),
          });
        });
      });
      payload[category] = allRows;
    });

    return payload;
  };

  // Submit: validate every visible item (or all items) and if valid, build payload
const handleSubmit = () => {
  let allValid = true;
  let tempErrors = {};

  Object.keys(data).forEach((key) => {
    data[key].forEach((item) => {
      const rows = formValues[key]?.[item.id] || [];

      rows.forEach((row, index) => {
        const isEmptyRow =
          (!row.min && !row.max && !row.price) ||
          (row.min === "" && row.max === "" && row.price === "");

        const isOpenEndedRow =
          row.max === "" || row.max === undefined || row.max === null;

          if (isOpenEndedRow && index < rows.length - 1) {
  tempErrors[`${key}-${item.id}-${index}-max`] =
    "Only the last row can have an open-ended max";
  allValid = false;
}


        // ✅ Case 1 — Entirely empty row → invalid
        if (isEmptyRow) {
          tempErrors[`${key}-${item.id}-${index}-min`] = "Min is required";
          tempErrors[`${key}-${item.id}-${index}-price`] = "Price is required";
          allValid = false;
          return;
        }

        // ✅ Case 2 — Min and Price are required
        if (row.min === "" || row.min === undefined || row.min === null) {
          tempErrors[`${key}-${item.id}-${index}-min`] = "Min is required";
          allValid = false;
        }
        if (row.price === "" || row.price === undefined || row.price === null) {
          tempErrors[`${key}-${item.id}-${index}-price`] = "Price is required";
          allValid = false;
        }

        // ✅ Case 3 — If max is provided, must be valid
        if (!isOpenEndedRow) {
          // max exists → must be greater than min
          if (Number(row.min) >= Number(row.max)) {
            tempErrors[`${key}-${item.id}-${index}-max`] = "Max must be greater than Min";
            allValid = false;
          }
          if (Number(row.max) < 0) {
            tempErrors[`${key}-${item.id}-${index}-max`] = "Max must be ≥ 0";
            allValid = false;
          }
        }

        // ✅ Case 4 — If max is empty, it’s fine (open-ended), no error
        // But still, min and price must exist (already handled above)

        // ✅ Case 5 — Prevent negatives
        if (row.min !== "" && Number(row.min) < 0) {
          tempErrors[`${key}-${item.id}-${index}-min`] = "Min must be ≥ 0";
          allValid = false;
        }
        if (row.price !== "" && Number(row.price) < 0) {
          tempErrors[`${key}-${item.id}-${index}-price`] = "Price must be ≥ 0";
          allValid = false;
        }
      });
    });
  });

  setErrors(tempErrors);

  if (!allValid) {
    alert("Fix validation errors before submitting.");
    return;
  }

  const payload = buildApiPayload();
  console.log("✅ Final Payload:", payload);
  alert("Submit successful (check console).");
};

const [availableItems, setAvailableItems] = useState(
  Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {})
);
const [selectedItems, setSelectedItems] = useState(
  Object.keys(data).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {})
);

const handleSelectItem = (key, id) => {
  if (!id) return;

  const item = availableItems[key].find((i) => i.id === parseInt(id));

  // Move item from dropdown → selected list
  setSelectedItems((prev) => ({
    ...prev,
    [key]: [...prev[key], item],
  }));

  setAvailableItems((prev) => ({
    ...prev,
    [key]: prev[key].filter((i) => i.id !== parseInt(id)),
  }));

  // Initialize default row
  addRow(key, item.id);
};

const handleNext = (key) => {
  // Re-show dropdown for that section
  // (does nothing if no items left)
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
          {/* ✅ Dropdown for selecting item */}
          {availableItems[key]?.length > 0 && (
            <select
              onChange={(e) => handleSelectItem(key, e.target.value)}
              defaultValue=""
              className="border p-2 rounded w-full mb-4 text-black"
            >
              <option value="">-- Select an item --</option>
              {availableItems[key].map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}

          {/* ✅ Render selected items below */}
          {selectedItems[key]?.map((item, index) => {
            const rows = formValues[key]?.[item.id] || [];

            return (
              <div key={item.id} className="mb-3 border-b pb-3">
                <h4 className="font-semibold mb-2 text-black">{item.name}</h4>

                {/* Render existing rows */}
              {rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-col md:flex-row gap-2 mb-2">
                        <div className="flex-1">
                          <input
                            type="number"
                            placeholder="Enter min value"
                            value={row.min}
                            onChange={(e) => handleInputChange(key, item.id, rowIndex, "min", e.target.value)}
                            className="border p-2 rounded w-full text-black"
                          />
                          {errors[`${key}-${item.id}-${rowIndex}-min`] && (
                            <p className= "!text-red-600 font-medium text-sm errormessage">{errors[`${key}-${item.id}-${rowIndex}-min`]}</p>
                          )}
                        </div>

                        <div className="flex-1">
                          <input
                            type="number"
                            placeholder="Enter max value (optional)"
                            value={row.max}
                            onChange={(e) => handleInputChange(key, item.id, rowIndex, "max", e.target.value)}
                            className="border p-2 rounded w-full text-black"
                          />
                          {row.max === "" && (row.min !== "" && row.min !== undefined) && (
                            <p className="text-gray-600 text-sm">Open-ended (treated as `greater than {row.min})</p>
                          )}
                          {errors[`${key}-${item.id}-${rowIndex}-max`] && (
                            <p className= "!text-red-600 font-medium text-sm errormessage">{errors[`${key}-${item.id}-${rowIndex}-max`]}</p>
                          )}
                        </div>

                        <div className="flex-1">
                          <input
                            type="number"
                            placeholder="Enter price value"
                            value={row.price}
                            onChange={(e) => handleInputChange(key, item.id, rowIndex, "price", e.target.value)}
                            className="border p-2 rounded w-full text-black"
                          />
                          {errors[`${key}-${item.id}-${rowIndex}-price`] && (
                            <p className= "!text-red-600 font-medium text-sm errormessage">{errors[`${key}-${item.id}-${rowIndex}-price`]}</p>
                          )}
                        </div>
                      </div>
                    ))}

                {/* Add Row / Next controls */}
                <div className="flex justify-between mt-2">
               <div>
    <button
      onClick={() => addRow(key, item.id)}
      className="text-green-600 text-sm border px-3 py-1 rounded"
    >
      + Add Row
    </button>
    {errors[`${key}-${item.id}-add`] && (
      <p className="!text-red-600 font-medium text-sm errormessage">
        {errors[`${key}-${item.id}-add`]}
      </p>
    )}
  </div>

             
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  ))}
</div>
 <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit
      </button>
  </div>


</div>


           {/* Bottom actions */}
            <div className="mt-10 flex justify-end gap-4 max-w-[760px] ">
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