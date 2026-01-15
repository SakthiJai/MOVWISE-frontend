import Head from 'next/head';

import Navbar from '../parts/navbar/page';
import Footer from '../parts/Footer/footer';



const chooseus = [
  {
    titleText: "Personal Information:",
    descriptionItems: [
      "Name and contact information including email address and telephone number",
      "Demographic information such as postcode, preferences, and interests",
      "Language preferences and communication needs",
      "Identity verification information (when required)",
    ],
    color: "text-yellow-400",
  },
  {
    
    titleText: "Conveyancing Information:",
    descriptionItems: [
      "Property details including old and new addresses",
      "Transaction type (purchase, sale, remortgage, etc.)",
      "Property value and mortgage information",
      "Property status and specific requirements",
      "Special needs (language support, cultural considerations)",
    ],
    color: "text-yellow-400",
  },
    {
    titleText: "Technical Information:",
    descriptionItems: [
      "IP address, browser type and version, operating system",
      "Information about your visit including the full URL visited",
      "The source of your visit (referring website, search terms)",
      "Products or services viewed or searched for",
      "Page interaction information (scrolling, clicks, length of visit)",
      "Page response times and errors",
    ],
    color: "text-yellow-400",
  },
  {
    
    titleText: "Communication Information:",
    descriptionItems: [
      "Details of communications with you (emails, calls, chat logs)",
      "Feedback and survey responses",
      "Service preferences and consents",
    ],
    color: "text-yellow-400",
  },
];
const information = [
  {
    titleText: "Service Provision:",
    descriptionItems: [
      "To provide your quote request details to our network of trusted conveyancing firms who speak your preferred language",
      "To match you with solicitors based on your language requirements and other preferences",
      "To provide additional language support services when needed",
    ],
    color: "text-yellow-400",
  },
  {
    
    titleText: "Communication:",
    descriptionItems: [
      "To contact you to discuss your quotes or gather feedback on the service or service providers",
      "For internal record keeping and compliance",
      "To improve our products and services based on your feedback",
    ],
    color: "text-yellow-400",
  },
    {
    titleText: "Marketing (with consent):",
    descriptionItems: [
      "To periodically contact you about new products, special offers, or related services",
      "To send promotional emails about new services or offers from trusted partners",
      "To customise the website according to your interests",
    ],
    color: "text-yellow-400",
  },
  {
    
    titleText: "Legal and Operational:",
    descriptionItems: [
      "To measure the relevance and effectiveness of our advertising",
      "To process payments and manage our relationship with partner firms",
      "To comply with legal and regulatory requirements",
    ],
    color: "text-yellow-400",
  },
];
const personaldata = [
  {
    titleText: "Sharing with Partners:",
    descriptionItems: [
      "We share your details with conveyancing firms that match your language and service requirements",
      "We share information with payment processors for transaction processing",
      "We share with technology partners who help us provide our services",
    ],
    color: "text-yellow-400",
  },
  {
    
    titleText: "Legal Sharing:",
    descriptionItems: [
      "We will disclose information when required to do so by law",
      "We may share with regulatory bodies such as the SRA, CLC, or ICO",
      "We may share with law enforcement agencies when legally required",
    ],
    color: "text-yellow-400",
  },
    {
    titleText: "Business Transfers:",
    descriptionItems: [
      "If MovWise Ltd or its assets are acquired by a third party, personal data held by MovWise Ltd about its customers will be transferred to the acquirer.",

    ],
    color: "text-yellow-400",
  },
];

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
    
    Privacy Policies
  </h1>
  
</div>

</section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> Introduction </h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify"> This is the privacy policy for our MovWise website. MovWise is a trading name of<strong> MovWise Ltd,</strong> registered office at <strong>128 City Road, London, United Kingdom, EC1V 2NX.</strong> Our services have their own policies which you can review when using our services</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify"> MovWise Ltd is committed to ensuring that your privacy is protected. If we ask you to provide certain information by which you can be identified when using this website, then please be assured that it will only be used in accordance with this privacy statement.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify"> The purpose of this website is to provide you with conveyancing quotes from our trusted partner firms, with a special focus on connecting you with solicitors who speak your language. We will protect your personal data at every stage of the process. Please read and make sure you are happy with our Privacy Policy before providing us with your personal information.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">MovWise Ltd may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
</section>
<section className="py-3">
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2"> Contents </h2>
  <div className="grid grid-cols-2 gap-8">
    <ul className="list-decimal pl-5 text-gray-600 space-y-2">
    <li className="list-decimal"> 	Who we are</li>
    <li className="list-decimal"> 	What we collect</li>
    <li className="list-decimal"> 	How we collect your personal data</li>
    <li className="list-decimal"> 	Legal Basis for Processing</li>
    <li className="list-decimal"> 	What we do with the information we gather</li>
    <li className="list-decimal"> 	Security</li>
    <li className="list-decimal"> 	When we share your personal data</li>
    <li className="list-decimal"> 	Where we store your information</li>
    </ul>
    <ul className="list-decimal pl-5 text-gray-600 space-y-2">
    <li value={9}> 	How we use cookies</li>
    <li value={10}> 	Links to other websites</li>
    <li value={11}> 	Controlling your information</li>
    <li value={12}> 	How long we keep your personal data</li>
    <li value={13}> 	Your data protection rights</li>
    <li value={14}> 	How to contact us</li>
    <li value={15}> 	Changes to this policy</li>
    </ul>
    </div>
 
</section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 items-center gap-2 inline-block">1. Who we are </h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify"><strong>MovWise Ltd</strong>, 128 City Road, London, EC1V 2NX, is the Data Controller for the purposes of the Data Protection Act 2018 (the Act), the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulation (PECR). Our ICO registration number is [Your ICO Number].</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">This privacy policy sets out how MovWise uses and protects the information that you give us when you use this website.</p>
  </section>
  <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">2. What we collect </h2>
  <p className="mt-6 text-gray-700 leading-relaxed text-justify py-3"><strong>We may collect the following information:</strong></p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chooseus.map((c, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="inline-block items-center text-xl font-semibold text-green-800 mb-2 gap-2">
                   
                    {c.titleText}
                  </h3>
                  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
                    {c.descriptionItems.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
  </section>
  <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">3. How we collect your personal data</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">Most of the data we process will be data that we or our trusted partners collect directly from you when you answer the questions asked in the forms on the website which relate to your conveyancing needs, including your language preferences.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">In addition, we collect data about how and when you use our website and our services. This helps us provide you with a good service and make any changes needed to improve our website, products and services. To do this, we may use cookies and similar technology to identify you, your device and other technical information specified above. Please see Section 9 below and our Cookie Policy for more information about Cookies.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">Where relevant, we will collect personal data from our communications with you – such as email, telephone, live chat and so on.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">We may obtain contact and business details from our network of partners, service providers, or publicly available sources for business development purposes.</p>
  </section>
   <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">4. Legal Basis for Processing</h2>
  <h3 className="text-xl font-bold text-gray-700">Contractual Necessity:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">The processing and sharing of your personal data with trusted partners and providers is necessary to fulfil the services you have asked us to provide, and is processed under the legal basis of contractual obligation.</p>
  <h3 className="text-xl font-bold text-gray-700">Consent:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">Where appropriate, we will process your personal data with your consent – for example when we use cookies for data analytics purposes, or when you opt-in to receive marketing communications.</p>
  <h3 className="text-xl font-bold text-gray-700">Legitimate Interests:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify"><strong>We will process under legitimate interests:</strong></p>
  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>When processing for marketing and promotion purposes such as when we send news of new services, special offers, or offers for related services provided by our trusted partners</li>
    <li>To communicate electronically with potential partners and service providers</li>
    <li>For customer service and improvement purposes</li>
    <li>To provide multilingual support services when requested</li>
    </ul>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">We have conducted legitimate interest assessments to make sure our business interests do not override your interests. You will be able to opt out of receiving our marketing communications at any time.</p>
  <h3 className="text-xl font-bold text-gray-700">Legal Obligation:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">From time to time we may be required by law to share your personal data with certain public authorities, regulatory bodies or law enforcement agencies, including but not limited to the Information Commissioner&apos;s Office, SRA, or CLC.</p>
  <h3 className="text-xl font-bold text-gray-700">Special Category Data:</h3>
   <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">We shall only process health or other special category data (such as religious beliefs) where you have provided us with explicit consent to do so, typically related to language or cultural support requirements.</p>
  </section>
    <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">5. What we do with the information we gather</h2>
  <p className="mt-6 text-gray-700 leading-relaxed text-justify py-3">We require this information to understand your needs and provide you with a better service, particularly focusing on your language and cultural requirements. We will only pass your personal data to providers of services you have requested. We shall never sell your information to any further parties without your permission.</p>
  <p className="mt-6 text-gray-700 leading-relaxed text-justify py-3"><strong>We shall use your personal data in particular for the following reasons:</strong></p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {information.map((c, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="flex items-center text-xl font-semibold text-green-800 mb-2 gap-2">
                   
                    {c.titleText}
                  </h3>
                  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
                    {c.descriptionItems.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed text-justify py-3"><strong>Our trusted partner companies</strong> have agreed to process your data in accordance with all applicable data protection laws. You have the same rights over how they use your data as you do with us.</p>
            <p className="mt-3 text-gray-700 leading-relaxed text-justify py-3">We are not in control of the processes or policies of partner companies who may provide you with quotes and/or services; the partner companies are responsible for their own data protection compliance when they process your personal data to provide their services.</p>
            <p className="mt-3 text-gray-700 leading-relaxed text-justify py-3">You have the right to opt out of any marketing or profiling processes at any time by contacting us using the details at the end of this privacy policy.</p>
  </section>
    <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">6. Security</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">We are committed to ensuring that your information is secure. To prevent unauthorised access or disclosure we have put in place suitable physical, technical, electronic, organisational and managerial procedures to safeguard and secure the information we collect online. We use state of the art technology for processing and storing data, and data transfers, including encryption, and access control. Your personal data is processed with confidentiality and integrity.</p>
  </section>
    <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">7. When we share your personal data</h2>
  <p className="mt-6 text-gray-700 leading-relaxed text-justify py-3">MovWise Ltd may share your personal information with other service providers but only when you request specific services from our partners, in this case, conveyancing services with specific language requirements.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personaldata.map((c, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="flex items-center text-xl font-semibold text-green-800 mb-2 gap-2">
                   
                    {c.titleText}
                  </h3>
                  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
                    {c.descriptionItems.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
  </section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">8. Where we store your data</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">Your data will usually be held in a destination inside the United Kingdom (&ldquo;UK&rdquo;). However, there may be times when the data we collect from you may be transferred to, and stored at, a destination outside the UK to countries that provide an adequate level of protection. We will use the UK International Data Transfer Agreement to cover the transfer of personal data to countries which are not deemed adequate by the UK.</p>
 </section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">9. How we use cookies</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
 <p className="mt-6 text-gray-600 leading-relaxed text-justify">Information on the cookies we set, and their purpose can be found in our Cookie Policy.</p>
 </section>
<section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">10. Links to other websites</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
 </section>
    <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">11. Controlling your personal information</h2>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify"><strong>You may choose to restrict the collection or use of your personal information in the following ways:</strong></p>
  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 text-gray-600">
    <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
    <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at privacy@movwise.co.uk</li>
    <li>You can unsubscribe from marketing emails by clicking the unsubscribe link in any marketing email</li>
    </ul>
 </section>
 <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">12. How long we keep your personal data</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">All personal data will be held in accordance with our company retention and deletion policy. We only keep your information for as long as it is needed for each of the activities we have identified in this privacy notice, or while you have an active account with us, in order that we may offer and provide our services to you. We will also keep your data for as long as is required to meet our legal or regulatory obligations, typically for 7 years after the completion of services.</p>
 </section>
    <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">13. Your data protection rights</h2>
  <p className="mt-3 mb-3 text-gray-600 leading-relaxed text-justify"><strong>Under the data protection regulations, you have rights over how your data is processed. These are summarised below:</strong></p>
  <h3 className="text-xl font-bold text-gray-700">Right of Access:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right at any time to ask us what personal information we hold about you, and to provide you with a copy.</p>
  <h3 className="text-xl font-bold text-gray-700">Right to Rectification:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">The accuracy of your personal data is important to us. You can rectify, update, or ask us to amend any data that is incorrect or out of date.</p>
  <h3 className="text-xl font-bold text-gray-700">Right to Erasure:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right to ask us to delete the information that we hold about you in certain circumstances.</p>
  <h3 className="text-xl font-bold text-gray-700">Right to Restrict Processing:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right to ask us to restrict the processing of your personal data in certain circumstances.</p>
  <h3 className="text-xl font-bold text-gray-700">Right to Data Portability:</h3>
  <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right to be provided with a copy of the data that we hold about you in a commonly used electronic format.</p>
  <h3 className="text-xl font-bold text-gray-700">Right to Object:</h3>
   <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right to object to the processing of your personal data in certain circumstances, including for direct marketing.</p>
   <h3 className="text-xl font-bold text-gray-700">Rights in Relation to Automated Decision Making:</h3>
   <p className="mt-3 mb-2 text-gray-600 leading-relaxed text-justify">You have the right not to be subject to automated decision-making, including profiling.</p>
  </section>
   <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">14. How to Contact Us</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">If you wish to exercise any of these rights, or to request details of personal information which we hold about you, please write to:</p>
 <p className="mt-2 text-gray-600 leading-relaxed text-justify"><strong>The Data Controller</strong></p>
 <p className="mt-1 text-gray-600 leading-relaxed text-justify">MovWise Ltd</p>
 <p className="mt-1 text-gray-600 leading-relaxed text-justify">128 City Road</p>
 <p className="mt-1 text-gray-600 leading-relaxed text-justify">London</p>
 <p className="mt-1 text-gray-600 leading-relaxed text-justify">EC1V 2NX</p>
 <p className="mt-1 text-gray-600 leading-relaxed text-justify">Or email:<strong> privacy@movwise.co.uk</strong></p>
 <p className="mt-3 text-gray-600 leading-relaxed text-justify">You can contact our Data Protection Officer at: <strong>dpo@movwise.co.uk</strong></p>
 <p className="mt-3 text-gray-600 leading-relaxed text-justify">If you are not satisfied with our response or believe we are processing your personal data not in accordance with the law you can complain to the Information Commissioner&apos;s Office.</p>
 <p className="mt-3 text-gray-600 leading-relaxed text-justify"><strong>Address:</strong> The Office of the Information Commissioner, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.</p>
<p className="mt-3 text-gray-600 leading-relaxed text-justify"> <strong>Website:</strong>{" "}  <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline">https://ico.org.uk/</a></p>

 <p className="mt-3 text-gray-600 leading-relaxed text-justify"><strong>Tel:</strong> 0303 123 1113.</p>
 </section>
   <section className="py-3" >
  <h2 className="text-3xl font-bold text-green-800 mb-3 border-b-2 border-green-800 pb-2 inline-block items-center gap-2">15. Changes to this policy</h2>
  <p className="mt-6 text-gray-600 leading-relaxed text-justify">From time to time this policy will be updated if there are any changes in the way MovWise Ltd processes your personal data. You are advised to review this policy on a regular basis.</p>
 </section>
 <p className="mt-6 text-gray-600 leading-relaxed text-center"><strong>Copyright © 2026  MovWise Ltd. All rights reserved.</strong></p>
</div>
</main>
</div>

      <div className="mt-300px"></div>
       <Footer />
    
    </div>
  );
}