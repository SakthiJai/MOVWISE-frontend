"use client"
import Link from "next/link";
import  Navbar  from "../../parts/navbar/page";// app/personal-details/page.js
import {API_BASE_URL} from "../../constants/config"
import { useState } from "react";



export default function Quotationdetails() {
console.log(API_BASE_URL);

  const data =  [
        {
            "LEGAL COSTS": [
                {
                    "id": 1,
                    "name": "OUR ESTIMATED FEES",
                    "type": 1
                },
                {
                    "id": 2,
                    "name": "FEE TO ACT FOR THE LENDER (PER LENDER)",
                    "type": 0
                },
                {
                    "id": 3,
                    "name": "STAMP DUTY FORM (IF APPLICABLE-PER TITLE)",
                    "type": 0
                },
                {
                    "id": 4,
                    "name": "BANK TRANSFER FEES (PER TRANSFER)",
                    "type": 0
                },
                {
                    "id": 5,
                    "name": "ADMIN & POSTAGE COSTS",
                    "type": 0
                }
            ]
        },
        {
            "DISBURSEMENT": [
                {
                    "id": 6,
                    "name": "LAND REGISTRY FEE",
                    "type": 1
                },
                {
                    "id": 7,
                    "name": "SEARCHES (TBC-DEPENDS ON LOCAL AUTHORITY)",
                    "type": 0
                },
                {
                    "id": 8,
                    "name": "ID CHECKS(PER PERSON)",
                    "type": 0
                },
                {
                    "id": 9,
                    "name": "INFOTRACK SDLT SUBMISSION FEE",
                    "type": 0
                },
                {
                    "id": 10,
                    "name": "LAND CHARGES SEARCH (PER TITLE)",
                    "type": 0
                },
                {
                    "id": 11,
                    "name": "BANKRUPTCY SEARCH (PER PERSON)",
                    "type": 0
                }
            ]
        },
        {
            "RATE OF STAMP DUTY": [
                {
                    "id": 12,
                    "name": "FIRST TIME BUYER",
                    "type": 1
                },
                {
                    "id": 13,
                    "name": "STANDARD RATE",
                    "type": 1
                },
                {
                    "id": 14,
                    "name": "HIGHER RATE",
                    "type": 1
                }
            ]
        }
    ]
  const [text, setText] = useState("");
  const handleSave = () => {
    console.log("Saved text:", text);
    // send to backend as plain text
  };
  
console.log(data);

  return (
 <div className="p-4">
      <label className="block text-gray-700 mb-2">Write your notes:</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-400"
        placeholder="Type something..."
      />
      <button
        onClick={handleSave}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save
      </button>
    </div>
  );

}