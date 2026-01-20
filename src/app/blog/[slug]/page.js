// Required for static export in Next.js app router
export async function generateStaticParams() {

  
  // Fetch blog slugs from the API at build time
  const res = await getData(API_ENDPOINTS.blogs);
  if (!res || !Array.isArray(res.data)) return [];
  return res.data.map(blog => ({ slug: encodeURIComponent(blog.slug) }));
}
import React from "react";
import Navbar from "../../parts/navbar/page";
import Footer from "../../parts/Footer/footer";
import BlogDetailClient from "./BlogDetailClient";
//import React, { useEffect, useState } from "react";
//import { useParams } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import DOMPurify from "dompurify";



export default function Blog({ params }) {

  // Get the slug from params
  const slug = params?.slug;
  console.log("Blog slug from params:", slug);

  // Fetch the blog details synchronously (for static export)
  // Note: This function must be async for this to work
  // But Next.js will call this as an async server component
  //const [blog, setBlog] = React.useState(null);
 

  return (
    <div className="bg-white antialiased font">
      <div className="bg-white shadow-md sticky top-0 p-4 z-50">
        <Navbar />
      </div>
      <main className="mx-auto max-w-[1200px] pt-2 px-4 lg:px-0 mb-5 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full">
            <BlogDetailClient slug={slug} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
