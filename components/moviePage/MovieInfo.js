import React from 'react'
import Cast from './Cast'
const MovieInfo = ({ editedMovie, queriedMovie }) => {
    // Animate rating elephant based on rating nr
    let ratingImg = ""
    if (queriedMovie.rating <= 2) {
        ratingImg = "/ratings/20.png";
    } else if (queriedMovie.rating <= 4) {
        ratingImg = "/ratings/40.png";

    } else if (queriedMovie.rating <= 5) {
        ratingImg = "/ratings/50.png";

    } else if (queriedMovie.rating <= 7) {
        ratingImg = "/ratings/70.png";

    } else if (queriedMovie.rating <= 8) {
        ratingImg = "/ratings/80.png";

    } else if (queriedMovie.rating <= 9) {
        ratingImg = "/ratings/90.png";

    } else if (queriedMovie.rating <= 9.5) {
        ratingImg = "/ratings/95.png";
    } else {
        ratingImg = "/ratings/100.png";
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
                        <img src={ratingImg} alt="rating" className="w-14 " />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieInfo