import React from 'react'
import Movies from '../components/Movies'


export const getServerSideProps = async (context) => {
    const resQueriedMovies = await fetch(`${process.env.NEXT_PUBLIC_SEARCH}?title=${context.query.title}`);
    const queriedMovies = await resQueriedMovies.json();
    return {
        props: {
            queriedMovies,
            query: context.query.title
        }
    }
}

const Search = ({ queriedMovies, query }) => {
    return (
        <div div className="py-5" >
            <div className="flex flex-col items-center">
                <h2 className="text-3xl md: mb-1 text-center">Search results</h2>
                <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
            </div>
            {
                queriedMovies.length !== 0 ? <Movies movies={queriedMovies.slice(0, 10)} /> :
                    <div className="flex justify-center items-center flex-col">
                        <div className="text-grey text-xl sm:text-2xl text-center m-10">No results found for '{query}'<br />
                            Please try another title.</div>
                        <img src="/notFound.png" className="text-center w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]" />
                    </div>
            }
        </div >
    )
}

export default Search

// const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//         router.push({
//             pathname: '/search',
//             query: { title: searchParams },
//         })
//     }
// }