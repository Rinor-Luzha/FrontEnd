import React from 'react'
import Link from 'next/link';
export const BigSlide = (props) => {
    return (
        <div className="h-104 hover:cursor-pointer w-fit mx-auto hover:scale-[1.02] transition-all duration-500">
            <Link href={`/movies/${props.movieId}`}><img src={props.img} alt={props.title} className="absolute mix-blend-soft-light h-104 w-80" /></Link>
            <div className="flex flex-col h-full justify-between">
                <p className="text-white w-fit px-5 rounded-sm bg-black text-center py-2 ">{props.genres}</p>
                <h2 className="w-80 bg-black text-white text-center py-5 text-3xl">{props.title}</h2>
            </div>
        </div>
    )
}
export default BigSlide
