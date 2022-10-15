import React, { useState } from 'react'
import GenreTags from './GenreTags'
import Rating from '../Rating'

const Banner = ({ movie, user }) => {
    const [showRatingPopup, setShowRatingPopup] = useState(false);

    // Format date
    const year = movie.releaseDate.substring(0, 4)
    const month = movie.releaseDate.substring(5, 7)
    const day = movie.releaseDate.substring(8, 10)
    const date = new Date(year, month, day)

    const dateArray = date.toDateString().split(' ');
    const dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3];


    const toggleRatingPopup = () => {
        if (user === null) {
            swal({
                title: "Please log in first!",
                text: "You need to be logged in to do that!",
                icon: "warning",
                timer: 2000,
                buttons: false
            });
            return
        }
        setShowRatingPopup(!showRatingPopup)
    }
    return (
        <>
            <div className="h-104  flex flex-col justify-center items-center">
                <div className="h-104 bg-black w-full absolute top-16"></div>
                <div className="group absolute top-16 w-fit">
                    <GenreTags genres={movie.genres} />
                    <img src={movie.img.substring(1)} alt={movie.title} className="h-104 w-80 hover:cursor-pointer hover:shadow-lg transition-all duration-500" />
                    <div className='flex justify-between text-grey'>
                        <div>
                            {dateFormat}
                        </div>
                        <div>
                            {movie.length}
                        </div>
                    </div>
                    <ul className="absolute opacity-0 invisible flex items-center justify-evenly top-1/2 left-1/2 w-20 h-16 bg-black bg-opacity-50 translate-x-[-50%] translate-y-[-50%] scale-75 transition-all duration-500  group-hover:visible group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-100 group-hover:opacity-100">
                        <li>
                            <button onClick={() => toggleRatingPopup(movie.id)} >
                                <i className="text-white relative flex items-center justify-center w-12 h-12 cursor-pointer trasition-all duration-500 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-lg hover:bg-black hover:bg-opacity-80 hover:scale-110 fas fa-star"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                {showRatingPopup &&
                    <Rating close={toggleRatingPopup} movieId={movie.id} user={user} />
                }
            </div>
        </>
    )
}

export default Banner