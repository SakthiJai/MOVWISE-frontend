// ✅ Base URL for your backend
const BASE_URL = "https://admin.movwise.com/api";

//const BASE_URL = "http://localhost:5000/api";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    } 
  }
};
// ✅ Example: central place for all API endpoints
export const API_ENDPOINTS = {
  conveyancingQuotes: `${BASE_URL}/conveyancing-quotes`,
  users: `${BASE_URL}/users`,
  lenders: `${BASE_URL}/lenders`,
  register: `${BASE_URL}/register`,
  login:`${BASE_URL}/login`,
    remortages:`${BASE_URL}/remortgages`,
    sales:`${BASE_URL}/sales`,
    createQuote:`${BASE_URL}/create-quote`,
    // quotesfilter:`${BASE_URL}/quotes/filter`,
    compareQuotes:`${BASE_URL}/compare-quotes`,
    languages:`${BASE_URL}/languages`,
    surveyorquotes:`${BASE_URL}/surveyorquotes`,
    languagelist:`${BASE_URL}/languagelist`,
    partnerfilter:`${BASE_URL}/partnerfilter`,
    feecatgory:`${BASE_URL}/feecategory`,
    feetype:`${BASE_URL}/feetype`,
    pricing:`${BASE_URL}/pricing`,
    insertcompanydetail:`${BASE_URL}/partners`,
    region:`${BASE_URL}/regions`,
    services:`${BASE_URL}/services`,
    addguestuser:`${BASE_URL}/addguest`,
    quotesfilter:`${BASE_URL}/quotes`,
    instruct:`${BASE_URL}/quote-mail`,
    servicelist:`${BASE_URL}/service`,
    getCompanyInformation:`${BASE_URL}/companyInformation`,
    getCompanyFee:`${BASE_URL}/feeDetails`,
    intstructquote_list:`${BASE_URL}/get-user-quotes`,
    update_user_profile : `${BASE_URL}/editpersonal_details`,
    update_partner_profile : `${BASE_URL}/editcompanydetials`,
    addguest:`${BASE_URL}/addguest`,
    api_key:`${BASE_URL}/app-setting`,
    forgetpassword:`${BASE_URL}/send-email`,
    resetpassword:`${BASE_URL}/reset_password`,
     blogs:`${BASE_URL}/blog`,
     blogDetail:`${BASE_URL}/blog`,
     statusupdate:`${BASE_URL}/quotes-updates-status`,
     sendinstructmail:`${BASE_URL}/sendinstructmail`,
     createsurveyor:`${BASE_URL}/createsurveyor`
}
  // add more endpoints here

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.log("GET request failed:", error);
    throw error;
  }
};


export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",   // ✅ must be JSON
        "Accept": "application/json",         // ✅ ensures backend parses it right
      },
      body: JSON.stringify(data),              // ✅ convert object → JSON string
    });

    const result = await response.json();
    console.log("✅ Response:", result);

    if (!response.ok) {
      console.log("❌ API Error:", result);
    }

    return result;
  } catch (error) {
    console.log("🚨 Network Error:", error);
  }
};

// export const postData = async (url, data) => {
//   try {
//     console.log("🔹 POST URL:", url);
//     console.log("📦 Request Data:", data);

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     console.log("📥 Raw Response:", response);

//     if (!response.ok) {
//       const errText = await response.text();
//       console.error("❌ Server returned error:", response.status, errText);
//       throw new Error(`Failed to POST data (HTTP ${response.status})`);
//     }

//     const json = await response.json();
//     console.log("✅ JSON Response:", json);
//     return json;
//   } catch (error) {
//     console.error("🚨 POST request failed:", error);
//     throw error;
//   }
// };
