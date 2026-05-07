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
  language,
  lenders,
  hide,
  handleprice,isPdf   // ✅ add this
}) {
 console.log("lenders in SalesPropertyDetails:", lenders);
// const [lendersList, setLendersList] = useState([]);
// useEffect(() => {
//   const fetchLenders = async () => {
//     try {
//       const res = await getData(API_ENDPOINTS.lenders);
//       setLendersList(res?.users || []);
//     } catch (err) {
//       console.log(err);
//       setLendersList([]);
//     }
//   };

//   fetchLenders();
// }, []);
// const lenderNames = React.useMemo(() => {
//   if (String(servicData?.existing_mortgage) !== "1") return "No";
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
// }, [servicData?.lenders, servicData?.existing_mortgage, lendersList]);

const getLenderNames = (field) => {
  const raw = servicData?.[field];

  if (String(servicData?.existing_mortgage) === "0") return "No";
  if (!raw || !lenders?.length) return "--";

  const ids = Array.isArray(raw)
    ? raw
    : String(raw)
        .replace(/[\[\]"]+/g, "")
        .split(",")
        .map(i => i.trim())
        .filter(Boolean);

  const names = ids
    .map(id =>
      lenders.find(l => String(l.id) === String(id))?.lenders_name
    )
    .filter(Boolean);

  return names.length ? names.join(", ") : "--";
};


const pdfRef = useRef(null);
const downloadPDF = () => {
  const element = pdfRef.current;

  const opt = {
    margin: 10,
    filename: `sales-quote-${quote?.id || "quote"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" }
  };

  html2pdf().set(opt).from(element).save();
};
return (
    <div ref={pdfRef} className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] p-1 border font rounded-lg bg-white shadow px-6 py-2 mb-2 gap-3 quotes font_size_13px" style={{
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
      <h5 className="col-span-1 md:col-span-3 text-lg font font-semibold text-emerald-600 mb-4 py-1">Sales Quote</h5>
      <div className="py-2 font text-sm">
        <div className="text-start mb-4">
          <h3 className="text-lg font-semibold text-emerald-600">
            Sales Property Details
          </h3>
        </div>
       
        <div className="sales-ui-details no-pdf py-6">
  <table
    className="w-full"
    style={{
      tableLayout: "fixed",
      borderCollapse: "collapse"
    }}
  >
    <tbody>
      {[
        ["Stages", servicData?.sales_stages],
        ["Town City", servicData?.sales_town_city],
        ["Country", servicData?.sales_country],
        ["Price", `£${servicData?.sales_price || "--"}`],
        ["No Of Bedrooms", servicData?.sales_no_of_bedrooms],
        ["Leasehold Or Free", servicData?.sales_leasehold_or_free],
        ["Property Type", servicData?.sales_property_type],
        ["Shared Ownership", servicData?.shared_ownership],

        // Existing Mortgage (same style as purchase)
     ["Existing Mortgage", getLenderNames("lenders")],
    //  ["Existing Mortgage",servicData?.existing_mortgage === 0? "No": servicData?.lenders?.length
    //   ? servicData.lenders.map((id) =>lenders?.find((l) => l.id === id)?.lenders_name )
    //       .filter(Boolean).join(", "): "--"],


        [
          "Languages",
          language?.find((l) => l.id == servicData?.languages)
            ?.language_name || "--",
        ],
      ].map(([label, value], i) => (
        <tr key={i}>
          <td
            style={{
              width: "220px",
              fontWeight: "600",
              padding: "6px 10px 6px 0",
              verticalAlign: "top", textAlign: "left"
            }}
          >
            {label}:
          </td>

          <td
            style={{
              padding: "6px 0",
              wordBreak: "break-word", textAlign: "left"
            }}
          >
            {value || "--"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


<div className="sales-pdf-summary pdf-only" style={{ padding: "12px 0" }}>
  <p style={{ fontSize: "13px", lineHeight: "1.8" }}>
    
    {servicData?.sales_stages || "--"}{" "}
    <strong>{servicData?.sales_country || "--"}</strong>,{" "}
    
    Sales Price <strong>£{servicData?.sales_price || "--"}</strong>,{" "}
    
    <strong>{servicData?.sales_leasehold_or_free || "--"}</strong>,{" "}
    
    <strong>{servicData?.sales_property_type || "--"}</strong>

    , Existing Mortgage:{" "}
    <strong>
      {servicData?.existing_mortgage == 1 || servicData?.existing_mortgage === true
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

    {servicData?.shared_ownership && (
      <>
        , <strong>{servicData.shared_ownership}</strong>
      </>
    )}

    {language?.find((l) => l.id == servicData?.languages)?.language_name && (
      <>
        , <strong>
          {language.find((l) => l.id == servicData?.languages)?.language_name}
        </strong>
      </>
    )}

    .
  </p>
</div>

{/* <div className="purchase-pdf-summary" style={{ padding: "12px 0", fontSize: "13px", lineHeight: "1.8" }}>
  <p>
    {servicData?.sales_stages || "--"}{" "}
    <strong>{servicData?.sales_country || "--"}</strong>,{" "}
    Sales Price <strong>£{servicData?.sales_price || "--"}</strong>,{" "}
    <strong>{servicData?.sales_leasehold_or_free || "--"}</strong>,{" "}

    <strong>
      {servicData?.purchase_mode === "firstTime"
        ? "First-Time Buyer"
        : servicData?.purchase_mode === "additional"
        ? "Additional Property (Second Home)"
        : servicData?.purchase_mode === "Buy to let"
        ? "Additional Property (Buy to let)"
        : servicData?.purchase_mode === "HomeMoving"
        ? "Home Moving"
        : "--"}
    </strong>

    , Obtaining Mortgage:{" "}
    <strong>
      {servicData?.existing_mortgage == 1 || servicData?.existing_mortgage === true
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

    {servicData?.gift_deposit && Number(servicData?.gift_deposit) !== 0 && (
      <>
        , <strong>{servicData.gift_deposit}</strong> Gift Deposit
      </>
    )}

    {language?.find((l) => l.id == servicData?.languages)?.language_name && (
      <>
        , <strong>
          {language.find((l) => l.id == servicData?.languages)?.language_name}
        </strong>
      </>
    )}

    .
  </p>
</div> */}
      </div>
      {!hide && (
      <div className="font_size_13px mt-6 md:mt-0" style={{ pageBreakBefore: 'always' }}>
        <div className="font p-3">
          <h3
            className="text-lg text-start text-emerald-600 font-semibold mb-3"
            onClick={() => {
              handleprice();
            }}
          >
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

            <tbody >
              {companydata
                ?.filter(
                  (item) => item.conveying_details.conveying_id == cardid
                )
                .map((item, index) => (
                  <React.Fragment key={index} >
                    <tr className="border-b border-gray-200 font_size_13px">
                      <td className="p-2 text-sm  text-start font_size_13px text-emerald-600 font-bold">{`Legal Fees`}</td>
                      <td className="p-2 text-sm text-right  font_size_13px text-emerald-600 font-bold">
                        {formatGBP( servicData?.taxInfo?.legal_fees||item.legal_fees)}
                      </td>
                      <td className="p-2 text-sm text-right font_size_13px text-emerald-600 font-bold">
                          {formatGBP( servicData?.taxInfo?.vat||item.vat)}
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
                                      : fee.fee_type || fee.others}
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
                              <div className="ml-4 font_size_13px font-bold">
                                {" "}
                                {/* margin-left works here */}
                                {category} Total
                              </div>
                            </td>

                            <td className="p-2 text-right text-sm font_size_13px font-bold">
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
                        <td className="p-2 text-start text-emerald-600 font-bold">Total </td>

                        <td className="p-2 text-right text-emerald-600 ">
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
                        <td className="p-2 text-right text-emerald-600">
                          <span> 
                            {formatGBP( servicData?.taxInfo?.vat||quote.total_vat)}</span>
                        </td>

                        {/* <td className="p-2 text-right text-emerald-600 font_size_13px" > {formatGBP(Number(item.vat))}</td> */}
                      </tr>
                  
                    {item?.service_details?.[0]?.service_type == 2 && (
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
      )}
    </div>
  );
}
