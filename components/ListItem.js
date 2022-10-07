
export default function ListItem({ people }) {
    return (
      <article className="flex items-start space-x-6 p-6">
        <div className="min-w-0 relative flex-auto">
          <h2 className="font-semibold text-slate-900 truncate pr-20">{people.Name}</h2>
          <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <div className="ml-2">
              <dt className="sr-only">Birthday</dt>
              <dd>{people.BirthDate}</dd>
            </div>
            <div>
              <dt className="sr-only">Character</dt>
              <dd className="flex items-center">
                <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                {actors.CharacterName}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    )
  }