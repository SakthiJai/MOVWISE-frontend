"use client";

import React from "react";

interface AddressFieldsProps {
  formData: any;
  errors: any;
  onChange: (field: string, value: string) => void;
  showAddressLines: boolean;
  prefix?: string; // <-- IMPORTANT
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  formData,
  errors,
  onChange,
  showAddressLines,
  prefix , // default for SALE
}) => {

  const line1 = `${prefix}address_line1`;
  const line2 = `${prefix}address_line2`;
  const town_city = `${prefix}city`;
  const country = `${prefix}country`;

  return (
    <>

      {/* Address Line 1 */}
      {showAddressLines && (
        <div className="flex flex-col h-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 <span className="text-red-900">*</span>
          </label>
          <input
            type="text"
            value={formData[line1] || ""}
            onChange={(e) => onChange(line1, e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors[line1]}
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
            value={formData[line2] || ""}
            onChange={(e) => onChange(line2, e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors[line2]}
          </p>
        </div>
      )}

      {/* Town */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Town / City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData[town_city] || ""}
          onChange={(e) => onChange(town_city, e.target.value)}
          className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900"
        />
        <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors[town_city]}
        </p>
      </div>

      {/* Country */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          value={formData[country] || ""}
          onChange={(e) => onChange(country, e.target.value)}
          className="block w-full h-[44px] rounded-xl border border-gray-300 text-gray-900 px-4 "
        >
          <option value="">Select country</option>
          <option value="England">England</option>
          <option value="Scotland">Scotland</option>
          <option value="Wales">Wales</option>
          <option value="Northern Ireland">Northern Ireland</option>
        </select>
        <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors[country]}
        </p>
      </div>

    </>
  );
};

export default AddressFields;
