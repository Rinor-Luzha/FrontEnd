import React from "react";
import Image from 'next/image'
import Link from "next/link";

function Footer() {
    return (
        <div className="main-footer bg-black inset-x-0 bottom-0">

            <div className="flex justify-center gap-10 py-10">
                <Link href="https://www.facebook.com/" >
                    <i className="fa-brands fa-facebook text-2xl text-lightgrey hover:text-red transition-all duration-300 cursor-pointer"></i>
                </Link>
                <Link href="https://www.facebook.com/" >
                    <i className="fa-brands fa-instagram text-2xl text-lightgrey hover:text-red transition-all duration-300 cursor-pointer"></i>
                </Link>
                <Link href="https://www.facebook.com/" >
                    <i className="fa-brands fa-twitter text-2xl text-lightgrey hover:text-red transition-all duration-300 cursor-pointer"></i>
                </Link>
                <Link href="https://www.facebook.com/" >
                    <i className="fa-brands fa-linkedin text-2xl text-lightgrey hover:text-red transition-all duration-300 cursor-pointer"></i>
                </Link>
            </div>

            <div className="text-center justify-center font-bold flex items-center text-lightgrey text-2xl pt-1">
                <div>
                    <Image src='/logo-removebg.png' width={90} height={70} />
                </div>
                <span className="text-red px-2">Elefanti</span>Ratings
            </div>
            <div className="">
                <p className=" text-center p-2 text-grey">
                    Copyright &copy;{new Date().getFullYear()} | All rights reserved
                </p>
            </div>
        </div>
    );
}

export default Footer;