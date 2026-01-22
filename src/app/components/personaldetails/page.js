"use client";
import Link from "next/link";
import Navbar from "../../parts/navbar/page"; // app/personal-details/page.js
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../.././constants/config";
import { API_ENDPOINTS, getData, postData } from "../../auth/API/api";
import { useState, useEffect } from "react";
import Footer from "../../parts/Footer/footer";

export default function Personaldetails() {
  const router = useRouter();

  const [formdata, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [phoneError, setPhoneError] = useState("");

  const [user, setuser] = useState();

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUKPhone = (number) => {
    const ukPattern = /^(07\d{9}|(\+44)7\d{9})$/;
    return ukPattern.test(number);
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleNameChange = (key, value) => {
    // Remove numbers & special characters — allow only letters & space
    let cleaned = value.replace(/[^a-zA-Z ]/g, "");

    // Convert to camel case
    cleaned = cleaned
      .split(" ")
      .map((word, index) => {
        if (!word) return "";
        return index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.toLowerCase();
      })
      .join("");

    setFormData((prev) => ({
      ...prev,
      [key]: cleaned,
    }));
  };

  async function handlesubmit() {
    // Reset previous errors
    const newErrors = {};

    // REQUIRED FIELD VALIDATION
    if (!formdata.first_name || formdata.first_name.trim() === "") {
      newErrors.first_name = "First name is required";
    }

    if (!formdata.last_name || formdata.last_name.trim() === "") {
      newErrors.last_name = "Last name is required";
    }

    if (!formdata.email || formdata.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formdata.email)) {
      newErrors.email = "Enter a valid email address";
    }

// Phone
if (!formdata.phone_number || formdata.phone_number.trim() === "") {
  newErrors.phone_number = "Phone number is required";
  setPhoneError("Phone number is required"); // update your existing phoneError state
} else if (!/^(?:0[1-9]\d{8,9})$/.test(formdata.phone_number)) {
  // UK numbers: start with 0 + 9 or 10 digits (mobile, landline, special)
  newErrors.phone_number = "Enter a valid UK phone number";
  setPhoneError("Enter a valid UK phone number");
} else {
  setPhoneError(""); // clear phoneError if valid
}


    // Password validation
    if (!formdata.password || formdata.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // IF ANY ERROR, STOP SUBMIT
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ If no errors, proceed with existing submit logic
    console.log("Form Data:", formdata);

    const response = await postData(API_ENDPOINTS.register, formdata);
    console.log("REGISTER API Response:", response);

    if (!response) return;

    const status = response.status;
    const code = response.code;

    if (status === 0 || code === 0) {
      emailsetPopupMessage("Please check your email for activation.");
      emailsetShowPopup(true);
      setShouldRedirect(false);
      return;
    }

    if (status === true || status === 1 || code === 201) {
      setPopupMessage(
        "Your Account has been registered successfully. Please check your email and activate your account."
      );
      setShowPopup(true);
      setShouldRedirect(true);
      localStorage.setItem("loginshow", "true");
      return;
    }

    emailsetPopupMessage("Something went wrong. Please try again.");
    emailsetShowPopup(true);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [emailshowPopup, emailsetShowPopup] = useState(false);
  const [emailpopupMessage, emailsetPopupMessage] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!showPopup && shouldRedirect) {
      router.back();
    }
  }, [showPopup, shouldRedirect, router]);

  async function register() {
    try {
      const response = await postData(API_ENDPOINTS.register, formdata);
      console.log("Register API Response:", response);

      // ✅ Access code & user from response directly (no `.data`)
      if (response.code === 201) {
        const userId = response.user?.id;
        console.log("🧩 Extracted userId:", userId);

        if (userId) {
          // ✅ Get existing getquote data
          const quotesdata = JSON.parse(
            localStorage.getItem("getquote") || "{}"
          );

          // ✅ Merge user_id into that data
          const updatedForm = {
            ...quotesdata,
            user_id: userId,
          };

          // ✅ Update React state and localStorage
          setFormData(updatedForm);
          localStorage.setItem("getquote", JSON.stringify(updatedForm));
        }

        // ✅ Navigate after saving
        router.push("/components/comparequotes");
      } else {
        console.warn("⚠️ Registration did not return code 201:", response);
      }
    } catch (error) {
      console.error("🚨 Error fetching quotes:", error);
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-white antialiased font">
        {/* Top bar */}

        <div className="bg-white shadow-md sticky top-0 p-4">
          <Navbar originalstyle={true} />
        </div>

        {/* Body */}
        <main className="mx-auto max-w-[1200px] pt-10">
          <div className="flex gap-12 mt-24">
            {/* Left rail: stepper panel */}
           <aside
              className="
                relative 
                w-[400px]
                rounded-[40px] 
                overflow-hidden 
                hidden md:block
                bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)]
                shadow-[inset_0_1px_0_rgba(0,0,0,0.03)]
              "
            >
              {/* Step Indicator */}
              <div className="absolute inset-0 p-8">
                <div className="flex items-start">
                  <div className="relative mr-4">
                    <div className="w-11 h-11 rounded-full border-[2px] border-[#1E5C3B] bg-white flex items-center justify-center text-[#1E5C3B]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="10" cy="10" r="3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="text-[12px] font-semibold pesonaldetails-steps font-gilroy">
                      STEP 1
                    </div>
                    <div className="font-outfit text-[20px] text-gray-900 font-semibold">
                      Personal Details
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative wave */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[45%]"
                style={{
                  background:
                    "radial-gradient(120% 80% at 0% 100%, rgba(178,196,160,0.45) 0%, rgba(178,196,160,0.25) 35%, transparent 70%)",
                }}
              />
            </aside>


            {/* Right: form card and actions */}
            <section className="flex-1">
              {/* Card */}
              <div className="rounded-[18px] border border-[#f2eded] shadow-[0_6px_24px_rgba(16,24,40,0.04)] bg-white max-w-[900px]">
                <div className="p-8">
                  {/* Breadcrumb */}
                  <nav
                    className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-4"
                    aria-label="Breadcrumb"
                  >
                    <Link href="/" className=" other-page">
                      Home
                    </Link>
                    <span>/</span>
                    <span className="live-page">Personal Details</span>
                  </nav>

                  <h1 className="text-[24px] font-semibold font-Outfit text-[#1B1D21] font">
                    Share your Personal Details
                  </h1>
                  <p className="mt-1 text-[14px] leading-5 text-[#6B7280] font-Outfit font-regular font">
                    By completing this form your details are shared with up to 5
                    firms providing the quotes, but absolutely no one else.
                  </p>

                  <form className="mt-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"
                        >
                          First Name
                        </label>

                        <input
                          id="firstName"
                          name="firstName"
                          value={formdata.first_name}
                          placeholder="Enter your Firstname"
                          onChange={(e) => {
                            const value = e.target.value;

                            // Update formdata using your existing function
                            handleNameChange("first_name", value);

                            // Clear required error if user typed something
                            setErrors((prev) => ({
                              ...prev,
                              first_name: value.trim()
                                ? ""
                                : "First name is required",
                            }));
                          }}
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 font-semibold font"
                        />
                        {errors.first_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.first_name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"
                        >
                          Last Name
                        </label>

                        <input
                          id="lastName"
                          name="lastName"
                          value={formdata.last_name}
                          placeholder="Enter your Lastname"
                          onChange={(e) => {
                            const value = e.target.value;

                            // Update formdata using your existing function
                            handleNameChange("last_name", value);

                            // Clear required error if user typed something
                            setErrors((prev) => ({
                              ...prev,
                              last_name: value.trim()
                                ? ""
                                : "Last name is required",
                            }));
                          }}
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 font-semibold font"
                        />
                        {errors.last_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.last_name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your Email"
                          value={formdata.email || ""}
                          autoComplete="off"
                          onChange={(e) => {
                            const value = e.target.value;

                            // Update form data
                            handleChange("email", value);

                            // If the user entered something, clear the required error
                            setErrors((prev) => ({
                              ...prev,
                              email: value
                                ? validateEmail(value) // keep your existing email validation
                                  ? ""
                                  : "Enter a valid email address"
                                : "Email is required", // show required if empty
                            }));
                          }}
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3
                          text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 
                          font-semibold font"
                        />

                        {/* Error Message */}
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"
                        >
                          Phone No.
                        </label>

                        <div className="relative">
                          <input
                            id="phone"
                            name="phone"
                            placeholder="Enter your Number"
                            value={formdata.phone_number || ""}
                            onChange={(e) => {
                              let value = e.target.value;

                              // Allow only digits
                              if (!/^[0-9]*$/.test(value)) return;

                              // Limit max digits to 11 (common max for UK)
                              if (value.length > 11) return;

                              // Update form data
                              handleChange("phone_number", value);

                              // Validation: required + UK number format
                              if (!value) {
                                setPhoneError("Phone number is required");
                                setErrors((prev) => ({
                                  ...prev,
                                  phone_number: "Phone number is required",
                                }));
                              } else if (!/^(?:0[1-9]\d{8,9})$/.test(value)) {
                                // UK numbers start with 0 followed by 9 or 10 digits
                                setPhoneError("Enter a valid UK phone number");
                                setErrors((prev) => ({
                                  ...prev,
                                  phone_number: "Enter a valid UK phone number",
                                }));
                              } else {
                                setPhoneError("");
                                setErrors((prev) => ({
                                  ...prev,
                                  phone_number: "",
                                }));
                              }
                            }}
                            className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 font-semibold font"
                          />
                        </div>

                        {/* Show either live phoneError or required error */}
                        {(phoneError || errors.phone_number) && (
                          <p className="text-red-600 text-sm mt-1">
                            {phoneError || errors.phone_number}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* ROW 3 */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your Password"
                          autoComplete="new-password"
                          value={formdata.password || ""}
                          onChange={(e) => {
                            const value = e.target.value;

                            // Update form data
                            handleChange("password", value);

                            // Live validation for required + length
                            setErrors((prev) => ({
                              ...prev,
                              password: value
                                ? value.length >= 6
                                  ? "" // valid
                                  : "Password must be at least 6 characters"
                                : "Password is required", // empty
                            }));
                          }}
                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2 font-semibold font"
                        />

                        {errors.password && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Checkbox */}
                    <label className="mt-5 flex items-start gap-3 text-[16px] text-[#1B1D21] font-outfit font-regular">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-[2px] h-[24px] w-[24px] rounded border-[#CDD8C7]  accent-[#4A7C59] font"
                      />
                      <span className="font">
                        Yes, I’d like the moving house checklist emails and tips
                        to make moving easier.
                      </span>
                    </label>
                  </form>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="mt-24 flex justify-end gap-4 max-w-[760px] ">
                <button
                  onClick={() => router.back()}
                  className="font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#1B1D21]"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    handlesubmit();
                  }}
                  className="  font-outfit font-semibold text-[16px] h-[44px] px-8 inline-flex items-center justify-center rounded-full bg-[#1E5C3B] text-[#EDF4EF]"
                >
                  Sign in →
                </button>
              </div>
            </section>
          </div>
          <div>
            {/* {showPopup && (
  <div className="fixed inset-0 bg-[linear-gradient(122.88deg,rgba(74,124,89,0.1)_35.25%,rgba(246,206,83,0.1)_87.6%)] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
      <p className="text-gray-800 font-medium mb-4">{popupMessage}</p>

      <button
        onClick={() => setShowPopup(false)}
        className="bg-[#13815D] text-white px-4 py-2 rounded-md"
      >
        OK
      </button>
    </div>
  </div>
)} */}

            {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[420px] max-w-[90%] animate-popup text-center">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
                  >
                    ×
                  </button>
                  <h2 className="text-[30px] font-extrabold text-[#1E5C3B] mb-4 w-full text-center">
                    MovWise
                  </h2>
                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#13815D] flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="white"
                        className="w-9 h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-6 text-[17px] leading-relaxed cursor-pointer">
                    {popupMessage}
                  </p>
                  <button
                    onClick={() => {
    setShowPopup(false); // close popup
    router.push("/");     // go to home page immediately
  }}
                    
                    className="bg-[#13815D] text-white px-4 py-2 rounded-md"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            {emailshowPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[420px] max-w-[90%] animate-popup text-center">
                  <button
                    onClick={() => emailsetShowPopup(false)}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
                  >
                    ×
                  </button>
                  <h2 className="text-[30px] font-extrabold text-[#1E5C3B] mb-4 w-full text-center">
                    MovWise
                  </h2>
                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#DC2626] flex items-center justify-center shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="white"
                        className="w-9 h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v4m0 4h.01M10.29 3.86l-7.05 12.2A1 1 0 004.1 18h15.8a1 1 0 00.86-1.94l-7.05-12.2a1 1 0 00-1.72 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-6 text-[17px] leading-relaxed cursor-pointer">
                    {emailpopupMessage}
                  </p>
                  <button
                    onClick={() => emailsetShowPopup(false)}
                    className="bg-[#13815D] text-white px-4 py-2 rounded-md"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
