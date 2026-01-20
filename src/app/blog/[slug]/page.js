// Required for static export in Next.js app router
"use client";
import Navbar from "../../parts/navbar/page";
import Footer from "../../parts/Footer/footer";
import BlogDetailClient from "./BlogDetailClient";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../../auth/API/api";
import DOMPurify from "dompurify";



export default function Blog() {
const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        console.log("Fetching blog details for slug inside fetchBlog:", API_ENDPOINTS.blogs+"/"+params.slug);
        setLoading(true);
        setError(null);
        // Replace API_ENDPOINTS.blogDetail with your actual endpoint, e.g. `/api/blog/${params.slug}`API_ENDPOINTS.blogs
        const response = await getData(API_ENDPOINTS.blogs+"/"+params.slug);
       // const response = await getData(`${API_ENDPOINTS.blogs}/${params.slug}`);
        if (response && response.data) {
          setBlog(response.data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        setError("Failed to load blog details");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }
    console.log("Fetching blog details for slug:", params);
    fetchBlog();
  }, [params?.slug]);

  return (
    <div className="bg-white antialiased font">
      <div className="bg-white shadow-md sticky top-0 p-4 z-50">
        <Navbar />
      </div>
      <main className="mx-auto max-w-[1200px] pt-2 px-4 lg:px-0 mb-5 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full">

            {loading ? (
              <div className="text-center py-10">Loading blog details...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : blog ? (
              <BlogDetailClient
                title={blog.title || blog.blog_title || "Blog Post"}
                author={blog.author || blog.author_name || "Unknown"}
                date={blog.date || blog.created_at || ""}
                coverImage={blog.coverImage || blog.banner || "/homepage.png"}
                content={
                  <>
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content ) }} />
                    
                  </>
                }
              />
            ) : (
              <div className="text-center py-10">No blog found.</div>
            )}

            {/* Social Media Share Buttons */}

          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
