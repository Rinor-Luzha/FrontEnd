import React from 'react'
import Banner from '../../components/movie/Banner';
import Cast from '../../components/movie/Cast';

export const getServerSideProps = async (context) => {
    const resQueriedMovie = await fetch(`${process.env.NEXT_PUBLIC_MOVIE}${context.query.id}`);
    if (resQueriedMovie.status === 400) {
        return {
            notFound: true
        }
    }
    const queriedMovie = await resQueriedMovie.json();
    return {
        props: {
            queriedMovie,
        }
    }

}
const Moive = ({ queriedMovie, user }) => {
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
        <div className="flex flex-col justify-center items-center">
            <Banner movie={queriedMovie} user={user} />
            <div className='bg-lightgrey w-full flex justify-center h-fit'>
                <div className="max-w-[1200px] pt-16 h-fit">
                    <div className="flex pt-10 flex-col items-center mb-5">
                        <h2 className="text-3xl mb-1 text-center">{queriedMovie.title}</h2>
                        <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
                    </div>
                    <div className="py-5 border-b border-grey">
                        <div className="flex flex-col w-fit mb-1">
                            <h2 className="text-xl">Description</h2>
                            <div className="border-b-2 border-red w-22"></div>
                        </div>
                        <div className='text-sm sm:text-sm md:text-md lg:text-lg'>{queriedMovie.description}</div>
                    </div>
                    <div className="py-5 border-b border-grey">
                        <div className="flex flex-col w-fit mb-1">
                            <h2 className="text-xl">Actors</h2>
                            <div className="border-b-2 border-red w-16"></div>
                        </div>
                        <Cast cast={queriedMovie.actors} type={"actors"} />
                    </div>
                    <div className='py-5 border-b border-grey'>
                        <div className="flex flex-col w-fit mb-1">
                            <h2 className="text-xl">Writers</h2>
                            <div className="border-b-2 border-red w-16"></div>
                        </div>
                        <Cast cast={queriedMovie.writers} type={"writers"} />
                    </div>
                    <div className='py-5 border-b border-grey'>
                        <div className="flex flex-col w-fit mb-1">
                            <h2 className="text-xl">Directors</h2>
                            <div className="border-b-2 border-red w-20"></div>
                        </div>
                        <Cast cast={queriedMovie.directors} type={"directors"} />
                    </div>

                    <div className='py-5 flex justify-center items-center gap-5'>
                        <div className='text-2xl'>
                            {queriedMovie.rating}
                        </div>
                        <div>
                            <img src={ratingImg} alt="rating" className="w-14 " />
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Moive