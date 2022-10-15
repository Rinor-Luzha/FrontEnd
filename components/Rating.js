import React, { useState } from 'react'
import swal from 'sweetalert';
import { Icon } from '@iconify/react';

const Rating = (props) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const saveRating = async (ratingNumber) => {
        if (props.ratedBefore === true) {
            const res = await fetch(process.env.NEXT_PUBLIC_RATING, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId: props.movieId, userId: props.user.id, rating: ratingNumber })
            })
            if (res.status === 200) {
                swal({
                    title: "Done!",
                    text: "Rating updated!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                });

            } else {
                swal("Error!", "There was an error while editing the rating!", "error");
            }
        } else {
            const res = await fetch(process.env.NEXT_PUBLIC_RATING, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId: props.movieId, userId: props.user.id, rating: ratingNumber })
            })
            if (res.status === 201) {
                swal({
                    title: "Done!",
                    text: "Rating created!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                });
            } else if (res.status === 200) {
                swal({
                    title: "Done!",
                    text: "Rating updated!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                });
            } else {
                swal("Error!", "There was an error while rating the movie!", "error");
            }
        }
        props.close()
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bottom-0 right-0">
            <div className="w-screen h-screen bg-black opacity-80 flex flex-col fixed justify-center items-center" onClick={props.close}>
                <div id="ratingBox" className="w-fit h-12 md:h-fit bg-grey rounded-lg " onClick={(e) => { if (e.target.id == 'ratingBox') e.preventDefault(); e.stopPropagation() }}>
                    <ul className="h-fit w-fit px-1 flex justify-evenly">
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
                                        className="xs:w-9 md:w-12 lg:w-16 pb-4 md:pb-0 hover:cursor-pointer transition-all duration-200"
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
                        <div><i onClick={props.close} className="pr-1 hover:text-red hover:cursor-pointer fas fa-close text-2xl hidden md:block lg:text-3xl "></i></div>
                    </ul>
                </div>
            </div >
        </div >
    )
}

export default Rating