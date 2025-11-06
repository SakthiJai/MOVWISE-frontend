"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../parts/navbar/page";
import {
  Home,
  ShoppingBag,
  Repeat,
  Landmark,
  Building2,
  ArrowRight,
} from "lucide-react";

const GetQuotePage = () => {
  const router = useRouter();

  const options = [
    {
      label: "Purchase",
      icon: <Home className="w-10 h-10 text-[#256041]" />,
      desc: "Buying your dream property",
    },
    {
      label: "Sales",
      icon: <ShoppingBag className="w-10 h-10 text-[#256041]" />,
      desc: "Selling your property quickly",
    },
    {
      label: "Sales & Purchase",
      icon: <Repeat className="w-10 h-10 text-[#256041]" />,
      desc: "Buy and sell in one smooth move",
    },
    {
      label: "Remortgage",
      icon: <Landmark className="w-10 h-10 text-[#256041]" />,
      desc: "Refinancing for better rates",
    },
    {
      label: "Transfer of Equity",
      icon: <Building2 className="w-10 h-10 text-[#256041]" />,
      desc: "Changing ownership easily",
    },
  ];

  const handleSelect = (type) => {
    router.push(`/getquote/${type.replace(/\s+/g, "")}`);
  };

  return (
    <div className="min-h-screen bg-white font">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Content */}
      <div className="  px-6 py-14">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-3 tracking-tight">
          Choose Your Quote Type
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Select the type of quote or service you’re looking for below.
        </p>

        {/* Card Row */}
        <div className="flex flex-wrap gap-6 justify-center">
          {options.map((opt) => (
            <div
              key={opt.label}
              className="bg-white w-60 sm:w-64 lg:w-64 hover:shadow-2xl hover:border-[#256041] transition-all duration-300 p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-3">
                {opt.icon}
                <h2 className="text-lg font-semibold text-[#256041]">
                  {opt.label}
                </h2>
                <p className="text-gray-600 text-sm">{opt.desc}</p>
              </div>

              <button
                onClick={() => handleSelect(opt.label)}
                className="mt-6 flex items-center justify-center gap-3 bg-[#256041] hover:bg-[#1B4E34] text-white font-semibold py-2.5 px-5 rounded-full text-sm transition-all"
              >
                Get Quote
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetQuotePage;
