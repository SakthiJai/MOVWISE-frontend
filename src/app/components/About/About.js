"use client";

import { Lightbulb, Users, Globe,  Search ,Rocket,Handshake , BarChart3, HeartHandshake,Phone ,Sparkles,Award, Star ,Target,Home, UsersIcon, Heart, Check, X  } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../parts/navbar/page";
import Link from "next/link";
import Footer from "../../parts/Footer/footer";

const values = [
  {
    title: "Making Every Home Move Smarter",
    descriptionItems: [
      "AI-powered matching that connects you with solicitors who specialise in your specific property type",
      "Real-time case tracking so you're never left wondering about progress",
      "Smart quote analysis that highlights the best value, not just the cheapest price",
    ],
    icon: Lightbulb,
    color: "text-yellow-400",
  },
  {
    title: "Making Every Home Move Simpler",
    descriptionItems: [
      "3-step quote system that takes minutes, not hours",
      "Plain English explanations of complex legal terms",
      "One-platform management for all your legal conveyancing needs",
    ],
    icon: Globe,
    color: "text-yellow-400",
  },
  {
    title: "Making Every Home Move More Supported",
    descriptionItems: [
      "Multilingual support team available throughout your journey",
      "Real-time case tracking so you're never left wondering about progress",
      "Educational resources that empower your decisions",
    ],
    icon: Users,
    color: "text-green-700",
  },
];

const about = [
  {
    iconSymbol: Search,
    titleText: "Transparency That Builds Trust",
    descriptionItems: [
      "All-inclusive quotes with no hidden fees",
      "Upfront commission disclosure – we're open about how we're paid",
      "Clear solicitor reviews from verified customers",
      "Real-time progress updates without chasing",
      "Open communication channels with your chosen firm",
    ],
    quote:
      "We show you exactly what you're paying for, why it costs that much, and who you're paying it to.",
    color: "text-green-700",
  },
  {
    iconSymbol: Globe,
    titleText: "Inclusivity Through Language & Access",
    descriptionItems: [
      "10+ language support including Tamil, Telugu, Hindi, Malayalam, Spanish, Polish, Urdu, Arabic etc",
      "Native-speaking solicitors who understand cultural nuances",
      "Accessible design for all abilities and tech comfort levels",
      "No-jargon approach to legal explanations",
      "Extended support hours for different time zones",
    ],
    quote:
      "Whether you're a first-time buyer in Birmingham or Skilled Worker in Reading or an international investor in London, your language shouldn't be a barrier to understanding your property transaction.",
    color: "text-green-700",
  },
  {
    iconSymbol: Rocket,
    titleText: "Innovation That Serves People",
    descriptionItems: [
      "Smart matching algorithm considering language, location, and specialism",
      "Digital document management with secure cloud storage",
      "Automated progress tracking that saves everyone time",
      "Integrated SDLT calculator for instant cost planning",
      "Mobile-first platform designed for busy lives",
    ],
    quote:
      "We use technology not to replace human expertise, but to enhance it – connecting you with the right legal expert faster and more efficiently.",
    color: "text-yellow-400",
  },
  {
    iconSymbol: Handshake,
    titleText: "Partnership With Purpose",
    descriptionItems: [
      "SRA/CLC-regulated firms only – no unqualified practitioners",
      "Rigorous vetting process for all partner solicitors",
      "Continuous performance monitoring based on real client feedback",
      "Ethical commission structure that aligns with your success",
      "Regular training partnerships to maintain high standards",
    ],
    quote:
      "We partner with legal experts who share our commitment to excellence, transparency, and client care.",
    color: "text-yellow-400",
  },
];

const impact = [
  {
    iconSymbol: BarChart3,
    titleText: "Our Impact",
    descriptionItems: [
      "10,000+ home movers find the right conveyancer",
      "Save an average of £600 on legal fees through comparison",
      "Connect 500+ non-English speakers with solicitors who speak their language",
      "Reduce completion times by 25% through better matching",
      "Maintain a 4.8/5 customer satisfaction rating",
    ],
    color: "text-yellow-400",
  },
  {
    iconSymbol: HeartHandshake,
    titleText: "Our Social Responsibility",
    descriptionItems: [
      "Pro bono / Free services for vulnerable home movers",
      "Educational workshops in community languages",
      "Partnerships with Charities & Community Groups",
      "Environmental initiatives in our operations",
    ],
    color: "text-yellow-400",
  },
];

const chooseus = [
  {
    icon: UsersIcon,
    titleText: "Property Experts Who Understand",
    descriptionItems: [
      "Former conveyancing solicitors who know the process inside-out",
      "Multilingual support specialists with legal translation experience",
      "Technology developers focused on user-friendly solutions",
      "Customer service professionals trained in property law basics",
    ],
    color: "text-yellow-400",
  },
  {
    icon: Handshake,
    titleText: "You're Not Just a Customer – You're Our Purpose",
    descriptionItems: [
      "A partner committed to your successful move",
      "Technology that makes complex processes simple",
      "Transparency that builds confidence",
      "Inclusion that ensures everyone can participate",
      "Innovation that continuously improves your experience",
    ],
    color: "text-yellow-400",
  },
];

export default function AboutPage() {
  return (
    <div className="font">
      <Head>
        <title>
          MovWise | Compare Conveyancing Quotes &amp; Move with Confidence
        </title>
      </Head>

      {/* Sticky Navigation Bar */}
      <div className="bg-white shadow-md sticky top-0 p-4">
        <Navbar originalstyle={true} />
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 mt-20">
        {/* Header/Hero Section */}
        <header className="text-white p-8 sm:p-12 text-center rounded-t-2xl">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            About MovWise
          </h1>
          <p
            className="text-base font-semibold tracking-wide uppercase mt-2"
            style={{ color: "#008236" }}
          ></p>
        </header>

        {/* Core Content Section */}
        <main className="p-6 sm:p-12 space-y-12" style={{ paddingTop: 0 }}>
          {/* Mission & Overview */}
          <section>
             <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              < Home  className="w-7 h-7 text-green-700" />  Our Story: Revolutionising Conveyancing
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed text-justify">
              MovWise was born from a simple observation: The UK property market
              was leaving millions behind. Home movers faced confusing quotes,
              hidden fees, legal jargon, and language barriers that turned their
              dream move into a stressful ordeal
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed text-justify">
              MovWise was <strong>founded in 2020</strong> by property and
              technology experts who witnessed the UK conveyancing market failing
              two key groups: <strong>first-time buyers</strong> overwhelmed by
              complex legal jargon, and <strong>non-English speakers / Foreign
              Nationals</strong> struggling with language barriers that put their
              dream homes at risk. We saw brilliant people—from
              <strong> Skilled workers to NHS Doctors </strong> —signing documents
              they didnt understand, paying for services they couldnt explain,
              and facing costly misunderstandings, all within a system that seemed
              designed to confuse rather than clarify.
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed text-justify">
              MovWise was created to
              <strong> bridge this gap, providing clarity through transparent
              processes and multilingual support</strong> to ensure every home
              mover can proceed with confidence.
            </p>
          </section>

          {/* Values Section */}
          <section>
             <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              < Target className="w-7 h-7 text-green-700" />  Our Mission Deep Dive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="flex items-center mb-3 gap-2">
                    <value.icon className={`w-8 h-8 mb-3 ${value.color}`} />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {value.title}
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    {value.descriptionItems.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Technology & Accessibility Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              < Sparkles  className="w-7 h-7 text-yellow-400" /> Our Values in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {about.map((a, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
  <a.iconSymbol className={`w-6 h-6  ${a.color}`}  />
  {a.titleText}
</h3>

                  <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 max-h-40 overflow-y-auto text-gray-600">
                    {a.descriptionItems.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner">
                    <p className="text-gray-700 italic text-lg">&ldquo;{a.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose MovWise? Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              < Award className="w-7 h-7 text-green-700" />  Why Choose MovWise?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chooseus.map((c, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-2 gap-2">
                    <c.icon className={`w-6 h-6  ${c.color}`}  />
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

          {/* Why We're Different Table */}
        <section className="mt-12">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2 border-b-2 border-green-600 pb-2">
    <Star className="w-7 h-7 text-yellow-400" />
    Why We Are Different
  </h2><div className="inline-block border border-gray-300 rounded-xl overflow-hidden shadow-md shadow-gray-300 ml-80">
  <table className="border-collapse">
    
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-3 text-left items-center font-semibold text-gray-700">
          Traditional
        </th>
        <th className="py-2 px-3 text-center font-semibold text-gray-700">
          Traditional Approach
        </th>
        <th className="py-2 px-3 text-center font-semibold text-gray-700">
          <span className="font-extrabold text-[#1E5C3B] text-[20px]">MovWise</span> Solution
        </th>
      </tr>
    </thead>

    <tbody className="bg-white text-gray-700">
      
      {/* <tr className="border-t">
        <td className="py-2 px-3">Complex legal jargon</td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
      </tr>

      <tr className="border-t bg-gray-50">
        <td className="py-2 px-3">Language barriers</td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline" strokeWidth={4}/>
        </td>
      </tr>

      <tr className="border-t">
        <td className="py-2 px-3">Hidden costs</td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
      </tr>

      <tr className="border-t bg-gray-50">
        <td className="py-2 px-3">One-size-fits-all</td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
      </tr>

      <tr className="border-t">
        <td className="py-2 px-3">“Just trust us” attitude</td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
      </tr> */}
      <tr className="border-t">
        <td className="py-2 px-3">Plain English explanations</td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
      </tr>
      <tr className="border-t">
        <td className="py-2 px-3">Native-language solicitors</td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline" strokeWidth={4} />
        </td>
      </tr>
      <tr className="border-t">
        <td className="py-2 px-3">All-inclusive fixed quotes</td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline" strokeWidth={4} />
        </td>
      </tr>
      <tr className="border-t">
        <td className="py-2 px-3">Personalised matching</td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline" strokeWidth={4} />
        </td>
      </tr>
      <tr className="border-t">
        <td className="py-2 px-3"> Complete transparency</td>
        <td className="py-2 px-3 text-center">
          <X className="w-5 h-5 text-red-600 inline"strokeWidth={4} />
        </td>
        <td className="py-2 px-3 text-center">
          <Check className="w-5 h-5 text-green-700 inline"strokeWidth={4} />
        </td>
      </tr>

    </tbody>
  </table>
</div>


  
</section>


          {/* Our Promise Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-2 flex items-center gap-2">
  <Phone  className="w-7 h-7 text-green-700" />
  Our Promise to You:
</h2>

            <div>
              <p className="mt-6 mb-6 text-gray-600 leading-relaxed text-justify">
                We believe your dream home shouldnt be lost in translation or
                buried in legal jargon. We are the bridge between confusion and
                confidence, ensuring every home mover - regardless of language or
                legal knowledge - can proceed with clarity and certainty.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner mb-6">
                <p className="text-gray-700 italic text-lg">
                  &ldquo;We will guide you through one of life biggest
                  transactions with clarity, care, and expertise – in the language
                  you understand best.&rdquo;
                </p>
                <p className="text-gray-700 italic text-lg">
                  &ldquo;MovWise isnt just a business - its our commitment to
                  transforming the UK property experience for every home mover, in
                  every language, at every step.&rdquo;
                </p>
              </div>
            </div>

            {/* Impact Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {impact.map((imp, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <imp.iconSymbol className={`w-6 h-6 ${imp.color}`} />
                      {imp.titleText}
                    </h3>
                    <ul className="list-disc pl-5 mt-2 mb-4 space-y-1 max-h-40 overflow-y-auto text-gray-600">
                      {imp.descriptionItems.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </main>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
