import React from 'react'
import GenreTags from '../moviePage/GenreTags'
import Link from 'next/link'
const Banner = ({ movie, user, close }) => {

    // Format date
    const year = movie.releaseDate.substring(0, 4)
    const month = movie.releaseDate.substring(5, 7)
    const day = movie.releaseDate.substring(8, 10)
    const date = new Date(year, month, day)

    const dateArray = date.toDateString().split(' ');
    const dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3];

    return (
        <>
            <div className="h-104 flex flex-col justify-center items-center">
                <div className="group absolute top-32 xs:top-24 w-fit">
                    <GenreTags genres={movie.genres} />
                    <img src={movie.img.substring(1)} alt={movie.title} className=" rounded-lg h-104 w-80 hover:cursor-pointer hover:shadow-lg transition-all duration-500" />
                    <ul className="absolute opacity-0 invisible flex items-center justify-evenly top-1/2 left-1/2 w-36 h-16 bg-black bg-opacity-50 translate-x-[-50%] translate-y-[-50%] scale-75 transition-all duration-500  group-hover:visible group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-100 group-hover:opacity-100">
                        <li>
                            <button onClick={() => close(movie.id)} >
                                <i className="text-white relative flex items-center justify-center w-12 h-12 cursor-pointer trasition-all duration-500 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-lg hover:bg-black hover:bg-opacity-80 hover:scale-110 fas fa-star"></i>
                            </button>
                        </li>
                        <li>
                            <Link href={`/movies/${movie.id}`} >
                                <i className="text-white relative flex items-center justify-center w-12 h-12 cursor-pointer trasition-all duration-500 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-lg hover:bg-black hover:bg-opacity-80 hover:scale-110 fa-solid fas	fa-angle-up"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Banner