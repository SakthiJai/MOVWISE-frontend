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
    
    Cookie Policy
  </h1>
</div>
</section></div></main></div>

      <div className="mt-300px"></div>
       <Footer />
    
    </div>
  );
}