import React, { useState } from 'react'

export default function Header() {

  const [ isActive, SetActive ] = useState("false")

  const toggleMenu = () => {
    SetActive(!isActive)
  }

  return (
    <>
      <div className='space-x-8 flex justify-items-center items-center bg-white h-15 py-1 shadow-lg'>
        <MenuButton/>
        <SearchBar/>
        <Logo/>
      </div>
    </>
  )
}

function MenuButton(){
  return (
    <button>
      <div className="space-y-2 mx-1 my-1 px-1 py-1">
        <div className="w-8 h-1 bg-red-600"></div>
        <div className="w-8 h-1 bg-red-600"></div>
        <div className="w-8 h-1 bg-red-600"></div>
      </div>
    </button>
  )
}



function SearchBar(){
  return(
    <div className=" text-gray-600 justify-items-center">
      <input type="search" name="serch" placeholder="Search..." className="relative bg-gray-200 h-10 py-1 w-6/7 px-1 ml-0 pl-5 mr-1 rounded-full text-sm focus:outline-none"></input>
      <button type="submit" class="absolute top-0.5 mt-3 h-7 w-7 bg-[url('/public/searchicon.png')] bg-contain bg-no-repeat bg-right">
    
      </button>
    </div>
  )
}

function Logo(){
  return(
    <button className='absolute right-1'>
      <div className="bg-contain bg-[url('/public/logo.png')] bg-no-repeat h-8 w-10"></div>
      </button>
  )
}
