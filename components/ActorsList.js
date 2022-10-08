import List from './List.js'
import ListItem from './ListItem.js'

export default function Actors({ actors }) {
  return (
    <div className="divide-y divide-slate-100">
      <List>
        {actors?.map((actor) => (
          <ListItem key={actor.id} actor={actor} />
        ))}
      </List>
    </div>
  )
}