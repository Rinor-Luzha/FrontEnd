import React, { useEffect, useState } from 'react'
import Banner from '../../components/moviePage/Banner';
import CommentList from '../../components/moviePage/CommentList';
import MovieInfo from '../../components/moviePage/MovieInfo';

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

const Movie = ({ queriedMovie, user }) => {
    // Trigger for refreshing movie details
    const [changedMovieDetails, setChangedMovieDetails] = useState(false)

    // New movie when the trigger gets activated
    const [editedMovie, setEditedMovie] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_MOVIE}${queriedMovie.id}`)
            .then(movie => {
                if (!movie.ok) {
                    throw new Error("Error while getting movie from database")
                }
                return movie.json()
            })
            .then(movie => {
                setEditedMovie(movie)
            })
            .catch(error => {
                console.log(error)
            })
    }, [changedMovieDetails])

    return (
        <div className="flex flex-col justify-center items-center">
            <Banner
                movie={queriedMovie}
                user={user}
                changedMovieDetails={changedMovieDetails}
                setChangedMovieDetails={setChangedMovieDetails} />

            <MovieInfo
                editedMovie={editedMovie}
                queriedMovie={queriedMovie} />

            <CommentList
                user={user}
                changedMovieDetails={changedMovieDetails}
                setChangedMovieDetails={setChangedMovieDetails}
                editedMovie={editedMovie}
                queriedMovie={queriedMovie} />
        </div >
    )
}

export default Movie