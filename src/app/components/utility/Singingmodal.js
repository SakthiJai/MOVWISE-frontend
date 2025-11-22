import Link from 'next/link';
import React, { useState , useEffect } from 'react'
import { getData,postData,API_ENDPOINTS } from "../../auth/API/api";
import { useRouter } from 'next/navigation';
export default function Signinmodal() {
     const router = useRouter();
     const [loginformshow,setloginformshow]=useState(false);
     const [loginformdata, setloginformdata] = useState({
  email: "",
  password: "",
});
const [modalopen, setModalopen] = useState(false);
  const [formData, setFormData] = useState({
    stages:"",
  address: "",
    address_line1: "",
    address_line2: "",
    country: "",
    town: "",
  sales_price: "",
  no_of_bedrooms: "",
  leasehold_or_free: "", 
  property_type: "",
  shared_ownership: "",
  existing_mortgage:"yes",
  languages:"",
  specal_instruction:"",
  lender:"",  
  type_id:1,
});

function handleloginformchange(name, value) {
  setloginformdata((prev) => ({
    ...prev,
    [name]: value,
  }));
}
async function logindata() {

  try {
    console.log(loginformdata)
    const loginResponse = await postData(API_ENDPOINTS.login, loginformdata);
    console.log("Login response:", loginResponse);

    if (loginResponse.code === 200) {
      const userId = loginResponse.user?.id; // <-- get it from API response
        console.log(userId)
      localStorage.setItem("user",userId);
      if(Number(localStorage.getItem("service"))>0){
        if (userId) {
        let data = JSON.parse(localStorage.getItem("getquote") || "{}")
        data.user_id = userId;
        data.service_type = Number(localStorage.getItem("service"));
        localStorage.setItem("getquote", JSON.stringify(data));
        //router.push("/components/comparequotes");

      }
      router.push("/components/comparequotes");
      }
      else
      {
       router.push("/#quote_type");
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}
    return (

                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl h-[500px] md:h-auto grid grid-cols-1 md:grid-cols-[35%_65%] animate-scale-in relative">
                                        
                                        {/* LEFT SIDE (Brand Section - 35%) */}
                                        <div className="text-center bg-gradient-to-br from-[#1E5C3B] to-green-600 text-white flex flex-col justify-between items-center md:items-start p-8">
                                        <div className="mt-12">
                                            <h2 className="text-4xl font-extrabold tracking-wide mb-2">MOVWISE</h2>
                                            <p className="text-sm opacity-90 leading-relaxed mt-12">
                                            Making property transactions simple, secure, and smart.
                                            </p>
                                        </div>
                                        
                                        <Link
                                            href="/components/personaldetails"
                                            className="mt-8 mx-auto bg-white text-[#1E5C3B] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
                                        >
                                            Sign Up
                                        </Link>
                                        </div>
        
                                        {/* RIGHT SIDE (Content Section - 65%) */}
                                        {!loginformshow && (
                                        <div className="relative p-8 flex flex-col justify-center text-center md:text-left">
                                            {/* Close Button */}
                                            <button
                                            onClick={() => setModalopen(false)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold leading-none"
                                            >
                                            X
                                            </button>
        
                                            <h2 className="text-2xl font-bold text-[#1E5C3B] mb-6 text-center ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition">Confirm Submission</h2>
                                            <p className="text-gray-600 mb-8 leading-relaxed">
                                            You’re about to submit your <b>Property Details</b>.  
                                            Would you like to continue as a <b>logged-in user</b> or a <b>guest user</b>?
                                            </p>
        
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <button
                                        className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
                                        onClick={() => { setloginformshow(true); }}
                                        >
                                        Sign In
                                        </button>
        
                                        <Link
                                        href="/components/comparequotes"
                                        className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
                                        >
                                        Guest User
                                        </Link>
                                    </div>
                                        </div>
                                        )}
        
                                        {/* LOGIN FORM */}
                                        {loginformshow && (
                                        <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-6">
                                            <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                logindata();
                                            }}
                                            className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200"
                                            >
                                                
                                            <h2 className="text-2xl font-bold text-[#1E5C3B] mb-6 text-center">
                                                Login 👋
                                            </h2>
        
                                            {/* Email */}
                                            <div className="mb-5">
                                                <label
                                                htmlFor="email"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                Email Address
                                                </label>
                                                <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                value={loginformdata.email || ""}
                                                onChange={(e) => handleloginformchange("email", e.target.value)}
                                                className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                                                />
                                            </div>
        
                                            {/* Password */}
                                            <div className="mb-6">
                                                <label
                                                htmlFor="password"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                Password
                                                </label>
                                                <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                placeholder="Enter your password"
                                                value={loginformdata.password || ""}
                                                onChange={(e) => handleloginformchange("password", e.target.value)}
                                                autoComplete="current-password"
                                                className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                                                />
                                            </div>
        
                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="w-full bg-[#1E5C3B] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
                                            >
                                                Login
                                            </button>
                                            </form>
                                        </div>
                                        )}
                                    </div>
                                </div>
    )
}