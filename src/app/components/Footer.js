



import { FaArrowRight } from "react-icons/fa";

export default function Footer() {
  
  return (
    <div className="flex flex-col">
      {/* ---------------- HEADER ---------------- */}
     {}


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
          <li><a href="/blog">Advice / Blog</a></li>
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
