import ListItem from './ListItem.js'

export default function Movies({ movies }) {
    return (
        <div className="flex justify-center align-center">
            <ul>
                {movies.map((movie) => (
                    <ListItem key={movie.id} movie={movie} />
                ))}
            </ul>
        </div>
    )
}