'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Login() {


  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { username, password };
    console.log("Logging in...", payload);

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        console.log("Token saved:", data.token);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong during login.");
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
            Login to Convencing
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

            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
            />

            <button
              type="submit"
              className="w-full bg-[#27a277] hover:bg-[#239267] text-white py-2 rounded-full font-semibold transition-all"
            >
              LOGIN
            </button>

            <span className="text-black text-center block mt-2">
              <Link href="/auth/registeruser" className="text-[#27a277]">
Create New Account        
      </Link><span className='m-4'>Or</span>
      <Link href="/auth/forgetpassword/" className="text-[#27a277]">Forget Password</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
