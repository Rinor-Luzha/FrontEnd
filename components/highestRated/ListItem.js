import Link from "next/link";

export default function ListItem({ movie }) {

  const genreTags = getGenreTags(movie.genres)

  const actors = getMovieActors(movie.actors)

  const ratingImg = getRatingImgSrc(movie.rating)

  const releaseDate = getFormatedDate(movie.releaseDate)

  return (
    <article className="flex relative shadow-sm items-center space-x-6 p-4 w-[380px] sm:w-[500px] md:w-[650px] lg:w-[950px] ">
      <Link href={`/movies/${movie.id}`}>
        <img src={movie.img.substring(1)} alt={movie.title} className="hover:cursor-pointer flex-none rounded-md bg-slate-100 w-20 sm:w-22 md:w-24 lg:w-28" />
      </Link>
      <div className="relative lg:h-40 flex-auto">
        <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl sm:my-0 md:my-2 lg:my-3 font-semibold">{movie.title}</h2>
        <div className="flex flex-col flex-wrap text-sm sm:text-sm md:text-md lg:text-lg font-normal">
          <div>{actors}</div>
          <div className="text-grey text-xs sm:text-sm md:text-md lg:text-md">{releaseDate}</div>
          <div>
            <div className="flex items-center">
              {genreTags}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-20 absolute right-0 bottom-0 sm:relative">
        <div className="h-fit mx-1 md:px-2 px-1 mr-2 ring-1 text-xs sm:text-sm md:text-md ring-red rounded">
          {movie.rating}
        </div>
        <img src={ratingImg} alt="rating" className="w-7 md:w-9" />
      </div>
    </article>
  )
}


// Get the rating elephant img source from the rating number
const getRatingImgSrc = (rating) => {
  if (rating <= 2) {
    return "/ratings/20.png"
  }
  if (rating <= 4) {
    return "/ratings/40.png"
  }
  if (rating <= 5) {
    return "/ratings/50.png"
  }
  if (rating <= 7) {
    return "/ratings/70.png"
  }
  if (rating <= 8) {
    return "/ratings/80.png"
  }
  if (rating <= 9) {
    return "/ratings/90.png"
  }
  if (rating <= 9.5) {
    return "/ratings/95.png"
  }
  return "/ratings/100.png"
}


// Get formated release date
const getFormatedDate = (releaseDate) => {

  const year = releaseDate.substring(0, 4)
  const month = releaseDate.substring(5, 7)
  const day = releaseDate.substring(8, 10)

  const date = new Date(year, month, day)

  const dateArray = date.toDateString().split(' ');
  return dateArray[2] + ' ' + dateArray[1] + ' ' + dateArray[3];
}

const getMovieActors = (actors) => {
  return actors.map((actor, index) => {
    if (index === 0) {
      return <span className="text-grey"><span key={index} className="text-sm sm:text-sm md:text-md lg:text-lg w-fit h-fit cursor-default text-black hover:bg-red hover:text-white  transition-all duration-300">{actor.name + " " + actor.surname}</span>{", "}</span>
    } else if (index < actors.length - 1) {
      return <span className="text-grey"><span key={index} className="text-xs sm:text-xs md:text-sm lg:text-md w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{actor.name + " " + actor.surname}</span>{", "}</span>
    }
    return <span key={index} className="text-xs sm:text-xs md:text-sm lg:text-md w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{actor.name + " " + actor.surname}</span>
  })
}

const getGenreTags = (genres) => {
  return genres.map((genre, index) => {
    return <span key={index} className="select-none text-xs sm:text-xs md:text-sm lg:text-md rounded-xl w-fit h-fit mr-1 md:mt-5 sm:mt-3 mt-2 px-1 cursor-default bg-opacity-80 text-grey hover:bg-red hover:text-white border border-lightgrey transition-all duration-300">{genre}</span>
  })
}