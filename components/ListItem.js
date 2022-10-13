export default function ListItem({ movie }) {
  const tags = movie.genres.map((genre, index) => {
    return <span key={index} className="select-none xs:text-xs sm:text-xs md:text-sm lg:text-md rounded-xl w-fit h-fit mr-1 md:mt-5 sm:mt-3 xs:mt-2 px-1 cursor-default bg-opacity-80 text-grey hover:bg-red hover:text-white border border-lightgrey transition-all duration-300">{genre}</span>
  });

  const actors = movie.actors.map((actor, index) => {
    if (index === 0) {
      return <span className="text-grey"><span key={index} className="xs:text-sm sm:text-sm md:text-md lg:text-lg w-fit h-fit cursor-default text-black hover:bg-red hover:text-white  transition-all duration-300">{actor.name + " " + actor.surname}</span>{", "}</span>
    } else if (index < movie.actors.length - 1) {
      return <span className="text-grey"><span key={index} className="xs:text-xs sm:text-xs md:text-sm lg:text-md w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{actor.name + " " + actor.surname}</span>{", "}</span>
    }
    return <span key={index} className="xs:text-xs sm:text-xs md:text-sm lg:text-md w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{actor.name + " " + actor.surname}</span>
  });

  let ratingImg = "";

  // Animate rating elephant based on rating nr
  if (movie.rating <= 2) {
    ratingImg = "/ratings/20.png";
  } else if (movie.rating <= 4) {
    ratingImg = "/ratings/40.png";

  } else if (movie.rating <= 5) {
    ratingImg = "/ratings/50.png";

  } else if (movie.rating <= 7) {
    ratingImg = "/ratings/70.png";

  } else if (movie.rating <= 8) {
    ratingImg = "/ratings/80.png";

  } else if (movie.rating <= 9) {
    ratingImg = "/ratings/90.png";

  } else if (movie.rating <= 100) {
    ratingImg = "/ratings/95.png";
  } else {
    ratingImg = "/ratings/100.png";
  }

  // Format date
  const year = movie.releaseDate.substring(0, 4)
  const month = movie.releaseDate.substring(5, 7)
  const day = movie.releaseDate.substring(8, 10)
  const date = new Date(year, month, day)

  const dateArray = date.toDateString().split(' ');
  const nrArray = date;
  const dateFormat = dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3];

  return (
    <article className="flex relative shadow-sm items-center space-x-6 p-4 xs:w-[380px] sm:w-[500px] md:w-[650px] lg:w-[950px] ">
      <img src={movie.img.substring(1)} alt="" className="hover:cursor-pointer flex-none rounded-md bg-slate-100 xs:w-20 sm:w-22 md:w-24 lg:w-28" />
      <div className="relative lg:h-40 flex-auto">
        <h2 className="xs:text-xl sm:text-xl md:text-2xl lg:text-3xl sm:my-0 md:my-2 lg:my-3 font-semibold">{movie.title}</h2>
        <div className="flex flex-col flex-wrap xs:text-sm sm:text-sm md:text-md lg:text-lg font-normal">
          <div>{actors}</div>
          <div className="text-grey xs:text-xs sm:text-sm md:text-md lg:text-md">{dateFormat}</div>
          <div>
            <div className="flex items-center">
              {tags}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-20 xs:absolute xs:right-0 xs:bottom-0 sm:relative">
        <div className="h-fit xs:mx-1 md:px-2 px-1 mr-2 ring-1 xs:text-xs sm:text-sm md:text-md ring-red rounded">
          {movie.rating}
        </div>
        <img src={ratingImg} alt="rating" className="xs:w-7 md:w-9" />
      </div>
    </article>
  )
}