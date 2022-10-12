import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'



export default function Header() {

  const [isActive, setIsActive] = useState(false)


  return (
    <>
      <div className='fixed lg:pt-12 z-50 space-x-1/2 w-full flex justify-items-center items-center bg-white h-15 py-1 shadow-lg'>
        <div className="absolute -top-2 hidden lg:block">
          <SideNav/>
        </div>
        <MenuButton isActive={isActive} setIsActive={setIsActive}/> 
        <SearchBar/>
        <Logo/>
      </div>
      <div className={isActive? "fixed z-40 bg-lightgrey top-12 w-52 h-screen shadow-2xl md:w-1/4 lg:hidden" : "hidden"}>
        <SideNav/>
      </div>

    </>
  )
}

function MenuButton({isActive, setIsActive}){
  return (
    <button type='submit' onClick={() => setIsActive(!isActive)} className="lg:hidden">
      <div className="space-y-2 mx-1 my-1 px-1 py-1">
        <div className="w-8 h-1 bg-red"></div>
        <div className="w-8 h-1 bg-red"></div>
        <div className="w-8 h-1 bg-red"></div>
      </div>
    </button>
  )
}



function SearchBar(){
  return(
    <div className="fixed right-1/3 text-grey top-0 py-1.5 lg:right-20 lg:pr-5 ">
      <input type="search" name="serch" placeholder="Search..." className="relative bg-lightgrey h-10 py-1 w-6/7 px-1 ml-0 pl-5 mr-1 rounded-full text-sm focus:outline-none"></input>
      <button type="submit" class="absolute mt-1.5 h-7 w-7 bg-[url('../public/searchicon.png')] bg-contain bg-no-repeat bg-right">
    
      </button>
    </div>
  )
}

function Logo(){
  return(
    <button className='absolute right-1 top-0 py-3'>
      <div className="bg-contain bg-[url('../public/favicon.ico')] bg-no-repeat h-8 w-10"></div>
    </button>
  )
}



function SideNav(){

  return(
      <div className="py-1 font-normal text-grey " >
        <ul className='lg:inline-flex'>
          <div className="hover:font-bold px-5 my-2">
            <Link href={'/'}>
              <li className='lg:hidden flex items-center hover:font-bold hover:shadow-md hover:text-red py-2 my-2 '>
                <div className="border-2 border-red bg-[url('../public/usericon.png')] bg-contain bg-no-repeat h-8 w-8 rounded-full mr-3"></div>

              </li>
            </Link>  
          </div>
          <div className="lg:hidden hover:font-bold hover:shadow-md hover:text-red px-5 py-2 my-2">
            <Link href={'/'}>
              <li>
                My Account
              </li>
            </Link>  
          </div>
          <div className="lg:rounded-2xl lg:hover:bg-white lg:hover:shadow-sm lg:hover:font-semibold hover:font-bold hover:shadow-md hover:text-red px-5 py-2 my-2">
            <Link href={'/'}>
              <li>
                My Ratings
              </li>
            </Link>
          </div> 
          <div className="lg:rounded-2xl lg:hover:bg-white lg:hover:shadow-sm lg:hover:font-semibold hover:font-bold hover:shadow-md hover:text-red px-5 py-2 my-2">
          <Link href={'/'}>
            <li>
              Recomended Movies
            </li>
          </Link>
          </div>
          <div className="lg:hidden hover:font-bold hover:shadow-md hover:text-red px-5 py-2 my-2">
            <Link href={'/'}>
              <li>
                Random Movie
              </li>
            </Link>
          </div>
          <div className="lg:hidden hover:font-bold hover:shadow-md hover:text-red px-5 py-2 my-2">
            <Link href={'/'}>
              <li>
                Login/Log Out
              </li>
            </Link>
          </div>
        </ul>
      </div>  
  )
}
