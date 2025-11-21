import React, { useState } from 'react'
import Select from 'react-select';
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";


const Lenderselection = ({ control, errors }) => {
    const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem", // rounded-xl
      borderColor: state.isFocused ? "#1E5C3B" : "#D1D5DB", // focus green, default gray
      boxShadow: state.isFocused ? "0 0 0 1px #1E5C3B" : "none",
      "&:hover": {
        borderColor: "#1E5C3B",
      },
      minHeight: "40px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "black ", // Tailwind gray-500
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#DCFCE7", // light green background
      borderRadius: "0.25rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#166534", // dark green text
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#166534",
      ":hover": {
        backgroundColor: "#BBF7D0",
        color: "#166534",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#DCFCE7"
        : state.isFocused
        ? "#ECFDF5"
        : "white",
      color: "#111827",
      cursor: "pointer",
    }),
  };
const Select = dynamic(() => import("react-select"), { ssr: false });
 const lenders = [
    { "id": 1, "lenders_name": "Lender A" },
    { "id": 2, "lenders_name": "Lender B" },
    { "id": 3, "lenders_name": "Lender C" },
    { "id": 4, "lenders_name": "Lender D" },
    { "id": 5, "lenders_name": "Lender E" },
    { "id": 6, "lenders_name": "Lender F" },
    { "id": 7, "lenders_name": "Lender G" },
    { "id": 8, "lenders_name": "Lender H" },
    { "id": 9, "lenders_name": "Lender I" },
    { "id": 10, "lenders_name": "Lender J" }
  ]

  const lender_options = lenders.map((lender) => ({
  value: lender.id,
  label: lender.lenders_name
}));
const [selectedOptions, setSelectedOptions] = useState([]);

 const handleChange = (selected) => {
    setSelectedOptions(selected || []);
  };
 

  return (
    <div className="">
          <label className="block text-black font-medium ">
            Select Lenders:
          </label>
  
          <Controller
            name="lenders_id"
            control={control}
            rules={{ required: "Please select lender name" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={lender_options}
                placeholder="Select lenders..."
                styles={customStyles}
                value={field.value || []}
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
  
          {errors.lenders_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lenders_id.message}
            </p>
          )}
        </div>
  )
}

export default Lenderselection
