"use client";

import React from "react";

interface AddressFieldsProps {
  formData: {
    address_line1: string;
    address_line2: string;
    town: string;
    country: string;
  };
  errors: {
    address_line1?: string;
    address_line2?: string;
    town?: string;
    country?: string;
  };
  onChange: (field: string, value: string) => void;
  showAddressLines: boolean;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  formData,
  errors,
  onChange,
  showAddressLines,
}) => {
  return (
    <>
      {/* Address Line 1 */}
      {showAddressLines && (
        <div className="flex flex-col h-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address_line1}
            onChange={(e) => onChange("address_line1", e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors.address_line1}
          </p>
        </div>
      )}

      {/* Address Line 2 */}
      {showAddressLines && (
        <div className="flex flex-col h-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            value={formData.address_line2}
            onChange={(e) => onChange("address_line2", e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors.address_line2}
          </p>
        </div>
      )}

      {/* Town / City - always visible */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Town / City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.town}
          onChange={(e) => onChange("town", e.target.value)}
          className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
        />
        <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors.town}
        </p>
      </div>

      {/* Country - always visible */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => onChange("country", e.target.value)}
          className="block w-full h-[44px] rounded-xl border border-gray-300 px-4 text-[14px] text-gray-900 font-medium bg-white focus:border-[#1E5C3B] focus:ring-[#1E5C3B] focus:ring-1 transition-colors appearance-none pr-10"
        >
          <option value="">Select country</option>
          <option value="England">England</option>
          <option value="Scotland">Scotland</option>
          <option value="Wales">Wales</option>
          <option value="Northern Ireland">Northern Ireland</option>
        </select>
        <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors.country}
        </p>
      </div>
    </>
  );
};

export default AddressFields;
