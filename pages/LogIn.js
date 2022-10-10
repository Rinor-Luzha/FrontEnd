import React from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import swal from 'sweetalert';


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
        try {
            const resUserLogin = await fetch('http://localhost:39249/account/login', {
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
                router.push('/')
                swal({
                    title: "Good job!",
                    text: "Logged in!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                });
            } else {
                setEmail("")
                setPassword("")
                setFail(true)
            }

            const emailInput = document.getElementById('email');
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!emailInput.value.match(emailRegex)) {
                alert('Invalid email address.');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen flex-1 px-20 text-center bg-white">

            <div className="bg-white rounded-2xl shadow-2xl flex w-screen lg:w-2/3 lg:max-w-4xl flex-col lg:flex-row">
                <div className="h-full lg:w-3/5 lg:p-5">
                    <div className="justify-center lg:justify-start lg:text-left font-bold flex items-center text-xl text-black">
                        <div>
                            <img src='/logo.png' className="w-16 h-12" />
                        </div>
                        <span className="text-red text-center">Elefanti</span>Ratings
                    </div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-red mb-1">Log In to your Account</h2>
                        <div className="border-t-2 w-14 border-t-red inline-block mb-2"></div>
                    </div>
                    <form className="flex flex-col items-center m-0" onSubmit={login}>
                        <div className="bg-lightgrey rounded-lg w-72 p-2 flex items-center m-0"><FaRegEnvelope className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setEmail(e.target.value) }} type='email' name='email' placeholder='E-mail' id='email' required className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <div className="bg-lightgrey rounded-lg w-72 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input onKeyDown={handleKeyDown} onChange={e => { setPassword(e.target.value) }} type='password' name='password' placeholder='Password' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <div className={fail ? "text-red p-2 m-3 text-center text-xs" : "hidden"}>Invalid credentials!</div>
                        <button type="submit" className="border-2 border-red text-red rounded-full m-6 px-12 py-2 inline-block font-semibold hover:bg-red hover:text-white">Log In</button>
                    </form>
                </div>

                <div className="h-full lg:w-2/5 bg-red text-white rounded-tr-2xl rounded-br-2xl p-20 lg:py-36 lg:px-12">
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
