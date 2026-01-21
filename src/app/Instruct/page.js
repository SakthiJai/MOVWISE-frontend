import Navbar from "../parts/navbar/page";
import Footer from "../parts/Footer/footer";
import { CircleCheckBig, TicketCheck } from "lucide-react";

export default function Page() {
  return (
    <div>
        <Navbar></Navbar>

 




   <section className="py-16 bg-white font">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-8 rounded-xl border border-emerald-300 bg-emerald-50 shadow-lg">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Thank you for your quote submission to Movwise.
</h2>
              {/* <p className="text-lg text-gray-700 mb-6">
                  MovWise includes a <strong>small support fee</strong> covering essential services that guarantee a smoother, clearer process:
              </p> */}

              <ul className="grid md:grid-cols-1 gap-4 text-gray-700 list-none p-0 mb-6">
                  <li className="flex items-center">  <CircleCheckBig className="mr-2 text-green-600" />
Your information has been successfully received and is now being reviewed by our  specialists.                  </li>
                  <li className="flex items-center"><CircleCheckBig className="mr-2 text-green-600" />
We are currently assessing your details to prepare an accurate and comprehensive quote tailored to your circumstances.                  </li>
                  <li className="flex items-center"><CircleCheckBig className="mr-2 text-green-600" />
You will receive your detailed quotation shortly by email(Please check your Inbox,Incase in your spam folder).
                  </li>
                  <li className="flex items-center"><CircleCheckBig className="mr-2 text-green-600" />
We appreciate your interest in Movwise services and remain committed to providing you with clear, efficient, and reliable support throughout this process.
                  </li>
              </ul>

              <p className="text-xl font-semibold text-emerald-800 border-t border-emerald-200 pt-4 mt-4">
             A small price for complete peace of mind — especially when every property detail matters.
              </p>
          </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

