import Image from "next/image";
import Personaldetails from "./components/personaldetails/page"
import PropertyDetails from "./components/propertydetails/page";

import Login from "./auth/login/page";
import Register from "./auth/registeruser/page";
import Footer from "./components/Footer";
import Comparequotes from "./components/comparequotes/page";
import HistorySidebar from "./components/YourHistory/page"
import PartnersPage from "./components/partnerspage/page";
import Partnerspagecard from "./components/partnerspagecard/page";
import Ouotesdetails from"./components/quotesdetails/page";
import  Landingpage from "./components/Home/page"

import Companyregistration from "./conveyancers/Companyregistration/page"

export default function Home() {
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

console.log(apiUrl,baseUrl)

  return (
    
   
    <div className="bg-white">
       <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap" rel="stylesheet">
</link>

      {/*
          <Register/>  
      <Personaldetails/>
    
      <PropertyDetails/>

        
      <Comparequotes/>
      
      
       <Ouotesdetails/> 

      <PartnersPage/> 
<Partnerspagecard/>
      
      */}
     

     
{/* <Companyregistration/> */}

     
<Landingpage/>
         
    </div>
  );
}

