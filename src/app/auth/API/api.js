// ✅ Base URL for your backend
const BASE_URL = "https://movwiseadmin.digitalcloudies.co.in/api";


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
    service:`${BASE_URL}/create-services`,
    quotesfilter:`${BASE_URL}/quotes/filter`,
    compareQuotes:`${BASE_URL}/compare-quotes`,
    languages:`${BASE_URL}/languages`,
    partnerfilter:`${BASE_URL}/partnerfilter`,
    feecatgory:`${BASE_URL}/feecategory`,
    feetype:`${BASE_URL}/feetype`,
    insertcompanydetail:`${BASE_URL}/insertcompanydetail`,
    region:`${BASE_URL}/regions`,
      services:`${BASE_URL}/services`


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
