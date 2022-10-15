import React from 'react'
const Cast = ({ cast, type }) => {
    return (<div className="flex flex-wrap gap-2">
        {
            cast.map((unit, index) => {
                if (type === "actors") {
                    return (
                        <div className="flex gap-2" key={index}>
                            <div className="w-fit">
                                <span className="text-sm md:text-lg lg:text-lg w-fit h-fit cursor-default text-black hover:bg-red hover:text-white transition-all duration-300">{unit.actor.name + " " + unit.actor.surname}
                                </span>
                            </div>
                            <div className="w-fit ">
                                <span className="text-sm md:text-lg lg:text-lg w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{"(" + unit.characterName + ")"}
                                </span>
                                {(index < cast.length - 1) ? ", " : ""}
                            </div>
                        </div>
                    )
                } else if (type === "writers") {
                    return (
                        <div className="flex gap-2" key={index}>
                            <div className="w-fit">
                                <span className="text-sm md:text-lg lg:text-lg w-fit h-fit cursor-default text-black hover:bg-red hover:text-white transition-all duration-300">{unit.writer.name + " " + unit.writer.surname}
                                </span>
                            </div>
                            <div className="w-fit " key={index}>
                                <span className="text-sm md:text-lg lg:text-lg w-fit h-fit cursor-default text-grey hover:bg-red hover:text-white transition-all duration-300">{unit.credit && "(" + unit.credit + ")"}
                                </span>
                                {(index < cast.length - 1) ? ", " : ""}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex gap-2" key={index}>
                            <div className="w-fit">
                                <span className="text-sm md:text-lg lg:text-lg w-fit h-fit cursor-default hover:bg-red hover:text-white transition-all duration-300">{unit.name + " " + unit.surname}
                                </span>
                                {(index < cast.length - 1) ? ", " : ""}
                            </div>
                        </div>
                    )
                }
            })
        }
    </div >
    )
}

export default Cast