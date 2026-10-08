
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { postData, API_ENDPOINTS } from "../../auth/API/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Hand } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../parts/navbar/page";
import Footer from "../../parts/Footer/footer";
export default function SigninPage() {
  const router = useRouter();

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
    lastname: "",
    guest_phonenumber: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [forgotPasswordShow, setForgotPasswordShow] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const type = 1; // default type - adjust as needed

  // ---- Validation ----
  const validateLoginForm = () => {
    const errors = {};
    if (!loginformdata.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginformdata.email)) {
      errors.email = "Invalid email address";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateGuestForm = () => {
    const errors = {};
    if (!guestformsdata.firstname?.trim()) {
      errors.firstname = "First name is required";
    }
    if (!guestformsdata.lastname?.trim()) {
      errors.lastname = "Last name is Required";
    }
    if (!guestformsdata.guest_email) {
      errors.guest_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestformsdata.guest_email)) {
      errors.guest_email = "Invalid email address";
    }
    if (!guestformsdata.guest_phonenumber) {
      errors.guest_phonenumber = "Phone number is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ---- Handlers ----
  function handleloginformchange(name, value) {
    setloginformdata((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleguestformchange(name, value) {
    setguestformsdata((prev) => ({ ...prev, [name]: value }));
  }

  // ---- Login ----
  async function logindata() {
    if (!logintype) {
      setLoginError("Please select a login type");
      return;
    }

    localStorage.setItem("logintype", logintype);

    try {
      let data = JSON.parse(localStorage.getItem("getquote") || "{}");

      const dataToSubmit = {
        ...loginformdata,
        type: logintype,
      };

      const loginResponse = await postData(API_ENDPOINTS.login, dataToSubmit);

      if (loginResponse.code === 200) {
        const userId = loginResponse.user?.id;
        localStorage.setItem("user", userId);

        if (
          Number(localStorage.getItem("service")) > 0 ||
          localStorage.getItem("user")
        ) {
          if (userId && Object.keys(data).length !== 0) {
            data.user_id = userId;
            data.service_type = Number(localStorage.getItem("service"));
            data.guest_email = null;
            data.guest_name = null;
            data.guest_phonenumber = null;
            data.guest_user = null;

            localStorage.setItem("getquote", JSON.stringify(data));
            router.push("/components/comparequotes");
          } else {
            if (logintype === "partner") {
              router.push("/components/account/");
            } else {
              router.push("/components/profile/");
            }
          }
        } else {
          router.push("/components/profile/");
        }
      } else if (loginResponse.status === false) {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error("Error logging in:", error);
    }
  }

  // ---- Forgot Password ----
  const forgotPasswordApiCall = async () => {
    try {
      setForgotError("");
      setForgotLoading(true);

      const response = await postData(API_ENDPOINTS.forgetpassword, {
        email: forgotEmail,
      });

      if (response.code === 200) {
        setShowSuccessPopup(true);
        setForgotEmail("");
      } else {
        setForgotError(response.message || "Email not found");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setForgotError("Something went wrong. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // ---- Guest User ----
  async function createguestuser() {
    try {
      if (!validateGuestForm()) return;

      let quoteData = JSON.parse(localStorage.getItem("getquote") || "{}");

      const guest_uuid = uuidv4();
      const payload = {
        firstname: guestformsdata.firstname,
        lastname: guestformsdata.lastname,
        email: guestformsdata.guest_email,
        phone_number: guestformsdata.guest_phonenumber,
        guest_uuid: guest_uuid,
        type: type,
      };

      const response = await postData(`${API_ENDPOINTS.addguest}`, payload);
      const result = await response;

      if (result.code !== 200) {
        setLoginError(result.message || "Failed to create guest user");
        return;
      }

      const updatedQuote = {
        ...quoteData,
        guest_user: guest_uuid,
        guest_name: result.data.name,
        guest_email: result.data.email,
        guest_phonenumber: result.data.phone_number,
        user_id: null,
        service_type:
          quoteData?.service_type ||
          Number(localStorage.getItem("service")) ||
          2,
      };

      localStorage.setItem("getquote", JSON.stringify(updatedQuote));
      localStorage.setItem("guest_uuid", guest_uuid);
      localStorage.setItem("logintype", "guest");

      router.push("/components/comparequotes");
    } catch (error) {
      console.error("Guest login failed:", error);
      setLoginError("Something went wrong. Please try again.");
    }
  }

  return (

     <div className="font">
      <Head>
        <title>
          MovWise | Compare Conveyancing Quotes &amp; Move with Confidence
        </title>
      </Head>
         <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>
  <main className="p-6 sm:p-12 space-y-12" style={{ paddingTop: 0 }}>
      <div className="mx-auto grid min-h-[70vh] mt-30 w-full max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-sm md:grid-cols-[35%_65%]">

        {/* LEFT SIDE (Brand Section) */}
        <div className="text-center bg-gradient-to-br from-[#1E5C3B] to-green-600 text-white flex flex-col justify-between items-center md:items-start p-4 md:p-8">
          <div className="mt-8 md:mt-12">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide mb-2">
              MOVWISE
            </h2>
            <p className="text-xs md:text-sm opacity-90 leading-relaxed mt-8 md:mt-12 px-2">
              Making property transactions simple, secure, and smart.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-6 md:mt-8 items-center w-full">
            <button
              className="w-full max-w-[220px] bg-white text-[#1E5C3B] font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 text-sm md:text-base"
              onClick={() => {
                setloginformshow(true);
                setlogintype("user");
                setLoginError("");
                setTermsAccepted(false);
              }}
            >
              User Sign In
            </button>
            <button
              className="w-full max-w-[220px] bg-white text-[#1E5C3B] font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full border border-white hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 text-sm md:text-base"
              onClick={() => {
                setloginformshow(true);
                setlogintype("partner");
                setLoginError("");
                setTermsAccepted(false);
              }}
            >
              Partner Login
            </button>
          </div>
        </div>

        {/* GUEST FORM (default view) */}
        {!loginformshow && !guestformshow && !forgotPasswordShow && (
          <div className="flex justify-center items-center min-h-[60vh] md:min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-4 md:p-6">
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setLoginError("");
                if (validateGuestForm()) createguestuser();
              }}
              className="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#1E5C3B] mb-1 text-center">
                Users Please Fill Below Details
              </h2>

              {loginError && (
                <p className="text-red-600 text-sm font-medium text-center mb-4">
                  {loginError}
                </p>
              )}

              {/* First Name */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Enter your First Name"
                  value={guestformsdata.firstname || ""}
                  onChange={(e) =>
                    handleguestformchange("firstname", e.target.value)
                  }
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.firstname && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstname}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Enter your Last Name"
                  value={guestformsdata.lastname || ""}
                  onChange={(e) =>
                    handleguestformchange("lastname", e.target.value)
                  }
                  className="block w-full h-[40px] md:h-[44px] mb-3 md:mb-4 rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.lastname && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastname}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.guest_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.guest_email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="guest_phonenumber"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="Enter your phone number"
                  value={guestformsdata.guest_phonenumber || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleguestformchange("guest_phonenumber", value);
                    }
                  }}
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.guest_phonenumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.guest_phonenumber}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!termsAccepted}
                className={`w-full font-semibold py-2 md:py-3 rounded-lg transition-all duration-300 shadow-md text-sm md:text-base ${
                  termsAccepted
                    ? "bg-[#1E5C3B] text-white hover:bg-green-700 transform hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Proceed
              </button>

              <div className="mt-3 md:mt-4 flex items-start justify-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-0.5 text-[#1E5C3B] border-gray-300 rounded focus:ring-[#1E5C3B]"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-xs md:text-sm text-gray-600 leading-tight"
                >
                  I agree to MovWise{" "}
                  <Link
                    href="/terms-of-use"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </form>
          </div>
        )}

        {/* FORGOT PASSWORD */}
        {forgotPasswordShow && (
          <div className="flex justify-center items-center min-h-[60vh] md:min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-4 md:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!forgotEmail) {
                  setForgotError("Email is required");
                  return;
                }
                forgotPasswordApiCall();
              }}
              className="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#1E5C3B] mb-4 md:mb-6 text-center">
                Forgot Password
              </h2>

              {forgotError && (
                <p className="text-red-600 text-sm text-center mb-4">
                  {forgotError}
                </p>
              )}

              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={forgotLoading}
                className={`w-full font-semibold py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
                  forgotLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1E5C3B] hover:bg-green-700 text-white"
                }`}
              >
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => setForgotPasswordShow(false)}
                className="mt-2 w-full bg-[#ffd954] text-white font-semibold py-2 md:py-3 rounded-lg text-sm md:text-base"
              >
                Back to Login
              </button>
            </form>
          </div>
        )}

        {/* LOGIN FORM */}
        {!forgotPasswordShow && loginformshow && (
          <div className="flex justify-center items-center min-h-[60vh] md:min-h-[70vh] bg-gray-50 rounded-xl shadow-lg p-4 md:p-6">
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setLoginError("");
                if (validateLoginForm()) logindata();
              }}
              className="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#1E5C3B] mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
                User / Partner Login{" "}
                <Hand className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              </h2>

              {loginError && (
                <p className="text-red-600 text-sm font-medium text-center mb-4">
                  {loginError}
                </p>
              )}

              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className="block w-full h-[40px] md:h-[44px] rounded-lg border border-gray-300 px-3 text-[14px] text-gray-800 placeholder-gray-400 focus:border-[#1E5C3B] focus:ring-2 focus:ring-[#1E5C3B] outline-none transition-all"
                />
              </div>

              <div className="mb-4 md:mb-6 text-right">
                <button
                  type="button"
                  onClick={() => setForgotPasswordShow(true)}
                  className="text-sm font-medium text-[#1E5C3B] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={!termsAccepted}
                className={`w-full font-semibold py-2 md:py-3 rounded-lg transition-all duration-300 shadow-md text-sm md:text-base ${
                  termsAccepted
                    ? "bg-[#1E5C3B] text-white hover:bg-green-700 transform hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setloginformshow(false);
                  setLoginError("");
                  setloginformdata({ email: "", password: "", type: "" });
                  setFormErrors({});
                  setTermsAccepted(false);
                }}
                className="mt-1 w-full bg-[#ffd954] text-white font-semibold py-2 md:py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 text-sm md:text-base"
              >
                Back
              </button>

              <div className="mt-3 md:mt-4 flex items-start justify-center gap-2">
                <input
                  type="checkbox"
                  id="login_terms"
                  className="w-4 h-4 mt-0.5 text-[#1E5C3B] border-gray-300 rounded focus:ring-[#1E5C3B]"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label
                  htmlFor="login_terms"
                  className="text-xs md:text-sm text-gray-600 leading-tight"
                >
                  I agree to MovWise{" "}
                  <Link
                    href="/terms-of-use"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-green-600 underline hover:text-green-700"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </form>
          </div>
        )}

        {/* SUCCESS POPUP */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 max-w-sm w-full text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#1E5C3B] mb-2 md:mb-3">
                Check your email
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                We've sent a password reset link to your email address. Please
                check your inbox or spam folder.
              </p>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  setForgotPasswordShow(false);
                }}
                className="w-full bg-[#1E5C3B] text-white font-semibold py-2 md:py-3 rounded-lg hover:bg-green-700 text-sm md:text-base"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
          <Footer />
    </div>
  );
}