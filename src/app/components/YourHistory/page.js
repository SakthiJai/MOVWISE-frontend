'use client';
import React from 'react';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function HistorySidebar() {
  const history = [
    {
      title: 'TODAY',
      items: [
        { name: 'MyHomeMove Conveyancing', time: '2 mins ago' },
        { name: 'PM Property Lawyers', time: '1 hour ago' },
        { name: 'PM Property Lawyers', time: '2 hour ago' },
        { name: 'PM Property Lawyers', time: '2 hour ago' },
      ],
    },
    {
      title: 'LAST WEEK',
      items: [
        { name: 'MyHomeMove Conveyancing', time: '2 mins ago' },
        { name: 'PM Property Lawyers', time: '1 hour ago' },
        { name: 'PM Property Lawyers', time: '2 hour ago' },
        { name: 'PM Property Lawyers', time: '2 hour ago' },
      ],
    },
  ];

  return (
    <aside className="w-[260px] h-[calc(100vh-80px)] bg-white shadow-md  p-6 flex flex-col overflow-y-auto ">
      <h2 className="text-gray-800 font-semibold text-lg mb-4">Your History</h2>

      {/* Search Box */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search here"
          className="w-full pl-4 pr-10 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
        />
        {/* <MagnifyingGlassIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" /> */}
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden space-y-6">
        {history.map((section) => (
          <div key={section.title}>
            <h3 className="text-[11px] font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  {/* Icon and vertical line */}
                  <div className="relative flex flex-col items-center mr-3">
                    {/* Green circle icon */}
                    <div className="w-6 h-6 rounded-full bg-[#4A7C59] flex items-center justify-center text-white text-[10px] font-bold">
                      P
                    </div>
                    {/* Vertical line */}
                    {index !== section.items.length - 1 && (
                      <div className="w-[1px] h-6 bg-gray-200 mt-1"></div>
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-[13px] font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
