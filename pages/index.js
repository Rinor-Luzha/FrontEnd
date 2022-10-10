import BigSlide from '../components/slides/BigSlide'
import AliceCarousel from 'react-alice-carousel';
import Movies from '../components/Movies'
import { useState, useEffect, useRef } from 'react'
import ResponsiveCarousel from '../components/ResponsiveCarousel';
import Rating from '../components/Rating';
import Footer from '../components/Footer';

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
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);

  const [userId, setUserId] = useState(null);

  const showRatingPopup = useRef(false);

  const [removedRating, setRemovedRating] = useState(false);


  const [clickedMovie, setClickedMovie] = useState(null);

  // On DOM load get user id together with his rated movies and recommended movies for him
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
        if (userData.status !== 401) {
          setUserId(userData.id);
          // Get recommended movies
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

  //Refresh your rated, recommended and highest rated movies when you make a rating
  useEffect(() => {
    if (userId !== null) {

      // Get updated highest rated movies
      fetch('http://localhost:39249/home/highest').then(movies => movies.json())
        .then(movieData => {
          setHighestRatedMovies(movieData)
        })

      // Get recommended movies
      fetch('http://localhost:39249/home/recommended?userid=' + userId).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })

      // Get rated movies
      fetch('http://localhost:39249/home/rated/?id=' + userId).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
    } else {
      fetch('http://localhost:39249/account/user', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(user => user.json())
        .then(userData => {
          if (userData.status !== 401) {
            setUserId(userData.id);

            // Get updated highest rated movies
            fetch('http://localhost:39249/home/highest').then(movies => movies.json())
              .then(movieData => {
                setHighestRatedMovies(movieData)
              })

            // Get recommended movies
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
    }
  }, [showRatingPopup.current]);

  // Refresh your rated, recommended and highest rated movies when you remove a rating
  useEffect(() => {
    if (userId !== null) {
      // Refresh you rated movies
      fetch('http://localhost:39249/home/rated/?id=' + userId).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })
      // Get updated highest rated movies
      fetch('http://localhost:39249/home/highest').then(movies => movies.json())
        .then(movieData => {
          setHighestRatedMovies(movieData)
        })

      // Get updated recommended movies
      fetch('http://localhost:39249/home/recommended?userid=' + userId).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })

    } else {
      fetch('http://localhost:39249/account/user', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(user => user.json())
        .then(userData => {
          if (userData.status !== 401) {
            setUserId(userData.id);
            // Refresh you rated movies
            fetch('http://localhost:39249/home/rated/?id=' + userData.id).then(movies => movies.json())
              .then(movieData => {
                setRatedMovies(movieData)
              })
            // Get updated highest rated movies
            fetch('http://localhost:39249/home/highest').then(movies => movies.json())
              .then(movieData => {
                setHighestRatedMovies(movieData)
              })

            // Get updated recommended movies
            fetch('http://localhost:39249/home/recommended?userid=' + userData.id).then(movies => movies.json())
              .then(movieData => {
                setRecommendedMovies(movieData)
              })
          }
        })
    }
  }, [removedRating]);


  const toggleRatingPopup = (id) => {
    if (userId === null) {
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
    showRatingPopup.current = !showRatingPopup.current;
  }

  const toggleRemoveRating = () => {
    setRemovedRating(!removedRating);
  }



  return (
    <>
      {/* Main slider */}
      <div className='py-5'>
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
            <h2 className="text-3xl mb-1 text-center">Movies you have rated</h2>
            <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
          </div>
          <ResponsiveCarousel close={toggleRatingPopup} movies={ratedMovies} rated={true} userId={userId} removeRating={toggleRemoveRating} />
        </div> : ""
      }

      {/* Recommended movies */}

      <div className="py-5">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl mb-1 text-center">Recommended movies for you</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        {domLoaded ? (userId === null ?
          <ResponsiveCarousel close={toggleRatingPopup} movies={staticRecommended} rated={false} removeRating={toggleRemoveRating} />
          :
          <ResponsiveCarousel close={toggleRatingPopup} movies={recommendedMovies} rated={false} removeRating={toggleRemoveRating} />
        ) : ""}
      </div>
      <div className="py-5">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl mb-1 text-center">Top 10 highest rated movies</h2>
          <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
        <Movies movies={highestRatedMovies === null ? highestRatedMoviesList.slice(0, 10) : highestRatedMovies.slice(0, 10)} />
      </div>
      {showRatingPopup.current &&
        <Rating close={toggleRatingPopup} movieId={clickedMovie} userId={userId} />
      }
      <Footer />
    </>
  )
}

