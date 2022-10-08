
import List from './List.js'
import ListItem from './ListItem.js'

export default function Movies({ movies }) {
    return (
        <div className="divide-y divide-slate-100">
            <List>
                {movies.map((movie) => (
                    <ListItem key={movie.id} movie={movie} />
                ))}
            </List>
        </div>
    )
}