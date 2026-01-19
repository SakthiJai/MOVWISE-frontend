'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {API_BASE_URL} from "../constants/config"
import { API_ENDPOINTS, postData } from "../auth/API/api";


export default function ForgetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // usually reset token comes via email link
  const refno = searchParams.get("ref"); 
  console.log("Reset token:", refno); 
    const user_id = searchParams.get("userId"); 
  console.log("Reset user_id:", user_id); 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  const PrimaryCTA = ({ text, href = "#" }) => (
  <Link href={href}>
    <button className="text-emerald-700 hover:underline">
      {text} →
    </button>
  </Link>
);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!refno) {
    setError("Invalid or expired reset link");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const result = await postData(API_ENDPOINTS.resetpassword, {
      ref_no: refno,
      password: password,
    });

  
if (!result?.status) {
  throw new Error(result?.message || "Password reset failed");
}


setSuccess("Password updated successfully");
setError("");
setShowPopup(true);

// setTimeout(() => setShowPopup(false), 3000);

  } catch (err) {
    setError(err.message);
    setSuccess("");
  } finally {
    setLoading(false);
  }
};



  return (
    <section className="py-16 bg-white">
      <div className="max-w-md mx-auto p-8 rounded-xl border shadow-lg">
        <div className="text-center mb-6">
          <span className="text-[34px] font-extrabold text-[#1E5C3B]">
            MovWise
          </span>
          <h2 className="text-xl font-semibold mt-2 text-emerald-800">
            Reset Your Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-700 font-medium mb-2">New Password</label>  
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 rounded-lg border text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block text-gray-700 font-medium mb-2">Confirm Password </label>  
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg border text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-emerald-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow transition duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
      <p className="text-gray-600 mb-6">
       Your password has been updated successfully!
      </p>
      <button
        onClick={() => {
          setShowPopup(false);
          router.push("/");
        }}
        className="px-6 py-2 bg-[#1E5C3B] text-white font-semibold rounded-lg hover:bg-green-700"
      >
        OK
      </button>
    </div>
  </div>
)}

        </form>

        <div className="text-center mt-4">
             <PrimaryCTA text="Back to Login" href={API_BASE_URL} />
        </div>
      </div>
    </section>
  );
}