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
import PurchasePropertyDetails from "./PurchasePropertyDetails";
import SalesPurchasePropertyDetails from "./Sales_Purchase_PropertyDetails";
import RemortagePropertyDetails from "./RemortagePropertyDetails";
import Select from "react-select";

// PropertyDetails.js
export default function SalesPropertyDetails({
  quote,
  servicData,
  companydata,
  cardid,
  taxDetails,
  giftvalue,
  
}) {
  const [language, setlanguage] = useState([]);
  console.log("sales");

  async function fetchapi() {
    try {
      const res = await getData(API_ENDPOINTS.languages);
      const language = res.users;
      console.log(taxDetails);
      setlanguage(language);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr]  p-4 mt-5  border-1 ">
      <h5 className="col-span-3 text-lg font-semibold text-emerald-600 mb-10">Sales Quote</h5>
<div className=""></div>
      <div className="py-1   text-sm ">
        <div className="text-start">
          <h3 className="text-lg font-semibold text-emerald-600">
            Sales Property Details
          </h3>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Stages</span>
          <span className=" text-left">{servicData?.sales_stages || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Town City</span>
          <span className="">{servicData?.sales_town_city || "--"}</span>
        </div>

        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Country</span>
          <span className="">{servicData?.sales_country || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Price</span>
          <span className="">£{servicData?.sales_price || "--"}.00</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">No Of Bedrooms</span>
          <span className="">{servicData?.sales_no_of_bedrooms || "--"}</span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">
            Leasehold Or Free
          </span>
          <span className="">
            {servicData?.sales_leasehold_or_free || "--"}
          </span>
        </div>
        <div className="flex font_size_13px">
          <span className="font-semibold w-40 text-left">Property Type</span>
          <span className="">{servicData?.sales_property_type || "--"}</span>
        </div>
        <div className="flex">
          <span className="font-semibold w-40 text-left">Shared Ownership</span>
          <span className="">{servicData?.shared_ownership || "--"}</span>
        </div>

        <div className="flex mt-3 font_size_13px">
          <span className="font-semibold w-40 text-left">
            Existing Mortgage
          </span>
          <span className=" ">
            {servicData?.existing_mortgage === 1 ? "Yes" : "No"}
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
          <span className="font-semibold w-40 text-left">Lenders</span>
          <span className="">{servicData?.lenders || "--"}</span>
        </div>
      </div>
      <div className="">
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

            <tbody >
              {companydata
                ?.filter(
                  (item) => item.conveying_details.conveying_id == cardid
                )
                .map((item, index) => (
                  <React.Fragment key={index} >
                    <tr className="border-b border-gray-200 font_size_13px">
                      <td className="p-2 text-sm font-semibold text-start font_size_13px ">{`Legal Fees`}</td>
                      <td className="p-2 text-sm text-right font-bold font_size_13px">
                        {formatGBP(item.legal_fees)}
                      </td>
                      <td className="p-2 text-sm text-right font_size_13px">
                        {formatGBP(item.vat)}
                      </td>
                    </tr>

                    {Object.entries(taxDetails || {}).map(
                      ([category, items]) => (
                        <React.Fragment key={category}>
                          {/* Category Row */}
                          <tr className="bg-gray-50 border-b border-gray-300">
                            <td
                              className="p-2 font-semibold text-start text-sm font_size_13px"
                              colSpan={3}
                            >
                              {category}
                            </td>
                          </tr>

                          {items?.items.map((fee, i) =>
                            Number(fee.fee_amount) > 0 ? (
                              <tr
                                key={i} 
                                className="border-b border-gray-200 text-start font_size_13px"
                              >
                                <td className="p-2 break-words text-sm ">
                                  {" "}
                                  <div className="ml-4 font_size_13px">
                                    {" "}
                                    {/* margin-left works here */}
                                    {fee.fee_type ===
                                    "Gifted Deposit Supplement"
                                      ? `${fee.fee_type} (${giftvalue})`
                                      : fee.fee_type}
                                  </div>
                                </td>
                                <td className="p-2 text-right text-sm font_size_13px">
                                  {formatGBP(fee.fee_amount)}
                                </td>
                                <td className="p-2 text-right text-sm font_size_13px">
                                  {formatGBP(Number(fee.vat))}
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          )}

                          <tr className="border-b border-gray-200 text-start">
                            <td className="p-2 break-words text-sm ">
                              {" "}
                              <div className="ml-4 font_size_13px">
                                {" "}
                                {/* margin-left works here */}
                                Total
                              </div>
                            </td>

                            <td className="p-2 text-right text-sm font_size_13px">
                              {formatGBP(items.total)}
                            </td>
                             <td className="p-2 text-right text-sm">
                              {formatGBP(items.vat)}
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}

                    {/* Country-specific taxes */}

                    {/* TOTAL */}
                    
                      <tr className="bg-gray-100 font-semibold text-gray-800">
                        <td className="p-2 text-start">Total </td>

                        <td className="p-2 text-right text-emerald-600 ">
                          <span>
                            {" "}
                            {formatGBP(
                              Number(quote.supplements || 0) +
                                Number(quote.disbursements || 0) +
                                Number(quote.legal_fees || 0)
                            )}
                          </span>
                        </td>
                        <td className="p-2 text-right text-emerald-600">
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
                            <td className="p-2 text-start font_size_13px">Stamp Duty</td>
                            <td className="p-2 text-right">
                              {formatGBP(item.stamp_duty)}
                            </td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[0].country == "Scotland" && (
                          <tr className="border-b border-gray-200">
                            <td className="p-2 font_size_13px">LBTT</td>
                            <td className="p-2 text-right font_size_13px">{formatGBP(item.lbtt)}</td>
                            <td></td>
                          </tr>
                        )}

                        {item.service_details[0].country == "Wales" && (
                          <tr className="border-b border-gray-200">
                            <td className="p-2 font_size_13px">LLT</td>
                            <td className="p-2 text-right font_size_13px">{formatGBP(item.llt)}</td>
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
