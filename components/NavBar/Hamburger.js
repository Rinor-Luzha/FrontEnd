import React from 'react'

const Hamburger = ({ clickedMenu, setClickedMenu }) => {
    return (
        <div onClick={() => setClickedMenu(!clickedMenu)} className="w-10 h-8 relative rotate-0 transition-all duration-500 cursor-pointer md:hidden">
            <span className={!clickedMenu ? "block absolute h-1.5 w-full bg-red rounded-md opacity-100 left-0 transition-all duration-300 rotate-0 top-0 origin-[left_center]" : "block absolute h-1.5 w-full bg-red rounded-md opacity-100 left-[3px] transition-all duration-300 rotate-45 -top-[3px] origin-[left_center]"}></span>
            <span className={!clickedMenu ? "block absolute h-1.5 w-full bg-red rounded-md opacity-100 left-0 transition-all duration-300 rotate-0 top-3" : "block absolute h-1.5 w-0 bg-red rounded-md opacity-0 left-0 transition-all duration-300 top-3"}></span>
            <span className={!clickedMenu ? "block absolute h-1.5 w-full bg-red rounded-md opacity-100 left-0 transition-all duration-300 rotate-0 top-6 origin-[left_center]" : "block absolute h-1.5 w-full bg-red rounded-md opacity-100 left-[3px] transition-all duration-300 -rotate-45 top-[25px] origin-[left_center]"}></span>
        </div>
    )
}

export default Hamburger
