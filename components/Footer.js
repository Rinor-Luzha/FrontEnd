import React from "react";
import { FaFacebookF,FaInstagram,FaLinkedin,FaTwitter } from 'react-icons/fa'
import Image from 'next/image'

function Footer() {
  return (
    <div className="main-footer bg-black inset-x-0 bottom-0">

       <div className="flex justify-center my-4">
        <a href="https://www.facebook.com/" className="border-2 border-white rounded-full p-4 mt-4 mb-4 ml-2 ">
            <FaFacebookF className="text-md text-white" />
        </a>
        <a href="https://www.instagram.com/" className="border-2 border-white rounded-full p-4 mt-4 mb-4 ml-2 ">
            <FaInstagram className="text-md text-white" />
        </a>
        <a href="https://twitter.com/" className="border-2 border-white rounded-full p-4 mt-4 mb-4 ml-2 ">
            <FaTwitter className="text-md text-white" />
        </a>
        <a href="https://www.linkedin.com/" className="border-2 border-white rounded-full p-4 mt-4 mb-4 ml-2">
            <FaLinkedin className="text-md text-white" />
        </a>
        </div>

        <div className="text-center justify-center font-bold flex items-center text-white text-2xl pt-1">
            <div>
                <Image src='/logo-removebg.png' width={90} height={70} />
            </div>
                <span className="text-red px-2">Elefanti</span>Ratings
        </div>
        <div></div>

        <hr className="text-white" />
        <div className="row">
          <p className="col-sm text-center item-center p-2 text-grey">
           Copyright &copy;{new Date().getFullYear()} | All rights reserved  
          </p>
        </div>
    </div>    
  );
}

export default Footer;