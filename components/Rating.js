import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
const Rating = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const rateMovie = (ratingNumber) => {
        setRating(ratingNumber)
        const ratingId = fetch('http://localhost:39249/movie/rating?' + new URLSearchParams({
            movieid: props.movieId,
            userid: props.userId,
        })).then(user => user.json()).then(userData => {
            if (userData.status !== 404) {
                return userData
            } else {
                return -1;
            }
        })
        if (ratingId !== -1) {
            const resMovieRate = fetch('http://localhost:39249/movie/ratings', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ movieid: props.movieId, userid: props.userId, rating: 5 })
            });
            if (resMovieRate.ok) {
                props.close
            } else {
                console.log("Error posting rating")
            }
        } else {
            const resMovieRate = fetch('http://localhost:39249/movie/ratings?', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ratingid: ratingId, rating: 5 })
            });
            if (resMovieRate.ok) {
                props.close
            } else {
                console.log("Error updating rating")
            }
        }
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bottom-0 right-0">
            <div className="w-screen h-screen bg-black opacity-80 flex flex-col fixed justify-center items-center">
                <div className="w-fit h-fit bg-grey rounded-lg">
                    <div className="h-1 text-sm text-right pr-2 hover:text-red hover:cursor-pointer"><i onClick={props.close} className="fas fa-close"></i></div>
                    <ul className="h-fit w-fit p-2 flex justify-evenly">
                        {[...Array(10)].map((star, i) => {
                            const ratingNumber = i + 1
                            return (
                                <label>
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="rating"
                                        value={ratingNumber}
                                        onClick={rateMovie}
                                    />
                                    <FaStar
                                        className="hover:cursor-pointer"
                                        color={ratingNumber <= (hover || rating) ? "#e20100" : "#ffffff"}
                                        size={50}
                                        onMouseEnter={() => setHover(ratingNumber)}
                                        onMouseLeave={() => setRating(null)}
                                        onClick={rateMovie}
                                    />
                                </label>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Rating