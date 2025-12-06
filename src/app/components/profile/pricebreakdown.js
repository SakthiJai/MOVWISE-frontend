"use client";

import { useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";

const PriceBreakdownCard = forwardRef(({ companydetails, quoteId }, ref) => {
  //  useEffect(() => {
  //   console.log("Fetching breakdown for:", quoteId);
  //   console.log("fetching company",companydetails);
  //   console.log("status fetched",status);
  //   // call API here
  // }, [quoteId]);

  const [logintype,setlogintype]=useState()
  const [feeCategory, setfeeCategory] = useState({});
const router = useRouter();

  
const timers = useRef({});
 
 

   useEffect(() => {
     if(localStorage.getItem("logintype")){
     setlogintype(localStorage.getItem("logintype"));
 
     }
    
  }, []);


  const [activeIndex, setActiveIndex] = useState();

  useImperativeHandle(ref, () => ({
    refreshCard() {
  const match = companydetails.find(item => item.property_id == quoteId);
    if (match) {
      setActiveIndex(match.status);
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



  // --- Static Data ---
  

  return (
    <div className="h-[400px] ">
      <div className="p-6 bg-white  rounded-xl min-h-[300px] font">
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
              {companydetails?.map(
                (item, index) =>
                  quoteId == item.property_id && (
                    <div key={index} className="text-sm space-y-1 text-black">
                      <p>
                        <strong>Reference NO:</strong> {item.quote_ref_number}
                      </p>
                      <p>
                        <strong>Property ID:</strong> {item.property_id}
                      </p>
                      <p>
                        <strong>Company Name:</strong> {item.company_name}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full"></span>
                      </p>
                    </div>
                  )
              )}
            </div>

            <div className="mt-4 p-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Cost Breakdown
              </h3>
              <div className="divide-y divide-gray-200">
                {companydetails.map(
                  (item, index) =>
                    quoteId == item.property_id && (
                      <div
                        key={index}
                        className="grid grid-cols-2 py-2 text-gray-600"
                      >
                        <p>Legal Fees:</p>
                        <p className="text-end"> {item.legal_fees}</p>
                        <p>disbursements:</p>

                        <p className="text-end"> {item.disbursements}</p>
                        {item.service_type == 2 && (
                          <>
                            {item.purchase_country == "England" &&
                              item.purchase_country == "Northern Ireland" &&
                              (<>
                                <p>Stamp Duty Price:</p>
                                <p className="text-end"> {item.stamp_duty}</p>
                              </>)(item.purchase_country == "Scotland") &&
                              (<>
                                <p>LLT</p>
                                <p className="text-end"> {item.llt}</p>
                              </>)(item.purchase_country == "Wales") && (
                                <>
                                  <p>LBTT</p>
                                  <p className="text-end"> {item.lbtt}</p>
                                </>
                              )}
                          </>
                        )}

                        <p>VAT:</p>

                        <p className="text-end"> {item.vat}</p>
                        <div className="flex justify-between text-lg font-bold text-gray-800 pt-4 border-t border-gray-300 mt-4 w-full">
                          <span className="">Total Due</span>
                          <span className="text-indigo-600 text-end">
                            ${item.total}
                          </span>
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Total Section */}
            </div>
          </div>

          <div className=" flex flex-wrap  ">
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
                { x: 60, y: 80, label: "Level 1" },
                { x: 330, y: 80, label: "Level 2" },
                { x: 330, y: 260, label: "Level 3" },
                { x: 60, y: 260, label: "Level 4" },
                { x: 60, y: 440, label: "Level 5" },
                { x: 330, y: 440, label: "Level 6" },
                { x: 330, y: 620, label: "Level 7" },
                { x: 60, y: 620, label: "Level 8" },
                { x: 60, y: 800, label: "Level 9" },
                { x: 330, y: 800, label: "Level 10" },
                { x: 330, y: 980, label: "Level 11" },
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
    </div>
  );
}
)
PriceBreakdownCard.displayName = "Price Breakdown Card";
export default PriceBreakdownCard;
