"use client";
import { Lightbulb, Users, Handshake, Globe } from "lucide-react";
import Head from "next/head";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from '../../parts/Footer/footer';

const about = [
  {
    iconSymbol: "💷",
    titleText: "Understanding Your Quote",
    descriptionItems: [
      {
        heading: "Legal Fees",
        description: [
          "Your solicitor’s charges for handling the legal work.",
        ],
      },
      {
        heading: "Disbursements",
        description: [
          "Third-party costs including:",
          "Bank transfer fees (£25–£50)",
          "Land Registry fees (£20–£910)",
          "Local search fees (£250–£400)",
          "Identity verification (£6–£15 per person).",
        ],
      },
      {
        heading: "SDLT Calculator",
        description: [
          "We show you exactly what you’re paying for, why it costs that much, and who you’re paying it to.",
        ],
      },
    ],
    color: "text-blue-600",
  },
  {
    iconSymbol: "⚠️",
    titleText: "Warning Signs to Watch For",
    descriptionItems: [
      {
        heading: "Restrictive Covenants",
        description: [
          "Rules limiting how you can use the property (e.g., no extensions, business use).",
        ],
      },
      {
        heading: "Flying Freeholds",
        description: [
          "When part of your property extends over or under a neighbour’s.",
        ],
      },
      {
        heading: "Rights of Way",
        description: [
          "Others may have legal rights to access parts of your property.",
        ],
      },
      {
        heading: "Indemnity Policies",
        description: [
          "Insurance that protects against certain legal risks with the property.",
        ],
      },
    ],
    color: "text-blue-600",
  },
   {
    iconSymbol: "🌐",
    titleText: "Regional Differences",
    descriptionItems: [
      {
        heading: "England & Wales",
        description: [
          "SDLT applies to purchases",
          "Conveyancing handled by solicitors or licensed conveyancers",
        ],
      },
      {
        heading: "Scotland",
        description: [
          "System called missives",
          "Different search requirements",
          "Land and Buildings Transaction Tax instead of SDLT",
        ],
      },
      {
        heading: "Northern Ireland",
        description: [
          "Similar to England but with some procedural differences",
        ],
      },
    ],
    color: "text-blue-600",
  },
   {
    iconSymbol: "🆘",
    titleText: "Quick Help Guide",
    descriptionItems: [
      {
        heading: "Before You Start",
        description: [
          "Know your timeline for moving",
          "Have your mortgage agreement in principle ready",
          "Gather ID documents (passport, driving licence, utility bills)",
        ],
      },
      {
        heading: "During the Process",
        description: [
          "Keep all documents organised",
          "Dont make major financial changes",
          "Respond quickly to solicitor requests",
          
        ],
      },
      {
        heading: "At Completion",
        description: [
          "Ensure funds are cleared",
          "Confirm key collection arrangements",
          "Arrange building insurance from completion day",
        ],
      },
    ],
    color: "text-blue-600",
  },
];




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
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 mt-23">
      <main className="p-6 sm:p-12 space-y-12 pt-0" style={{ paddingTop: 0 , paddingBottom: 0 }}>
      <div className="min-h-screen bg-white font-sans p-4 sm:p-8">
        <section className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-800 mb-4">
            <span className="text-2xl">📚</span> Glossary of Common Conveyancing Terms
          </h1>
        </section>

        {/* 📝 Summary Note Section */}
         <section className="py-20 pb-[30px] pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Abstract of Title</summary>
              <p className="mt-2 pl-4 text-gray-700"> A summary of the ownership history and documents proving ownership of a property.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Completion Date</summary>
              <p className="mt-2 pl-4 text-gray-700">The day when ownership officially transfers from seller to buyer, and funds are exchanged.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Contract for Sale</summary>
              <p className="mt-2 pl-4 text-gray-700">The legal document that binds both parties to the transaction once exchanged.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Conveyance</summary>
              <p className="mt-2 pl-4 text-gray-700"> The legal document that transfers property ownership from seller to buyer.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Covenant</summary>
              <p className="mt-2 pl-4 text-gray-700"> A rule or promise in the property deeds that you must keep (e.g., not to run a business from the property).</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Disbursements</summary>
              <p className="mt-2 pl-4 text-gray-700">Third-party costs your solicitor pays on your behalf (searches, Land Registry fees).</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Estate Agent</summary>
              <p className="mt-2 pl-4 text-gray-700"> A person or company that helps sell your property and find buyers.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Exchange of Contracts</summary>
              <p className="mt-2 pl-4 text-gray-700">When both parties sign and swap contracts, making the property sale legally binding.</p>
            </details><details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Freehold</summary>
              <p className="mt-2 pl-4 text-gray-700"> You own both the property and the land it stands on outright.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Gazumping</summary>
              <p className="mt-2 pl-4 text-gray-700">When a seller accepts a higher offer after already accepting yours.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Ground Rent</summary>
              <p className="mt-2 pl-4 text-gray-700">Annual payment to the freeholder (for leasehold properties only).</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Land Registry</summary>
              <p className="mt-2 pl-4 text-gray-700"> The government department that records property ownership in England and Wales.</p>
            </details><details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Leasehold</summary>
              <p className="mt-2 pl-4 text-gray-700"> You own the property but not the land, for a fixed number of years.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Mortgage Deed</summary>
              <p className="mt-2 pl-4 text-gray-700">The legal document that gives your lender security over your property.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Redemption Statement</summary>
              <p className="mt-2 pl-4 text-gray-700">A document from your lender showing how much you need to pay to clear your mortgage.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700"> Remortgage</summary>
              <p className="mt-2 pl-4 text-gray-700">Switching your mortgage to a new lender or deal, usually to get better rates.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Searches</summary>
              <p className="mt-2 pl-4 text-gray-700"> Checks your solicitor does to uncover issues with the property or local area.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Stamp Duty Land Tax (SDLT)</summary>
              <p className="mt-2 pl-4 text-gray-700">Tax paid to the government when buying a property over certain price thresholds.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Title Deeds</summary>
              <p className="mt-2 pl-4 text-gray-700">Legal documents proving who owns a property and any restrictions on it.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Transfer Deed</summary>
              <p className="mt-2 pl-4 text-gray-700">The document that legally transfers ownership from seller to buyer.</p>
            </details>
          </div>
        </div>
      </section>
      



        <section className="max-w-6xl mx-auto text-center mb-10">
         <h2 className="text-3xl sm:text-3xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">🔍</span>  Property Search Types Explained
          </h2> </section>
           <section className="py-20 pb-[30px] pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-6">
            <details className="p-4 rounded-lg bg-[oklch(98.5%_0.002_247.839)] border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Local Authority Search</summary>
              <p className="mt-2 pl-4 text-gray-700"> Reveals planning permissions, road schemes, and development plans affecting the property.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Environmental Search</summary>
              <p className="mt-2 pl-4 text-gray-700">Checks for flood risk, contaminated land, and ground stability issues.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Water and Drainage Search</summary>
              <p className="mt-2 pl-4 text-gray-700"> Confirms the propertys connection to mains water and sewerage systems.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Chancel Repair Search</summary>
              <p className="mt-2 pl-4 text-gray-700"> Checks if you might be liable for church repair costs (a historic law).</p>
            </details>
          </div>
        </div>
      </section>
       


                <section className="max-w-6xl mx-auto text-center mb-10">
         <h2 className="text-3xl sm:text-3xl font-bold text-gray-800 mb-6">
            <span className="text-2xl">📋</span> Common Document Types
          </h2></section>
           <section className="py-20  pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-6">
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Memorandum of Sale</summary>
              <p className="mt-2 pl-4 text-gray-700">The document confirming the basic agreed terms between buyer and seller.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Property Information Form (TA6)</summary>
              <p className="mt-2 pl-4 text-gray-700">Completed by the seller, detailing boundaries, disputes, and guarantees.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Fixtures and Fittings Form (TA10)</summary>
              <p className="mt-2 pl-4 text-gray-700">Lists what items are included or excluded from the sale price.</p>
            </details>
            <details className="p-4 rounded-lg bg-gray-50 border border-gray-200" open>
              <summary className="font-semibold text-lg cursor-pointer text-emerald-700">Leasehold Information Form (TA7)</summary>
              <p className="mt-2 pl-4 text-gray-700">For leasehold properties, detailing service charges and management.</p>
            </details>
          </div>
        </div>
      </section>
<section className="max-w-6xl mx-auto mb-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {about.map((item, index) => (
      <div
        key={index}
         className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"

      >
        <h4
          className={`text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 ${item.color}`}
        >
          <span className="text-1xl">{item.iconSymbol}</span>
          {item.titleText}
        </h4>

        {item.descriptionItems.map((desc, i) => (
          <div key={i} className="mb-6 text-left">
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {desc.heading}
            </h4>

            {/* Render bullet points */}
            {desc.description.length > 1 ? (
              <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1">
                {desc.description.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {desc.description[0]}
              </p>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
</section>
 </div></main></div>
           <Footer/>
    
    </div>
  );
}
