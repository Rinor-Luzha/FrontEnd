import React from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fail, setFail] = useState(false)
    const router = useRouter()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login(event)
        }
    }

    const login = async (e) => {
        e.preventDefault();
        const resUserLogin = await fetch('http://localhost:39249/account/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        const userLogin = await resUserLogin.json();

        if (userLogin.message === "Success") {
            router.push('/')
        } else {
            setEmail("")
            setPassword("")
            setFail(true)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen flex-1 px-20 text-center bg-white">

            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                <div className="w-3/5 p-5">
                    <div className="text-left font-bold flex items-center text-black">
                        <div>
                            <img src='/logo.png' className="w-16 h-12" />
                        </div>
                        <span className="text-red">Elefanti</span>Ratings
                    </div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-red mb-1">Log In to your Account</h2>
                        <div className="border-t-2 w-14 border-t-red inline-block mb-2"></div>
                    </div>

                    <div className={fail ? "text-red text-center text-xs" : "hidden"}>Invalid credentials!</div>

                    <form className="flex flex-col items-center m-0" onSubmit={login}>
                        <div className="bg-lightgrey rounded-lg w-72 p-2 flex items-center m-0"><FaRegEnvelope className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setEmail(e.target.value) }} type='text' name='email' placeholder='E-mail' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <div className="bg-lightgrey rounded-lg w-72 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setPassword(e.target.value) }} type='password' name='password' placeholder='Password' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <button type="submit" className="border-2 border-red text-red rounded-full px-12 py-2 inline-block font-semibold hover:bg-red hover:text-white">Log In</button>
                    </form>
                </div>

                <div className="w-2/5 bg-red text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-2">First time here?</h2>
                    <div className="border-t-2 w-14 border-white inline-block mb-2"></div>
                    <p className="mb-10">Fill up personal information and start rating with us.</p>
                    <Link href='/register'>
                        <button className="border-2 border-white rounded-full px-12 py-2 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}
