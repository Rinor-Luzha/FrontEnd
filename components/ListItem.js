export default function ListItem({ movie }) {
  return (
    <article className="flex items-start space-x-6 p-6">
      <img src={movie.img.substring(1)} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{movie.title}</h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-0 flex items-center space-x-1">
            <dt className="text-sky-500">
              <span className="sr-only">Star rating</span>

            </dt>
            <dd>{movie.rating}</dd>
          </div>
          <div>
            <dt className="sr-only">Rating</dt>
            <dd className="px-1.5 ring-1 ring-slate-200 rounded">{movie.rating}</dd>
          </div>
          <div className="ml-2">
            <dt className="sr-only">Year</dt>
            <dd>{movie.releaseDate}</dd>
          </div>
          <div>
            <dt className="sr-only">Genre</dt>
            <dd className="flex items-center">
              <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                <circle cx="1" cy="1" r="1" />
              </svg>
              {movie.genres}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  )
}