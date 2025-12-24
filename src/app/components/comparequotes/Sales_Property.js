import { useEffect, useState } from "react";

// PropertyDetails.js
export default function SalesPropertyDetails({ quote, page }) {
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
    <div className="py-1 px-5 text-sm">
                                      <div className="">
                                        <h3 className={`text-lg font-semibold ${
        page == "profile" ? "text-indigo-800 " : "text-red-600"
      }`}>
                                          Property Details 
                                        </h3>
                                      </div>
                                      


                                      <div className="flex mt-3">
                                        <span className="font-semibold w-40 text-left">
                                          Existing Mortgage
                                        </span>
                                        <span className=" ">
                                          {quote?.service_details[0]?.existing_mortgage === 1 ? "Yes" : "No"}
                                        </span>
                                      </div>

                                     


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
                                          Lenders
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.lenders || "--"}
                                        </span>
                                      </div>


                                       
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Country
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_country || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Price
                                        </span>
                                        <span className="">
                                          £{quote?.service_details[0]
                                            ?.sales_price || "--"}.00
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Property Type
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_property_type || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Stages
                                        </span>
                                        <span className=" text-left">
                                          {quote?.service_details[0]
                                            ?.sales_stages || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Town City
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.sales_town_city || "--"}
                                        </span>
                                      </div>
                                      
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Shared Ownership
                                        </span>
                                        <span className="">
                                          {quote?.service_details[0]
                                            ?.shared_ownership || "--"}
                                        </span>
                                      </div>
                                      





                                    </div>
  );
}
