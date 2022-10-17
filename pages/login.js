import React from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import swal from 'sweetalert';


export default function Login({ user, setUser }) {
    const router = useRouter()

    if (user !== null) {
        swal({
            title: "You are logged in!",
            text: "Please log out first!",
            icon: "info",
            timer: 2000,
            buttons: false
        })
        router.push("/")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login(event)
        }
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const resUserLogin = await fetch(process.env.NEXT_PUBLIC_LOGIN, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            if (!resUserLogin.ok) {
                throw new Error("Error while logging in!")
            }
            const userLogin = await resUserLogin.json();

            if (userLogin.message === "Success") {
                fetch(process.env.NEXT_PUBLIC_USER, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }).then(user => {
                    if (!user.ok) {
                        setUser(null)
                        throw new Error("User not logged in")
                    }
                    return user.json()
                })
                    .then((userData) => {
                        router.push('/')
                        swal({
                            title: "Done!",
                            text: "Logged in!",
                            icon: "success",
                            timer: 1500,
                            buttons: false
                        });
                        setTimeout(() => {
                            setUser(userData)
                        }, 1800)
                    })
                    .catch(e => {
                        console.log(e)
                    })

            } else {
                swal({
                    title: "Login failed!",
                    text: "Account doesnt exist, or you entered wrong email or password!",
                    icon: "warning",
                    timer: 2300,
                    buttons: false
                })
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            console.log(error)
            router.push('/login')
            swal({
                title: "Failed to login!",
                text: "Account doesnt exist, or you entered wrong email or password!",
                icon: "warning",
                timer: 2300,
                buttons: false
            })
        }

    }
    return (
        <div className="flex flex-col items-center justify-center w-screen lg:w-full h-full pt-12 flex-1 px-20 text-center bg-white md:w-100 md:h-full md:p-32">
            <div className="bg-white shadow-2xl flex w-screen flex-col md:max-w-2xl md:flex-col md:rounded-t-2xl lg:w-2/3 lg:flex-row lg:max-w-4xl lg:rounded-2xl">
                <div className="h-full md:h-full lg:w-3/5 lg:p-5">
                    <div className="justify-center pt-14 lg:justify-start lg:text-left font-bold flex items-center text-xl text-black">
                        <div>
                            <img src='/logo.png' className="w-12 h-8 lg:w-16 lg:h-12" />
                        </div>
                        <span className="text-red text-center">Elefanti</span>Ratings
                    </div>
                    <div className="py-4 lg:py-10">
                        <h2 className="text-2xl lg:text-3xl font-bold text-red mb-1">Log In to your Account</h2>
                        <div className="border-t-2 w-14 border-t-red inline-block mb-2"></div>
                    </div>
                    <form className="flex flex-col items-center" onSubmit={login}>
                        <div className="bg-lightgrey flex items-center rounded-lg"><FaRegEnvelope className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setEmail(e.target.value) }} type='email' name='email' placeholder='E-mail' id='email' required className='p-2 py-2.5 rounded-lg w-60 bg-lightgrey outline-none text-sm text-black flex-1 ' />
                        </div>
                        <div className="bg-lightgrey rounded-lg m-5 flex items-center"><MdLockOutline className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setPassword(e.target.value) }} type='password' name='password' placeholder='Password' className='p-2 py-2.5 rounded-lg bg-lightgrey w-60 outline-none text-sm text-black flex-1' />
                        </div>
                        <button type="submit" className="border-2 border-red text-red rounded-full m-6 px-12 py-2 inline-block font-semibold hover:bg-red hover:text-white">Log In</button>
                    </form>
                </div>

                <div className="h-full lg:w-2/5 bg-red text-white md:rounded-b-2xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-l p-16 lg:py-36 lg:px-12">
                    <h2 className="text-3xl font-bold mb-2">First time here?</h2>
                    <div className="border-t-2 w-14 border-white inline-block mb-2"></div>
                    <p className="mb-10 md:text-xl">Fill up personal information and start rating with us.</p>
                    <Link href='/register'>
                        <button className="border-2 border-white rounded-full px-12 py-2 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
