'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Login() {

      // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://movwise.digitalcloudies.in/';
  const baseUrl = 'https://movwise.digitalcloudies.in/';

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  if (!username) {
    alert("Please enter your email");
    return;
  }

  try {
    const res = await fetch("/api/sendemailotp", {   
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Email sent successfully to ${username}`);
    } else {
      alert(data.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Something went wrong.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaeaea] px-4 font">
      <div className="bg-white shadow-2xl grid md:grid-cols-12 overflow-hidden w-3/5 rounded-lg">
        {/* Left Section */}
        <div className="bg-gradient-to-r from-[#27a277] to-[#27a277] col-span-5 text-white flex flex-col justify-center items-center p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-white/80">Glad to see you again!</p>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
              alt="Login Icon"
              className="w-16 mx-auto my-8"
              width={2}
              height={2}
            />
          </div>
              <Link href="/auth/registeruser/" >
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#27a277] transition-all">
              SIGN UP
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="bg-white p-10 col-span-7">
          <h2 className="text-2xl font-semibold text-[#27a277] mb-6 text-center">
           Enter your Email to Send OTP
          </h2>

          <form onSubmit={handleLogin} className="grid gap-4">
            <input
              type="text"
              placeholder="Enter your  Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
            />

         

            <button
              type="submit"
              className="w-full bg-[#27a277] hover:bg-[#239267] text-white py-2 rounded-full font-semibold transition-all mt-10"
            >
SEND            </button>

            <span className="text-black text-center block mt-2">
              <Link href="/auth/registeruser" className="text-[#27a277]">
Create New Account        
      </Link><span className='m-4'>Or</span>
      <Link href="/auth/password/" className="text-[#27a277]">Forget Password</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
