
// import { FaArrowRight } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-[#1B1C1E] text-white px-6 md:px-45 py-12">
//       <div className="flex flex-col lg:flex-row justify-between gap-12">
//         {/* Left Column */}
//         <div className="flex-1">
//           {/* Logo */}
//           <h2 className="text-3xl font-bold text-green-600 flex items-center space-x-1">
//             <span>Mov</span>
//             <span className="text-white relative">
//               <span className="absolute -top-3 left-1 text-yellow-400 font-bold text-sm">^</span>
//               wise
//             </span>
//           </h2>

//           {/* Description */}
//           <p className="mt-4 text-sm text-gray-300 max-w-sm">
//             Licensed for all Conveyancing matters within New South Wales, with focus on Newcastle, Hunter Valley, Lake Macquarie, Central Coast and Sydney.
//           </p>

//           {/* Contact Info */}
//           <p className="mt-4 text-sm text-gray-300 mb-4">loramipsum@movewise.uk</p>
//           <p className="text-sm text-gray-300">+91 78 987 123</p>

//           {/* Button */}
//           <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-5 py-2 rounded-full flex items-center space-x-2">
//             <span>Learn More</span>
//             <FaArrowRight />
//           </button>
//         </div>

//         {/* Right Columns */}
// <div className="flex space-x-10 gap-15 right-[3px] text-sm">
//   <div className="flex-1 p-1 m-1">
//   <h3 className="font-bold m-0 mb-5">Nav</h3> {/* Add margin-bottom here */}
//   <ul className="space-y-2 text-gray-300 p-0 m-0">
//     <li>About</li>
//     <li>Resources</li>
//     <li>Contact</li>
//   </ul>
// </div>


//   <div className="flex-1 p-1 m-1">
//   <h3 className="font-bold m-0 mb-5">Services</h3> {/* Added mb-2 */}
//   <ul className="space-y-2 text-gray-300 p-0 m-0">
//     <li>Buying</li>
//     <li>Selling</li>
//     <li>Advice / Blog</li>
//   </ul>
// </div>

// <div className="flex-1 p-1 m-1">
//   <h3 className="font-bold m-0 mb-5 text-white">Contact</h3> {/* Added mb-2 */}
//   <ul className="space-y-2 text-gray-300 p-0 m-0">
//     <li>movise.com Ltd</li>
//     <li>Eclipse Court</li>
//     <li className="whitespace-nowrap">14B Chequer Street</li> {/* Prevent line break */}
//     <li>St Albans</li>
//     <li>AL1 3YD</li>
//   </ul>
// </div>

// </div>







//       </div>

//       {/* Bottom Row: Socials */}
      
// <div className="mt-6 text-gray-400 text-sm space-x-4 flex ml-190 ">
//   <a href="#" className="hover:text-white">Facebook</a>
//   <span>|</span>
//   <a href="#" className="hover:text-white">Instagram</a>
//   <span>|</span>
//   <a href="#" className="hover:text-white">LinkedIn</a>
// </div>






//     </footer>
//   );
// }


import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex flex-col">
      {/* ---------------- HEADER ---------------- */}
     {/* <header className="flex items-center justify-between px-10 py-6 bg-white">
  <div className="flex items-center space-x-1">
    <h1 className="text-2xl font-bold">Mover</h1>
    <span className="text-yellow-400 text-lg">^</span>
  </div>

  <div className="flex items-center space-x-8">
    <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
      <a href="#" className="text-green-700 border-b-2 border-green-700 pb-1">
        Home
      </a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Advice / Blog</a>
      <a href="#">Resources</a>
    </nav>

    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full flex items-center space-x-2">
      <span>Register</span>
      <FaArrowRight />
    </button>
  </div>
</header> */}


      {/* ---------------- MAIN CONTENT (empty, can add later) ---------------- */}
      {/* <main className="flex-1"></main> */}

      {/* ---------------- FOOTER ---------------- */}
   <footer className="bg-[#161719] text-white px-10 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
    {/* Left Column */}
    <div>
      {/* Logo */}
      <div
        className="relative w-max text-2xl font-bold"
        style={{ color: "#4A7C59" }}
      >
        <span className="absolute -top-2 left-[32px] text-yellow-400 text-lg font-light">
          ^
        </span>
        Movwise
      </div>

      {/* Description */}
      <p className="text-xs text-gray-300 mt-4 leading-5 max-w-xs">
        Licensed for all Conveyancing matters within New South Wales, with focus
        on Newcastle, Hunter Valley, Lake Macquarie, Central Coast and Sydney.
      </p>

      {/* Contact Info */}
      <p className="mt-4 text-gray-300 text-xs">loramipsum@movewise.uk</p>
      <p className="mt-1 text-gray-200 text-xs">+91 78 987 123</p>

      {/* Button */}
      <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-5 rounded-full flex items-center gap-2">
        Learn More <FaArrowRight className="text-sm" />
      </button>
    </div>

    {/* Right Column (Nav, Services, Contact) */}
    <div className="flex justify-end space-x-12">
      {/* Nav */}
      <div>
        <h4 className="font-semibold mb-4 p-1 m-1">Nav</h4>
        <ul className="space-y-2 text-gray-300 text-sm p-1 m-1">
          <li><a href="#">About</a></li>
          <li><a href="#">Resources</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="font-semibold mb-4  p-1 m-1" >Services</h4>
        <ul className="space-y-2 text-gray-300 text-sm  p-1 m-1">
          <li><a href="#">Buying</a></li>
          <li><a href="#">Selling</a></li>
          <li><a href="#">Advice / Blog</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-4  p-1 m-1" >Contact</h4>
        <p className="text-gray-300 text-sm  p-1 m-1">movise.com Ltd</p>
        <p className="text-gray-300 text-sm  p-1 m-1">Eclipse Court</p>
        <p className="text-gray-300 text-sm whitespace-nowrap  p-1 m-1">
          14B Chequer Street
        </p>
        <p className="text-gray-300 text-sm  p-1 m-1">St Albans</p>
        <p className="text-gray-300 text-sm  p-1 m-1">AL1 3YD</p>
      </div>
    </div>
  </div>

  {/* Social Links */}
  <div className="mt-8 text-gray-400 text-sm flex space-x-4 max-w-7xl mx-auto  ml-245">
    <a href="#" className="hover:text-white">Facebook</a>
    <span>|</span>
    <a href="#" className="hover:text-white">Instagram</a>
    <span>|</span>
    <a href="#" className="hover:text-white">LinkedIn</a>
  </div>
</footer>


    </div>
  );
}
