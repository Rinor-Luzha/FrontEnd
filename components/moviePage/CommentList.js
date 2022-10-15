import React, { useState, useRef } from 'react'
import Comment from './Comment'
const CommentList = ({ user, changedMovieDetails, setChangedMovieDetails, editedMovie, queriedMovie }) => {
    const [commentText, setCommentText] = useState(null)
    const addComment = useRef()

    const handleAddComment = (e) => {
        if (e.keyCode === 13) {
            postComment()
        } else {
            setCommentText(e.target.value)
        }
    }
    const postComment = async () => {
        if (user === null) {
            swal({
                title: "You are not logged in!",
                text: "You have to be logged in to post a comment!",
                icon: "info",
                timer: 2000,
                buttons: false
            })
            addComment.current.value = ""
            setCommentText("")
            return
        }
        try {
            const commentRes = await fetch(process.env.NEXT_PUBLIC_COMMENT, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userid: user.id, movieid: queriedMovie.id, comment: commentText })
            });
            if (commentRes.status === 201) {
                setCommentText("")
                addComment.current.value = ""
                setChangedMovieDetails(!changedMovieDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className='h-fit w-full max-w-5xl px-3'>
            <div className="flex pt-10 flex-col items-center mb-5">
                <h2 className="text-2xl md:text-3xl mb-1 text-center">Comments</h2>
                <div className="border-b-2 border-red w-24 inline-block mt-2"></div>
            </div>
            {
                editedMovie.length === 0 ?
                    queriedMovie.comments.map(comment => {
                        return <Comment key={comment.id} user={user} comment={comment} changedMovieDetails={changedMovieDetails} setChangedMovieDetails={setChangedMovieDetails} />
                    })
                    :
                    editedMovie.comments.map(comment => {
                        return <Comment key={comment.id} user={user} comment={comment} changedMovieDetails={changedMovieDetails} setChangedMovieDetails={setChangedMovieDetails} />
                    })
            }
            <div className="py-5 border-b border-grey">
                <div className="px-3 flex flex-col w-fit mb-1">
                    <h2 className="text-xl">Leave a comment</h2>
                    <div className="border-b-2 border-red w-40 mb-5"></div>
                </div>
                <div className='flex justify-between items-end gap-2 '>
                    <textarea ref={addComment} rows="4" onKeyUp={handleAddComment} className='w-11/12 border border-lightgrey resize-none outline-none'></textarea>
                    <p onClick={() => { postComment() }} className='hover:text-red text-grey transition-all duration-300 cursor-pointer '>
                        Submit
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CommentList