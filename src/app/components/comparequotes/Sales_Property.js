import { useEffect, useState } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";

// PropertyDetails.js
export default function SalesPropertyDetails({ quote, page, servicData }) {
    const [language,setlanguage]=useState([])
console.log("PAGE VALUE = ", page);
console.log("sales")

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
    <div className="py-1  text-sm">
                                      <div className="text-start">
                                        <h3 className="text-lg font-semibold text-emerald-600">
                                        Sales Property Details 
                                        </h3>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Stages
                                        </span>
                                        <span className=" text-left">
                                          {servicData ?.sales_stages || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Town City
                                        </span>
                                        <span className="">
                                          {servicData ?.sales_town_city || "--"}
                                        </span>
                                      </div>
                                      
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Country
                                        </span>
                                        <span className="">
                                          {servicData ?.sales_country || "--"}
                                        </span>
                                      </div>
                                   <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Price
                                        </span>
                                        <span className="">
                                          £{servicData ?.sales_price || "--"}.00
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {servicData ?.sales_no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {servicData ?.sales_leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Property Type
                                        </span>
                                        <span className="">
                                          {servicData ?.sales_property_type || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Shared Ownership
                                        </span>
                                        <span className="">
                                          {servicData ?.shared_ownership || "--"}
                                        </span>
                                      </div>
                                      

                                      <div className="flex mt-3">
                                        <span className="font-semibold w-40 text-left">
                                          Existing Mortgage
                                        </span>
                                        <span className=" ">
                                          {servicData ?.existing_mortgage === 1 ? "Yes" : "No"}
                                        </span>
                                      </div>

                                     


<div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Languages
                                        </span>
                                        <span>
  {
    language.find(
      (l) => l.id == servicData?.languages
    )?.language_name || "--"
  }
</span>
                                      </div>




                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Lenders
                                        </span>
                                        <span className="">
                                          {servicData ?.lenders || "--"}
                                        </span>
                                      </div>


                                    </div>
  );
}
