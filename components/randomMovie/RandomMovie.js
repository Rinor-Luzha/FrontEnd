import React, { useState } from 'react'
import Banner from './Banner'

const RandomMovie = ({ user, close }) => {
    const [movie, setMovie] = useState(null)
    const generateRandomMovie = async () => {
        if (user === null) {
            try {
                const resRandom = await fetch(process.env.NEXT_PUBLIC_RANDOM)
                setMovie(await resRandom.json())
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const resRandom = await fetch(`${process.env.NEXT_PUBLIC_RANDOM}?userid=${user.id}`)
                setMovie(await resRandom.json())
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className='mb-28'>
            {movie === null ?
                <div className="h-104 flex flex-col justify-center items-center relative">
                    <div onClick={generateRandomMovie} className='absolute top-6 group w-80 rounded-lg hover:shadow-md flex flex-col justify-center items-center h-full transition-all duration-300 cursor-pointer'>
                        <p className='px-1 text-grey group-hover:text-red first-letter:transition-all duration-300'>Click Me!</p>
                        <i className="text-grey fas fa-question text-[300px] font-normal hover group-hover:-translate-y-2 group-hover:text-red transition-all duration-300">
                        </i>
                    </div>
                </div>
                :
                <div className='flex flex-col items-center justify-around'>
                    < Banner close={close} movie={movie} user={user} />
                    <p onClick={generateRandomMovie} className='absolute bottom-16 cursor-pointer px-1 text-grey hover:text-red first-letter:transition-all duration-300'>Get another movie!</p>
                </div>
            }
        </div>

    )
}

export default RandomMovie