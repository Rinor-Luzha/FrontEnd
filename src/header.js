import React, { useState } from 'react'

export default function Header() {

  const [ isActive, SetActive ] = useState("false")

  const toggleMenu = () => {
    SetActive(!isActive)
  }

  return (
    <>
      <div className='space-x-9 flex justify-items-center items-center bg-white h-15 py-1 shadow-lg'>
        <MenuButton/>
        <SearchBar/>
        <Logo/>
      </div>
    </>
  )
}

function MenuButton(){
  return (
    <div className="space-y-2 mx-1 my-1 px-1 py-1">
      <div className="w-8 h-1 bg-red-600"></div>
      <div className="w-8 h-1 bg-red-600"></div>
      <div className="w-8 h-1 bg-red-600"></div>
    </div>
  )
}



function SearchBar(){
  return(
    <div className=" text-gray-600">
      <input type="search" name="serch" placeholder="Search..." className=" bg-gray-200 h-10 py-1 px-1 ml-0 pl-5 mr-1 pr-10 rounded-full text-sm focus:outline-none"></input>
      <button type="submit" class="absolute top-0.5 left-21 mt-3 h-7 w-7 bg-[url('/public/searchicon.png')] bg-contain bg-no-repeat bg-right">
    
      </button>
    </div>
  )
}

function Logo(){
  return(
    <div className="bg-contain bg-[url('/public/logo.png')] bg-no-repeat h-10 w-10">
    </div>
  )
}
