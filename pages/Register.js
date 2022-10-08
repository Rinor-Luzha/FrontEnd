import React from 'react'
import Image from 'next/image'
import {FaRegEnvelope} from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md'

export default function Register() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-white">
           
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl sm:flex-row">
                <div className="w-2/5 p-5 py-44 text-2xl">
                    <div className="font-bold flex-col items-center text-black">
                        <div>
                        <Image src='/logo.png' width={160} height={140} />
                        </div>
                        <span className="text-red">Elefanti</span>Ratings   
                    </div>
                </div>

                <div className="w-3/5 justify-center items-center bg-red text-white rounded-tr-2xl rounded-br-2xl py-24 px-12">
                    <div className="flex flex-col items-center">
                
                    <div className="bg-lightgray rounded-lg h-10 w-80 p-2 flex items-center m-3">
                            <input type='text' name='text' placeholder='First Name' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div> 
                    
                    <div className="bg-lightgray rounded-lg h-10 w-80 p-2 flex items-center m-3">
                            <input type='text' name='text' placeholder='Last Name' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div> 

                    <div className="bg-lightgray rounded-lg h-10 w-80 max-80 p-2 flex items-center m-3"><FaRegEnvelope className='text-grey m-2'/>
                        <input type='email' name='email' placeholder='E-mail' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div>    

                    <div className="bg-lightgray rounded-lg h-10 w-80 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2'/>
                        <input type='password' name='password' placeholder='Password' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div>

                    <div className="bg-lightgray rounded-lg h-10 w-80 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2'/>
                        <input type='password' name='password' placeholder='Confirm Password' className='bg-lightgray outline-none text-sm text-black flex-1'/>
                    </div>

                    <a href="#" className="border-2 border-white rounded-full px-12 py-2 mb-5 m-4 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
