import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
const SearchBar = () => {
    const [searchParams, setSearchParams] = useState("")
    const router = useRouter()
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            router.push({
                pathname: '/search',
                query: { title: searchParams },
            })
        }
    }
    return (
        <div className=" text-grey flex items-center">
            <input onKeyDown={handleKeyDown} onChange={(e) => { setSearchParams(e.target.value) }} type="search" name="search" placeholder="Search..." className="relative bg-lightgrey text-black h-10 py-1 w-48 px-1 ml-0 pl-5 mr-1 rounded-full text-sm hover:outline outline-white hover:outline-grey hover:outline-1 transition-all duration-500 focus:outline-grey" />
            <img src="/searchicon.png" className="hidden h-7 sm:block cursor-pointer md:hidden" onClick={() => {
                if (searchParams === "") {
                    router.push({
                        pathname: '/',
                    })
                } else {
                    router.push({
                        pathname: '/search',
                        query: { title: searchParams },
                    })
                }

            }} />
        </div>
    )
}

export default SearchBar