// components/PartnerCard.js
'use client';
import Image from 'next/image';


import {
  FiHome,
  FiFileText,
  FiUsers,
  FiUserCheck,
  FiSettings,
} from "react-icons/fi";


export default function Partnerspagecard() {
    const partners = [
        { id: 1, name: 'Emily Carter', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 2, name: 'Michael Johnson', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 3, name: 'Jessica Lee', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 4, name: 'David Smith', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 5, name: 'Sophia Brown', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 6, name: 'James Wilson', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 7, name: 'Olivia Miller', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
        { id: 8, name: 'William Davis', commission: '€1,500.00', revenue: '€15,000.00', users: 450 },
      ];
    
      return (
    
    
    <div className="h-screen flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="w-full h-[92px] bg-[#F9FAFF] border-b border-gray-200 flex justify-between items-center px-6 flex-shrink-0">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-green-800">Movwise</h1>
    
            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Settings */}
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#DEE4EB] shadow-[0_2px_40px_2px_rgba(0,0,0,0.06)] rounded-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="16.5,19.79 21,12 16.5,4.21 7.5,4.21 3,12 7.5,19.79"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="3" stroke="#292D32" strokeWidth="1.5" />
                </svg>
              </button>
    
              {/* User Info */}
              <div className="flex items-center gap-2 px-4 py-1 bg-white border border-[#DEE4EB] shadow-[0_2px_40px_2px_rgba(0,0,0,0.06)] rounded-[32px]">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src="/profile.png"
                    alt="User Avatar"
                    className="absolute w-[26px] h-[26px] object-cover"
                    width={10}
                    height={10}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 select-none">
                  Jessica Samson
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
    
          {/* Body Section (fills remaining screen) */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-56 bg-white border-r flex flex-col py-10 px-4 flex-shrink-0">
              <nav className="flex flex-col gap-4">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
                  <FiHome className="w-5 h-5" />
                  <span className="font-outfit text-base">Home</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#4A7C59] text-white">
                  <FiFileText className="w-5 h-5" />
                  <span className="font-outfit font-medium text-base">Quotes</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
                  <FiUsers className="w-5 h-5" />
                  <span className="font-outfit text-base">Users</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
                  <FiUserCheck className="w-5 h-5" />
                  <span className="font-outfit text-base">Partner</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-gray-600 hover:bg-green-50 hover:text-green-700">
                  <FiSettings className="w-5 h-5" />
                  <span className="font-outfit text-base">Setting</span>
                </button>
              </nav>
            </aside>
    
            {/* Main Content (scrolls internally only) */}
<main className="min-h-screen py-10 px-6 ml-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
    {partners.map((partner) => (
      <div
        key={partner.id}
        className="w-[322px] h-[140px] bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between"
      >
        {/* Card content remains unchanged */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm text-[#353B41]">{partner.name}</span>
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center text-xs">🎯</span>
            <span className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-xs">📈</span>
            <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs">❓</span>
            <span className="ml-1 text-sm font-medium text-[#353B41]">+{partner.users}</span>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-3">
          <div className="bg-gray-50 rounded-lg p-3 flex-1">
            <div className="text-[10px] text-[#6A7682] font-medium uppercase">
              Total Commission
            </div>
            <div className="text-sm font-regular text-[#353B41] mt-1">{partner.commission}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 flex-1">
            <div className="text-[10px] text-[#6A7682] font-medium uppercase">
              Total Revenue
            </div>
            <div className="text-sm font-regular text-[#353B41] mt-1">{partner.revenue}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</main>

    
            {/* Right History Sidebar (scrolls internally) */}
            
          </div>
        </div>
    
   
        
    
    
     
      );
 
}
