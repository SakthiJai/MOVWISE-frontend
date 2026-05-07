
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

export default function RemortagePropertyDetails({quote, servicData,companydata,cardid,taxDetails,giftvalue,language,lenders,handleprice,hide }) {
    // const [language, setlanguage] = useState([]);
    // async function fetchapi() {
    //   try {
    //     const res = await getData(API_ENDPOINTS.languages);
    //     const language = res.users;
    //     console.log(language);
    //     setlanguage(language);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }


// const [lendersList, setLendersList] = useState([]);

// useEffect(() => {
//   const fetchLenders = async () => {
//     try {
//       const res = await getData(API_ENDPOINTS.lenders);
//       setLendersList(res?.users || []);
//     } catch (err) {
//       console.log("Lenders API error:", err);
//       setLendersList([]);
//     }
//   };

//   fetchLenders();
// }, []);

// const lenderNames = React.useMemo(() => {
//   if (String(servicData?.obtaining_mortgage) !== "1") return "0";
//   if (!Array.isArray(lendersList) || lendersList.length === 0) return "--";

//   const raw = servicData?.lenders;
//   if (!raw) return "--";

//   const ids = Array.isArray(raw)
//     ? raw
//     : String(raw)
//         .replace(/[\[\]"]+/g, "")
//         .split(",")
//         .map(i => i.trim())
//         .filter(Boolean);

//   const names = ids
//     .map(id =>
//       lendersList.find(l => String(l.id) === String(id))?.lenders_name
//     )
//     .filter(Boolean);

//   return names.length ? names.join(", ") : "--";
// }, [servicData?.lenders, servicData?.obtaining_mortgage, lendersList]);
return (
  <div
    className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] p-1 border font rounded-lg bg-white shadow px-6 py-2 mb-2 gap-3 quotes font_size_13px"
    style={{
      backgroundColor: "white",
      color: "black",
      padding: "24px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      maxWidth: "100%",
      overflow: "auto",
    }}
  >
    {/* TITLE */}
    <h5 className="col-span-1 md:col-span-3 text-lg font font-semibold text-emerald-600 mb-4 py-1">
      Remortgage Quote
    </h5>

    {/* LEFT SIDE - PROPERTY DETAILS */}
    <div className="py-2 font text-sm">
      <div className="text-start mb-4">
        <h3 className="text-lg font-semibold text-emerald-600">
          Property Details
        </h3>
      </div>

      <div className="remortgage-ui-details no-pdf py-6">
        <table
          className="w-full"
          style={{
            tableLayout: "fixed",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            {[
              ["Address", servicData?.address],
              ["Town City", servicData?.town_city],
              ["Country", servicData?.country],
              ["Property Value", servicData?.property_values],
              ["No Of Bedrooms", servicData?.no_of_bedrooms],
              ["Leasehold Or Free", servicData?.leasehold_or_free],
              ["Property Type", servicData?.property_type],
              ["Buy To Let", servicData?.buy_to_let],
              ["Ownership Housing Asso", servicData?.ownership_housing_asso == 1 ? "Yes" : "No"],
              

              [
                "Obtaining Mortgage",
                Number(servicData?.obtaining_mortgage) === 0
                  ? "No"
                  : servicData?.lenders?.length
                  ? servicData.lenders
                      .map(
                        (id) =>
                          lenders?.find(
                            (l) => String(l.id) === String(id)
                          )?.lenders_name
                      )
                      .filter(Boolean)
                      .join(", ")
                  : "--",
              ],

              [
                "Languages",
                language?.find(
                  (l) => String(l.id) === String(servicData?.languages)
                )?.language_name || "--",
              ],
            ].map(([label, value], i) => (
              <tr key={i}>
                <td
                  style={{
                    width: "220px",
                    fontWeight: "600",
                    padding: "6px 10px 6px 0",
                    verticalAlign: "top",
                    textAlign: "left",
                  }}
                >
                  {label}:
                </td>

                <td
                  style={{
                    padding: "6px 0",
                    wordBreak: "break-word",
                    textAlign: "left",
                  }}
                >
                  {value || "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="remortgage-pdf-summary pdf-only" style={{ padding: "12px 0" }}>
        <p style={{ fontSize: "13px", lineHeight: "1.8" }}>
          {servicData?.country || "--"}, remortgage for property value <strong>£{servicData?.property_values || "--"}</strong>, <strong>{servicData?.leasehold_or_free || "--"}</strong>, {servicData?.property_type || "--"}, Buy to let:<strong>{servicData?.buy_to_let || "--"}</strong>, Obtaining Mortgage: <strong>
          {Number(servicData?.obtaining_mortgage) === 1
            ? servicData?.lenders?.length
              ? servicData.lenders
                  .map((id) =>
                    lenders?.find((l) => String(l.id) === String(id))?.lenders_name
                  )
                  .filter(Boolean)
                  .join(", ")
              : "Yes"
            : "No"}
          </strong>
          {/* {servicData && (
  <>
    , <strong>{servicData.gift_deposit ?? 0}</strong> Gift Deposited
  </>
)} */}
          {language?.find((l) => String(l.id) === String(servicData?.languages))?.language_name && (
            <> , <strong>{language.find((l) => String(l.id) === String(servicData?.languages))?.language_name}</strong></>
          )}.
        </p>
      </div>
    </div>

    {/* RIGHT SIDE - FEE BREAKDOWN */}
    <div className="font_size_13px mt-6 md:mt-0" style={{ pageBreakBefore: "always" }}>
      <div className="font p-3">
        <h3 className="text-lg text-start text-emerald-600 font-semibold mb-3">
          Fee Breakdown
        </h3>

        <table className="pdf-fee-table w-full border-collapse text-black font min-w-[520px] md:min-w-0">
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
                (item) =>
                  item.conveying_details.conveying_id == cardid
              )
              .map((item, index) => (
                <React.Fragment key={index}>
                  {/* Legal Fees */}
                  <tr className="border-b border-gray-200 font_size_13px">
                    <td className="p-2 text-sm font-semibold text-start text-emerald-600">
                      Legal Fees
                    </td>
                    <td className="p-2 text-right text-sm font-bold text-emerald-600">
                      {formatGBP(item.legal_fees)}
                    </td>
                    <td className="p-2 text-right text-sm text-emerald-600 font-bold">
                      {formatGBP(item.vat)}
                    </td>
                  </tr>

                  {/* Categories */}
                  {Object.entries(taxDetails || {}).map(
                    ([category, items]) => (
                      <React.Fragment key={category}>
                        <tr className="bg-gray-50 border-b border-gray-300">
                          <td className="p-2 font-semibold text-start" colSpan={3}>
                            {category}
                          </td>
                        </tr>

                        {items?.items.map((fee, i) =>
                          Number(fee.fee_amount) > 0 ? (
                            <tr
                              key={i}
                              className="border-b border-gray-200 text-start"
                            >
                              <td className="p-2 break-words text-sm">
                                <div className="ml-4 break-words">
                                  {fee.fee_type === "Gifted Deposit Supplement"
                                    ? `${fee.fee_type} (${giftvalue})`
                                    : fee.fee_type || fee.others || "--"}
                                </div>
                              </td>

                              <td className="p-2 text-right text-sm">
                                {formatGBP(fee.fee_amount)}
                              </td>

                              <td className="p-2 text-right text-sm">
                                {formatGBP(Number(fee.vat))}
                              </td>
                            </tr>
                          ) : null
                        )}

                        {/* Category Total */}
                        <tr className="border-b border-gray-200">
                          <td className="p-2 break-words text-sm font-bold text-start">
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
                    )
                  )}

                  {/* FINAL TOTAL */}
                  <tr className="bg-gray-100 font-semibold text-start">
                    <td className="p-2 text-start text-emerald-600 font-bold text-lg">
                      Total
                    </td>
                    <td className="p-2 text-right text-emerald-600 font-bold">
                      {formatGBP(
                        Number(item.legal_fees || 0) +
                          Number(item.disbursements || 0)
                      )}
                    </td>
                    <td className="p-2 text-right text-emerald-600 font-bold">
                      {formatGBP(item.vat)}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
