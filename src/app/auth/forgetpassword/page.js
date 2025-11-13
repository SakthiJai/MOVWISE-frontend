'use client';
import { useState , useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL } from "../.././constants/config";
import { API_ENDPOINTS, postData } from '../API/api';


export default function Login() {

 
 const [formData, setFormData] = useState({
    "to": "",
    "subject": "",
    "text": "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  useEffect(() => {
    // Load from localStorage or API after hydration
    const saved = localStorage.getItem("to");
    if (saved) setto(saved);
  }, [])
  const [password, setPassword] = useState('');

// const handleLogin = async (e) => {
//   e.preventDefault();

//   if (!to) {
//     alert("Please enter your email");
//     return;
//   }

//   try {
//     const res = await fetch("/api/sendemailotp", {   
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: to }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert(`Email sent successfully to ${to}`);
//     } else {
//       alert(data.message || "Failed to send email");
//     }
//   } catch (error) {
//     console.error("Error sending email:", error);
//     alert("Something went wrong.");
//   }
// };

function sendmail(){
  const response = postData(API_ENDPOINTS.forgetpassword,formData);
  console.log(response);
  
}


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
            width={64}
            height={64}
            className="mx-auto my-8"
            priority
          />

          </div>
              <Link href="/auth/registeruser/" >
            {/* <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#27a277] transition-all">
              SIGN UP
            </button> */}
          </Link>
        </div>

        {/* Right Section */}
        <div className="bg-white p-10 col-span-7">
          <h2 className="text-2xl font-semibold text-[#27a277] mb-6 text-center">
           Enter your Email to Send OTP
          </h2>

          <form  className="grid gap-4">
            <label className='text-[#6A7682]'>Email</label>
         <input
    name="to"
    autoComplete="off"
    formNoValidate
    inputMode="email"
    data-lpignore="true"
    data-1p-ignore="true"
    data-form-type="other"
    type="text"
    placeholder="Enter your Email"
    value={formData.to}
    onChange={handleChange}
    required
    className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
  />

  {/* Subject Input */}
  <label className='text-[#6A7682]'>Subject</label>
  <input
    name="subject"
    autoComplete="off"
    formNoValidate
    inputMode="text"
    data-lpignore="true"
    data-1p-ignore="true"
    data-form-type="other"
    type="text"
    placeholder="Enter Subject"
    value={formData.subject}
    onChange={handleChange}
    required
    className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
  />

  {/* Text Input */}
  <label className='text-[#6A7682]'>Text</label>
  <input
    name="text"
    autoComplete="off"
    formNoValidate
    inputMode="text"
    data-lpignore="true"
    data-1p-ignore="true"
    data-form-type="other"
    type="text"
    placeholder="Enter text"
    value={formData.text}
    onChange={handleChange}
    required
    className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-[#27a277] outline-none text-black"
  />


         

            <button
              type="button"
              className="w-full bg-[#27a277] hover:bg-[#239267] text-white py-2 rounded-full font-semibold transition-all mt-10"
              onClick={sendmail}>
SEND            </button>

            <span className="text-black text-center block mt-2">
              <Link href="/auth/registeruser" className="text-[#27a277]">
Create New Account     </Link></span>   
      
          </form>
        </div>
      </div>
    </div>
  );
}
