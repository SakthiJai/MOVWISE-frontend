"use client"; // This makes the component a Client Component

import React, { use, useEffect, useMemo, useState } from "react";
import Navbar from "../../parts/navbar/page";

import Footer from "../../parts/Footer/footer";
import Sales from "./Sales";
import Salewithpurchase from "./Salewithpurchase";
import Remortage from "./Remortage";
import Purchase from "./Purchase";
import Equity from "./Equity";

export default function ClientComponent({ type }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data or perform side effects here
  }, []);

  return (
    <div>
        
        <div className="min-h-screen bg-white antialiased font-inter font-outfit">
            <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
            <Navbar />
            </div>
                <main className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1>Type: {type}</h1>
                    {(type === 'sales' || type === 'sale') && <Sales />}
                    {type === 'saleswithpurchase' && <Salewithpurchase />}
                    {type === 'remortage' && <Remortage />}
                    {type === 'purchase' && <Purchase />}
                    {type === 'equity' && <Equity />}
                    
                </main>
            </div>
            <Footer />
    </div>
  );
}