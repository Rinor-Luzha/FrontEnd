import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import Slide from './slides/Slide'
const ResponsiveCarousel = ({ movies, close, rated, removeRating, user }) => {
    return (
        <AliceCarousel duration={500}
            responsive={{
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 },

            }}
            disableDotsControls={true}
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
                return <p className="select-none absolute bottom-60 left-4 px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all">&lt;</p>
            }}
            renderNextButton={() => {
                return <p className="select-none absolute bottom-60 right-4 px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all ">&gt;</p>
            }}>
            {
                movies.map(movie => {
                    return <Slide
                        movieId={movie.id}
                        close={close}
                        title={movie.title}
                        genres={movie.genres}
                        img={movie.img.substring(1)}
                        rating={movie.rating}
                        rated={rated}
                        removeRating={removeRating}
                        user={user}
                    />
                }
                )
            }
        </AliceCarousel>
    )
}

export default ResponsiveCarousel