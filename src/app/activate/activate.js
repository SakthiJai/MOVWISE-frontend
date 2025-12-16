'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "../constants/config";

const PrimaryCTA = ({ text, href = "#" }) => (
  <Link href={href}>
    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">
      {text} →
    </button>
  </Link>
);

export default function ActivateClient() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto p-8 rounded-xl border border-emerald-300 bg-emerald-50 shadow-lg text-center">
        <span className="text-[34px] font-extrabold text-[#1E5C3B]">MovWise</span>

        {status === "success" && (
          <>
            <h3 className="text-3xl font-bold text-gray-700 mt-9">
              Thank you for activating your account
            </h3>
            <h4 className="text-2xl text-gray-700 mt-5">Please try to login</h4>
            <div className="mt-12">
              <PrimaryCTA text="Login" href={API_BASE_URL} />
            </div>
          </>
        )}

        {status === "already_active" && (
          <>
            <h3 className="text-3xl font-bold text-gray-700 mt-9">
              Account already activated
            </h3>
            <h4 className="text-2xl text-gray-700 mt-5">Please try to login</h4>
            <div className="mt-12">
              <PrimaryCTA text="Login" href={API_BASE_URL} />
            </div>
          </>
        )}

        {status === "expired" && (
          <>
            <h3 className="text-3xl font-bold text-red-600 mt-9">
              Activation link expired
            </h3>
            <p className="text-gray-600 mt-4">
              This activation link is valid only for 7 days. Please request a new activation email.
            </p>
          </>
        )}

        {status === "error" && (
          <h3 className="text-3xl font-bold text-red-600 mt-9">
            Something went wrong. Please try again later.
          </h3>
        )}
      </div>
    </section>
  );
}
