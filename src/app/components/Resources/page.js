"use client";
import { Lightbulb, Users, Handshake, Globe } from "lucide-react";
import Head from "next/head";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from '../../parts/Footer/footer';


const values = [
  {
    title: "Transparency",
    description:
      "In every quote and communication, ensuring clarity and trust in the conveyancing process.",
    icon: Lightbulb,
    color: "text-blue-600",
  },
  {
    title: "Inclusivity",
    description:
      "Through multilingual accessibility, making essential UK conveyancing services available to everyone.",
    icon: Globe,
    color: "text-emerald-600",
  },
  {
    title: "Innovation",
    description:
      "In client-conveyancer connections, leveraging technology for a seamless, digital experience.",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Partnership",
    description:
      "With regulated legal experts, ensuring all advice and service is high-quality and reliable.",
    icon: Handshake,
    color: "text-amber-600",
  },
];

export default function ResourcePage() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Compare Conveyancing Quotes & Move with Confidence</title>
      </Head>

      {/* Navbar */}
      <div className="bg-white shadow-md sticky top-0 p-4 z-50">
        <Navbar originalstyle={true} />
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
        <section className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">📚</span> Glossary of Common Conveyancing Terms
          </h1>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
              >
                <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div> */}
        </section>

        {/* 📝 Summary Note Section */}
        <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center mb-10 border-t-4 border-amber-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Abstract of Title
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
           A summary of the ownership history and documents proving ownership of a property.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Completion Date
          </h2>
          <p className="text-gray-600 leading-relaxed">
           The day when ownership officially transfers from seller to buyer, and funds are exchanged.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Contract for Sale
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          The legal document that binds both parties to the transaction once exchanged.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Conveyance
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
           The legal document that transfers property ownership from seller to buyer.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Covenant
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          A rule or promise in the property deeds that you must keep (e.g., not to run a business from the property).
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Disbursements
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Third-party costs your solicitor pays on your behalf (searches, Land Registry fees).
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Estate Agent
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
           A person or company that helps sell your property and find buyers.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Exchange of Contracts
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          When both parties sign and swap contracts, making the property sale legally binding.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Freehold
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
           You own both the property and the land it stands on outright.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Gazumping
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          When a seller accepts a higher offer after already accepting yours.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ground Rent
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Annual payment to the freeholder (for leasehold properties only).
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Land Registry
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          The government department that records property ownership in England and Wales.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Leasehold
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          You own the property but not the land, for a fixed number of years.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mortgage Deed
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          The legal document that gives your lender security over your property.
          </p><h2 className="text-2xl font-bold text-gray-800 mb-4">
          Redemption Statement
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          A document from your lender showing how much you need to pay to clear your mortgage.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Remortgage
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Switching your mortgage to a new lender or deal, usually to get better rates.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Searches
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Checks your solicitor does to uncover issues with the property or local area.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           Stamp Duty Land Tax (SDLT)
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Tax paid to the government when buying a property over certain price thresholds.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Title Deeds
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Legal documents proving who owns a property and any restrictions on it.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transfer Deed
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          The document that legally transfers ownership from seller to buyer.
          </p>
        </section>



        <section className="max-w-6xl mx-auto text-center mb-10">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">🔍</span>  Property Search Types Explained
          </h2>
         <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Local Authority Search
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Reveals planning permissions, road schemes, and development plans affecting the property.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Environmental Search
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Checks for flood risk, contaminated land, and ground stability issues.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Water and Drainage Search
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Confirms the property's connection to mains water and sewerage systems.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
         Chancel Repair Search
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Checks if you might be liable for church repair costs (a historic law).
          </p>
        </section></section>


                <section className="max-w-6xl mx-auto text-center mb-10">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">📋</span> Common Document Types
          </h2>
         <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Memorandum of Sale
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
         The document confirming the basic agreed terms between buyer and seller.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Property Information Form (TA6)
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Completed by the seller, detailing boundaries, disputes, and guarantees.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Fixtures and Fittings Form (TA10)
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Lists what items are included or excluded from the sale price.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
         Leasehold Information Form (TA7)
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          For leasehold properties, detailing service charges and management.
          </p>
        </section></section>
      </div>



       <section className="max-w-6xl mx-auto text-center mb-16">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">💷</span> Understanding Your Quote
          </h2>
          <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-violet-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Legal Fees
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
         Your solicitor's charges for handling the legal work.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Disbursements
          </h2><>
          <p className="text-gray-600  leading-relaxed mb-4">
          Third-party costs including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            
            <li>Bank transfer fees (£25-£50)</li>
            <li>Land Registry fees (£20-£910)</li>
            <li>Local search fees (£250-£400)</li>
            <li>Identity verification (£6-£15 per person)</li>
          </ul>
          </>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          SDLT Calculator
          </h2>
       
                <p className="text-gray-600 italic text-lg leading-relaxed mb-4">
                  &ldquo;We show you exactly what you're paying for, why it costs that much, and who you're paying it to.&rdquo;
                </p>
          </section>
          </section>

        <section className="max-w-6xl mx-auto text-center mb-10">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">⚠️</span> Warning Signs to Watch For
          </h2>
         <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Restrictive Covenants
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
         Rules limiting how you can use the property (e.g., no extensions, business use).
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Flying Freeholds
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          When part of your property extends over or under a neighbour's.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Rights of Way
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Others may have legal rights to access parts of your property.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
         Indemnity Policies
          </h2>
          <p className="text-gray-600  leading-relaxed mb-4">
          Insurance that protects against certain legal risks with the property.
          </p>
        </section></section>

       <section className="max-w-6xl mx-auto text-center mb-16">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">🌐</span> Regional Differences
          </h2>
          <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          England & Wales
          </h2><>
          
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            <li>SDLT applies to purchases</li>
            <li>Conveyancing handled by solicitors or licensed conveyancers</li>
          </ul>
          </>
           <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Scotland
          </h2><>
          
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            
            <li>System called "missives"</li>
            <li>Different search requirements</li>
            <li>Land and Buildings Transaction Tax instead of SDLT</li>
          </ul>
          </>
           <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Northern Ireland
          </h2><>
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            <li>Similar to England but with some procedural differences</li>
          </ul>
          </>
          </section>
          </section>

          <section className="max-w-6xl mx-auto text-center mb-16">
         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">🆘</span>  Quick Help Guide
          </h2>
          <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-center border-t-4 border-red-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Before You Start
          </h2><>
          
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            <li>Know your timeline for moving</li>
            <li>Have your mortgage agreement in principle ready</li>
            <li>Gather ID documents (passport, driving licence, utility bills)</li>
          </ul>
          </>
           <h2 className="text-2xl font-bold text-gray-800 mb-4">
          During the Process
          </h2><>
          
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            <li>Keep all documents organised</li>
            <li>Don't make major financial changes</li>
            <li>Respond quickly to solicitor requests</li>
          </ul>
          </>
           <h2 className="text-2xl font-bold text-gray-800 mb-4">
          At Completion
          </h2><>
          <ul className="list-disc list-inside space-y-1 text-gray-600  leading-relaxed mb-4" >
            <li>Ensure funds are cleared</li>
            <li>Confirm key collection arrangements</li>
            <li>Arrange building insurance from completion day</li>
          </ul>
          </>
          </section>
          </section>

           <Footer/>
    
    </div>
  );
}
