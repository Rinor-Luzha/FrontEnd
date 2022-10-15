import React from 'react'
import Cast from './Cast'
const MovieInfo = ({ editedMovie, queriedMovie }) => {
    // Animate rating elephant based on rating nr
    let ratingImgSrc = ""
    if (editedMovie.length !== 0) {
        ratingImgSrc = getRatingImgSrc(editedMovie.rating)
    } else {
        ratingImgSrc = getRatingImgSrc(queriedMovie.rating)
    }

    return (
        <section className='bg-lightgrey w-full flex justify-center h-fit shadow-md'>
            <div className="max-w-[1200px] pt-16 h-fit">
                <div className="flex pt-10 flex-col items-center mb-5">
                    <h2 className="text-3xl mb-1 text-center">{queriedMovie.title}</h2>
                    <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
                </div>
                <div className="py-5 px-3 border-b border-grey">
                    <div className="flex flex-col w-fit mb-1">
                        <h2 className="text-xl">Description</h2>
                        <div className="border-b-2 border-red w-22"></div>
                    </div>
                    <div className='text-sm sm:text-sm md:text-md lg:text-lg'>{queriedMovie.description}</div>
                </div>
                <div className="py-5 px-3 border-b border-grey">
                    <div className="flex flex-col w-fit mb-1">
                        <h2 className="text-xl">Actors</h2>
                        <div className="border-b-2 border-red w-16"></div>
                    </div>
                    <Cast cast={queriedMovie.actors} type={"actors"} />
                </div>
                <div className='py-5 px-3 border-b border-grey'>
                    <div className="flex flex-col w-fit mb-1">
                        <h2 className="text-xl">Writers</h2>
                        <div className="border-b-2 border-red w-16"></div>
                    </div>
                    <Cast cast={queriedMovie.writers} type={"writers"} />
                </div>
                <div className='py-5 px-3 border-b border-grey'>
                    <div className="flex flex-col w-fit mb-1">
                        <h2 className="text-xl">Directors</h2>
                        <div className="border-b-2 border-red w-20"></div>
                    </div>
                    <Cast cast={queriedMovie.directors} type={"directors"} />
                </div>

                <div className='py-5 px-3 flex justify-center items-center gap-5'>
                    <div className='text-2xl'>
                        {editedMovie.length !== 0 ?
                            editedMovie.rating
                            :
                            queriedMovie.rating
                        }
                    </div>
                    <div>
                        <img src={ratingImgSrc} alt="rating" className="w-14 " />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieInfo

// Get the rating elephant img source from the rating number
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
