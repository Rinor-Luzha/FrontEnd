import React from "react";
import { FaFacebookF,FaInstagram,FaLinkedin,FaTwitter } from 'react-icons/fa'
import Image from 'next/image'

function Footer() {
  return (
    <div className="main-footer bg-black fixed inset-x-0 bottom-0">

       <div className="flex justify-center my-4">
        <a href="https://www.facebook.com/" className="border-2 border-white rounded-full p-4 mx-1 ">
            <FaFacebookF className="text-md" />
        </a>
        <a href="https://www.instagram.com/" className="border-2 border-whitw rounded-full p-4 mx-1 ">
            <FaInstagram className="text-md" />
        </a>
        <a href="https://twitter.com/" className="border-2 border-white rounded-full p-4 mx-1 ">
            <FaTwitter className="text-md" />
        </a>
        <a href="https://www.linkedin.com/" className="border-2 border-white rounded-full p-4 mx-1 ">
            <FaLinkedin className="text-md" />
        </a>
        </div>

        <div className="text-center justify-center font-bold flex items-center text-white text-2xl  xl:bg-black pt-2">
            <div>
                <Image src='/logo-removebg.png' width={90} height={70} />
            </div>
                <span className="text-red px-2">Elefanti</span>Ratings
        </div>

        <hr />
        <div className="row">
          <p className="col-sm text-center item-center p-2 text-grey">
           Copyright &copy;{new Date().getFullYear()} | All rights reserved  
          </p>
        </div>
    </div>    
  );
}

export default Footer;