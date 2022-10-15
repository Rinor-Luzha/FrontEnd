import React, { useState } from 'react'
import MenuItems from './MenuItems'
import SearchBar from './SearchBar'
import Hamburger from './Hamburger'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as Scroll } from 'react-scroll'


export default function NavBar({ user, setUser }) {

  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  return (
    <div className="flex justify-center w-screen h-fit fixed z-20 shadow-lg bg-white">
      <nav className="h-16 flex items-center w-screen justify-between px-3 md:justify-between max-w-[1500px]">
        {router.pathname === '/' ?
          <Scroll to="new" spy={true} smooth={true} offset={-60} duration={500}>
            <img src="/logo.png" className="justify-self-start h-12 hover:cursor-pointer lg:mr-28" />
          </Scroll> :
          <Link href="/">
            <img src="/logo.png" className="justify-self-start h-12 hover:cursor-pointer lg:mr-28" />
          </Link>
        }
        <MenuItems clickedMenu={clicked} setClicked={setClicked} user={user} setUser={setUser} />
        <SearchBar />
        <Hamburger clickedMenu={clicked} setClickedMenu={setClicked} />
      </nav>
    </div>
  )
}

