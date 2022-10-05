import React, { useState } from 'react'

export default function Header() {

  const [ isActive, SetActive ] = useState("false")

  const toggleMenu = () => {
    SetActive(!isActive)
  }

  return (
    <>
      <div className='flex bg-white h-15 py-1 shadow-md'>
        <MenuButton/>
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

