"use client";

import { useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";
import { formatGBP } from "../utility/poundconverter";
import SalesPropertyDetails from "../comparequotes/Sales_Property";
import PurchasePropertyDetails from "../comparequotes/PurchasePropertyDetails";
import SalesPurchasePropertyDetails from "../comparequotes/Sales_Purchase_PropertyDetails";
import RemortagePropertyDetails from "../comparequotes/RemortagePropertyDetails";

const PriceBreakdownCard = forwardRef(({ companydetails, quoteId,quoteUser }, ref) => {
  

  const [logintype,setlogintype]=useState()
  const [feeCategory, setfeeCategory] = useState({});
  const [taxDetails, settaxDetails] = useState();
  const [vattax,setvattax]=useState();
const router = useRouter();

  
const timers = useRef({});
 
 

   useEffect(() => {

    
     if(localStorage.getItem("logintype")){
     setlogintype(localStorage.getItem("logintype"));
     console.log(companydetails)
     const grouped = companydetails[0].taxDetails.reduce((acc, item) => {
  if (!acc[item.fees_category]) {
    acc[item.fees_category] = [];
  }
  acc[item.fees_category].push(item);
  return acc;
}, {});
settaxDetails(grouped);
console.log("Grouped Tax Details:", grouped);
let selectedquote=companydetails.filter((item)=>item.quote_id==quoteId);
console.log("seleceted:",selectedquote);

 const totalTaxVat = companydetails[0].taxDetails.reduce((sum, item) => {
    if(item.vat==1){
      sum+=Number(item.fee_amount*0.2)
    }
   return sum;
}, 0);

console.log("Total VAT:", totalTaxVat);
setvattax(totalTaxVat);
 
     }
    
  }, []);


  const [activeIndex, setActiveIndex] = useState();

  useImperativeHandle(ref, () => ({
    refreshCard() {
  const match = companydetails.find(item => item.property_id == quoteId);
    if (match) {
      setActiveIndex(match.status||1);
      console.log("Status Updated:", match.status);
    }
      console.log("Child function called! quoteId =", quoteId);
      console.log("status:",activeIndex)
    }
  }));





    const steps = [
    { level: 1, label: "Start Here", x: 0, y: 46,status: 'raised' },
    { level: 2, label: "Foundation", x: 356, y: 207,status: 'Approved' },
    { level: 3, label: "Foundation", x: 0, y: 379,status: 'Waiting' },
    { level: 4, label: "Foundation", x: 356, y: 549 ,status: 'completed'},
    { level: 5, label: "Foundation", x: 0, y: 720 ,status: 'Rollout'},
    { level: 6, label: "Achievement", x:356, y: 900 ,status: 'Done'}
  ];
  
  const getStatusLabel = (status) => {
  switch (status) {
    case 2:
      return "Customer Requested";
    case 3:
      return "Admin Approved";
    case 4:
      return "You have accepted";
    case 5:
      return "Quote is under progress";
    case 6:
      return "Rejected by you";
    case 7:
      return "Quote is about to completed";
    default:
      return "Unknown";
  }
};




  // --- Static Data ---
  

  return (
    <div className="h-[500px] overflow-auto ">
      
      <div className="p-6 bg-white  rounded-xl min-h-[300px] font">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
          Quote Details
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          <div className="lg:col-span-2  space-y-6">
            {/* Quote Details Section */}
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
             
              {companydetails?.map(
                (item, index) =>
                  quoteId == item.property_id && (
                    <div key={index} className="text-sm space-y-1 text-black grid grid-cols-2">
                      <div>
                         <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                Quote Details
              </h3>
                         <p>
                        <strong>Reference NO:</strong> {item.quote_ref_number}
                      </p>
                      <p>
                        <strong>Service:</strong> {item.service_type==1?"Sale With Purchase":item.service_type==2?"Purchase":item.service_type==3?"Sale":"Remortage"}
                      </p>
                      <p>
                        <strong>Company Name:</strong> {item.company_name}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                           {getStatusLabel(item.status)}
                        </span>
                      </p>
                      </div>
                      <div>
                          {(item.service_type == 3 ) && <SalesPropertyDetails quote={item}  page="profile"/>}   
                          {(item.service_type== 2 ) && <PurchasePropertyDetails quote={item}  page="profile"/>}   
                          {(item.service_type == 1 ) && <SalesPurchasePropertyDetails quote={item}  page="profile"/>}   
                          {(item.service_type == 4 ) && <RemortagePropertyDetails quote={item}  page="profile"/>}  
                                                         
                        </div>
                     
                    </div>
                  )
              )}
            </div>

            <div className="mt-4 p-3">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">
    Cost Breakdown
  </h3>

  <table className="w-full border-collapse text-black font">
    <thead>
      <tr className="border-b border-gray-300 text-left">
        <th className="p-2 w-1/2">Type</th>
        <th className="p-2 w-1/4 text-right">Fee Amount</th>
        <th className="p-2 w-1/4 text-right">VAT</th>
      </tr>
    </thead>

    <tbody>
      {companydetails
        .filter((item) => item.property_id == quoteId)
        .map((item, index) => (
          <React.Fragment key={index}>
          
            <tr className="border-b border-gray-200">
              <td className="p-2 break-words font-semibold ">{`Legal Fees`}</td>
              <td className="p-2 text-right ">{formatGBP(item.legal_fees)}</td>
              <td className="p-2 text-right">
                -
              </td>
            </tr>

        
            {Object.entries(taxDetails || {}).map(([category, items]) => (
              <React.Fragment key={category}>
                {/* Category Row */}
                <tr className="bg-gray-50 border-b border-gray-300">
                  <td className="p-2 font-semibold" colSpan={3}>
                    {category}
                  </td>
                </tr>

                {items?.map((fee, i) =>  Number(fee.fee_amount) > 0 ? (
                  <tr key={i} className="border-b border-gray-200 ">
                    <td className="p-2 break-words "> <div className="ml-4"> {/* margin-left works here */}
        {fee.fee_type}
      </div></td>
                    <td className="p-2 text-right">
                      {formatGBP(fee.fee_amount)}
                    </td>
                    <td className="p-2 text-right text-sm">{(fee.vat==1?formatGBP(fee.fee_amount*0.2):"No Vat")}</td>
                  </tr>
                ):"")}
              </React.Fragment>
            ))}

            {/* Country-specific taxes */}
            

            {/* TOTAL */}
            <tr className="bg-gray-100 font-semibold text-gray-800">
              <td className="p-2">Total </td>
              <td className="p-2 text-right text-indigo-600">
                {formatGBP(item.total)}
               
              </td>
                                        <td className="p-2 text-right text-indigo-600" > {formatGBP(vattax)}</td>
            </tr>
            {item.service_type == 2 && (
              <>
                {item.purchase_country == "England" && (
                  <tr className="border-b border-gray-200">
                    <td className="p-2">Stamp Duty</td>
                    <td className="p-2 text-right">
                      {formatGBP(item.stamp_duty)}
                    </td>
                    <td></td>
                  </tr>
                )}

                {item.purchase_country == "Scotland" && (
                  <tr className="border-b border-gray-200">
                    <td className="p-2">LLT</td>
                    <td className="p-2 text-right">{formatGBP(item.llt)}</td>
                    <td></td>
                  </tr>
                )}

                {item.purchase_country == "Wales" && (
                  <tr className="border-b border-gray-200">
                    <td className="p-2">LBTT</td>
                    <td className="p-2 text-right">{formatGBP(item.lbtt)}</td>
                    <td></td>
                  </tr>
                )}
              </>
            )}
          </React.Fragment>
        ))}
    </tbody>
  </table>
</div>

          </div>

          <div className=" mx-auto col-span-1">
            <svg
              width="200"
              height="1200"
              viewBox="300 0 10 3000"
              className="overflow-visible justify-center ml-10"
            >
              {/* Zigzag segments */}
              {[
                "M60 80 H330",
                "M330 80 V260",
                "M330 260 H60",
                "M60 260 V440",
                "M60 440 H330",
                "M330 440 V620",
                "M330 620 H60",
                "M60 620 V800",
                "M60 800 H330",
                "M330 800 V980",
              ].map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={i <= activeIndex ? "#32a852" : "#e5f2ec"}
                  strokeWidth="48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* CORNER MILESTONES */}
              {[
             { x: 30, y: 80, label: "Draft" },
{ x: 370, y: 80, label: "Submitted" },
{ x: 370, y: 260, label: "Reviewing" },
{ x: 30, y: 260, label: "Approved" },
{ x: 30, y: 440, label: "Processing" },
{ x: 370, y: 440, label: "In Progress" },
{ x: 370, y: 620, label: "Completed" },
{ x: 30, y: 620, label: "Verified" },
{ x: 30, y: 800, label: "Final Check" },
{ x: 370, y: 800, label: "Closed" },
{ x: 300, y: 1030, label: "Archived" },

              ].map((s, i) => (
                <foreignObject
                  key={i}
                  x={s.x - 30}
                  y={s.y - 30}
                  width="120"
                  height="120"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Circle */}
                    <div
                      className={`milestone-circle ${
                        activeIndex >= i ? "active" : ""
                      }`}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24">
                        <path
                          d="M6 2v20M6 4h10l-2 3 2 3H6"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* Label */}
                    <p
                      className={
                        activeIndex >= i
                          ? "text-black font-bold"
                          : "text-gray-400"
                      }
                    >
                      {s.label}
                    </p>
                  </div>
                </foreignObject>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
)
PriceBreakdownCard.displayName = "Price Breakdown Card";
export default PriceBreakdownCard;
