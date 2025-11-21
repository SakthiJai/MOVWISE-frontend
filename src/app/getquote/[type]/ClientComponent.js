"use client"; // This makes the component a Client Component

import React, { use, useEffect, useMemo, useState } from "react";
import Navbar from "../../parts/navbar/page";
import { Check, MapPin, ChevronDown } from "lucide-react";
import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md"; // Material icon
import Select from 'react-select';
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import Footer from "../../parts/Footer/footer";
import Sales from "./Sales"
import Salewithpurchase from "./Salewithpurchase"
import Remortage from "./Remortage"


import { v4 as uuidv4 } from 'uuid';

export default function ClientComponent({ type }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data or perform side effects here
  }, []);

  return (
    <div>
        
        <div className="min-h-screen bg-white antialiased font-inter font-outfit">
            <div className='sticky top-0 z-50'>
            <Navbar />
            </div>
                <main className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1>Type: {type}</h1>
                    {type === 'sales' && <Sales />}
                    {type === 'saleswithpurchase' && <Salewithpurchase />}
                    {type === 'remortage' && <Remortage />}
                </main>
            </div>
            <Footer />
    </div>
  );
}