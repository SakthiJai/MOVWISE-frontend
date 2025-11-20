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
const [purchaseFeeTypeList, setpurchaseFeeTypeList] = useState([]);
const [salesFeeTypeList, setsalesFeeTypeList] = useState([]);
const [standardDisbursementList, setstandardDisbursementList] = useState([]);
const [leaseholdDisbursementList, setleaseholdDisbursementList] = useState([]);
const [additionalServiceList, setadditionalServiceList] = useState([]);
const [pricingList, setpricingList] = useState([]);
const [legalFeesError, setlegalFeesError] = useState([]);
const [transactionFeesError, settransactionFeesError] = useState([]);
const [disbursementFeesError, setdisbursementFeesError] = useState([]);
const [leasedisbursementFeesError, setleasedisbursementFeesError] = useState([]);
const [additionalServiceError, setadditionalServiceError] = useState([]);
const [headings, setHeadings] = useState([]);
const [formData, setformData] = useState({});

useEffect(()=>{
  const storedData = JSON.parse(localStorage.getItem("companyData"));
  
  if (storedData) {
    setformData(storedData);
    console.log(formData)
  }
 },[]);

useEffect(() => {
    // Define async function inside useEffect
    const fetchData = async () => { console.log("121212");
      try {
       // setLoading(true);

        // Call both APIs in parallel
        const [response1, response2,response3] = await Promise.all([
          getData(API_ENDPOINTS.feecatgory),
          getData(API_ENDPOINTS.feetype+"/2"),
          getData(API_ENDPOINTS.pricing),
        ]);
        const storedData = JSON.parse(localStorage.getItem("companyData"));
        response1.data[2][0]['sub_categories']=[];
        if(storedData['service_id']?.indexOf(1) !== -1 || storedData['service_id']?.indexOf(3) !== -1)
        {
           response1.data[2][0]['sub_categories'].push({"sub_category" : "Purchase Transaction Supplements"})
        }
        else if(storedData['service_id']?.indexOf(2) !== -1 || storedData['service_id']?.indexOf(3) !== -1)
        {
          response1.data[2][0]['sub_categories'].push({"sub_category" : "Sales Transaction Supplements"})
        }
        console.log(response1.data[2][0]['sub_categories'])
        setfeeCategory(response1.data)
        setpurchaseFeeTypeList(response2.purchase??[]);
        setsalesFeeTypeList(response2.sales??[]);
        setstandardDisbursementList(response2.standard_disbursement??[]);
        setleaseholdDisbursementList(response2.leasehold_disbursement??[]);
        setadditionalServiceList(response2.additional_service??[]);
        setpricingList(response3.pricing??[])
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

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




const [selectedFee, setSelectedFee] = useState("");
const [feeAmount, setFeeAmount] = useState("");


const handleSubmit = () => {
  console.log(pricingList);
  setlegalFeesError([]);
  const hasErrors = validatePriceList(pricingList);

  if (hasErrors==false) {
    alert("Please fix validation issues before submitting.");
    return;
  }

 
  router.push("/conveyancers/Notes/");
}
const regipage =()=>{
  router.push("/conveyancers/Companyregistration/");
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
  
  const handle_addrow = (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list, {   "id": null,  "min": null, "max": null, "purchase_leasehold": null, "purchase_freehold": null,
      "sales_leasehold": null,"sales_freehold": null, "remortgage": null, "is_delete": null, "status": null
  }] }
          : item
      )
    );

};
  const handle_transaction_sales= (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list, {"type_id": "",  "fee_amount": "","paid_to": "","description": "","is_delete": "","status": ""
}] }
          : item
      )
    );

};
  const handle_transaction_purchase= (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list,  {"type_id": "",  "fee_amount": "","paid_to": "","description": "","is_delete": "","status": ""
}] }
          : item
      )
    );

};
const handle_standard_disbursement= (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list,  {"type_id": "",  "fee_amount": "","paid_to": "","description": "","is_delete": "","status": ""
}] }
          : item
      )
    );
    console.log(pricingList)

};
const handle_leasehold_disbursement= (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list,  {"type_id": "",  "fee_amount": "","paid_to": "","description": "","is_delete": "","status": ""
}] }
          : item
      )
    );

};
const handle_additional_service= (index) => {

    setpricingList(prev =>
      prev.map(item =>
        item.fees_category_id === index
          ? { ...item, price_list: [...item.price_list,  {"type_id": "",  "fee_amount": "","paid_to": "","description": "","is_delete": "","status": ""
}] }
          : item
      )
    );

};
const handlePriceChange = (feesCategoryId, rowIndex, field, value) => {
  //const numericValue = value.replace(/[^\d.]/g, "");
  setpricingList(prev =>
    prev.map(item =>
      item.fees_category_id === feesCategoryId
        ? {
            ...item,
            price_list: item.price_list.map((row, i) =>
              i === rowIndex
                ? { ...row, [field]: value }  // update field dynamically
                : row
            )
          }
        : item
    )
  );
  console.log(pricingList)
};

const handleChange = (index, field, value) => {
  const updated = [...legalcostrows];
  updated[index][field] = value;
  setLegalcostrows(updated);
};

const validatePriceList = (list) => { console.log('',list);
  let errors=[];
  for (let i = 0; i < list.length; i++) { 
    if(list[i]['fees_category_id']==1)
    {
        for(let j=0;j<list[i]['price_list'].length;j++)
          {
          const { min, max } = list[i].price_list[j];

          if ((min !== null && min !== "") && (max === null || max === "")) {
            errors.push(`Row ${i + 1}: max value is required when min is present`);
            break;
          }
          // Skip rows if min or max is missing (both empty)
          if ((min === null || min === "") && (max === null || max === "")) continue;

          // 2️⃣ Current row min < max
          if (Number(min) >= Number(max)) {
            errors.push(`Row ${i + 1}: min (${min}) should be less than max (${max})`);
            break;
          }
          // 3️⃣ Min should be >= previous row's max (if not first row)
          if (i > 0) {
            const prevMax = list[i - 1].max;
            if (prevMax !== null && prevMax !== "" && Number(min) < Number(prevMax)) {
              errors.push(`Row ${i + 1}: min (${min}) should be greater than or equal to previous row's max (${prevMax})`);
              break;
            }
          }
        }
        if(errors.length>0)
        {
          setlegalFeesError(errors);
          return false;
        }
    }
    else if(list[i]['fees_category_id']==2)
    {
       let terror=[];
          for(let j=0;j<list[i]['price_list'].length;j++)
          {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id!='' && Number(fee_amount)<=0) {
           
            terror.push(`Row ${i + 1}: Fee amount is missing`);
            //return false;
            break;
          }
           
          }
           if(terror.length>0)
          {
            settransactionFeesError(terror);
            return false;
          }
    }
      else if(list[i]['fees_category_id']==3)
    {
       let terror3=[];
          for(let j=0;j<list[i]['price_list'].length;j++)
          {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id!='' && Number(fee_amount)<=0) {
           
            terror3.push(`Row ${i + 1}: Fee amount is missing`);
            //return false;
            break;
          }
           
          }
           if(terror3.length>0)
          {
            setdisbursementFeesError(terror3);
            return false;
          }
    }
    else if(list[i]['fees_category_id']==4)
    {
       let terror4=[];
          for(let j=0;j<list[i]['price_list'].length;j++)
          {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id!='' && Number(fee_amount)<=0) {
           
            terror4.push(`Row ${i + 1}: Fee amount is missing`);
            //return false;
            break;
          }
           
          }
           if(terror4.length>0)
          {
            setleasedisbursementFeesError(terror4);
            return false;
          }
    }
    else if(list[i]['fees_category_id']==5)
    {
       let terror5=[];
          for(let j=0;j<list[i]['price_list'].length;j++)
          {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id!='' && Number(fee_amount)<=0) {
           
            terror.push(`Row ${i + 1}: Fee amount is missing`);
            //return false;
            break;
          }
           
          }
           if(terror5.length>0)
          {
            setadditionalServiceError(terror5);
            return false;
          }
    }

    

}

  return true;
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
const formatPound = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(value);
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
                 <a  href="" onClick={regipage}>  <span className="other-page  sm:inline"  >Company registration</span></a>
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
     <div key={numIndex} > 
         {numIndex === 1 && (
            <div key={numIndex} className="  feecatgoryblock mb-5">
                <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div key={i} className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                ))}
                {legalFeesError && <p style={{ color: "red" }}>{legalFeesError}</p>}
            <div className="grid grid-cols-9 gap-4 w-full text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                <div className="flex justify-center items-center col-span-1">S.no</div>
                <div className="text-center">Min £</div>
                <div className="text-center">Max £{formData['service_id'] }</div>
               
               {(formData['service_id']?.indexOf(1) !== -1 || formData['service_id']?.indexOf(3) !== -1) && (
                  <div className="text-center">Purchase Leasehold £</div>
                )}
                {(formData['service_id']?.indexOf(1) !== -1 || formData['service_id']?.indexOf(3) !== -1)&& (
                <div className="text-center">Purchase Freehold £</div>
                )}

                       
                 {(formData['service_id']?.indexOf(2) !== -1 || formData['service_id']?.indexOf(3) !== -1) && (
                <div className="text-center">Sales Leasehold £</div>
                 )}   
                   {(formData['service_id']?.indexOf(2) !== -1 || formData['service_id']?.indexOf(3) !== -1)&& (     
                <div className="text-center">Sales Freehold £</div>
                   )}
                       
                   {formData['service_id']?.indexOf(4) !== -1 && (      
                  <div className="text-center">Remortgage</div>
                   )}

                <div className="text-center">Action</div>
            </div>

        
            {
            
            pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
            <div key={i} className="grid grid-cols-9 gap-4 w-full items-start border-b border-gray-200  px-3 py-2">

               <div className="flex justify-center items-center col-span-1">{i+1}</div>
                <div className="flex flex-col">
                <input type="text" placeholder="Min" value={row.min} className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black bg-white"
                    onChange={(e) => handlePriceChange(numIndex, i, "min", e.target.value)}/>

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
                <input type="text" placeholder="Max"  className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) => handlePriceChange(numIndex, i, "max", e.target.value)}
                />

                {rowErrors[i]?.max && (
                    <span className="text-red-500 text-xs">{rowErrors[i].max}</span>
                )}
                {rangeErrors[i]?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-xs mt-1">{msg}</p>
            ))}
                </div>

                {/* Purchase Leasehold */}
            {(formData['service_id']?.indexOf(1) !== -1 || formData['service_id']?.indexOf(3) !== -1)&& (
            <div className="flex flex-col">
                <input type="text" value={legalcostrows.pLease}  placeholder="Purchase Leasehold"  
                className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                onChange={(e) => handlePriceChange(numIndex, i, "purchase_leasehold", e.target.value)}
                />
                {rowErrors[i]?.PurchaseLeasehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].PurchaseLeasehold}</span>
                )}
            </div>
            )}


                
            
          {(formData['service_id']?.indexOf(1) !== -1 || formData['service_id']?.indexOf(3) !== -1) && (      
            <div className="flex flex-col">
                <input type="text" placeholder="Purchase Freehold " className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) => handlePriceChange(numIndex, i, "purchase_freehold", e.target.value)}
                />
                {rowErrors[i]?.PurchaseFreehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].PurchaseFreehold}</span>
                )}
            </div>
          )}

                {/* Sales Leasehold */}
                
            {(formData['service_id']?.indexOf(2) !== -1 || formData['service_id']?.indexOf(3) !== -1)&& (        
            <div className="flex flex-col">
                <input   type="text"  placeholder="Sales Leasehold"  
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) => handlePriceChange(numIndex, i, "sales_leasehold", e.target.value)}
                />
                {rowErrors[i]?.salesLeasehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].salesLeasehold}</span>
                )}
            </div>
            )}
            {(formData['service_id']?.indexOf(2) !== -1 || formData['service_id']?.indexOf(3) !== -1) && ( 
            <div className="flex flex-col">
                <input  type="text" placeholder="Sales Freehold" 
                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                    onChange={(e) => handlePriceChange(numIndex, i, "sales_freehold", e.target.value)}
                />
                {rowErrors[i]?.salesFreehold && (
                <span className="text-red-500 text-xs">{rowErrors[i].salesFreehold}</span>
                )}
            </div>
            )}

           
            {formData['service_id'].indexOf(4) !== -1 && ( 
            <div className="flex flex-col">
                <input type="text" placeholder="Remortgage" className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-left text-black"
                onChange={(e) => handlePriceChange(numIndex, i, "remortgage", e.target.value)}
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
               
                    <button className="text-green-500 tooltip" onClick={() => handle_addrow(numIndex)}>
                    <Plus />
                            <span className="tooltiptext font">Add new row</span>

                    </button>
               
                </div>
            </div>
            ))}

            </div>
          )}
         
          {numIndex === 2 && (   
            <div className="transactionblock mb-5">
                <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div key={i}>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                    {transactionFeesError && <p style={{ color: "red" }}>{transactionFeesError}</p>}
                        <div className="grid  grid-cols-4 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                            <div className="text-center">Suplement Type £</div>
                            <div className="text-center">Fee Amount £</div>
                            <div className="text-center">Description </div>
                            <div className="text-center">Action</div>
                        </div>
                        { pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => 
                        (
                          <div key={i} className="grid grid-cols-4 gap-3 px-3 py-2">

                          
                            {!row.isOthers ? (
                            <select className="border poundtransform border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                             onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
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
                                onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
                                className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                              />
                              </div>
                            )}

                            {/* FEE AMOUNT */}
                            <input
                              
                              placeholder="Fee Amount"
                              value={row.feeAmount}
                               onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                              className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                            />
                            
                            

                            {/* DESCRIPTION */}
                            <input
                              type="text"
                              placeholder="Description"
                              value={row.description}
                              onChange={(e) => handlePriceChange(numIndex, i, "description", e.target.value)}
                              className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                            />

                            {/* REMOVE BUTTON */}
                            
                            {/* ADD Row Button */}
                            <div className="flex justify-center gap-4">   
                           
                              <button
                                className="text-green-500 tooltip"
                                onClick={() =>{handle_transaction_sales(numIndex)}}
                              >
                                <Plus />
                                          <span className="tooltiptext font">Add new row</span>
                              </button>
                            

                            <button
                              className="text-red-600 tooltip"
                              onClick={() => {handle_transaction_sales(numIndex)}}
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
                <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div key={i}>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                     {disbursementFeesError && <p style={{ color: "red" }}>{disbursementFeesError}</p>}
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Disbursement Type £</div>
                            <div className="text-center">Fee Cost £</div>
                            <div className="text-center">Paid To</div>
                            <div className="text-center">Transaction Type</div>
                            <div className="text-center">Action</div>

                    </div>
                     {pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                        {!row.isOthers ? (
                            <select
                            className="poundtransform border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                            onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
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
                            onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
                            className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                            />
                            </div>
                        )}

                            {/* COST */}
                            <input
                            type="text"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                            onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />

                            {/* PAID TO */}
                            <select
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-gray-800"
                            value={row.paidTo}
                            onChange={(e) => handlePriceChange(numIndex, i, "paid_to", e.target.value)}
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
                                onChange={(e) => handlePriceChange(numIndex, i, "paid_to", e.target.value)}
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
                                        onClick={() => handle_standard_disbursement(numIndex)}
                                    >
                                        <Plus />
                                                        <span className="tooltiptext font">Add new row-{numIndex}</span>

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
            <div className="standarddisblock mb-5">
                <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                {item.sub_categories.map((sub, i) => (
                    <div>
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {sub.sub_category}
                    </div>
                     {leasedisbursementFeesError && <p style={{ color: "red" }}>{leasedisbursementFeesError}</p>}
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Leasehold Service</div>
                            <div className="text-center">Fee Type</div>
                            <div className="text-center">Amount £</div>
                            <div className="text-center">Paid To</div>
                            <div className="text-center">Action</div>

                    </div>
                     {pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                        {!row.isOthers ? (
                            <select
                            className="poundtransform border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                           onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
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
                            onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                            />
                            </div>
                        )}

                            {/* COST */}
                            <input
                            type="text"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                           onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />

                            {/* PAID TO */}
                            <select
                            className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  placeholder:text-gray-800"
                            value={row.paidTo}
                           onChange={(e) => handlePriceChange(numIndex, i, "paid_to", e.target.value)}
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
                               onChange={(e) => handlePriceChange(numIndex, i, "paid_to", e.target.value)}
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
                                        onClick={() => handle_leasehold_disbursement(numIndex)}
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
            <div className="addtional mb-5">
                <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                {item.fees_category}
                </div>
                
                    <div>
                    {additionalServiceError && <p style={{ color: "red" }}>{additionalServiceError}</p>}
                    <div className="grid grid-cols-5 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">

                            <div className="text-center">Select Service</div>
                            
                            <div className="text-center">Amount £</div>
                           
                            <div className="text-center">Action</div>

                    </div>
                     {pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
      
                       
                            <select
                            className="poundtransform border border-gray-400 rounded py-0.5 w-auto  text-sm text-left text-black"
                           onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
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
                            type="text"
                            placeholder="Fee Cost"
                            value={row.feeCost}
                            onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                            className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-black"
                            />


                                {/* ACTION BUTTONS */}
                                <div className="flex justify-center gap-4">
                                    {/* ADD ROW – only last row */}
                                    {i === disbursementRows.length - 1 && (
                                    <button
                                        className="text-green-600 tooltip"
                                        onClick={() =>  handle_additional_service(numIndex)}
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
                
               
            </div>
          )}                     
      </div>  
        
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
