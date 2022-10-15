import React from 'react'

const SectionTitle = ({ text }) => {
    return (
        <div className="flex flex-col items-center px-5">
            <h2 className="text-3xl mb-1 text-center">{text}</h2>
            <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
        </div>
    )
}

export default SectionTitle