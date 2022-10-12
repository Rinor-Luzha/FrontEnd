import React from 'react'
import CommentForm from '../components/commentForm';
import CommentList from '../components/commentList';
export const BigSlide = (props) => {
    return (
        <div className="h-104 hover:cursor-pointer w-fit mx-auto hover:scale-[1.02] transition-all duration-500">
            <img src={props.img} alt={props.title} className="absolute mix-blend-soft-light h-104 w-80" />
            <div className="flex flex-col h-full justify-between">
                <p className="text-white w-fit px-5 rounded-sm bg-black text-center py-2 ">{props.genres}</p>
                <h2 className="w-80 bg-black text-white text-center py-5 text-3xl">{props.title}</h2>
            </div>
            <CommentList />
            <CommentForm />
        </div>
    )
}
export default BigSlide;
