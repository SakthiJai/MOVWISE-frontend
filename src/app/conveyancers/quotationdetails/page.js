"use client"
import Link from "next/link";
import Navbar from "../../parts/navbar/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { API_ENDPOINTS, getData } from "../../auth/API/api";
import { Check, ListPlus, Plus, PlusCircle, Trash, Trash2, X } from "lucide-react";
import { useFormStore } from "../../store/useFormStore";
import { MdAdd } from "react-icons/md";
import { set } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Quotationdetails() {
  const { updateQuotationData } = useFormStore();
  const router = useRouter();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
const [selectedItems, setSelectedItems] = useState({});





//   // Fetch quotes and initialize form values
//   useEffect(() => {
//     async function fetchQuotes() {
//       const quotes = await getData(API_ENDPOINTS.conveyancingQuotes);
//       setData(quotes.data);

//       const initialFormValues = {};
//       Object.keys(quotes.data).forEach((key) => {
//         if (quotes.data[key].length === 0) return;
//         const rows = [];
//         quotes.data[key].forEach(item => {
//           if (item.type === 1) {
//             // Five fixed rows with item name
//             for (let i = 0; i < 5; i++) {
//               rows.push({
//                 itemId: String(item.id),
//                 min: "",
//                 max: "",
//                 price: "",
//                 includeVat: false,
//                 isFixedName: true,
//                 label: item.name,
//                 "dynmic_row":i,
//                 others:null
//               });
//             }
//             // Sixth row "Others"
           
//           } else {
//             // type=0 rows with price and vat only
//             rows.push({
//               itemId: String(item.id),
//               price: "",
//               includeVat: false,
//               isFixedName: false,
//               label: item.name
//             });
//           }
//         });
//         initialFormValues[key] = rows;
//       });
//       setFormValues(initialFormValues);
//     }
//     fetchQuotes();
//   }, []);

//   // Handle input change with VAT sync logic
//  const handleInputChange = (key, rowIndex, field, value) => {
//   setFormValues(prev => {
//     const updated = { ...prev };
//     const rows = [...(updated[key] || [])];
//     const row = { ...rows[rowIndex] };

//     if (field === "includeVat") {
//       row.includeVat = value;

//       // Sync VAT with next rows if enabled
//       const currentItemId = row.itemId;
//       for (let i = 0; i < rows.length; i++) {
//         if (rows[i].itemId === currentItemId) {
//           rows[i] = { ...rows[i], includeVat: value };
//         }
//       }
    
//     } else {
      
//       row[field] = value;

   
//       // 🧠 (Optional) Auto-correct current row.min if it’s greater than max
//       if (field === "min" && row.max !== "" && Number(value) >= Number(row.max)) {
//         row.max = String(Number(value) + 1);
//       }
//     }

//     rows[rowIndex] = row;
//     updated[key] = rows;
//     return updated;
//   });

//   // Clear validation error for that field
//   setErrors(prevErrors => {
//     const newErrors = { ...prevErrors };
//     const errorKey = `${key}-${rowIndex}-${field}`;
//     if (newErrors[errorKey]) delete newErrors[errorKey];
//     return newErrors;
//   });
// };


//   // Delete row handler
//   const handleDeleteRow = (key, rowIndex) => {
//     setFormValues(prev => {
//       const updated = { ...prev };
//       const rows = [...(updated[key] || [])];
//       rows.splice(rowIndex, 1);
//       updated[key] = rows;
//       return updated;
//     });
//     // Remove errors related to deleted row
//     setErrors(prev => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach(errKey => {
//         if (errKey.startsWith(`${key}-${rowIndex}-`)) delete newErrors[errKey];
//       });
//       return newErrors;
//     });
//   };

//   // Add new row only for type=1 category
// // const handleAddRow = (category, selectedItem,insertIndex  ) => {
// //   console.log(formValues);
// //   setFormValues(prev => {
// //     const updated = { ...prev };
// //     const rows = [...(updated[category] || [])];

// //     // Get last row if it exists
// //     const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

// //     // Auto-start range at lastRow.max + 1 if available
// //     const nextMin =
// //       lastRow && lastRow.max !== "" && !isNaN(lastRow.max)
// //         ? String(Number(lastRow.max) + 1)
// //         : "";

// //     const newRow = {
// //       itemId: String(selectedItem.id),
// //       min: nextMin,
// //       max: "",
// //       price: "",
// //       includeVat: lastRow ? lastRow.includeVat : false, // carry over VAT state
// //       isFixedName: false,
// //       label: selectedItem.name,
// //     };

// //      if (insertIndex !== null && insertIndex >= 0 && insertIndex <= rows.length) {
// //       insertIndex; // insert after the fixed rows
// //       rows.splice(insertIndex, 0, newRow);    
// //     } else {
// //       // Fallback → add to the end
// //       rows.push(newRow);
// //     }

// //     updated[category] = rows;
// //     return updated;
// //   });
// //   setSelectedItems(prev => ({ ...prev, [category]: null }));
// // };

// const handleAddRow = (category, selectedItem) => {
//   setFormValues(prev => {
//     const updated = { ...prev };
//     const rows = [...(updated[category] || [])];

//     // Find last Type-1 row index
//     const type1LastIndex = rows.reduce((last, r, i) => {
//       const matched = data[category]?.find(i => String(i.id) === r.itemId);
//       return matched?.type === 1 ? i : last;
//     }, -1);

//     // Build new row
//     const lastRow = rows[type1LastIndex];
//     const nextMin =
//       lastRow && lastRow.max && !isNaN(lastRow.max)
//         ? String(Number(lastRow.max) + 1)
//         : "";

//     const newRow = {
//       itemId: String(selectedItem.id),
//       min: nextMin,
//       max: "",
//       price: "",
//       includeVat: lastRow?.includeVat ?? false,
//       isFixedName: false,
//       label: selectedItem.name,
//     };

//     // Insert after last Type-1 row
//     const insertAt = type1LastIndex + 1;
//     rows.splice(insertAt, 0, newRow);

//     updated[category] = rows;
//     return updated;
//   });

//   setSelectedItems(prev => ({ ...prev, [category]: null }));
// };



//   // Check overlapping ranges in array of rows (type=1)
// const checkOverlapOrGapInCategory = (rows) => {
//   const ranges = rows
//     .map((r, idx) => ({ idx, min: Number(r.min), max: Number(r.max) }))
//     .sort((a, b) => a.min - b.min);

//   let overlapFound = false;
//   let gapFound = false;
//   let overlapIndexes = [];
//   let gapIndexes = [];

//   for (let i = 0; i < ranges.length - 1; i++) {
//     const current = ranges[i];
//     const next = ranges[i + 1];

//     // Overlap
//     if (current.max >= next.min) {
//       overlapFound = true;
//       overlapIndexes.push(i, i + 1);
//     }

//     // Gap
//     if (current.max + 1 < next.min) {
//       gapFound = true;
//       gapIndexes.push(i, i + 1);
//     }
//   }

//   return { overlapFound, gapFound, overlapIndexes, gapIndexes };
// };




//   // Validate rows before submit
// const validateAllRows = () => {
//   let tempErrors = {};
//   let allValid = true;

//   Object.keys(formValues).forEach((key) => {
//     const rows = formValues[key] || [];

//     rows.forEach((row, idx) => {
//       const prefix = `${key}-${idx}`;
//       const itemType = data[key]?.find(i => String(i.id) === String(row.itemId))?.type;

//       const hasMin = row.min !== "" && row.min !== undefined;
//       const hasMax = row.max !== "" && row.max !== undefined;
//       const hasPrice = row.price !== "" && row.price !== undefined;

//       // ✅ Completely empty row → skip validation
//       if (!hasMin && !hasMax && !hasPrice) return;

//       // 🔹 For Type 1: must have min, max, and price logic
//       if (itemType === 1) {
//         if ((hasMin && !hasMax) || (!hasMin && hasMax)) {
//           tempErrors[`${prefix}-max`] = "Both Min and Max are required";
//           allValid = false;
//         }

//         if (hasMin && hasMax && Number(row.min) >= Number(row.max)) {
//           tempErrors[`${prefix}-max`] = "Max must be greater than Min";
//           allValid = false;
//         }

//         if (hasMin && Number(row.min) < 0) {
//           tempErrors[`${prefix}-min`] = "Min must be ≥ 0";
//           allValid = false;
//         }

//         if (hasMax && Number(row.max) < 0) {
//           tempErrors[`${prefix}-max`] = "Max must be ≥ 0";
//           allValid = false;
//         }

//         if (hasPrice && Number(row.price) < 0) {
//           tempErrors[`${prefix}-price`] = "Price must be ≥ 0";
//           allValid = false;
//         }

//         if (hasMin && hasMax && !hasPrice) {
//           tempErrors[`${prefix}-price`] = "Price is required when Min & Max are filled";
//           allValid = false;
//         }

//       } else {
//         // 🔹 Type 0 → Only price is needed
//         if (!hasPrice) {
//           tempErrors[`${prefix}-price`] = "Charge is required";
//           allValid = false;
//         } else if (Number(row.price) < 0) {
//           tempErrors[`${prefix}-price`] = "Charge must be ≥ 0";
//           allValid = false;
//         }
//       }
//     });

//     // 🔹 Overlap and gap check (only for type=1)
//     const type1Rows = rows.filter(r => {
//       const t = data[key]?.find(i => String(i.id) === String(r.itemId))?.type;
//       return t === 1 && r.min !== "" && r.max !== "";
//     });

//     if (type1Rows.length > 1) {
//       const { overlapFound, gapFound, overlapIndexes, gapIndexes } =
//         checkOverlapOrGapInCategory(type1Rows);

//       if (overlapFound) {
//         overlapIndexes.forEach((idx) => {
//           const realIndex = rows.indexOf(type1Rows[idx]);
//           tempErrors[`${key}-${realIndex}-min`] = "Overlapping ranges found";
//         });
//         allValid = false;
//       }

//       if (gapFound) {
//         gapIndexes.forEach((idx) => {
//           const realIndex = rows.indexOf(type1Rows[idx]);
//           tempErrors[`${key}-${realIndex}-max`] = "Gap found before next range";
//         });
//         allValid = false;
//       }
//     }
//   });

//   setErrors(tempErrors);
//   return allValid;
// };



//   // Build API payload on submit
//   const buildApiPayload = () => {
//   let payload = {};

//   Object.keys(formValues).forEach(category => {
//     const rows = formValues[category] || [];

//     // Filter out empty rows (no min, max, or price)
//     const filledRows = rows.filter(r =>
//       (r.min !== "" && r.min !== undefined) ||
//       (r.max !== "" && r.max !== undefined) ||
//       (r.price !== "" && r.price !== undefined)
//     );

//     // Map only filled rows
//     payload[category] = filledRows.map(r => ({
//       typeid: r.itemId === "others" ? null : Number(r.itemId),
//       min: r.min === "" || r.min === undefined ? null : Number(r.min),
//       max: r.max === "" || r.max === undefined ? null : Number(r.max),
//       price: r.price === "" || r.price === undefined ? null : Number(r.price),
//       vat: r.includeVat ? 1 : 0,
//     }));
//   });

//   return payload;
// };


//   // Submit handler
//   const handleSubmit = () => {
//     // Check at least one row filled per category
//    const emptyCategories = Object.keys(formValues).filter(key => {
//   const rows = formValues[key] || [];

//   // A filled row means any of min, max, or price is entered
//   const hasFilledRow = rows.some(r =>
//     (r.min && r.min !== "") ||
//     (r.max && r.max !== "") ||
//     (r.price && r.price !== "")
//   );

//   return !hasFilledRow; // category is empty if no row is filled
// });

// if (emptyCategories.length > 0) {
//   Swal.fire({
//     icon: "warning",
//     title: "Missing Data",
//     text: `Please fill at least one row in: ${emptyCategories.join(", ")}`,
//     confirmButtonColor: "#f59e0b",
//   });
//   return; // stop submit
// }
//     if (!validateAllRows()) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please correct the highlighted fields before submitting.",
//         confirmButtonColor: "#dc2626",
//       });
//       return;
//     }

//     const payload = buildApiPayload();
//     updateQuotationData(payload);

//     Swal.fire({
//       icon: "success",
//       title: "Success!",
//       text: "Your form was submitted successfully.",
//       confirmButtonColor: "#16a34a",
//     }).then(() => {
//       router.push("/conveyancers/Notes/");
//     });
//   };

const handleSubmit = () => {
  const validationErrors = validateRows("");

  if (validationErrors?.length > 0) {
    alert(validationErrors.join("\n"));
    return;
  }

  console.log("VALID DATA", legalcostrows);
};
const [rowErrors, setRowErrors] = useState([]);     // errors for each row
const [rangeErrors, setRangeErrors] = useState([]); // gap / overlap errors

  // Dynamic Legal Cost Rows  
const [notes, setNotes] = useState("");

const [legalcostrows, setLegalcostrows] = useState([
  { min: "", max: "", pLease: "", pFree: "", sLease: "", sFree: "" }
]);
  
  const handle_addrow = () => {
  setLegalcostrows([
    ...legalcostrows,
    { min: "", max: "", pLease: "", pFree: "", sLease: "", sFree: "" }
  ]);
};
const handleChange = (index, field, value) => {
  const updated = [...legalcostrows];
  updated[index][field] = value;
  setLegalcostrows(updated);
};



const [PurchasTransactionSupplementsrows, setPurchasTransactionSupplementsrows] = useState([
  {
    isOthers: false,
    type: "",         
    feeAmount: "",
    description: "",
  }
]);

const [SalesTransactionSupplementsrows, setSalesTransactionSupplementsrows] = useState([
  {
    isOthers: false,  
    type: "",
    feeAmount: "",
    description: "",
  }
]);
const validateRows = () => {
  let rErrors = [];
  let gErrors = [];

  // prepare array
  const rows = legalcostrows.map(r => ({
    min: Number(r.min),
    max: Number(r.max),
  }));

  // 1️⃣ Row-Level Validation
  rows.forEach((r, i) => {
    const errors = {};

    if (!r.min && r.min !== 0) errors.min = "Min is required";
    if (!r.max && r.max !== 0) errors.max = "Max is required";

    if (r.min >= r.max) errors.range = "Min must be less than Max";

    if (r.min < 0 || r.max < 0) errors.negative = "Values cannot be negative";

    rErrors[i] = errors;
  });

  // 2️⃣ Remove rows with empty values before global validation
  const sorted = [...rows].sort((a, b) => a.min - b.min);

  // 3️⃣ Check Gaps + Overlaps
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    // Overlap
    if (next.min < current.max) {
      gErrors.push(
        `Overlap: (${next.min} - ${next.max}) overlaps with (${current.min} - ${current.max})`
      );
    }

    // Gap
    if (next.min > current.max) {
      gErrors.push(
        `Gap found between ${current.max} and ${next.min}`
      );
    }
  }

  setRowErrors(rErrors);
  setRangeErrors(gErrors);
};

  
  const [dropdownothers, setDropdownothers] = useState(false);
  const [salesdropdownothers, setSalesdropdownothers] = useState(false);


 

  //supplement handlers

const handlesuplement = (e, rowIndex) => {
  const value = e.target.value;
  const updated = [...PurchasTransactionSupplementsrows];

  // If the row had previous value → restore it back to dropdown
  if (updated[rowIndex].type && updated[rowIndex].type !== "others") {
    setsuplementOptions((prev) => [
      ...prev,
      { label: updated[rowIndex].type, value: updated[rowIndex].type }
    ]);
  }

  if (value === "others") {
    updated[rowIndex].isOthers = true;
    updated[rowIndex].type = "";
  } else {
    updated[rowIndex].isOthers = false;
    updated[rowIndex].type = value;

    // remove selected option
    setsuplementOptions((prev) =>
      prev.filter((item) => item.value !== value)
    );
  }

  setPurchasTransactionSupplementsrows(updated);
};

const handlesalesuplement = (e, rowIndex) => {
  const value = e.target.value;

  const updated = [...SalesTransactionSupplementsrows];

  if (value === "others") {
    updated[rowIndex].isOthers = true;
    updated[rowIndex].type = "";
  } else {
    updated[rowIndex].isOthers = false;
    updated[rowIndex].type = value;
  }

  setSalesTransactionSupplementsrows(updated);
};

const handleDisbursementChange = (e, index) => {
  const updated = [...disbursementRows];

  if (e.target.value === "others") {
    updated[index].isOthers = true;
    updated[index].type = "";
  } else {
    updated[index].isOthers = false;
    updated[index].type = e.target.value;
  }
 setDisbursementRows(updated);
};

const handleFieldChange = (rowIndex, field, value,type) => {
  console.log(type)
  if(type==="purchase"){
  const updated = [...PurchasTransactionSupplementsrows];
  updated[rowIndex][field] = value;
  setPurchasTransactionSupplementsrows(updated);
}
else if(type==="sales"){
  const updated = [...SalesTransactionSupplementsrows];
  updated[rowIndex][field] = value;
  setSalesTransactionSupplementsrows(updated);
}

console.log(PurchasTransactionSupplementsrows)
console.log(SalesTransactionSupplementsrows)
}
const handleDisField = (index, field, value) => {
  const updated = [...disbursementRows];
  updated[index][field] = value;
  setDisbursementRows(updated);
};

let [supplementOptions,setsuplementOptions] =useState( [
  { label: "Leasehold Enfranchisement", value: "Leasehold Enfranchisement" },
  { label: "Shared Ownership", value: "Shared Ownership" },
  { label: "Help to Buy", value: "Help to Buy" },
  { label: "Others", value: "others" },
])

let [salessupplementOptions,setsalessuplementOptions] =useState( [
  { label: "Leasehold Enfranchisement", value: "Leasehold Enfranchisement" },
  { label: "Shared Ownership", value: "Shared Ownership" },
  { label: "Help to Buy", value: "Help to Buy" },
  { label: "Others", value: "others" },
])
const [disbursementRows, setDisbursementRows] = useState([
  {
    isOthers: false,
    type: "",
    feeCost: "",
    paidTo: "",
    transactionType: "",
  },
]);
const disbursementOptions = [
  { value: "Stamp Duty", label: "Stamp Duty" },
  { value: "Land Registry Fee", label: "Land Registry Fee" },
  { value: "Search Fee", label: "Search Fee" },
  { value: "others", label: "Others" },
];

const paidToOptions = [
  { value: "admin", label: "Admin" },
  { value: "localauditor", label: "Local Auditor" },
];

const transactionOptions = [
  { value: "purchaseonly", label: "Purchase Only" },
  { value: "salesonly", label: "Sales Only" },
];

const [leaseholdRows, setLeaseholdRows] = useState([
  {
    service: "",
    feeType: "",
    amount: "",
    paidTo: "",
  },
]);

// Dummy dropdowns
const leaseholdServiceOptions = [
  { value: "management-fee", label: "Management Fee" },
  { value: "ground-rent", label: "Ground Rent" },
];

const feeTypeOptions = [
  { value: "disbursement", label: "Disbursement" },
  { value: "legalfee", label: "Legal Fee" },
  { value: "thirdpartycost", label: "Third Party Cost" },
];

const paidToOptions_std = [
  { value: "admin", label: "Admin" },
  { value: "freeholder", label: "Freeholder" },
];

// field update handler
const handleLeaseholdField = (index, field, value) => {
  const updated = [...leaseholdRows];
  updated[index][field] = value;
  setLeaseholdRows(updated);
};



  return (
    <div className="min-h-screen bg-white antialiased font   ">
      {/* Header */}
      <div className='sticky top-0 z-50  '>
        <Navbar />
      </div>

 


<main className="pt-10  w-auto  grid grid-cols-12 m-3 ">
  
  <div className=" bg-white shadow-md rounded-2xl p-8 border col-span-12  border-gray-100  ">
    <div className=" w-[1000px]">
      <nav className="text-[13px] text-[#6B7280] mb-5 flex items-center gap-4" aria-label="Breadcrumb">
            <span className="other-page hidden sm:inline">Home</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Company registration</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="live-page hidden sm:inline">Price Breakdown</span>
                 
                </nav>

  </div>

<div className="border rounded-lg mb-6 shadow-sm overflow-hidden bg-white p-5">
  <div>
 <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
    Legal Fees
  </div>
  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
Standard Conveyancing Fees (Excluding VAT)
  </div>

  {/* Header */}
  <div className="grid grid-cols-[0.6fr_0.7fr_0.7fr_0.8fr_0.6fr_0.8fr_0.4fr] items-center 
                  text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Min €</div>
    <div className="text-center">Max €</div>
    <div className="text-center">Purchase Leasehold €</div>
    <div className="text-center">Purchase Freehold €</div>
    <div className="text-center">Sales Leasehold €</div>
    <div className="text-center">Sales Freehold €</div>
    <div className="text-center">Action</div>
  </div>

  {/* Input Row */}
    {legalcostrows.map((_, i) => (
  <div key={i} className="grid grid-cols-[0.5fr_0.5fr_0.5fr_0.6fr_0.6fr_0.6fr_0.2fr] items-center 
                  text-sm border-b border-gray-200 hover:bg-gray-50 transition-colors px-3 py-2 gap-3">

    <input type="number" placeholder="Min" className="border border-gray-400 rounded  py-0.5  text-sm text-center text-black bg-white"   onChange={(e) => handleChange(i, "min", e.target.value)}
  />
    <input type="number" placeholder="Max" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"   onChange={(e) => handleChange(i, "max", e.target.value)}
 />
    <input type="number" placeholder="Purchase Leasehold" className="border  border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"   onChange={(e) => handleChange(i, "PurchaseLeasehold", e.target.value)}
 />
    <input type="number" placeholder="Purchase Freehold" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"   onChange={(e) => handleChange(i, "PurchaseFreehold", e.target.value)} />
    <input type="number" placeholder="Sales Leasehold" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"   onChange={(e) => handleChange(i, "salesLeasehold", e.target.value)} />
    <input type="number" placeholder="Sales Freehold" className="border border-gray-400  rounded py-0.5 w-full text-sm text-center text-black"   onChange={(e) => handleChange(i, "salesFreehold", e.target.value)} />
 {
  i==legalcostrows.length-1&&(
  <button className="text-green-500 border-green-400" onClick={handle_addrow}> <Plus
   /> </button>

  )
 }
 
 </div>

))}

  </div>
 

<div className="mt-10">

<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
Transaction Supplement Fees  </div>

<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
Purchase Transaction Supplements
  </div>
<div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center 
                  text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Suplement Type €</div>
    <div className="text-center">Fee Amount €</div>
    <div className="text-center">Description </div>
    <div className="text-center">Action</div>

    
  </div>

{PurchasTransactionSupplementsrows.map((row, i) => (
  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-3 px-3 py-2">

    {/* SELECT DROPDOWN or TEXTBOX */}
    {!row.isOthers ? (
     <select
  className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
  onChange={(e) => handlesuplement(e, i)}
  value={row.type}
>
  <option value="">Select Supplement Type</option>

 {salessupplementOptions.map((opt) => (

    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>

    ) : (
      <input
        type="text"
        placeholder="Enter Supplement Type"
        value={row.type}
        onChange={(e) => handleFieldChange(i, "type", e.target.value,"purchase")}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
      />
    )}

    {/* FEE AMOUNT */}
    <input
      type="number"
      placeholder="Fee Amount"
      value={row.feeAmount}
      onChange={(e) => handleFieldChange(i, "feeAmount", e.target.value,"purchase")}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
    />

    {/* DESCRIPTION */}
    <input
      type="text"
      placeholder="Description"
      value={row.description}
      onChange={(e) => handleFieldChange(i, "description", e.target.value,"purchase"  )}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
    />

    {/* REMOVE BUTTON */}
    
    {/* ADD Row Button */}
    <div className="flex justify-center gap-4">   
       {i === PurchasTransactionSupplementsrows.length - 1 && (
      <button
        className="text-green-500"
        onClick={() =>
          setPurchasTransactionSupplementsrows([
            ...PurchasTransactionSupplementsrows,
            { isOthers: false, type: "", feeAmount: "", description: "" }
          ])
        }
      >
        <Plus />
      </button>
    )}

    <button
      className="text-red-600"
      onClick={() => {
        const updated = PurchasTransactionSupplementsrows.filter((_, idx) => idx !== i);
        setPurchasTransactionSupplementsrows(updated);
      }}
    >
      <X />
    </button>

    </div>
   
  </div>
))}


<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">

sales Transaction Supplements
  </div>
 
<div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center 
                  text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Suplement Type €</div>
    <div className="text-center">Fee Amount €</div>
    <div className="text-center">Description </div>
    <div className="text-center">Action</div>

    
  </div>

{SalesTransactionSupplementsrows.map((row, i) => (
  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-3 px-3 py-2">

    {/* SELECT DROPDOWN or TEXTBOX */}
    {!row.isOthers ? (
     <select
  className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
  onChange={(e) => handlesalesuplement(e, i)}
  value={row.type}
>
  <option value="">Select Supplement Type</option>

  {salessupplementOptions.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>

    ) : (
      <input
        type="text"
        placeholder="Enter Supplement Type"
        value={row.type}
        onChange={(e) => handleFieldChange(i, "type", e.target.value,"sales")}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
      />
    )}

    {/* FEE AMOUNT */}
    <input
      type="number"
      placeholder="Fee Amount"
      value={row.feeAmount}
      onChange={(e) => handleFieldChange(i, "feeAmount", e.target.value,"sales")}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
    />

    {/* DESCRIPTION */}
    <input
      type="text"
      placeholder="Description"
      value={row.description}
      onChange={(e) => handleFieldChange(i, "description", e.target.value,"sales"  )}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
    />

    {/* REMOVE BUTTON */}
    
    {/* ADD Row Button */}
    <div className="flex justify-center gap-4">   
       {i === SalesTransactionSupplementsrows.length - 1 && (
      <button
        className="text-green-500"
        onClick={() =>
          setSalesTransactionSupplementsrows([
            ...SalesTransactionSupplementsrows,
            { isOthers: false, type: "", feeAmount: "", description: "" }
          ])
        }
      >
        <Plus />
      </button>
    )}

    <button
      className="text-red-600"
      onClick={() => {
        const updated = SalesTransactionSupplementsrows.filter((_, idx) => idx !== i);

        setSalesTransactionSupplementsrows(updated);
      }}
    >
      <X />
    </button>

    </div>
   
  </div>
))}


<div className="mt-10">
  


<div className="mt-10">

  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
    Standard Disbursements
  </div>
   <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
Essential Disbursements & Third-Party Costs
  </div>

  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center 
      text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Disbursement Type €</div>
    <div className="text-center">Fee Cost €</div>
    <div className="text-center">Paid To</div>
    <div className="text-center">Transaction Type</div>
    <div className="text-center">Action</div>

  </div>

  {disbursementRows.map((row, i) => (
    <div
      key={i}
      className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3 px-3 py-2"
    >
      {/* TYPE DROPDOWN OR TEXTBOX */}
      {!row.isOthers ? (
        <select
          className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
          onChange={(e) => handleDisbursementChange(e, i)}
          value={row.type}
        >
          <option value="">Select Disbursement</option>
          {disbursementOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Enter Type"
          value={row.type}
          onChange={(e) => handleDisField(i, "type", e.target.value)}
          className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black placeholder:text-gray-900"
        />
      )}

      {/* COST */}
      <input
        type="number"
        placeholder="Fee Cost"
        value={row.feeCost}
        onChange={(e) => handleDisField(i, "feeCost", e.target.value)}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black placeholder:text-gray-500"
      />

      {/* PAID TO */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-gray-400  placeholder:text-gray-800"
        value={row.paidTo}
        onChange={(e) => handleDisField(i, "paidTo", e.target.value)}
      >
        <option value="" className="text-gray-900">Select Paid To</option>
        {paidToOptions.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-gray-900">
            {opt.label}
          </option>
        ))}
      </select>

      {/* TRANSACTION TYPE */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-gray-400  placeholder:text-gray-500"
        value={row.transactionType}
        onChange={(e) =>
          handleDisField(i, "transactionType", e.target.value)
        }
      >
        <option value="">Select Type</option>
        {transactionOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-4">
        {/* ADD ROW – only last row */}
        {i === disbursementRows.length - 1 && (
          <button
            className="text-green-600"
            onClick={() =>
              setDisbursementRows([
                ...disbursementRows,
                {
                  isOthers: false,
                  type: "",
                  feeCost: "",
                  paidTo: "",
                  transactionType: "",
                },
              ])
            }
          >
            <Plus />
          </button>
        )}

        {/* REMOVE */}
        <button
          className="text-red-600"
          onClick={() => {
            const updated = disbursementRows.filter(
              (_, idx) => idx !== i
            );
            setDisbursementRows(updated);
          }}
        >
          <X />
        </button>
      </div>
    </div>
  ))}
</div>

<div className="mt-10">

  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
Leasehold Specific Fees & Disbursements
  </div>

  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
    Additional Leasehold Charges
  </div>

  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center 
      text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Leasehold Service</div>
    <div className="text-center">Fee Type</div>
    <div className="text-center">Amount €</div>
    <div className="text-center">Paid To</div>
    <div className="text-center">Action</div>

  </div>

  {/* ROWS */}
  {leaseholdRows.map((row, i) => (
    <div
      key={i}
      className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3 px-3 py-2"
    >

      {/* Leasehold Service */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
        value={row.service}
        onChange={(e) => handleLeaseholdField(i, "service", e.target.value)}
      >
        <option value="">Select Service</option>
        {leaseholdServiceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Fee Type */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
        value={row.feeType}
        onChange={(e) => handleLeaseholdField(i, "feeType", e.target.value)}
      >
        <option value="">Select Fee Type</option>
        {feeTypeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={row.amount}
        onChange={(e) => handleLeaseholdField(i, "amount", e.target.value)}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black placeholder:text-black"
      />

      {/* Paid To */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
        value={row.paidTo}
        onChange={(e) => handleLeaseholdField(i, "paidTo", e.target.value)}
      >
        <option value="">Select Paid To</option>
        {paidToOptions_std.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-4">
        
        {/* ADD button — only on last row */}
        {i === leaseholdRows.length - 1 && (
          <button
            className="text-green-600"
            onClick={() =>
              setLeaseholdRows([
                ...leaseholdRows,
                {
                  service: "",
                  feeType: "",
                  amount: "",
                  paidTo: "",
                },
              ])
            }
          >
            <Plus />
          </button>
        )}

        {/* DELETE */}
        <button
          className="text-red-600"
          onClick={() => {
            const updated = leaseholdRows.filter((_, idx) => idx !== i);
            setLeaseholdRows(updated);
          }}
        >
          <X />
        </button>
      </div>
    </div>
  ))}
</div>

<div className="mt-10">


  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
    Additional Services & Insurance
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

    {/* 1 — Indemnity Insurance Handling Preparation */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Indemnity Insurance Handling Preparation
      </label>

      <input
        type="number"
        className="border p-2 rounded-md text-sm focus:ring-2 border-gray-400   outline-none focus:ring-black placeholder:text-black"
        placeholder="Enter amount"
      />

      <p className="text-xs text-gray-500 mt-1">
        Fee for arranging indemnity policies
      </p>
    </div>

    {/* 2 — SDLT/LBTT/LTT Return */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        SDLT/LBTT/LTT Return
      </label>

      <input
        type="number"
        className="border p-2 rounded-md border-gray-400 text-sm focus:ring-2 outline-none focus:ring-black placeholder:text-black"
        placeholder="Enter amount"
      />

      <p className="text-xs text-gray-500 mt-1">
        Tax return preparation fee
      </p>
    </div>

    {/* 3 — Additional Legal Advice */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Additional Legal Advice
      </label>

      <input
        type="number"
        className="border p-2 rounded-md border-gray-400 text-sm focus:ring-2  outline-none focus:ring-black placeholder:text-black"
        placeholder="Enter amount"
      />

      <p className="text-xs text-gray-500 mt-1">
        Tax return preparation fee
      </p>
    </div>

  </div>



 

</div>

<div className="mt-10">
  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase  tracking-wide">
    Service Level Options
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

    {/* 1 — Expedited Service Fee */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Expedited Service Fee
      </label>

      <input
        type="number"
        placeholder="0.00"
        className="border p-2 border-gray-400 placeholder:text-black rounded-md text-sm focus:ring-2 focus:ring-black  outline-none"
      />

      <p className="text-xs text-gray-500 mt-1">
        Additional fee for faster completion (e.g., 4–6 weeks)
      </p>
    </div>

    {/* 2 — Weekend/Evening Appointment Fee */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        Weekend/Evening Appointment Fee
      </label>

      <input
        type="number"
        placeholder="0.00"
        className="border border-gray-400 p-2 placeholder:text-black rounded-md text-sm focus:ring-2 focus:ring-black outline-none"
      />

      <p className="text-xs text-gray-500 mt-1">
        Fee for out-of-hours appointments
      </p>
    </div>

  </div>
</div>



</div>
<div className="mt-10">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Enter Additional Information
      </label>

      <div className="bg-white border border-gray-300 rounded-md">
        <ReactQuill
          value={notes}
          onChange={setNotes}
          theme="snow"
          modules={{ toolbar: false }}   // 🔥 removes toolbar
          placeholder="Type your message here..."
          className="min-h-[150px] text-black"
        />
      </div>
    </div>

                  </div>
</div>



    </div>
  

  {/* ✅ Footer Buttons */}
 
</main>

 <div className=" m-10 flex justify-end gap-4 max-w-screen">
    <button
      onClick={() => router.back()}
      className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
    >
      Back
    </button>
    <button
      className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
    onClick={handleSubmit}
    >
      Continue to Notes Section →
    </button>
  </div>
    </div>
  );
}
