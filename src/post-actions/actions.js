export const handleLikeUpdate = async (id,username) => {
    const sendLike = await fetch(`http://localhost:5000/api/v1/updateLikes/${id}`,{
        method:"post",
        body:JSON.stringify({username:username,action:1}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(sendLike)
    {
        return true
    }
    return false
}


export const handleUnlikeUpdate = async (id,username) => {
    const sendUnlike = await fetch(`http://localhost:5000/api/v1/updateLikes/${id}`,{
        method:"post",
        body:JSON.stringify({username:username,action:-1}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(sendUnlike)
    {
        return true
    }
    return false
}



export const handleCommentUpdate = async (id,comments) => {
    const sendComment = await fetch(`http://localhost:5000/api/v1/updateComments/${id}`,{
        method:"post",
        body:JSON.stringify({comments:comments}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(sendComment)
    {
        return true
    }
    return false
}