import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Icon } from '@iconify/react';

const Rating = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const saveRating = async (ratingNumber) => {
        const res = await fetch('http://localhost:39249/movie/rating', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ movieId: props.movieId, userId: props.userId, rating: ratingNumber })
        })
        if (res.status === 201) {
            swal({
                title: "Good job!",
                text: "Rating created!",
                icon: "success",
                timer: 1500,
                buttons: false
            });

        } else if (res.status === 200) {
            swal({
                title: "Good job!",
                text: "Rating updated!",
                icon: "success",
                timer: 1500,
                buttons: false
            });
        } else {
            swal("Error!", "There was an error while rating the movie!", "error");
        }
        props.close();
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bottom-0 right-0">
            <div className="w-screen h-screen bg-black opacity-80 flex flex-col fixed justify-center items-center" onClick={props.close}>
                <div className="w-fit h-16 lg:h-fit bg-grey rounded-lg">
                    <div className="h-0 md:text-lg lg:text-xl text-sm text-right pr-2 hover:text-red hover:cursor-pointer"><i onClick={props.close} className="fas fa-close"></i></div>
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
                                    />
                                    <Icon icon="mdi:elephant"
                                        width={65}
                                        className="xs:w-9 md:w-12 lg:w-16 hover:cursor-pointer transition-all duration-200"
                                        color={ratingNumber <= (hover || rating) ? "#e20100" : "#ffffff"}
                                        onMouseEnter={() => setHover(ratingNumber)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => {
                                            setRating(ratingNumber)
                                            saveRating(ratingNumber)
                                        }}
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