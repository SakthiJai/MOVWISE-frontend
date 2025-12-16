import Head from "next/head";
import Navbar from "../parts/navbar/page";
import Footer from "../parts/Footer/footer";
import ActivateClient from "../activate/activate";
import { Suspense } from "react";

export default function ActivatePage() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Account Activation</title>
      </Head>

      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <main className="p-6 sm:p-12">
          <Suspense fallback={<div>Loading activation status...</div>}>
            <ActivateClient />
          </Suspense>
        </main>
      </div>

      <Footer />
    </div>
  );
}
