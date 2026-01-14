import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Hand } from "lucide-react";

export default function Signinmodal({ closeModal,partnerloginshow }) {
  const router = useRouter();
  // console.log(page)
  const [loginformshow, setloginformshow] = useState(false);
  const [loginformdata, setloginformdata] = useState({
    email: "",
    password: "",
    type: "",
  });
  const [logintype, setlogintype] = useState();
  const [guestformshow, setguestformshow] = useState(false);
  const [guestformsdata, setguestformsdata] = useState({
    guest_email: "",
    firstname: "",
    lastname:"",
    guest_phonenumber: "",
  });

  const [loginError, setLoginError] = useState("");
const [formErrors, setFormErrors] = useState({});

const validateLoginForm = () => {
  const errors = {};

  if (!loginformdata.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginformdata.email)) {
    errors.email = "Invalid email address";
  }

  // if (!loginformdata.password) {
  //   errors.password = "Password is required";
  // } else if (loginformdata.password.length < 6) {
  //   errors.password = "Password must be at least 6 characters";
  // }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
const validateGuestForm = () => {
  const errors = {};

  if (!guestformsdata.firstname?.trim()) {
    errors.firstname = "first name is required";
  }

  if (!guestformsdata.guest_email) {
    errors.guest_email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestformsdata.guest_email)) {
    errors.guest_email = "Invalid email address";
  }

  if (!guestformsdata.guest_phonenumber) {
    errors.guest_phonenumber = "Phone number is required";
  } 
  // else if (!/^\d{10}$/.test(guestformsdata.guest_phonenumber)) {
  //   errors.guest_phonenumber = "Phone number must be 10 digits";
  // }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


  const [modalopen, setModalopen] = useState(false);
  const [formData, setFormData] = useState({
    stages: "",
    address: "",
    address_line1: "",
    address_line2: "",
    country: "",
    town_city: "",
    sales_price: "",
    no_of_bedrooms: "",
    leasehold_or_free: "",
    property_type: "",
    shared_ownership: "",
    existing_mortgage: "1",
    languages: "",
    specal_instruction: "",
    lender: "",
    type_id: 1,
  });

  function handleloginformchange(name, value) {
    setloginformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors(prev => ({ ...prev, [name]: "" }));
  }
  function handleguestformchange(name, value) {
    console.log(value,name);
    if(name=="guest_phonenumber"){
      console.log("guestcheck");
      setguestformsdata((prev)=>(
        {
          ...prev,
          [name]:Number(value)
        }
      ))
    }
    else{
      console.log("other guest check")
    setguestformsdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors(prev => ({ ...prev, [name]: "" }));
  }}
   async function logindata() {


    console.log(logintype);

    if (!logintype) {
      setLoginError("Please select a login type");
      return;
    }

    localStorage.setItem("logintype", logintype);

    console.log("check");
    try {
      let data = JSON.parse(localStorage.getItem("getquote") || "{}");
      
      const dataToSubmit = {
        ...loginformdata,
        type: logintype,
      };

    console.log("loginformdata:", dataToSubmit);

      const loginResponse = await postData(API_ENDPOINTS.login, dataToSubmit);
      console.log("Login response:", loginResponse);

      if (loginResponse.code === 200) {
        const userId = loginResponse.user?.id; // <-- get it from API response
        console.log(userId);
        console.log("userId type:", typeof userId);
        
        localStorage.setItem("user", userId);
        console.log(Number(localStorage.getItem("service")));

        if (
          Number(localStorage.getItem("service")) > 0 ||
          localStorage.getItem("user")
        ) {
          ///remove the conditon using user
          if (userId && Object.keys(data).length !== 0) {
            data.user_id = userId;
            data.service_type = Number(localStorage.getItem("service"));
            data.guest_email = null;
            data.guest_name = null;
            data.guest_phonenumber = null;
            data.guest_user = null;

            console.log("service", data.service_type);
            localStorage.setItem("getquote", JSON.stringify(data));
            router.push("/components/comparequotes");
          } else {
            closeModal();
            router.push("/#quote_type");
          }
          //router.push("/components/comparequotes");
        } else {
          router.push("/#quote_type");
        }
      }
      else  if (loginResponse.status === false)
      {
         setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error("Error logging in:", error);
    }
  }
async function createguestuser() {
  try {
    // 1️⃣ Validate guest form
    if (!validateGuestForm()) return;

    // 2️⃣ Read existing quote
    let quoteData = JSON.parse(localStorage.getItem("getquote") || "{}");

    // 3️⃣ Create guest in backend
    const guest_uuid = uuidv4();
    const payload = {
      firstname: guestformsdata.firstname,
      lastname:guestformsdata.lastname,
      email: guestformsdata.guest_email,
      phone_number: guestformsdata.guest_phonenumber,
      guest_uuid: guest_uuid,
    };
    console.log(payload)
    const response =  await postData(
            `${API_ENDPOINTS.addguest}`,
            payload
          );
   

    const result = await response;

    if (result.code !== 200) {
      setLoginError(result.message || "Failed to create guest user");
      return;
    }

    // 4️⃣ Generate UUID (FRONTEND ONLY)
   

    // 5️⃣ Build quote object (LOGIN-LIKE)
    const updatedQuote = {
      ...quoteData,
      guest_user: guest_uuid, // ✅ numeric DB ID
      guest_name: result.data.name,
      guest_email: result.data.email,
      guest_phonenumber: result.data.phone_number,
      user_id: null,
      service_type: 2,
    };

    // 6️⃣ Store everything safely
    localStorage.setItem("getquote", JSON.stringify(updatedQuote));
    localStorage.setItem("guest_uuid", guest_uuid); // ✅ UUID stored safely
    localStorage.setItem("logintype", "guest");

    // 7️⃣ Redirect
    router.push("/components/comparequotes");

  } catch (error) {
    console.error("Guest login failed:", error);
    setLoginError("Something went wrong. Please try again.");
  }
}



  const quoteData = localStorage.getItem("service");
  const isEmptyQuote = quoteData?true:false;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl h-[500px] md:h-auto grid grid-cols-1 md:grid-cols-[35%_65%] animate-scale-in relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
        >
          X
        </button>
        {/* LEFT SIDE (Brand Section - 35%) */}
        <div className="text-center bg-gradient-to-br from-[#1E5C3B] to-green-600 text-white flex flex-col justify-between items-center md:items-start p-8">
          <div className="mt-12">
            <h2 className="text-4xl font-extrabold tracking-wide mb-2">
              MOVWISE
            </h2>
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
        {!loginformshow && !guestformshow && (
          <div className="relative p-8 flex flex-col justify-center text-center md:text-left">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
            >
              X
            </button>

            
          <div className="text-gray-600 mb-8 leading-relaxed">
            {isEmptyQuote ? (
              <>
                You’re about to submit your <b>Property Details</b>. Would you
                like to continue as a <b>logged-in user</b> or a <b>guest user</b>?
              </>
            ) : (
                            <><h2 className="text-2xl font-bold text-[#1E5C3B] mb-6 text-center">Access your account or Register a new one to proceed.</h2></>

            )}
          </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button
                className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
                onClick={() => {
                  setloginformshow(true);
                  setlogintype("user");
                  setLoginError(false);
                }}
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setguestformshow(true);
                  setLoginError(false);
                }}
                className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
              >
                Guest User
              </button>
            </div>

            <div className="grid grid-cols-1  gap-6 mt-5  mx-auto">
        {partnerloginshow&&(
           <button
                className="ml-6 inline-flex items-center justify-center h-[44px] px-6 rounded-full bg-[#F8C537] font-extrabold shadow-[0_2px_0_rgba(0,0,0,0.06)] hover:bg-[#ffd954] transition"
                onClick={() => {
                  setloginformshow(true);
                  setlogintype("partner");
                  setLoginError(false);
                }}
              >
                Partner Login
              </button>
        )}     
            </div>
          </div>
        )}

        {/* LOGIN FORM */}
        {loginformshow && (
          <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-6">
            <form
            noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setLoginError("");
                if (validateLoginForm()) {
                  logindata();
                }
              }}
              className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200"
            >
             <h2 className="text-2xl font-bold text-[#1E5C3B] mb-6 text-center flex items-center justify-center gap-2">
                User / Partner Login <Hand className="w-6 h-6 text-yellow-400" />
              </h2>

              {loginError && (
                  <p className="text-red-600 text-sm font-medium text-center mb-4">
                      {loginError}
                  </p>
              )}
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
                  
                  placeholder="Enter your email"
                  value={loginformdata.email || ""}
                  onChange={(e) =>
                    handleloginformchange("email", e.target.value)
                  }
                  className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
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
                  
                  placeholder="Enter your password"
                  value={loginformdata.password || ""}
                  onChange={(e) =>
                    handleloginformchange("password", e.target.value)
                  }
                  autoComplete="current-password"
                  className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1E5C3B] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setloginformshow(false);
                  setguestformshow(false);
                  setLoginError(false);

                  setloginformdata({
                    email: "",
                    password: "",
                    type: "",
                  });

                  setFormErrors({});
                  setLoginError("");
                }}
                className="mt-1 w-full bg-[#ffd954] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                Back
              </button>
            </form>
          </div>
        )}

        {guestformshow && (
          <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-6">
            <form
            noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setLoginError("");
                if (validateGuestForm()) {
                  createguestuser();
                }
              }}
              className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-bold text-[#1E5C3B] mb-6 text-center">
                Guest Users Please Fill Below Details
              </h2>

              {loginError && (
                  <p className="text-red-600 text-sm font-medium text-center mb-4">
                      {loginError}
                  </p>
              )}
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="Name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="Name"
                  name="guest_name"
                  type="text"
                  
                  placeholder="Enter your Name"
                  value={guestformsdata.firstname || ""}
                  onChange={(e) =>
                    handleguestformchange("firstname", e.target.value)
                  }
                  autoComplete="current-password"
                  className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.firstname && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.firstname}</p>
                )}
              </div>
              <label
                  htmlFor="Name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="Name"
                  name="guest_name"
                  type="text"
                  
                  placeholder="Enter your Name"
                  value={guestformsdata.lastname || ""}
                  onChange={(e) =>
                    handleguestformchange("lastname", e.target.value)
                  }
                  autoComplete="current-password"
                  className="block w-full h-[44px] mb-4 rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="guest_email"
                  type="email"
                  
                  placeholder="Enter your email"
                  value={guestformsdata.guest_email || ""}
                  onChange={(e) =>
                    handleguestformchange("guest_email", e.target.value)
                  }
                  className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.guest_email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.guest_email}</p>
                )}
              </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                <input
                  type="text"
                  name="guest_phonenumber"
                  maxLength={10}
                  inputMode="numeric"
                  
                  placeholder="Enter your phone number"
                  value={guestformsdata.guest_phonenumber || ""}
                  onChange={(e) => {
                    const value = Number( e.target.value);

                    // Allow only numbers
                    if (/^\d*$/.test(value)) {
                      handleguestformchange("guest_phonenumber", value);
                    }
                  }}
                  className="block w-full h-[44px] rounded-lg border border-gray-300 px-3 
                    text-[14px] text-gray-800 placeholder-gray-400 
                    focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] 
                    outline-none transition-all"
                />
                {formErrors.guest_phonenumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.guest_phonenumber}
                  </p>
                )}
                </div>

              {/* Password */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1E5C3B] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                Proceed
              </button>
              <button
                type="button"
                onClick={() => {
                  setloginformshow(false);
                  setguestformshow(false);

                  setguestformsdata({
                    guest_email: "",
                    guest_name: "",
                    guest_phonenumber: "",
                  });

                  setFormErrors({});
                  setLoginError("");
                              }}
                className="mt-1 w-full bg-[#ffd954] text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105"
              >
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
