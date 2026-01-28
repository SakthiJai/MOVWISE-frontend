import React, { useEffect, useState, useRef } from "react";
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
import RemortagePropertyDetails from "./RemortagePropertyDetails";
import Select from "react-select";
// PropertyDetails.js
export default function PurchasePropertyDetails({
  quote,
  servicData,
  companydata,
  cardid,
  taxDetails,
  giftvalue,
}) {
  const [language, setlanguage] = useState([]);
  async function fetchapi() {
    try {
      const res = await getData(API_ENDPOINTS.languages);
      const language = res.users;
      console.log(language);
      setlanguage(language);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchapi();
  }, []);

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
            <h5 className="col-span-3 text-lg font font-semibold text-emerald-600 mb-4">Purchase Quote</h5>

      <div className="py-1 font text-sm">
        <div className="text-start">
          <h3 className="text-lg font-semibold text-emerald-600">
            Purchase Property Details
          </h3>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Stages</td>
              <td className="p-2 text-left font_size_13px">{servicData?.stages || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Town City</td>
              <td className="p-2 text-left font_size_13px">{servicData?.town_city || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Country</td>
              <td className="p-2 text-left font_size_13px">{servicData?.country || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Purchase Price</td>
              <td className="p-2 text-left font_size_13px">£{servicData?.purchase_price || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">No Of Bedrooms</td>
              <td className="p-2 text-left font_size_13px">{servicData?.no_of_bedrooms || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Leasehold Or Free</td>
              <td className="p-2 text-left font_size_13px">{servicData?.leasehold_or_free || "--"}</td>
            </tr>
            <tr className="border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Property Type</td>
              <td className="p-2 text-left font_size_13px">{servicData?.property_type || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">High Raise Support</td>
              <td className="p-2 text-left font_size_13px">{servicData?.purchase_high_raise_support == 0 ? "No" : "Yes"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Purchase Mode</td>
              <td className="p-2 text-left font_size_13px">{servicData?.purchase_mode || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Buy To Let</td>
              <td className="p-2 text-left font_size_13px">{servicData?.buy_to_let || "--"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Obtaining Mortgage</td>
              <td className="p-2 text-left font_size_13px">{servicData?.obtaining_mortgage == 0 ? "No" : "Yes"}</td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Gift Deposit</td>
              <td className="p-2 text-left font_size_13px">
                {servicData?.gift_deposit != null ? `${servicData.gift_deposit} Gift Deposit` : "--"}
              </td>
            </tr>
            <tr className="border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">Languages</td>
              <td className="p-2 text-left font_size_13px">
                {language.find((l) => l.id == servicData?.languages)?.language_name || "--"}
              </td>
            </tr>
            <tr className=" border-gray-200">
              <td className="p-2 font-semibold w-40 text-left font_size_13px">LTA ISA</td>
              <td className="p-2 text-left font_size_13px">{servicData?.purchase_lifetime_isa == 0 ? "No" : "Yes"}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold w-40 text-left font_size_13px">HMO Support</td>
              <td className="p-2 text-left font_size_13px">{servicData?.purchase_need_hmo == 0 ? "No" : "Yes"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="font_size_13px ">
        <div className=" font p-3 ">
          <h3
            className="text-lg text-start text-emerald-600 font-semibold  mb-3"
            onClick={() => {
              handleprice();
            }}
          >
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
                ?.filter(
                  (item) => item.conveying_details.conveying_id == cardid
                )
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-b border-gray-200">
                      <td className="p-2 text-sm font-semibold text-start text-emerald-600">{`Legal Fees`}</td>
                      <td className="p-2 text-sm text-right font-bold text-emerald-600">
                        {formatGBP( servicData?.taxInfo?.legal_fees||item.legal_fees)}
                      </td>
                      <td className="p-2 text-sm text-right text-emerald-600 font-bold">
                       
                         {formatGBP( servicData?.taxInfo?.vat||item.vat)}
                      </td>
                    </tr>

                    {Object.entries(taxDetails || {}).map(
                      ([category, items]) => (
                        <React.Fragment key={category}>
                          {/* Category Row */}
                          <tr className="bg-gray-50 border-b border-gray-300">
                            <td
                              className="p-2 font-semibold text-start text-sm"
                              colSpan={3}
                            >
                              {category}
                            </td>
                          </tr>

                          {items?.items.map((fee, i) =>
                            Number(fee.fee_amount) > 0 ? (
                              <tr
                                key={i}
                                className="border-b border-gray-200 text-start"
                              >
                                <td className="p-2 break-words text-sm ">
                                  {" "}
                                  <div className="ml-4">
                                    {" "}
                                    {/* margin-left works here */}
                                    {fee.fee_type ===
                                    "Gifted Deposit Supplement"
                                      ? `${fee.fee_type} (${servicData.gift_deposit})`
                                      : fee.fee_type}
                                  </div>
                                </td>
                                <td className="p-2 text-right text-sm">
                                  {formatGBP(fee.fee_amount)}
                                </td>
                                <td className="p-2 text-right text-sm">
                                  {formatGBP(Number(fee.vat))}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          )}

                          <tr className="border-b border-gray-200 text-start">
                            <td className="p-2 break-words text-sm font-bold">
                              {" "}
                              <div className="ml-4">
                                {" "}
                                {/* margin-left works here */}
                               {category}  Total
                              </div>
                            </td>

                            <td className="p-2 text-right text-sm font-bold">
                              {formatGBP(items.total)}
                            </td>
                            <td className="p-2 text-right text-sm font-bold">
                              {formatGBP(items.vat)}
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}

                    {/* Country-specific taxes */}

                    {/* TOTAL */}
                    <tr className="bg-gray-100 font-semibold ">
                                          <td className="p-2 text-start text-emerald-600 font-bold text-lg">Total </td>
                  
                                          <td className="p-2 text-right text-emerald-600 font-bold text-base">
                                          <span>
                                            {" "}
  {formatGBP(
    servicData?.taxInfo?.total ??
      (
        Number(quote.supplements || 0) +
        Number(quote.disbursements || 0) +
        Number(quote.legal_fees || 0)
      )
  )}
</span>

                                          </td>
                                          <td className="p-2 text-right text-emerald-600 font-bold text-base">
                                            <span>  {formatGBP( servicData?.taxInfo?.vat||quote.total_vat)}</span>
                                          </td>
                  
                                          {/* <td className="p-2 text-right text-emerald-600 font_size_13px" > {formatGBP(Number(item.vat))}</td> */}
                                        </tr>

                 <>
                    {quote.service_details.length > 1 && (
                       <>
                        {(quote.service_details[1].country === "England" ||
                          quote.service_details[1].country ===
                            "Northern Ireland") && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 text-start font-semibold">Stamp Duty</td>
                            <td className="p-2 text-right">
                              {formatGBP(item.stamp_duty)}
                            </td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[1].country == "Scotland" && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 font-semibold">LBTT</td>
                            <td className="p-2 text-right">{formatGBP(item.lbtt)}</td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[1].country == "Wales" && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 font-semibold">LLT</td>
                            <td className="p-2 text-right">{formatGBP(item.llt)}</td>
                            <td></td>
                          </tr>
                        )}
                      </>
                    )}
                    
                    {quote.service_details.length === 1 && (
                         <>
                        {(quote.service_details[0].country === "England" ||
                          quote.service_details[0].country ===
                            "Northern Ireland") && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 text-start font-semibold">Stamp Duty</td>
                            <td className="p-2 text-right">
                              {formatGBP(item.stamp_duty)}
                            </td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[0].country == "Scotland" && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 font-semibold">LBTT</td>
                            <td className="p-2 text-right">{formatGBP(item.lbtt)}</td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[0].country == "Wales" && (
                          <tr className="border-b border-gray-200 font pt-1">
                            <td className="p-2 font-semibold">LLT</td>
                            <td className="p-2 text-right">{formatGBP(item.llt)}</td>
                            <td></td>
                          </tr>
                        )}
                      </>
                    )}
                  </>
                 
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
