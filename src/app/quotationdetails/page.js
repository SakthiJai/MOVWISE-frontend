"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Check, ListPlus, Plus, PlusCircle, Trash, Trash2, X } from "lucide-react";
import { MdAdd } from "react-icons/md";
import { set } from "react-hook-form";
import dynamic from "next/dynamic";
import Navbar from "../parts/navbar/page";
import { API_ENDPOINTS,postData,getData } from "../auth/API/api";
import { useFormStore } from "../store/useFormStore";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Quotationdetails() {
  const { updateQuotationData } = useFormStore();
  const router = useRouter();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
const [selectedItems, setSelectedItems] = useState({});
const [feeCategory, setfeeCategory] = useState({});
const [purchaseFeeTypeList, setpurchaseFeeTypeList] = useState({});
const [salesFeeTypeList, setsalesFeeTypeList] = useState({});
const [standardDisbursementList, setstandardDisbursementList] = useState({});
const [leaseholdDisbursementList, setleaseholdDisbursementList] = useState({});
const [additionalServiceList, setadditionalServiceList] = useState({});


let heading=[
{
1:{
        fee_category_id:1,
        title:"legalcost1",
        sub_title:"excluding vat1"
    },
    2:{
  fee_category_id:1,
        title:"legalcost2",
        sub_title:"excluding vat2"
    },
    3:{
          fee_category_id:3,
        title:"legalcost3",
        sub_title:"excluding vat3"
    },
      4:{
          fee_category_id:4,
        title:"legalcost4",
        sub_title:"excluding vat4"
    },
      5:{
          fee_category_id:5,
        title:"legalcost5",
        sub_title:"excluding vat5"
    }
   } 
]
const [headings, setHeadings] = useState([]);
useEffect(() => {
    console.log("sdsdsd");
  //const result = Object.values(heading);
  setHeadings(heading);
 // console.log(result)
}, []); // empty array = run once
useEffect(() => { 
    async function fetchData() {
      try {
        const res =await getData(API_ENDPOINTS.feecatgory);
       
        console.log(res.data)
        setfeeCategory(res.data)
        // console.log(feeCategory)
      } catch (err) {
        console.log("Error:", err);
      }
    }

    fetchData();
  }, []);
  useEffect(() => { 
    async function fetchData() {
      try {
        const res =await getData(API_ENDPOINTS.feetype+"/2");
       
        console.log(res.purchase)
        setpurchaseFeeTypeList(res.purchase??[]);
        setsalesFeeTypeList(res.sales??[]);
        setstandardDisbursementList(res.standard_disbursement??[]);
        setleaseholdDisbursementList(res.leasehold_disbursement??[]);
        setadditionalServiceList(res.additional_service??[]);
       
        // console.log(feeCategory)
      } catch (err) {
        console.log("Error:", err);
      }
    }

    fetchData();
  }, []);
 const handlePoundChange = (e) => {
    // Check if input has class "poundtransform"
    if (!e.target.classList.contains("poundtransform")) return;

    const name = e.target.name;

    // Remove non-numeric characters except dot
    const rawValue = e.target.value.replace(/[^\d.]/g, "");
    const numberValue = parseFloat(rawValue);

    let formatted = "";
    if (!isNaN(numberValue)) {
      formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
      }).format(numberValue);
    }

    /*setValues({
      ...values,
      [name]: formatted,
    });*/
  };
let backend = [
{
  "company_details": {
    "company_name": "ABC Legal Ltd",
    "logo": "base64string",
    "phone_number": "9876543210",
    "email": "info@abc.com",
    "website": "www.abc.com",
    "languages": [1, 2]
  },
  "notes": "This is a sample note for testing.",
  "pricing":[ {
    "1": [
      {
        "fees_category_id": 1,
        "fees_category_title":"legalcost",
        "fees_category_subtitle":"Standard Conveyancing Fees (Excluding VAT)",
        "price_id": null,
        "price_list": [
          {
            "min": 100,
            "max": 200,
            "purchase_leasehold": 150,
            "purchase_freehold": 180,
            "sales_leasehold": 120,
            "sales_freehold": 140,
            "remortgage": 160
          }
        ]
      }
    ],
    "2": [
      {
        "fees_category_id": 2,
        "fees_category_title1":"Transaction Supplement Fees",
        "fees_category_subtitle1":"Purchase Transaction Supplements",
        "fees_category_subtitle1":"sales Transaction Supplements",
        "type_id": 1,
        "price_list": [
          {
            "fee_amount": 50,
            "paid_to": "Lawyer",
            "description": "Purchase fee"
          }
        ]
      }
    ],
      "3": [
      {
        "fees_category_id": 2,
        "fees_category_title1":"Transaction Supplement Fees",
        "fees_category_subtitle1":"Purchase Transaction Supplements",
        "type_id": 1,
        "price_list": [
          {
            "fee_amount": 50,
            "paid_to": "Lawyer",
            "description": "Purchase fee"
          }
        ]
      }
    ],
       "4": [
      {
        "fees_category_id": 2,
        "fees_category_title1":"Transaction Supplement Fees",
        "fees_category_subtitle1":"Purchase Transaction Supplements",
        "type_id": 1,
        "price_list": [
          {
            "fee_amount": 50,
            "paid_to": "Lawyer",
            "description": "Purchase fee"
          }
        ]
      }
    ],
    "5": [
      {
        "fees_category_id": 5,
        "type_id": 40,
        "price_list": [
          {
            "fee_amount": 75,
            "paid_to": "Notary",
            "description": "Sales fee"
          }
        ]
      }
    ]
  }]
}

]
const [pricing,setpricing]=useState()
async function getdropdown() {
  let id={
        "service_ids":[2,3]
  }
  const data = await postData(API_ENDPOINTS.partnerfilter,id);
  const purchasedata = data?.data?.fees_category?.[0]?.Purchase;
  const salesdata = data?.data?.fees_category?.[1]?.Sales;
  

const transactionSupplements = purchasedata?.["Transaction Supplement Fees"];
const transsalessupplements = salesdata?.["Transaction Supplement Fees"];
const disbursementdropdown = purchasedata?.["Standard Disbursements"];
const lesehold_specific_fee = purchasedata?.["Leasehold Specific Fees & Disbursements"];

const feeTypes = transactionSupplements.map(item => item.fee_type);
const saletranstype = transsalessupplements.map(item=> item.fee_type);
const disbursementtype = disbursementdropdown.map(item=> item.fee_type);
const lesehold_specific_type= lesehold_specific_fee.map(item=>item.fee_type);





  
  setsuplementOptions(feeTypes)
  setsalessuplementOptions(saletranstype);
  setdisbursementOptions(disbursementtype);
  setfeeTypeOptions(lesehold_specific_type);
  
}  

useEffect(() => {
//   getdropdown();
  const pricing = backend?.[0]?.pricing?.[0];
  const pricingcheck = backend?.[0]?.pricing?.[0] || {};
  setpricing(pricingcheck);

// console.log(pricingcheck)

//   console.log("📌 FULL Pricing Object:", pricing);

//   Object.keys(pricing).forEach((categoryKey) => {
//     console.log("➡️ Category Key:", categoryKey);

//     const categoryArray = pricing[categoryKey];
//     console.log("   Category Array:", categoryArray);

//     // 2️⃣ Loop inside array (each contains price_list)
//     categoryArray.forEach((item, index) => {
//       console.log(`   ▶ Item ${index}:`, item);

//       const priceList = item.price_list;
//       console.log("     🔸 price_list:", priceList);

//       // 3️⃣ Loop through price_list items
//       priceList.forEach((p, idx) => {
//         console.log(`       🔹 Price Item ${idx}:`, p);
//       });

//     });

//   });

}, []);



const [selectedFee, setSelectedFee] = useState("");
const [feeAmount, setFeeAmount] = useState("");


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
  feeAmount: feeAmount,
  selectedFee: selectedFee,
  },
  Notes:notes,
  service_level_options: {
      expedited_service_fee: Number(serviceOptions.expedited_service_fee),
      weekend_appointment_fee: Number(serviceOptions.weekend_appointment_fee)
    }

  };

  // ----------- ⭐ Print Final Payload ----------
  console.log("FINAL PAYLOAD:", payload);
  router.push("/conveyancers/Notes/");
}

const [indemnity, setIndemnity] = useState("");
const [sdltReturn, setSdltReturn] = useState("");
const [additionalAdvice, setAdditionalAdvice] = useState("");


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
    paidto:"",
  }
]);

const [SalesTransactionSupplementsrows, setSalesTransactionSupplementsrows] = useState([
  {
    isOthers: false,  
    type: "",
    feeAmount: "",
    description: "",
    paidto:""
  }
]);
const validateRows = () => {
const rErrors = {};
const gErrors = {};
console.log(legalcostrows)

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
    // if(row.pFree===""||row.pFree===null||isNaN(row.pFree)){
    //   errors.pFree = "PurchaseFreehold is required";

    // }
    //   if(row.pLease===""||row.pLease===null||isNaN(row.pLease)){
    //   errors.pLease = "PurchaseLeasehold is required";

    // }
    //   if(row.sLease===""||row.sLease===null||isNaN(row.sLease)){
    //   errors.sLease = "salesLeasehold is required";

    // }
    //   if(row.sFree===""||row.sFree===null||isNaN(row.sFree)){
    //   errors.sFree = "salesFreehold is required";

    // }

    // Range validation only if both present
    if (!errors.min && !errors.max) {
      if (Number(row.min) >= Number(row.max)) {
        errors.range = "Min must be less than Max";
      }
    }

    // Negative check
    if (row.min < 0 || row.max < 0||row.pFree||row.sFree||row.sLease||row.sFree) {
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
 
  Purchase: true,
  Sales: true,
  
  Remortgage:true,       // hidden
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
  
])

let [salessupplementOptions,setsalessuplementOptions] =useState( [
  
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
const [disbursementOptions,setdisbursementOptions] =useState()


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

const [feeTypeOptions,setfeeTypeOptions] =useState()

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
 {Object.entries(feeCategory).map(([index, value]) => {
            // the actual object inside
     const item = value[0];
    const numIndex = Number(index);
   return (
     <>
         {numIndex === 1 && (
            <div key={numIndex} className="  feecatgoryblock mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                ))}
            <div className="grid grid-cols-8 gap-4 w-full text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                <div className="text-center">Min £</div>
                <div className="text-center">Max £</div>
                {fieldVisibility.Purchase && (
                <div className="text-center">Purchase Leasehold £</div>
                )}
                    {fieldVisibility.Purchase && (

                <div className="text-center">Purchase Freehold £</div>
                )}

                        {fieldVisibility.Sales && (

                <div className="text-center">Sales Leasehold £</div>
                        )}
                        {fieldVisibility.Sales &&(
                <div className="text-center">Sales Freehold £</div>

                        )

                        }
                        {fieldVisibility.Remortgage &&(
                <div className="text-center">Remortgage</div>
                        )}
                <div className="text-center">Action</div>
            </div>

        
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
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black bg-white"
                    onChange={(e) =>{handlePoundChange(e), handleChange(i, "min", e.target.value)}}
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
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) =>{handlePoundChange(e), handleChange(i, "max", e.target.value)}}
                />

                {rowErrors[i]?.max && (
                    <span className="text-red-500 text-xs">{rowErrors[i].max}</span>
                )}
                {rangeErrors[i]?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-xs mt-1">{msg}</p>
            ))}
                </div>

                {/* Purchase Leasehold */}
            
            <div className="flex flex-col">
                <input
                type="number"
                value={legalcostrows.pLease}
                placeholder="Purchase Leasehold"  
                className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                onChange={(e) => {handlePoundChange(e),handleChange(i, "PurchaseLeasehold", e.target.value)}}
                />
                {rowErrors[i]?.PurchaseLeasehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].PurchaseLeasehold}</span>
                )}
            </div>


                {/* Purchase Freehold */}
            
                {fieldVisibility.Purchase && (
            <div className="flex flex-col">
                <input
                type="number"
                    placeholder="Purchase Freehold "  
                className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) => {handlePoundChange(e),handleChange(i, "PurchaseFreehold", e.target.value)}}
                />
                {rowErrors[i]?.PurchaseFreehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].PurchaseFreehold}</span>
                )}
            </div>
            )}

                {/* Sales Leasehold */}
                
                    {fieldVisibility.Sales && (
            <div className="flex flex-col">
                <input
                    type="number"
                    placeholder="Sales Leasehold"  
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) =>{handlePoundChange(e), handleChange(i, "salesLeasehold", e.target.value)}}
                />
                {rowErrors[i]?.salesLeasehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].salesLeasehold}</span>
                )}
            </div>
            )}

                {/* Sales Freehold */}


                    {fieldVisibility.Sales && (
            <div className="flex flex-col">
                <input
                    type="number"
                    placeholder="Sales Freehold" 
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) =>  {handlePoundChange(e),handleChange(i, "salesFreehold", e.target.value)}}
                />
                {rowErrors[i]?.salesFreehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].salesFreehold}</span>
                )}
            </div>

            )}
            {fieldVisibility.Remortgage && (
            <div className="flex flex-col">
                <input
                type="number"
                placeholder="Remortgage"  
                className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                onChange={(e) =>{handlePoundChange(e), handleChange(i, "remortgage", e.target.value)}}
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
                    <button className="text-green-500 tooltip" onClick={handle_addrow}>
                    <Plus />
                            <span className="tooltiptext font">Add new row</span>

                    </button>
                )}
                </div>
            </div>
            ))}

            </div>
          )}
         
          {numIndex === 2 && (   
            <div className="transactionblock mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                        <div className="grid  grid-cols-4 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                            <div className="text-center">Suplement Type £</div>
                            <div className="text-center">Fee Amount £</div>
                            <div className="text-center">Description </div>
                            <div className="text-center">Action</div>
                        </div>
                        {PurchasTransactionSupplementsrows.map((row, i) => 
(
  <div key={i} className="grid grid-cols-4 gap-3 px-3 py-2">

   
    {!row.isOthers ? (
     <select
  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
  onChange={(e) => handlesuplement(e, i)}
  value={row.type}
>
  <option value="">Select Supplement Type</option>

 {purchaseFeeTypeList.map((opt,index) => (

    <option key={opt.id} value={opt.id}>
      {opt.fee_type}
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
        className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
      />
      </div>
    )}

    {/* FEE AMOUNT */}
    <input
      
      placeholder="Fee Amount"
      value={row.feeAmount}
      onChange={(e) => handleFieldChange(i, "feeAmount", e.target.value,"purchase")}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
    />
    
    

    {/* DESCRIPTION */}
    <input
      type="text"
      placeholder="Description"
      value={row.description}
      onChange={(e) => handleFieldChange(i, "description", e.target.value,"purchase"  )}
      className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
    />

    {/* REMOVE BUTTON */}
    
    {/* ADD Row Button */}
    <div className="flex justify-center gap-4">   
       {i === PurchasTransactionSupplementsrows.length - 1 && (
      <button
        className="text-green-500 tooltip"
        onClick={() =>
          setPurchasTransactionSupplementsrows([
            ...PurchasTransactionSupplementsrows,
            { isOthers: false, type: "", feeAmount: "", description: "",paidto:"" }
          ])
        }
      >
        <Plus />
                  <span className="tooltiptext font">Add new row</span>
      </button>
    )}

    <button
      className="text-red-600 tooltip"
      onClick={() => {
        const updated = PurchasTransactionSupplementsrows.filter((_, idx) => idx !== i);
        setPurchasTransactionSupplementsrows(updated);

      }}
    >
      <X />
      <span className="tooltiptext"> Delete current row</span>
    </button>

    </div>
   
  </div>
)

)}
                    </div>
                ))}
               
            </div>
          )}
          {numIndex === 3 && (   
            <div className="standarddisblock mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Disbursement Type £</div>
                            <div className="text-center">Fee Cost £</div>
                            <div className="text-center">Paid To</div>
                            <div className="text-center">Transaction Type</div>
                            <div className="text-center">Action</div>

                    </div>
                     {disbursementRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                        {!row.isOthers ? (
                            <select
                            className="border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                            onChange={(e) => handleDisbursementChange(e, i)}
                            value={row.type}
                            >
                            <option value="">Select Disbursement</option>
                            {(salesFeeTypeList || []).map((opt,index) => (
                                <option key={opt.id} value={opt.id}>
                                {opt.fee_type}
                                </option>
                            ))}
                            </select>
                        ) : (
                            <div>
                            <input
                            type="text"
                            placeholder="Enter other suplement"
                            value={row.type}
                            onChange={(e) => handleDisField(i, "type", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                            />
                            </div>
                        )}

                            {/* COST */}
                            <input
                            type="number"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                            onChange={(e) => handleDisField(i, "feeCost", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />

                            {/* PAID TO */}
                            <select
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-gray-800"
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
                                className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-black"
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
                                        className="text-green-600 tooltip"
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
                                                        <span className="tooltiptext font">Add new row</span>

                                    </button>
                                    )}

                                    {/* REMOVE */}
                                    <button
                                    className="text-red-600 tooltip"
                                    onClick={() => {
                                        const updated = disbursementRows.filter(
                                        (_, idx) => idx !== i
                                        );
                                        setDisbursementRows(updated);
                                    }}
                                    >
                                    <X />
                                            <span className="tooltiptext"> Delete current row</span>

                                    </button>
                                </div>
                            </div>
  ))}
                
                    </div>
                ))}
               
            </div>
          )}
          {numIndex === 4 && (   
            <div class="standarddisblock mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Leasehold Service</div>
                            <div className="text-center">Fee Type</div>
                            <div className="text-center">Amount £</div>
                            <div className="text-center">Paid To</div>
                            <div className="text-center">Action</div>

                    </div>
                     {disbursementRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                        {!row.isOthers ? (
                            <select
                            className="border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                            onChange={(e) => handleDisbursementChange(e, i)}
                            value={row.type}
                            >
                            <option value="">Select Disbursement</option>
                            {(standardDisbursementList || []).map((opt,index) => (
                                <option key={opt.id} value={opt.id}>
                                {opt.fee_type}
                                </option>
                            ))}
                            </select>
                        ) : (
                            <div>
                            <input
                            type="text"
                            placeholder="Enter other suplement"
                            value={row.type}
                            onChange={(e) => handleDisField(i, "type", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                            />
                            </div>
                        )}

                            {/* COST */}
                            <input
                            type="number"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                            onChange={(e) => handleDisField(i, "feeCost", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />

                            {/* PAID TO */}
                            <select
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-gray-800"
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
                                className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-black"
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
                                        className="text-green-600 tooltip"
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
                                                        <span className="tooltiptext font">Add new row</span>

                                    </button>
                                    )}

                                    {/* REMOVE */}
                                    <button
                                    className="text-red-600 tooltip"
                                    onClick={() => {
                                        const updated = disbursementRows.filter(
                                        (_, idx) => idx !== i
                                        );
                                        setDisbursementRows(updated);
                                    }}
                                    >
                                    <X />
                                            <span className="tooltiptext"> Delete current row</span>

                                    </button>
                                </div>
                            </div>
  ))}
                
                    </div>
                ))}
               
            </div>
          )}   
          {numIndex === 5 && (   
            <div class="addtional mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                
                    <div>
                    
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Select Service</div>
                            
                            <div className="text-center">Amount £</div>
                           
                            <div className="text-center">Action</div>

                    </div>
                     {disbursementRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                       
                            <select
                            className="border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                            onChange={(e) => handleDisbursementChange(e, i)}
                            value={row.type}
                            >
                            <option value="">Select Addtional Service</option>
                            {(additionalServiceList || []).map((opt,index) => (
                                <option key={opt.id} value={opt.id}>
                                {opt.fee_type}
                                </option>
                            ))}
                            </select>
                        

                            {/* COST */}
                            <input
                            type="number"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                            onChange={(e) => handleDisField(i, "feeCost", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />


                                {/* ACTION BUTTONS */}
                                <div className="flex justify-center gap-4">
                                    {/* ADD ROW – only last row */}
                                    {i === disbursementRows.length - 1 && (
                                    <button
                                        className="text-green-600 tooltip"
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
                                                        <span className="tooltiptext font">Add new row</span>

                                    </button>
                                    )}

                                    {/* REMOVE */}
                                    <button
                                    className="text-red-600 tooltip"
                                    onClick={() => {
                                        const updated = disbursementRows.filter(
                                        (_, idx) => idx !== i
                                        );
                                        setDisbursementRows(updated);
                                    }}
                                    >
                                    <X />
                                            <span className="tooltiptext"> Delete current row</span>

                                    </button>
                                </div>
                            </div>
                    ))}
                
                    </div>
                )
               
            </div>
          )}                     
      </>  
        
    )
    
    })
  }
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
