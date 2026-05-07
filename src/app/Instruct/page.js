'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../parts/navbar/page";
import Footer from "../parts/Footer/footer";
import { CircleCheckBig } from "lucide-react";
import { getData, API_ENDPOINTS } from "../auth/API/api";
import { formatGBP } from "../components/utility/poundconverter";
import React from "react";

function InstructContent() {
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState([]);
  const [lenders, setLenders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch languages
        const langRes = await getData(API_ENDPOINTS.languages);
        setLanguage(langRes?.users || []);

        // Fetch lenders
        const lendersRes = await getData(API_ENDPOINTS.lenders);
        setLenders(lendersRes?.users || []);

        // Fetch quote details only if quoteId is valid
        if (quoteId && String(quoteId).trim() !== "") {
          try {
            const quoteRes = await getData(`${API_ENDPOINTS.quotesfilter}/${quoteId}`);
            setQuoteData(quoteRes?.quote || quoteRes);
          } catch (err) {
            console.error("Error fetching quote data:", err);
            setQuoteData(null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quoteId]);

  const getServiceType = () => {
    if (!quoteData) return null;
    if (quoteData.service_details?.[0]?.service_type) {
      return quoteData.service_details[0].service_type;
    }
    return null;
  };

  const getPropertyDetails = () => {
    if (!quoteData?.service_details?.[0]) return null;
    return quoteData.service_details[0];
  };

  const serviceType = getServiceType();
  const propertyDetails = getPropertyDetails();

  return (
    <div>
      <div className='bg-white shadow-md sticky top-0 font p-4 z-50'>
        <Navbar />
      </div>

      <section className="py-16 bg-white font mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Thank You Message */}
          <div className="p-8 rounded-xl border border-emerald-300 bg-emerald-50 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4">
              Thank you for your quote submission to Movwise.
            </h2>

            <ul className="grid md:grid-cols-1 gap-4 text-gray-700 list-none p-0 mb-6">
              <li className="flex items-center">
                <CircleCheckBig className="mr-2 text-green-600" />
                Your information has been successfully received and is now being reviewed by our specialists.
              </li>
              <li className="flex items-center">
                <CircleCheckBig className="mr-2 text-green-600" />
                We are currently assessing your details to prepare an accurate and comprehensive quote tailored to your circumstances.
              </li>
              <li className="flex items-center">
                <CircleCheckBig className="mr-2 text-green-600" />
                You will receive your detailed quotation shortly by email (Please check your Inbox, in case it&apos;s in your spam folder).
              </li>
              <li className="flex items-center">
                <CircleCheckBig className="mr-3 text-green-600 w-8 h-8" />
                We appreciate your interest in Movwise services and remain committed to providing you with clear, efficient, and reliable support throughout this process.
              </li>
            </ul>

            <p className="text-xl font-semibold text-emerald-800 border-t border-emerald-200 pt-4 mt-4">
              Movwise-Trusted Partner price for complete peace of mind — especially when every property detail matters.
            </p>
          </div>

          {/* Property Details Section */}
          {!loading && propertyDetails && (
            <div className="p-8 border rounded-lg bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-emerald-600 mb-6">
                Property Details
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {(() => {
                      const rows = [];

                      // Common fields for all service types
                      if (propertyDetails.address) {
                        rows.push(["Address", propertyDetails.address]);
                      }
                      if (propertyDetails.town_city || propertyDetails.sales_town_city) {
                        rows.push([
                          "Town/City",
                          propertyDetails.town_city || propertyDetails.sales_town_city
                        ]);
                      }
                      if (propertyDetails.country || propertyDetails.sales_country) {
                        rows.push([
                          "Country",
                          propertyDetails.country || propertyDetails.sales_country
                        ]);
                      }

                      // Purchase specific
                      if (serviceType === "purchase" || serviceType === "Purchase") {
                        if (propertyDetails.purchase_price) {
                          rows.push(["Purchase Price", `£${propertyDetails.purchase_price}`]);
                        }
                        if (propertyDetails.stages) {
                          rows.push(["Stages", propertyDetails.stages]);
                        }
                      }

                      // Sales specific
                      if (serviceType === "sales" || serviceType === "Sales") {
                        if (propertyDetails.sales_price) {
                          rows.push(["Sales Price", `£${propertyDetails.sales_price}`]);
                        }
                        if (propertyDetails.sales_stages) {
                          rows.push(["Stages", propertyDetails.sales_stages]);
                        }
                      }

                      // Remortgage specific
                      if (serviceType === "remortgage" || serviceType === "Remortgage") {
                        if (propertyDetails.property_values) {
                          rows.push(["Property Value", `£${propertyDetails.property_values}`]);
                        }
                      }

                      // Common property fields
                      if (propertyDetails.no_of_bedrooms || propertyDetails.sales_no_of_bedrooms) {
                        rows.push([
                          "Number of Bedrooms",
                          propertyDetails.no_of_bedrooms || propertyDetails.sales_no_of_bedrooms
                        ]);
                      }
                      if (propertyDetails.leasehold_or_free || propertyDetails.sales_leasehold_or_free) {
                        rows.push([
                          "Leasehold or Freehold",
                          propertyDetails.leasehold_or_free || propertyDetails.sales_leasehold_or_free
                        ]);
                      }
                      if (propertyDetails.property_type || propertyDetails.sales_property_type) {
                        rows.push([
                          "Property Type",
                          propertyDetails.property_type || propertyDetails.sales_property_type
                        ]);
                      }

                      // Mortgage info
                      if (propertyDetails.obtaining_mortgage !== undefined || propertyDetails.existing_mortgage !== undefined) {
                        const hasMortgage = propertyDetails.obtaining_mortgage || propertyDetails.existing_mortgage;
                        let mortgageInfo = "No";

                        if (hasMortgage === 1 || hasMortgage === true) {
                          if (propertyDetails.lenders && Array.isArray(propertyDetails.lenders) && propertyDetails.lenders.length > 0) {
                            mortgageInfo = propertyDetails.lenders
                              .map((id) =>
                                lenders.find((l) => String(l.id) === String(id))?.lenders_name
                              )
                              .filter(Boolean)
                              .join(", ") || "Yes";
                          } else {
                            mortgageInfo = "Yes";
                          }
                        }

                        rows.push(["Obtaining Mortgage", mortgageInfo]);
                      }

                      // Language
                      if (propertyDetails.languages) {
                        const langName =
                          language.find((l) => l.id == propertyDetails.languages)
                            ?.language_name || "--";
                        rows.push(["Language", langName]);
                      }

                      return rows.map(([label, value], i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td
                            style={{
                              width: "250px",
                              fontWeight: "600",
                              padding: "12px 15px",
                              textAlign: "left",
                              backgroundColor: "#f9fafb",
                              color: "#047857"
                            }}
                          >
                            {label}:
                          </td>
                          <td
                            style={{
                              padding: "12px 15px",
                              textAlign: "left",
                              color: "#1f2937"
                            }}
                          >
                            {value || "--"}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {loading && (
            <div className="p-8 border rounded-lg bg-white shadow-lg text-center">
              <p className="text-gray-600">Loading property details...</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InstructContent />
    </Suspense>
  );
}

