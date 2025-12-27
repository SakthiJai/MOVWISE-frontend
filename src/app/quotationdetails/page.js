"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import {
  Check,
  ListPlus,
  Plus,
  PlusCircle,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { MdAdd } from "react-icons/md";
import { set } from "react-hook-form";
import dynamic from "next/dynamic";
import Navbar from "../parts/navbar/page";
import { API_ENDPOINTS, postData, getData } from "../auth/API/api";
import { useFormStore } from "../store/useFormStore";
import "react-quill-new/dist/quill.snow.css";
import { poundFormat } from "../../utils/poundFormat";
import { title } from "process";
import { FaTrash, FaPlus } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Quotationdetails() {
  const { updateQuotationData } = useFormStore();
  const router = useRouter();

  const [data, setData] = useState({});
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [feeCategory, setfeeCategory] = useState({});
  const [purchaseFeeTypeList, setpurchaseFeeTypeList] = useState([]);
  const [salesFeeTypeList, setsalesFeeTypeList] = useState([]);
  const [standardDisbursementList, setstandardDisbursementList] = useState([]);
  const [leaseholdDisbursementList, setleaseholdDisbursementList] = useState(
    []
  );
  const [additionalServiceList, setadditionalServiceList] = useState([]);
  const [pricingList, setpricingList] = useState([]);
  const [legalFeesError, setlegalFeesError] = useState([]);
  const [transactionFeesError, settransactionFeesError] = useState([]);
  const [disbursementFeesError, setdisbursementFeesError] = useState([]);
  const [leasedisbursementFeesError, setleasedisbursementFeesError] = useState(
    []
  );
  const [additionalServiceError, setadditionalServiceError] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [formData, setformData] = useState({});
  const [notesData, setnotesData] = useState("");
  const [loading, setLoading] = useState(false);
  const timers = useRef({});
  const [remainingsupplement, setremainingsupplement] = useState([]);
  const [remainingdisbursement, setremainingdisbursement] = useState([]);
  const [remainingleashold, setremainingleashold] = useState([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "code-block",
    "align",
  ];
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("companyData"));

    if (storedData) {
      setformData(storedData);
      //console.loglog(formData)
    }
  }, []);

  const [finalPayload, setFinalPayload] = useState(null);

  useEffect(() => {
    // Define async function inside useEffect

    const fetchData = async () => {
      //console.loglog("121212");
      try {
        // setLoading(true);

        // Call both APIs in parallel
        const [response1, response2, response3] = await Promise.all([
          getData(API_ENDPOINTS.feecatgory),
          getData(API_ENDPOINTS.feetype + "/2"),
          getData(API_ENDPOINTS.pricing),
        ]);
        const storedData = JSON.parse(localStorage.getItem("companyData"));
        response1.data[2][0]["sub_categories"] = [];
        if (
          storedData["service_id"]?.indexOf(1) !== -1 ||
          storedData["service_id"]?.indexOf(3) !== -1
        ) {
          response1.data[2][0]["sub_categories"].push({
            sub_category: " Sales Transaction Supplements",
          });
          setpurchaseFeeTypeList(response2.supplement_fees ?? []);
        } else if (
          storedData["service_id"]?.indexOf(2) !== -1 ||
          storedData["service_id"]?.indexOf(3) !== -1
        ) {
          response1.data[2][0]["sub_categories"].push({
            sub_category: "Purchase Transaction Supplements",
          });
          setpurchaseFeeTypeList(response2.supplement_fees ?? []);
        }
        //console.loglog(response1.data[2][0]['sub_categories'])
        setfeeCategory(response1.data);
        setstandardDisbursementList(response2.standard_disbursement ?? []);
        setleaseholdDisbursementList(response2.leasehold_disbursement ?? []);

        setadditionalServiceList(response2.additional_service ?? []);
        setpricingList(response3.pricing);
        const updatedPricing = response3.pricing.map((item) => {
          if (item.fees_category_id === 2) {
            return {
              ...item,
              price_list: [
                ...response2.supplement_fees.map((category) => ({
                  type_id: category.id,
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                })),
              ],
            };
          } else if (item.fees_category_id === 3) {
            return {
              ...item,
              price_list: [
                ...response2.standard_disbursement.map((category) => ({
                  type_id: category.id,
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                })),
              ],
            };
          }
          else if (item.fees_category_id === 4) {
            return {
              ...item,
              price_list: [
                ...response2.leasehold_disbursement.map((category) => ({
                  type_id: category.id,
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                })),
              ],
            };
          }
          return item;
        });

        console.log(updatedPricing);

        setpricingList(updatedPricing);
      } catch (err) {
        //console.logerror(err);
        setErrors("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    console.log(pricingList, Object.keys(feeCategory));

    setlegalFeesError([]);
    const hasErrors = validatePriceList(pricingList);
    console.log(hasErrors);
    if (hasErrors == false) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix validation issues before submitting.",
      });
      return;
    }

    try {
      let tempPrice = [];
      Object.keys(feeCategory).forEach((key, value) => {
        console.log(key, value);
        const data = key; // <-- key itself (1,2,3,...)
        tempPrice.push({
          [data]: [pricingList[value]],
        });
        console.log(tempPrice);
      });

      setLoading(false); // optional loader

      const payload = {
        company_details: formData,
        pricing: tempPrice,
        notes: notesData,
      };
      setFinalPayload(payload);

      const pricingTypeIds = pricingList[1].price_list.map((item) =>
        Number(item.type_id)
      );
      const disbursementTypeIds = pricingList[2].price_list.map((item) =>
        Number(item.type_id)
      );
      const addittionalleashhold = pricingList[3].price_list.map((item) =>
        Number(item.type_id)
      );

      const remainingPurchaseItems = purchaseFeeTypeList.filter(
        (item) => !pricingTypeIds.includes(item.id)
      );

      const remainingDisbursementItems = standardDisbursementList.filter(
        (item) => !disbursementTypeIds.includes(item.id)
      );

      const remainingadditionalleahold = leaseholdDisbursementList.filter(
        (item) => !addittionalleashhold.includes(item.id)
      );

      setremainingsupplement(remainingPurchaseItems);
      setremainingdisbursement(remainingDisbursementItems);
      setremainingleashold(remainingadditionalleahold);

      setShowConfirm(true);
    } catch (error) {
      console.log("Error building payload:", error);
    }
  };

  //console.log("Payload to submit:", payload);

  const submitFinal = async () => {
    setLoading(true);

    try {
      const response = await postData(
        API_ENDPOINTS.insertcompanydetail,
        finalPayload
      );

      console.log("API Response:", response);

      if (response.code == 200) {
        localStorage.clear();
        setShowSuccess(true); // show success modal
      } else {
        alert(`Failed: ${response.data?.message || "Server error"}`);
      }
    } catch (error) {
      //console.logerror("Submit Error:", error);
      alert("Something went wrong while saving!");
    } finally {
      setLoading(false);
    }

    ///router.push("/conveyancers/Notes/");
  };
  
  const regipage = () => {
    router.push("/conveyancers/Companyregistration/");
  };

  const [indemnity, setIndemnity] = useState("");
  const [sdltReturn, setSdltReturn] = useState("");
  const [additionalAdvice, setAdditionalAdvice] = useState("");

  const [rowErrors, setRowErrors] = useState([]); // errors for each row
  const [rangeErrors, setRangeErrors] = useState([]); // gap / overlap errors

  // Dynamic Legal Cost Rows
  const [notes, setNotes] = useState("");

  const [legalcostrows, setLegalcostrows] = useState([
    { min: "", max: "", pLease: "", pFree: "", sLease: "", sFree: "" },
  ]);

  const handle_addrow = (index) => {
    console.log("add row :", index);
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  id: null,
                  min: null,
                  max: null,
                  purchase_leasehold: null,
                  purchase_freehold: null,
                  sales_leasehold: null,
                  sales_freehold: null,
                  remortgage: null,
                  is_delete: null,
                  status: null,
                },
              ],
            }
          : item
      )
    );
  };
  const handleDeleteRow = (feesCategoryId, rowIndex,others_id) => {
    console.log("delete:", rowIndex, feesCategoryId);
 
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === feesCategoryId
          ? {
              ...item,
              price_list: item.price_list.map((row, i) =>
                others_id == row.others_id  ? { ...row, is_delete: 1 } : row
              ),
            }
            
          : item
      )
    );
       console.log(pricingList);
  };
  const handle_transaction_sales = (index) => {
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  type_id: "",
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                },
              ],
            }
          : item
      )
    );
  };
  const handle_transaction_purchase = (index) => {
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  type_id: "",
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                  others: "",
                  others_id: uuidv4(),
                },
              ],
            }
          : item
      )
    );
       console.log(purchaseFeeTypeList);

//    setpurchaseFeeTypeList(prev => [
//   ...prev,
//   {
//     id: "",
//     category_id: "",
//     fee_type: "",
//     status: ""
//   }
// ]);

    
  };
  const handle_standard_disbursement = (index) => {
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  type_id: "",
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                   others: "",
                },
              ],
            }
          : item
      )
    );
    //console.loglog(pricingList)
  };
  const handle_leasehold_disbursement = (index) => {
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  type_id: "",
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                },
              ],
            }
          : item
      )
    );
  };
  const handle_additional_service = (index) => {
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === index
          ? {
              ...item,
              price_list: [
                ...item.price_list,
                {
                  type_id: "",
                  fee_amount: "",
                  paid_to: "",
                  description: "",
                  is_delete: "",
                  status: "",
                },
              ],
            }
          : item
      )
    );
  };
  const handlePriceChange1 = (feesCategoryId, rowIndex, field, value) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === feesCategoryId
          ? {
              ...item,
              price_list: item.price_list.map((row, i) =>
                i === rowIndex
                  ? { ...row, [field]: value } // update field dynamically
                  : row
              ),
            }
          : item
      )
    );
    //console.loglog(pricingList)
  };
  const formatNumber = (num) =>
    new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  const handlePriceChange = (feesCategoryId, rowIndex, field, value) => {
    const rawValue = value.replace(/[^\d.]/g, "");
    console.log(feesCategoryId, rowIndex, field, value);

    setpricingList((prev) =>
      prev.map((item) =>
        item.fees_category_id === feesCategoryId
          ? {
              ...item,
              price_list: item.price_list.map((row, i) =>
                i === rowIndex
                  ? {
                      ...row,
                      [field]: value,
                    }
                  : row
              ),
            }
          : item
      )
    );

    console.log(pricingList);

    if (timers.current[feesCategoryId])
      clearTimeout(timers.current[feesCategoryId]);

    timers.current[feesCategoryId] = setTimeout(() => {
      // 🚫 Skip formatting for type_id
      if (field === "type_id" || field === "description") return;

      const num = Number(rawValue);
      if (!isNaN(num)) {
        const formatted = formatNumber(num);

        setpricingList((prev) =>
          prev.map((item) =>
            item.fees_category_id === feesCategoryId
              ? {
                  ...item,
                  price_list: item.price_list.map((row, i) =>
                    i === rowIndex ? { ...row, [field]: formatted } : row
                  ),
                }
              : item
          )
        );
      }
    }, 2000);
  };

  const validatePriceList = (list) => {
    let errors = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i]["fees_category_id"] == 1) {
        for (let j = 0; j < list[i]["price_list"].length; j++) {
          if (list[i]["is_delete"] != 1) {
            const { min, max } = list[i].price_list[j];

            if (min == null || min == "") {
              errors.push(`Row ${i + 1}: min  and max value is required`);
              break;
            }

            if (min !== null && min !== "" && (max === null || max === "")) {
              errors.push(
                `Row ${i + 1}: max value is required when min is present`
              );
              break;
            }
            // Skip rows if min or max is missing (both empty)
            if ((min === null || min === "") && (max === null || max === ""))
              continue;

            // 2️⃣ Current row min < max
            if (Number(min) >= Number(max)) {
              errors.push(
                `Row ${i + 1}: min (${min}) should be less than max (${max})`
              );
              break;
            }
            // 3️⃣ Min should be >= previous row's max (if not first row)
            if (i > 0) {
              const prevMax = list[i - 1].max;
              if (
                prevMax !== null &&
                prevMax !== "" &&
                Number(min) < Number(prevMax)
              ) {
                errors.push(
                  `Row ${
                    i + 1
                  }: min (${min}) should be greater than or equal to previous row's max (${prevMax})`
                );
                break;
              }
            }
          }
        }
        if (errors.length > 0) {
          setlegalFeesError(errors);
          return false;
        }
      } else if (list[i]["fees_category_id"] == 2) {
        let terror = [];
        for (let j = 0; j < list[i]["price_list"].length; j++) {
          if (list[i]["is_delete"] != 1) {
            const { type_id, fee_amount } = list[i].price_list[j];

            if (type_id != "" && Number(fee_amount) <= 0) {
              // terror.push(`Row ${i + 1}: Fee amount is missing`);
              //return false;
              break;
            }
          }
        }

        for (let i = 0; i < list.length; i++) {
          const seen = new Set();
          if (terror.length == 0) {
            for (let k = 0; k < list[i].price_list.length; k++) {
              const item = list[i].price_list[k];
              if (seen.length > 0) {
                if (seen.has(item.type_id)) {
                  console.log("Duplicate found:", item.type_id, item);
                  terror.push(`Row ${i + 1}: Duplicate  found`);
                } else {
                  seen.add(item.type_id);
                }
              }
            }
          }
        }

        if (terror.length > 0) {
          settransactionFeesError(terror);
          terror = [];
          return false;
        }
      } else if (list[i]["fees_category_id"] == 3) {
        let terror3 = [];
        for (let j = 0; j < list[i]["price_list"].length; j++) {
          if (list[i]["is_delete"] != 1) {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id != "" && Number(fee_amount) <= 0) {
              // terror3.push(`Row ${i + 1}: Fee amount is missing`);
              //return false;
              break;
            } else if (type_id == "") {
              console.log("fee_amount", fee_amount, type_id, "+", j);
              // terror3.push(` Fee  missing`);
              break;
            }
          }
        }
        for (let k = 0; k < list[i].price_list.length; k++) {
          const item = list[i].price_list[k];
          const seen = new Set();
          if (seen.has(item.type_id)) {
            console.log("Duplicate found:", item.type_id, item);
            terror3.push(`Row ${i + 1}: Duplicate  found`);
          } else {
            seen.add(item.type_id);
          }
        }
        if (terror3.length > 0) {
          setdisbursementFeesError(terror3);
          terror3 = [];
          return false;
        }
      } else if (list[i]["fees_category_id"] == 4) {
        let terror4 = [];
        for (let j = 0; j < list[i]["price_list"].length; j++) {
          if (list[i]["is_delete"] != 1) {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id != "" && Number(fee_amount) <= 0) {
              terror4.push(`Row ${i + 1}: Fee amount is missing`);
              //return false;
              break;
            } else if (type_id == "") {
              console.log("fee_amount", fee_amount, type_id, "+", j);
              terror4.push(` Fee category missing`);
              break;
            }
          }
        }
        if (terror4.length > 0) {
          console.log("terror4", terror4);
          setleasedisbursementFeesError(terror4);
          return false;
        }
      } else if (list[i]["fees_category_id"] == 5) {
        let terror5 = [];
        for (let j = 0; j < list[i]["price_list"].length; j++) {
          if (list[i]["is_delete"] != 1) {
            const { type_id, fee_amount } = list[i].price_list[j];
            if (type_id != "" && Number(fee_amount) <= 0) {
              // terror5.push(`Row ${i + 1}: Fee amount is missing`);
              //return false;
              break;
            } else if (type_id == "") {
              console.log("fee_amount", fee_amount, type_id, "+", j);
              // terror5.push(` Fee  missing`);
            }
          }
        }
        for (let k = 0; k < list[i].price_list.length; k++) {
          const item = list[i].price_list[k];
          const seen = new Set();
          if (seen.has(item.type_id)) {
            console.log("Duplicate found:", item.type_id, item);
            terror5.push(`Row ${i + 1}: Duplicate  found`);
          } else {
            seen.add(item.type_id);
          }
        }
        if (terror5.length > 0) {
          setadditionalServiceError(terror5);
          // return false;
        }
      }
    }

    return true;
  };

  const [dropdownothers, setDropdownothers] = useState(false);
  const [salesdropdownothers, setSalesdropdownothers] = useState(false);

  const [serviceOptions, setServiceOptions] = useState({
    expedited_service_fee: "",
    weekend_appointment_fee: "",
  });

  //supplement handlers

  const handleSupplement = (e, rowIndex) => {
    const value = e.target.value;
    const updated = [...PurchasTransactionSupplementsrows];

    // If the row had previous value → restore it back to dropdown
    if (updated[rowIndex].type && updated[rowIndex].type !== "others") {
      setSupplementOptions((prev) => [
        ...prev,
        { label: updated[rowIndex].type, value: updated[rowIndex].type },
      ]);
    }

    if (value === "others") {
      updated[rowIndex].isOthers = true;
      updated[rowIndex].type = "";
    } else {
      updated[rowIndex].isOthers = false;
      updated[rowIndex].type = value;

      // remove selected option
      setSupplementOptions((prev) =>
        prev.filter((item) => item.value !== value)
      );
    }

    setPurchasTransactionSupplementsrows(updated);
  };

  const handleDisbursementChange = (e, index) => {
    const updated = [...disbursementRows];

    if (e.target.value === "others") {
      updated[index].isOthers = true;
      updated[index].type = "";
    } else {
      updated[index].isOthers = false;
      updated[index].type = e.target.value;
    }
    setDisbursementRows(updated);
  };

  const handleFieldChange = (rowIndex, field, value, type) => {
    //console.loglog(type)
    if (type === "purchase") {
      const updated = [...PurchasTransactionSupplementsrows];
      updated[rowIndex][field] = value;
      setPurchasTransactionSupplementsrows(updated);
    } else if (type === "sales") {
      const updated = [...SalesTransactionSupplementsrows];
      updated[rowIndex][field] = value;
      setSalesTransactionSupplementsrows(updated);
    }

    //console.loglog(PurchasTransactionSupplementsrows)
    //console.loglog(SalesTransactionSupplementsrows)
  };
  const handleDisField = (index, field, value) => {
    const updated = [...disbursementRows];
    updated[index][field] = value;
    setDisbursementRows(updated);
  };

  let [supplementOptions, setSupplementOptions] = useState([]);

  let [salessupplementOptions, setsalesSupplementOptions] = useState([]);
  const [disbursementRows, setDisbursementRows] = useState([
    {
      isOthers: false,
      type: "",
      feeCost: "",
      paidTo: "",
      transactionType: "",
    },
  ]);
  const [disbursementOptions, setdisbursementOptions] = useState();

  const paidToOptions = [
    { value: "admin", label: "Admin" },
    { value: "local-authority", label: "local-authority " },
    { value: "Land Registry", label: "Land Registry" },
  ];

  const transactionOptions = [
    { value: "purchaseonly", label: "Purchase Only" },
    { value: "salesonly", label: "Sales Only" },
  ];

  const [leaseholdRows, setLeaseholdRows] = useState([
    {
      service: "",
      feeType: "",
      amount: "",
      paidTo: "",
    },
  ]);

  // Dummy dropdowns
  const leaseholdServiceOptions = [
    { value: "management-fee", label: "Management Fee" },
    { value: "ground-rent", label: "Ground Rent" },
  ];

  const [feeTypeOptions, setfeeTypeOptions] = useState();

  const paidToOptions_std = [
    { value: "admin", label: "Admin" },
    { value: "freeholder", label: "Freeholder" },
  ];

  // field update handler
  const handleLeaseholdField = (index, field, value) => {
    const updated = [...leaseholdRows];
    updated[index][field] = value;
    setLeaseholdRows(updated);
  };
  const formatPound = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white antialiased font   ">
      {/* Header */}
      <div className="sticky top-0 z-50  ">
        <Navbar />
      </div>

      <main className="pt-10  w-auto  grid grid-cols-12 m-3 ">
        <div className=" bg-white shadow-md rounded-2xl p-8 border col-span-12  border-gray-100  ">
          <div className=" w-[1000px]">
            <nav
              className="text-[13px] text-[#6B7280] mb-5 flex items-center gap-4"
              aria-label="Breadcrumb"
            >
              <span className="other-page hidden sm:inline">Home</span>
              <span className="hidden sm:inline">/</span>
              <a onClick={regipage}>
                {" "}
                <span className="other-page  sm:inline">
                  Company registration
                </span>
              </a>
              <span className="hidden sm:inline">/</span>
              <span className="live-page hidden sm:inline">
                Price Breakdown
              </span>
            </nav>
          </div>
          <div className="border rounded-lg mb-6 shadow-sm overflow-hidden bg-white p-5">
            {Object.entries(feeCategory).map(([index, value]) => {
              // the actual object inside
              const item = value[0];
              const numIndex = Number(index);
              return (
                <div key={numIndex}>
                  {numIndex === 1 && (
                    <div key={numIndex} className="  feecatgoryblock mb-5 ">
                      <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                        {item.fees_category}
                      </div>
                      {item.sub_categories.map((sub, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide"
                        >
                          {sub.sub_category}
                        </div>
                      ))}
                      {legalFeesError && (
                        <p style={{ color: "red" }}>{legalFeesError}</p>
                      )}

                      <div className=" w-full overflow-x-auto">
                        <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                          <thead className="bg-gray-100">
                            <tr className="">
                              <th className="px-3 py-2 text-center">S.no</th>
                              <th className="px-3 py-2 text-center">Min £</th>
                              <th className="px-3 py-2 text-center">Max £</th>

                              {(formData["service_id"]?.includes(1) ||
                                formData["service_id"]?.includes(2)) && (
                                <>
                                  <th className="px-3 py-2 text-center">
                                    Purchase Freehold £
                                  </th>
                                  <th className="px-3 py-2 text-center">
                                    Purchase Leasehold £
                                  </th>
                                </>
                              )}

                              {(formData["service_id"]?.includes(1) ||
                                formData["service_id"]?.includes(3)) && (
                                <>
                                  <th className="px-3 py-2 text-center">
                                    Sales Freehold £
                                  </th>
                                  <th className="px-3 py-2 text-center">
                                    Sales Leasehold £
                                  </th>
                                </>
                              )}

                              {formData["service_id"]?.includes(4) && (
                                <th className="px-3 py-2 text-center">
                                  Remortgage
                                </th>
                              )}

                              <th className="px-3 py-2 text-center">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {pricingList
                              .find(
                                (item) => item.fees_category_id === numIndex
                              )
                              .price_list.filter((row) => row.is_delete !== 1)
                              .map((row, i) => (
                                <tr key={i} className="border-b">
                                  <td className="px-3 py-2 text-center">
                                    {i + 1}.
                                  </td>
                                  <td className="px-3 py-2">
                                    <div className="flex flex-col">
                                      <input
                                        type="text"
                                        placeholder="Min"
                                        value={row?.min}
                                        className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black bg-white"
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "min",
                                            e.target.value
                                          )
                                        }
                                      />

                                      {rowErrors[i]?.min && (
                                        <span className="text-red-500 text-xs">
                                          {rowErrors[i].min}
                                        </span>
                                      )}
                                      {rowErrors[i]?.range && (
                                        <span className="text-red-500 text-xs">
                                          {rowErrors[i].range}
                                        </span>
                                      )}
                                      {rowErrors[i]?.negative && (
                                        <span className="text-red-500 text-xs">
                                          {rowErrors[i].negative}
                                        </span>
                                      )}

                                      {rangeErrors[i]?.map((msg, idx) => (
                                        <p
                                          key={idx}
                                          className="text-red-500 text-xs mt-1"
                                        >
                                          {msg}
                                        </p>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2">
                                    <div className="flex flex-col">
                                      <input
                                        type="text"
                                        placeholder="Max"
                                        value={row.max}
                                        className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "max",
                                            e.target.value
                                          )
                                        }
                                      />

                                      {rowErrors[i]?.max && (
                                        <span className="text-red-500 text-xs">
                                          {rowErrors[i].max}
                                        </span>
                                      )}

                                      {rangeErrors[i]?.map((msg, idx) => (
                                        <p
                                          key={idx}
                                          className="text-red-500 text-xs mt-1"
                                        >
                                          {msg}
                                        </p>
                                      ))}
                                    </div>
                                  </td>

                                  {/* PURCHASE FREEHOLD */}
                                  {(formData["service_id"]?.includes(1) ||
                                    formData["service_id"]?.includes(2)) && (
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          type="text"
                                          placeholder="Purchase Freehold"
                                          value={row.purchase_freehold}
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "purchase_freehold",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.PurchaseFreehold && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].PurchaseFreehold}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )}

                                  {(formData["service_id"]?.includes(1) ||
                                    formData["service_id"]?.includes(2)) && (
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          type="text"
                                          value={row.purchase_leasehold}
                                          placeholder="Purchase Leasehold"
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "purchase_leasehold",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.PurchaseLeasehold && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].PurchaseLeasehold}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )}

                                  {/* SALES FREEHOLD */}
                                  {(formData["service_id"]?.includes(1) ||
                                    formData["service_id"]?.includes(3)) && (
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          type="text"
                                          value={row.sales_freehold}
                                          placeholder="Sales Freehold"
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "sales_freehold",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.salesFreehold && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].salesFreehold}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )}

                                  {/* SALES LEASEHOLD */}
                                  {(formData["service_id"]?.includes(1) ||
                                    formData["service_id"]?.includes(3)) && (
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          type="text"
                                          value={row.sales_leasehold}
                                          placeholder="Sales Leasehold"
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "sales_leasehold",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.salesLeasehold && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].salesLeasehold}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )}

                                  {/* REMORTGAGE */}
                                  {formData["service_id"]?.includes(4) && (
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          type="text"
                                          placeholder="Remortgage"
                                          value={row.remortgage}
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "remortgage",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.remortgage && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].remortgage}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  )}

                                  {/* ADD ROW BUTTON */}
                                  <td className="px-3 py-2 text-center">
                                    {i === 0 && (
                                      <button
                                        className="text-green-600 tooltip  items-center justify-center "
                                        onClick={() => handle_addrow(numIndex)}
                                      >
                                        <FaPlus size={16} />
                                        <span className="tooltiptext font">
                                          Add new row
                                        </span>
                                      </button>
                                    )}{" "}
                                    &nbsp;&nbsp;&nbsp;
                                    <button
                                      className="text-red-600 tooltip"
                                      onClick={() =>
                                        handleDeleteRow(numIndex, i)
                                      }
                                    >
                                      <FaTrash size={16} />
                                      <span className="tooltiptext">
                                        Delete current row
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {numIndex === 2 && (
                    <div className="transactionblock mb-5">
                      <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                        {item.fees_category}
                      </div>
                      {item.sub_categories.map((sub, i) => (
                        <div key={i}>
                          <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                            {sub.sub_category}
                          </div>
                         
                          <div className="grid  grid-cols-3 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                            <div className="text-center">
                              Supplement check Type{" "}
                            </div>
                            <div className="text-center">Fee Cost £</div>
                            <div className="text-end me-14">Action</div>
                          </div>
                          {pricingList
                            .find((item) => item.fees_category_id === numIndex)
                            .price_list.filter((row) => row.is_delete != 1)
                            .map((row, i) => (
                              <div
                                key={i}
                                className=" gap-3 px-3 py-1 grid grid-cols-3 "
                              >
                                {"others" in row ? 
                                (
                                  <div>
                                    <input
                                      id="Supplement_type"
                                      type="text"
                                      placeholder="Enter other Supplement Type"
                                      value={row.type}
                                      onChange={(e) =>
                                        handlePriceChange(
                                          numIndex,
                                          i,
                                          "others",
                                          e.target.value
                                        )
                                      }
                                      className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black pl-2"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font text-black ">
                                      <label
                                        key={purchaseFeeTypeList?.[i]?.id}
                                        value={purchaseFeeTypeList?.[i]?.id}
                                        className="text-sm"
                                      >
                                        {purchaseFeeTypeList[i]?.fee_type}
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {/* FEE AMOUNT */}

                                 {"others" in row ?( <> <input
                                  placeholder="Fee Amount"
                                  onChange={(e) => {
                                    settransactionFeesError("");

                                    handlePriceChange(
                                      numIndex,
                                      i,
                                      "fee_amount",
                                      e.target.value
                                    );
                                  }}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black pl-2"
                                />
                               <div className="text-right">
                                    <button
                                      className="text-green-600 tooltip mr-4 flex items-center justify-center "
                                      onClick={() =>
                                        handle_transaction_purchase(numIndex)
                                      }
                                    >
                                      <FaPlus size={16} />
                                      <span className="tooltiptext font">
                                        Add new row
                                      </span>
                                    </button>
                                    <button
                                      className="text-red-600 tooltip"
                                      onClick={() =>
                                        handleDeleteRow(numIndex, i,row.others_id)
                                      }
                                    >
                                      <FaTrash size={16} />
                                      <span className="tooltiptext">
                                        Delete current row
                                      </span>
                                    </button>
                                  </div>
                                  </>):(
                                  <input
                                  placeholder="Fee Amount"
                                  onChange={(e) => {
                                    settransactionFeesError("");

                                    handlePriceChange(
                                      numIndex,
                                      i,
                                      "fee_amount",
                                      e.target.value
                                    );
                                  }}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black pl-2"
                                />
                                ) }
                                
                                 
                                {purchaseFeeTypeList.length -1 == i && (
                                  <div className="text-right">
                                    <button
                                      className="text-green-600 tooltip mr-4 flex items-center justify-center "
                                      onClick={() =>
                                        handle_transaction_purchase(numIndex)
                                      }
                                    >
                                      <FaPlus size={16} />
                                      <span className="tooltiptext font">
                                        Add new row
                                      </span>
                                    </button>
                                    <button
                                      className="text-red-600 tooltip"
                                      onClick={() =>
                                        handleDeleteRow(numIndex, i,row.others_id)
                                      }
                                    >
                                      <FaTrash size={16} />
                                      <span className="tooltiptext">
                                        Delete current row
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                         
                        </div>
                      ))}
                    </div>
                  )}
                  {numIndex === 3 && (
                    <div className="standarddisblock mb-5">
                      <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                        {item.fees_category}
                      </div>
                      {item.sub_categories.map((sub, i) => (
                        <div key={i}>
                          <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                            {sub.sub_category}
                          </div>
                          {disbursementFeesError && (
                            <p style={{ color: "red" }}>
                              {disbursementFeesError}
                            </p>
                          )}
                          <div className="grid grid-cols-3 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                            <div className="text-center">
                              Disbursement Type £
                            </div>
                            <div className="text-center">Fee Cost £</div>
                            {/* <div className="text-center">Transaction Type</div> */}
                            <div className="text-end pr-14">Action</div>
                          </div>
                          {pricingList
                            .find((item) => item.fees_category_id === numIndex).price_list.filter((row) => row.is_delete != 1)
                            .map((row, i) => (
                              <div
                                key={i}
                                className="gap-3 px-3 py-1 grid grid-cols-3"
                              >
                                {"others" in row  ? (
                                
                                   <div>
                                    <input
                                      type="text"
                                      placeholder="Enter other supplement type"
                                      value={row.type}
                                      onChange={(e) =>
                                        handlePriceChange(
                                          numIndex,
                                          i,
                                          "others",
                                          e.target.value
                                        )
                                      }
                                      className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900 pl-2"
                                    />
                                  </div>
                                ) : (
                                   <div className="font text-black ">
                                    <label
                                      key={standardDisbursementList?.[i]?.id}
                                      value={standardDisbursementList?.[i]?.id}
                                      className="cols-span-1 text-sm"
                                    >
                                      {standardDisbursementList[i]?.fee_type}
                                    </label>
                                  </div>
                                )}

                                  {"others" in row ?( <> <input
                                  placeholder="Fee others"
                                  onChange={(e) => {
                                    setdisbursementFeesError("");

                                    handlePriceChange(
                                      numIndex,
                                      i,
                                      "fee_amount",
                                      e.target.value
                                    );
                                  }}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black pl-2"
                                />
                              <div className=" gap-3  py-1 ">
                           

                            {/* ADD ROW – only last row */}

                            <div className="text-right">
                              <button
                                className="text-green-600 tooltip mr-4 flex items-center justify-center "
                                onClick={() =>
                                  handle_standard_disbursement(numIndex)
                                }
                              >
                                <FaPlus size={16} />
                                <span className="tooltiptext font">
                                  Add new row
                                </span>
                              </button>
                              <button
                                className="text-red-600 tooltip"
                                onClick={() => handleDeleteRow(numIndex, i,row.others_id)}
                              >
                                <FaTrash size={16} />
                                <span className="tooltiptext">
                                  Delete current row
                                </span>
                              </button>
                            </div>
                          </div>
                                  </>):(<>
                                  <input
                                  placeholder="Fee Amount"
                                  onChange={(e) => {
                                    settransactionFeesError("");

                                    handlePriceChange(
                                      numIndex,
                                      i,
                                      "fee_amount",
                                      e.target.value
                                    );
                                  }}
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black pl-2"
                                />
                                 {standardDisbursementList.length -1 == i && (
                                  <div className="text-right">
                                    <button
                                      className="text-green-600 tooltip mr-4 flex items-center justify-center "
                                      onClick={() =>
                                        handle_transaction_purchase(numIndex)
                                      }
                                    >
                                      <FaPlus size={16} />
                                      <span className="tooltiptext font">
                                        Add new row
                                      </span>
                                    </button>
                                    <button
                                      className="text-red-600 tooltip"
                                      onClick={() =>
                                        handleDeleteRow(numIndex, i,row.others_id)
                                      }
                                    >
                                      <FaTrash size={16} />
                                      <span className="tooltiptext">
                                        Delete current row
                                      </span>
                                    </button>
                                  </div>
                                )}
                                </>
                                )
                                  
                                }
                              </div>
                            ))}

                          
                        </div>
                      ))}
                    </div>
                  )}
                  {numIndex === 4 && (
                    <div className="standarddisblock mb-5">
                      {/* MAIN CATEGORY HEADER */}
                      <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                        {item.fees_category}
                      </div>

                      {item.sub_categories.map((sub, sIndex) => (
                        <div key={sIndex}>
                          {/* SUB CATEGORY HEADER */}
                          <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                            {sub.sub_category}
                          </div>

                          {leasedisbursementFeesError && (
                            <p className="text-red-500 px-3">
                              {leasedisbursementFeesError}
                            </p>
                          )}

                          {/* RESPONSIVE WRAPPER */}
                          <div className=" w-full">
                            <table className="min-w-max w-full text-xs font-semibold text-gray-600 table-fixed">
                              <thead className="bg-gray-100">
                                <tr className="">
                                  <th className="px-2 py-2 text-center w-1/4">
                                    Leasehold Service
                                  </th>
                                  <th className="px-2 py-2 text-center w-1/4">
                                    Fee Type
                                  </th>

                                  {/* <th className="px-3 py-2 text-center w-1/4">Paid To</th> */}
                                  <th className="px-2 py-2 text-end pr-16 w-1/4">
                                    Action
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {pricingList
                                  .find((x) => x.fees_category_id === numIndex)
                                  .price_list.map((row, i) => (
                                    <tr key={i} className="">
                                      {/* LEASEHOLD SERVICE SELECT */}
                                      <td className="pl-2 py-2 text-center">
                                        {!row.isOthers ? (
                                       
                                           <div>
                                    <div className="font text-black ">
                                      <label
                                      
                                        className="text-sm"
                                      >
                                        {leaseholdDisbursementList[i]?.fee_type}
                                      </label>
                                    </div>
                                  </div>
                                        ) : (
                                          <input
                                            type="text"
                                            placeholder="Enter other supplement"
                                            value={row.type}
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "type_id",
                                                e.target.value
                                              )
                                            }
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                          />
                                        )}
                                      </td>

                                      {/* COST */}
                                      <td className="pl-2 py-2 text-center">
                                        <input
                                          type="text"
                                          placeholder="Fee Cost"
                                          value={row.fee_amount}
                                          onChange={(e) => {
                                            setleasedisbursementFeesError("");

                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "fee_amount",
                                              e.target.value
                                            );
                                          }}
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full "
                                        />
                                      </td>

                                      {/* PAID TO */}

                                      {/* ACTION BUTTONS */}
                                     
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {numIndex === 5 && (
                    <div className="addtional mb-5">
                      <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                        {item.fees_category}
                      </div>

                      {additionalServiceError && (
                        <p className="text-red-500 px-3 mt-1">
                          {additionalServiceError}
                        </p>
                      )}

                      {/* TABLE WRAPPER (for responsive scrolling) */}
                      <div className=" w-full">
                        <table className="min-w-max w-full text-xs font-semibold text-gray-600 table-fixed">
                          <thead className="bg-gray-100">
                            <tr className="">
                              <th className="px-3 py-2 text-center w-1/4">
                                Select Service
                              </th>
                              <th className="px-3 py-2 text-center w-1/4">
                                Cost £
                              </th>
                              <th className="px-3 py-2 text-end pr-16 w-1/2">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {pricingList
                              .find((x) => x.fees_category_id === numIndex)
                              .price_list.map((row, i) => (
                                <tr key={i} className="border-b">
                                  {/* SELECT SERVICE */}
                                  <td className="pl-2 py-2 text-center">
                                    <select
                                      className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                      value={row.type}
                                      onChange={(e) =>
                                        handlePriceChange(
                                          numIndex,
                                          i,
                                          "type_id",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="">
                                        Select Additional Service
                                      </option>
                                      {(additionalServiceList || []).map(
                                        (opt) => (
                                          <option key={opt.id} value={opt.id}>
                                            {opt.fee_type}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </td>

                                  {/* FEE COST */}
                                  <td className="pl-2 py-2 text-center">
                                    <input
                                      type="text"
                                      placeholder="Fee Cost"
                                      value={row.fee_amount}
                                      onChange={(e) =>
                                        handlePriceChange(
                                          numIndex,
                                          i,
                                          "fee_amount",
                                          e.target.value
                                        )
                                      }
                                      className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-black "
                                    />
                                  </td>

                                  {/* ACTION BUTTONS */}
                                  <td className="px-3 py-2 text-center">
                                    <div className="flex justify-end me-6 gap-3">
                                      {/* ADD ROW - only last row */}
                                      {i === 0 && (
                                        <button
                                          className="text-green-600 tooltip w-8 h-8 flex items-center justify-center "
                                          onClick={() =>
                                            handle_additional_service(numIndex)
                                          }
                                        >
                                          <FaPlus size={16} />
                                          <span className="tooltiptext font">
                                            Add new row
                                          </span>
                                        </button>
                                      )}

                                      <button
                                        className="text-red-600 tooltip w-8 h-8 flex items-center justify-center"
                                        onClick={() => {
                                          const updated =
                                            disbursementRows.filter(
                                              (_, idx) => idx !== i
                                            );
                                          setDisbursementRows(updated);
                                        }}
                                      >
                                        <FaTrash size={16} />
                                        <span className="tooltiptext">
                                          Delete current row
                                        </span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <h1 className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
              Share your Notes Details
            </h1>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={notesData}
                onChange={setnotesData}
                modules={modules}
                formats={formats}
                className="h-[150px] text-black"
              />
            </div>
          </div>
        </div>

        {/* ✅ Footer Buttons */}
      </main>

      <div className=" m-10 flex justify-end gap-4 max-w-screen">
        <button
          onClick={() => router.back()}
          className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
        >
          Back
        </button>
        <button
          className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
          onClick={handleSubmit}
        >
          {loading && (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Saving..." : "Register"}
        </button>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl relative animate-slideUp">
            {/* SUCCESS ICON */}
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-green-700 mt-5">
              Registration Successful 🎉
            </h2>

            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Your company details have been securely saved.
            </p>

            {/* EXTRA MESSAGE */}
            <div className="mt-4 bg-green-50 text-green-700 text-xs py-2 rounded-lg px-3 border border-green-100">
              Thank you for completing your setup. You can update your company
              info anytime.
            </div>

            {/* CTA BUTTON */}
            <button
              onClick={() => {
                setShowSuccess(false);
                router.push("/");
              }}
              className="mt-6 w-full bg-gradient-to-r from-green-700 to-green-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Continue →
            </button>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 mt-20 bg-black/40 backdrop-blur-sm flex  items-center justify-center z-50 animate-fadeIn reviewpopup">
          <div className="bg-white rounded-2xl p-6 w-[90%]  text-center shadow-xl animate-slideUp">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Confirm Submission
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              Please review your inputs before submit or else click ok to
              proceed next level
            </p>

            {/* Close button */}

            <div
              className="border rounded-lg mb-6 shadow-sm overflow-auto  bg-white p-5 "
              style={{ maxHeight: "550px", overflowY: "scroll" }}
            >
              {Object.entries(feeCategory).map(([index, value]) => {
                // the actual object inside
                const item = value[0];
                const numIndex = Number(index);
                return (
                  <div key={numIndex}>
                    {numIndex === 1 && (
                      <div key={numIndex} className="  feecatgoryblock mb-5">
                        <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                          {item.fees_category}
                        </div>
                        {item.sub_categories.map((sub, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide"
                          >
                            {sub.sub_category}
                          </div>
                        ))}
                        {legalFeesError && (
                          <p style={{ color: "red" }}>{legalFeesError}</p>
                        )}

                        <div className=" w-full">
                          <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                            <thead className="bg-gray-100">
                              <tr className="">
                                <th className="px-3 py-2 text-center">S.no</th>
                                <th className="px-3 py-2 text-center">Min £</th>
                                <th className="px-3 py-2 text-center">Max £</th>

                                {(formData["service_id"]?.includes(1) ||
                                  formData["service_id"]?.includes(2)) && (
                                  <>
                                    <th className="px-3 py-2 text-center">
                                      Purchase Leasehold £
                                    </th>
                                    <th className="px-3 py-2 text-center">
                                      Purchase Freehold £
                                    </th>
                                  </>
                                )}

                                {(formData["service_id"]?.includes(1) ||
                                  formData["service_id"]?.includes(3)) && (
                                  <>
                                    <th className="px-3 py-2 text-center">
                                      Sales Leasehold £
                                    </th>
                                    <th className="px-3 py-2 text-center">
                                      Sales Freehold £
                                    </th>
                                  </>
                                )}

                                {formData["service_id"]?.includes(4) && (
                                  <th className="px-3 py-2 text-center">
                                    Remortgage
                                  </th>
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {pricingList
                                .find(
                                  (item) => item.fees_category_id === numIndex
                                )
                                .price_list.map((row, i) => (
                                  <tr key={i} className="border-b">
                                    <td className="px-3 py-2 text-center">
                                      {i + 1}
                                    </td>
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          readOnly
                                          type="text"
                                          placeholder="Min"
                                          value={row?.min}
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black bg-white"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "min",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.min && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].min}
                                          </span>
                                        )}
                                        {rowErrors[i]?.range && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].range}
                                          </span>
                                        )}
                                        {rowErrors[i]?.negative && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].negative}
                                          </span>
                                        )}

                                        {rangeErrors[i]?.map((msg, idx) => (
                                          <p
                                            key={idx}
                                            className="text-red-500 text-xs mt-1"
                                          >
                                            {msg}
                                          </p>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="px-3 py-2">
                                      <div className="flex flex-col">
                                        <input
                                          readOnly
                                          type="text"
                                          placeholder="Max"
                                          value={row.max}
                                          className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                          onChange={(e) =>
                                            handlePriceChange(
                                              numIndex,
                                              i,
                                              "max",
                                              e.target.value
                                            )
                                          }
                                        />

                                        {rowErrors[i]?.max && (
                                          <span className="text-red-500 text-xs">
                                            {rowErrors[i].max}
                                          </span>
                                        )}

                                        {rangeErrors[i]?.map((msg, idx) => (
                                          <p
                                            key={idx}
                                            className="text-red-500 text-xs mt-1"
                                          >
                                            {msg}
                                          </p>
                                        ))}
                                      </div>
                                    </td>

                                    {(formData["service_id"]?.includes(1) ||
                                      formData["service_id"]?.includes(3)) && (
                                      <td className="px-3 py-2">
                                        <div className="flex flex-col">
                                          <input
                                            readOnly
                                            type="text"
                                            value={row.purchase_leasehold}
                                            placeholder="Purchase Leasehold"
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "purchase_leasehold",
                                                e.target.value
                                              )
                                            }
                                          />

                                          {rowErrors[i]?.PurchaseLeasehold && (
                                            <span className="text-red-500 text-xs">
                                              {rowErrors[i].PurchaseLeasehold}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                    {/* PURCHASE FREEHOLD */}
                                    {(formData["service_id"]?.includes(1) ||
                                      formData["service_id"]?.includes(3)) && (
                                      <td className="px-3 py-2">
                                        <div className="flex flex-col">
                                          <input
                                            readOnly
                                            type="text"
                                            placeholder="Purchase Freehold"
                                            value={row.purchase_freehold}
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "purchase_freehold",
                                                e.target.value
                                              )
                                            }
                                          />

                                          {rowErrors[i]?.PurchaseFreehold && (
                                            <span className="text-red-500 text-xs">
                                              {rowErrors[i].PurchaseFreehold}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                    {/* SALES LEASEHOLD */}
                                    {(formData["service_id"]?.includes(2) ||
                                      formData["service_id"]?.includes(3)) && (
                                      <td className="px-3 py-2">
                                        <div className="flex flex-col">
                                          <input
                                            readOnly
                                            type="text"
                                            value={row.sales_leasehold}
                                            placeholder="Sales Leasehold"
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "sales_leasehold",
                                                e.target.value
                                              )
                                            }
                                          />

                                          {rowErrors[i]?.salesLeasehold && (
                                            <span className="text-red-500 text-xs">
                                              {rowErrors[i].salesLeasehold}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                    {/* SALES FREEHOLD */}
                                    {(formData["service_id"]?.includes(2) ||
                                      formData["service_id"]?.includes(3)) && (
                                      <td className="px-3 py-2">
                                        <div className="flex flex-col">
                                          <input
                                            readOnly
                                            type="text"
                                            value={row.sales_freehold}
                                            placeholder="Sales Freehold"
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "sales_freehold",
                                                e.target.value
                                              )
                                            }
                                          />

                                          {rowErrors[i]?.salesFreehold && (
                                            <span className="text-red-500 text-xs">
                                              {rowErrors[i].salesFreehold}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                    {/* REMORTGAGE */}
                                    {formData["service_id"]?.includes(4) && (
                                      <td className="px-3 py-2">
                                        <div className="flex flex-col">
                                          <input
                                            readOnly
                                            type="text"
                                            placeholder="Remortgage"
                                            value={row.remortgage}
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm text-black"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "remortgage",
                                                e.target.value
                                              )
                                            }
                                          />

                                          {rowErrors[i]?.remortgage && (
                                            <span className="text-red-500 text-xs">
                                              {rowErrors[i].remortgage}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                    {/* ADD ROW BUTTON */}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {numIndex === 2 && (
                      <div className="transactionblock mb-5">
                        <div className="bg-gray-50  px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                          {item.fees_category}
                        </div>
                        {item.sub_categories.map((sub, i) => (
                          <div key={i}>
                            <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                              {sub.sub_category}
                            </div>

                            <div className="grid  grid-cols-2 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                              <div className="text-center">
                                Supplement Type check
                              </div>
                              <div className="text-center">Fee Cost £</div>
                            </div>

                            {pricingList
                              .find(
                                (item) => item.fees_category_id === numIndex
                              )
                              .price_list.map((row, i) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-2 gap-3 px-3 py-2"
                                >
                                  {!row.isOthers ? (
                                    <div>
                                      {purchaseFeeTypeList.map(
                                        (opt, index) =>
                                          opt.id == row.type_id && (
                                            <span
                                              key={index}
                                              className="text-black"
                                            >
                                              {opt.fee_type}{" "}
                                            </span>
                                          )
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <input
                                        disabled
                                        id="Supplement_type"
                                        type="text"
                                        placeholder="Enter other Supplement Type"
                                        value={row.type}
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "type_id",
                                            e.target.value
                                          )
                                        }
                                        className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                      />
                                    </div>
                                  )}

                                  {/* FEE AMOUNT */}
                                  <input
                                    readOnly
                                    placeholder="Fee Amount"
                                    value={row.fee_amount}
                                    onChange={(e) =>
                                      handlePriceChange(
                                        numIndex,
                                        i,
                                        "fee_amount",
                                        e.target.value
                                      )
                                    }
                                    className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                  />

                                  {/* REMOVE BUTTON */}
                                </div>
                              ))}
                            {remainingsupplement.map((item, i) => (
                              <div
                                key={i}
                                className="text-black grid grid-cols-2 gap-3 px-3 py-2"
                              >
                                <span key={index} className="text-black">
                                  {item.fee_type}{" "}
                                </span>
                                <input
                                  readOnly
                                  value={0}
                                  placeholder="Fee Amount"
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {numIndex === 3 && (
                      <div className="standarddisblock mb-5">
                        <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                          {item.fees_category}
                        </div>
                        {item.sub_categories.map((sub, i) => (
                          <div key={i}>
                            <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                              {sub.sub_category}
                            </div>
                            {disbursementFeesError && (
                              <p style={{ color: "red" }}>
                                {disbursementFeesError}
                              </p>
                            )}
                            <div className="grid grid-cols-2 items-center text-xs font-semibold text-gray-600 border-b bg-gray-100 px-3 py-2">
                              <div className="text-center">
                                Disbursement Type
                              </div>
                              <div className="text-center">Fee Cost £</div>
                            </div>
                            {pricingList
                              .find(
                                (item, index) =>
                                  item.fees_category_id === numIndex
                              )
                              .price_list.map((row, i) => (
                                <div
                                  key={i}
                                  className=" grid grid-cols-2 gap-3 px-3 py-2"
                                >
                                  {!row.isOthers ? (
                                    <div className="col-span-1">
                                      {standardDisbursementList.map(
                                        (opt, index) =>
                                          opt.id == row.type_id && (
                                            <span
                                              key={index}
                                              className="text-black"
                                            >
                                              {opt.fee_type}{" "}
                                            </span>
                                          )
                                      )}
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1">
                                      <input
                                        readOnly
                                        type="text"
                                        placeholder="Enter other Supplement"
                                        value={row.type}
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "type_id",
                                            e.target.value
                                          )
                                        }
                                        className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                                      />
                                    </div>
                                  )}

                                  {/* COST */}
                                  <input
                                    readOnly
                                    type="text"
                                    placeholder="Fee Cost"
                                    value={row.fee_amount}
                                    onChange={(e) =>
                                      handlePriceChange(
                                        numIndex,
                                        i,
                                        "fee_amount",
                                        e.target.value
                                      )
                                    }
                                    className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black col-span-1"
                                  />
                                </div>
                              ))}
                            {remainingdisbursement.map((item, i) => (
                              <div
                                key={i}
                                className="text-black grid grid-cols-2 gap-3 px-3 py-2"
                              >
                                <span key={index} className="text-black">
                                  {item.fee_type}{" "}
                                </span>
                                <input
                                  readOnly
                                  value={0}
                                  placeholder="Fee Amount"
                                  className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {numIndex === 4 && (
                      <div className="standarddisblock mb-5">
                        {/* MAIN CATEGORY HEADER */}
                        <div className="bg-gray-50 px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                          {item.fees_category}
                        </div>

                        {item.sub_categories.map((sub, sIndex) => (
                          <div key={sIndex}>
                            {/* SUB CATEGORY HEADER */}
                            <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                              {sub.sub_category}
                            </div>

                            {leasedisbursementFeesError && (
                              <p className="text-red-500 px-3">
                                {leasedisbursementFeesError}
                              </p>
                            )}

                            {/* RESPONSIVE WRAPPER */}
                            <div className=" w-full">
                              <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                                <thead className="bg-gray-100">
                                  <tr className="">
                                    <th className="px-3 py-2 text-center">
                                      Leasehold Service
                                    </th>

                                    <th className="px-3 py-2 text-center">
                                      Cost £
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pricingList
                                    .find(
                                      (x) => x.fees_category_id === numIndex
                                    )
                                    .price_list.map((row, i) => (
                                      
                                      <tr key={i} className="">
                                        {/* LEASEHOLD SERVICE SELECT */}
                                        <td className="px-3 py-2 text-center">
                                          {!row.isOthers ? (
                                            leaseholdDisbursementList.map(
                                              (opt, index) =>
                                                opt.id == row.type_id && (
                                                  <span
                                                    key={index}
                                                    className="text-black font-extrabold px-3 py-2 bg- text-sm"
                                                  >
                                                    {opt.fee_type}
                                                  </span>
                                                )
                                            )
                                          ) : (
                                            <div>
                                              <input
                                                readOnly
                                                type="text"
                                                placeholder="Enter other Supplement"
                                                value={row.type}
                                                onChange={(e) =>
                                                  handlePriceChange(
                                                    numIndex,
                                                    i,
                                                    "type_id",
                                                    e.target.value
                                                  )
                                                }
                                                className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black placeholder:text-gray-900"
                                              />
                                            </div>
                                          )}
                                        </td>

                                        {/* COST */}
                                        <td className="px-3 py-2 text-center">
                                          <input
                                            readOnly
                                            type="text"
                                            placeholder="Fee Cost"
                                            value={row.fee_amount}
                                            onChange={(e) =>
                                              handlePriceChange(
                                                numIndex,
                                                i,
                                                "fee_amount",
                                                e.target.value
                                              )
                                            }
                                            className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                          />
                                        </td>

                                        {/* PAID TO */}

                                        {/* TRANSACTION TYPE */}
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}

                        {remainingleashold.map((item, i) => (
                          <div
                            key={i}
                            className="text-black grid grid-cols-2 gap-3 px-3 py-2"
                          >
                            <span key={index} className="text-black">
                              {item.fee_type}{" "}
                            </span>
                            <input
                              readOnly
                              value={0}
                              placeholder="Fee Amount"
                              className="border border-gray-400 rounded py-0.5 w-full text-sm text-left text-black"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {numIndex === 5 && (
                      <div className="addtional mb-5">
                        <div className="bg-gray-50 border-b px-4 py-2 font-semibold text-green-800 text-sm uppercase tracking-wide">
                          {item.fees_category}
                        </div>

                        {additionalServiceError && (
                          <p className="text-red-500 px-3 mt-1">
                            {additionalServiceError}
                          </p>
                        )}

                        {/* TABLE WRAPPER (for responsive scrolling) */}
                        <div className="overflow-x-auto w-full">
                          <table className="min-w-max w-full text-xs font-semibold text-gray-600 ">
                            <thead className="bg-gray-100">
                              <tr className="">
                                <th className="px-3 py-2 text-center">
                                  Select Service
                                </th>
                                <th className="px-3 py-2 text-center">
                                  Cost £
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {pricingList
                                .find((x) => x.fees_category_id === numIndex)
                                .price_list.map((row, i) => (
                                  <tr key={i} className="border-b">
                                    {/* SELECT SERVICE */}
                                    <td className="px-3 py-2 text-center">
                                      <select
                                        className="poundtransform border border-gray-400 rounded py-0.5 text-sm w-full text-black"
                                        value={row.type}
                                        disabled
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "type_id",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">
                                          Select Additional Service
                                        </option>
                                        {(additionalServiceList || []).map(
                                          (opt) => (
                                            <option key={opt.id} value={opt.id}>
                                              {opt.fee_type}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </td>

                                    {/* FEE COST */}
                                    <td className="px-3 py-2 text-center">
                                      <input
                                        readOnly
                                        type="text"
                                        placeholder="Fee Cost"
                                        value={row.fee_amount}
                                        onChange={(e) =>
                                          handlePriceChange(
                                            numIndex,
                                            i,
                                            "fee_amount",
                                            e.target.value
                                          )
                                        }
                                        className="poundtransform border border-gray-400 rounded py-0.5 w-full text-sm text-black "
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                className="w-1/2 bg-yellow-400 text-gray-700 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                onClick={() => {
                  setShowConfirm(false);
                }}
              >
                Yes, Review
              </button>

              <button
                className="w-1/2 bg-green-800 text-white py-2 rounded-lg font-semibold hover:bg-green-900 transition"
                onClick={() => {
                  setShowConfirm(false);
                  submitFinal(); // <-- Call API only here
                }}
              >
                Ok, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
