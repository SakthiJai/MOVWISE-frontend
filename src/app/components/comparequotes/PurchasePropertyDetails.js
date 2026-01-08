import { useEffect, useState } from "react";
import { API_ENDPOINTS, getData } from "../../auth/API/api";

// PropertyDetails.js
  export default function PurchasePropertyDetails({ quote, dropdownOpenId,servicData }) {
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
                                         Purchase Property Details
                                        </h3>
                                      </div>
                                <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Stages
                                        </span>
                                        <span className="">
                                          {servicData ?.stages || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Town_city
                                        </span>
                                        <span className="">
                                          {servicData ?.town_city || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Country
                                        </span>
                                        <span className="">
                                          {servicData ?.country || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Purchase Price
                                        </span>
                                        <span className="">
                                          £{servicData ?.purchase_price || "--"}
                                        </span>
                                      </div>

                                        <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          No Of Bedrooms
                                        </span>
                                        <span className="">
                                          {servicData ?.no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                     <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Leasehold Or Free
                                        </span>
                                        <span className="">
                                          {servicData ?.leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Property Type
                                        </span>
                                        <span className="">
                                          {servicData ?.property_type || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                        High Raise Support
                                        </span>
                                        <span className="">
                                          {servicData ?.purchase_high_raise_support==0?"No":"Yes" }
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Purchase Mode
                                        </span>
                                        <span className="">
                                          {servicData ?.purchase_mode || "--"}
                                        </span>
                                      </div>

                                      <div className="flex mt-3">
                                        <span className="font-semibold w-40 text-left">
                                          Buy To Let
                                        </span>
                                        <span className="">
                                          {servicData ?.buy_to_let || "--"}
                                        </span>
                                      </div>
                                      
 <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Obtaining Mortgage
                                        </span>
                                        <span className="">
                                          {servicData ?.obtaining_mortgage==0?"No":"Yes"}
                                        </span>
                                      </div>
                                    

                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Gift Deposit
                                        </span>
                                        <span className="">
                                          {servicData ?.gift_deposit? "yes":"no" || "--"}
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
                                        Life Time Support
                                        </span>
                                        <span className="">
                                          {servicData ?.purchase_lifetime_isa==0?"No":"Yes" }
                                        </span>
                                      </div>
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                        HMO Support
                                        </span>
                                        <span className="">
                                          {servicData ?.purchase_need_hmo==0?"No":"Yes" }
                                        </span>
                                      </div>


                                      
                                    
                                 

                                      



                                    </div>

                                    
  );
}
