import Head from "next/head";
import { Suspense } from "react";
import ForgetPassword from "./forgetpassword";

import Footer from "../parts/Footer/footer.js";
import Navbar from "../parts/navbar/page.js";

export default function Forgetpassword() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Forget Password</title>
      </Head>

      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <main className="p-6 sm:p-12">
          <Suspense fallback={<div>Loading...</div>}>
            <ForgetPassword />
          </Suspense>
        </main>
      </div>

      <Footer />
    </div>
  );
}
