import React, { useState } from 'react'
const Comment = ({ comment, user, changedMovieDetails, setChangedMovieDetails }) => {
    const [editComment, setEditComment] = useState(false)
    const [commentText, setCommentText] = useState(null)

    const handleComment = (e) => {
        if (e.keyCode === 13) {
            putComment()
        } else {
            setCommentText(e.target.value)
        }
    }
    const putComment = async () => {
        try {
            const commentRes = await fetch(process.env.NEXT_PUBLIC_COMMENT, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: comment.id, comment: commentText })
            });
            if (commentRes.status === 200) {
                setEditComment(false)
                setChangedMovieDetails(!changedMovieDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const removeComment = async () => {
        const result = await swal({
            title: "Are you sure?",
            text: "Do you want to remove this comment?",
            icon: "warning",
            button: "Yes",
            dangerMode: true,
        })
        if (result) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_COMMENT}?commentid=${comment.id}`, {
                    method: "DELETE"
                })
                if (res.status === 204) {
                    swal({
                        title: "Done!",
                        text: "Comment removed!",
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });
                    setChangedMovieDetails(!changedMovieDetails)
                } else {
                    swal("Error!", "There was an error while removing the comment!", "error");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <article className='flex justify-between py-2 border-b border-lightgrey'>
            <div className='flex items-center gap-2 w-full'>
                <div>
                    <i className='fas fa-user text-grey px-2 py-[3px] text-2xl rounded-full border shadow hover:text-red hover:cursor-pointer transition-all duration-300'></i>
                </div>
                <div className='flex flex-col w-11/12'>
                    <p className='font-medium text-sm md:text-base lg:text-lg'>{comment.user.name} {comment.user.surname}</p>
                    {(user !== null && user.id === comment.user.id && editComment) ?
                        <textarea rows={1} onKeyUp={handleComment} className='resize-none border-b border-lightgrey outline-none' defaultValue={commentText}></textarea>
                        :
                        <p className='text-grey text-sm md:text-base break-all'>{comment.comment}</p>
                    }
                </div>
            </div>
            {
                user !== null && user.id === comment.user.id &&
                <div className='flex flex-col items-center'>
                    {!editComment &&
                        <i onClick={removeComment} className='fas fa-close text-xl text-black hover:text-red transition-all duration-300 cursor-pointer'></i>
                    }
                    {!editComment ?
                        <p onClick={() => { if (commentText === null) setCommentText(comment.comment); setEditComment(true) }} className='hover:text-red text-grey transition-all duration-300 cursor-pointer '>
                            Edit
                        </p>
                        :

                        <div className="flex flex-col gap-2">
                            <p onClick={() => { putComment() }} className='hover:text-red text-grey transition-all duration-300 cursor-pointer '>
                                Submit
                            </p>
                            <p onClick={() => { setEditComment(false); setCommentText(comment.comment) }} className='hover:text-red text-grey transition-all duration-300 cursor-pointer '>
                                Cancel
                            </p>
                        </div>
                    }
                </div>
            }
        </article >
    )
}

export default Comment