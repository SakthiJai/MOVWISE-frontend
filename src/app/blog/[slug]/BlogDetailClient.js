"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogDetailClient({ title, author, date, coverImage, content }) {
  return (
    <article className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>By {author}</span>
          <span>•</span>
          <time>{date}</time>
        </div>
      </header>

      {/* Social Media Share Buttons */}


      <Image
        src={coverImage}
        alt="Blog Cover"
        width={1200}
        height={600}
        className="rounded-lg mb-6 object-cover w-full h-64"
      />
      <div className="prose prose-lg max-w-none text-gray-800">
        {content}
      </div>
      <div className="prose prose-lg max-w-none text-gray-800">
        <p className="mt-4 text-lg text-gray-500">Compare fixed-fee quotes from trusted UK conveyancers and solicitors in minutes. MovWise helps you find the right legal partner to buy, sell, or remortgage your home — faster, clearer, and smarter.</p>
<div class="mt-8 text-center"><a href="/#quote_type"><div class="text-blue-500 underline"><button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300">Get Your Free Quote →</button></div></a></div>
      </div>

      
                  <div className="flex gap-3 mt-8 mb-4 justify-center">
                    <b>Share this article </b>
              <a
                href="#"
                title="Share on Facebook"
                className="p-2 rounded-full hover:bg-[#F6CE53] transition"
                aria-label="Share on Facebook"
              >
                <svg width="28" height="28" fill="#1E5C3B" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a
                href="#"
                title="Share on Twitter"
                className="p-2 rounded-full hover:bg-[#F6CE53] transition"
                aria-label="Share on Twitter"
              >
                <svg width="28" height="28" fill="#1E5C3B" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.016-.634A9.936 9.936 0 0 0 24 4.557z"/></svg>
              </a>
              <a
                href="#"
                title="Share on LinkedIn"
                className="p-2 rounded-full hover:bg-[#F6CE53] transition"
                aria-label="Share on LinkedIn"
              >
                <svg width="28" height="28" fill="#1E5C3B" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z"/></svg>
              </a>
            </div>
    </article>
  );
}
