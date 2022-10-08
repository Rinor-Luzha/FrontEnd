import Slide from '../components/slides/BigSlide'
import AliceCarousel from 'react-alice-carousel';
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import MainSlider from '../components/sliders/main/MainSlider'
import Actors from '../components/ActorList'
import ListItem from '../components/ListItem'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:39249/home/new');
  const data = await res.json();
  return {
    props: { movieList: data }
  }
}



export default function Home({ movieList }) {
  return (
    <>
      <div className="w-screen h-104 bg-black absolute shadow-xl"></div>
      <AliceCarousel duration={500}
        autoPlay={true}
        startIndex={1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        playButtonEnabled={true}
        autoPlayInterval={10000}
        touchTracking={true}
        autoPlayActionDisabled={true}
        renderPrevButton={() => {
          return <p className="left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&lt;</p>
        }}
        renderNextButton={() => {
          return <p className="left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&gt;</p>
        }}>
        {
          movieList.map(movie => {
            const genreArray = movie.genres;
            console.log(genreArray);
            let genres = "";
            genreArray.map(genre => {
              genres += genre + ", "
            })

            return <Slide title={movie.title}
              genres={genres.substring(0, genres.length - 2)}
              img={movie.img.substring(1)}
            />
          }
          )
        }
      </AliceCarousel>
      <div>
        <ListItem />
        <MainSlider />
        <Footer />
      </div>
      <title>Ratings Elefanti</title>
      <Header/>
    </>

  )
}
