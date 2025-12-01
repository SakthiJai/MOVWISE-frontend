"use client";

import React, { useState } from "react";

const PriceBreakdownCard = () => {
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
  // -------------------

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Quote Details
      </h2>

      {/* Grid for two columns: Details (3/5) and Graph (2/5) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT SIDE: Quote Details and Price Breakdown (Col Span 3) */}
        <div className="lg:col-span-3  space-y-6">
          {/* Quote Details Section */}
          <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">
              Quote Details
            </h3>
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

          {/* Price Breakdown Table */}
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

        {/* RIGHT SIDE: Progress Graph (Col Span 2) */}
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
  );
};

export default PriceBreakdownCard;
