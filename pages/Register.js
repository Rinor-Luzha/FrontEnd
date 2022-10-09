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

        // Add more validation
        if (password !== passwordConf) {
            return
        }


        const resUserRegister = await fetch('http://localhost:39249/account/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, birthDate, password })
        });
        const userRegister = await resUserRegister.json();

        if (resUserRegister.id !== "undefined") {
            router.push('/login')
        } else {
            setName("")
            setSurname("")
            setEmail("")
            setPassword("")
            setBirthDate("")
            setPasswordConf("")
            setFail(true)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen flex-1 px-20 text-center bg-white">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl sm:flex-row">
                <div className="w-2/5 p-5 py-44 text-2xl">
                    <div className="font-bold flex-col items-center text-black">
                        <img src='/logo.png' className="w-50 h-40 mx-auto" />
                        <span className="text-red">Elefanti</span>Ratings
                    </div>
                </div>

                <div className="w-3/5 justify-center items-center bg-red text-white rounded-tr-2xl rounded-br-2xl py-24 px-12">
                    <form onSubmit={register} className="flex flex-col items-center">

                        <div className="bg-lightgrey rounded-lg h-10 w-80 p-2 flex items-center m-3">
                            <input onChange={e => { setName(e.target.value) }} type='text' name='text' placeholder='First Name' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg h-10 w-80 p-2 flex items-center m-3">
                            <input onChange={e => { setSurname(e.target.value) }} type='text' name='text' placeholder='Last Name' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg h-10 w-80 p-2 flex items-center m-3">
                            <input onChange={e => { setBirthDate(e.target.value) }} type='date' name='birthDate' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setEmail(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-80 max-80 p-2 flex items-center m-3"><FaRegEnvelope className='text-grey m-2' />
                            <input type='email' name='email' placeholder='E-mail' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPassword(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-80 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type='password' name='password' placeholder='Password' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPasswordConf(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-80 p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type='password' name='password' placeholder='Confirm Password' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <button type="submit" className="border-2 border-white rounded-full px-12 py-2 mb-5 m-4 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </form>
                    <Link href='/login'><span className='text-sm text-white hover:cursor-pointer hover:underline'>Already have an account?</span></Link>
                </div>

            </div>
        </div>
    )
}
