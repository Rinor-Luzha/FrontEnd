import React from 'react'
import Image from 'next/image'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const [birthDate, setBirthDate] = useState("")

    const [fail, setFail] = useState(false)

    const router = useRouter()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login(event)
        }
    }

    const register = async (e) => {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const passwordConf = document.getElementById('passwordConf').value;
        if (password?.value !== passwordConf?.value) {
            alert('Entered passwords do not match');
        }
        if (password.length <= 8) {
            alert('Password must be 8 or more characters long')
        }
        // Add more validation
        // if (password !== passwordConf) {
        //     return
        // }

        try {
            const resUserRegister = await fetch('http://localhost:39249/account/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname, email, birthDate, password })
            });
            if (!resUserRegister.ok) {
                throw new Error("Error while registering user!");
            }
            const userRegister = await resUserRegister.json();

            if (userRegister.id !== "undefined") {
                router.push('/login')
                swal({
                    title: "Good job!",
                    text: "Registered!",
                    icon: "success",
                    buttons: false
                });
            } else {
                setName("")
                setSurname("")
                setEmail("")
                setPassword("")
                setBirthDate("")
                setPasswordConf("")
                setFail(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen flex-1 lg:py-36 px-20 text-center bg-white">
            <div className="bg-white rounded-2xl shadow-2xl flex w-screen h-screen lg:w-2/3 lg:max-w-4xl flex-col lg:flex-row">
                <div className="h-1/5 lg:w-2/5 lg:p-5 lg:py-48 text-2xl">
                    <div className="font-bold flex-col items-center text-black">
                        <img src='/logo.png' className="w-35 h-20 pt-4 lg:w-50 lg:h-40 mx-auto" />
                        <span className="text-red pb-4">Elefanti</span>Ratings
                    </div>
                </div>

                <div className="h-full lg:w-3/5 justify-center items-center bg-red text-white rounded-tr-2xl rounded-br-2xl py-12 px-6 lg:py-24 lg:px-12">
                    <form onSubmit={register} className="flex flex-col items-center">

                        <div className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3">
                            <input onChange={e => { setName(e.target.value) }} type='text' name='text' placeholder='First Name' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3">
                            <input onChange={e => { setSurname(e.target.value) }} type='text' name='text' placeholder='Last Name' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3">
                            <input onChange={e => { setBirthDate(e.target.value) }} type='date' name='birthDate' placeholder='Birthday' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setEmail(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><FaRegEnvelope className='text-grey m-2' />
                            <input type='email' name='email' placeholder='E-mail' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPassword(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type="password" placeholder="Password" id="password" required className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPasswordConf(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type="password" placeholder="Confirm Password" id="passwordConf" required className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <div className={fail ? "text-red p-2 m-3 text-center text-xs" : "hidden"}>Invalid credentials!</div>
                        <button type="submit" className="border-2 border-white rounded-full px-12 py-2 mb-5 m-4 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </form>
                    <Link href='/LogIn'><span className='text-sm text-white hover:cursor-pointer hover:underline'>Already have an account?</span></Link>
                </div>

            </div>
        </div>
    )
}
