import React from 'react'
import Link from 'next/link'
import swal from 'sweetalert';


const Slide = (props) => {

    const genreTags = getGenreTags(props.genres)

    const ratingImg = getRatingImgSrc(props.rating)

    const removeRating = async () => {
        const result = await swal({
            title: "Are you sure?",
            text: "Do you want to remove this rating?",
            icon: "warning",
            button: "Yes",
            dangerMode: true,
        })
        if (result) {
            const res = await fetch(process.env.NEXT_PUBLIC_RATING, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId: props.movieId, userId: props.user.id, rating: 0 })
            })

            if (res.status === 204) {
                swal({
                    title: "Done!",
                    text: "Rating removed!",
                    icon: "success",
                    timer: 1500,
                    buttons: false
                });
            } else {
                swal("Error!", "There was an error while removing the rating!", "error");
            }
            return res.status
        }
    }


    return (<>
        <div className="border mx-2 border-lightgrey items-center group border-md my-10 text-center relative pr-2 transition-all hover:shadow-sm duration-300">
            <div className="text-center m-2">{genreTags}</div>
            {props.rated &&
                <div className="absolute top-2 right-3 text-grey hover:text-red hover:cursor-pointer transition-all duration-300" onClick={async () => { const res = await removeRating(); if (res === 204) await props.removeRating() }} ><i className="fas fa-close text-4xl"></i></div>
            }
            <div className="flex items-center justify-center h-80">
                <img src={props.img} className="h-80" alt="movie" />
            </div>
            <div className="">
                <div className="cursor-default w-full text-2xl text-black">{props.title}</div>
                <div className="flex justify-center">
                    <h4 className="font-medium text-lg p-2 text-grey ">{props.rating}</h4>
                    <img src={ratingImg} className="select-none w-8 h-8 pt-2 " />

                </div>
            </div>
            <ul className="absolute opacity-0 invisible flex items-center justify-evenly top-1/2 left-1/2 w-36 h-16 bg-black bg-opacity-50 translate-x-[-50%] translate-y-[-50%] scale-75 transition-all duration-500  group-hover:visible group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] group-hover:scale-100 group-hover:opacity-100">
                <li>
                    <button onClick={() => props.close(props.movieId, props.rated)} >
                        <i className="text-white relative flex items-center justify-center w-12 h-12 cursor-pointer trasition-all duration-500 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-lg hover:bg-black hover:bg-opacity-80 hover:scale-110 fas fa-star"></i>
                    </button>
                </li>
                <li>
                    <Link href={`/movies/${props.movieId}`} >
                        <i className="text-white relative flex items-center justify-center w-12 h-12 cursor-pointer trasition-all duration-500 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-lg hover:bg-black hover:bg-opacity-80 hover:scale-110 fa-solid fas	fa-angle-up"></i>
                    </Link>
                </li>
            </ul>
        </div>
    </>

    )
}

export default Slide

const getRatingImgSrc = (rating) => {
    if (rating <= 2) {
        return "/ratings/20.png"
    }
    if (rating <= 4) {
        return "/ratings/40.png"
    }
    if (rating <= 5) {
        return "/ratings/50.png"
    }
    if (rating <= 7) {
        return "/ratings/70.png"
    }
    if (rating <= 8) {
        return "/ratings/80.png"
    }
    if (rating <= 9) {
        return "/ratings/90.png"
    }
    if (rating <= 9.5) {
        return "/ratings/95.png"
    }
    return "/ratings/100.png"
}

const getGenreTags = (genres) => {
    return genres.map((genre, index) => {
        return <span key={index} className="select-none text-xs rounded-xl w-fit h-fit m-1 px-1 cursor-default bg-opacity-80 text-grey hover:bg-red hover:text-white border border-lightgrey transition-all duration-300">{genre}</span>
    })
}