"use client";
import { Lightbulb, Users, Handshake, Globe ,HomeIcon } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from '../../parts/Footer/footer';



const values = [
  { 
    title: "Making Every Home Move Smarter", 
    description: (
      <>
        <p>We leverage cutting-edge technology to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>AI-powered matching that connects you with solicitors who specialise in your specific property type</li>
          <li>Real-time case tracking so you're never left wondering about progress</li>
          <li>Smart quote analysis that highlights the best value, not just the cheapest price</li>
        </ul>
      </>
    ),
    icon: Lightbulb,
    color: "text-blue-600"
  },
  { 
    title: "Making Every Home Move Simpler", 
    description:(
     <><p>Through intuitive design and clear processes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>3-step quote system that takes minutes, not hours</li>
          <li>Plain English explanations of complex legal terms</li>
          <li>One-platform management for all your legal conveyancing needs</li>
        </ul>
      </>
), 
    icon: Globe,
    color: "text-emerald-600"
  },
  { 
    title: "Making Every Home Move More Supported", 
    description: (
      <>
        <p>With unparalleled customer care:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Multilingual support team available throughout your journey</li>
          <li>Real-time case tracking so you're never left wondering about progress</li>
          <li>Educational resources that empower your decisions</li>
        </ul>
      </>
    ), 
    icon: Users, // Using Users for connection/network
    color: "text-purple-600"
  },
  // { 
  //   title: "Partnership", 
  //   description: "With regulated legal experts, ensuring all advice and service is high-quality and reliable.", 
  //   icon: Handshake,
  //   color: "text-amber-600"
  // },
];

const about = [
  { 
    title:(
    <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">🔍</span>
      Transparency That Builds Trust
    </span>
  ), 
    description: (
      <>
        <p>We believe you deserve complete clarity:</p>
        <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
          <li>All-inclusive quotes with no hidden fees</li>
          <li>Upfront commission disclosure – we're open about how we're paid</li>
           <li>Clear solicitor reviews from verified customers</li>
           <li>Real-time progress updates without chasing</li>
          <li>Open communication channels with your chosen firm</li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6"  style={{ height: '156px' }}>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;We show you exactly what you're paying for, why it costs that much, and who you're paying it to.&rdquo;
                </p>
              </div>
      </>
    ),
    color: "text-blue-600"
  },
  { 
    title: <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">🌍</span>
      Inclusivity Through Language & Access
    </span>  , 
    description:(
     <>
              <p>
               Breaking down barriers in UK property:</p>
               <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
                  <li>10+ language support including Tamil, Telugu, Hindi, Malayalam, Spanish, Polish, Urdu, Arabic etc</li>
                  <li>Native-speaking solicitors who understand cultural nuances</li>
                  <li>Accessible design for all abilities and tech comfort levels</li>
                  <li>No-jargon approach to legal explanations</li>
                  <li>Extended support hours for different time zones</li>
                </ul>             
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6"  style={{ height: '156px' }}>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;Whether you're a first-time buyer in Birmingham or Skilled Worker in Reading or  an international investor in London, your language shouldn't be a barrier to understanding your property transaction.&rdquo;
                </p>
              </div>
            
      </>
), 
    color: "text-emerald-600"
  },
  { 
    title: <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">🚀</span> Innovation That Serves People</span> , 
    description: (
      <>
        <p>Technology with a human touch:</p>
               <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
                  <li>Smart matching algorithm considering language, location, and specialism</li>
                  <li>Digital document management with secure cloud storage</li>
                  <li>Automated progress tracking that saves everyone time</li>
                  <li>Integrated SDLT calculator for instant cost planning</li>
                  <li>Mobile-first platform designed for busy lives</li>
                </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6">
                <p className="text-gray-700 italic text-lg">
                  &ldquo;We use technology not to replace human expertise, but to enhance it – connecting you with the right legal expert faster and more efficiently.&rdquo;
                </p>
              </div>
      </>
    ), 
   
    color: "text-purple-600"
  },
    { 
    title: <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">🤝</span>  Partnership With Purpose</span> , 
    description: (
      <>
        <p>Working with the best to serve you better:</p>
                <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
                  <li>SRA/CLC-regulated firms only – no unqualified practitioners</li>
                  <li>Rigorous vetting process for all partner solicitors</li>
                  <li>Continuous performance monitoring based on real client feedback</li>
                  <li>Ethical commission structure that aligns with your success</li>
                  <li>Regular training partnerships to maintain high standards</li>
                </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6">
                <p className="text-gray-700 italic text-lg">
                  &ldquo;We partner with legal experts who share our commitment to excellence, transparency, and client care.&rdquo;
                </p>
              </div>
      </>
    ), 
   
    color: "text-purple-600"
  },
  // { 
  //   title: "Partnership", 
  //   description: "With regulated legal experts, ensuring all advice and service is high-quality and reliable.", 
  //   icon: Handshake,
  //   color: "text-amber-600"
  // },
];

const impact = [
  { 
    title:(
    <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">📊</span>
      Our Impact
    </span>
  ), 
    description: (
      <>
        <p>Since Launch, We've Helped:</p>
        <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
         <li>10,000+ home movers find the right conveyancer</li>
                  <li>Save an average of £600 on legal fees through comparison</li>
                  <li>Connect 500+ non-English speakers with solicitors who speak their language</li>
                  <li>Reduce completion times by 25% through better matching</li>
                  <li>Maintain a 4.8/5 customer satisfaction rating</li>

        </ul>
      </>
    ),
    color: "text-blue-600"
  },
  { 
    title: <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
      <span className="text-2xl">🤲</span> Our Social Responsibility
    </span>  , 
    description:(
     <>
              <p>
               Community Commitment:</p>
               <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  style={{ height: '160px' }}>
                 <li>Pro bono / Free services for vulnerable home movers</li>
                  <li>Educational workshops in community languages</li>
                  <li>Partnerships with Charities & Community Groups</li>
                  <li>Environmental initiatives in our operations</li>
                </ul>             
            
      </>
), 
    color: "text-emerald-600"
  },
];

const chooseus = [
  { 
    title:(
    <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
       Property Experts Who Understand
    </span>
  ), 
    description: (
      <>
        <p>Our team includes:</p>
        <ul className="list-disc pl-5 mt-2 mb-4 space-y-1" >
          <li>Former conveyancing solicitors who know the process inside-out</li>
                  <li>Multilingual support specialists with legal translation experience</li>
                  <li>Technology developers focused on user-friendly solutions</li>
                  <li>Customer service professionals trained in property law basics</li>
        </ul>
      </>
    ),
    color: "text-blue-600"
  },
  { 
    title: <span className="flex items-center gap-2 text-xl font-semibold text-gray-800">
  You're Not Just a Customer – You're Our Purpose
    </span>  , 
    description:(
     <>
              <p>
               When you choose MovWise, you're choosing:</p>
                 <ul className="list-disc pl-5 mt-2 mb-4 space-y-1"  >
                  <li>A partner committed to your successful move</li>
                  <li>Technology that makes complex processes simple</li>
                  <li>Transparency that builds confidence</li>
                  <li>Inclusion that ensures everyone can participate</li>
                  <li>Innovation that continuously improves your experience</li>
                  </ul>             
            
      </>
), 
    color: "text-emerald-600"
  },
];

export default function AboutPage() {
  return (
    <div className="font">
      <Head>
        <title>MovWise | Compare Conveyancing Quotes &amp; Move with Confidence</title>
      </Head>

      {/* Sticky Navigation Bar */}
      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="">
          
          {/* Header/Hero Section */}
          <header className="text-white p-8 sm:p-12 text-center rounded-t-2xl">
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About MovWise
            </h1>
            <p className="text-base font-semibold tracking-wide uppercase mt-2" style={{ color: '#008236' }} >
            </p>
          </header>

          {/* Core Content Section */}
          <main className="p-6 sm:p-12 space-y-12 "  style={{ paddingTop: 0 }}>
            
            {/* Mission & Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                <HomeIcon className="h-5 w-5 text-white" />
                <span className="text-2xl">🏡</span> Our Story: Revolutionising Conveyancing
              </h2>
              {/* <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;&rdquo;
                </p>
              </div> */}
<p className="mt-6 text-gray-600 leading-relaxed text-justify">
MovWise was born from a simple observation: The UK property market was leaving millions behind. Home movers faced confusing quotes, hidden fees, legal jargon, and language barriers that turned their dream move into a stressful ordeal
</p>
              <p className="mt-6 text-gray-600 leading-relaxed text-justify">
                MovWise was <strong>founded in 2020</strong> by property and technology experts who witnessed the UK conveyancing market failing two key groups:<strong> first-time buyers</strong> overwhelmed by complex legal jargon, and <strong>non-English speakers / Foreign Nationals</strong> struggling with language barriers that put their dream homes at risk. We saw brilliant people—from<strong> Skilled workers to NHS Doctors </strong> —signing documents they didn't understand, paying for services they couldn't explain, and facing costly misunderstandings, all within a system that seemed designed to confuse rather than clarify. 
              </p>
              <p className="mt-6 text-gray-600 leading-relaxed text-justify">
                MovWise was created to<strong> bridge this gap, providing clarity through transparent processes and multilingual support</strong> to ensure every home mover can proceed with confidence.
              </p>
            </section>

            {/* Values Section */}
            <section>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                <span className="text-2xl">🎯</span> Our Mission Deep Dive
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                    {value.icon && (
                          <div className="flex items-center mb-3 gap-2">
                      <value.icon className={`w-8 h-8 mb-3 ${value.color}`}/>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {value.title}
                    </h3>
                    </div>
                     )}
                    <div className="text-gray-600">{value.description}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology & Accessibility Section */}
            <section>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
              <span className="text-2xl">💫</span>  Our Values in Action
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {about.map((about, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                          <div className="flex items-center mb-3 gap-2">
                     
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {about.title}
                    </h3>
                    </div>
                    
                    <div className="text-gray-600 h-98 overflow-y-auto ">{about.description}</div>
                  </div>
                ))}
              </div>
            </section>
          
            <section >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                <span className="text-2xl">🎖️</span>  Why Choose MovWise?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {chooseus.map((chooseus, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                          <div className="flex items-center mb-3 gap-2">
                     
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {chooseus.title}
                    </h3>
                    </div>
                    
                    <div className="text-gray-600">{chooseus.description}</div>
                  </div>
                ))}
              </div>

              </section>
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
              <span className="text-2xl">🌟</span> Why We're Different
              </h2>
                 
               <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6  text-center font-bold text-gray-800">Traditional Approach</th>
            <th className="py-3 px-6 text-center font-bold text-gray-800">MovWise Solution</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t border-gray-200 hover:bg-gray-50 text-gray-600">
            <td className="py-3 px-6 text-center">Complex legal jargon</td>
            <td className="py-3 px-6 text-center">Plain English explanations</td>
          </tr>
          <tr className="border-t border-gray-200 hover:bg-gray-50 text-gray-600">
            <td className="py-3 px-6 text-center">Language barriers</td>
            <td className="py-3 px-6 text-center">Native-language solicitors</td>
          </tr>
          <tr className="border-t border-gray-200 hover:bg-gray-50 text-gray-600">
            <td className="py-3 px-6 text-center">Hidden costs</td>
            <td className="py-3 px-6 text-center">All-inclusive fixed quotes</td>
          </tr>
          <tr className="border-t border-gray-200 hover:bg-gray-50 text-gray-600">
            <td className="py-3 px-6 text-center">One-size-fits-all</td>
            <td className="py-3 px-6 text-center">Personalised matching</td>
          </tr>
           <tr className="border-t border-gray-200 hover:bg-gray-50 text-gray-600">
            <td className="py-3 px-6 text-center">"Just trust us" attitude</td>
            <td className="py-3 px-6 text-center">Complete transparency</td>
          </tr>
        </tbody>
      </table>
    </div>
              </section>

              <section >
               <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
              <span className="text-2xl">📞</span> Our Promise to You:
              </h2>
              <div>
             <p className="mt-6 mb-6 text-gray-600 leading-relaxed text-justify">
              We believe your dream home shouldn't be lost in translation or buried in legal jargon. We're the bridge between confusion and confidence, ensuring every home mover - regardless of language or legal knowledge - can proceed with clarity and certainty.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6">
              <p className="text-gray-700 italic text-lg">
                  &ldquo;We will guide you through one of life's biggest transactions with clarity, care, and expertise – in the language you understand best.&rdquo;
                </p>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;MovWise isn't just a business – it's our commitment to transforming the UK property experience for every home mover, in every language, at every step.&rdquo;
                </p>
                </div>
              </div>


            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {impact.map((impact, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                          <div className="flex items-center mb-3 gap-2">
                     
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {impact.title}
                    </h3>
                    </div>
                    
                    <div className="text-gray-600">{impact.description}</div>
                  </div>
                ))}
              </div>
            </section>
              </section>
              {/* <section>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2">
                <span className="text-2xl">🎖️</span>  Why Choose MovWise?
              </h2>

               <h3 className="text-xl font-semibold text-gray-800 mb-2">You're Not Just a Customer – You're Our Purpose</h3>
                 <p className="mt-6 text-gray-600 leading-relaxed">
               When you choose MovWise, you're choosing:</p>
                <ul className="list-disc pl-5 mt-2 mb-6 space-y-1 text-gray-600">
                  <li>A partner committed to your successful move</li>
                  <li>Technology that makes complex processes simple</li>
                  <li>Transparency that builds confidence</li>
                  <li>Inclusion that ensures everyone can participate</li>
                  <li>Innovation that continuously improves your experience</li>
                </ul>
                </div>
              </section> */}
                  {/* <p className="text-gray-600 mb-4 leading-relaxed">
                We believe great <strong>conveyancing technology</strong> should do more than just compare prices—it should connect people. Our innovative tools streamline the document exchange and communication between you and your chosen firm. We ensure every <strong>Partnership</strong> is with firms that are verified and regulated, providing you with peace of mind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Furthermore, embodying our <strong>Inclusivity</strong> value, we offer <strong>multilingual support</strong> options. We recognize the diverse nature of the UK population and are committed to breaking down language barriers, ensuring a smooth, supported journey for every customer navigating the complexities of the UK property market.
              </p>
              <div className="mt-6 text-center">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300 transform hover:scale-105"
                  onClick={() => console.log("Navigate to Comparison Tool")}
                  aria-label="Start comparing conveyancers"
                >
                  Start Your Smart Move Today
                </button>
              </div> */}
            
          </main>
        </div>
      </div>

      {/* Footer Section (Simplified for display) */}
   <Footer/>
    </div>
  );
}
 