import BigSlide from '../components/slides/BigSlide'
import AliceCarousel from 'react-alice-carousel';
import { useEffect } from 'react';
import Movies from '../components/Movies';

export const getStaticProps = async () => {

  // New movies
  const resNew = await fetch('http://localhost:39249/home/new');
  const newMovies = await resNew.json();

  //Check if user is logged in
  const resUserAuth = await fetch('http://localhost:39249/account/user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const userAuth = await resUserAuth.json();

  // if user logged in show the movies he has rated and a list of recommended movies for him
  if (userAuth.status !== 401) {
    const ratedRes = await fetch('http://localhost:39249/home/rated/?id=' + userAuth.id);
    const ratedMovies = await ratedRes.json();

    const recommendedRes = await fetch('http://localhost:39249/home/rated/?id=' + userAuth.id);
    const recommendedMovies = await recommendedRes.json();

    const highestRes = await fetch('http://localhost:39249/home/highest');
    const highestList = await highestRes.json();

    return {
      props: {
        newMoviesList: newMovies,
        ratedMoviesList: ratedMovies,
        recommendedMoviesList: recommendedMovies,
        highestRatedMoviesList: highestList
      }
    }
  } else {
    //else generate random recommended movies
    const ratedMovies = new Array();

    const recommendedRes = await fetch('http://localhost:39249/home/recommended');
    const recommendedMovies = await recommendedRes.json();


    const highestRes = await fetch('http://localhost:39249/home/highest');
    const highestList = await highestRes.json();
    return {
      props: {
        newMoviesList: newMovies,
        ratedMoviesList: ratedMovies,
        recommendedMoviesList: recommendedMovies,
        highestRatedMoviesList: highestList
      }
    }
  }
}


export default function Home({ newMoviesList, ratedMoviesList, recommendedMoviesList, highestRatedMoviesList }) {

  return (
    <>
      {/* Main slider */}

      <div className="w-screen h-104 bg-black absolute shadow-xl"></div>
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
          return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&lt;</p>
        }}
        renderNextButton={() => {
          return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&gt;</p>
        }}>
        {
          newMoviesList.map(movie => {
            const genreArray = movie.genres;
            let genres = "";
            genreArray.map(genre => {
              genres += genre + ", "
            })

            return <BigSlide key={movie.id} title={movie.title}
              genres={genres.substring(0, genres.length - 2)}
              img={movie.img.substring(1)}
            />
          }
          )
        }
      </AliceCarousel>

      {/* Rated movies */}

      {ratedMoviesList.length !== 0 ?
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
            return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&lt;</p>
          }}
          renderNextButton={() => {
            return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&gt;</p>
          }}>
          {
            ratedMoviesList.map(movie => {
              const genreArray = movie.genres;
              let genres = "";
              genreArray.map(genre => {
                genres += genre + ", "
              })

              return <BigSlide title={movie.title}
                genres={genres.substring(0, genres.length - 2)}
                img={movie.img.substring(1)}
              />
            }
            )
          }
        </AliceCarousel>
        : ""}

      {/* Recommended movies */}
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
          return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&lt;</p>
        }}
        renderNextButton={() => {
          return <p className="select-none left-5 px-[12px] pt-[3px] inline-block bottom-4 text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&gt;</p>
        }}>
        {
          recommendedMoviesList.map(movie => {
            const genreArray = movie.genres;
            let genres = "";
            genreArray.map(genre => {
              genres += genre + ", "
            })

            return <BigSlide title={movie.title}
              genres={genres.substring(0, genres.length - 2)}
              img={movie.img.substring(1)}
            />
          }
          )
        }
      </AliceCarousel>


      {/* Highest rated movies */}
      <Movies movies={highestRatedMoviesList} />
    </>
  )
} 
