import Head from 'next/head';

import Navbar from '../parts/navbar/page';
import Footer from '../parts/Footer/footer';



// --- Main Page Component ---
export default function Privacy() {
  return (
    <div className='font'>
      <Head>
        <title>MovWise | Property Advice, Moving Guides & Conveyancing Tips</title>
      </Head>

      {/* --- 1. HEADER / NAVIGATION --- */}
      <div className='bg-white shadow-md sticky top-0 p-4 '>
         <Navbar originalstyle={true} />
      </div>
            {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 mt-23">
      <main className="p-6 sm:p-12 space-y-12 pt-0" style={{ paddingTop: 0 , paddingBottom: 0 }}>
      <div className="min-h-screen bg-white font-sans p-4 sm:p-8">
        <section className="max-w-xl mx-auto text-center mb-10">
          <div className="text-center">
  <h1 className="text-3xl sm:text-3xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">

    Terms and Conditions for <a href="https://movwise.com" target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline"> MovWise.com</a>
  </h1>
</div>
</section>
<section className="py-3" >

  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"><strong>Welcome to </strong>{" "} <a href="https://movwise.com" target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline"> MovWise.com</a></p>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> &ldquo;<a href="https://movwise.com" target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline"> MovWise.com</a>&rdquo; is a website owned and operated by <strong>MovWise Ltd</strong> whose registered office is<strong> 128 City Road, London, United Kingdom, EC1V 2NX</strong>. Company registration number is <strong>[Your Company Number]</strong>.</p>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> The terms &ldquo;us&rdquo; or &ldquo;we&rdquo; refer to MovWise Ltd and the term &ldquo;you&rdquo; or &ldquo;your&rdquo; refers to the user or viewer of our website.</p>
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> 1. General </h2>
   <h3 className="text-xl font-bold text-gray-700">1.1 Agreement</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> If you continue to browse and use this website, including submitting your details through the website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern MovWise Ltd&apos;s relationship with you in relation to this website.</p>
   <h3 className="text-xl font-bold text-gray-700">1.2 Non-Acceptance</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you do not agree to these Terms of Use or our Privacy Policy, you are not permitted to access and use this Website and you should cease such access and/or use immediately.</p>
   <h3 className="text-xl font-bold text-gray-700">1.3 Changes to Terms</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> We may change or alter the content of this website and amend these terms and conditions from time to time by updating this page. As these terms are binding on you, please check these terms and note any changes.</p>
   <h3 className="text-xl font-bold text-gray-700">1.4 Website Availability</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We do not guarantee that our site, or any content on it, will always be available or be uninterrupted.</p>
     <h3 className="text-xl font-bold text-gray-700">1.5 Suspension of Service</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We may suspend, withdraw, discontinue or change all or any part of our site without notice. We will not be liable to you if for any reason our site is unavailable at any time or for any period.</p>
   <h3 className="text-xl font-bold text-gray-700">1.6 Your Responsibility</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You are responsible for making all arrangements necessary for you to have access to our site.</p>
   <h3 className="text-xl font-bold text-gray-700">1.7 Third-Party Users</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms and conditions and other applicable terms and conditions, and that they comply with them.</p>
   <h3 className="text-xl font-bold text-gray-700">1.8 Age Requirement</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You confirm that you are aged 18 years or over.</p>
</section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">2. Our Service & Conveyancing Quotes</h2>
   <h3 className="text-xl font-bold text-gray-700">2.1 Service Description</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> We provide an independent online service which enables you to research and compare conveyancing services provided by third-party solicitors and licensed conveyancers whilst using this Website. Our comparison service is free for you to use. We receive a referral fee from the third-party product or service providers when you use our service to obtain quotes for these products and services. We also offer a matching service where we will help you choose and instruct the law firm most suited to your requirements, including language preferences.</p>
   <h3 className="text-xl font-bold text-gray-700">2.2 Quote Purpose</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">By submitting your information for conveyancing quotes, it is for the purpose of third-party solicitors and conveyancers to provide quotes for conveyancing services.</p>
   <h3 className="text-xl font-bold text-gray-700">2.3 Regulatory Compliance</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">All conveyancing quotes are provided by Solicitors regulated by the SRA or Licensed Conveyancers regulated by the CLC.</p>
   <h3 className="text-xl font-bold text-gray-700">2.4 SRA Compliance</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We comply with Chapter 9 of the Solicitors Regulation Authority (&ldquo;SRA&rdquo;) Handbook &apos;Fee Sharing and Referrals&apos;.</p>
     <h3 className="text-xl font-bold text-gray-700">2.5 Solicitor Independence</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Any solicitor or registered European lawyer to whom we may refer you is an independent professional from whom you will receive impartial and confidential advice. You are free to choose another solicitor or registered European lawyer.</p>
   <h3 className="text-xl font-bold text-gray-700">2.6 Referral Agreements</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">The Solicitors Regulation Authority (the independent regulatory body of the Law Society of England and Wales) permits solicitors to make agreements with their introducing sources for referral work.</p>
   <h3 className="text-xl font-bold text-gray-700">2.7 Formal Agreements</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> Such agreements must comply with Chapter 9 of the SRA Handbook &apos;Fee Sharing and Referrals&apos; which contains strict rules to safeguard your interests as the customer. MovWise Ltd and all solicitors who quote for conveyancing services have entered into a formal referral agreement under Chapter 9.</p>
   <h3 className="text-xl font-bold text-gray-700">2.8 Commission Structure</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We receive a commission from solicitors when your transaction completes successfully as a result of your enquiry.</p>
     <h3 className="text-xl font-bold text-gray-700">2.9 Fee Transparency</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> Conveyancing fees quoted will include disbursements but do not always include all possible third-party payments such as local or environmental searches, telegraphic transfer fees or stamp duty and these costs will normally be broken down and provided separately as part of any quotation. There may be additional costs associated with your conveyancing or additional payments to third parties as part of your transaction that we cannot foresee and you must check these with your chosen conveyancer about these.</p>
   <h3 className="text-xl font-bold text-gray-700">2.10 Additional Services</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We also provide an independent service which enables you to obtain advice and assistance offline (for example over the telephone) after using this Website either from us or from a third-party advisor in connection with certain products or services. We do not charge you any fees or commissions for this service. We receive a fee and/or commission from the third-party product or service providers when you use our service to purchase products or services from them.</p>
   <h3 className="text-xl font-bold text-gray-700">2.11 No Legal Advice</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Please be aware that nothing on this Website is, or shall be deemed to constitute legal, financial, investment or other advice or a recommendation or endorsement by us in respect of any product or service referred to on this Website. Information on this Website is provided for general information purposes only, should not be relied upon by you and is provided so that you can select the product or service that you feel is most appropriate to meet your needs. You should always check the suitability, adequacy and appropriateness of the product or service that is of interest to you and it is your sole decision whether to obtain or refrain from obtaining any product or service. If you are in any doubt as to the suitability, adequacy or appropriateness of any product or service referred to on this Website, we suggest that you seek independent professional advice before you obtain any product or service via this Website.</p>
   <h3 className="text-xl font-bold text-gray-700">2.12 No Offer Constituted</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Please be aware that nothing on this Website is, or shall be deemed to constitute, an offer by us or any third party to sell to you any product or service or to enter into any contract with you in respect of any product or service. By submitting your details, you are making an offer to obtain the relevant product or service from the relevant third party on its terms and conditions that may be accepted or rejected. The contract for the product or service will only be concluded once your offer has been accepted. You will receive confirmation when your offer has been accepted.</p>
     <h3 className="text-xl font-bold text-gray-700">2.13 Access Rights</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We aim to provide uninterrupted access to this Website but we give no warranty as to the uninterrupted availability of this Website. We reserve the right to suspend, restrict or terminate your access to this Website at any time.</p>
   <h3 className="text-xl font-bold text-gray-700">2.14 Content Modification</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We reserve the right to add, amend, delete, edit, remove or modify any information, content, material or data displayed on this Website and without notice from time to time.</p>
   <h3 className="text-xl font-bold text-gray-700">2.15 Language Support Services</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you need conveyancing services in a language other than English, and your chosen solicitor does not speak that language, we can offer extra language support for an additional fee paid directly to us. This service includes document explanation, translation assistance, and bilingual communication support. This fee is separate from our standard commission and will be clearly disclosed before you commit to any service.</p>
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> 3. Permitted Use </h2>
   <h3 className="text-xl font-bold text-gray-700">3.1 Personal Use Only</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> You are only permitted to access and use this Website for your personal, non-commercial purposes, meaning this Website may only be accessed and used directly by a private individual or by a business to seek a product or service directly for that individual or business and on their own behalf. Access to and use of this Website other than for your personal, non-commercial purposes is strictly prohibited.</p>
   <h3 className="text-xl font-bold text-gray-700">3.2 Prohibited Uses</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"><strong>You are not permitted to use this Website:</strong></p>
   <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>In any unlawful, fraudulent or commercial manner.</li>
    <li>To harm, threaten, abuse, embarrass, defame, libel, intimidate or harass another person, or in a way that invades another person&apos;s privacy or is obscene, offensive, hateful, indecent, inappropriate, objectionable, unacceptable, discriminatory or damaging as determined by us.</li>
    <li>To create, check, confirm, update, modify or amend your own or another person&apos;s databases, records or directories.</li>
    <li>To tamper with, modify, reverse engineer or amend any part of this Website.</li>
    <li>In a way that interferes with, disrupts or imposes an unreasonable or disproportionately large burden on our communications and technical systems as determined by us.</li>
    <li>Using any automated software, process, program, robot, web crawler, spider, data mining, trawling or other &apos;screen scraping&apos; software, process, program or system.</li>
    </ul>
   <h3 className="text-xl font-bold text-gray-700">3.3 Linking to Our Site</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You may operate a link to this Website provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, as determined by us. You must not operate a link to this Website in such a way as to suggest or imply any form of association, approval or endorsement by us. We reserve the right to require you to immediately remove any link to this Website at any time and we may withdraw any linking permission at any time.</p>
  </section>
  <section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> 4. Intellectual Property Rights </h2>
   <h3 className="text-xl font-bold text-gray-700">4.1 Copyright</h3>
   <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">The copyright in the information, content, material or data displayed on this Website belongs to us or our licensors. You may temporarily print, copy, download or store extracts of information, content, material or data displayed on this Website for your own personal use, subject to the following conditions:</p>
   <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>It may not be used for any commercial purposes and may not be commercially exploited, published, distributed, extracted, re-utilised or reproduced without our prior written consent.</li>
    <li>You may not use any automated software, process, program or system, robot, web crawler, spider, data mining, trawling or other &apos;screen scraping&apos; software, process, program or system.</li>
    <li>It may not be sold or transferred to any third party.</li>
    <li>The copy must retain any copyright or other intellectual property notices contained in the original material.</li>
    <li>Images displayed on this Website are protected by copyright and may not be reproduced or appropriated in any manner without the prior written consent of their respective owner(s).</li>
    <li>No logos, trade marks or service marks displayed on this Website may be printed or downloaded, except as part of the text of which they form part.</li>
    <li>You must not modify the paper or digital copies of such information, content, material or data.</li>
    <li>It may not be excerpted, utilised, used, reproduced, published, reformatted and/or displayed on any other website without our prior written consent.</li>
    <li>The status of us and our licensors as the authors of such information, content, material or data must be acknowledged.</li>
    </ul>
   <h3 className="text-xl font-bold text-gray-700">4.2 Rights Reserved</h3>
   <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> All intellectual property rights including, without limitation, all copyright, design rights, patents, inventions, logos, business names, trading names, service marks and trade marks, internet domain names, moral rights, rights in databases, data, source codes, software, specifications, know how, processes and business methods (in all cases whether registered or unregistered and including all rights to apply for registration) in and relating to this Website (including information, content, material or data displayed on it) belong to us or our licensors and all such rights are reserved.</p>
   <h3 className="text-xl font-bold text-gray-700">4.3 Restrictions</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Except as set out elsewhere in these Terms of Use, none of the intellectual property rights belonging to us or our licensors in and relating to this Website (including information, content, material or data displayed on it) may be used, copied, modified, published, extracted, utilised, transmitted, displayed, sold, excerpted, reverse engineered, made available, reproduced, reformatted or distributed by you without our prior written consent.</p>
     <h3 className="text-xl font-bold text-gray-700">4.4 User Content</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You shall retain ownership of any views, opinions, reviews, ratings, comments, content or material you submit, display, distribute, upload, post, share, publish or otherwise make publicly available on or through this Website (&ldquo;User Content&rdquo;). You grant us a perpetual, irrevocable, transferable, worldwide, royalty free and unlimited licence to use, modify, keep, share, sell, save, copy, distribute, publish, display, excerpt, reproduce, utilise, extract, make available and transmit such User Content in any manner and for any purpose.</p>
  </section>
  <section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">5. Exclusions of Liability</h2>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Sections 5, 6 and 7 are important and you should read them carefully as they exclude or limit our liability to you and detail your responsibilities.</p>
  <h3 className="text-xl font-bold text-gray-700">5.1 Exceptions</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> Nothing in these terms and conditions excludes or limits our liability for death or personal injury caused by our negligence or for our fraud.</p>
   <h3 className="text-xl font-bold text-gray-700">5.2 Accuracy Disclaimer</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We use reasonable endeavours to ensure that the data, material and information on the Website is accurate and to correct any errors or omissions as soon as practicable after being notified of them. However, we are not able to guarantee that the data, material and information on the Website is accurate or that there are no errors or omissions in the data, material and information.</p>
  <h3 className="text-xl font-bold text-gray-700">5.3 Third-Party Content</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We do not monitor, verify or endorse data, material and information submitted or provided by third parties which is included on the Website and you should be aware that such information may be inaccurate, incomplete or out of date. In particular, we do not monitor, verify or endorse the information or quotations collected from the product and service providers as presented to you on the Website. We are not responsible for any data, material or information included on the Website which has been provided by third parties.</p>
   <h3 className="text-xl font-bold text-gray-700">5.4 Virus Protection</h3> 
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We do not give any warranty that the Website is free from viruses or anything else which may have a harmful effect on any technology.</p>
     <h3 className="text-xl font-bold text-gray-700">5.5 Technical Issues</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We are not responsible for any losses or damages arising from an inability to access the Website, from any use of the Website or from reliance on the data transmitted using the Website where such losses or damages are caused by any event beyond our reasonable control including as a result of the nature of electronic transmission of data over the internet.</p>
   <h3 className="text-xl font-bold text-gray-700">5.6 Indirect Losses</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We are not responsible or liable for any indirect losses or damages suffered or incurred by you or for any losses or damages suffered or incurred by you which were not foreseeable by us when you accessed or used the Website.</p>
   <h3 className="text-xl font-bold text-gray-700">5.7 Third-Party Reviews</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Some of our channels will provide you with access to third-party websites who will host reviews about some of the products and services available. In some instances you may also be able to access user reviews directly on the Website. Regardless of whether you are transferred to a third parties website or read a user review on the Website, the views expressed therein do not represent our views or the views of our associated companies and we are not responsible or liable for the accuracy or content of any such views or expressions.</p>
   <h3 className="text-xl font-bold text-gray-700">5.8 Limitation of Liability</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We will not be liable to any user for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:</p>
   <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>use of, or inability to use, our site;</li>
    <li>use of or reliance on any content displayed on our site; or</li>
    <li>use of the services or goods of any advertiser on our site.</li>
    </ul>
       <h3 className="text-xl font-bold text-gray-700">5.9 Business User Limitation</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you are a business user, please note that in particular, we will not be liable for:</p>
   <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>loss of profits, sales, business, or revenue;</li>
    <li>business interruption;</li>
    <li>loss of anticipated savings;</li>
    <li>loss of business opportunity, goodwill or reputation; or</li>
    <li>any indirect or consequential loss or damage.</li>
    </ul>
    <h3 className="text-xl font-bold text-gray-700">5.10 Indemnification</h3>
    <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You agree to defend, indemnify, and hold harmless MovWise Ltd, its officers, directors, employees, affiliates and agents, from and against any claims, actions or demands, including without limitation reasonable legal and accounting fees, alleging or resulting from your use of the Material or your breach of the terms of these Terms and Conditions. MovWise Ltd shall provide notice to you promptly of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit or proceeding.</p>
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">6. Exclusion of Liability for Third Parties</h2>
   <h3 className="text-xl font-bold text-gray-700">6.1 Third-Party Services</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You can apply for a number of products and services via this Website. These products and services are not provided by us but are instead provided by third parties over whom we do not have control. It is your responsibility to satisfy yourself that you wish to obtain any product or service before doing so and the costs involved. We are not responsible or liable for any loss or damage you may suffer or incur in connection with any product or service you obtain after using this Website or for any acts, omissions, errors or defaults of any third party in connection with that product or service.</p>
   <h3 className="text-xl font-bold text-gray-700">6.2 Product Information</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Please be aware that the information and descriptions of products and services on this Website may not represent the complete descriptions of all the features and terms and conditions of those products and services. You must ensure that you carefully read all the features and terms and conditions of any product or service before applying for it.</p>
   <h3 className="text-xl font-bold text-gray-700">6.3 Third-Party Contracts</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you apply for and obtain any product or service, you will be contracting with a third party who will be providing that product or service to you on their own terms and conditions. It is your responsibility to ensure that you understand and agree with those terms and conditions before entering into a contract to obtain that product or service and the costs involved. We are not responsible or liable for any loss or damage you may suffer or incur in connection with the terms and conditions applying to any contract entered into by you with any third party in relation to any product or service or for any acts, omissions, errors or defaults of any third party in connection with those terms and conditions.</p>
   <h3 className="text-xl font-bold text-gray-700">6.4 External Links</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We provide links from this Website and from emails sent to you as part of our service to the websites of third parties. These websites are owned and operated by third parties over whom we do not have control. You access and use these third-party websites at your sole risk and your sole discretion. You are solely responsible for any use of these third-party websites and for any decision to obtain or refrain from obtaining any of the products or services available on such third-party websites. Any links to third-party websites are provided for your interest and convenience only. We do not endorse, recommend or accept responsibility for such third parties, their products or services, their websites or for any information, opinions or views given or advice provided by such third parties (whether on their websites or otherwise). We are not responsible or liable for any loss or damage you may suffer or incur in connection with your use of any third-party websites or for any acts, omissions, errors or defaults of any third party in connection with their website.</p>
     <h3 className="text-xl font-bold text-gray-700">6.5 Third-Party Terms</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Your use of any third-party website will be governed by the terms and conditions of use and privacy policy applicable to that website. Such terms and conditions of use and privacy policy will be different from these Terms of Use and our Privacy Policy. It is your responsibility to ensure that you understand and agree with the terms and conditions of use and privacy policy of any third-party website before using that website. We are not responsible or liable for any loss or damage you may suffer or incur in connection with the terms and conditions of use or the privacy policy applying to any third-party website or for any acts, omissions, errors or defaults of any third party in connection with those terms and conditions of use and/or privacy policy.</p>
   <h3 className="text-xl font-bold text-gray-700">6.6 Third-Party Advice</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Any views, opinions, advice or assistance which is given or provided to you by a third party after you have used this Website do not represent our views, opinions, advice or assistance and are not checked, monitored, reviewed, verified or endorsed by us. We do not endorse, recommend or take responsibility for any third party who provides you with any views, opinions advice or assistance. You act or refrain from acting on any third party&apos;s views, opinions, advice or assistance at your sole risk and sole discretion and you are solely responsible for any decision to act or refrain from acting on such views, opinions, advice or assistance. We are not responsible or liable for any loss or damage you may suffer or incur in connection with such views, opinions, advice or assistance including in relation to their accuracy, truthfulness or completeness or for any acts, omissions, errors or defaults of any third party in connection with such views, opinions, advice or assistance.</p>
   <h3 className="text-xl font-bold text-gray-700">6.7 Alternative Services</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> Please be aware that whilst this Website provides information on a range of products or services, there may be other products or services available on the market which are not shown on this Website and which may be more appropriate or suitable for you than those shown on this Website.</p>
   <h3 className="text-xl font-bold text-gray-700">6.8 Indemnification</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You agree to defend, indemnify, and hold harmless MovWise Ltd, its officers, directors, employees, affiliates and agents, from and against any claims, actions or demands, including without limitation reasonable legal and accounting fees, alleging or resulting from your use of the Material or your breach of the terms of these Terms and Conditions. MovWise Ltd shall provide notice to you promptly of any such claim, suit, or proceeding and shall assist you, at your expense, in defending any such claim, suit or proceeding.</p>
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">7. Your Responsibilities</h2>
   <h3 className="text-xl font-bold text-gray-700">7.1 Security Precautions</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You must take all reasonable precautions (including using appropriate virus checking software) to ensure that any information, content, material or data you provide (including User Content as described in paragraph 4.5) is free from viruses, spyware, malicious software, trojans, worms, logic bombs and anything else which may have a contaminating, harmful or destructive effect on any part of this Website or the websites of third parties or any other technology.</p>
   <h3 className="text-xl font-bold text-gray-700">7.2 Account Security</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You may complete a registration process as part of your use of this Website which may include the creation of a username, password and/or other identification information. Any username, password and/or other identification information must be kept confidential by you and must not be disclosed to, or shared with, anyone. Where you do disclose to or share with anyone your username, password and/or other identification information, you are solely responsible for all activities undertaken on this Website using your username, password and/or other identification information.</p>
   <h3 className="text-xl font-bold text-gray-700">7.3 Information Accuracy</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You must check and ensure that all information, content, material or data you provide on this Website is correct, complete, accurate and not misleading and that you disclose all relevant facts. We do not accept any responsibility or liability for any loss or damage you may suffer or incur if any information, content, material or data you provide on this Website is not correct, complete and accurate or if it is misleading or if you fail to disclose all relevant facts.</p>
   <h3 className="text-xl font-bold text-gray-700">7.4 Third-Party Data Verification</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Before you obtain any product or service from a third party, you must check all of the information, content, material or data held by the third party about you to ensure it is correct, complete, accurate and not misleading and that you have disclosed all relevant facts. It is your responsibility to identify and correct any mistakes or errors in the information, content, material or data held by the third party about you before you obtain any product or service. Failure to do so could invalidate the product or service provided by the third party. We do not accept any responsibility or liability for any loss or damage you may suffer or incur if any information, content, material or data held by the third party about you is not correct, complete and accurate or if it is misleading or if you have failed to disclose all relevant facts.</p>
     <h3 className="text-xl font-bold text-gray-700">7.5 Third-Party Permissions</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You must get permission from any other person about whom you propose to provide information before you provide it. In submitting any other person&apos;s details, you are confirming to us that you have their permission to do so and that they understand how their details will be used.</p>
   <h3 className="text-xl font-bold text-gray-700">7.6 User Content Standards</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You are solely responsible and liable for your conduct on this Website and for your User Content. You must ensure that:</p>
   <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>You own your User Content or otherwise have the right to grant the licence set out in paragraph 4.5.</li>
    <li>Your User Content does not violate or infringe any privacy rights, intellectual property rights (such as copyright, database rights and trade marks) or other rights of any third party (including any right of confidentiality).</li>
    <li>Your User Content does not violate or infringe any law.</li>
    <li>Your User Content is true, complete, accurate and not misleading where it relates to facts, or is genuinely held where it relates to an opinion.</li>
    <li>Your User Content is not harmful, fraudulent, threatening, defamatory, embarrassing, distressing, infringing, abusive, inflammatory, intimidating, harassing, libellous, stalking, profane, obscene, indecent, inappropriate, hateful, discriminatory or racially, ethnically, sexually or otherwise objectionable.</li>
   </ul>
   <h3 className="text-xl font-bold text-gray-700">7.7 Liability for Conduct</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> You agree that you will be liable to us for any damage, loss, claim, demand, liability or expense (including reasonable legal fees) that we may suffer or incur arising out of or in connection with your conduct on this Website and/or your User Content.</p>
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">8. Security and Passwords</h2>
   <h3 className="text-xl font-bold text-gray-700">8.1 Confidentiality</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you choose, or you are provided with, a user identification code, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party.</p>
   <h3 className="text-xl font-bold text-gray-700">8.2 Account Disabling</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these terms and conditions.</p>
   <h3 className="text-xl font-bold text-gray-700">8.3 Security Breach Notification</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you know or suspect that anyone other than you knows your user identification code or password, you must promptly notify us at info@movwise.co.uk.</p>
   </section>
  <section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> 9. User Generated Content</h2>
   <h3 className="text-xl font-bold text-gray-700">9.1 Compliance</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"> You agree that any User Content (as described in paragraph 4.5) will comply with this paragraph 9 and the User Content Standards.</p>
   <h3 className="text-xl font-bold text-gray-700">9.2 Prohibited Activities</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You are not permitted to use this Website to:</p>
  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>Collect email addresses or other contact information of others for the purposes of sending unsolicited emails or other unsolicited communications.</li>
    <li>Promote or encourage illegal activity.</li>
    <li>Do anything that is unlawful, harmful, fraudulent, threatening, defamatory, embarrassing, distressing, infringing, abusive, inflammatory, intimidating, harassing, libellous, stalking, profane, obscene, indecent, inappropriate, hateful, discriminatory or racially, ethnically, sexually or otherwise objectionable or for the purpose of harming or attempting to harm minors in any way.</li>
    <li>Do anything which violates the rights of others (such as rights of privacy).</li>
    <li>Impersonate any other person or falsely state or otherwise misrepresent yourself.</li>
    <li>Upload, post, transmit, distribute, share, store or otherwise make publicly available any personal information of any other person including names, addresses, phone numbers and email addresses.</li>
    <li>Upload, post, transmit, distribute, modify, reproduce, share, store or otherwise make publicly available any information, material, data or content that infringes any patent, trade mark, trade secret, copyright or other intellectual property right of any other person.</li>
    <li>Send any unsolicited or unauthorised advertising, promotional materials, &apos;junk mail&apos;, &apos;spam&apos;, &apos;chain letters&apos; or any other form of such solicitation.</li>
    <li>Post links to alternative community groups or forums except with our prior written consent.</li>
    </ul>
   <h3 className="text-xl font-bold text-gray-700">9.3 Content Monitoring</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We reserve the right, but have no obligation, to review or monitor any User Content. We are not responsible or liable for the review or monitoring of any User Content.</p>
   <h3 className="text-xl font-bold text-gray-700">9.4 Content Modification</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We reserve the right to close, delete, edit, refuse to post, amend, modify or remove (without notice) any User Content at our sole discretion for any reason, including without limitation User Content that in our sole opinion breaches these Terms of Use.</p>
     <h3 className="text-xl font-bold text-gray-700">9.5 Information Accuracy</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You agree that any information you provide to us about yourself will be true, accurate and complete, and that you will ensure that this information is kept accurate and up-to-date at all times.</p>
   <h3 className="text-xl font-bold text-gray-700">9.6 Identity Disclosure</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">You agree that we may disclose your identity (including your name, email address and contact details) if required to do so by law, any court, the Financial Conduct Authority, or any other applicable regulatory, compliance, Governmental or law enforcement agency.</p>
   <h3 className="text-xl font-bold text-gray-700">9.7 Privacy Caution</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">We advise you to think very carefully before posting or uploading any personally identifiable information about you on this Website.</p>
   <h3 className="text-xl font-bold text-gray-700">9.8 Complaint Procedure</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you consider that any User Content is contentious or breaches these Terms of Use, you can report this by email to complaints@movwise.co.uk or in writing to our postal address addressed to &apos;The Customer Service Team, MovWise Ltd, 128 City Road, London, EC1V 2NX&apos;. Emails will be responded to within two working days, postal enquiries within 10 working days of receipt.</p>
     <h3 className="text-xl font-bold text-gray-700">9.9 Content Removal</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Notwithstanding our lack of responsibility for user generated content, should we acknowledge and agree with any complaint or request to close, delete, edit, amend, modify or remove content, we will take this action within 10 working days of acknowledgement.</p>
  
</section>
<section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">10. Miscellaneous</h2>
   <h3 className="text-xl font-bold text-gray-700">10.1 Severability</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If any provision of these Terms of Use is held to be unlawful, invalid or unenforceable, that provision shall be deemed deleted from these Terms of Use and the validity and enforceability of the remaining provisions of these Terms of Use shall not be affected.</p>
   <h3 className="text-xl font-bold text-gray-700">10.2 Entire Agreement</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">These Terms of Use constitute the entire agreement between you and us relating to your access to and use of this Website and supercedes any prior agreements (including any previous terms of use of this Website).</p>
   <h3 className="text-xl font-bold text-gray-700">10.3 Waiver</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">No failure or delay by us in exercising any right under these Terms of Use will operate as a waiver of that right nor will any single or partial exercise by us of any right preclude any further exercise of any right.</p>
   </section>
   <section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">11. Governing Law</h2>
   <h3 className="text-xl font-bold text-gray-700">11.1 Applicable Law</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">These Terms of Use and your access to and use of this Website shall be governed by and interpreted in accordance with English law.</p>
   <h3 className="text-xl font-bold text-gray-700">11.2 Jurisdiction</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Each of you and us submits to the exclusive jurisdiction of the courts of England and Wales in connection with these Terms of Use and your access to and use of this Website (including any claims or disputes).</p>
  </section>
  <section className="py-3" > 
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">12. Contact and Feedback</h2>
   <h3 className="text-xl font-bold text-gray-700">12.1 General Enquiries</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Please email any comments or enquiries to info@movwise.co.uk</p>
   <h3 className="text-xl font-bold text-gray-700">12.2 Written Complaints</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">Written complaints can be sent to our postal address addressed to &apos;The Customer Service Team, MovWise Ltd, 128 City Road, London, EC1V 2NX&apos;. Emails will be responded to within two working days, postal enquiries within 10 working days of receipt.</p>
   <h3 className="text-xl font-bold text-gray-700">12.3 Third-Party Complaints</h3>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify">If you are unhappy with any product you have obtained from a third party or have any complaint regarding any third party, you should address your complaint directly to that third party. If you require their contact details, please contact our Customer Services Team who will be happy to assist.</p>
  
   </section>
   <p className="mt-6 text-gray-600 leading-relaxed text-center"><strong>Copyright © 2026  MovWise Ltd. All rights reserved.</strong></p>
</div></main></div>

      <div className="mt-300px"></div>
       <Footer />
    
    </div>
  );
}