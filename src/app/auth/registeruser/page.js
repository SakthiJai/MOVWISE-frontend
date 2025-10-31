'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {API_BASE_URL} from "../../constants/config"


export default function Register() {
  const [userType, setUserType] = useState('Convencer'); // 'Convencer' or 'customer'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [acceptedTerms, setAcceptedTerms] = useState(false);

  const placeholders = {
    Convencer: {
      name: 'Enter your full name (Convencer)',
      email: 'Enter your official email (Convencer)',
      password: 'Create a password for your Convencer account',
    },
    customer: {
      name: 'Enter your full name (Customer)',
      email: 'Enter your personal email (Customer)',
      password: 'Create a password for your customer account',
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // if (!acceptedTerms) {
    //   alert("You must accept the terms and privacy policy");
    //   return;
    // }

    const payload = {
      name,
      username: email,
      password,
      role_id: userType === 'Convencer' ? '0' : '1',
    };

    console.log("Registering...", payload);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.text();
    console.log("Response:", data);
  };
  const baseUrl = API_BASE_URL;
  

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 font bg-white">
      <div className="bg-white shadow-2xl grid md:grid-cols-12 overflow-hidden w-3/5 rounded-lg">
        {/* Left Section */}
        <div className="bg-gradient-to-r from-[#27a277] to-[#27a277] col-span-5 text-white flex flex-col justify-center items-center p-8">
          <div className="text-center ">
            <h2 className="text-3xl font-light ">Welcome to <br></br > Movwise</h2>
            <p className="mt-2 text-white/80 ">We make it for you</p>

          </div>
          {/* <button className="border border-white mt-7 px-6 py-2 rounded-full hover:bg-white hover:text-[#27a277] transition-all">
           <Link  href={`${baseUrl}/auth/login`}> SIGN IN </Link>
             
          </button> */}
        </div>

        {/* Right Section */}

        <div className="bg-white p-10 col-span-7">
          <h2 className="text-2xl font-semibold text-[#27a277] mb-6 text-center">
            Sign up to Convencing
          </h2>

          <form onSubmit={handleRegister} className="grid gap-4">
            <input
              type="text"
              placeholder={placeholders[userType].name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
            />

            <input
              type="text"
              placeholder="Enter Role"
              value={userType === 'Convencer' ? 'Convencer' : 'Customer'}
              readOnly
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black bg-gray-100 cursor-not-allowed"
            />

            <input
              type="email"
              placeholder={placeholders[userType].email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
            />

            <input
              type="password"
              placeholder={placeholders[userType].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
            />

            {/* <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="accent-[#27a277]"
              />
              <span className="text-sm text-gray-600">
                I accept terms and privacy policy
              </span>
            </div> */}

            <button
          
              type="submit"
              className="w-full bg-[#27a277] hover:bg-[#239267] text-white py-2 rounded-full font-medium transition-all"
            >
                 SIGN UP
              
             
            </button>

            <span className="text-black text-center block mt-2">
              Already have an account?{' '}
              <Link  href={`${baseUrl}/auth/login`} className="text-[#27a277]">
                Login
              </Link>
            </span>
          </form>

          {/* User Type Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setUserType('Convencer')}
              className={`py-1 px-4 rounded-full ${
                userType === 'Convencer' ? 'bg-[#27a277] text-white' : 'bg-gray-200 text-black'
              }`}
            >
              Convencer
            </button>
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`py-1 px-4 rounded-full ${
                userType === 'customer' ? 'bg-[#27a277] text-white' : 'bg-gray-200 text-black'
              }`}
            >
              Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
