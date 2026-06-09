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
import Select from 'react-select';
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";

const getTaxTotal = (taxInfo = {}, fallback = {}) => {
  return (
    Number(taxInfo.vat ?? fallback.vat ?? 0) +
    Number(taxInfo.supplementsvat ?? fallback.supplementsvat ?? 0) +
    Number(taxInfo.disbursementsvat ?? fallback.disbursementsvat ?? 0)
  );
};

// Reusable component for fees table
const FeesTable = ({ quote, label = "Survey" }) => {
  // If quote contains multiple service_details, compute totals from each service's taxInfo
  const computed = (quote?.service_details && Array.isArray(quote.service_details) && quote.service_details.length > 0)
    ? quote.service_details.reduce((acc, sd) => {
        const t = sd.taxInfo || {};
        acc.legal_fees += Number(t.legal_fees || 0);
        acc.vat += Number(t.vat || 0);
        acc.supplements += Number(t.supplements || 0);
        acc.supplementsvat += Number(t.supplementsvat || 0);
        acc.disbursements += Number(t.disbursements || 0);
        acc.disbursementsvat += Number(t.disbursementsvat || 0);
        return acc;
      }, { legal_fees: 0, vat: 0, supplements: 0, supplementsvat: 0, disbursements: 0, disbursementsvat: 0 })
    : null;

  const legalFees = Number(quote.fees_amount || 0);
  const vatValue =  Number(quote.vat || 0);
  const supplements = computed ? computed.supplements : Number(quote.supplements || 0);
  const supplementsvat = computed ? computed.supplementsvat : Number(quote.supplementsvat || 0);
  const disbursements = computed ? computed.disbursements : Number(quote.disbursements || 0);
  const disbursementsvat = computed ? computed.disbursementsvat : Number(quote.disbursementsvat || 0);

  // Compute total VAT defensively from service_details when available
  const totalVatComputed =  Number(vatValue || 0) ;
  // Debug: log computed VAT breakdown for diagnosis (remove after verification)
  try {
    console.log('FeesTable VAT breakdown', {
      quote_id: quote?.quote_id || quote?.id || null,
      legalFees,
      vatValue,
      supplements,
      supplementsvat,
      disbursements,
      disbursementsvat,
      totalVatComputed,
      source: computed ? 'service_details' : 'quote'
    });
  } catch (e) {}

  return (
    <div className="border-t border-gray-200 pt-6 flex justify-end">
      <table className="pdf-fee-table border-collapse text-black font">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="text-sm font-semibold px-3 ">Type</th>
            <th className="text-sm font-semibold px-1">Fee Amount</th>
            <th className="text-sm font-semibold px-1 ">VAT</th>
          </tr>
        </thead>
        <tbody>
          {/* Legal Fees / Survey Fee */}
          <tr className="border-gray-200">
            <td className="text-sm font-bold text-emerald-600 px-3 ">{label} Fee</td>
            <td className="text-sm font-semibold text-emerald-600 px-1">{formatGBP(legalFees)}</td>
            <td className="text-sm text-emerald-600 font-semibold px-1 ">{formatGBP(vatValue)}</td>
          </tr>

          {/* Supplements */}
          {supplements > 0 && (
            <tr className="border-gray-200">
              <td className="text-sm px-3 py-2">Supplements</td>
              <td className="text-sm px-3 py-2">{formatGBP(supplements)}</td>
              <td className="text-sm px-3 py-2">{formatGBP(supplementsvat)}</td>
            </tr>
          )}

          {/* Disbursements */}
          {disbursements > 0 && (
            <tr className="border-gray-200">
              <td className="text-sm px-3 py-2">Disbursements</td>
              <td className="text-sm px-3 py-2">{formatGBP(disbursements)}</td>
              <td className="text-sm px-3 py-2">{formatGBP(disbursementsvat)}</td>
            </tr>
          )}

          {/* TOTAL */}
          <tr className="border-t border-gray-300 bg-gray-50">
            <td className="text-sm font-semibold text-emerald-600 px-3 ">Total</td>
            <td className="text-sm font-semibold text-emerald-600 px-1 ">
              {formatGBP(Number(supplements || 0) + Number(disbursements || 0) + Number(legalFees || 0))}
            </td>
            <td className="text-sm font-semibold text-emerald-600 px-1 ">
              {formatGBP(totalVatComputed)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const CircularProgress = ({ progress }) => {
  const radius = 16;
  const stroke = 4;
  const size = radius * 2 + stroke;
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
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.35s" }}
          />
        </svg>

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

function SurveyorquotesContent() {
  const searchParams = useSearchParams();
  const query_ref_no = searchParams.get("ref_no");
  const router = useRouter();

  const [companydata, setcompanydata] = useState([]);
  const [quoteData, setquoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, setref] = useState("");
  const [quotefound, setquotefound] = useState(false);
  const [userlogin, setuserlogin] = useState(false);
  
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);
  const pdfRef = useRef(null);
  const hasCalledService = useRef(false);

  const [filteroption] = useState([
    { value: "Rating", label: "Rating" },
    { value: "Language", label: "Language" },
    { value: "Price", label: "Price" },
  ]);
  const [filterselected, setfilterselected] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("logintype")) {
      setuserlogin(true);
    }
  }, []);

  useEffect(() => {
    if (hasCalledService.current) return;
    hasCalledService.current = true;

    async function quotesdata(formData) {
      try {
        let refNumberExist = query_ref_no || localStorage.getItem("ref_no");

        if (!refNumberExist || refNumberExist == "" || refNumberExist.trim() == "") {
          const response = await postData(API_ENDPOINTS.createsurveyor, formData);
          localStorage.setItem("ref_no", response?.service?.quote_ref_number);

          if (response.code === 200) {
            refNumberExist = response?.service?.quote_ref_number;
            setref(response?.service?.quote_ref_number);
            setquotefound(true);
          } else {
            setquotefound(false);
            return;
          }
        } else {
          setref(refNumberExist);
          setquotefound(true);
        }

        setLoading(true);

        const quoteResponse = await getData(
          `${API_ENDPOINTS.surveyorquotes}/${refNumberExist}`
        );

        if (quoteResponse?.status === false) {
          setcompanydata([]);
          setLoading(false);
          return;
        }

        const formatted = quoteResponse.data.map((item) => ({
          ...item,
          conveying_details: {
            ...item.conveying_details,
            logo: item.conveying_details.logo
              ? `${item.conveying_details.logo}`
              : null,
          },
        }));

        setquoteData(quoteResponse.data);
        setcompanydata(formatted);
        setLoading(false);
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
      quotesdata(parsedData);
    } else if (query_ref_no && query_ref_no.length > 0) {
      setLoading(true);
      quotesdata(null);
    }
  }, []);

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

        const injectedPdfStyles = document.createElement('style');
        injectedPdfStyles.textContent = `
          .pdf-fee-table, [data-pdf-fee-table="1"],
          .pdf-fee-table th, [data-pdf-fee-table="1"] th,
          .pdf-fee-table td, [data-pdf-fee-table="1"] td {
            border: 0.05px solid rgba(0,0,0,0.06) !important;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            background-color: #ffffff !important;
          }
          .pdf-fee-table, [data-pdf-fee-table="1"] {
            width: 100% !important;
            table-layout: auto !important;
            border: 0.05px solid rgba(0,0,0,0.06) !important;
            box-sizing: border-box !important;
            margin-top: 14px !important;
            margin-bottom: 14px !important;
          }
          .pdf-fee-table th, [data-pdf-fee-table="1"] th {
            background-color: #f8fafc !important;
            border-bottom: 0.05px solid rgba(0,0,0,0.06) !important;
            text-align: left !important;
          }
          .pdf-fee-table th:nth-child(2),
          .pdf-fee-table th:nth-child(3),
          .pdf-fee-table td:nth-child(2),
          .pdf-fee-table td:nth-child(3),
          [data-pdf-fee-table="1"] th:nth-child(2),
          [data-pdf-fee-table="1"] th:nth-child(3),
          [data-pdf-fee-table="1"] td:nth-child(2),
          [data-pdf-fee-table="1"] td:nth-child(3) {
            text-align: right !important;
          }
          .pdf-fee-table tr:last-child td,
          [data-pdf-fee-table="1"] tr:last-child td {
            border-bottom: 0.05px solid rgba(0,0,0,0.06) !important;
          }
          [data-pdf-fee-table="1"] tr[data-pdf-fee-highlight="1"] td {
            background-color: #f9fafb !important;
          }
          .pdf-fee-table td, [data-pdf-fee-table="1"] td {
            background-color: #ffffff !important;
          }
        `;
        cloned.prepend(injectedPdfStyles);
        cloned.querySelectorAll('.pdf-fee-table').forEach(table => table.setAttribute('data-pdf-fee-table', '1'));

        // Handle notes section
        const notesEl = cloned.querySelector('.pdf-notes-section');
        if (notesEl) {
          notesEl.style.display = hideNotes ? 'none' : 'block';
        }

        const feeCells = cloned.querySelectorAll('[data-pdf-fee-table="1"] th, [data-pdf-fee-table="1"] td');
        const feeRows = cloned.querySelectorAll('[data-pdf-fee-table="1"] tr');
        feeRows.forEach(row => row.setAttribute('data-pdf-fee-row', '1'));
        cloned.querySelectorAll('.pdf-logo-cell').forEach(el => el.setAttribute('data-pdf-logo-cell', '1'));

        const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
        const cellTags = new Set(['TD', 'TH']);
        cloned.querySelectorAll('*').forEach(el => {
          const originalClasses = el.className ? el.className.split(' ') : [];
          const isPdfLogoCell = originalClasses.includes('pdf-logo-cell');
          const isPdfInfoCardItem = !!el.closest('.pdf-info-card');
          const isPdfOuterCard = !!el.closest('.pdf-outer-card');
          const currentRow = el.closest('tr');
          const row = currentRow?.closest('[data-pdf-fee-table="1"]') ? currentRow : null;
          const rowLabel = row?.querySelector('td, th')?.textContent?.trim();
          const isLegalFeesRow = rowLabel === 'Survey Fee';
          const isFinalTotalRow = rowLabel === 'Total';
          const highlightPatterns = [
            /^(Transaction Supplement Fees)$/i,
            /^(Standard Disbursements)$/i,
            /^(Leasehold Specific Fees & Disbursements)$/i,
          ];
          const isCategoryHeadingRow = rowLabel && highlightPatterns.some((pattern) => pattern.test(rowLabel));
          const isHighlightedFeeRow = isCategoryHeadingRow || isFinalTotalRow;

          if (isHighlightedFeeRow && currentRow) {
            currentRow.dataset.pdfFeeHighlight = '1';
          }

          el.className = '';
          el.style.fontFamily = 'Arial, sans-serif';
          el.style.color = headingTags.has(el.tagName) ? '#059669' : '#000';
          el.style.fontSize = '11px';
          el.style.margin = '0';
          if (!isPdfInfoCardItem && !el.closest('.pdf-fee-card') && !isPdfOuterCard) {
            el.style.background = 'transparent';
            el.style.backgroundColor = 'transparent';
          }
          
          // Skip border reset for pdf-fee-table cells, pdf info cards, fee card wrappers, and outer PDF cards
          if (!el.closest('[data-pdf-fee-table="1"]') && !isPdfInfoCardItem && !el.closest('.pdf-fee-card') && !isPdfOuterCard) {
            el.style.border = 'none';
          }
          
          if (!isPdfOuterCard) {
            el.style.boxShadow = 'none';
          }
          if (!isPdfInfoCardItem && !el.closest('.pdf-fee-card') && !isPdfOuterCard) {
            el.style.borderRadius = '0';
          }
          el.style.overflow = 'visible';
          el.style.maxHeight = 'none';
          const isPdfQuoteHeading = originalClasses.includes('pdf-quote-heading');
          const isPdfPropertyHeading = originalClasses.includes('pdf-property-heading');
          const isPdfFeeHeading = originalClasses.includes('pdf-fee-heading');
          el.style.textAlign = isPdfLogoCell || isPdfQuoteHeading || isPdfPropertyHeading || isPdfFeeHeading ? 'center' : 'left';

          if (originalClasses.includes('text-emerald-600') || isLegalFeesRow || isFinalTotalRow) {
            el.style.color = '#059669';
            if (cellTags.has(el.tagName)) {
              el.style.fontWeight = '700';
            }
          }

          if (originalClasses.includes('font-semibold') || originalClasses.includes('font-bold')) {
            el.style.fontWeight = '700';
          }

          if (originalClasses.includes('bg-gray-50')) {
            el.style.backgroundColor = '#f9fafb';
          }
          if (originalClasses.includes('bg-gray-100')) {
            el.style.backgroundColor = '#f3f4f6';
          }

          // Flexible table cell styling
          if (cellTags.has(el.tagName)) {
            el.style.padding = '5px 8px';
            el.style.whiteSpace = 'normal';
            el.style.wordWrap = 'break-word';
            el.style.overflowWrap = 'break-word';
            el.style.textAlign = 'left';
            
            // Add a full border for pdf-fee-table cells so exported PDF shows lines
            if (el.closest('[data-pdf-fee-table="1"]')) {
              el.style.border = '0.05px solid rgba(0,0,0,0.06)';
            }
          }
          if (el.tagName === 'TABLE') {
            el.style.width = '100%';
            el.style.borderCollapse = 'collapse';
            el.style.tableLayout = 'auto';
            if (el.closest('[data-pdf-fee-table="1"]')) {
              el.style.border = '0.05px solid rgba(0,0,0,0.06)';
            }
          }
          if (el.tagName === 'IMG') {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.objectFit = 'contain';
          }
        });
        
        // Ensure all fee tables have collapsed borders and strong cell borders
        cloned.querySelectorAll('[data-pdf-fee-table="1"]').forEach(table => {
          table.style.borderCollapse = 'collapse';
          table.style.borderSpacing = '0';
          table.style.border = '0.05px solid rgba(0,0,0,0.06)';
          table.style.boxSizing = 'border-box';
          table.style.backgroundColor = '#ffffff';
          table.style.marginTop = '14px';
          table.style.marginBottom = '14px';
        });

        cloned.querySelectorAll('[data-pdf-fee-table="1"] tr').forEach(row => {
          const cells = row.querySelectorAll('th, td');
          const rowLabel = row.querySelector('td, th')?.textContent?.trim();
          const isFinalTotalRow = rowLabel === 'Total';
          const isHighlightedFeeRow = row.dataset.pdfFeeHighlight === '1';
          cells.forEach((cell, index) => {
            if (index === 1 || index === 2) {
              cell.style.textAlign = 'right';
            } else {
              cell.style.textAlign = 'left';
            }
            cell.style.border = '0.05px solid rgba(0,0,0,0.06)';
            if (isHighlightedFeeRow) {
              cell.style.backgroundColor = isFinalTotalRow ? '#f3f4f6' : '#f9fafb';
            } else {
              cell.style.backgroundColor = '#ffffff';
            }
          });
        });

        // Thinner bottom border for the header row
        cloned.querySelectorAll('[data-pdf-fee-table="1"] thead th').forEach(th => {
          th.style.borderBottom = '0.1px solid #e5e7eb';
        });
        cloned.querySelectorAll('[data-pdf-logo-cell="1"]').forEach(cell => {
          cell.style.textAlign = 'center';
        });
        cloned.querySelectorAll('[data-pdf-logo-cell="1"] img').forEach(img => {
          img.style.margin = '0 auto';
          img.style.display = 'block';
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

        cloned.querySelectorAll('.pdf-info-card, .pdf-fee-card').forEach(card => {
          card.style.backgroundColor = '#f8fafc';
          card.style.border = '1px solid #e5e7eb';
          card.style.borderRadius = '20px';
          card.style.padding = '16px';
          card.style.marginBottom = '18px';
        });
        cloned.querySelectorAll('.pdf-info-card > div, .pdf-fee-card > div').forEach(inner => {
          inner.style.backgroundColor = '#ffffff';
          inner.style.border = '1px solid #e5e7eb';
          inner.style.borderRadius = '18px';
          inner.style.padding = '16px';
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
        // Preserve fee table markers before resetting element classes
        notesEl.querySelectorAll('.pdf-fee-table').forEach(table => table.setAttribute('data-pdf-fee-table', '1'));
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
        notesEl.querySelectorAll('[data-pdf-fee-table="1"] tr').forEach(row => {
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

      const currentRef = ref || 'surveyor-quote';
      pdf.save(`${currentRef}.pdf`);
      Swal.fire('Success', 'PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('PDF generation error:', error);
      Swal.fire('Error', `Failed to generate PDF: ${error.message}`, 'error');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownloadFromCard = (quote) => {
    setPdfLoading(true);
    setPendingDownload(true);
  };

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

  const handlefilterchange = (selectedoption = []) => {
    setfilterselected(selectedoption);

    if (!companydata || !Array.isArray(companydata)) return;

    let sorted = [...companydata];

    if (selectedoption.length > 1) {
      const first = selectedoption[0]?.value;
      const second = selectedoption[1]?.value;
      sorted.sort((a, b) => {
        let result = 0;
        if (first === "Rating") {
          result = (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0);
        } else if (first === "Price") {
          const aPrice = Number(a.legal_fees || 0);
          const bPrice = Number(b.legal_fees || 0);
          result = aPrice - bPrice;
        }
        if (result === 0 && second) {
          if (second === "Rating") {
            result = (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0);
          } else if (second === "Price") {
            const aPrice = Number(a.legal_fees || 0);
            const bPrice = Number(b.legal_fees || 0);
            result = aPrice - bPrice;
          }
        }
        return result;
      });
    } else if (selectedoption.length === 1) {
      const first = selectedoption[0]?.value;
      if (first === "Rating") {
        sorted.sort((a, b) => (b.conveying_details?.rating ?? 0) - (a.conveying_details?.rating ?? 0));
      } else if (first === "Price") {
        sorted.sort((a, b) => {
          const aPrice = Number(a.legal_fees || 0);
          const bPrice = Number(b.legal_fees || 0);
          return aPrice - bPrice;
        });
      }
    }

    setcompanydata(sorted);
  };

  const toggleDropdowncard = (id) => {
    if (dropdownOpenId === id) {
      setDropdownOpenId(null);
    } else {
      setDropdownOpenId(id);
    }
  };

  return (
    <div className="bg-white antialiased font">
      {pdfLoading && (
        <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4A7C59] border-t-transparent"></div>
          <p className="mt-3 text-sm font-medium text-gray-700">Preparing your PDF...</p>
        </div>
      )}

      <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
        <Navbar hide={!userlogin} />
      </div>

      <main className="mx-auto max-w-[1200px] pt-2 px-4 lg:px-0 mb-5 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1">
            <div className="overflow-auto space-y-6 pr-2 rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white p-4 sm:p-8 lg:p-10">
              <div className="p-4 sm:p-8">
                <nav
                  className="text-[13px] text-[#6B7280] mb-1 flex items-center gap-4"
                  aria-label="Breadcrumb"
                >
                  <Link href="/" className="other-page whitespace-nowrap">
                    Home
                  </Link>
                  <span className="hidden sm:inline">/</span>
                  <span className="live-page whitespace-nowrap">
                    Surveyor Quotes
                  </span>
                </nav>

                <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-outfit">
                  Compare surveyor quotes for your property
                </p>

                <div className="">
                  <Select
                    options={filteroption}
                    instanceId="filter-select-surveyor"
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
                      option: (base, state) => ({
                        ...base,
                        fontSize: 16,
                        fontFamily: 'Outfit, Arial, sans-serif',
                        backgroundColor: state.isSelected || state.isFocused ? '#F6CE53' : base.backgroundColor,
                        color: state.isSelected || state.isFocused ? '#111' : base.color,
                      }),
                    }}
                  />
                </div>

                <div className="mt-8 space-y-6" ref={pdfRef}>
                  {loading && (
                    <div className="flex flex-col justify-center items-center py-6">
                      <div className="h-8 w-8 border-2 border-[#4A7C59] border-t-transparent rounded-full animate-spin"></div>
                      <div className="mt-2.5 text-gray-500">
                        Your quotes are loading...
                      </div>
                    </div>
                  )}

                  {companydata?.length === 0 && !loading && (
                    <div className="text-center py-10">
                      <p className="text-[14px] text-[#6B7280]">
                        No surveyor quotes found
                      </p>
                    </div>
                  )}

                  {companydata?.map((quote, index) => (
                    <div
                      key={index}
                      className="font border border-gray-200 rounded-2xl overflow-hidden bg-white w-full"
                    >
                      <div
                        className={`flex flex-col sm:flex-row items-center justify-between ${index % 2 === 0 ? "bg-green-50" : "bg-red-50"
                          } mx-2 mt-2 rounded-2xl p-4 sm:px-8 sm:py-5`}
                      >
                        <div className="flex items-center gap-5 mb-3 sm:mb-0">
                          {quote.conveying_details.logo ? (
                            <img
                              width={40}
                              height={40}
                              src={quote.conveying_details.logo}
                              alt={quote.company_name || "company logo"}
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
                              {formatGBP(Number(quote.fees_amount || 0))}
                            </p>
                            <button
                              className="text-green-700 text-sm font-medium hover:underline cursor-pointer"
                              onClick={() => toggleDropdowncard(quote.conveying_details.conveying_id)}
                            >
                              <u>View Details</u>
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
                              className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${
                                dropdownOpenId === quote.conveying_details.conveying_id
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

                      <div className="p-4 sm:p-6 flex flex-col gap-6 font">
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 lg:gap-10">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Rating
                                initialValue={quote.conveying_details.ratings || 4}
                                readonly
                                size={20}
                                allowFraction
                              />
                              <span className="pl-2 font-bold text-green-700">
                                {quote.conveying_details.ratings || 1} out of 5
                              </span>
                            </div>
                            <div className="flex gap-4 mt-3 text-green-700">
                              <div className="flex flex-col items-center text-green-700">
                                <CircularProgress progress={quote.conveying_details.recomended || 80} />
                                <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                  Rated
                                </span>
                              </div>

                              <div className="flex flex-col items-center text-green-700">
                                <CircularProgress progress={quote.conveying_details.sra || 90} />
                                <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                  Regulated
                                </span>
                              </div>

                              <div className="flex flex-col items-center text-green-700">
                                <CircularProgress progress={quote.conveying_details.reliable || 85} />
                                <span className="mt-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-md">
                                  Reliable
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row px-15 justify-start lg:col-start-3 lg:justify-end">
                            <button
                              className="px-3 py-1.5 rounded-full text-sm cursor-pointer bg-white border border-[#4A7C59] text-[#4A7C59] hover:bg-gray-50 mx-auto block md:inline-block"
                            >
                              Instruct
                            </button>
                            <button
                              disabled={pdfLoading || pendingDownload}
                              className={`px-3 py-1.5 rounded-full text-sm cursor-pointer ${
                                pdfLoading || pendingDownload
                                  ? "bg-[#4A7C59]/70 cursor-not-allowed"
                                  : "bg-[#4A7C59] hover:bg-[#3b6248] text-white"
                              } mx-auto block md:inline-block`}
                              onClick={() => handleDownloadFromCard(quote)}
                            >
                              {pdfLoading || pendingDownload ? "Downloading..." : "Download"}
                            </button>
                          </div>
                        </div>

                        {dropdownOpenId === quote.conveying_details.conveying_id && (
                          <FeesTable quote={quote} label="Survey" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SurveyorQuotesWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SurveyorquotesContent />
    </Suspense>
  );
}
