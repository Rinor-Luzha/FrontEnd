import React from 'react'
export const Slide = (props) => {
    console.log(props);
    return (
        <div className="container h-96 font-ques hover:cursor-pointer bg-white">
            <img src={props.img} alt={props.title} className="absolute mix-blend-overlay h-96 w-80 " />
            <div className="flex flex-col h-full justify-between">
                <p className="text-white w-fit px-5 rounded-sm bg-zinc-700 text-center py-2 italic ">{props.tag}</p>
                <h2 className="w-80 bg-black text-gra text-center py-5 text-3xl">{props.title}</h2>
            </div>
        </div>
    )
}
export default Slide;
