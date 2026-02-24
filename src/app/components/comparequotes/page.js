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
import RemortagePropertyDetails from "./RemortagePropertyDetails"
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
  let call = false;

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
            stroke="#3b6248"
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

  function handleprice() {
    console.log(companydata)

  }

  const generatePDF = async () => {
    try {
      if (!pdfRef.current) {
        Swal.fire('Error', 'PDF element not found', 'error');
        return;
      }

      // Create a temporary wrapper to capture the content with clean styles
      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = '800px';
      wrapper.style.backgroundColor = 'white';
      wrapper.style.padding = '15px';
      wrapper.style.fontFamily = 'Arial, sans-serif';
      wrapper.style.lineHeight = '1.4';

      // Clone the pdfRef content
      const cloned = pdfRef.current.cloneNode(true);

      // Remove/fix problematic styles
      const removeProblematicStyles = (element) => {
        const allElements = element.querySelectorAll('*');
        allElements.forEach(el => {
          // Remove Tailwind classes that might have complex colors
          el.className = '';
          // Set basic text properties
          el.style.fontFamily = 'Arial, sans-serif';
          el.style.color = '#000';
          el.style.fontSize = '11px';
          el.style.margin = '0';
        });
      };

      removeProblematicStyles(cloned);
      wrapper.appendChild(cloned);
      document.body.appendChild(wrapper);

      // Capture with html2canvas
      const canvas = await html2canvas(wrapper, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 10000,
        windowHeight: wrapper.scrollHeight,
        windowWidth: 800,
        onclone: (clonedDocument) => {
          // Ensure styles are applied to cloned document
          const style = clonedDocument.createElement('style');
          style.textContent = `
          * { margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; color: #000; background: white; font-size: 11px; line-height: 1.4; }
          div, p, span { color: #000 !important; background-color: transparent !important; }
          table { border-collapse: collapse; width: 100%; margin: 5px 0; }
          tr { page-break-inside: avoid; }
          th, td { border: 1px solid #ddd; padding: 4px; font-size: 11px; }
          th { background-color: #f5f5f5 !important; }
          h3, h4 { font-size: 13px; margin: 8px 0 4px 0; }
        `;
          clonedDocument.head.appendChild(style);
        }
      });

      document.body.removeChild(wrapper);

      // Check if canvas has valid data
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas rendering failed - empty canvas');
      }

      const imgData = canvas.toDataURL('image/png');

      if (!imgData || imgData === 'data:image/png;base64,') {
        throw new Error('Failed to generate image data from canvas');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const margin = 10; // 10mm margins
      const imgWidth = 210 - (margin * 2); // A4 width minus margins
      const pageHeight = 297 - (margin * 2); // A4 height minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      const currentRef = ref || 'quote';
      pdf.save(`${currentRef}.pdf`);
      Swal.fire('Success', 'PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('PDF generation error:', error);
      Swal.fire('Error', `Failed to generate PDF: ${error.message}`, 'error');
    }
  };

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
        setinstructloader(false);

        // Step 4: Redirect using payload ID, not state
        router.push(`/Instruct?id=${instructpayload.quoteid}`);
      }
    } catch (e) {
      setinstructloader(false);
      console.error("API error:", e);
    }
  }

  async function sendHtmlToBackend() {
  try {
    if (!pdfRef?.current) return;

    // Remove scroll restrictions before capture
    pdfRef.current.style.maxHeight = "none";
    pdfRef.current.style.overflow = "visible";
    pdfRef.current.style.height = "auto";

    const htmlContent = pdfRef.current.outerHTML;

    let servicetype = localStorage.getItem("service");

    const payload = {
      ref_no: view_data?.service_details?.[0]?.quote_ref_number,
      servicetype: servicetype,
      quoteid: view_data?.quote_id,
      popup_html: htmlContent,   // ✅ IMPORTANT
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
    else if (query_ref_no.length > 0) {
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

    let selectedquote = companydata.filter((item) => item.conveying_details.conveying_id == id);
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

      <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
        <Navbar />
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
                              <span className="pl-2 font-bold text-[#4A7C59]">
                                {quote.conveying_details.ratings || 4} out of 5
                              </span>
                            </div>
                           <div className="flex gap-4 mt-3">
  
                            {/* Recommended */}
                            <div className="flex flex-col items-center">
                              <CircularProgress progress={quote.conveying_details.recomended || 80} />
                              <span className="mt-1 bg-[#3b6248] text-white text-[10px] px-2 py-0.5 rounded-md">
                                Rated
                              </span>
                            </div>

                            {/* SRA */}
                            <div className="flex flex-col items-center">
                              <CircularProgress progress={quote.conveying_details.sra || 90} />
                              <span className="mt-1 bg-[#3b6248] text-white text-[10px] px-2 py-0.5 rounded-md">
                                Regulated
                              </span>
                            </div>

                            {/* Reliable */}
                            <div className="flex flex-col items-center">
                              <CircularProgress progress={quote.conveying_details.reliable || 85} />
                              <span className="mt-1 bg-[#3b6248] text-white text-[10px] px-2 py-0.5 rounded-md">
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
                                <div ref={pdfRef} id="quote-popup" className="border  rounded-lg bg-white shadow px-6 py-2 mb-2 space-y-2 quotes" style={{
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
                                        <td className="p-1 border-gray-200 align-top w-full md:w-1/2 sm:w block md:table-cell">
                                          <div className="bg-gray-50 p-3 rounded">
                                            <h4 className="font-semibold text-emerald-600 mb-3">Conveyancer Details</h4>
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
                                          <div className="bg-gray-50 p-3 rounded">
                                            <h4 className="font-semibold text-emerald-600 mb-3">Client Details</h4>
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
                                        {(view_data.service_details[0].service_type == 1) && <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} />}
                                        {(view_data.service_details[0].service_type == 2) && <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language} />}
                                        {(view_data.service_details[0].service_type == 4) && <RemortagePropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} language={language}/>}  </>
                                      )}
                                      {view_data.service_details.length > 1 && (<>
                                        <SalesPropertyDetails quote={quote} servicData={view_data.service_details[0]} companydata={companydata} cardid={cardid} taxDetails={taxDetails} giftvalue={giftvalue} handleprice={handleprice} /> <PurchasePropertyDetails quote={quote} servicData={view_data.service_details[1]} companydata={companydata} cardid={cardid} taxDetails={taxDetails2} giftvalue={giftvalue} handleprice={handleprice} /></>)}

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
