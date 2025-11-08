// ✅ Base URL for your backend
const BASE_URL = "http://movwiseadmin.digitalcloudies.co.in/api";


// ✅ Example: central place for all API endpoints
export const API_ENDPOINTS = {
  conveyancingQuotes: `${BASE_URL}/conveyancing-quotes`,
  users: `${BASE_URL}/users`,
  lenders: `${BASE_URL}/lenders`,
  register: `${BASE_URL}/register`
  // add more endpoints here
};


export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};


export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to POST data");
    return await response.json();
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};
