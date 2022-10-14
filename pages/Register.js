import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
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

    const [fail, setFail] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login(event)
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
            setFail(true)
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
            setFail(true)
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
            setFail(true)
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
            setFail(true)
            return
        }

        if (birthDate === '') {
            console.log('here')
            swal({
                title: "Birthday Year is required!",
                text: "Please enter your Birthday Year!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            setFail(true)
            return
        }

        if (birthDate > '2014-01-01') {
            swal({
                title: "Too young!",
                text: "You have to be 16 years or older!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            setFail(true)
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
            setFail(true)
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
                buttons: false
            });
        } else {
            swal({
                title: "Error!",
                text: "There was an error registering you!",
                icon: "error",
                buttons: false
            });
            setFail(true)
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen flex-1 lg:py-36 px-20 text-center bg-white">
            <div className="bg-white rounded-2xl shadow-2xl flex w-screen h-screen lg:w-2/3 lg:max-w-4xl md:max-w-xl flex-col lg:flex-row">
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
                            <input onChange={e => { setBirthDate(e.target.value) }} max="2004-01-01" type='date' name='birthDate' placeholder='Birthday Year' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setEmail(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><FaRegEnvelope className='text-grey m-2' />
                            <input type='email' name='email' placeholder='E-mail' className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPassword(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type="password" placeholder="Password" required className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>

                        <div onChange={e => { setPasswordConf(e.target.value) }} className="bg-lightgrey rounded-lg h-10 w-64 lg:h-10 lg:w-80 lg:p-2 flex items-center m-3"><MdLockOutline className='text-grey m-2' />
                            <input type="password" placeholder="Confirm Password" required className='bg-lightgrey outline-none text-sm text-black flex-1' />
                        </div>
                        <div className={fail ? "text-red p-2 m-3 text-center text-xs" : "hidden"}>Invalid credentials!</div>
                        <button type="submit" className="border-2 border-white rounded-full px-12 py-2 mb-5 m-4 inline-block text-white font-semibold  hover:bg-white hover:text-red">Register</button>
                    </form>
                    <Link href='/login'><span className='text-sm text-white hover:cursor-pointer hover:underline'>Already have an account?</span></Link>
                </div>

            </div>
        </div>
    )
}
