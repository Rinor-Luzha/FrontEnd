import React, { useState } from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'

import { useRouter } from 'next/router'
import swal from 'sweetalert';

export default function Register({ user }) {
    const router = useRouter()

    if (user !== null) {
        swal({
            title: "You are logged in!",
            text: "Please log out first!",
            icon: "info",
            timer: 2000,
            buttons: false
        });
        router.push("/")
    }

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const [birthDate, setBirthDate] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            register(event)
        }
    }

    const register = async (e) => {
        e.preventDefault();
        if (name === '') {
            swal({
                title: "First Name is required!",
                text: "Please enter your First Name!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }

        if (name.length <= 1) {
            swal({
                title: "Invalid name!",
                text: "First Name must have more then 1 character!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }

        if (surname === '') {
            swal({
                title: "Last Name is required!",
                text: "Please enter your Last Name!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }

        if (surname.length <= 1) {
            swal({
                title: "Invalid Last name!",
                text: "Last Name must have more then 1 character!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }

        if (birthDate === '') {
            swal({
                title: "Birthday Year is required!",
                text: "Please enter your Birthday Year!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }

        if (birthDate > '2006-01-01') {
            swal({
                title: "Too young!",
                text: "You have to be 16 years or older!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }
        if (password !== passwordConf) {
            swal({
                title: "Passwords do not match!",
                text: "You need to write the same passwoord as above!",
                icon: "warning",
                timer: 2400,
                buttons: false
            });
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            swal({
                title: "Weak password!",
                text: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                icon: "warning",
                buttons: false
            });
            return
        }

        const resUserRegister = await fetch(process.env.NEXT_PUBLIC_REGISTER, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, birthDate, password })
        });
        const userRegister = await resUserRegister.json();

        if (userRegister.id !== "undefined") {
            router.push('/login')
            swal({
                title: "Good job!",
                text: "Registered!",
                icon: "success",
                timer: 1500,
                buttons: false
            });
        } else {
            swal({
                title: "Error!",
                text: "There was an error registering you!",
                icon: "error",
                buttons: false
            });
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-screen lg:w-full h-auto pt-14 flex-1 px-20 text-center bg-white md:w-100 md:h-auto md:p-36 lg:pt-24 lg:pb-8">
            <div className="bg-white rounded-2xl shadow-2xl flex w-screen h-auto lg:w-2/3 lg:max-w-4xl md:max-w-xl md:h-auto flex-col md:rounded-t-2xl lg:flex-row">
                <div className="h-1/5 p-4 md:h-auto lg:w-2/5 lg:p-5 lg:py-44 text-2xl">
                    <div className="font-bold flex-col items-center text-black">
                        <img src='/logo.png' className="w-35 h-20 pt-4 lg:w-50 lg:h-40 mx-auto" />
                        <span className="text-red">Elefanti</span>Ratings
                    </div>
                </div>

                <div className="h-4/5 py-6 px-6 md:h-auto justify-center items-center bg-red text-white lg:w-3/5 md:rounded-b-2xl lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-l-none lg:p-12">
                    <form onSubmit={register} className="flex flex-col items-center">

                        <div className="bg-lightgrey rounded-lg flex items-center m-3">
                            <input onKeyDown={handleKeyDown} onChange={e => { setName(e.target.value) }} type='text' name='text' placeholder='First Name' className='h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg flex items-center m-3">
                            <input onKeyDown={handleKeyDown} onChange={e => { setSurname(e.target.value) }} type='text' name='text' placeholder='Last Name' className='h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div className="bg-lightgrey rounded-lg flex items-center m-3 relative">
                            <input onKeyDown={handleKeyDown} onChange={e => { setBirthDate(e.target.value) }} type='date' name='birthDate' className={birthDate === '' ? 'h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1 before:content-["Birthdate"] before:absolute before:left-2 before:text-grey md:before:hidden ' : 'h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1'} />
                        </div>

                        <div onChange={e => { setEmail(e.target.value) }} className="bg-lightgrey rounded-lg flex items-center m-3 relative"><FaRegEnvelope className='absolute right-0 text-grey m-2' />
                            <input onKeyDown={handleKeyDown} type='email' name='email' placeholder='E-mail' className='h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPassword(e.target.value) }} className="bg-lightgrey rounded-lg flex items-center m-3 relative"><MdLockOutline className='absolute right-0 text-grey text-xl m-2' />
                            <input onKeyDown={handleKeyDown} type="password" placeholder="Password" required className='h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPasswordConf(e.target.value) }} className="bg-lightgrey rounded-lg flex items-center m-3 relative"><MdLockOutline className='absolute right-0 text-grey text-xl m-2' />
                            <input onKeyDown={handleKeyDown} type="password" placeholder="Confirm Password" required className='h-9 w-52 md:w-72 lg:w-52 xl:w-72 p-2 rounded-lg bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <button type="submit" className="border-2 border-white rounded-full px-12 py-2 mb-5 m-4 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </form>
                    <Link href='/login'><span className='text-sm text-white hover:cursor-pointer hover:underline'>Already have an account?</span></Link>
                </div>

            </div>
        </div>
    )
}
