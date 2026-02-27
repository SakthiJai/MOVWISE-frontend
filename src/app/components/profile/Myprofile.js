"use client"

import React, { useState,useEffect, useRef } from 'react'
import Navbar from '../../parts/navbar/page';
import Footer from '../../parts/Footer/footer';
import PriceBreakdownCard from './pricebreakdown'
import { API_ENDPOINTS, getData, postData } from '../../auth/API/api';
import { BookCheckIcon, User } from 'lucide-react';


const Myprofile = () => {
  useEffect(() => {
  console.log("Myprofile rendered");
});

  const childRef = useRef();

  const [show, setshow] = useState(true);
  const [logintype,setlogintype]=useState();
  const [showPopup, setShowPopup] = useState(false);
  const [Image,setImage]=useState("");
    const [imageerror, setimageerror] = useState("");
  

  const [user,setuser]=useState({
    first_name:"",
    last_name:"",
    phone_number:"",
    email:"",
    password:"",
    logo:"",

  }
  )
    const [userpayload,setuserpayload]=useState({
    first_name:"",
    last_name:"",
    phone_number:"",
    email:"",
    password:"",
    logo:"",

  }
  )

  const[company,setcompany]=useState([]);
  const[quoteUser,setquoteUser]=useState({});
  const[servicedetails,setservicedetails]=useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
 ;


  const [preview, setPreview] = useState(false);
  const loginType = typeof window !== "undefined" 
  ? localStorage.getItem("logintype") 
  : null;


useEffect(() => {
  if (localStorage.getItem("logintype")) {
    let user_type = localStorage.getItem("logintype")
      setlogintype(user_type);

      fetchapi();
    }
  }, []);  

    useEffect(() => {
    if (selectedQuoteId && childRef.current) {
      childRef.current.refreshCard();
    }
  }, [selectedQuoteId]);





  async function fetchapi() {
    console.log("Fetching profile data for login type:", logintype);
    try{
      if(localStorage.getItem("user")){
         const payload = {
      user_id: Number(localStorage.getItem("user")),
      type:localStorage.getItem("logintype"),
    };
console.log(payload)
      
   let profiledetails = await postData(API_ENDPOINTS.intstructquote_list,payload);
  
   let userprofile=profiledetails.data[0].user_details
   let companydetails = profiledetails.data[0].company_details
   
   console.log(userprofile)
   console.log(companydetails)
 
   setuser({
    first_name:userprofile[0].first_name,
    last_name:userprofile[0].last_name,
    phone_number:userprofile[0].phone_number,
email:userprofile[0].email,
logo:userprofile[0].logo,
   })

   setcompany(companydetails)
   setquoteUser(profiledetails.data[0].user_details)
   console.log("companydetails",profiledetails.data[0].user_details)
      console.log("companydetails",profiledetails.data[0].company_details)

       }
  }
     catch(e){
    console.log(e)
  }
  
  }
 


  // -----------------------------------

  function handlechangepage(val) {
    // Note: The original logic is correct, ensuring `val` is compared properly.
    setshow(val === 1); 
  }
  function handlecom_detailsopen(property_id){
    setSelectedQuoteId(property_id)
    console.log(selectedQuoteId)
    setShowPopup(true)
     

    console.log("<>selectedQuoteId",selectedQuoteId);
  }
  const handleImageChange = (e) => {
    console.log( e.target.files[0]);
    const file = e.target.files[0];
    
setimageerror("");
        const MAX_SIZE = 2 * 1024 * 1024; 

  if (file.size > MAX_SIZE) {
    setimageerror("File size exceeds 2MB limit");
    console.log(imageerror)
    e.target.value = ""; 
    setPreview(true)
    return;
  }
    if (file) {

      setPreview(URL.createObjectURL(file)); // Creates preview URL

         const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String); // ✅ for previe
      };

      reader.readAsDataURL(file);
    }
  
  };

  // Helper component to render the status button with dynamic colors (Unchanged)
  const StatusButton = ({ status }) => {
    let colorClass = '';
    switch (status) {
      case 'Active':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'Published':
        colorClass = 'bg-blue-100 text-blue-800';
        break;
      case 'Draft':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }
    return (
      <span
        className={`class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full" ${colorClass}`}
      >
        {status}
      </span>
    );
  };
 const getStatusLabel = (status) => {
  switch (status) {
    case 2:
      return "Customer Requested";
    case 3:
      return "Admin Approved";
    case 4:
      return "You have accepted";
    case 5:
      return "Quote is under progress";
    case 6:
      return "Rejected by you";
    case 7:
      return "Quote is about to completed";
    default:
      return "Unknown";
  }
};
const getServiceTypeLabel = (type) => {
  switch (type) {
    case 1:
      return "Sale&Purchase";
    case 2:
      return "Purchase";
    case 3:
      return "Sales";
    case 4:
      return "Remortage";
    default:
      return "Transfer of Equity";
  }
};
function handleprofilechange(e) {
  if(imageerror!=""){
    return;
  }
  e.preventDefault();
console.log(e.target)
  const formData = new FormData(e.target);

  const values = Object.fromEntries(formData.entries());
    console.log(values);


  // get file explicitly

  values.existing_logo = Image; // File object

  console.log(Image);
  console.log(values);
  postprofiledetails(values)
 
}

async function  postprofiledetails(values){
  let userid = localStorage.getItem('user');
  console.log(userid)
 try{
let response = await postData(
  `${API_ENDPOINTS.update_user_profile}/${userid}`,
  values
);    console.log(response)
  }
  catch(e){
    console.log(e)
  }
}

  // Content for the 'MY Profile' section (Unchanged)
  const ProfileContent = () => (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Your Profile</h2>
      <div className="">
              <div className="p-8">
                {/* Breadcrumb */}
               

               
              

                <form className="mt-2" onSubmit={handleprofilechange}>
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">First Name</label>
                      <input
                      defaultValue={user.first_name}
                
                        id="firstName"
                        name="first_name"
                        placeholder="Enter your Firstname"
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Last Name</label>
                      <input
                      defaultValue={user.last_name}
                      
                        id="lastName"
                        name="last_name"
                        placeholder="Enter your Lastname"

                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Email</label>
                      <input
                      defaultValue={user.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your Email"

                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Phone No.</label>
                      <div className="">
                        <input
                        defaultValue={user.phone_number}
                          id="phone"
                          name="phone_number"
                        placeholder="Enter your Number"

                          className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                        />
                        {/* optional divider mimic for country code */}
                        <div className="pointer-events-none absolute left-[108px] top-1/2 -translate-y-1/2 h-[28px] w-px bg-[#E5E7EB]" />
                        
                      </div>
                    </div>
                  </div>
                  {/* ROW 3 */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                      <label htmlFor="password" className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1 font">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue={user?.password||''}
                        placeholder="Enter your Password"
                    
                        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
                      />
                      
                        <button className='mt-20 ms-5 p-2  bg-green-600 rounded-sm'>
                  Save Changes
                 </button>

                    </div>
                    
                        <div>
      <label
        htmlFor="existing_logo"
        className="block text-[14px] text-[#6A7682] font-outfit font-medium mb-1"
      >
        Upload Image
      </label>

      <input
        id="image"
        name="existing_logo"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full h-[44px] rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] text-[#1B1D21] placeholder-[#1B1D21] focus:outline-none focus:ring-2  font-semibold font"
      />
<span className='text-red-600'>{imageerror}</span>
      {/* Image Preview */}
      {true && (
      
       <div className="mt-3">
        
  <img
    src={preview || user.logo||null}
      
    className="w-32 h-32 object-cover rounded-full border text-center text-gray-400"
  />
</div>

      )}
    </div>
                  </div>
                  

                  {/* Checkbox */}
               
                </form>
              </div>
            </div>
    </div>
  );
 

  // Content for the 'MY Quotes' section (Unchanged)
//   const QuotesContent = () => (
    
//     <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font h-[500px] overflow-auto" >
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Requested Quote List </h2>
//      <div className="overflow-x-auto">
//   <table className="min-w-full  table-auto">
//     <thead>
//       <tr className="bg-gray-100 text-left text-black">
//         <th className="p-3 border font-semibold">S.No</th>
//         <th className="p-3 border font-semibold">Service</th>
//         <th className="p-3 border font-semibold">Property Location</th>
//         <th className="p-3 border font-semibold">Property Price</th>
//         <th className="p-3 border font-semibold"> {localStorage.getItem("logintype") == "user" ? "Conveyancer Name" : "Customer Name"}</th>
//         <th className="p-3 border font-semibold">Status</th>
//         <th className="p-3 border font-semibold">View</th>
//       </tr>
//     </thead>

    

//     <tbody>
//       {company.map((quote, index) => (
//     <React.Fragment key={index}> 
//            {((quote.status>1) && (localStorage.getItem("logintype")=="partner")) &&(
// <tr
//           key={index}
//           className="hover:bg-gray-50 transition duration-150 text-black"
//         >
//           <td className="p-3 ">{index + 1}</td>
//           <td className="p-3 ">{getServiceTypeLabel(quote.service_type)}</td>

//           <td className="p-3 ">
//             {quote.service_type == 2
//               ? quote.purchase_country
//               : quote.sales_country}
//           </td>
            
//           <td className="p-3 ">£ {quote.purchase_price}</td>
//           <td className="p-3 "> {loginType === "user" ? quote.company_name : quoteUser[0].first_name + quoteUser[0].last_name} {}</td>

//           <td className="p-3 ">
//             <StatusButton
//             status={ getStatusLabel(quote.status)}
//             />
//           </td>

//           <td className="p-3  text-center ">
//        <button onClick={()=>{handlecom_detailsopen(quote.property_id)}} className='bg-blue-100 text-blue-800 px-3  py-1 text-xs font-semibold rounded-full'>
//               View
//             </button>
//           </td>
//         </tr>
//         )}
//         </React.Fragment>



        
        
        
//       ))}
//      {company.map((quote, index) => (
//     <React.Fragment key={index}> 
//            {((quote.status>0) && (localStorage.getItem("logintype")=="user")) &&(
// <tr
//           key={index}
//           className="hover:bg-gray-50 transition duration-150 text-black"
//         >
//           <td className="p-3 ">{index + 1}</td>
//           <td className="p-3 ">{getServiceTypeLabel(quote.service_type)}</td>

//           <td className="p-3 ">
//             {quote.service_type == 2
//               ? quote.purchase_country
//               : quote.sales_country}
//           </td>
            
//           <td className="p-3 ">£ {quote.purchase_price}</td>
//           <td className="p-3 "> {loginType === "user" ? quote.company_name : quoteUser[0].first_name + quoteUser[0].last_name} {}</td>

//           <td className="p-3 ">
//             <StatusButton
//             status={ getStatusLabel(quote.status)}
//             />
//           </td>

//           <td className="p-3  text-center ">
//                           <button onClick={()=>{handlecom_detailsopen(quote.property_id)}} className='bg-blue-100 text-blue-800 px-3  py-1 text-xs font-semibold rounded-full'>

           
            
//               View
//             </button>
//           </td>
//         </tr>
//         )}
//         </React.Fragment>
        
        
        
//       ))}
//     </tbody>
//   </table>
// </div>

//     </div>
//   );
  const QuotesContent = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const recordsPerPage = 10;

  // Calculate pagination indexes
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Slice the company array to only show current page records
  const currentRecords = company.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(company.length / recordsPerPage);

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[300px] font h-[500px] overflow-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Requested Quote List </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-black">
              <th className="p-3 border font-semibold">S.No</th>
              <th className="p-3 border font-semibold">Service</th>
              <th className="p-3 border font-semibold">Property Location</th>
              <th className="p-3 border font-semibold">Property Price</th>
              <th className="p-3 border font-semibold">
                {localStorage.getItem("logintype") === "user" ? "Conveyancer Name" : "Customer Name"}
              </th>
              <th className="p-3 border font-semibold">Status</th>
              <th className="p-3 border font-semibold">View</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((quote, index) => (
              <React.Fragment key={index}>
                {((quote.status > 1 && localStorage.getItem("logintype") === "partner") ||
                  (quote.status > 0 && localStorage.getItem("logintype") === "user")) && (
                  <tr className="hover:bg-gray-50 transition duration-150 text-black">
                    <td className="p-3">{indexOfFirstRecord + index + 1}</td>
                    <td className="p-3">{getServiceTypeLabel(quote.service_type)}</td>
                    <td className="p-3">
                      {quote.service_type === 2 ? quote.purchase_country : quote.sales_country}
                    </td>
                    <td className="p-3">£ {quote.purchase_price}</td>
                    <td className="p-3">
                      {loginType === "user"
                        ? quote.company_name
                        : quoteUser[0].first_name + " " + quoteUser[0].last_name}
                    </td>
                    <td className="p-3">
                      <StatusButton status={getStatusLabel(quote.status)} />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handlecom_detailsopen(quote.property_id)}
                        className="bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold rounded-full"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
  
  return (
    // 1. GRID CONTAINER: Establishes the grid layout
    <div className='min-h-screen  '>
      <div className="bg-white shadow-md sticky top-0 p-4 font">
        <Navbar originalstyle={true} hide={false} />
      </div>
      <div className='mx-auto px-4 lg:px-16  grid grid-cols-1 md:grid-cols-4  gap-8 govt_by_scheme mt-30 mb-10'>

        {/* 2. ASIDE/SIDEBAR: Spans 1 column. Styled for a menu look. */}
        <aside className="govt_by_scheme md:col-span-1 govt_by_scheme p-6 h-auto max-h-80 bg-white shadow-lg rounded-xl font">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{user.first_name}{user.last_name}</h3>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2">
            <span
              onClick={() => handlechangepage(1)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                show
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
            <User className="inline w-5 h-5 mr-1 text-yellow-400" /> MY Profile
            </span>
            <span
              onClick={() => handlechangepage(2)}
              className={`cursor-pointer w-full text-center md:text-left px-4 py-2 text-md font-medium rounded-lg transition-colors duration-200 ${
                !show
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
           
                   <BookCheckIcon className="inline w-5 h-5 mr-1 text-yellow-400" />MY Quotes
            </span>
          </div>
        </aside>

        {/* 3. SECTION/MAIN CONTENT: Spans the remaining 3 columns */}
        <section className="govt_by_scheme md:col-span-3 govt_by_scheme">
          <main>
            {!show ? (

              <div>
                
               

                {logintype=="user"&&(
                  <div>
                  <QuotesContent />

                  {showPopup && (
  <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50 p-4">
      
      <div className="bg-white rounded-xl shadow-xl w-full  h-[550px]  p-6 relative overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Popup Content */}
        <PriceBreakdownCard
          companydetails={company}
          quoteId={selectedQuoteId}
          ref={childRef}
        />
      </div>

  </div>
)}

                </div>
                )}

                {logintype=="partner"&&(
                  <div>
                  <QuotesContent />

                  {showPopup && (
  <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50 p-4">
      
      <div className="bg-white rounded-xl shadow-xl w-full  h-[550px]  p-6 relative overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Popup Content */}
        <PriceBreakdownCard
          companydetails={company}
          quoteId={selectedQuoteId}
          ref={childRef}
          quoteUser={quoteUser}
        />
      </div>

  </div>
)}

                </div>
                )}
              
               
               
              </div>
              
            ) : (
              <>
              <ProfileContent />
              
                {showPopup && (
  <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50 p-4">
      
      <div className="bg-white rounded-xl shadow-xl w-full  h-[550px]  p-6 relative overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* Popup Content */}
        <PriceBreakdownCard
          companydetails={company}
          quoteId={selectedQuoteId}
          ref={childRef}
        />
      </div>

  </div>
  
)}
</>
            )}
           
          </main>
        </section>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Myprofile