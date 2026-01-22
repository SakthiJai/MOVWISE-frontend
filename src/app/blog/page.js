// Format ISO date string to 'Mon DD, YYYY'
"use client";
function formatBlogDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

import React, { useEffect, useState,useRef } from "react";

import Navbar from "../parts/navbar/page";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getData, postData, API_ENDPOINTS } from "../auth/API/api";

import Footer from "../parts/Footer/footer";




export default function Blog() {
const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        // Replace API_ENDPOINTS.blogs with your actual endpoint for blogs
        const response = await getData(API_ENDPOINTS.blogs);
        if (response && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError("Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);
    

  // State to hold companies data (initialized with static data)
 

  return (
 <div className=" bg-white antialiased font ">
   
            <div className='bg-white shadow-md sticky top-0 p-4 z-50'>
            <Navbar />
            </div>
                <main className="mx-auto max-w-[1200px] pt-2 px-4 lg:px-0 mb-5 mt-20">
                   <div className="flex flex-col lg:flex-row gap-8">
                    <section className="w-full">
                      <h2 class="text-3xl font-bold text-emerald-800 mb-4 text-center">Conveyancing advice and guides</h2>

                      {/* Blog list: 3 columns per row on large screens, 2 rows (6 cards) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((data, i) => (
                          <Link href={`/blog/${data.slug}`} key={i}>
                            <article
                              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform duration-150"
                            >
                              <div className="w-full h-40 bg-gray-100 overflow-hidden">
                                <Image
                                  src={data.banner}
                                  alt={`Blog ${i + 1}`}
                                  width={1200}
                                  height={600}
                                  className="object-cover w-full h-full"
                                />
                              </div>

                              <div className="p-4">
                                <time className="text-xs text-gray-500">{formatBlogDate(data.created_at)}</time>
                                <h3 className="text-lg font-bold text-emerald-800 mb-4">
                                  {data.blog_title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                  {data.sub_title}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                  <Link href={`/blog/${data.slug}`} className="text-emerald-600 font-medium">
                                    Read more
                                  </Link>
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>

                    </section>
                    </div>
                </main>
      
                <Footer />
            </div>
  );
}
