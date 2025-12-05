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


  const [activeIndex, setActiveIndex] = useState(5);

    const steps = [
    { level: 1, label: "Start Here", x: 0, y: 46,status: 'raised' },
    { level: 2, label: "Foundation", x: 356, y: 207,status: 'Approved' },
    { level: 3, label: "Foundation", x: 0, y: 379,status: 'Waiting' },
    { level: 4, label: "Foundation", x: 356, y: 549 ,status: 'completed'},
    { level: 5, label: "Foundation", x: 0, y: 720 ,status: 'Rollout'},
    { level: 6, label: "Achievement", x:356, y: 900 ,status: 'Done'}
  ];



  // --- Static Data ---
  const quoteDetails = {
    quoteId: "QTE-2025-481A11",
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
              <p key={index} className="text-black">{item.company_name}-{item.property_id}</p>
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
  height="1200"
  viewBox="0 0 800 2500"
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
    <foreignObject key={i} x={s.x - 30} y={s.y - 30} width="120" height="120">
      <div
        onClick={() => setActiveIndex(i)}
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
        <p className={activeIndex >= i ? "text-green-600 font-bold" : "text-gray-400"}>
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
};

export default PriceBreakdownCard;
