import React , {useState,useEffect}from 'react'
import './exploreModal.css'
import { handleCommentUpdate,handleLikeUpdate, handleUnlikeUpdate } from '../../post-actions/actions'

const username = window.localStorage.getItem('username')
const ExplorePostModal = ({_id,authorPic,author,post,caption,postTime,triggerCloseModal,currPostIndex,changeModalPost,comments,likes,activateRender}) => {

  const [newComment,setNewComment] = useState()
  const [currComments,setCurrComments] = useState(0)
  const [currLikes,setCurrLikes] = useState(likes)
  const [postInfo,setPostInfo] = useState({})

  const handleRetrievePostInfo = async () => {
    const fetchedPosts = await fetch(`http://localhost:5000/api/v1/getSinglePost/${_id}`)
    const jsonPost = await fetchedPosts.json()
    setPostInfo(jsonPost)
    console.log("changed")
  } 

  const handleComments = () => {
    if(handleCommentUpdate(_id,[...postInfo.comments,{comment:newComment,username:window.localStorage.getItem('username'),profilePicture:window.localStorage.getItem('profilePicture')}]))
      {
        setCurrComments(currComments+1)
      }
  }

  const handleLikeandUnlike = () => {
    if(!postInfo.likes.includes(username))
    {
      if(handleLikeUpdate(_id,username))
      {
        setCurrLikes(currLikes+1)
      }
    }
    else
    {
      if(handleUnlikeUpdate(_id,username)){
        setCurrLikes(currLikes+1)
      }
    }
  }

  useEffect(()=>{
    handleRetrievePostInfo()
  },[currComments,currLikes,currPostIndex])

  useEffect(() => {
    setCurrLikes(likes)
    setCurrComments(comments)
    handleRetrievePostInfo()
    document.body.style.overflow = "hidden"
  },[])
  return (
    <>
      <div className="explore-modal-container">

        <div className="explore-next-btn" onClick={() => {changeModalPost(currPostIndex+1);document.body.style.overflow = "visible"}}>
          <svg aria-label="Next" class="_8-yf5 " color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
        </div>

        {currPostIndex > 0 && <div className="explore-prev-btn" onClick={() => changeModalPost(currPostIndex-1)}>
          <svg aria-label="Go Back" class="_8-yf5 " color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
        </div> }
          <div className="close-btn" onClick={() => {triggerCloseModal(false);document.body.style.overflow = "visible"}}>
            <svg aria-label="Close" class="_8-yf5 " color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
        </div>
          <div className="explore-close-area" onClick={() => {triggerCloseModal(false);;document.body.style.overflow = "visible"}}></div>
        <div className="explore-modal-wrapper">
            <div className="explore-modal-left">
                <img src={post} alt="" />
            </div>
            <div className="explore-modal-right">
                <div className="emr-header">
                    <div className="emr-pic"><img src={postInfo.authorPic} alt="" /></div>
                    <div className="emr-name">{postInfo.author}</div>
                    <p style={{color:"#0095f6"}}>follow</p>
                </div>
                <div className="actual-caption">
                  <div className="emr-caption">

                    <div className="emr-pic"><img src={postInfo.authorPic} alt="" /></div>
                    <div className="emr-name"> <b>{postInfo.author}</b> {postInfo.caption}</div>   
                  </div>
                <div className="emr-comments">
                    {postInfo.comments? postInfo.comments.map((comment,index) => {
                      return(
                        <div key={index} className="comments-container">
                            <div className="comments-pic">
                              <img src={comment.profilePicture} alt="" />
                            </div>

                            <div className="comment-value">
                              <b>{comment.username}</b> {comment.comment}
                            </div>
                        </div>
                      )
                    }) : null}
                </div>
                </div>


               <div className="post-main-next">

          
          <div className="post-actions">
            <div className="post-actions-left">
              <div className="post-actions-like post-action" onClick={() => handleLikeandUnlike()}>
                {postInfo.likes?!postInfo.likes.includes(username)?<svg aria-label="Like" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>:
                
                <svg aria-label="Unlike" class="_8-yf5 " color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>:null}
              </div>
              <div className="post-actions-comment post-action"><svg aria-label="Comment" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></div>
              <div className="post-actions-share post-action"><svg aria-label="Share Post" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg></div>
            </div>
            <div className="post-actions-right">
              <div className="post-actions-save post-action">
                <svg aria-label="Save" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
              </div>
            </div>

          </div>
            <div className="likes-section">
              <div className="first-like-img">
                <img src={postInfo.authorPic} alt="" />
              </div>
              <p> <b> Liked by {postInfo.likes?postInfo.likes.length:null} </b></p>
            </div>

            {/* <div className="post-caption">
              <div className="post-author-name"><b>{author}</b></div>
              <div className="post-caption-value">{caption}</div>
            </div>
            <div className="post-comment-section">
                 {currComments.length > 0 ? "View all comments" : null }
            </div> */}


            <div className="post-time-created">
              {((Date.now()-postTime)/1000) > (3600 * 24) ?  parseInt((Date.now()-postTime)/(1000*3600*24)) + "days ago" : ((Date.now()-postTime)/1000) > 3600? parseInt((Date.now()-postTime)/(1000*3600)) + "hrs ago":((Date.now()-postTime)/1000) > (60)?parseInt(((Date.now()-postTime)/(1000*60))) + "mins ago" :  parseInt((Date.now()-postTime)/(1000)) + "s ago"} 
            </div>
            
            <div className="create-comment-section">
              <div className="emoji-icon">
                <svg aria-label="Emoji" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
              </div>
              <input type="text" id="comment-textbox" placeholder='Add a comment...' onChange={(e) => setNewComment(e.target.value)} value={newComment}/>
              <div className="post-comment-btn" style={(newComment)?{color:"#0095f6",cursor:"pointer"}:null} onClick = {(e) => {handleComments();setNewComment("")}}>
                <b>
                   Post
                  </b>
              </div>
            </div>

          </div>

            </div>
            
            
            
        </div>
      </div>
    </>
  )
}

export default ExplorePostModal