import React from 'react'
import { Link as Scroll } from 'react-scroll'
import { useRouter } from 'next/router'
import Link from 'next/link';
import swal from 'sweetalert';

const MenuItems = ({ clickedMenu, user, setUser, setClicked }) => {
    const router = useRouter()
    const logout = async () => {
        try {
            setClicked(false)
            const resUserLogout = await fetch(process.env.NEXT_PUBLIC_LOGOUT, {
                method: "POST",
                credentials: 'include'
            })
            if (!resUserLogout.ok) {
                throw new Error("Error while logging out!")
            }
            if (resUserLogout.status === 204) {
                swal({
                    title: "Done!",
                    text: "Logged out!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                })
                setUser(null)
                router.push("/")
            } else {
                swal({
                    title: "Error!",
                    text: "Error while logging out!",
                    icon: "error",
                    timer: 1500,
                    buttons: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ul className={clickedMenu ? "flex flex-col w-[300px] absolute top-16 right-0 opacity-100 transition-all duration-500 z-10 bg-lightgrey shadow-lg rounded" : "-right-full flex flex-col w-full absolute top-16 opacity-0 transition-all duration-300 z-10 md:right-0 md:top-0 md:opacity-100 md:flex-row md:static md:w-fit"}>
            {
                user &&
                <div className="group hover:cursor-pointer px-5 py-4 transition-all duration-300 shadow-sm md:hidden">
                    <Link href="/account">
                        <li className="flex items-center gap-2">
                            <i className="fas fa-user p-2 border-2 border-grey text-grey group-hover:text-red group-hover:border-red transition-all duration-300 rounded-full color-grey md:hidden"></i>
                            <p className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 transition-all duration-300 group-hover:text-red after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                                {user.name} {user.surname}
                            </p>
                        </li>
                    </Link>
                </div>
            }
            <div className="group hover:cursor-pointer hover:text-red px-5 py-4 transition-all duration-300 shadow-sm md:shadow-none md:block">
                {router.pathname === '/' ?
                    <Scroll to="new" spy={true} smooth={true} offset={-60} duration={500} onClick={() => { setClicked(false) }}>
                        <li className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Home
                        </li>
                    </Scroll> :
                    <Link href="/" scroll={false} >
                        <li onClick={() => { setClicked(false) }} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Home
                        </li>
                    </Link>
                }
            </div>
            {user && <div className="group hover:cursor-pointer hover:text-red px-5 py-4 transition-all duration-300 shadow-sm md:shadow-none md:hidden lg:block">
                {router.pathname === '/' ?
                    <Scroll to="myRatings" spy={true} smooth={true} offset={-60} duration={500} onClick={() => { setClicked(false) }}>
                        <li className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            My Ratings
                        </li>
                    </Scroll> :
                    <Link href="/" scroll={false} >
                        <li onClick={() => { setClicked(false) }} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            My Ratings
                        </li>
                    </Link>
                }
            </div>}
            <div className="group hover:cursor-pointer hover:text-red px-5 py-4 transition-all duration-300 shadow-sm md:shadow-none">
                {router.pathname === '/' ?
                    <Scroll to="recommended" spy={true} smooth={true} offset={-60} duration={500} onClick={() => { setClicked(false) }}>
                        <li className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Recommended
                        </li>
                    </Scroll> :
                    <Link href="/" scroll={false} >
                        <li onClick={() => { setClicked(false) }} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Recommended
                        </li>
                    </Link>
                }
            </div>
            <div className="group hover:cursor-pointer px-5 py-4 transition-all duration-300 md:hidden 2xl:block shadow-sm md:shadow-none">
                {router.pathname === '/' ?
                    <Scroll to="highestRated" spy={true} smooth={true} offset={-60} duration={500} onClick={() => { setClicked(false) }}>
                        <li className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Highest Rated
                        </li>
                    </Scroll> :
                    <Link href="/" scroll={false} >
                        <li onClick={() => { setClicked(false) }} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Highest Rated
                        </li>
                    </Link>
                }
            </div>
            <div className="group hover:cursor-pointer hover:text-red px-5 py-4 transition-all duration-300 md:hidden xl:block shadow-sm md:shadow-none">
                {router.pathname === '/' ?
                    <Scroll to="randomMovie" spy={true} smooth={true} offset={-60} duration={500} onClick={() => { setClicked(false) }}>
                        <li className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Random Movie
                        </li>
                    </Scroll> :
                    <Link href="/" scroll={false} >
                        <li onClick={() => { setClicked(false) }} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            Random Movie
                        </li>
                    </Link>
                }
            </div>
            <div className="group hover:cursor-pointer px-5 py-4 transition-all duration-300 md:block shadow-sm md:shadow-none">
                <Link href={user !== null ? "/account" : "/login"} >
                    <li onClick={() => { setClicked(false) }} className="flex items-center gap-2">
                        <p className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 transition-all duration-300 group-hover:text-red after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                            My Account
                        </p>
                    </li>
                </Link>
            </div>
            <div className={user === null ? "hidden" : "group hover:cursor-pointer hover:text-red px-5 py-4 transition-all duration-300"}>
                <li onClick={logout} className="relative w-fit after:absolute after:content-[''] after:w-full after:h-0.5 after:top-full after:left-0 after:bg-red after:scale-x-0 after:origin-center after:transition-all after:duration-500 group-hover:after:scale-100 group-hover:after:origin-center">
                    Log Out
                </li>
            </div>
        </ul>
    )
}

export default MenuItems