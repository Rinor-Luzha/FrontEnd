import BigSlide from '../components/slides/BigSlide'
import AliceCarousel from 'react-alice-carousel';
import Movies from '../components/Movies'
import { useState, useEffect } from 'react'
import ResponsiveCarousel from '../components/ResponsiveCarousel';
import Rating from '../components/Rating';
export const getServerSideProps = async () => {

  // New movies
  const resNew = await fetch(process.env.NEW_MOVIES);
  const newMovies = await resNew.json();

  // Generate recommended movies in case user is not logged in
  const recommendedRes = await fetch(process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES);
  const recommendedMovies = await recommendedRes.json();

  const highestRes = await fetch(process.env.NEXT_PUBLIC_HIGHEST_RATED_MOVIES);
  const highestList = await highestRes.json();

  return {
    props: {
      newMoviesList: newMovies,
      staticRecommended: recommendedMovies,
      highestRatedMoviesList: highestList
    }
  }
}


export default function Home({ newMoviesList, staticRecommended, highestRatedMoviesList, user, setUser }) {
  const [domLoaded, setDomLoaded] = useState(false);

  const [ratedMovies, setRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);

  const [showRatingPopup, setShowRatingPopup] = useState(false);


  const [removedRating, setRemovedRating] = useState(false);


  const [clickedMovie, setClickedMovie] = useState(null);

  // On DOM load get user id together with his rated movies and recommended movies for him
  useEffect(() => {
    setDomLoaded(true)
    if (user !== null) {
      // Get recommended movies
      fetch(`${process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES}?userid=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })

      // Get rated movies
      fetch(`${process.env.NEXT_PUBLIC_RATED_MOVIES}?id=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
    }
  }, []);

  //Refresh your rated, recommended and highest rated movies when you make a rating
  useEffect(() => {
    if (user !== null) {
      // Get updated highest rated movies
      fetch(process.env.NEXT_PUBLIC_HIGHEST_RATED_MOVIES).then(movies => movies.json())
        .then(movieData => {
          setHighestRatedMovies(movieData)
        })

      // Get recommended movies
      fetch(`${process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES}?userid=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })

      // Get rated movies
      fetch(`${process.env.NEXT_PUBLIC_RATED_MOVIES}?id=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
    }
  }, [showRatingPopup]);

  // Refresh your rated, recommended and highest rated movies when you remove a rating
  useEffect(() => {
    if (user !== null) {
      // Refresh you rated movies
      fetch(`${process.env.NEXT_PUBLIC_RATED_MOVIES}?id=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
      // Get updated highest rated movies
      fetch(process.env.NEXT_PUBLIC_HIGHEST_RATED_MOVIES).then(movies => movies.json())
        .then(movieData => {
          setHighestRatedMovies(movieData)
        })

      // Get updated recommended movies
      fetch(`${process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES}?userid=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })

    }
  }, [removedRating]);

  useEffect(() => {
    if (user !== null) {
      // Refresh you rated movies
      fetch(`${process.env.NEXT_PUBLIC_RATED_MOVIES}?id=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
      // Get updated highest rated movies
      fetch(process.env.NEXT_PUBLIC_HIGHEST_RATED_MOVIES).then(movies => movies.json())
        .then(movieData => {
          setHighestRatedMovies(movieData)
        })

      // Get updated recommended movies
      fetch(`${process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES}?userid=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })
    } else {
      setRatedMovies([])
    }
  }, [user]);


  const toggleRatingPopup = (id) => {
    if (user === null) {
      swal({
        title: "Please log in first!",
        text: "You need to be logged in to do that!",
        icon: "warning",
        timer: 2000,
        buttons: false
      });
      return
    }
    setClickedMovie(id)
    // showRatingPopup.current = !showRatingPopup.current;
    setShowRatingPopup(!showRatingPopup)
  }

  const toggleRemoveRating = () => {
    setRemovedRating(!removedRating);
  }



  return (
    <>
      {/* Main slider */}
      <div className='py-5 pt-16' id="new">
        <div className="my-5 flex flex-col items-center">
          <h2 className="text-3xl mb-1 text-center">New Movies</h2>
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
            return <p className="select-none ml-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all">&lt;</p>

          }}
          renderNextButton={() => {
            return <p className="select-none mr-auto w-fit px-[12px] pt-[3px]  text-grey rounded-full border-2 border-grey text-4xl hover:cursor-pointer hover:bg-red hover:shadow-md hover:text-white hover:border-white transition-all">&gt;</p>

          }}>
          {
            newMoviesList.map(movie => {
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
      </div>

      {/* Rated movies */}

      {ratedMovies.length !== 0 && domLoaded ?
        <div className="py-5 shadow-sm" id="myRatings">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl mb-1 text-center">Movies you have rated</h2>
            <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
          </div>
          <ResponsiveCarousel close={toggleRatingPopup} movies={ratedMovies} rated={true} user={user} removeRating={toggleRemoveRating} />
        </div> : ""
      }

      {/* Recommended movies */}

      <div className="py-5" id="recommended">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl mb-1 text-center">Recommended movies for you</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        {domLoaded ? (user === null ?
          <ResponsiveCarousel close={toggleRatingPopup} movies={staticRecommended} rated={false} removeRating={toggleRemoveRating} />
          :
          <ResponsiveCarousel close={toggleRatingPopup} movies={recommendedMovies} rated={false} removeRating={toggleRemoveRating} />
        ) : ""}
      </div>
      <div className="py-5" id="highestRated">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl mb-1 text-center">Top 10 highest rated movies</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        <Movies movies={highestRatedMovies.length === 0 ? highestRatedMoviesList.slice(0, 10) : highestRatedMovies.slice(0, 10)} />
      </div>
      {showRatingPopup &&
        <Rating close={toggleRatingPopup} movieId={clickedMovie} user={user} />
      }
    </>
  )
}

