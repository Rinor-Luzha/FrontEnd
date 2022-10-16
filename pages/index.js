import HighestRatedMovies from '../components/highestRated/HighestRatedMovies'
import { useState, useEffect } from 'react'
import ResponsiveCarousel from '../components/ResponsiveCarousel';
import Rating from '../components/Rating';
import RandomMovie from '../components/randomMovie/RandomMovie';
import NewMovies from '../components/homePage/NewMovies';
import SectionTitle from '../components/homePage/SectionTitle';
export const getServerSideProps = async () => {

  // New movies
  const resNew = await fetch(process.env.NEW_MOVIES);
  const newMovies = await resNew.json();

  // Generate recommended movies if the user is not logged in
  const recommendedRes = await fetch(process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES);
  const recommendedMovies = await recommendedRes.json();

  const highestRatedRes = await fetch(process.env.NEXT_PUBLIC_HIGHEST_RATED_MOVIES);
  const highestRatedList = await highestRatedRes.json();

  return {
    props: {
      newMoviesList: newMovies,
      staticRecommended: recommendedMovies,
      staticHighestRated: highestRatedList
    }
  }
}


export default function Home({ newMoviesList, staticRecommended, staticHighestRated, user }) {
  const [domLoaded, setDomLoaded] = useState(false);

  // Movie lists
  const [ratedMovies, setRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);

  // Condition to show popup
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  // Trigger for refreshing movies
  const [removedRating, setRemovedRating] = useState(false);

  // Set movie id when rating movie
  const [clickedMovie, setClickedMovie] = useState(null);

  // Condition for PUT instead of POST in movie rating
  const [ratedBefore, setRatedBefore] = useState(null);


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

  // Refresh your rated, recommended and highest rated movies when you make a rating
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
  }, [showRatingPopup === true]);

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

  // Refresh your rated and recommended movies when you log out or log in
  useEffect(() => {
    if (user !== null) {
      // Refresh you rated movies
      fetch(`${process.env.NEXT_PUBLIC_RATED_MOVIES}?id=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRatedMovies(movieData)
        })

      // Get updated recommended movies
      fetch(`${process.env.NEXT_PUBLIC_RECOMMENDED_MOVIES}?userid=${user.id}`).then(movies => movies.json())
        .then(movieData => {
          setRecommendedMovies(movieData)
        })
    } else {
      setRatedMovies([])
      setRecommendedMovies([])
    }
  }, [user]);


  const toggleRatingPopup = (id, ratedBefore = false) => {
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
    setShowRatingPopup(!showRatingPopup)
    setRatedBefore(ratedBefore)
  }

  const toggleRemoveRating = () => {
    setRemovedRating(!removedRating);
  }



  return (
    <>
      {/* Main slider */}

      <section className='py-5 pt-20' id="new">
        <NewMovies movieList={newMoviesList} />
      </section>

      {/* Rated movies */}

      {ratedMovies.length !== 0 && domLoaded ?
        <section className="py-5 shadow-sm" id="myRatings">
          <SectionTitle text="Movies you have rated" />
          <ResponsiveCarousel close={toggleRatingPopup} movies={ratedMovies} rated={true} user={user} removeRating={toggleRemoveRating} />
        </section> : ""
      }

      {/* Recommended movies */}

      <section className="py-5" id="recommended">
        <SectionTitle text="Recommended movies for you" />
        {domLoaded ? (user === null ?
          <ResponsiveCarousel close={toggleRatingPopup} movies={staticRecommended} rated={false} removeRating={toggleRemoveRating} />
          :
          <ResponsiveCarousel close={toggleRatingPopup} movies={recommendedMovies} rated={false} removeRating={toggleRemoveRating} />
        ) : ""}
      </section>

      {/* Highest rated movies */}

      <section className="py-5" id="highestRated">
        <SectionTitle text="Top 10 highest rated movies" />
        <HighestRatedMovies movies={highestRatedMovies.length === 0 ? staticHighestRated.slice(0, 10) : highestRatedMovies.slice(0, 10)} />
      </section>

      {/* Random movie */}

      <section className='relative'>
        <div className="py-5" id="randomMovie">
          <SectionTitle text="Don't know what to watch?" />
          <RandomMovie close={toggleRatingPopup} user={user} />
        </div>
      </section>

      {showRatingPopup &&
        <Rating close={toggleRatingPopup} movieId={clickedMovie} user={user} ratedBefore={ratedBefore} />
      }
    </>
  )
}

