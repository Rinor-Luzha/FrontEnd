import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { newMovies } from '../../../endpoints'
import AliceCarousel from 'react-alice-carousel';
import Slide from './Slide'

const MainSlider = () => {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        Axios.get(newMovies).then(res => setMovieList(res.data)).catch(err => console.log(err));
    }, []);
    return (
        <AliceCarousel duration={400}
            autoPlay={true}
            startIndex={1}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={true}
            autoPlayInterval={2000}
            autoPlayDirection="rtl"
            autoPlayActionDisabled={true} >
            {movieList.map(movie =>
                <Slide title={movie.title}
                    tag={movie.length}
                    img={require(`.${movie.img}`)}
                />
            )
            }

        </AliceCarousel>
    )
}
export default MainSlider;