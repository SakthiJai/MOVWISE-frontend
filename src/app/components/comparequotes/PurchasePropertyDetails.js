import { useEffect, useState } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";

// PropertyDetails.js
  export default function PurchasePropertyDetails({ quote, dropdownOpenId }) {
    const [language,setlanguage]=useState([])
  async function fetchapi(){
    try{
  const res = await getData(API_ENDPOINTS.languages);
  const language = res.users
  console.log(language);
  setlanguage(language)

    }
    catch(e){
      console.log(e);
    }

  }

  useEffect(()=>{
    fetchapi()

    
  },[])

  return (
    <div className=" text-sm">
                                      <div className="text-emerald-600 text-start">
                                        <h3 className="text-lg font-semibold ">
                                          Property Details 
                                        </h3>
                                      </div>
                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Address
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.address || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Address Line 1
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.address_line1 || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Address Line 2
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.address_line2 || "--"}
                                        </span>
                                      </div> */}


                                      <div className="flex mt-3">
                                        <span className="font-semibold w-40 text-left">
                                          Buy To Let
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.buy_to_let || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Country
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.country || "--"}
                                        </span>
                                      </div>

                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Existing Mortgage
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.existing_mortgage || "--"}
                                        </span>
                                      </div> */}


                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Gift Deposit
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.gift_deposit? "yes":"no" || "--"}
                                        </span> 
                                      </div>
                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Govt By Scheme
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.govt_by_scheme || "--"}
                                        </span>
                                      </div> */}

                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Guest User
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.guest_user || "--"}
                                        </span>
                                      </div> */}


                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Languages
                                        </span>
                                        <span>
  {
    language.find(
      (l) => l.id == quote?.service_details?.[0]?.languages
    )?.language_name || "--"
  }
</span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.leasehold_or_free || "--"}
                                        </span>
                                      </div>


                                       {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Lenders
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.lenders || "--"}
                                        </span>
                                      </div>
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          New Build
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.new_build || "--"}
                                        </span>
                                      </div> */}

                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                       {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         No Of Peoples
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.no_of_peoples || "--"}
                                        </span>
                                      </div> */}
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Obtaining Mortgage
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.obtaining_mortgage==0?"No":"Yes"}
                                        </span>
                                      </div>
                                       {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Ownership Housing Asso
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.ownership_housing_asso || "--"}
                                        </span>
                                      </div> */}
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Property Type
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.property_type || "--"}
                                        </span>
                                      </div>
                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                           Property Values
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.property_values || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Purchase Address
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_address || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Purchase Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_leasehold_or_free || "--"}
                                        </span>
                                      </div> */}
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Purchase Mode
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_mode || "--"}
                                        </span>
                                      </div>
                                      {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Purchase No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_no_of_bedrooms || "--"}
                                        </span>
                                      </div> */}
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Purchase Price
                                        </span>
                                        <span className="">
                                          £{quote?.service_details[0]
                                            ?.purchase_price || "--"}
                                        </span>
                                      </div>
                                        {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Purchase Property Type
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_property_type || "--"}
                                        </span>
                                      </div> */}
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                        High Raise Support
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_high_raise_support==0?"No":"Yes" }
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                        Life Time Support
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_lifetime_isa==0?"No":"Yes" }
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                        HMO Support
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.purchase_need_hmo==0?"No":"Yes" }
                                        </span>
                                      </div>


                                        {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Address
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_address || "--"}
                                        </span>
                                      </div>
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Address Line1
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_address_line1 || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Address Line2
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_address_line2 || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Country
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_country || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Price
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_price || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Property Type
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_property_type || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Stages
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_stages || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Sales Town City
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_town_city || "--"}
                                        </span>
                                      </div> */}


                                     
                                       {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Shared Ownership
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.shared_ownership || "--"}
                                        </span>
                                      </div> */}
                                      
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Stages
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.stages || "--"}
                                        </span>
                                      </div>
                                        
                                        {/* <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Stamp Duty
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.stamp_duty || "--"}
                                        </span>
                                      </div>
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Total
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.total || "--"}
                                        </span>
                                      </div>
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Vat
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.vat || "--"}
                                        </span>
                                      </div> */}

                                      



                                    </div>

                                    
  );
}
