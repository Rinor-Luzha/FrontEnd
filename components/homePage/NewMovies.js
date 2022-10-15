import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import BigSlide from '../slides/BigSlide'
import SectionTitle from './SectionTitle'

const NewMovies = ({ movieList }) => {
    return (
        <>
            <SectionTitle text="New Movies" />
            <article className='mt-5'>
                <div className="w-full h-104 bg-black absolute shadow-xl"></div>
                <AliceCarousel duration={500}
                    autoPlay={true}
                    startIndex={1}
                    infinite={true}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    playButtonEnabled={true}
                    autoPlayInterval={10000}
                    touchTracking={true}
                    autoPlayActionDisabled={true}
                    renderPrevButton={() => {
                        return <p className="select-none ml-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all">&lt;</p>
                    }}
                    renderNextButton={() => {
                        return <p className="select-none mr-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all">&gt;</p>
                    }}>
                    {
                        movieList.map(movie => {
                            const genreArray = movie.genres;
                            let genres = "";
                            genreArray.map(genre => {
                                genres += genre + ", "
                            })
                            return <BigSlide key={movie.id} movieId={movie.id} title={movie.title}
                                genres={genres.substring(0, genres.length - 2)}
                                img={movie.img.substring(1)}
                            />
                        }
                        )
                    }
                </AliceCarousel>
            </article>
        </>
    )
}

export default NewMovies