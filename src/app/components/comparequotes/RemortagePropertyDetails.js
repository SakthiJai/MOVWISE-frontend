
// PropertyDetails.js
export default function RemortagePropertyDetails({ quote, dropdownOpenId,servicData }) {

  return (
    <div className=" text-sm">
                                      <div className="text-emerald-600 text-start">
                                        <h3 className="text-lg font-semibold">
                                          Property Details
                                        </h3>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Address
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.address || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Town City
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.town_city || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Country
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.country || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                           Property Values
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.property_values || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          No Of Bedrooms
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.no_of_bedrooms || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Leasehold Or Free
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.leasehold_or_free || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Property Type
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.property_type || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Buy To Let
                                        </span>
                                        <span className="ml-10">
                                          {servicData?.buy_to_let || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Ownership Housing Asso
                                        </span>
                                        <span className="ml-10">
                                          {servicData
                                            ?.ownership_housing_asso || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                         Obtaining Mortgage
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.obtaining_mortgage || "--"}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Languages
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.languages || "--"}
                                        </span>
                                      </div>
                                       
                                       <div className="flex">
                                        <span className="font-semibold w-40 text-left">
                                          Lenders
                                        </span>
                                        <span className="ml-10">
                                          {servicData ?.lenders || "--"}
                                        </span>
                                      </div>


                                    </div>
  );
}
