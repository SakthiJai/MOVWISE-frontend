"use client";

import { useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";
import { formatGBP } from "../utility/poundconverter";
import SalesPropertyDetails from "../comparequotes/Sales_Property";
import PurchasePropertyDetails from "../comparequotes/PurchasePropertyDetails";
import PurchasePropertyprofile from "../comparequotes/purchasepropertyprofile";
import SalesPurchasePropertyDetails from "../comparequotes/Sales_Purchase_PropertyDetails";
import RemortagePropertyDetails from "../comparequotes/RemortagePropertyDetails";

const PriceBreakdownCard = forwardRef(({  companydetails, quoteId,quoteUser,quote_ref_number }, ref) => {

  let ref_number =" ";
  console.log(quote_ref_number)

  console.log("companydetails",companydetails,quoteId);

  const [logintype,setlogintype]=useState()
  const [feeCategory, setfeeCategory] = useState({});
  const [taxDetails, settaxDetails] = useState();
  const [vattax,setvattax]=useState();
const router = useRouter();

  
const timers = useRef({});
 
 const [view_data, setview_data] = useState({service_details: []});

//    useEffect(() => {

    
//      if(localStorage.getItem("logintype")){
//      setlogintype(localStorage.getItem("logintype"));
//      console.log(companydetails)
//      const grouped = companydetails[0].taxDetails.reduce((acc, item) => {
//   if (!acc[item.fees_category]) {
//     acc[item.fees_category] = [];
//   }
//   acc[item.fees_category].push(item);
//   return acc;
// }, {});
// settaxDetails(grouped);
// console.log("Grouped Tax Details:", grouped);
// let selectedquote=companydetails.filter((item)=>item.quote_id==quoteId);
// console.log("seleceted:",selectedquote);

//  const totalTaxVat = companydetails[0].taxDetails.reduce((sum, item) => {
//     if(item.vat==1){
//       sum+=Number(item.fee_amount*0.2)
//     }
//    return sum;
// }, 0);

// console.log("Total VAT:", totalTaxVat);
// setvattax(totalTaxVat);
 
//      }
    
//   }, []);
 useEffect(() => {
  if (!companydetails || !quoteId) return;

  const loginTypeFromStorage = localStorage.getItem("logintype");
  if (loginTypeFromStorage) {
    setlogintype(loginTypeFromStorage);
  }

  // ✅ Find the selected quote based on property_id
  const selected = companydetails.find(
    (item) => item.quote_id == quoteId
  );

  if (!selected) return;

  console.log("Selected Quote:", selected);

  // ✅ Group tax details safely
  const grouped = (selected.taxDetails || []).reduce((acc, item) => {
    if (!acc[item.fees_category]) {
      acc[item.fees_category] = [];
    }
    acc[item.fees_category].push(item);
    return acc;
  }, {});

  settaxDetails(grouped);
  console.log("Grouped Tax Details:", grouped);

  // ✅ Calculate total VAT safely
  const totalTaxVat = (selected.taxDetails || []).reduce((sum, item) => {
    if (item.vat == 1) {
      sum += Number(item.fee_amount) * 0.2;
    }
    return sum;
  }, 0);

  setvattax(totalTaxVat);
  console.log("Total VAT:", totalTaxVat);

}, [companydetails, quoteId]);

useEffect(() => {
  if (!quoteId) return;

  async function fetchQuoteDetails() {
    try {
      setlogintype(localStorage.getItem("logintype"));

      // const refNumber = localStorage.getItem("ref_no"); 

      if (!ref_number) return;

      const quoteResponse = await getData(
        `${API_ENDPOINTS.quotesfilter}/${ref_number}`
      );

      if (quoteResponse?.status === false) return;

      setview_data(quoteResponse.data[0]);
      

    } catch (error) {
      console.error("❌ API Error:", error);
    }
  }

  fetchQuoteDetails();
}, [quoteId]);


  const [activeIndex, setActiveIndex] = useState();
 const isRejectedCase = [4,5,7,8].includes(Number(activeIndex));
const statusToPathIndex = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  10: 8,
  11: 9,
  12: 10,
  13: 12,
  14: 13,
  15: 14,
  16: 15,
  17: 16,
  18: 17,
  19: 18,
  20: 19,
  21: 20,
  22: 21,
  23: 22,
  24: 23,
};


const activePathIndex =
statusToPathIndex[Number(activeIndex)] ?? -1;

  useImperativeHandle(ref, () => ({
    refreshCard() {
  const match = companydetails.find(item => item.quote_id == quoteId);
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
      return "Quote Instructed";
    case 3:
      return "Admin Approved";
    case 4:
      return "Approved";
    case 5:
      return "Rejected by Admin";
    case 6:
      return "On Hold";
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
                
                (item, index) =>{
                  if(quoteId == item.quote_id){
                    ref_number = item.quote_ref_number;
                    console.log("ref_number",ref_number);
                  }


              return(
                  quoteId == item.quote_id && (
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
                          {(item.service_type == 3 ) && <SalesPropertyDetails quote={item}  page="profile" servicData={view_data.service_details[0]} />}   
                          {(item.service_type== 2 ) && <PurchasePropertyprofile quote={item}  page="profile" hide={true}  servicData={view_data.service_details[0]}  />}   
                          {(item.service_type == 1 ) && <SalesPurchasePropertyDetails quote={item}  page="profile" servicData={view_data.service_details[0]}/>}   
                          {(item.service_type == 4 ) && <RemortagePropertyDetails quote={item}  page="profile" servicData={view_data.service_details[0]}/>}  
                        </div>

                    </div>
                  )
              )
                
                    }
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
    .filter((item) => item.quote_id == quoteId)
    .map((item, index) => {
      const taxVAT = Object.values(taxDetails || {}).flatMap((items) =>
        items.map((fee) => Number(fee.vat) || 0)
      );
      const totalVAT = Number(item.vat || 0) + taxVAT.reduce((a, b) => a + b, 0);

      return (
        <React.Fragment key={index}>
          <tr className="border-b border-gray-200">
            <td className="p-2 break-words font-semibold ">Legal Fees</td>
            <td className="p-2 text-right ">{formatGBP(item.legal_fees)}</td>
            <td className="p-2 text-right ">{formatGBP(item.vat)}</td>
          </tr>

          {Object.entries(taxDetails || {}).map(([category, items]) => (
            <React.Fragment key={category}>
              {/* Category Row */}
              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="p-2 font-semibold" colSpan={3}>
                  {category}
                </td>
              </tr>

              {items?.map((fee, i) =>
                Number(fee.fee_amount) > 0 ? (
                  <tr key={i} className="border-b border-gray-200 ">
                    <td className="p-2 break-words ">
                      <div className="ml-4">{fee.fee_type || fee.others}</div>
                    </td>
                    <td className="p-2 text-right">{formatGBP(fee.fee_amount)}</td>
                    <td className="p-2 text-right text-sm">{formatGBP(fee.vat)}</td>
                  </tr>
                ) : null
              )}
            </React.Fragment>
          ))}

          {/* TOTAL */}
          <tr className="bg-gray-100 font-semibold text-gray-800">
            <td className="p-2">Total</td>
            <td className="p-2 text-right text-indigo-600">
              {formatGBP(item.total)}
            </td>
            <td className="p-2 text-right text-indigo-600">{formatGBP(totalVAT)}</td>
          </tr>

          {item.service_type == 2 && (
            <>
              {item.purchase_country == "England" && (
                <tr className="border-b border-gray-200">
                  <td className="p-2">Stamp Duty</td>
                  <td className="p-2 text-right">{formatGBP(item.stamp_duty)}</td>
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
      );
    })}
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

  // NEW PART
  "M330 980 H60",
  "M60 980 V1160",
  "M60 1160 H330",
  "M330 1160 V1340",
  "M330 1340 H60",
  "M60 1340 V1520",
  "M60 1520 H330",
  "M330 1520 V1700",
  "M330 1700 H60",
  "M60 1700 V1880",
  "M60 1880 H330",
  "M330 1880 V2060",
  "M330 2060 H200",
  "M200 2060 V2240",
              ].map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
stroke={
 i < activePathIndex
 ? "#32a852"
 : i === activePathIndex && isRejectedCase
 ? "#dc2626"
 : i <= activePathIndex
 ? "#32a852"
 : "#e5f2ec"
}
                  strokeWidth="48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* CORNER MILESTONES */}
              {[
           { x: 30, y: 80, label: "Instructed", status: 2 },

  ...(activeIndex === 3
    ? [{ x: 370, y: 80, label: "Admin Approved", status: 3 }]
    : activeIndex === 4
    ? [{ x: 370, y: 260, label: "Admin Rejected", status: 4 }]
    : activeIndex === 5
    ? [{ x: 30, y: 260, label: "Admin On-Hold", status: 5 }]
    : [
        { x: 370, y: 80, label: "Admin Approved", status: 3 },
        { x: 370, y: 260, label: "Admin Rejected", status: 4 },
        { x: 30, y: 260, label: "Admin On-Hold", status: 5 },
      ]),

  ...(activeIndex === 6
  ? [{ x: 30, y: 440, label: "Conveyancer Approved", status: 6 }]
  : activeIndex === 7
  ? [{ x: 370, y: 440, label: "Conveyancer Rejected", status: 7 }]
  : activeIndex === 8
  ? [{ x: 370, y: 620, label: "Conveyancer On-Hold", status: 8 }]
  : [
      { x: 30, y: 440, label: "Conveyancer Approved", status: 6 },
      { x: 370, y: 440, label: "Conveyancer Rejected", status: 7 },
      { x: 370, y: 620, label: "Conveyancer On-Hold", status: 8 },
    ]),
  { x: 30, y: 620, label: "Client care pack sent", status: 9 },
  { x: 30, y: 800, label: "Client care pack received", status: 10 },
  { x: 370, y: 800, label: "ID requirements satisfied", status: 11 },
  { x: 300, y: 1030, label: "Search fees received", status: 12 },
  { x: 30, y: 1160, label: "Contract paperwork received", status: 13 },
  { x: 370, y: 1160, label: "Searches ordered", status: 14 },
  { x: 370, y: 1340, label: "Contract approved and enquiries raised", status: 15 },
  { x: 30, y: 1340, label: "Mortgage offer received", status: 16 },
  { x: 30, y: 1520, label: "Mortgage offer checked", status: 17 },
  { x: 370, y: 1520, label: "Searches received", status: 18 },
  { x: 370, y: 1700, label: "Replies to enquiries received", status: 19 },
  { x: 30, y: 1700, label: "Report sent to clients", status: 20 },
  { x: 30, y: 1880, label: "All documents received", status: 21 },
  { x: 370, y: 1880, label: "Deposit received", status: 22 },
  { x: 370, y: 2060, label: "Contracts exchanged", status: 23 },
  { x: 200, y: 2240, label: "Case Completed", status: 24 },

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
 Number(activeIndex) === Number(s.status) &&
 [4,5,7,8].includes(Number(s.status))
 ? "!bg-red-600"
 : Number(activeIndex) >= Number(s.status)
 ? "active"
 : ""
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
                      Number(activeIndex) >= Number(s.status)
? "text-black font-bold text-xl"
: "text-gray-400 text-xl"
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
