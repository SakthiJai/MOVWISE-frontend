"use client"

import React, { useState } from 'react'
import Navbar from '../../parts/navbar/page';
import Footer from '../../parts/Footer/footer';
import PriceBreakdownCard from '../Myprofile/pricebreakdown'

const Myprofile = () => {
  const [show, setshow] = useState(true);

  // --- Mock Data for Illustration (Unchanged) ---
  const userDetails = {
    name: "DevaPrasad A.S",
    email: "deva@example.com",
  };

  const quotesList = [
    { id: 1, text: "ABC Legal Hub", status: "Status" },
    { id: 2, text: "Digital Work", status: "Status" },
    { id: 3, text: "cd_Tech ltd.", status: "Status" },
    { id: 4, text: "ZOHO", status: "Status" },
  ];
  // -----------------------------------

  function handlechangepage(val) {
    // Note: The original logic is correct, ensuring `val` is compared properly.
    setshow(val === 1); 
  }

  // Helper component to render the status button with dynamic colors (Unchanged)
  const StatusButton = ({ status }) => {
    let colorClass = '';
    switch (status) {
      case 'Status':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'Published':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'Draft':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  // Content for the 'MY Profile' section (Unchanged)
  const ProfileContent = () => (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">User Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-2xl font-bold">
            {userDetails.name[0]}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{userDetails.name}</p>
            <p className="text-sm text-gray-600">{userDetails.email}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-lg font-medium text-gray-700 mb-1">About Me</p>
          <p className="text-gray-600 italic">{userDetails.bio}</p>
        </div>
        
        {/* <button className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150">
          Edit Profile
        </button> */}
      </div>
    </div>
  );
 

  // Content for the 'MY Quotes' section (Unchanged)
  const QuotesContent = () => (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">My Quotes List ({quotesList.length})</h2>
      <div className="space-y-4">
        {quotesList.map((quote) => (
          <div
            key={quote.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150"
          >
            <p className="text-gray-700 italic font-medium mb-2 sm:mb-0 max-w-2xl">
              "{quote.text}"
            </p>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <StatusButton status={quote.status} />
          
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  return (
    // 1. GRID CONTAINER: Establishes the grid layout
    <div className='min-h-screen  '>
      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>
      <div className='mx-auto px-4 lg:px-16  grid grid-cols-1 md:grid-cols-4  gap-8 govt_by_scheme mt-30 mb-10'>

        {/* 2. ASIDE/SIDEBAR: Spans 1 column. Styled for a menu look. */}
        <aside className="govt_by_scheme md:col-span-1 govt_by_scheme p-6 h-auto max-h-80 bg-white shadow-lg rounded-xl font">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">DevaPrasad</h3>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2">
            <span
              onClick={() => handlechangepage(1)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                show
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
            👤 MY Profile
            </span>
            <span
              onClick={() => handlechangepage(2)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                !show
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
           
                   📜 MY Quotes
            </span>
          </div>
        </aside>

        {/* 3. SECTION/MAIN CONTENT: Spans the remaining 3 columns */}
        <section className="govt_by_scheme md:col-span-3 govt_by_scheme">
          <main>
            {!show ? (
              <div>
                 <QuotesContent />
                 <div className='mt-5'>
                  <PriceBreakdownCard/>
                 </div>
              </div>
              
            ) : (
              <ProfileContent />

            )}
           
          </main>
        </section>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Myprofile