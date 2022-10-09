
import List from './List.js'
import ListItem from './ListItem.js'

export default function Movies({ movies }) {
    return (
        <div className="flex justify-center align-center">
            <List>
                {movies.map((movie) => (
                    <ListItem key={movie.id} movie={movie} />
                ))}
            </List>
        </div>
    )
}