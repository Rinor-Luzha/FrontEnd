import React from 'react'

const GenreTags = ({ genres }) => {
    const tags = genres.map((genre, index) => {
        return <span key={index} className="select-none text-sm rounded-xl w-fit h-fit m-1 px-1 cursor-default bg-opacity-80 text-grey hover:bg-red hover:text-white border border-lightgrey transition-all duration-300">{genre}</span>
    })
    return (
        <div className="absolute opacity-0 -translate-y-5 w-full z-10 bg-white flex justify-center items-center gap-2 h-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {tags}
        </div>
    )
}

export default GenreTags