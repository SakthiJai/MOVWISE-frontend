
// PropertyDetails.js
import React, { useEffect, useState,useRef } from "react";
import DOMPurify from "dompurify";
import Navbar from "../../parts/navbar/page";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import Swal from "sweetalert2";
import { formatGBP } from "../utility/poundconverter";

import { Check, Rows, X } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import Footer from "../../parts/Footer/footer";
import SalesPurchasePropertyDetails from "./Sales_Purchase_PropertyDetails";
import Select from 'react-select';

export default function RemortagePropertyDetails({quote, servicData,companydata,cardid,taxDetails,giftvalue }) {

  return (
      <div className="grid grid-cols-[0.5fr_1fr] p-1 border font  rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes  font_size_13px"  style={{
                                  backgroundColor: 'white', 
                                  color: 'black',
                                  padding: '24px',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                  fontFamily: 'Arial, sans-serif',
                                  lineHeight: '1.6',
                                  maxWidth: '100%',
                                  overflow: 'auto'
                                }}>
            <h5 className="col-span-2 text-lg font-semibold font text-emerald-600 mb-10">Remortage Quote</h5>

    <div className="font text-sm">
                                      <div className="text-emerald-600 text-start font_size_13px">
                                        <h3 className="text-lg font-semibold">
                                          Property Details
                                        </h3>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Address
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.address || "--"}
                                        </span>
                                      </div>
                                      <div className="flex"> 
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                         Town City
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.town_city || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Country
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.country || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                           Property Values
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.property_values || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          No Of Bedrooms
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Leasehold Or Free
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Property Type
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.property_type || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Buy To Let
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.buy_to_let || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Ownership Housing Asso
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.ownership_housing_asso || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                         Obtaining Mortgage
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.obtaining_mortgage || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Languages
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.languages || "--"}
                                        </span>
                                      </div>
                                       
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left font_size_13px">
                                          Lenders
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.lenders || "--"}
                                        </span>
                                      </div>


                                    </div>
                                    
                   <div className="col-span-1 ">
                                                                                           
                                                                                           
                                                                                     <div className=" font p-3 ">
                                                                                  <h3 className="text-lg text-start text-emerald-600 font-semibold  mb-3" onClick={()=>{
                                                                                              handleprice()
                                                                                            }}>
                                                                                    Fee Breakdown
                                                                                  </h3>
                                                                                
                                                                                  <table className="w-full border-collapse text-black font">
                                                                                    <thead>
                                                                                      <tr className="border-b border-gray-300 text-left">
                                                                                        <th className="p-2 w-1/2">Type</th>
                                                                                        <th className="p-2 w-1/4 text-right">Fee Amount</th>
                                                                                        <th className="p-2 w-1/4 text-right">VAT</th>
                                                                                      </tr>
                                                                                    </thead>
                                                                                
                                                                                    <tbody>
                                                                                      {companydata
                                                                                        ?.filter((item) => item.conveying_details.conveying_id == cardid)
                                                                                        .map((item, index) => (
                                                                                          <React.Fragment key={index}>
                                                                                          
                                                                                            <tr className="border-b border-gray-200" >
                                                                                              <td className="p-2 text-sm  text-start font_size_13px text-emerald-600 font-bold">{`Legal Fees`}</td>
                                                                                              <td className="p-2 text-sm text-right  font_size_13px text-emerald-600 font-bold">{formatGBP(item.legal_fees)}</td>
                                                                                              <td className="p-2 text-sm text-right font_size_13px text-emerald-600 font-bold">
                                                                                                {formatGBP(item.vat)}
                                                                                              </td>
                                                                                            </tr>
                                                                                
                                                                                        
                                                                                           
                                                                  {Object.entries(taxDetails || {}).map(([category, items]) => (
                                                                    <React.Fragment key={category}>
                                                                      {/* Category Row */}
                                                                      <tr className="bg-gray-50 border-b border-gray-300">
                                                                        <td className="p-2 font-semibold text-start text-sm font_size_13px" colSpan={3}>
                                                                          {category}
                                                                        </td>
                                                                      </tr>
                                                      
                                                                      {items?.items.map((fee, i) =>  Number(fee.fee_amount) > 0 ? (
                                                                        <tr key={i} className="border-b border-gray-200 text-start">
                                                                          <td className="p-2 break-words text-sm font_size_13px"> <div className="ml-4"> {/* margin-left works here */}
                                                             {
                                                        fee.fee_type === "Gifted Deposit Supplement"
                                                          ? `${fee.fee_type} (${giftvalue})`
                                                          : fee.fee_type
                                                      }
                                                      
                                                            </div></td>
                                                                          <td className="p-2 text-right text-sm font_size_13px">
                                                                            {formatGBP(fee.fee_amount)}
                                                                          </td>
                                                                          <td className="p-2 text-right text-sm">{formatGBP(Number(fee.vat))}</td>
                                                                        </tr>
                                                                      ):"")}
                                                                        
                                                                      <tr  className="border-b border-gray-200 text-start">
                                                                          <td className="p-2 break-words text-sm font_size_13px font-bold"> <div className="ml-4"> {/* margin-left works here */}
                                                             {category}  Total 
                                                            </div></td>
                                                          
                                                                          <td className="p-2 text-right text-sm font_size_13px font-bold">
                                                                            {formatGBP(items.total)}
                                                                          </td> 
                                                                           <td className="p-2 text-right text-sm font-bold">
                                                                              {formatGBP(items.vat)}
                                                                            </td>
                                                                        </tr>
                                                      
                                                                    
                                                            
                                                                     
                                                                      
                                                                    </React.Fragment>
                                                                  ))}
                                                      
                                                                  
                                                                                
                                                                                            {/* Country-specific taxes */}
                                                                                            
                                                                                
                                                                                            {/* TOTAL */}
                                                                                            <tr className="bg-gray-100 font-semibold text-gray-800">
                                                                                              <td className="p-2 text-start">Total </td>
                                                                                              <td className="p-2 text-right text-emerald-600">
                                                                                               {formatGBP(
                                                        Number(quote.supplements || 0) +
                                                        Number(quote.disbursements || 0) +
                                                        Number(quote.legal_fees || 0)
                                                      )}
                                                    
                                                                                               
                                                                                              </td>
                                                                                              <td className="p-2 text-right text-emerald-600">
                                                                                                                                                                             <span>    {
                                                                                                                                  formatGBP( quote.total_vat) 
                                                                                                                                  }</span>
                                                                                                                                                                          </td>
                                                                                            </tr>
                                                                                           
                                                                                             {item.service_details[0].service_type == 2 && (
                                                                                              <>
                                                                                                {(quote.service_details[0].country === "England" ||
                                                              quote.service_details[0].country === "Northern Ireland") && (
                                                                                                  <tr className="border-b border-gray-200">
                                                                                                    <td className="p-2 text-start">Stamp Duty</td>
                                                                                                    <td className="p-2 text-right">
                                                                                                      {formatGBP(item.stamp_duty)}
                                                                                                    </td>
                                                                                                    <td></td>
                                                                                                  </tr>
                                                                                                )}
                                                                                
                                                                                                {item.service_details[0].country == "Scotland" && (
                                                                                                  <tr className="border-b border-gray-200">
                                                                                                    <td className="p-2">LBTT</td>
                                                                                                    <td className="p-2 text-right">{formatGBP(item.lbtt)}</td>
                                                                                                    <td></td>
                                                                                                  </tr>
                                                                                                )}
                                                                                
                                                                                                {item.service_details[0].country == "Wales" && (
                                                                                                  <tr className="border-b border-gray-200">
                                                                                                    <td className="p-2">LLT</td>
                                                                                                    <td className="p-2 text-right">{formatGBP(item.llt)}</td>
                                                                                                    <td></td>
                                                                                                  </tr>
                                                                                                )}
                                                                                              </>
                                                                                            )}
                                                                                     
                                                                                           
                                                                                          </React.Fragment>
                                                                                        ))}
                                                                                    </tbody>
                                                                                  </table>
                                                                                </div>
                                                                             
                                     </div>
                                     </div>
  );
}
