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

export default function Quotationdetails() {
  const { updateQuotationData } = useFormStore();
  const router = useRouter();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
const [selectedItems, setSelectedItems] = useState({});





  // Fetch quotes and initialize form values
  useEffect(() => {
    async function fetchQuotes() {
      const quotes = await getData(API_ENDPOINTS.conveyancingQuotes);
      setData(quotes.data);

      const initialFormValues = {};
      Object.keys(quotes.data).forEach((key) => {
        if (quotes.data[key].length === 0) return;
        const rows = [];
        quotes.data[key].forEach(item => {
          if (item.type === 1) {
            // Five fixed rows with item name
            for (let i = 0; i < 5; i++) {
              rows.push({
                itemId: String(item.id),
                min: "",
                max: "",
                price: "",
                includeVat: false,
                isFixedName: true,
                label: item.name,
                "dynmic_row":i,
                others:null
              });
            }
            // Sixth row "Others"
           
          } else {
            // type=0 rows with price and vat only
            rows.push({
              itemId: String(item.id),
              price: "",
              includeVat: false,
              isFixedName: false,
              label: item.name
            });
          }
        });
        initialFormValues[key] = rows;
      });
      setFormValues(initialFormValues);
    }
    fetchQuotes();
  }, []);

  // Handle input change with VAT sync logic
 const handleInputChange = (key, rowIndex, field, value) => {
  setFormValues(prev => {
    const updated = { ...prev };
    const rows = [...(updated[key] || [])];
    const row = { ...rows[rowIndex] };

    if (field === "includeVat") {
      row.includeVat = value;

      // Sync VAT with next rows if enabled
      const currentItemId = row.itemId;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].itemId === currentItemId) {
          rows[i] = { ...rows[i], includeVat: value };
        }
      }
    
    } else {
      
      row[field] = value;

   
      // 🧠 (Optional) Auto-correct current row.min if it’s greater than max
      if (field === "min" && row.max !== "" && Number(value) >= Number(row.max)) {
        row.max = String(Number(value) + 1);
      }
    }

    rows[rowIndex] = row;
    updated[key] = rows;
    return updated;
  });

  // Clear validation error for that field
  setErrors(prevErrors => {
    const newErrors = { ...prevErrors };
    const errorKey = `${key}-${rowIndex}-${field}`;
    if (newErrors[errorKey]) delete newErrors[errorKey];
    return newErrors;
  });
};


  // Delete row handler
  const handleDeleteRow = (key, rowIndex) => {
    setFormValues(prev => {
      const updated = { ...prev };
      const rows = [...(updated[key] || [])];
      rows.splice(rowIndex, 1);
      updated[key] = rows;
      return updated;
    });
    // Remove errors related to deleted row
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(errKey => {
        if (errKey.startsWith(`${key}-${rowIndex}-`)) delete newErrors[errKey];
      });
      return newErrors;
    });
  };

  // Add new row only for type=1 category
// const handleAddRow = (category, selectedItem,insertIndex  ) => {
//   console.log(formValues);
//   setFormValues(prev => {
//     const updated = { ...prev };
//     const rows = [...(updated[category] || [])];

//     // Get last row if it exists
//     const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

//     // Auto-start range at lastRow.max + 1 if available
//     const nextMin =
//       lastRow && lastRow.max !== "" && !isNaN(lastRow.max)
//         ? String(Number(lastRow.max) + 1)
//         : "";

//     const newRow = {
//       itemId: String(selectedItem.id),
//       min: nextMin,
//       max: "",
//       price: "",
//       includeVat: lastRow ? lastRow.includeVat : false, // carry over VAT state
//       isFixedName: false,
//       label: selectedItem.name,
//     };

//      if (insertIndex !== null && insertIndex >= 0 && insertIndex <= rows.length) {
//       insertIndex; // insert after the fixed rows
//       rows.splice(insertIndex, 0, newRow);    
//     } else {
//       // Fallback → add to the end
//       rows.push(newRow);
//     }

//     updated[category] = rows;
//     return updated;
//   });
//   setSelectedItems(prev => ({ ...prev, [category]: null }));
// };

const handleAddRow = (category, selectedItem) => {
  setFormValues(prev => {
    const updated = { ...prev };
    const rows = [...(updated[category] || [])];

    // Find last Type-1 row index
    const type1LastIndex = rows.reduce((last, r, i) => {
      const matched = data[category]?.find(i => String(i.id) === r.itemId);
      return matched?.type === 1 ? i : last;
    }, -1);

    // Build new row
    const lastRow = rows[type1LastIndex];
    const nextMin =
      lastRow && lastRow.max && !isNaN(lastRow.max)
        ? String(Number(lastRow.max) + 1)
        : "";

    const newRow = {
      itemId: String(selectedItem.id),
      min: nextMin,
      max: "",
      price: "",
      includeVat: lastRow?.includeVat ?? false,
      isFixedName: false,
      label: selectedItem.name,
    };

    // Insert after last Type-1 row
    const insertAt = type1LastIndex + 1;
    rows.splice(insertAt, 0, newRow);

    updated[category] = rows;
    return updated;
  });

  setSelectedItems(prev => ({ ...prev, [category]: null }));
};



  // Check overlapping ranges in array of rows (type=1)
const checkOverlapOrGapInCategory = (rows) => {
  const ranges = rows
    .map((r, idx) => ({ idx, min: Number(r.min), max: Number(r.max) }))
    .sort((a, b) => a.min - b.min);

  let overlapFound = false;
  let gapFound = false;
  let overlapIndexes = [];
  let gapIndexes = [];

  for (let i = 0; i < ranges.length - 1; i++) {
    const current = ranges[i];
    const next = ranges[i + 1];

    // Overlap
    if (current.max >= next.min) {
      overlapFound = true;
      overlapIndexes.push(i, i + 1);
    }

    // Gap
    if (current.max + 1 < next.min) {
      gapFound = true;
      gapIndexes.push(i, i + 1);
    }
  }

  return { overlapFound, gapFound, overlapIndexes, gapIndexes };
};




  // Validate rows before submit
const validateAllRows = () => {
  let tempErrors = {};
  let allValid = true;

  Object.keys(formValues).forEach((key) => {
    const rows = formValues[key] || [];

    rows.forEach((row, idx) => {
      const prefix = `${key}-${idx}`;
      const itemType = data[key]?.find(i => String(i.id) === String(row.itemId))?.type;

      const hasMin = row.min !== "" && row.min !== undefined;
      const hasMax = row.max !== "" && row.max !== undefined;
      const hasPrice = row.price !== "" && row.price !== undefined;

      // ✅ Completely empty row → skip validation
      if (!hasMin && !hasMax && !hasPrice) return;

      // 🔹 For Type 1: must have min, max, and price logic
      if (itemType === 1) {
        if ((hasMin && !hasMax) || (!hasMin && hasMax)) {
          tempErrors[`${prefix}-max`] = "Both Min and Max are required";
          allValid = false;
        }

        if (hasMin && hasMax && Number(row.min) >= Number(row.max)) {
          tempErrors[`${prefix}-max`] = "Max must be greater than Min";
          allValid = false;
        }

        if (hasMin && Number(row.min) < 0) {
          tempErrors[`${prefix}-min`] = "Min must be ≥ 0";
          allValid = false;
        }

        if (hasMax && Number(row.max) < 0) {
          tempErrors[`${prefix}-max`] = "Max must be ≥ 0";
          allValid = false;
        }

        if (hasPrice && Number(row.price) < 0) {
          tempErrors[`${prefix}-price`] = "Price must be ≥ 0";
          allValid = false;
        }

        if (hasMin && hasMax && !hasPrice) {
          tempErrors[`${prefix}-price`] = "Price is required when Min & Max are filled";
          allValid = false;
        }

      } else {
        // 🔹 Type 0 → Only price is needed
        if (!hasPrice) {
          tempErrors[`${prefix}-price`] = "Charge is required";
          allValid = false;
        } else if (Number(row.price) < 0) {
          tempErrors[`${prefix}-price`] = "Charge must be ≥ 0";
          allValid = false;
        }
      }
    });

    // 🔹 Overlap and gap check (only for type=1)
    const type1Rows = rows.filter(r => {
      const t = data[key]?.find(i => String(i.id) === String(r.itemId))?.type;
      return t === 1 && r.min !== "" && r.max !== "";
    });

    if (type1Rows.length > 1) {
      const { overlapFound, gapFound, overlapIndexes, gapIndexes } =
        checkOverlapOrGapInCategory(type1Rows);

      if (overlapFound) {
        overlapIndexes.forEach((idx) => {
          const realIndex = rows.indexOf(type1Rows[idx]);
          tempErrors[`${key}-${realIndex}-min`] = "Overlapping ranges found";
        });
        allValid = false;
      }

      if (gapFound) {
        gapIndexes.forEach((idx) => {
          const realIndex = rows.indexOf(type1Rows[idx]);
          tempErrors[`${key}-${realIndex}-max`] = "Gap found before next range";
        });
        allValid = false;
      }
    }
  });

  setErrors(tempErrors);
  return allValid;
};



  // Build API payload on submit
  const buildApiPayload = () => {
  let payload = {};

  Object.keys(formValues).forEach(category => {
    const rows = formValues[category] || [];

    // Filter out empty rows (no min, max, or price)
    const filledRows = rows.filter(r =>
      (r.min !== "" && r.min !== undefined) ||
      (r.max !== "" && r.max !== undefined) ||
      (r.price !== "" && r.price !== undefined)
    );

    // Map only filled rows
    payload[category] = filledRows.map(r => ({
      typeid: r.itemId === "others" ? null : Number(r.itemId),
      min: r.min === "" || r.min === undefined ? null : Number(r.min),
      max: r.max === "" || r.max === undefined ? null : Number(r.max),
      price: r.price === "" || r.price === undefined ? null : Number(r.price),
      vat: r.includeVat ? 1 : 0,
    }));
  });

  return payload;
};


  // Submit handler
  const handleSubmit = () => {
    // Check at least one row filled per category
   const emptyCategories = Object.keys(formValues).filter(key => {
  const rows = formValues[key] || [];

  // A filled row means any of min, max, or price is entered
  const hasFilledRow = rows.some(r =>
    (r.min && r.min !== "") ||
    (r.max && r.max !== "") ||
    (r.price && r.price !== "")
  );

  return !hasFilledRow; // category is empty if no row is filled
});

if (emptyCategories.length > 0) {
  Swal.fire({
    icon: "warning",
    title: "Missing Data",
    text: `Please fill at least one row in: ${emptyCategories.join(", ")}`,
    confirmButtonColor: "#f59e0b",
  });
  return; // stop submit
}
    if (!validateAllRows()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please correct the highlighted fields before submitting.",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    const payload = buildApiPayload();
    updateQuotationData(payload);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your form was submitted successfully.",
      confirmButtonColor: "#16a34a",
    }).then(() => {
      router.push("/conveyancers/Notes/");
    });
  };

  const [legalcostrows, setLegalcostrows] = useState([Array(1),Array(1),Array(1),Array(1),Array(1)]);
  const [PurchasTransactionSupplementsrows, setPurchasTransactionSupplementsrows] = useState([Array(1)]);

  const handle_addrow=()=>{
    setLegalcostrows([...legalcostrows,Array(1)])
  }

  const handlesuplement=(e)=>{
console.log(e.target.value);
  }


  return (
    <div className="min-h-screen bg-white antialiased font   ">
      {/* Header */}
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

 


<main className="pt-10  w-auto  grid grid-cols-12  ">
  
  <div className=" bg-white shadow-md rounded-2xl p-8 border col-span-12  border-gray-100  ">
    <div className="mx-auto w-[1000px]">
      <nav className="text-[13px] text-[#6B7280] mb-5 flex items-center gap-4" aria-label="Breadcrumb">
            <span className="other-page hidden sm:inline">Home</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">Company registration</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="live-page hidden sm:inline">Price Breakdown</span>
                 
                </nav>
    {/* {Object.keys(data).map((category) => {
      if (!formValues[category]) return null;

      const hasType1 = data[category]?.some((item) => item.type === 1);

      return (
        <div
          key={category}
          className="border rounded-lg mb-6 shadow-sm overflow-hidden bg-white  p-5"
        >
        
          <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
            {category}
          </div>

          <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_0.6fr_0.8fr] items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
            <div>Type</div>
            <div className="text-center">Min €</div>
            <div className="text-center">Max €</div>
            <div className="text-center">Charge €</div>
            <div className="text-center">VAT</div>
            <div className="text-center">Action</div>
          </div>

         {formValues[category].map((row, ri) => {
  const matchedItem =
    row.itemId !== "others"
      ? data[category]?.find((i) => String(i.id) === row.itemId)
      : null;

  const itemType =
    matchedItem?.type ?? (row.itemId === "others" ? 1 : 0);

  const itemName = row.label ?? matchedItem?.name ?? "Unknown";

  const showAddButton =
    hasType1 && itemType === 1 && (ri + 1) % 5 === 0;

  return (
    <div key={ri}>
      <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.8fr_0.6fr_0.8fr] items-center text-sm
                      border-b border-gray-200 hover:bg-gray-50 transition-colors px-3 py-2">

        <div className="text-gray-700 text-sm truncate">
          {itemName.charAt(0).toUpperCase() + itemName.slice(1)}
        </div>

        <div className="flex justify-center">
          {itemType === 1 ? (
            <div className="flex flex-col items-center">
              <input
                type="number"
                placeholder="Min"
                value={row.min || ""}
                onChange={(e) =>
                  handleInputChange(category, ri, "min", e.target.value)
                }
                className={`border rounded px-1.5 py-0.5 w-30 text-sm text-center text-black bg-white ${
                  errors[`${category}-${ri}-min`]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors[`${category}-${ri}-min`] && (
                <span className="text-[10px] text-red-600 mt-0.5">
                  {errors[`${category}-${ri}-min`]}
                </span>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center">—</div>
          )}
        </div>

        <div className="flex justify-center">
          {itemType === 1 ? (
            <div className="flex flex-col items-center">
              <input
                type="number"
                placeholder="Max"
                value={row.max || ""}
                onChange={(e) =>
                  handleInputChange(category, ri, "max", e.target.value)
                }
                className={`border rounded px-1.5 py-0.5 w-30 text-sm text-center text-black bg-white ${
                  errors[`${category}-${ri}-max`]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors[`${category}-${ri}-max`] && (
                <span className="text-[10px] text-red-600 mt-0.5">
                  {errors[`${category}-${ri}-max`]}
                </span>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center">—</div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <input
              type="number"
              placeholder="Charge"
              value={row.price || ""}
              onChange={(e) =>
                handleInputChange(category, ri, "price", e.target.value)
              }
              className={`border rounded px-1.5 py-0.5 w-20 text-sm text-center text-black bg-white ${
                errors[`${category}-${ri}-price`]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors[`${category}-${ri}-price`] && (
              <span className="text-[10px] text-red-600 mt-0.5">
                {errors[`${category}-${ri}-price`]}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={row.includeVat}
            onChange={(e) =>
              handleInputChange(
                category,
                ri,
                "includeVat",
                e.target.checked
              )
            }
            className="w-4 h-4 accent-green-600"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="text-red-600 hover:text-red-800 text-sm hover:border-red-700 rounded px-2 py-0.5"
            onClick={() => handleDeleteRow(category, ri)}
          >
            <X className="w-4 h-4 text-black hover:text-red-700" />
          </button>
        </div>
      </div>

      {showAddButton && (
        <div className="flex justify-end mt-2 mb-3 pr-3">
          <select
            className="border border-green-300 py-1 px-2 rounded text-sm text-green-800"
            value={selectedItems[category] || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedItem = data[category].find(
                (i) => i.id === Number(selectedId)
              );
              if (selectedItem) handleAddRow(category, selectedItem);
            }}
          >
            <option value="">Add Row</option>
            {data[category]
              .filter((i) => i.type === 1)
              .map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
})}


        
        </div>
      );
    })} */}
  </div>

<div className="border rounded-lg mb-6 shadow-sm overflow-hidden bg-white p-5">
  <div>
 <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
    Legal Fees
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
    <div>Action</div>
  </div>

  {/* Input Row */}
    {legalcostrows.map((_, i) => (
  <div key={i} className="grid grid-cols-[0.5fr_0.5fr_0.5fr_0.6fr_0.6fr_0.6fr_0.2fr] items-center 
                  text-sm border-b border-gray-200 hover:bg-gray-50 transition-colors px-3 py-2 gap-3">

    <input type="number" placeholder="Min" className="border border-gray-400 rounded  py-0.5  text-sm text-center text-black bg-white"  />
    <input type="number" placeholder="Max" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <input type="number" placeholder="Purchase Leasehold" className="border  border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <input type="number" placeholder="Purchase Freehold" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <input type="number" placeholder="Sales Leasehold" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <input type="number" placeholder="Sales Freehold" className="border border-gray-400  rounded py-0.5 w-full text-sm text-center text-black" />
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

<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
Transaction Supplement Fees  </div>

<div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center 
                  text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Suplement Type €</div>
    <div className="text-center">Fee Amount €</div>
    <div className="text-center">Description </div>
    <div className="text-center">Action</div>

    
  </div>

 {PurchasTransactionSupplementsrows.map((_, i) => (
  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center 
                  text-sm border-b border-gray-200 hover:bg-gray-50 transition-colors px-3 py-2 gap-3">

<select name="purhcase_trans_suplement" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" onChange={handlesuplement}>
  <option>Select Suplement Type</option>
  <option>Leasehold Enfranchisement</option>
  <option>Shared Ownership</option>
  <option>Help to Buy</option>
  <option>others</option>
  </select>

    <input type="number" placeholder="Max" className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <input type="number" placeholder="Purchase Leasehold" className="border  border-gray-400 rounded py-0.5 w-full text-sm text-center text-black" />
    <button className="text-red-900 border-red-700">Remove</button>
 {
  i==PurchasTransactionSupplementsrows.length-1&&(
    <div className="flex justify-center mt-2 mb-3 pr-3">
       <button className="text-green-500 border-green-400" onClick={()=>{setPurchasTransactionSupplementsrows([...PurchasTransactionSupplementsrows,Array(1)]
)}}> <Plus
   /> </button>

    </div>
 
  )
 }
 
 </div>

))}

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
      onClick={handleSubmit}
      className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
    >
      Continue to Notes Section →
    </button>
  </div>
    </div>
  );
}
