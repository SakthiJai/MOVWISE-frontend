"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";

const PriceBreakdownCard = ({companydetails, quoteId }) => {

   useEffect(() => {
    console.log("Fetching breakdown for:", quoteId);
    console.log("fetching company",companydetails)
    // call API here
  }, [quoteId]);

  const [logintype,setlogintype]=useState()
  const [feeCategory, setfeeCategory] = useState({});
const router = useRouter();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
const [selectedItems, setSelectedItems] = useState({});
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
const [notesData, setnotesData] = useState("");
const [loading, setLoading] = useState(false);
const timers = useRef({});
 
 

   useEffect(() => {
     if(localStorage.getItem("logintype")){
     setlogintype(localStorage.getItem("logintype"));
 
     }
    // Define async function inside useEffect
    const fetchData = async () => { //console.loglog("121212");
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
        //console.logerror(err);
        setErrors("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const [activeIndex, setActiveIndex] = useState(0);

    const steps = [
    { level: 1, label: "Start Here", x: 0, y: 46 },
    { level: 2, label: "Foundation", x: 356, y: 207 },
    { level: 3, label: "Foundation", x: 0, y: 379 },
    { level: 4, label: "Foundation", x: 356, y: 549 },
    { level: 5, label: "Foundation", x: 0, y: 720 },
    { level: 6, label: "Achievement", x:356, y: 900 }
  ];



  // --- Static Data ---
  const quoteDetails = {
    quoteId: "QTE-2025-481A",
    service: "Purchase",
    client: "Global Tech Inc.",
    status: "Active",
  };

  const priceBreakdown = [
    { item: "VAT", price: 1500, type: "base" },
    { item: "Disbursment", price: 2500, type: "base" },
    { item: "Legalcost", price: 3000, type: "base" },
    { item: "additional (8%)", price: 560, type: "fee" },
  ];

  const subtotal = priceBreakdown
    .filter((item) => item.type === "base")
    .reduce((sum, item) => sum + item.price, 0);

  const total = priceBreakdown.reduce((sum, item) => sum + item.price, 0);

  return (
  <div>

{logintype=="user"&&(
   <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Quote Details
      </h2>

      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        <div className="lg:col-span-3  space-y-6">
          {/* Quote Details Section */}
          <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">
              Quote Details
            </h3>
         {companydetails?.map((item, index) => (
          quoteId==item.property_id&&(
              <p key={index} className="text-black">{item.company_name}</p>
          )
         ))}
              
          
            <div className="text-sm space-y-1 text-black">
              <p>
                <strong>Quote ID:</strong> {quoteDetails.quoteId}
              </p>
              <p>
                <strong>Service:</strong> {quoteDetails.service}
              </p>
              <p>
                <strong>Client:</strong> {quoteDetails.client}
              </p>
              <p>
                <strong>Status:</strong>
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  {quoteDetails.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 p-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Cost Breakdown
            </h3>
            <div className="divide-y divide-gray-200">
              {priceBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 text-gray-600"
                >
                  <span className={item.type === "fee" ? "italic" : ""}>
                    {item.item}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="pt-4 border-t border-gray-300 mt-4">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Due</span>
                <span className="text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

       <div className=" flex flex-wrap  " style={{width:"430px"}}>
        
      <svg
width="420"
        height="600"
        viewBox="0 0 800 1000"
        className="overflow-visible justify-center ml-10"
      >

        {/* Background Path */}
       
  <path
          d="
            M 60 80
            H 330
            V 260
            H 60
            V 440
            H 330
            V 620
            H 60
            V 800
            H 330
            V 980
          "
          fill="none"
          stroke="#e5f2ec"
          strokeWidth="48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      
      

        {/* Milestones Inside SVG */}
        {steps.map((s, i) => (

          <foreignObject
          className="z-1"
            key={i}
            x={s.x - 20}
            y={s.y - 20}
            width="120"
            height="120"
          >

            <div
              onClick={() => setActiveIndex(i)}
              className=""
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
                 {/*    flag */}
              <div
                className={`milestone-circle  ${
                  activeIndex === i ? "active" : ""
                }`}
              >
                   {/*    flag */}
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M6 2v20M6 4h10l-2 3 2 3H6"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  </svg> 
             
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Level {s.level}
              </p>

              <p
                className={
                  activeIndex === i
                    ? "text-green-600 font-bold"
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
   )} 

   {logintype=="partner"&&(
    <div className="h-auto">
       <div className="border rounded-lg mb-6 shadow-sm overflow-auto  bg-white p-5 " style={{ maxHeight: "550px", overflowY: "scroll" }}>
 
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

                <div className=" w-full">
                  <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                    <thead className="bg-gray-100">
                      <tr className="">
                        <th className="px-3 py-2 text-center">S.no</th>
                        <th className="px-3 py-2 text-center">Min £</th>
                        <th className="px-3 py-2 text-center">
                          Max £
                        </th>

                        {(formData['service_id']?.includes(1) ||
                          formData['service_id']?.includes(3)) && (
                          <>
                            <th className="px-3 py-2 text-center">Purchase Leasehold £</th>
                            <th className="px-3 py-2 text-center">Purchase Freehold £</th>
                          </>
                        )}

                        {(formData['service_id']?.includes(2) ||
                          formData['service_id']?.includes(3)) && (
                          <>
                            <th className="px-3 py-2 text-center">Sales Leasehold £</th>
                            <th className="px-3 py-2 text-center">Sales Freehold £</th>
                          </>
                        )}

                        {formData['service_id']?.includes(4) && (
                          <th className="px-3 py-2 text-center">Remortgage</th>
                        )}

                      </tr>
                    </thead>

                    

                    <tbody>        
                      {
                      
                      pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
                            <tr key={i} className="border-b">
            
                              <td className="px-3 py-2 text-center">{i + 1}</td>
                              <td className="px-3 py-2">
                                <div className="flex flex-col">
                                  <input
                                    readOnly
                                    type="text"
                                    placeholder="Min"
                                    value={(row?.min)}
                                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black bg-white"
                                    onChange={(e) => handlePriceChange(numIndex, i, "min", e.target.value)}
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
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex flex-col">
                                  <input
                                   readOnly
                                    type="text"
                                    placeholder="Max"
                                    value={(row.max)}
                                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                    onChange={(e) => handlePriceChange(numIndex, i, "max", e.target.value)}
                                  />

                                  {rowErrors[i]?.max && (
                                    <span className="text-red-500 text-xs">{rowErrors[i].max}</span>
                                  )}

                                  {rangeErrors[i]?.map((msg, idx) => (
                                    <p key={idx} className="text-red-500 text-xs mt-1">{msg}</p>
                                  ))}
                                </div>
                              </td>

                              {(formData['service_id']?.includes(1) ||
                                formData['service_id']?.includes(3)) && (
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <input
                                     readOnly
                                      type="text"
                                      value={(row.purchase_leasehold)}
                                      placeholder="Purchase Leasehold" 
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "purchase_leasehold", e.target.value)
                                      }
                                    />

                                    {rowErrors[i]?.PurchaseLeasehold && (
                                      <span className="text-red-500 text-xs">{rowErrors[i].PurchaseLeasehold}</span>
                                    )}
                                  </div>
                                </td>
                              )}

                              {/* PURCHASE FREEHOLD */}
                              {(formData['service_id']?.includes(1) ||
                                formData['service_id']?.includes(3)) && (
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <input
                                     readOnly
                                      type="text"
                                      placeholder="Purchase Freehold" value={(row.purchase_freehold)}
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "purchase_freehold", e.target.value)
                                      }
                                    />

                                    {rowErrors[i]?.PurchaseFreehold && (
                                      <span className="text-red-500 text-xs">{rowErrors[i].PurchaseFreehold}</span>
                                    )}
                                  </div>
                                </td>
                              )}

                              {/* SALES LEASEHOLD */}
                              {(formData['service_id']?.includes(2) ||
                                formData['service_id']?.includes(3)) && (
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <input
                                     readOnly
                                      type="text"
                                      value={(row.sales_leasehold)}
                                      placeholder="Sales Leasehold"
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "sales_leasehold", e.target.value)
                                      }
                                    />

                                    {rowErrors[i]?.salesLeasehold && (
                                      <span className="text-red-500 text-xs">{rowErrors[i].salesLeasehold}</span>
                                    )}
                                  </div>
                                </td>
                              )}

                              {/* SALES FREEHOLD */}
                              {(formData['service_id']?.includes(2) ||
                                formData['service_id']?.includes(3)) && (
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <input
                                     readOnly
                                      type="text" value={(row.sales_freehold)}
                                      placeholder="Sales Freehold"
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "sales_freehold", e.target.value)
                                      }
                                    />

                                    {rowErrors[i]?.salesFreehold && (
                                      <span className="text-red-500 text-xs">{rowErrors[i].salesFreehold}</span>
                                    )}
                                  </div>
                                </td>
                              )}

                              {/* REMORTGAGE */}
                              {formData["service_id"]?.includes(4) && (
                                <td className="px-3 py-2">
                                  <div className="flex flex-col">
                                    <input
                                     readOnly
                                      type="text"
                                      placeholder="Remortgage" value={(row.remortgage)}
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "remortgage", e.target.value)
                                      }
                                    />

                                    {rowErrors[i]?.remortgage && (
                                      <span className="text-red-500 text-xs">{rowErrors[i].remortgage}</span>
                                    )}
                                  </div>
                                </td>
                              )}

                              {/* ADD ROW BUTTON */}
                            
                            </tr>

                      ))}
                  </tbody> 
                </table>
                </div>
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
                            </div>
                            { pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => 
                            (
                              <div key={i} className="grid grid-cols-4 gap-3 px-3 py-2">

                              
                                {!row.isOthers ? (

                                <select className="border poundtransform border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                onChange={(e) => handlePriceChange(numIndex, i, "type_id", e.target.value)}
                              value={row.type}
                              disabled
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
                                  disabled
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
                                   readOnly
                                  placeholder="Fee Amount"
                                  value={row.fee_amount}
                                  onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                />
                                
                                

                                {/* DESCRIPTION */}
                                <input
                                 readOnly
                                  type="text"
                                  placeholder="Description"
                                  value={row.description}
                                  onChange={(e) => handlePriceChange(numIndex, i, "description", e.target.value)}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                />

                                {/* REMOVE BUTTON */}
                                
                              
                              
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

                        </div>
                        {pricingList.find(item => item.fees_category_id === numIndex).price_list.map((row, i) => (
                        <div key={i} className="grid grid-cols-5 gap-3 px-3 py-2">
          
                            {!row.isOthers ? (
                                <select
                                disabled
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
                                 readOnly
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
                                 readOnly
                                type="text"
                                placeholder="Fee Cost"
                                value={row.fee_amount}
                                onChange={(e) => handlePriceChange(numIndex, i, "fee_amount", e.target.value)}
                                className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black "
                                />

                                {/* PAID TO */}
                                <select
                                disabled
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
                                     disabled
                                    className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black  "
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

                                  
                                </div>
      ))}
                    
                        </div>
                    ))}
                  
                </div>
              )}
              {numIndex === 4 && (   
                
              <div className="standarddisblock mb-5">
              
                {/* MAIN CATEGORY HEADER */}
                <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                  {item.fees_category}
                </div>

                {item.sub_categories.map((sub, sIndex) => (
                  <div key={sIndex}>
                    {/* SUB CATEGORY HEADER */}
                    <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      {sub.sub_category}
                    </div>

                    {leasedisbursementFeesError && (
                      <p className="text-red-500 px-3">{leasedisbursementFeesError}</p>
                    )}

                    {/* RESPONSIVE WRAPPER */}
                    <div className=" w-full">
                      <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                        <thead className="bg-gray-100">
                          <tr className="">
                            <th className="px-3 py-2 text-center">Leasehold Service</th>
                            <th className="px-3 py-2 text-center">Fee Type</th>
                            <th className="px-3 py-2 text-center">Amount £</th>
                            <th className="px-3 py-2 text-center">Paid To</th>
                          </tr>
                        </thead>

                        <tbody>
                          {pricingList
                            .find((x) => x.fees_category_id === numIndex)
                            .price_list.map((row, i) => (
                              <tr key={i} className="border-b">

                                {/* LEASEHOLD SERVICE SELECT */}
                                <td className="px-3 py-2 text-center">
                                  {!row.isOthers ? (
                                    <select
                                     disabled
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                      value={row.type}
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "type_id", e.target.value)
                                      }
                                    >
                                      <option value="">Select Disbursement</option>
                                      {(standardDisbursementList || []).map((opt) => (
                                        <option key={opt.id} value={opt.id}>
                                          {opt.fee_type}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                     readOnly
                                      type="text"
                                      placeholder="Enter other supplement"
                                      value={row.type}
                                      onChange={(e) =>
                                        handlePriceChange(numIndex, i, "type_id", e.target.value)
                                      }
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                    />
                                  )}
                                </td>

                                {/* COST */}
                                <td className="px-3 py-2 text-center">
                                  <input
                                   readOnly
                                    type="text"
                                    placeholder="Fee Cost"
                                    value={row.fee_amount}
                                    onChange={(e) =>
                                      handlePriceChange(numIndex, i, "fee_amount", e.target.value)
                                    }
                                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                  />
                                </td>

                                {/* PAID TO */}
                                <td className="px-3 py-2 text-center">
                                  <select
                                   disabled
                                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                    value={row.paidTo}
                                    onChange={(e) =>
                                      handlePriceChange(numIndex, i, "paid_to", e.target.value)
                                    }
                                  >
                                    <option value="">Select Paid To</option>
                                    {paidToOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                                {/* TRANSACTION TYPE */}
                                <td className="px-3 py-2 text-center">
                                  <select
                                   disabled
                                    className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                    value={row.transactionType}
                                    onChange={(e) =>
                                      handlePriceChange(numIndex, i, "transactionType", e.target.value)
                                    }
                                  >
                                    <option value="">Select Type</option>
                                    {transactionOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>

                               

                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              )}   
              {numIndex === 5 && (   
               <div className="addtional mb-5">
  <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
    {item.fees_category}
  </div>

  {additionalServiceError && (
    <p className="text-red-500 px-3 mt-1">{additionalServiceError}</p>
  )}

  {/* TABLE WRAPPER (for responsive scrolling) */}
  <div className="overflow-x-auto w-full">
    <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
      <thead className="bg-gray-100">
        <tr className="">
          <th className="px-3 py-2 text-center">Select Service</th>
          <th className="px-3 py-2 text-center">Amount £</th>
        </tr>
      </thead>

      <tbody>
        {pricingList
          .find((x) => x.fees_category_id === numIndex)
          .price_list.map((row, i) => (
            <tr key={i} className="border-b">
              
              {/* SELECT SERVICE */}
              <td className="px-3 py-2 text-center">
                <select
                  className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                  value={row.type}
                   disabled
                  onChange={(e) =>
                    handlePriceChange(numIndex, i, "type_id", e.target.value)
                  }
                >
                  <option value="">Select Additional Service</option>
                  {(additionalServiceList || []).map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.fee_type}
                    </option>
                  ))}
                </select>
              </td>

              {/* FEE COST */}
              <td className="px-3 py-2 text-center">
                <input
                 readOnly
                  type="text"
                  placeholder="Fee Cost"
                  value={row.fee_amount}
                  onChange={(e) =>
                    handlePriceChange(numIndex, i, "fee_amount", e.target.value)
                  }
                  className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-black "
                />
              </td>

           

            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>


              )}                     
          </div>  
            
        )
        
        })
    }
    </div>
    </div>
   )}
   
  </div>
   

  );
};

export default PriceBreakdownCard;
