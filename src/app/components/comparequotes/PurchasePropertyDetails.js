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
  handleprice,
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
    <div
      className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] p-1 border font rounded-lg bg-white shadow px-6 py-2 mb-2 gap-3 quotes font_size_13px"
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        maxWidth: "100%",
        overflow: "auto",
      }}
    >
      <h5 className="col-span-1 md:col-span-3 text-lg font font-semibold text-emerald-600 mb-4">
        Purchase Quote
      </h5>

      {/* Left Column */}
      <div className="py-1 font text-sm">
        <div className="text-start">
          <h3 className="text-lg font-semibold text-emerald-600">
            Purchase Property Details
          </h3>
        </div>

        <div className="overflow-x-auto md:overflow-visible">
          <table className="w-full border-collapse min-w-[360px] md:min-w-0">
            <tbody>
              {[
                ["Stages", servicData?.stages],
                ["Town City", servicData?.town_city],
                ["Country", servicData?.country],
                ["Purchase Price", `£${servicData?.purchase_price || "--"}`],
                ["No Of Bedrooms", servicData?.no_of_bedrooms],
                ["Leasehold Or Free", servicData?.leasehold_or_free],
                ["Property Type", servicData?.property_type],
                ["High Raise Support", servicData?.purchase_high_raise_support == 0 ? "No" : "Yes"],
                ["Purchase Mode", servicData?.purchase_mode],
                ["Buy To Let", servicData?.buy_to_let],
                ["Obtaining Mortgage", servicData?.obtaining_mortgage == 0 ? "No" : "Yes"],
                ["Gift Deposit", servicData?.gift_deposit != null ? `${servicData.gift_deposit} Gift Deposit` : "--"],
                ["Languages", language.find((l) => l.id == servicData?.languages)?.language_name || "--"],
                ["LTA ISA", servicData?.purchase_lifetime_isa == 0 ? "No" : "Yes"],
                ["HMO Support", servicData?.purchase_need_hmo == 0 ? "No" : "Yes"],
              ].map(([label, value], i) => (
                <tr key={i} className="border-gray-200 block md:table-row mb-2 md:mb-0">
                  <td className="p-2 font-semibold w-full md:w-40 text-left font_size_13px block md:table-cell">
                    {label}
                  </td>
                  <td className="p-2 text-left font_size_13px block md:table-cell break-words">
                    {value || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column */}
      <div className="font_size_13px">
        <div className="font p-3">
          <h3
            className="text-lg text-start text-emerald-600 font-semibold mb-3 cursor-pointer"
            onClick={handleprice}
          >
            Fee Breakdown
          </h3>

          <div className="overflow-x-auto md:overflow-visible">
            <table className="w-full border-collapse text-black font min-w-[520px] md:min-w-0">
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
                      <tr className="border-b border-gray-200 font_size_13px">
                        <td className="p-2 text-sm font-semibold text-start text-emerald-600">
                          Legal Fees
                        </td>
                        <td className="p-2 text-sm text-right font-bold text-emerald-600">
                          {formatGBP(servicData?.taxInfo?.legal_fees || item.legal_fees)}
                        </td>
                        <td className="p-2 text-sm text-right text-emerald-600 font-bold">
                          {formatGBP(servicData?.taxInfo?.vat || item.vat)}
                        </td>
                      </tr>

                      {Object.entries(taxDetails || {}).map(([category, items]) => (
                        <React.Fragment key={category}>
                          <tr className="bg-gray-50 border-b border-gray-300">
                            <td className="p-2 font-semibold text-start" colSpan={3}>
                              {category}
                            </td>
                          </tr>

                          {items?.items.map(
                            (fee, i) =>
                              Number(fee.fee_amount) > 0 && (
                                <tr key={i} className="border-b border-gray-200">
                                  <td className="p-2 break-words text-sm">
                                    <div className="ml-4 break-words">
                                      {fee.fee_type === "Gifted Deposit Supplement"
                                        ? `${fee.fee_type} (${servicData.gift_deposit})`
                                        : fee.fee_type || fee.others}
                                    </div>
                                  </td>
                                  <td className="p-2 text-right text-sm">
                                    {formatGBP(fee.fee_amount)}
                                  </td>
                                  <td className="p-2 text-right text-sm">
                                    {formatGBP(Number(fee.vat))}
                                  </td>
                                </tr>
                              )
                          )}

                          <tr className="border-b border-gray-200">
                            <td className="p-2 break-words text-sm font-bold">
                              <div className="ml-4">{category} Total</div>
                            </td>
                            <td className="p-2 text-right text-sm font-bold">
                              {formatGBP(items.total)}
                            </td>
                            <td className="p-2 text-right text-sm font-bold">
                              {formatGBP(items.vat)}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}

                      <tr className="bg-gray-100 font-semibold">
                        <td className="p-2 text-start text-emerald-600 font-bold text-lg">
                          Total
                        </td>
                        <td className="p-2 text-right text-emerald-600 font-bold">
                          {formatGBP(
                            servicData?.taxInfo?.total ??
                            Number(quote.supplements || 0) +
                            Number(quote.disbursements || 0) +
                            Number(quote.legal_fees || 0)
                          )}
                        </td>
                        <td className="p-2 text-right text-emerald-600 font-bold">
                          {formatGBP(servicData?.taxInfo?.vat || quote.total_vat)}
                        </td>
                      </tr>
                      <>
                        {quote.service_details.length > 1 && (
                          <>
                            {(quote.service_details[1].country === "England" ||
                              quote.service_details[1].country ===
                              "Northern Ireland") && (
                                <tr className="border-b border-gray-200 font pt-1">
                                  <td className="p-2 text-center font-semibold">Stamp Duty</td>
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
                                  <td className="p-2 text-center font-semibold">Stamp Duty</td>
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
    </div>
  );

}
