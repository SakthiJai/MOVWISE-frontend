"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
import SalesPropertyDetails from "./Sales_Property";
import PurchasePropertyDetails from "./PurchasePropertyDetails";
import SalesPurchasePropertyDetails from "./Sales_Purchase_PropertyDetails";
import RemortagePropertyDetails from "./RemortagePropertyDetails";
import EquityPropertyDetails from "./EquityPropertyDEtails";
import Select from 'react-select';
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";

// Reusable component for fees table
const FeesTable = ({ quote, label = "Sales" }) => {


  return (
    <div className="border-t border-gray-200 pt-6 flex justify-end">
      <table className="border-collapse text-black font">
        <thead>
          <tr className="border-b border-gray-300 text-left grid grid-cols-3 w-full gap-5">
            <th className="text-sm font-semibold">Type</th>
            <th className="text-sm font-semibold">Fee Amount</th>
            <th className="text-sm font-semibold">VAT</th>
          </tr>
        </thead>
        <tbody>
          {/* Legal Fees */}
          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
            <td className="text-sm font-bold">Legal Fees</td>
            <td className="text-sm font-semibold text-emerald-600">{formatGBP(quote.legal_fees)}</td>
            <td className="text-sm text-emerald-600 font-semibold">{formatGBP(quote.vat)}</td>
          </tr>

          {/* Supplements */}
          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
            <td className="text-sm">Supplements</td>
            <td className="text-sm">{formatGBP(quote.supplements)}</td>
            <td className="text-sm">{formatGBP(quote.supplementsvat)}</td>
          </tr>

          {/* Disbursements */}
          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
            <td className="text-sm">Disbursements</td>
            <td className="text-sm">{formatGBP(quote.disbursements)}</td>
            <td className="text-sm">{formatGBP(quote.disbursementsvat)}</td>
          </tr>

          {/* TOTAL */}
          <tr className="grid grid-cols-3 w-full gap-5 border-t border-gray-300 bg-gray-50">
            <td className="text-sm font-semibold">Total</td>
            <td className="text-sm font-semibold text-emerald-600">
              {formatGBP(
                Number(quote.supplements || 0) +
                Number(quote.disbursements || 0) +
                Number(quote.legal_fees || 0)
              )}
            </td>
            <td className="text-sm font-semibold text-emerald-600">
              {formatGBP(Number(quote.disbursementsvat) + Number(quote.supplementsvat) + Number(quote.vat))}
            </td>
          </tr>

          {/* Country-Based Taxes */}
          {quote.service_details && quote.service_details[0]?.service_type == 2 && (
            <>
              {(quote.service_details[0].country === "England" ||
                quote.service_details[0].country === "Northern Ireland") && (
                  <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                    <td className="text-sm font-semibold">Stamp Duty</td>
                    <td className="text-sm">{formatGBP(quote.stamp_duty)}</td>
                    <td className="text-sm">-</td>
                  </tr>
                )}

              {quote.service_details[0].country === "Scotland" && (
                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                  <td className="text-sm font-semibold">LBTT</td>
                  <td className="text-sm">{formatGBP(quote.lbtt)}</td>
                  <td className="text-sm">-</td>
                </tr>
              )}

              {quote.service_details[0].country === "Wales" && (
                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                  <td className="text-sm font-semibold">LLT</td>
                  <td className="text-sm">{formatGBP(quote.llt)}</td>
                  <td className="text-sm">-</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

function ComparequotesContent() {
  const searchParams = useSearchParams();
  const query_ref_no = searchParams.get("ref_no");
  // State to hold companies data (initialized with static data)
  const [companydata, setcompanydata] = useState();
  const pdfRef = useRef(null);
  const hasCalledService = useRef(false);
  const [ref, setref] = useState("");
  const [quotefound, setquotefound] = useState(false);
  const [view_data, setview_data] = useState({});
  const [quoteData, setquoteData] = useState([]);
  const [viewquotes, showviewquotes] = useState(false);

  const [quoteid, setquoteid] = useState("");
  const [loader, setLoader] = useState(false);
  const [instructloader, setinstructloader] = useState(false);
  const [instructpayload, setinstructpayload] = useState({
    "ref_no": "",
    "servicetype": "",
    "quoteid": "",
  })
  const [cardid, setcardid] = useState();
  const [cardshow, setcardshown] = useState(false);
  const [vattax, setvattax] = useState(0);
  const [dropdownshow, setdropdownshow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, settotal] = useState(0);
  const [giftvalue, setgiftvalue] = useState(0);
  const [conveyancerid, setconveyancerid] = useState(0);
  const [userlogin, setuserlogin] = useState(false);

const CircularProgress = ({ progress }) => {
  const radius = 16;
  const stroke = 4;
  const size = radius * 2 + stroke; // 36
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-10 h-10">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
             className="stroke-green-700"
           // strokeWidth={stroke}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.35s" }}
          />
        </svg>

        {/* Centered text */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none"
          style={{ fontSize: "9px", fontWeight: "700", lineHeight: 1 }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};



  const [filteroption, setfilteroption] = useState([
    {
      value: "Rating",
      label: "Rating",
    },
    {
      value: "Language",
      label: "Language",
    },
    {
      value: "Price",
      label: "Price",
    },
  ])
  const [filterselected, setfilterselected] = useState([])

  // Track which card dropdown is open (by quote_id)
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  // Popup modal visibility and selected company state
  const [popupData, setPopupData] = useState({
    visible: false,
    companyName: "",
  });
  const [taxDetails, settaxDetails] = useState();
  const [taxDetails2, settaxDetails2] = useState();
  const [pendingDownload, setPendingDownload] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Toggle dropdown for a particular quote card
  function toggleDropdown(id) {
    showviewquotes(true);
    quoteData.forEach((elememt) => {
      if (elememt.conveying_details.conveying_id == id) {
        setview_data(elememt)
      }
    })
    setcardid(id);
    setcardshown(!cardshow);
    //view_data
    console.log(quoteData);

    fetchtaxdetails(id);
  }
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("logintype")) {
      setuserlogin(true);
    }
  }, []);

  useEffect(() => {
    const id = cardid ?? view_data?.conveying_details?.conveying_id;
    if (
      id &&
      !taxDetails &&
      Array.isArray(companydata) &&
      companydata.length > 0
    ) {
      setcardid(id);
      fetchtaxdetails(id);
    }
  }, [view_data, companydata, cardid, taxDetails]);
  const [lenders, setLenders] = useState([]);

useEffect(() => {
  async function fetchLanguages() {
    try {
      const res = await getData(API_ENDPOINTS.languagelist);
      setLanguage(res.users || []);
    } catch (e) {
      console.error(e);
    }
  }
  fetchLanguages();
}, []);

useEffect(() => {
  async function fetchLenders() {
    try {
      const res = await getData(API_ENDPOINTS.lenders);
      setLenders(res.users || []);
    } catch (e) {
      console.error(e);
    }
  }
  fetchLenders();
}, []);

  function handleprice() {
    console.log(companydata)

  }

  const generatePDF = async () => {
    try {
      if (!pdfRef.current) {
        Swal.fire('Error', 'PDF element not found', 'error');
        return;
      }

      const margin = 10;
      const imgWidth = 210 - margin * 2;
      const pageHeight = 297 - margin * 2;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Helper: clone pdfRef, apply PDF-mode swaps, strip Tailwind classes
      const buildClone = (hideNotes) => {
        const cloned = pdfRef.current.cloneNode(true);

        // Swap UI table → condensed sentence
        cloned.querySelectorAll('.purchase-ui-details').forEach(el => { el.style.display = 'none'; });
        cloned.querySelectorAll('.purchase-pdf-summary').forEach(el => { el.style.display = 'block'; });
// ✅ Sales FIX
cloned.querySelectorAll('.sales-ui-details').forEach(el => {
  el.style.display = 'none';
});

cloned.querySelectorAll('.sales-pdf-summary').forEach(el => {
  el.style.display = 'block';
});

        cloned.querySelectorAll('.remortgage-ui-details').forEach(el => { el.style.display = 'none'; });
        cloned.querySelectorAll('.remortgage-pdf-summary').forEach(el => { el.style.display = 'block'; });
        // Handle notes section
        const notesEl = cloned.querySelector('.pdf-notes-section');
        if (notesEl) {
          notesEl.style.display = hideNotes ? 'none' : 'block';
        }

        const feeCells = cloned.querySelectorAll('.pdf-fee-table th, .pdf-fee-table td');
        const feeRows = cloned.querySelectorAll('.pdf-fee-table tr');
        feeRows.forEach(row => row.setAttribute('data-pdf-fee-row', '1'));

        const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
        const cellTags = new Set(['TD', 'TH']);
        cloned.querySelectorAll('*').forEach(el => {
          el.className = '';
          el.style.fontFamily = 'Arial, sans-serif';
          el.style.color = headingTags.has(el.tagName) ? '#059669' : '#000';
          el.style.fontSize = '11px';
          el.style.margin = '0';
          el.style.background = 'transparent';
          el.style.backgroundColor = 'transparent';
          el.style.border = 'none';
          el.style.boxShadow = 'none';
          el.style.borderRadius = '0';
          el.style.overflow = 'visible';
          el.style.maxHeight = 'none';
          el.style.textAlign = 'left';
          
          // Flexible table cell styling
          if (cellTags.has(el.tagName)) {
            el.style.padding = '5px 8px';
            el.style.whiteSpace = 'normal';
            el.style.wordWrap = 'break-word';
            el.style.overflowWrap = 'break-word';
            el.style.textAlign = 'left';
          }
          if (el.tagName === 'TABLE') {
            el.style.width = '100%';
            el.style.borderCollapse = 'collapse';
            el.style.tableLayout = 'auto';
          }
          if (el.tagName === 'IMG') {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.objectFit = 'contain';
          }
        });
        
        // Right-align Fee Amount and VAT columns in fee tables
        cloned.querySelectorAll('.pdf-fee-table tr').forEach(row => {
          const cells = row.querySelectorAll('th, td');
          cells.forEach((cell, index) => {
            // Columns 1 and 2 (Fee Amount and VAT) should be right-aligned
            if (index === 1 || index === 2) {
              cell.style.textAlign = 'right';
            } else {
              cell.style.textAlign = 'left';
            }
          });
        });

        // Increase fee breakdown row height in PDF output
        feeRows.forEach(row => {
          row.style.lineHeight = '1.45';
          row.style.verticalAlign = 'middle';
        });
        feeCells.forEach(cell => {
          cell.style.fontSize = '11px';
          cell.style.padding = '5px 8px';
          cell.style.lineHeight = '1.45';
          cell.style.verticalAlign = 'middle';
          cell.style.whiteSpace = 'normal';
          cell.style.wordWrap = 'break-word';
        });
        return cloned;
      };

      const canvasOptions = {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 10000,
        windowWidth: 800,
      };

      const waitForImages = async (container) => {
        const images = Array.from(container.querySelectorAll('img'));
        await Promise.all(
          images.map((img) =>
            new Promise((resolve) => {
              img.crossOrigin = 'anonymous';
              img.loading = 'eager';
              img.decoding = 'sync';

              if (img.complete && img.naturalWidth > 0) {
                resolve();
                return;
              }

              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
              setTimeout(done, 2500);
            })
          )
        );
      };

      // --- Capture main content (notes hidden) ---
      const mainWrapper = document.createElement('div');
      mainWrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;background:white;padding:15px;font-family:Arial,sans-serif;line-height:1.4;';
      const mainClone = buildClone(true);
      mainClone.style.overflow = 'visible';
      mainClone.style.maxHeight = 'none';
      mainWrapper.appendChild(mainClone);
      document.body.appendChild(mainWrapper);
      await waitForImages(mainWrapper);

      // Collect safe page break points at the end of fee table rows.
      const canvasScale = Number(canvasOptions.scale || 1);
      const cloneTop = mainClone.getBoundingClientRect().top;
      const rowBreakPointsPx = Array.from(mainClone.querySelectorAll('[data-pdf-fee-row="1"]'))
        .map((row) => {
          const rowRect = row.getBoundingClientRect();
          return Math.round((rowRect.bottom - cloneTop) * canvasScale);
        })
        .filter((point, idx, arr) => point > 0 && arr.indexOf(point) === idx)
        .sort((a, b) => a - b);

      const mainCanvas = await html2canvas(mainWrapper, { ...canvasOptions, windowHeight: mainWrapper.scrollHeight });
      document.body.removeChild(mainWrapper);

      if (!mainCanvas || mainCanvas.width === 0) throw new Error('Canvas rendering failed');

      // Slice the canvas into real page chunks to avoid duplicate rows between pages.
      const pageHeightPx = Math.floor((pageHeight * mainCanvas.width) / imgWidth);
      let renderedHeightPx = 0;
      let firstPage = true;

      while (renderedHeightPx < mainCanvas.height) {
        const remainingPx = mainCanvas.height - renderedHeightPx;
        let sliceHeightPx = Math.min(pageHeightPx, remainingPx);

        // Prefer cutting at row boundaries so text does not split across pages.
        const targetCutPx = renderedHeightPx + sliceHeightPx;
        const minCutPx = renderedHeightPx + 20;
        const candidateBreaks = rowBreakPointsPx.filter(
          (point) => point <= targetCutPx && point > minCutPx
        );
        const maxBacktrackPx = 120 * canvasScale;
        if (
          candidateBreaks.length > 0 &&
          remainingPx > pageHeightPx &&
          targetCutPx - candidateBreaks[candidateBreaks.length - 1] <= maxBacktrackPx
        ) {
          const bestCutPx = candidateBreaks[candidateBreaks.length - 1];
          sliceHeightPx = bestCutPx - renderedHeightPx;
        }

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = mainCanvas.width;
        pageCanvas.height = sliceHeightPx;

        const pageCtx = pageCanvas.getContext('2d');
        if (!pageCtx) {
          throw new Error('Failed to create canvas context for PDF page slicing');
        }

        pageCtx.drawImage(
          mainCanvas,
          0,
          renderedHeightPx,
          mainCanvas.width,
          sliceHeightPx,
          0,
          0,
          mainCanvas.width,
          sliceHeightPx
        );

        const pageImgData = pageCanvas.toDataURL('image/png');
        const renderedHeightMm = (sliceHeightPx * imgWidth) / mainCanvas.width;

        if (!firstPage) {
          pdf.addPage();
        }
        pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, renderedHeightMm);

        firstPage = false;
        renderedHeightPx += sliceHeightPx;
      }

      // --- Capture notes on a separate page ---
      const notesWrapper = document.createElement('div');
      notesWrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;background:white;padding:15px;font-family:Arial,sans-serif;line-height:1.4;';
      const notesOnlyClone = pdfRef.current.cloneNode(true);
      // Keep only the notes element
      const notesEl = notesOnlyClone.querySelector('.pdf-notes-section');
      notesWrapper.innerHTML = '';
      if (notesEl) {
        const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
        notesEl.querySelectorAll('*').forEach(el => {
          el.className = '';
          el.style.fontFamily = 'Arial, sans-serif';
          el.style.color = headingTags.has(el.tagName) ? '#059669' : '#000';
          el.style.fontSize = '11px';
          el.style.margin = '0';
          el.style.background = 'transparent';
          el.style.backgroundColor = 'transparent';
          el.style.border = 'none';
          el.style.boxShadow = 'none';
          el.style.borderRadius = '0';
        });
        
        // Right-align Fee Amount and VAT columns in notes fee tables
        notesEl.querySelectorAll('.pdf-fee-table tr').forEach(row => {
          const cells = row.querySelectorAll('th, td');
          cells.forEach((cell, index) => {
            if (index === 1 || index === 2) {
              cell.style.textAlign = 'right';
            } else {
              cell.style.textAlign = 'left';
            }
          });
        });
        
        notesEl.style.display = 'block';
        notesEl.style.pageBreakBefore = 'unset';
        notesWrapper.appendChild(notesEl);
      }
      document.body.appendChild(notesWrapper);
      await waitForImages(notesWrapper);
      const notesCanvas = await html2canvas(notesWrapper, { ...canvasOptions, windowHeight: notesWrapper.scrollHeight });
      document.body.removeChild(notesWrapper);

      if (notesCanvas && notesCanvas.width > 0 && notesCanvas.height > 0) {
        pdf.addPage();
        const notesImgData = notesCanvas.toDataURL('image/png');
        const notesImgHeight = (notesCanvas.height * imgWidth) / notesCanvas.width;
        pdf.addImage(notesImgData, 'PNG', margin, margin, imgWidth, notesImgHeight);
      }

      const currentRef = ref || 'quote';
      pdf.save(`${currentRef}.pdf`);
      Swal.fire('Success', 'PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('PDF generation error:', error);
      Swal.fire('Error', `Failed to generate PDF: ${error.message}`, 'error');
    } finally {
      setPdfLoading(false);
    }
  };


//   const generatePDF = async () => {
//     try {
//       if (!pdfRef.current) {
//         Swal.fire('Error', 'PDF element not found', 'error');
//         return;
//       }

//       const margin = 10;
//       const imgWidth = 210 - margin * 2;
//       const pageHeight = 297 - margin * 2;

//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4',
//         compress: true,
//       });

//       // Helper: clone pdfRef, apply PDF-mode swaps, strip Tailwind classes
//       const buildClone = (hideNotes) => {
//         const cloned = pdfRef.current.cloneNode(true);

//         // Swap UI table → condensed sentence
//         cloned.querySelectorAll('.purchase-ui-details').forEach(el => { el.style.display = 'none'; });
//         cloned.querySelectorAll('.purchase-pdf-summary').forEach(el => { el.style.display = 'block'; });
// // ✅ Sales FIX
// cloned.querySelectorAll('.sales-ui-details').forEach(el => {
//   el.style.display = 'none';
// });

// cloned.querySelectorAll('.sales-pdf-summary').forEach(el => {
//   el.style.display = 'block';
// });

//         cloned.querySelectorAll('.remortgage-ui-details').forEach(el => { el.style.display = 'none'; });
//         cloned.querySelectorAll('.remortgage-pdf-summary').forEach(el => { el.style.display = 'block'; });
//         // Handle notes section
//         const notesEl = cloned.querySelector('.pdf-notes-section');
//         if (notesEl) {
//           notesEl.style.display = hideNotes ? 'none' : 'block';
//         }

//         const feeCells = cloned.querySelectorAll('.pdf-fee-table th, .pdf-fee-table td');
//         const feeRows = cloned.querySelectorAll('.pdf-fee-table tr');
//         feeRows.forEach(row => row.setAttribute('data-pdf-fee-row', '1'));

//         const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
//         const cellTags = new Set(['TD', 'TH']);

//         // Helper function to convert oklch to rgb
//         const oklchToRgb = (oklchStr) => {
//           try {
//             // Parse oklch(l c h / a) format
//             const match = oklchStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
//             if (!match) return '#000000'; // fallback

//             const l = parseFloat(match[1]);
//             const c = parseFloat(match[2]);
//             const h = parseFloat(match[3]);
//             const a = match[4] ? parseFloat(match[4]) : 1;

//             // Convert OKLCH to RGB (simplified conversion)
//             // This is an approximation - for production, consider using a proper color library
//             const hue = h / 360;
//             const chroma = c / 100;
//             const lightness = l / 100;

//             // Simple HSL-like conversion (not perfect but better than nothing)
//             const x = chroma * (1 - Math.abs((hue * 6) % 2 - 1));
//             let r, g, b;

//             if (hue >= 0 && hue < 1/6) {
//               r = chroma; g = x; b = 0;
//             } else if (hue >= 1/6 && hue < 2/6) {
//               r = x; g = chroma; b = 0;
//             } else if (hue >= 2/6 && hue < 3/6) {
//               r = 0; g = chroma; b = x;
//             } else if (hue >= 3/6 && hue < 4/6) {
//               r = 0; g = x; b = chroma;
//             } else if (hue >= 4/6 && hue < 5/6) {
//               r = x; g = 0; b = chroma;
//             } else {
//               r = chroma; g = 0; b = x;
//             }

//             const m = lightness - chroma / 2;
//             r = Math.round((r + m) * 255);
//             g = Math.round((g + m) * 255);
//             b = Math.round((b + m) * 255);

//             return `rgb(${r}, ${g}, ${b})`;
//           } catch (e) {
//             return '#000000'; // fallback
//           }
//         };

//         // Helper function to convert unsupported color functions
//         const convertColor = (colorValue) => {
//           if (!colorValue || typeof colorValue !== 'string') return colorValue;

//           // Handle oklch
//           if (colorValue.includes('oklch(')) {
//             return oklchToRgb(colorValue);
//           }

//           // Handle other potential unsupported functions like lch, lab, color(), etc.
//           if (colorValue.includes('lch(') || colorValue.includes('lab(') || colorValue.includes('color(')) {
//             // For now, fallback to black for other unsupported color functions
//             return '#000000';
//           }

//           // Handle CSS custom properties that might contain unsupported colors
//           if (colorValue.startsWith('var(')) {
//             // For CSS variables, try to resolve them or fallback
//             return '#000000';
//           }

//           return colorValue;
//         };

//         cloned.querySelectorAll('*').forEach(el => {
//           const computedStyle = window.getComputedStyle(el);

//           // Convert all color-related computed styles
//           const colorProperties = [
//             'color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor',
//             'borderBottomColor', 'borderLeftColor', 'outlineColor', 'textDecorationColor',
//             'columnRuleColor', 'caretColor'
//           ];

//           colorProperties.forEach(prop => {
//             const computedValue = computedStyle[prop];
//             if (computedValue && computedValue !== 'rgba(0, 0, 0, 0)' && computedValue !== 'transparent') {
//               el.style[prop] = convertColor(computedValue);
//             }
//           });

//           el.style.fontFamily = 'Arial, sans-serif';
//           el.style.color = headingTags.has(el.tagName) ? convertColor('#059669') : convertColor('#000');
//           el.style.fontSize = '11px';
//           el.style.margin = '0';
//           el.style.border = 'none';
//           el.style.boxShadow = 'none';
//           el.style.borderRadius = '0';
//           el.style.overflow = 'visible';
//           el.style.maxHeight = 'none';

//           // Give table cells generous padding so columns don't run together
//           if (cellTags.has(el.tagName)) {
//             el.style.padding = '6px 16px 6px 4px';
//             el.style.whiteSpace = 'nowrap';
//           }

//           if (el.tagName === 'IMG') {
//             el.style.display = 'block';
//             el.style.visibility = 'visible';
//             el.style.opacity = '1';
//             el.style.objectFit = 'contain';
//           }
//         });

//         // Increase fee breakdown row height in PDF output
        
//         cloned.querySelectorAll('*').forEach(el => {

//   // Base styles
//   el.style.fontFamily = 'Arial, sans-serif';
//   el.style.color = headingTags.has(el.tagName) ? '#059669' : '#000';
//   el.style.fontSize = '11px';
//   el.style.margin = '0';
//   el.style.boxShadow = 'none';
//   el.style.overflow = 'visible';
//   el.style.maxHeight = 'none';

//   // ✅ PDF info cards only
//   if (el.classList.contains('pdf-info-card')) {
//     el.style.backgroundColor = '#f3f4f6';
//     el.style.border = '1px solid #d1d5db';
//     el.style.borderRadius = '8px';
//     el.style.padding = '14px';
//     el.style.display = 'block';
//     el.style.width = '100%';
//     el.style.minHeight = '120px';
//     el.style.boxSizing = 'border-box';
//   }

//   // Table styling
//   if (cellTags.has(el.tagName)) {
//     el.style.padding = '6px 16px 6px 4px';
//     el.style.whiteSpace = 'nowrap';
//   }

//   // Image fixes
//   if (el.tagName === 'IMG') {
//     el.style.display = 'block';
//     el.style.visibility = 'visible';
//     el.style.opacity = '1';
//     el.style.objectFit = 'contain';
//   }
// });
//         feeRows.forEach(row => {
//           row.style.lineHeight = '1.45';
//         });
//         feeCells.forEach(cell => {
//           cell.style.fontSize = '11px';
//           cell.style.padding = '6px 10px';
//           cell.style.lineHeight = '1.45';
//         });
//         return cloned;
//       };

//       const canvasOptions = {
//         scale: 1.5,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: '#ffffff',
//         logging: false,
//         imageTimeout: 10000,
//         windowWidth: 800,
//         ignoreElements: (element) => {
//           // Ignore elements that might cause issues
//           if (element.tagName === 'IMG' && (!element.complete || element.naturalWidth === 0)) {
//             return true; // Skip broken images
//           }
//           return false;
//         },
//         onclone: (clonedDoc) => {
//           // Additional cleanup on cloned document
//           const images = clonedDoc.querySelectorAll('img');
//           images.forEach(img => {
//             if (!img.complete || img.naturalWidth === 0) {
//               img.style.display = 'none'; // Hide broken images
//             }
//           });
//         }
//       };

//       const waitForImages = async (container) => {
//         const images = Array.from(container.querySelectorAll('img'));
//         await Promise.all(
//           images.map((img) =>
//             new Promise((resolve) => {
//               img.crossOrigin = 'anonymous';
//               img.loading = 'eager';
//               img.decoding = 'sync';

//               if (img.complete && img.naturalWidth > 0) {
//                 resolve();
//                 return;
//               }

//               const done = () => {
//                 // If image failed to load, replace with a placeholder
//                 if (!img.complete || img.naturalWidth === 0) {
//                   // Create a small transparent placeholder
//                   const canvas = document.createElement('canvas');
//                   canvas.width = 1;
//                   canvas.height = 1;
//                   const ctx = canvas.getContext('2d');
//                   ctx.fillStyle = 'rgba(0,0,0,0)';
//                   ctx.fillRect(0, 0, 1, 1);
//                   img.src = canvas.toDataURL();
//                 }
//                 resolve();
//               };

//               img.addEventListener('load', done, { once: true });
//               img.addEventListener('error', () => {
//                 // On error, create a placeholder
//                 const canvas = document.createElement('canvas');
//                 canvas.width = 1;
//                 canvas.height = 1;
//                 const ctx = canvas.getContext('2d');
//                 ctx.fillStyle = 'rgba(0,0,0,0)';
//                 ctx.fillRect(0, 0, 1, 1);
//                 img.src = canvas.toDataURL();
//                 done();
//               }, { once: true });

//               setTimeout(done, 2500);
//             })
//           )
//         );
//       };

//       // --- Capture main content (notes hidden) ---
//       const mainWrapper = document.createElement('div');
//       mainWrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;background:white;padding:15px;font-family:Arial,sans-serif;line-height:1.4;';
//       const mainClone = buildClone(true);
//       mainClone.style.overflow = 'visible';
//       mainClone.style.maxHeight = 'none';
//       mainWrapper.appendChild(mainClone);
//       document.body.appendChild(mainWrapper);
//       await waitForImages(mainWrapper);

//       // Collect safe page break points at the end of fee table rows.
//       const canvasScale = Number(canvasOptions.scale || 1);
//       const cloneTop = mainClone.getBoundingClientRect().top;
//       const rowBreakPointsPx = Array.from(mainClone.querySelectorAll('[data-pdf-fee-row="1"]'))
//         .map((row) => {
//           const rowRect = row.getBoundingClientRect();
//           return Math.round((rowRect.bottom - cloneTop) * canvasScale);
//         })
//         .filter((point, idx, arr) => point > 0 && arr.indexOf(point) === idx)
//         .sort((a, b) => a - b);

//       let mainCanvas;
//       try {
//         mainCanvas = await html2canvas(mainWrapper, { ...canvasOptions, windowHeight: mainWrapper.scrollHeight });
//       } catch (error) {
//         console.warn('html2canvas failed for main content:', error);
//         // Try with html-to-image as fallback
//         try {
//           const pngDataUrl = await toPng(mainWrapper, {
//             ...canvasOptions,
//             height: mainWrapper.scrollHeight,
//             width: 800,
//             style: { transform: 'scale(1)' }
//           });

//           // Convert PNG data URL to canvas
//           mainCanvas = document.createElement('canvas');
//           const ctx = mainCanvas.getContext('2d');
//           const img = new Image();
//           await new Promise((resolve, reject) => {
//             img.onload = () => {
//               mainCanvas.width = img.width;
//               mainCanvas.height = img.height;
//               ctx.drawImage(img, 0, 0);
//               resolve();
//             };
//             img.onerror = reject;
//             img.src = pngDataUrl;
//           });
//         } catch (fallbackError) {
//           console.error('Both html2canvas and html-to-image failed:', fallbackError);
//           throw new Error('Failed to render PDF content');
//         }
//       }

//       document.body.removeChild(mainWrapper);

//       if (!mainCanvas || mainCanvas.width === 0) throw new Error('Canvas rendering failed');

//       // Slice the canvas into real page chunks to avoid duplicate rows between pages.
//       const pageHeightPx = Math.floor((pageHeight * mainCanvas.width) / imgWidth);
//       let renderedHeightPx = 0;
//       let firstPage = true;

//       while (renderedHeightPx < mainCanvas.height) {
//         const remainingPx = mainCanvas.height - renderedHeightPx;
//         let sliceHeightPx = Math.min(pageHeightPx, remainingPx);

//         // Prefer cutting at row boundaries so text does not split across pages.
//         const targetCutPx = renderedHeightPx + sliceHeightPx;
//         const minCutPx = renderedHeightPx + 20;
//         const candidateBreaks = rowBreakPointsPx.filter(
//           (point) => point <= targetCutPx && point > minCutPx
//         );
//         const maxBacktrackPx = 120 * canvasScale;
//         if (
//           candidateBreaks.length > 0 &&
//           remainingPx > pageHeightPx &&
//           targetCutPx - candidateBreaks[candidateBreaks.length - 1] <= maxBacktrackPx
//         ) {
//           const bestCutPx = candidateBreaks[candidateBreaks.length - 1];
//           sliceHeightPx = bestCutPx - renderedHeightPx;
//         }

//         const pageCanvas = document.createElement('canvas');
//         pageCanvas.width = mainCanvas.width;
//         pageCanvas.height = sliceHeightPx;

//         const pageCtx = pageCanvas.getContext('2d');
//         if (!pageCtx) {
//           throw new Error('Failed to create canvas context for PDF page slicing');
//         }

//         pageCtx.drawImage(
//           mainCanvas,
//           0,
//           renderedHeightPx,
//           mainCanvas.width,
//           sliceHeightPx,
//           0,
//           0,
//           mainCanvas.width,
//           sliceHeightPx
//         );

//         const pageImgData = pageCanvas.toDataURL('image/png');
//         const renderedHeightMm = (sliceHeightPx * imgWidth) / mainCanvas.width;

//         if (!firstPage) {
//           pdf.addPage();
//         }
//         pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, renderedHeightMm);

//         firstPage = false;
//         renderedHeightPx += sliceHeightPx;
//       }

//       // --- Capture notes on a separate page ---
//       const notesWrapper = document.createElement('div');
//       notesWrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;background:white;padding:15px;font-family:Arial,sans-serif;line-height:1.4;';
//       const notesOnlyClone = pdfRef.current.cloneNode(true);
//       // Keep only the notes element
//       const notesEl = notesOnlyClone.querySelector('.pdf-notes-section');
//       notesWrapper.innerHTML = '';
//       if (notesEl) {
//         const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
//         notesEl.querySelectorAll('*').forEach(el => {
//           el.className = '';
//           el.style.fontFamily = 'Arial, sans-serif';
//           el.style.color = headingTags.has(el.tagName) ? '#059669' : '#000';
//           el.style.fontSize = '11px';
//           el.style.margin = '0';
//           el.style.background = 'transparent';
//           el.style.backgroundColor = 'transparent';
//           el.style.border = 'none';
//           el.style.boxShadow = 'none';
//           el.style.borderRadius = '0';
//         });
//         notesEl.style.display = 'block';
//         notesEl.style.pageBreakBefore = 'unset';
//         notesWrapper.appendChild(notesEl);
//       }
//       document.body.appendChild(notesWrapper);
//       await waitForImages(notesWrapper);

//       let notesCanvas;
//       try {
//         notesCanvas = await html2canvas(notesWrapper, { ...canvasOptions, windowHeight: notesWrapper.scrollHeight });
//       } catch (error) {
//         console.warn('html2canvas failed for notes:', error);
//         // Try with html-to-image as fallback
//         try {
//           const pngDataUrl = await toPng(notesWrapper, {
//             ...canvasOptions,
//             height: notesWrapper.scrollHeight,
//             width: 800,
//             style: { transform: 'scale(1)' }
//           });

//           // Convert PNG data URL to canvas
//           notesCanvas = document.createElement('canvas');
//           const ctx = notesCanvas.getContext('2d');
//           const img = new Image();
//           await new Promise((resolve, reject) => {
//             img.onload = () => {
//               notesCanvas.width = img.width;
//               notesCanvas.height = img.height;
//               ctx.drawImage(img, 0, 0);
//               resolve();
//             };
//             img.onerror = reject;
//             img.src = pngDataUrl;
//           });
//         } catch (fallbackError) {
//           console.warn('html-to-image also failed for notes, skipping notes section:', fallbackError);
//           notesCanvas = null;
//         }
//       }

//       document.body.removeChild(notesWrapper);

//       if (notesCanvas && notesCanvas.width > 0 && notesCanvas.height > 0) {
//         pdf.addPage();
//         const notesImgData = notesCanvas.toDataURL('image/png');
//         const notesImgHeight = (notesCanvas.height * imgWidth) / notesCanvas.width;
//         pdf.addImage(notesImgData, 'PNG', margin, margin, imgWidth, notesImgHeight);
//       }

//       const currentRef = ref || 'quote';
//       pdf.save(`${currentRef}.pdf`);
//       Swal.fire('Success', 'PDF downloaded successfully!', 'success');
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       Swal.fire('Error', `Failed to generate PDF: ${error.message}`, 'error');
//     } finally {
//       setPdfLoading(false);
//     }
//   };
  function handleDownloadFromCard(quote) {
    // Ensure the selected quote content is mounted in the popup before export.
    setPdfLoading(true);
    setview_data(quote);
    setcardid(quote?.conveying_details?.conveying_id);
    setcardshown(true);
    setdropdownshow(true);
    showviewquotes(true);
    fetchtaxdetails(quote?.conveying_details?.conveying_id);
    setPendingDownload(true);
  }

  useEffect(() => {
    if (!pendingDownload) return;

    let attempts = 0;
    const maxAttempts = 20;

    const tryGenerate = async () => {
      if (pdfRef?.current) {
        await generatePDF();
        setPendingDownload(false);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        setPendingDownload(false);
        setPdfLoading(false);
        Swal.fire('Error', 'PDF element not found', 'error');
        return;
      }

      setTimeout(tryGenerate, 100);
    };

    tryGenerate();
  }, [pendingDownload]);

  function handleInstructFromCard(
  companyName,
  guest_id,
  conveyancer_id,
  quote_id,
  user_id,
  tax_info_quote_id,
  refno,
  quote
) {
  showviewquotes(true);
  setcardid(conveyancer_id);
  setcardshown(true);
  setview_data(quote);
  setdropdownshow(true);

  setinstructloader(true);
}
const hasSentHtml = useRef(false);

useEffect(() => {
  if (
    viewquotes &&
    instructloader &&
    pdfRef?.current &&
    view_data &&
    language?.length > 0 && 
    !hasSentHtml.current
  ) {
    hasSentHtml.current = true;
    sendHtmlToBackend();
  }
}, [viewquotes, instructloader, view_data,language]);
useEffect(() => {
  if (!viewquotes) {
    hasSentHtml.current = false;
  }
}, [viewquotes]);


  async function instructquote(instructpayload) {
    try {
      const instruct = await postData(API_ENDPOINTS.instruct, instructpayload);
      console.log("API Response:", instruct);

      if (instruct) {
        // clear loader before navigating so UI updates quickly
        setinstructloader(false);

        // fire-and-forget email request
        postData(API_ENDPOINTS.sendinstructmail, instructpayload)
          .then((resp) => console.log("sendinstructmail response", resp))
          .catch((err) => console.error("sendinstructmail error", err));

        // navigate immediately without waiting for mail
        router.push(`/Instruct?id=${instructpayload.quoteid}`);
      }
    } catch (e) {
      setinstructloader(false);
      console.error("API error:", e);
    }
  }

//   async function sendHtmlToBackend() {
//   try {
//     if (!pdfRef?.current) return;

//     // Remove scroll restrictions before capture
//     pdfRef.current.style.maxHeight = "none";
//     pdfRef.current.style.overflow = "visible";
//     pdfRef.current.style.height = "auto";

//     // Clone DOM and inject PDF-mode styles so instruct email shows condensed sentence
//   const instructClone = pdfRef.current.cloneNode(true);

// // 1. remove unwanted UI
// instructClone.querySelectorAll('.sales-ui-details').forEach(el => el.remove());
// instructClone.querySelectorAll('.purchase-ui-details').forEach(el => el.remove());

// // 2. inject style
// const instructStyle = document.createElement('style');
// instructStyle.textContent = `...`;
// instructClone.prepend(instructStyle);

// // 3. convert to HTML
// const htmlContent = instructClone.outerHTML;

//     let servicetype = localStorage.getItem("service");

//     const payload = {
//       ref_no: view_data?.service_details?.[0]?.quote_ref_number,
//       servicetype: servicetype,
//       quoteid: view_data?.quote_id,
//       popup_html: htmlContent,   // ✅ IMPORTANT
//     };

//     await instructquote(payload);

//   } catch (error) {
//     console.error("Error sending HTML:", error);
//   } finally {
//     setinstructloader(false);
//   }
// }

async function sendHtmlToBackend() {
  try {
    if (!pdfRef?.current) return;

    pdfRef.current.style.maxHeight = "none";
    pdfRef.current.style.overflow = "visible";
    pdfRef.current.style.height = "auto";

    // 1. CLONE
    const instructClone = pdfRef.current.cloneNode(true);

    // 2. REMOVE UI SECTIONS (VERY IMPORTANT)
    instructClone.querySelectorAll('.sales-ui-details').forEach(el => el.remove());
    instructClone.querySelectorAll('.purchase-ui-details').forEach(el => el.remove());
    instructClone.querySelectorAll('.remortgage-ui-details').forEach(el => el.remove());

    // 3. INJECT STYLE (THIS IS THE CORRECT PLACE)
    const instructStyle = document.createElement('style');
    instructStyle.textContent = `
      .no-pdf { display: none !important; }
      .pdf-only { display: block !important; }

      .purchase-ui-details { display: none !important; }
      .sales-ui-details { display: none !important; }
      .remortgage-ui-details { display: none !important; }

      .purchase-pdf-summary { display: block !important; }
      .sales-pdf-summary { display: block !important; }
      .remortgage-pdf-summary { display: block !important; }

      .pdf-fee-table {
        font-size: 11px !important;
        line-height: 1.45 !important;
        width: 100% !important;
        border-collapse: collapse !important;
        table-layout: auto !important;
      }

      .pdf-fee-table th,
      .pdf-fee-table td {
        padding: 5px 8px !important;
        line-height: 1.45 !important;
        vertical-align: middle !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
      }
      
      .pdf-fee-table th {
        font-weight: bold !important;
        background-color: #f3f4f6 !important;
        border-bottom: 1px solid #d1d5db !important;
        text-align: left !important;
      }
      
      .pdf-fee-table th:nth-child(2),
      .pdf-fee-table th:nth-child(3) {
        text-align: right !important;
      }
      
      .pdf-fee-table td {
        border-bottom: 1px solid #e5e7eb !important;
        text-align: left !important;
      }
      
      .pdf-fee-table td:nth-child(2),
      .pdf-fee-table td:nth-child(3) {
        text-align: right !important;
      }
    `;

    instructClone.prepend(instructStyle);

    // 4. FINAL HTML
    const htmlContent = instructClone.outerHTML;

    let servicetype = localStorage.getItem("service");

    const payload = {
      ref_no: view_data?.service_details?.[0]?.quote_ref_number,
      servicetype: servicetype,
      quoteid: view_data?.quote_id,
      popup_html: htmlContent,
    };

    await instructquote(payload);

  } catch (error) {
    console.error("Error sending HTML:", error);
  } finally {
    setinstructloader(false);
  }
}


  const router = useRouter();
  useEffect(() => {
    if (hasCalledService.current) return;
    hasCalledService.current = true;

    async function qutesdata(formData) {
      try {
        let refNumberExist = query_ref_no || localStorage.getItem("ref_no");
        console.log("Using ref number:", query_ref_no);
        if (!refNumberExist || refNumberExist == "" || refNumberExist.trim() == "") {
          const response = await postData(API_ENDPOINTS.services, formData);
          console.log("✅ service API Response:", response?.service?.quote_ref_number);

          localStorage.setItem("ref_no", response?.service?.quote_ref_number);

          if (response.code === 200) {
            refNumberExist = response?.service?.quote_ref_number
            setref(response?.service?.quote_ref_number);
            setquotefound(true);
          } else {
            setquotefound(false);
            return;
          }
        }
        else {
          setref(refNumberExist);
          setquotefound(true);
        }

        setLoading(true);

        const quoteResponse = await getData(
          `${API_ENDPOINTS.quotesfilter}/${refNumberExist}`
        );

        if (quoteResponse?.status === false) {
          setcompanydata([]);
          setLoading(false);
          return;
        }

        setview_data(quoteResponse.data[0]);
        setquoteData(quoteResponse.data);

        const formatted = quoteResponse.data.map((item) => ({
          ...item,
          conveying_details: {
            ...item.conveying_details,
            logo: item.conveying_details.logo
              ? `${item.conveying_details.logo}`
              : null,
          },
        }));

        setcompanydata(formatted);
        setLoading(false);
        // localStorage.removeItem("getquote");
      } catch (error) {
        console.error("❌ API Error:", error);
        setLoading(false);
      }
    }

    const storedQuote = localStorage.getItem("getquote");
    const serviceType = localStorage.getItem("service");

    if (storedQuote && serviceType) {
      const parsedData = JSON.parse(storedQuote);
      parsedData.service_type = serviceType;
      parsedData.user_id = Number(localStorage.getItem("user"));

      setLoading(true);
      qutesdata(parsedData);

    }
    else if (query_ref_no && query_ref_no.length > 0) {
      setLoading(true);
      console.log("Using ref number:", query_ref_no);
      qutesdata(null);
    }
  }, []);
  //const searchParams = useSearchParams();

const hasAutoInstructed = useRef(false);

useEffect(() => {
  const quoteId = searchParams.get("quote_id");
  const customerId = searchParams.get("customer_id");
  const conveyingId = searchParams.get("conveying_id");

  if (
    quoteId &&
    customerId &&
    conveyingId &&
    quoteData?.length > 0 &&
    !hasAutoInstructed.current
  ) {
    const selectedQuote = quoteData.find(q => q.quote_id == quoteId);

    if (selectedQuote) {
      console.log("✅ Auto instruct triggered from email");
      hasAutoInstructed.current = true;

      // Show modal first
      showviewquotes(true);
      setcardshown(true);
      setview_data(selectedQuote);
      toggleDropdown(selectedQuote.conveying_details.conveying_id);

handleInstructFromCard(
  selectedQuote.conveying_details.company_name,
  selectedQuote.guest_id,
  selectedQuote.conveying_details.conveying_id,
  selectedQuote.quote_id,
  selectedQuote.customer_details.customer_id,
  selectedQuote?.service_details[0]?.taxInfo?.quote_id,
  selectedQuote.service_details[0].quote_ref_number,
  selectedQuote
);

    }
  }
}, [searchParams, quoteData]);



  function toggleDropdowncard(id) {
    console.log(id)
    if (dropdownOpenId === id) {
      // toggle same card
      setDropdownOpenId(prev => !prev);
    } else {
      // open new card
      setDropdownOpenId(id);
      setdropdownshow(true);
    }

  }



  function fetchtaxdetails(id) {
    const selectedquote = companydata.filter((item) => item.conveying_details.conveying_id == id);
    if (!Array.isArray(selectedquote) || selectedquote.length === 0) {
      console.warn("No company data found for conveying ID", id);
      return;
    }

    console.log(selectedquote)
    console.log(selectedquote[0].conveying_details.taxDetails);
    setgiftvalue(selectedquote[0].service_details[0].gift_deposit);
    console.log(giftvalue);
    let grouped;
    let grouped2;
    let sum = 0
    console.log(Object.keys(selectedquote[0].conveying_details.taxDetails).length)
    if (selectedquote[0].conveying_details.taxDetails && selectedquote[0].conveying_details.taxDetails[0]?.length) {
      grouped = selectedquote[0].conveying_details.taxDetails[0].reduce(
        (acc, item) => {
          const key = item.fees_category;
          let total = 'total'
          if (!acc[key]) {
            acc[key] = {
              items: [],
              total: 0,
              vat: 0,
              [`${key}${total}`]: 0,
            };
          }

          // ✅ push every item
          acc[key].items.push(item);

          // ✅ calculate total
          acc[key].total += Number(item.fee_amount) || 0;
          acc[key].vat += Number(item.vat) || 0;

          return acc;
        },
        {}
      );
    }
    if (selectedquote[0].conveying_details.taxDetails && selectedquote[0].conveying_details.taxDetails[1]?.length) {
      grouped2 = selectedquote[0].conveying_details.taxDetails[1].reduce(
        (acc, item) => {
          const key = item.fees_category;
          let total = 'total'
          if (!acc[key]) {
            acc[key] = {
              items: [],
              total: 0,
              vat: 0,
              [`${key}${total}`]: 0,
            };
          }

          // ✅ push every item
          acc[key].items.push(item);

          // ✅ calculate total
          acc[key].total += Number(item.fee_amount) || 0;
          acc[key].vat += Number(item.vat) || 0;

          return acc;
        },
        {}
      );
    }


    console.log("grouped", grouped);



    console.log(grouped2);

    settaxDetails(grouped);
    settaxDetails2(grouped2);

    const totalTaxVat = selectedquote[0].conveying_details.taxDetails[0].reduce((sum, item) => {

      sum += Number(item.vat)

      return sum;
    }, 0);

    const totalamount = selectedquote[0].conveying_details.taxDetails[0].reduce((sum, item) => {
      if (item.fee_amount > 0) {
        sum += Number(item.fee_amount)
      }
      return sum;
    }, 0);

    console.log("Total VAT:", totalamount);

    console.log("Total VAT:", totalTaxVat);
    setvattax(totalTaxVat);
    settotal(totalamount)

  }

  function handlefilterchange(selectedoption = []) {
    setfilterselected(selectedoption);

    if (!companydata || !Array.isArray(companydata)) return;

    let sorted = [...companydata];

    // If more than 2 options, sort by first and second as a combination
    if (selectedoption.length > 1) {
      const first = selectedoption[0]?.value;
      const second = selectedoption[1]?.value;
      sorted.sort((a, b) => {
        let result = 0;
        // First sort
        if (first === "Rating") {
          result = (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0);
        } else if (first === "Price") {
          const aPrice = Number(a.supplements || 0) + Number(a.disbursements || 0) + Number(a.legal_fees || 0);
          const bPrice = Number(b.supplements || 0) + Number(b.disbursements || 0) + Number(b.legal_fees || 0);
          result = aPrice - bPrice;
        } else if (first === "Language") {
          const aLang = a.conveying_details?.language || "";
          const bLang = b.conveying_details?.language || "";
          result = aLang.localeCompare(bLang);
        }
        // If equal, use second sort
        if (result === 0 && second) {
          if (second === "Rating") {
            result = (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0);
          } else if (second === "Price") {
            const aPrice = Number(a.supplements || 0) + Number(a.disbursements || 0) + Number(a.legal_fees || 0);
            const bPrice = Number(b.supplements || 0) + Number(b.disbursements || 0) + Number(b.legal_fees || 0);
            result = aPrice - bPrice;
          } else if (second === "Language") {
            const aLang = a.conveying_details?.language || "";
            const bLang = b.conveying_details?.language || "";
            result = aLang.localeCompare(bLang);
          }
        }
        return result;
      });
    } else if (selectedoption.length === 1) {
      // Only one sort
      const first = selectedoption[0]?.value;
      if (first === "Rating") {
        sorted.sort((a, b) => (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0));
      } else if (first === "Price") {
        sorted.sort((a, b) => {
          const aPrice = Number(a.supplements || 0) + Number(a.disbursements || 0) + Number(a.legal_fees || 0);
          const bPrice = Number(b.supplements || 0) + Number(b.disbursements || 0) + Number(b.legal_fees || 0);
          return aPrice - bPrice;
        });
      } else if (first === "Language") {
        sorted.sort((a, b) => {
          const aLang = a.conveying_details?.languages || "";
          const bLang = b.conveying_details?.languages || "";
          return aLang.localeCompare(bLang);
        });
      }
    }

    setcompanydata(sorted);
  }

  return (
    <div className=" bg-white antialiased font ">

      {pdfLoading && (
        <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4A7C59] border-t-transparent"></div>
          <p className="mt-3 text-sm font-medium text-gray-700">Preparing your PDF...</p>
        </div>
      )}

      <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
        <Navbar hide={!userlogin} />
      </div>


      {/* <main className="mx-auto max-w-[1200px] pt-10 px-4 lg:px-0 mb-10">
        KEY CHANGE: The main layout switches from a single column (default) to a two-column grid on 'lg' screens. */}
      {/* <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12"> */}
      {/* Left rail: stepper panel (Sidebar) */}
      {/* KEY CHANGE: Removed w-[400px] from here. It now spans the full width on small screens and is controlled by the grid on 'lg'. */}

      <main className="mx-auto max-w-[1200px] pt-2 px-4 lg:px-0 mb-5 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block z-49 fixed top-[20] bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] h-1/2 lg:h-[80vh] lg:w-[300px] w-full rounded-[20px] overflow-hidden bg-white lg:top-22" style={{ height: "88.5%" }}>
            <div className="p-6 h-full flex flex-col justify-around ">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="relative mr-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                    <Check size={18} />
                  </div>
                  <div className="absolute left-[19px] top-[40px] w-[2px] h-[510%] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1E1E1E]">STEP 1</div>
                  <div className="text-lg font-extrabold text-[#1E1E1E]">Property Details</div>
                  <div className="text-xs text-[#2D7C57] mt-1">Completed</div>
                </div>
              </div>

              {/* Step 2 (Current) */}
              <div className="flex items-start mt-6">
                <div className="relative mr-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                    <Check size={18} />
                  </div>
                  <div className="absolute left-[19px] top-[40px] w-[2px] h-[510%] bg-[#CFE3CF]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1E1E1E]">STEP 2</div>
                  <div className="text-lg font-extrabold text-[#1E1E1E]">Personal Details</div>
                  <div className="text-xs text-[#2D7C57] mt-1">Completed</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start mt-6">
                <div className="relative mr-4">
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E5C3B] bg-[#1E5C3B] text-white flex items-center justify-center">
                    <Check size={18} />
                  </div>

                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1E1E1E]">STEP 3</div>
                  <div className="text-lg font-extrabold text-[#1E1E1E]">Compare Quotes</div>
                  <div className="text-xs text-[#2D7C57] mt-1">Completed</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right section (Main Content) */}
          {/* KEY CHANGE: Removed col-start-2. The natural flow of the grid handles the stacking on mobile and placement on 'lg' */}
          <section className=" ">
            <div className="overflow-auto space-y-6 pr-2 rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white  lg:h-[690px] flex-1 p-4 sm:p-8 lg:p-10 lg:ml-83">
              <div className="p-4 sm:p-8">
                <nav
                  className="text-[13px] text-[#6B7280] mb-1 flex items-center gap-4"
                  aria-label="Breadcrumb"
                >
                  <Link href="/" className="other-page whitespace-nowrap">
                    Home
                  </Link>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">
                    Personal Details
                  </span>
                  <span className="hidden sm:inline">/</span>
                  <span className="other-page hidden sm:inline">
                    Property Details
                  </span>
                  <span>/</span>
                  <span className="live-page whitespace-nowrap">
                    Compare Quotes
                  </span>
                </nav>

                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit">
                  By completing this form your details are shared with up to 5
                  firms providing the quotes but absolutely no one else.
                </p>



                <div className="">

                  <Select
                    options={filteroption}
                    instanceId="filter-select"
                    isMulti
                    value={filterselected}
                    onChange={handlefilterchange}
                    placeholder="Sort by..."
                    className="text-black w-85 ml-auto"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: 44,
                        height: 44,
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                        borderColor: state.isFocused ? '#1E5C3B' : base.borderColor,
                        boxShadow: state.isFocused ? '0 0 0 1.5px #1E5C3B' : base.boxShadow,
                        '&:hover': {
                          borderColor: '#1E5C3B',
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        height: 44,
                        padding: '0 8px',
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                      }),
                      input: (base) => ({
                        ...base,
                        margin: 0,
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                      }),
                      option: (base, state) => ({
                        ...base,
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                        backgroundColor: state.isSelected || state.isFocused ? '#F6CE53' : base.backgroundColor,
                        color: state.isSelected || state.isFocused ? '#111' : base.color,
                        '&:hover': {
                          backgroundColor: '#F6CE53',
                          color: '#111',
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                        backgroundColor: '#1E5C3B',
                        color: '#fff',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#fff',
                        fontFamily: 'Outfit, Arial, sans-serif',
                        fontWeight: 700,
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: '#fff',
                        ':hover': {
                          backgroundColor: '#16472F',
                          color: '#fff',
                        },
                      }),
                    }}
                  />
                </div>



                <div className="mt-8 space-y-6">
                  {loading && (
                    <div className="flex flex-col justify-center items-center py-6">
                      <div className="h-8 w-8 border-2 border-[#4A7C59] border-t-transparent rounded-full animate-spin"></div>
                      <div className="mt-2.5 text-gray-500">
                        Your quotes are loading...
                      </div>
                    </div>
                  )}
                  {/* SHOW MESSAGE HERE */}
                  {companydata?.length === 0 && (
                    <div className="text-center py-10">
                      <p className=" text-[14px] text-[#6B7280]">
                        No quotes found for your property details
                      </p>
                    </div>
                  )}
                  {companydata?.map((quote, index) => (
                    <div
                      key={index}
                      className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full"
                    >
                      {/* Card Header */}
                      <div
                        className={`flex flex-col sm:flex-row items-center justify-between   ${index % 2 === 0 ? "bg-green-50" : "bg-red-50"
                          }  mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5`}
                      >
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          {quote.conveying_details.logo ? (
                            <img
                              width={40}
                              height={40}
                              src={quote.conveying_details.logo}
                              alt={quote.company_name || "company logo"}
                            // <- controls visible size
                            />
                          ) : (
                            <Image
                              width={35}
                              height={35}
                              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                              alt={quote.company_name || "company logo"}
                              className="object-contain"
                            />
                          )}
                          <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                            {quote.conveying_details.company_name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              {formatGBP(
                                Number(quote.supplements || 0) +
                                Number(quote.disbursements || 0) +
                                Number(quote.legal_fees || 0)
                              )}                            </p>
                            <button
                              className="text-green-700 text-sm font-medium hover:underline cursor-pointer"
                              onClick={() => toggleDropdown(quote.conveying_details.conveying_id)}
                            >
                              {dropdownOpenId === quote.quote_id ? (
                                <u> Price Breakdown</u>
                              ) : (
                                <u>Price Breakdown</u>
                              )}
                            </button>


                          </div>
                          <div
                            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer"
                            onClick={() => toggleDropdowncard(quote.conveying_details.conveying_id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${dropdownOpenId === quote.conveying_details.conveying_id
                                ? "rotate-180"
                                : ""
                                }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 9l6 6 6-6"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content */}

                      <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          {/* Left: Reviews - Static placeholder */}
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Rating
                                initialValue={
                                  quote.conveying_details.ratings || 4
                                } // dynamic rating from API
                                readonly
                                size={20}
                                allowFraction
                              />
                              <span className="pl-2 font-bold text-green-700">
                                {quote.conveying_details.ratings || 4} out of 5
                              </span>
                            </div>
                           <div className="flex gap-4 mt-3 text-green-700">
  
                            {/* Recommended */}
                            <div className="flex flex-col items-center text-green-700">
                              <CircularProgress progress={quote.conveying_details.recomended || 80} />
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Rated
                              </span>
                            </div>

                            {/* SRA */}
                            <div className="flex flex-col items-center text-green-700">
                              <CircularProgress progress={quote.conveying_details.sra || 90} />
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Regulated
                              </span>
                            </div>

                            {/* Reliable */}
                            <div className="flex flex-col items-center text-green-700">
                              <CircularProgress progress={quote.conveying_details.reliable || 85} />
                              <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                Reliable
                              </span>
                            </div>

                          </div>

                            {/* <p className="text-sm mt-1">
                              <span className="font-bold text-[#4A7C59]">
                                {quote.conveying_details?.rating ?? 0} out of 5
                              </span>
                            <span className="font-bold text-white text-xs px-1 py-0.5 rounded"
                                style={{ backgroundColor: '#4A7C59' }}
                              >
                                {quote.conveying_details?.badge ?? 'Reliable'}
                              </span>


                              {quote.conveying_details?.reviews_count && (
                                <span className="text-black">
                                  {" "}
                                  ({quote.conveying_details.reviews_count}{" "}
                                  reviews)
                                </span>
                                
                              )}
                            </p> */}

                          </div>

                          {/* Middle: Features - Static placeholder */}
                          <ul className="text-xs text-gray-700 space-y-2 font-normal text-[12px] list-none pl-4">

                          </ul>

                          {/* Right: Buttons */}
                          <div className="flex flex-row gap-2 justify-start lg:col-start-3 lg:justify-end">

                          <button
                            disabled={pdfLoading || pendingDownload}
                            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer
                              ${pdfLoading || pendingDownload
                                ? "bg-[#4A7C59]/70 cursor-not-allowed"
                                : "bg-[#4A7C59] hover:bg-[#3b6248] text-white"}
                              mx-auto block md:inline-block`}
                            onClick={() => handleDownloadFromCard(quote)}
                          >
                            {pdfLoading || pendingDownload ? "Downloading..." : "Download"}
                          </button>
                            <button
                              disabled={instructloader}
                              className={`px-3 py-1.5 rounded-full text-sm cursor-pointer
                                ${instructloader
                                  ? "bg-[#4A7C59]/70 cursor-not-allowed"
                                  : "bg-[#4A7C59] hover:bg-[#3b6248] text-white"}
                                      mx-auto  // This will center the button horizontally
                                      block md:inline-block  // Ensures it is block on mobile and inline-block on desktop`}
                              onClick={() => {

                                 toggleDropdown(quote.conveying_details.conveying_id);

                                  handleInstructFromCard(
                                    quote.conveying_details.company_name,
                                    quote.guest_id,
                                    quote.conveying_details.conveying_id,
                                    quote.quote_id,
                                    quote.customer_details.customer_id,
                                    quote?.service_details[0]?.taxInfo?.quote_id,
                                    quote.service_details[0].quote_ref_number,
                                    quote
                                  );

                              }

                              }
                            >
                              {instructloader ? "Processing..." : "Instruct"}
                            </button>

                          </div>
                        </div>
                        {dropdownOpenId === quote.conveying_details.conveying_id &&
                          dropdownshow && (
                            <>
                              {view_data.service_details.length > 1 && (
                                <>
                                  {/* Sales Section */}
                                  <div className="pt-2 border-t border-gray-200">
                                    <h2 className="text-right mr-40 font-semibold text-emerald-600">Sales</h2>
                                    <div className=" pt-2 flex justify-end" >
                                      <table className="border-collapse text-black font">
                                        <thead>
                                          <tr className="border-b border-gray-300 text-left grid grid-cols-3 w-full gap-5">
                                            <th className="text-sm font-semibold">Type</th>
                                            <th className="text-sm font-semibold">Fee Amount</th>
                                            <th className="text-sm font-semibold">VAT</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* Legal Fees */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm font-bold">Legal Fees</td>
                                            <td className="text-sm font-semibold text-emerald-600">{formatGBP(quote.service_details[0].taxInfo.legal_fees)}</td>
                                            <td className="text-sm text-emerald-600 font-semibold">{formatGBP(quote.service_details[0].taxInfo.vat)}</td>
                                          </tr>

                                          {/* Supplements */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm">Supplements</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[0].taxInfo.supplements)}</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[0].taxInfo.supplementsvat)}</td>
                                          </tr>

                                          {/* Disbursements */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm">Disbursements</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[0].taxInfo.disbursements)}</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[0].taxInfo.disbursementsvat)}</td>
                                          </tr>

                                          {/* TOTAL */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-t border-gray-300 bg-gray-50">
                                            <td className="text-sm font-semibold">Total</td>
                                            <td className="text-sm font-semibold text-emerald-600">
                                              {formatGBP(
                                                quote.service_details[0].taxInfo.total
                                              )}
                                            </td>
                                            <td className="text-sm font-semibold text-emerald-600">
                                              {formatGBP(quote.service_details[0].taxInfo.vat)}
                                            </td>
                                          </tr>

                                          {/* Country-Based Taxes */}
                                          {quote.service_details && quote.service_details[0]?.service_type == 2 && (
                                            <>
                                              {(quote.service_details[0].country === "England" ||
                                                quote.service_details[0].country === "Northern Ireland") && (
                                                  <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                                    <td className="text-sm font-semibold">Stamp Duty</td>
                                                    <td className="text-sm">{formatGBP(quote.stamp_duty)}</td>
                                                    <td className="text-sm">-</td>
                                                  </tr>
                                                )}

                                              {quote.service_details[0].country === "Scotland" && (
                                                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                                  <td className="text-sm font-semibold">LBTT</td>
                                                  <td className="text-sm">{formatGBP(quote.lbtt)}</td>
                                                  <td className="text-sm">-</td>
                                                </tr>
                                              )}

                                              {quote.service_details[0].country === "Wales" && (
                                                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                                  <td className="text-sm font-semibold">LLT</td>
                                                  <td className="text-sm">{formatGBP(quote.llt)}</td>
                                                  <td className="text-sm">-</td>
                                                </tr>
                                              )}
                                            </>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  {/* Purchase Section */}
                                  <div className="pt-2 border-t border-gray-200"> <h2 className="text-right mr-40 font-semibold text-emerald-600">Purchase</h2>
                                    <div className=" pt-2 flex justify-end" >

                                      <table className="border-collapse text-black font">
                                        <thead>
                                          <tr className="border-b border-gray-300  grid grid-cols-3 w-full gap-5">
                                            <th className="text-sm font-semibold">Type</th>
                                            <th className="text-sm font-semibold">Fee Amount</th>
                                            <th className="text-sm font-semibold">VAT</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* Legal Fees */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm font-bold">Legal Fees</td>
                                            <td className="text-sm font-semibold text-emerald-600">{formatGBP(quote.service_details[1].taxInfo.legal_fees)}</td>
                                            <td className="text-sm text-emerald-600 font-semibold">{formatGBP(quote.service_details[1].taxInfo.vat)}</td>
                                          </tr>

                                          {/* Supplements */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm">Supplements</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[1].taxInfo.supplements)}</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[1].taxInfo.supplementsvat)}</td>
                                          </tr>

                                          {/* Disbursements */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-gray-200">
                                            <td className="text-sm">Disbursements</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[1].taxInfo.disbursements)}</td>
                                            <td className="text-sm">{formatGBP(quote.service_details[1].taxInfo.disbursementsvat)}</td>
                                          </tr>

                                          {/* TOTAL */}
                                          <tr className="grid grid-cols-3 w-full gap-5 border-t border-gray-300 bg-gray-50">
                                            <td className="text-sm font-semibold">Total</td>
                                            <td className="text-sm font-semibold text-emerald-600">
                                              {formatGBP(quote.service_details[1].taxInfo.total)}
                                            </td>
                                            <td className="text-sm font-semibold text-emerald-600">
                                              {formatGBP(quote.service_details[1].taxInfo.vat)}
                                            </td>
                                          </tr>

                                          {/* Country-Based Taxes */}
                                          <>
                                            {(quote.service_details[1].country === "England" ||
                                              quote.service_details[1].country === "Northern Ireland") && (
                                                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200 pt-2">
                                                  <td className="text-sm font-semibold">Stamp Duty</td>
                                                  <td className="text-sm">{formatGBP(quote.stamp_duty)}</td>
                                                  <td className="text-sm">-</td>
                                                </tr>
                                              )}

                                            {quote.service_details[1].country === "Scotland" && (
                                              <tr className="grid grid-cols-3 w-full gap-5 border-gray-200 pt-2">
                                                <td className="text-sm font-semibold">LBTT</td>
                                                <td className="text-sm">{formatGBP(quote.lbtt)}</td>
                                                <td className="text-sm">-</td>
                                              </tr>
                                            )}

                                            {quote.service_details[1].country === "Wales" && (
                                              <tr className="grid grid-cols-3 w-full gap-5 border-gray-200 pt-2">
                                                <td className="text-sm font-semibold">LLT</td>
                                                <td className="text-sm">{formatGBP(quote.llt)}</td>
                                                <td className="text-sm">-</td>
                                              </tr>
                                            )}
                                          </>

                                        </tbody>
                                      </table>
                                    </div></div>
                                </>
                              )}

                              {view_data.service_details.length === 1 && (
                                <>
                                  <div className="border-t border-gray-200 pt-6 flex justify-end">
                                    <table className=" border-collapse text-black font">
                                      <thead>
                                        <tr className="border-b border-gray-300 text-left grid grid-cols-3 w-full gap-5">
                                          <th className=" text-sm font-semibold  ">Type</th>
                                          <th className="text-sm font-semibold  ">Fee Amount</th>
                                          <th className="text-sm font-semibold ">VAT</th>
                                        </tr>
                                      </thead>

                                      <tbody>

                                        {/* Legal Fees */}
                                        <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
                                          <td className="text-sm font-bold">Legal Fees</td>
                                          <td className="text-sm font-semibold text-emerald-600">{formatGBP(quote.legal_fees)}</td>
                                          <td className="text-sm text-emerald-600 font-semibold">{formatGBP(quote.vat)}</td>
                                        </tr>
                                        <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
                                          <td className="text-sm ">Supplements</td>
                                          <td className="text-sm ">{formatGBP(quote.supplements)}</td>
                                          <td className="text-sm ">  {formatGBP(quote.supplementsvat)}
                                          </td>
                                        </tr>

                                        {/* Disbursements */}
                                        <tr className="grid grid-cols-3 w-full gap-5  border-gray-200">
                                          <td className="text-sm ">Disbursements</td>
                                          <td className="text-sm ">{formatGBP(quote.disbursements)}</td>
                                          <td className="text-sm ">
                                            {formatGBP(quote.disbursementsvat)}
                                          </td>
                                        </tr>

                                        {/* Country-Based Taxes (Optional Rows) */}


                                        {/* TOTAL — Border ONLY ABOVE */}
                                        <tr className="grid grid-cols-3 w-full gap-5 border-t border-gray-300 bg-gray-50">
                                          <td className="text-sm font-semibold">Total</td>
                                          <td className="text-sm font-semibold text-emerald-600">
                                            {formatGBP(
                                              Number(quote.supplements || 0) +
                                              Number(quote.disbursements || 0) +
                                              Number(quote.legal_fees || 0)
                                            )}
                                          </td>
                                          <td className="text-sm font-semibold text-emerald-600">{formatGBP(Number(quote.disbursementsvat) + Number(quote.supplementsvat) + Number(quote.vat))}</td>
                                        </tr>
                                        {quote.service_details[0].service_type == 2 && (
                                          <>
                                            {(quote.service_details[0].country === "England" ||
                                              quote.service_details[0].country === "Northern Ireland") && (
                                                <tr className="grid grid-cols-3 w-full gap-5 border-gray-200 pt-2">
                                                  <td className="text-sm font-semibold ">Stamp Duty</td>
                                                  <td className="text-sm ">{formatGBP(quote.stamp_duty)}</td>
                                                  <td className="text-sm">-</td>
                                                </tr>
                                              )}

                                            {quote.service_details[0].country === "Scotland" && (
                                              <tr className="grid grid-cols-3 w-full gap-5  border-gray-200 pt-2">
                                                <td className="text-sm font-semibold "> LBTT</td>
                                                <td className="text-sm ">{formatGBP(quote.lbtt)}</td>
                                                <td className="text-sm ">-</td>
                                              </tr>
                                            )}

                                            {quote.service_details[0].country === "Wales" && (
                                              <tr className="grid grid-cols-3 w-full gap-5  border-gray-200 pt-2">
                                                <td className="text-sm font-semibold">LLT</td>
                                                <td className="text-sm ">{formatGBP(quote.llt)}</td>
                                                <td className="text-sm ">-</td>
                                              </tr>
                                            )}
                                          </>
                                        )}
                                      </tbody>

                                    </table>
                                  </div>
                                </>
                              )}
                            </>
                          )}



                        {/* Description + Price Breakdown */}



                        {cardid === quote.conveying_details.conveying_id && viewquotes && (
                          <div className="fixed inset-0  z-50 flex items-center justify-center  top-10  animate-fadeIn">
                            <div className="bg-white h-[200px] rounded-2xl  w-[90%] min-h-screen overflow-y-auto text-center shadow-2xl border border-green-200 animate-popIn">
                             <div className="absolute  right-4 md:top-3 md:right-32">
                                <button
                                  className="text-3xl md:text-4xl text-gray-700 p-2 md:p-0"
                                  onClick={() => showviewquotes(false)}
                                >
                                  ×
                                </button>
                              </div>


                              <div className="font-family min-h-screen p-5  text-black">
                                {/* ---------- TOP BUTTONS ---------- */}
                                <div className="grid grid-cols-12 items-center m-3 md:m-6 px-2 md:px-4">
                                      {/* Back button - Left */}
                                      <div className="col-span-4 md:col-span-1 flex justify-start">
                                        <button
                                          className="border px-2 py-1.5 md:px-4 md:py-2 rounded text-emerald-600 text-xs sm:text-sm"
                                          onClick={() => showviewquotes(false)}
                                        >
                                          Back
                                        </button>
                                      </div>

                                      {/* Center Title */}
                                      <div className="col-span-4 md:col-span-8 flex justify-center">
                                        <span className="text-[18px] sm:text-[22px] md:text-[34px] p-1 md:p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center truncate max-w-full">
                                          <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto md:mx-0"
                                        />
                                        </span>
                                      </div>

                                      {/* Instruct button - Right */}
                                      <div className="col-span-4 md:col-span-3 flex justify-end">
                                        <button
                                          disabled={instructloader}
                                          className={`border px-2 py-1.5 md:px-4 md:py-2 rounded text-xs sm:text-sm cursor-pointer
                                            ${
                                              instructloader
                                                ? "opacity-50 cursor-not-allowed"
                                                : "text-emerald-600"
                                            }`}
                                                onClick={() => {
                                                  handleInstructFromCard(
                                                    quote.conveying_details.company_name,
                                                    quote.guest_id,
                                                    quote.conveying_details.conveying_id,
                                                    quote.quote_id,
                                                    quote.customer_details.customer_id,
                                                    quote?.service_details[0]?.taxInfo?.quote_id,
                                                    quote.service_details[0].quote_ref_number,
                                                    quote
                                                  );
                                                }}

                                        >
                                          {instructloader ? "Processing..." : "Instruct"}
                                        </button>
                                         {/* <button className="border px-4 py-2 rounded text-emerald-600 text-sm" onClick={generatePDF}>
      Download
    </button> */}
                                      </div>
                                    </div>

                                {instructloader && (
                                  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/5 backdrop-blur-sm">
                                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent"></div>
                                    <div className="mt-1 text-gray-600">
                                      Processing...
                                    </div>
                                  </div>

                                )}


                                {/* ---------- MAIN CONTAINER ---------- */}
                                  <div ref={pdfRef} id="quote-popup" className="quote-mobile border  rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes" style={{
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
                                  {/* ---------- COMPANY LOGO + RATING ---------- */}
                                  <table className="w-full font  border-collapse mb-6">
                                    <tbody>
                                      {/* Company Logo Row */}
                                      <tr>
                                        <td colSpan="2" className="p-4 text-left md:text-left text-center">
                                      {view_data?.appsetting_details?.logo ? (
                                        <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto md:mx-0"
                                        />
                                      ) : (
                                        <span className="block text-[22px] sm:text-[28px] md:text-[34px] me-1 p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center md:text-left">
                                          {view_data?.appsetting_details?.company_name || "MovWise"}
                                        </span>
                                      )}
                                    </td>


                                        <td>

                                        </td>
                                        {/* <td colSpan="2" className="p-3"> 
                                             <span className="text-[34px] col-span-2 me-1 p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
                                                {view_data?.appsetting_details?.company_name || "MovWise"}
                                              </span> 
                                             </td> */}
                                      </tr>

                                      {/* Contact Details and User Details in Single Row */}
                                 <tr className="border-gray-200 block md:table-row">
                                        {/* Contact Details Column */}
                                        <td className="p-1 border-gray-200 align-top w-full md:w-1/2 block md:table-cell">
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                            <h4 className="font-semibold text-emerald-700 mb-3">Conveyancer Details</h4>
                                            <div className="space-y-2">
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Name:</span>
                                                <span className="text-sm">{quote.conveying_details.company_name || "N/A"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Phone:</span>
                                                <span className="text-sm">{view_data?.appsetting_details?.phone_number || "N/A"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Email:</span>
                                                <a
                                                  href={`mailto:${view_data?.appsetting_details?.email}`}
                                                  className="text-emerald-600 text-sm break-all"
                                                >
                                                  {view_data?.appsetting_details?.email}
                                                </a>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Quote Ref:</span>
                                                <span className="text-sm">{quote.service_details[0].quote_ref_id || "--"}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>

                                        {/* User Details Column */}
                                        <td className="p-1 align-top w-full md:w-1/2 block md:table-cell mt-2 md:mt-0">
                                          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                            <h4 className="font-semibold text-emerald-700 mb-3">Client Details</h4>
                                            <div className="space-y-2">
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Name:</span>
                                                <span className="text-sm">
                                                  {quote?.customer_details?.first_name} {quote?.customer_details?.last_name}
                                                </span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Email:</span>
                                                <span className="text-sm break-all">{quote?.customer_details?.email || "--"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Phone:</span>
                                                <span className="text-sm">{quote?.customer_details?.phone_number || "--"}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-x-1">
                                                <span className="font-semibold text-sm">Address:</span>
                                                <span className="text-sm">{quote?.service_details[0]?.address || "--"}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>

                                    </tbody>
                                  </table>

                                  {/* ---------- YOUR DETAILS ---------- */}

                                  <div className="grid grid-cols-1 font gap-6">
                                    <div className="">


                                      {view_data.service_details.length == 1 && (<>
                                        {(view_data.service_details[0].service_type == 1) && <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                    {(view_data.service_details[0].service_type == 4) && <RemortagePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 2) && <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                        {(view_data.service_details[0].service_type == 5) && <EquityPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}  </>
                                        
                                      )}
                                      {view_data.service_details.length > 1 && (<>
                                        <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice}  /> <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[1]} companydata={companydata} cardid={cardid} taxDetails={taxDetails2} giftvalue={giftvalue} handleprice={handleprice} lenders={lenders} /></>)}

                                    </div>



                                  </div>

                                  {/* ---------- FEES SECTION ---------- */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="">
                                    </div>

                                  </div>


                                  <div className="  w-full"></div>

                                  {/* ---------- NOTES ---------- */}
                                  <div className="font">
                                    <h4>Notes</h4>

                                    {quote?.conveying_details?.notes ? (
                                      <div
                                        className="text-xs mt-4 font  text-start"
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(quote.conveying_details.notes),
                                        }}
                                      />
                                    ) : (
                                      <p className="text-xs mt-4">
                                        No notes provided by the firm.
                                      </p>
                                    )}
                                  </div>

                                </div>
                                <div ref={pdfRef} id="quote-popup" className=" quote-desktop border  rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes" style={{
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
                                  {/* ---------- COMPANY LOGO + RATING ---------- */}
                                  <table className="w-full font  border-collapse mb-6">
                                    <tbody>
                                      {/* Company Logo Row */}
                                      <tr>
                                        <td colSpan="2" className="p-4 text-left md:text-left text-center">
                                      {view_data?.appsetting_details?.logo ? (
                                        <img
                                          width={140}
                                          height={100}
                                          src={view_data?.appsetting_details?.logo}
                                          alt={quote.company_name || "company logo"}
                                          className="mx-auto md:mx-0"
                                        />
                                      ) : (
                                        <span className="block text-[22px] sm:text-[28px] md:text-[34px] me-1 p-2 leading-tight md:leading-none font-extrabold text-[#1E5C3B] tracking-tight text-center md:text-left">
                                          {view_data?.appsetting_details?.company_name || "MovWise"}
                                        </span>
                                      )}
                                    </td>


                                        <td>

                                        </td>
                                        {/* <td colSpan="2" className="p-3"> 
                                             <span className="text-[34px] col-span-2 me-1 p-2 leading-none font-extrabold text-[#1E5C3B] tracking-tight">
                                                {view_data?.appsetting_details?.company_name || "MovWise"}
                                              </span> 
                                             </td> */}
                                      </tr>

                                      {/* Contact Details and User Details in Single Row */}
                                      <tr>
                                        <td style={{ width: "50%", verticalAlign: "top", padding: "10px" }}>
                                          <div
  className="pdf-info-card"
  style={{
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "6px"
  }}
>
                                            <h4 style={{ color: "#059669", marginBottom: "12px", textAlign: "center" }}>
                                              Conveyancer Details
                                            </h4>

                                            <div style={{ fontSize: "13px", lineHeight: "1.6",textAlign: "left" }}>
                                              <div><strong>Name:</strong> {quote.conveying_details.company_name || "N/A"}</div>
                                              <div><strong>Phone:</strong> {view_data?.appsetting_details?.phone_number || "N/A"}</div>
                                              <div><strong>Email:</strong> {view_data?.appsetting_details?.email || "N/A"}</div>
                                              <div><strong>Quote Ref:</strong> {quote.service_details[0].quote_ref_id || "--"}</div>
                                            </div>
                                          </div>
                                        </td>

                                        <td style={{ width: "50%", verticalAlign: "top", padding: "10px" }}>
                                        <div
  className="pdf-info-card"
  style={{
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "6px"
  }}
>
                                            <h4 style={{ color: "#059669", marginBottom: "12px",textAlign: "center" }}>
                                              Client Details
                                            </h4>

                                            <div style={{ fontSize: "13px", lineHeight: "1.6",textAlign: "left" }}>
                                              <div>
                                                <strong>Name:</strong> {quote?.customer_details?.first_name} {quote?.customer_details?.last_name}
                                              </div>
                                              <div><strong>Email:</strong> {quote?.customer_details?.email || "--"}</div>
                                              <div><strong>Phone:</strong> {quote?.customer_details?.phone_number || "--"}</div>
                                              <div><strong>Address:</strong> {quote?.service_details[0]?.address || "--"}</div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>

                                    </tbody>
                                  </table>

                                  {/* ---------- YOUR DETAILS ---------- */}

                                  <div className="grid grid-cols-1 font gap-6">
                                    <div className="">


                                      {view_data.service_details.length == 1 && (<>
                                        {(view_data.service_details[0].service_type == 1) && <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders}  />}
                                        {(view_data.service_details[0].service_type == 2) && <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 4) && <RemortagePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} lenders={lenders} />}
                                        {(view_data.service_details[0].service_type == 5) && <EquityPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language}lenders={lenders}/>}  </>
                                      )}
                                      {view_data.service_details.length > 1 && (<>
                                        <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} /> <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[1]} companydata={companydata} cardid={cardid} taxDetails={taxDetails2} giftvalue={giftvalue} handleprice={handleprice} lenders={lenders} /></>)}

                                    </div>



                                  </div>

                                  {/* ---------- FEES SECTION ---------- */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="">
                                    </div>

                                  </div>


                                  <div className="  w-full"></div>

                                  {/* ---------- NOTES ---------- */}
                                  <div className="font pdf-notes-section"
                                   style={{ pageBreakBefore: "always" }}>
                                    <h4>Notes</h4>

                                    {quote?.conveying_details?.notes ? (
                                      <div
                                        className="text-xs mt-4 font  text-start"
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(quote.conveying_details.notes),
                                        }}
                                      />
                                    ) : (
                                      <p className="text-xs mt-4">
                                        No notes provided by the firm.
                                      </p>
                                    )}
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                    </div>

                  ))}
                  <p></p>
                </div>




              </div>
            </div>

            {/* Bottom actions */}
          </section>




          {/* Popup Modal for Instruct */}

        </div>
      </main>


     <div className=" pb-4 text-center text-gray-700 text-sm">
          <p>&copy; {new Date().getFullYear()} MovWise. All rights reserved.</p>
        </div>
    </div>
  );
}

export default function Comparequotes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ComparequotesContent />
    </React.Suspense>
  );
}
// ttgvggvgvgvgccgcgcgcgcgcgcgcgc
//nhnfrnnr
//hrfrjngktkmg