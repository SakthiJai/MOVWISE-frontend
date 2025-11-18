"use client"
import Link from "next/link";
import Navbar from "../../parts/navbar/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { API_ENDPOINTS, getData, postData } from "../../auth/API/api";
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






let backend=[
  {
    "company_info": {}
  },
  {
    "price_breakdown": [
      {
        "1": [
          {
            "fee_category_id": 1,
            "fee_category_title": "Legal Fees",
            "fee_category_sub_title":"Standard Conveyancing Fees (Excluding VAT)",
            "min":100,
            "max":null,
            "purchasesalesehold":null,
            "salesLeasehold":null,
            "salesfreehold":null,
            "status":0,
          }
        ],
        "2":[
          {
 "fee_category_id": 2,
            "fee_category_title": "Transaction Supplement Fees",
            "fee_category_sub_title":"Purchase Transaction Supplements",
            "cost":null,
            "paidto":null,
            "discription":null,
            "typeid":null,
            "status":0,
          }
        ]
      }
    ]
  },
  {
    "notes": {}
  }
]

useEffect(() => {
  const legalFees = backend[1]?.price_breakdown?.[0]?.["1"] || [];

  const formatted = legalFees.map((item) => ({
    min: item.min ?? "",
    max: item.max ?? "",
    pLease: item.purchaseLeasehold ,
    pFree: item.purchasesalesehold ?? "",
    sLease: item.salesLeasehold ?? "",
    sFree: item.salesfreehold ?? "",
    remortgage: item.remortgage ?? "",
  }));

  // If no backend rows → keep one empty row
 
    setLegalcostrows(formatted);
  
}, []);




const handleSubmit = () => {
  const hasErrors = validateRows();

  if (hasErrors) {
    alert("Please fix validation issues before submitting.");
    return;
  }

  // ---------- ⭐ BUILD FINAL PAYLOAD ⭐ ----------
  const payload = {
    legal_fees: legalcostrows.map(r => ({
      min: Number(r.min),
      max: Number(r.max),
      purchase_leasehold: Number(r.PurchaseLeasehold),
      purchase_freehold: Number(r.PurchaseFreehold),
      sales_leasehold: Number(r.salesLeasehold),
      sales_freehold: Number(r.salesFreehold),
      remortgage: Number(r.remortgage)
    })),

    purchase_transaction_supplements: PurchasTransactionSupplementsrows.map(r => ({
      type: r.itemId === "others" ? "Others" : r.type,
      fee_amount: Number(r.feeAmount),
      description: r.description
    })),

    sales_transaction_supplements: SalesTransactionSupplementsrows.map(r => ({
      type: r.itemId === "others" ? "Others" : r.type,
      fee_amount: Number(r.feeAmount),
      description: r.description
    })),

    disbursements: disbursementRows.map(r => ({
      type: r.itemId === "others" ? "Others" : r.type,
      fee_cost: Number(r.feeCost),
      paid_to: r.paidTo,
      transaction_type: r.transactionType
    })),

    leasehold_fees: leaseholdRows.map(r => ({
      service: r.service,
      fee_type: r.feeType,
      amount: Number(r.amount),
      paid_to: r.paidTo
    })),
      additional_services: {
    indemnity_insurance_preparation: Number(indemnity),
    sdlt_lbtt_ltt_return: Number(sdltReturn),
    additional_legal_advice: Number(additionalAdvice)
  },
  Notes:notes,
  service_level_options: {
      expedited_service_fee: Number(serviceOptions.expedited_service_fee),
      weekend_appointment_fee: Number(serviceOptions.weekend_appointment_fee)
    }

  };

  // ----------- ⭐ Print Final Payload ----------
  console.log("FINAL PAYLOAD:", payload);
}

const [indemnity, setIndemnity] = useState("");
const [sdltReturn, setSdltReturn] = useState("");
const [additionalAdvice, setAdditionalAdvice] = useState("");


const [rowErrors, setRowErrors] = useState([]);     // errors for each row
const [rangeErrors, setRangeErrors] = useState([]); // gap / overlap errors

  // Dynamic Legal Cost Rows  
const [notes, setNotes] = useState("");

const [legalcostrows, setLegalcostrows] = useState([
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
    paidto:"",
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
const rErrors = {};
const gErrors = {};

  legalcostrows.forEach((row, i) => {
    const errors = {};

    // --- MIN (always required) ---
    if (row.min === "" || row.min === null || isNaN(row.min)) {
      errors.min = "Min is required";
    }

    // --- MAX (always required) ---
    if (row.max === "" || row.max === null || isNaN(row.max)) {
      errors.max = "Max is required";
    }

    // Range validation only if both present
    if (!errors.min && !errors.max) {
      if (Number(row.min) >= Number(row.max)) {
        errors.range = "Min must be less than Max";
      }
    }

    // Negative check
    if (row.min < 0 || row.max < 0) {
      errors.negative = "Values cannot be negative";
    }

    // --- OTHER FIELDS (Required only if visible) ---
    [
      "PurchaseLeasehold",
      "PurchaseFreehold",
      "salesLeasehold",
      "salesFreehold",
      "remortgage",
    ].forEach((field) => {
      if (fieldVisibility[field]) {
        if (!row[field] && row[field] !== 0) {
          errors[field] = `${field} is required`;
        }
      }
    });

    rErrors[i] = errors;
  });

  // --- GLOBAL RANGE VALIDATION ---
  const sorted = [...legalcostrows]
  .map((row, index) => ({ ...row, index }))
  .sort((a, b) => Number(a.min) - Number(b.min));

for (let i = 0; i < sorted.length - 1; i++) {
  const current = sorted[i];
  const next = sorted[i + 1];

  // Overlap
  if (Number(next.min) <= Number(current.max)) {
    gErrors[current.index] = gErrors[current.index] || [];
    gErrors[current.index].push(
      `Overlap with ${next.min} - ${next.max}`
    );
  }

  // Gap
  if (Number(next.min) > Number(current.max) + 1) {
    gErrors[current.index] = gErrors[current.index] || [];
    gErrors[current.index].push(
      `Gap between ${current.max} and ${next.min}`
    );
  }
}

setRowErrors(rErrors);
setRangeErrors(gErrors);
  console.log(rErrors)
  console.log(gErrors)

  // return TRUE if errors exist
const hasRowErrors = Object.values(rErrors).some(
  row => Object.keys(row).length > 0
);

const hasRangeErrors = Object.values(gErrors).length > 0;

return hasRowErrors || hasRangeErrors;
};

const fieldVisibility = {
  min: true,
  max: true,
  PurchaseLeasehold: true,
  PurchaseFreehold: true,   // hidden
  salesLeasehold: true,
  salesFreehold: true,
  remortgage:true,       // hidden
};


  
  const [dropdownothers, setDropdownothers] = useState(false);
  const [salesdropdownothers, setSalesdropdownothers] = useState(false);

const [serviceOptions, setServiceOptions] = useState({
  expedited_service_fee: "",
  weekend_appointment_fee: ""
});

 

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
  { value: "local-authority", label: "local-authority " },
  {value:"Land Registry",label:"Land Registry"}
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
<div className="
  grid grid-cols-8 gap-4 w-full 
   text-xs font-semibold text-gray-600 
  border-b bg-gray-100 px-3 py-2
">

    <div className="text-center">Min £</div>
    <div className="text-center">Max £</div>
    <div className="text-center">Purchase Leasehold £</div>
    <div className="text-center">Purchase Freehold £</div>
    <div className="text-center">Sales Leasehold £</div>
    <div className="text-center">Sales Freehold £</div>
    <div className="text-center">Remortgage</div>
    <div className="text-center">Action</div>
  </div>

  {/* Input Row */}
{legalcostrows.map((_, i) => (
  <div
    key={i}
    className="    grid grid-cols-8 gap-4 w-full 

      items-start  border-b border-gray-200 
      px-3 py-2
    "
  >

    {/* MIN */}
    <div className="flex flex-col">
      <input
        type="number"
        placeholder="Min"
        className="border border-gray-400 rounded py-0.5 text-sm text-center text-black bg-white"
        onChange={(e) => handleChange(i, "min", e.target.value)}
      />

      {rowErrors[i]?.min && (
        <span className="text-red-500 text-xs">{rowErrors[i].min}</span>
      )}
      {rowErrors[i]?.range && (
        <span className="text-red-500 text-xs">{rowErrors[i].range}</span>
      )}
      {rowErrors[i]?.negative && (
        <span className="text-red-500 text-xs">{rowErrors[i].negative}</span>
      )}
      {rangeErrors[i]?.map((msg, idx) => (
  <p key={idx} className="text-red-500 text-xs mt-1">{msg}</p>
))}
     
    </div>

    {/* MAX */}
    <div className="flex flex-col">
      <input
        type="number"
        placeholder="Max"
        className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
        onChange={(e) => handleChange(i, "max", e.target.value)}
      />

      {rowErrors[i]?.max && (
        <span className="text-red-500 text-xs">{rowErrors[i].max}</span>
      )}
      {rangeErrors[i]?.map((msg, idx) => (
  <p key={idx} className="text-red-500 text-xs mt-1">{msg}</p>
))}
    </div>

    {/* Purchase Leasehold */}
  {fieldVisibility.PurchaseLeasehold && (
  <div className="flex flex-col">
    <input
      type="number"
      placeholder="Purchase Leasehold"
      className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
      onChange={(e) => handleChange(i, "PurchaseLeasehold", e.target.value)}
    />
    {rowErrors[i]?.PurchaseLeasehold && (
      <span className="text-red-500 text-xs">{rowErrors[i].PurchaseLeasehold}</span>
    )}
  </div>
)}

    {/* Purchase Freehold */}
   
    {fieldVisibility.PurchaseFreehold && (
  <div className="flex flex-col">
    <input
      type="number"
        placeholder="Purchase Freehold "
      className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
        onChange={(e) => handleChange(i, "PurchaseFreehold", e.target.value)}
    />
    {rowErrors[i]?.PurchaseFreehold && (
      <span className="text-red-500 text-xs">{rowErrors[i].PurchaseFreehold}</span>
    )}
  </div>
)}

    {/* Sales Leasehold */}
    
        {fieldVisibility.salesLeasehold && (
 <div className="flex flex-col">
      <input
        type="number"
        placeholder="Sales Leasehold"
        className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
        onChange={(e) => handleChange(i, "salesLeasehold", e.target.value)}
      />
    {rowErrors[i]?.salesLeasehold && (
      <span className="text-red-500 text-xs">{rowErrors[i].salesLeasehold}</span>
    )}
  </div>
)}

    {/* Sales Freehold */}


          {fieldVisibility.salesFreehold && (
 <div className="flex flex-col">
      <input
        type="number"
        placeholder="Sales Freehold"
        className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
        onChange={(e) => handleChange(i, "salesFreehold", e.target.value)}
      />
    {rowErrors[i]?.salesFreehold && (
      <span className="text-red-500 text-xs">{rowErrors[i].salesFreehold}</span>
    )}
  </div>
)}
{fieldVisibility.remortgage && (
  <div className="flex flex-col">
    <input
      type="number"
      placeholder="Remortgage"
      className="border border-gray-400 rounded py-0.5 text-sm text-center text-black"
      onChange={(e) => handleChange(i, "remortgage", e.target.value)}
    />

    {rowErrors[i]?.remortgage && (
      <span className="text-red-500 text-xs">
        {rowErrors[i].remortgage}
      </span>
    )}
  </div>
)}


    {/* ADD BUTTON */}
    <div className="flex justify-center items-start pt-1">
      {i === legalcostrows.length - 1 && (
        <button className="text-green-500" onClick={handle_addrow}>
          <Plus />
        </button>
      )}
    </div>
  </div>
))}

  </div>
 

<div className="mt-10">

<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
Transaction Supplement Fees  </div>

<div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
Purchase Transaction Supplements
  </div>
<div className="grid  grid-cols-5 items-center 
                  text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Suplement Type £</div>
    <div className="text-center">Fee Amount £</div>
    <div className="text-center">Paid To</div>
    <div className="text-center">Description </div>
    <div className="text-center">Action</div>

    
  </div>

{PurchasTransactionSupplementsrows.map((row, i) => (
  <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">

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
      <div>
      <input
      id="suplement_type"
        type="text"
        placeholder="Enter other Supplement Type"
        value={row.type}
        onChange={(e) => handleFieldChange(i, "type", e.target.value,"purchase")}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
      />
      </div>
    )}

    {/* FEE AMOUNT */}
    <input
      
      placeholder="Fee Amount"
      value={row.feeAmount}
      onChange={(e) => handleFieldChange(i, "feeAmount", e.target.value,"purchase")}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
    />
     <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black  placeholder:text-gray-800"
        value={row.paidto}
        onChange={(e) => handleDisField(i, "paidto", e.target.value)}
      >
        <option value="" className="text-gray-900">Select Paid To</option>
        {paidToOptions.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-gray-900">
            {opt.label}
          </option>
        ))}
      </select>
    

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

    <div className="text-center">Suplement Type £</div>
    <div className="text-center">Fee Amount £</div>
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
      <div>
            <label htmlFor="suplement_type" className="text-black"> Others</label>

      <input
        type="text"
        placeholder="Enter Supplement Type"
        value={row.type}
        onChange={(e) => handleFieldChange(i, "type", e.target.value,"sales")}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black"
      />
      </div>
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

    <div className="text-center">Disbursement Type £</div>
    <div className="text-center">Fee Cost £</div>
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
        <div>
          <label className="text-black" >Others</label>
        <input
          type="text"
          placeholder="Enter Type"
          value={row.type}
          onChange={(e) => handleDisField(i, "type", e.target.value)}
          className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black placeholder:text-gray-900"
        />
        </div>
      )}

      {/* COST */}
      <input
        type="number"
        placeholder="Fee Cost"
        value={row.feeCost}
        onChange={(e) => handleDisField(i, "feeCost", e.target.value)}
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black placeholder:text-black"
      />

      {/* PAID TO */}
      <select
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black  placeholder:text-gray-800"
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
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-center text-black  placeholder:text-black"
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
      text-xs font-semibold text-black border-b bg-gray-100 px-3 py-2">

    <div className="text-center">Leasehold Service</div>
    <div className="text-center">Fee Type</div>
    <div className="text-center">Amount £</div>
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
  className="border p-2 rounded-md text-sm focus:ring-2 border-gray-400 outline-none focus:ring-black placeholder:text-black"
  placeholder="Enter amount"
  value={indemnity}
  onChange={(e) => setIndemnity(e.target.value)}
/>


      <p className="text-xs text-gray-900 mt-1">
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
  className="border p-2 rounded-md text-sm focus:ring-2 border-gray-400 outline-none focus:ring-black placeholder:text-black"
  placeholder="Enter amount"
  value={sdltReturn}
  onChange={(e) => setSdltReturn(e.target.value)}
/>


      <p className="text-xs text-gray-900 mt-1">
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
  className="border p-2 rounded-md text-sm focus:ring-2 border-gray-400 outline-none focus:ring-black placeholder:text-black"
  placeholder="Enter amount"
  value={additionalAdvice}
  onChange={(e) => setAdditionalAdvice(e.target.value)}
/>


      <p className="text-xs text-gray-900 mt-1">
        Tax return preparation fee
      </p>
    </div>

  </div>



 

</div>

<div className="mt-10">
  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
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
        value={serviceOptions.expedited_service_fee}
        onChange={(e) =>
          setServiceOptions({
            ...serviceOptions,
            expedited_service_fee: e.target.value
          })
        }
        className="border p-2 border-gray-400 placeholder:text-black rounded-md text-sm focus:ring-2 focus:ring-black outline-none"
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
        value={serviceOptions.weekend_appointment_fee}
        onChange={(e) =>
          setServiceOptions({
            ...serviceOptions,
            weekend_appointment_fee: e.target.value
          })
        }
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
  <textarea
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Type your message here..."
    className="min-h-[150px] w-full text-black p-2 outline-none rounded-md"
  ></textarea>
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
