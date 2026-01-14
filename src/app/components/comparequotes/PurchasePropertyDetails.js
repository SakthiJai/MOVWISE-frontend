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
    <div className="grid grid-cols-[0.5fr_1fr] p-4 border-1 mt-3 font_size_13px">
            <h5 className="col-span-3 text-lg font-semibold text-emerald-600 mb-10">Purchase Quote</h5>

      <div className=" text-sm">
        <div className="text-emerald-600 text-start font_size_13px">
          <h3 className="text-lg font-semibold ">Purchase Property Details</h3>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px ">Stages</span>
          <span className="">{servicData?.stages || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">Town_city</span>
          <span className="">{servicData?.town_city || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">Country</span>
          <span className="">{servicData?.country || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">Purchase Price</span>
          <span className="">£{servicData?.purchase_price || "--"}</span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">No Of Bedrooms</span>
          <span className="">{servicData?.no_of_bedrooms || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">
            Leasehold Or Free
          </span>
          <span className="">{servicData?.leasehold_or_free || "--"}</span>
        </div> 
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left font_size_13px">Property Type</span>
          <span className="">{servicData?.property_type || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">
            High Raise Support
          </span>
          <span className="">
            {servicData?.purchase_high_raise_support == 0 ? "No" : "Yes"}
          </span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Purchase Mode</span>
          <span className="">{servicData?.purchase_mode || "--"}</span>
        </div>

        <div className="flex mt-3 font_size_13px">
          <span className="font-semibold w-40 text-left">Buy To Let</span>
          <span className="">{servicData?.buy_to_let || "--"}</span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">
            Obtaining Mortgage
          </span>
          <span className="">
            {servicData?.obtaining_mortgage == 0 ? "No" : "Yes"}
          </span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Gift Deposit</span>
          <span className="">
            {servicData?.gift_deposit != null
              ? `${servicData.gift_deposit} Gift Deposit`
              : "--"}
          </span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Languages</span>
          <span>
            {language.find((l) => l.id == servicData?.languages)
              ?.language_name || "--"}
          </span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">
            Life Time Support
          </span>
          <span className="">
            {servicData?.purchase_lifetime_isa == 0 ? "No" : "Yes"}
          </span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">HMO Support</span>
          <span className="">
            {servicData?.purchase_need_hmo == 0 ? "No" : "Yes"}
          </span>
        </div>
      </div>

      <div className="font_size_13px ">
        <div className=" p-3 ">
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
                        {formatGBP(item.legal_fees)}
                      </td>
                      <td className="p-2 text-sm text-right text-emerald-600 font-bold">
                        {formatGBP(item.vat)}
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
                                Total
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
                                                Number(quote.supplements || 0) +
                                                  Number(quote.disbursements || 0) +
                                                  Number(quote.legal_fees || 0)
                                              )}
                                            </span>
                                          </td>
                                          <td className="p-2 text-right text-emerald-600 font-bold text-base">
                                            <span> {formatGBP(quote.total_vat)}</span>
                                          </td>
                  
                                          {/* <td className="p-2 text-right text-emerald-600 font_size_13px" > {formatGBP(Number(item.vat))}</td> */}
                                        </tr>

                    {item.service_details[0].service_type == 2 && (
                      <>
                        {(quote.service_details[0].country === "England" ||
                          quote.service_details[0].country ===
                            "Northern Ireland") && (
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
