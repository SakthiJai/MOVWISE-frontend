"use client";

import React from "react";
import Select from "react-select";

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
const town_city = prefix ? `${prefix}city` : "town_city";
const country = prefix ? `${prefix}country` : "country";
const countryOptions = [
  { value: "England", label: "England" },
  { value: "Scotland", label: "Scotland" },
  { value: "Wales", label: "Wales" },
  { value: "Northern Ireland", label: "Northern Ireland" },
];

const countrySelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "12px",
    borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
    "&:hover": {
      borderColor: "#1E5C3B",
    },
  }),
  option: (base, state) => ({
    ...base,
 backgroundColor: state.isFocused
      ? "#F6CE53"
      : "white",      
    
    color: "#111",
    cursor: "pointer",
  }),
};



console.log("location:" , town_city);
console.log("country:" , country);
console.log("showAddressLines:" , showAddressLines);
  return (
    <>

      {/* Address Line 1 */}
      {/* {showAddressLines && (
        <div className="flex flex-col h-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 <span className="text-red-900">*</span>
          </label>
          <input
            type="text"
            value={formData[line1] || ""}
                        disabled={showAddressLines}
            onChange={(e) => onChange(line1, e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors[line1]}
          </p>
        </div>
      )}


      {showAddressLines && (
        <div className="flex flex-col h-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            value={formData[line2] || ""}
                        disabled={showAddressLines}

            onChange={(e) => onChange(line2, e.target.value)}
            className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900"
          />
          <p className="text-[12px] text-red-500 min-h-[16px]">
            {errors[line2]}
          </p>
        </div>
      )} */}

      {/* Town */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Town / City 
        </label>
        <input
          type="text"
          value={formData[town_city] || ""}
          onChange={(e) => onChange(town_city, e.target.value)}
          className="block w-full h-[44px] rounded-xl border border-gray-300 px-4  text-gray-900 hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B] outline-none"
        />
        <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors[town_city]}
        </p>
      </div>

      {/* Country */}
      <div className="flex flex-col h-full">
        <label className="block text-sm font-medium text-gray-700 mb-1 hover:border-[#1E5C3B] focus:border-[#1E5C3B] focus:ring-1 focus:ring-[#1E5C3B] outline-none">
          Country <span className="text-red-500">*</span>
        </label>
    <Select
  options={countryOptions}
  styles={countrySelectStyles}
  value={countryOptions.find(
    (opt) => opt.value === formData[country]
  )}
  onChange={(selected) =>
    onChange(country, selected?.value || "")
  }
  isSearchable={false}
  placeholder="Select country"
/>

        {/* <p className="text-[12px] text-red-500 min-h-[16px]">
          {errors[country]}
        </p> */}
        <p
  className={`text-[12px] mt-1 min-h-[16px] transition-all duration-200 ${
    errors[country] && !formData[country]
      ? "text-red-500 opacity-100"
      : "opacity-0"
  }`}
>
  {errors[country] || "placeholder"}
</p>


      </div>

    </>
  );
};

export default AddressFields;
