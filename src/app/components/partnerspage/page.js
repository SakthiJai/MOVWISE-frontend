'use client';
import Image from 'next/image';


import {
  FiHome,
  FiFileText,
  FiUsers,
  FiUserCheck,
  FiSettings,
} from "react-icons/fi";


export default function PartnersPage() {
  const partners = [
    { id: 1, name: 'Emily Carter', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 2, name: 'Michael Johnson', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 3, name: 'Jessica Lee', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 4, name: 'David Smith', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 5, name: 'Sophia Brown', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 6, name: 'James Wilson', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 7, name: 'Olivia Miller', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
    { id: 8, name: 'William Davis', commission: '£1,500.00', revenue: '£15,000.00', users: 450 },
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
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
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
        <main className="flex-1  bg-white overflow-y-auto scrollbar-hidden">
       {/* Content */}
        <main className="flex-1 p-8 font">
          <h1 className="text-2xl font-semibold  flex items-center gap-2 font text-[#1B1D21] ">
            Your Partners <span></span>
          </h1>
          <p className="text-gray-700 mb-6">
            Two liner descriptions of some kinda content
          </p>

          {/* Table */} 
         <div className="shadow-sm border rounded-2xl overflow-hidden p-6">
  <table className="w-full text-left">
    <thead className="bg-gray-100 ">
      <tr className="text-gray-700 text-sm ">
        <th className="py-3 px-6 rounded-l-xl ">S.NO</th>
        <th className="py-3 px-6">PARTNER NAME</th>
        <th className="py-3 px-6">TOTAL COMMISSION</th>
        <th className="py-3 px-6">TOTAL REVENUE</th>
        <th className="py-3 px-6 rounded-r-xl">TOTAL USERS</th>
      </tr>
    </thead>
    <tbody>
      {partners.map((p) => (
        <tr key={p.id} className="border-b text-gray-700 border-gray-200">
          <td className="py-3 px-6">{String(p.id).padStart(2, '0')}</td>
          <td className="py-3 px-6">{p.name}</td>
          <td className="py-3 px-6">{p.commission}</td>
          <td className="py-3 px-6">{p.revenue}</td>
          <td className="py-3 px-6">{p.users}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </main>
        </main>

        {/* Right History Sidebar (scrolls internally) */}
        
      </div>
    </div>


    


 
  );
}
