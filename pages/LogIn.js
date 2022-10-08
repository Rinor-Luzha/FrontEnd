import React from 'react'
import {FaRegEnvelope} from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'

export default function LogIn() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 sm:flex-auto'>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-white">
           
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                <div className="w-3/5 p-5">
                    <div className="text-left font-bold flex items-center text-black">
                        <div>
                        <Image src='/logo.png' width={60} height={40} />
                        </div>
                        <span className="text-red">Elefanti</span>Ratings   
                    </div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-red mb-1">Log In to your Account</h2>
                        <div className="border-2 w-14 border-red inline-block mb-2"></div>
                    </div> 
                    <div className="flex flex-col items-center m-0">
                    <div className="bg-lightgray rounded-lg w-72 p-2 flex items-center m-0"><FaRegEnvelope className='text-grey m-2'/>
                        <input type='email' name='email' placeholder='E-mail' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div>  
                    <div className="bg-lightgray rounded-lg w-72 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2'/>
                        <input type='password' name='password' placeholder='Password' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div>
                    <div className='flex justify-between w-64 mb-5'>
                        <label className='flex-items-center text-xs text-black'><input type="checkbox" name='remember' className='mr-1'/>Remember me</label>
                        <a href='#' className='text-xs text-black'>Forgot Password?</a>
                    </div>
                        <a href="#" className="border-2 border-red text-red rounded-full px-12 py-2 inline-block font-semibold hover:bg-red hover:text-white">Log In</a>
                    </div> 
                </div>

                <div className="w-2/5 bg-red text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-2">First time here?</h2>
                    <div className="border-2 w-14 border-white inline-block mb-2"></div>
                    <p className="mb-10">Fill up personal information and start rating with us.</p>
                    <Link a href='/Register'>
                    <a href="#" className="border-2 border-white rounded-full px-12 py-2 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</a>
                    </Link>
                </div>

            </div>
        </main>
    </div>
  )
}
