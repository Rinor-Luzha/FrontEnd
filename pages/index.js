import BigSlide from '../components/slides/BigSlide'
import AliceCarousel from 'react-alice-carousel';
import Movies from '../components/Movies'
import { useState, useEffect } from 'react'
import ResponsiveCarousel from '../components/ResponsiveCarousel';

export const getStaticProps = async () => {

  // New movies
  const resNew = await fetch('http://localhost:39249/home/new');
  const newMovies = await resNew.json();

  // Generate recommended movies in case user is not logged in
  const recommendedRes = await fetch('http://localhost:39249/home/recommended');
  const recommendedMovies = await recommendedRes.json();

  const highestRes = await fetch('http://localhost:39249/home/highest');
  const highestList = await highestRes.json();

  return {
    props: {
      newMoviesList: newMovies,
      staticRecommended: recommendedMovies,
      highestRatedMoviesList: highestList
    }
  }
}


export default function Home({ newMoviesList, staticRecommended, highestRatedMoviesList }) {
  const [domLoaded, setDomLoaded] = useState(false);

  const [ratedMovies, setRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    setDomLoaded(true)
    fetch('http://localhost:39249/account/user', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(user => user.json())
      .then(userData => {
        if (userData.id !== 'undefined') {
          setLoggedIn(true);
          // Get recommended movies
          console.log(userData.id)
          fetch('http://localhost:39249/home/recommended?userid=' + userData.id).then(movies => movies.json())
            .then(movieData => {
              setRecommendedMovies(movieData)
            })

          // Get rated movies
          fetch('http://localhost:39249/home/rated/?id=' + userData.id).then(movies => movies.json())
            .then(movieData => {
              setRatedMovies(movieData)
            })
        }
      })
  }, []);


  return (
    <>
      {/* Main slider */}
      <div className='py-5'>
        <div className="my-5 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-1">New Movies</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        <div className="w-full m-0 p-0 h-104 bg-black absolute shadow-xl"></div>
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
            return <p className="select-none ml-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&lt;</p>

          }}
          renderNextButton={() => {
            return <p className="select-none mr-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all font-bold">&gt;</p>

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
      </div>

      {/* Rated movies */}

      {ratedMovies.length !== 0 && domLoaded ?
        <div className="py-5 shadow-sm">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-1">Movies you have rated</h2>
            <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
          </div>
          <ResponsiveCarousel movies={ratedMovies} />
        </div> : ""
      }

      {/* Recommended movies */}

      <div className="py-5 border-t border-lightgrey shadow-sm">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-1">Recommended movies for you</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        {domLoaded ? (loggedIn ?
          <ResponsiveCarousel movies={staticRecommended} /> :
          <ResponsiveCarousel movies={recommendedMovies} />
        ) : ""}
      </div>

      <div>
        <Movies movies={highestRatedMoviesList} />
      </div>
    </>
  )
} 
