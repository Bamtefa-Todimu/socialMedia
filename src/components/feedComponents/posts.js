import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './posts.css'
// import {posts} from '../../posts'
import { handleCommentUpdate,handleLikeUpdate, handleUnlikeUpdate } from '../../post-actions/actions'

import ExplorePostModal from '../exploreComponents/explorePostModal'

const Posts = ({_id,followers,following}) => {

  const [user,setUser] = useState({})

  const [allPosts,setAllPosts] = useState([])

  const handleFetchAllPosts = async() => {
    const fetchedPosts = await fetch("http://localhost:5000/api/v1/getAllPosts")
    const jsonPost = await fetchedPosts.json()
    setAllPosts(jsonPost)
  }

  const handleFetchUser = async() => {
    const fetchedUser = await fetch("http://localhost:5000/api/v1/getSingleUser/" + window.localStorage.getItem("username"))
    const jsonUser = await fetchedUser.json()
    setUser(jsonUser)
  }

  useEffect(() => {
    handleFetchAllPosts()
    handleFetchUser()
  },[])


  return (
    <div className="posts-container">
      {allPosts.map((post) => {

        if(user.following)
        {
          if(user.following.includes(post.author))
          {
            return (<Post key = {post._id} {...post}/>)
          }
        }

        return null
        
      })}
    </div>
  )
}

const Post = ({_id,authorPic,author,post,caption,postTime,likes,comments,type}) => {

  const [triggerCommentModal,setTriggerCommentModal] = useState(false)

  const [newComment,setNewComment] = useState()
  const [currComments,setCurrComments] = useState(comments)
  const [currLikes,setCurrLikes] = useState(likes)
  const [canLike , setCanLike] = useState(!likes.includes(window.localStorage.getItem('username')))

  const handleComments = () => {
    if(handleCommentUpdate(_id,[...currComments,{comment:newComment,username:window.localStorage.getItem('username'),profilePicture:window.localStorage.getItem('profilePicture')}]))
      {
        setCurrComments([...currComments,newComment])
      }
  }

  const handleLikeandUnlike = () => {
    if(canLike)
    {
      if(handleLikeUpdate(_id,window.localStorage.getItem('username')))
      {
        setCurrLikes([...currLikes,"1"])
        setCanLike(false)
      }
    }
    else
    {
      if(handleUnlikeUpdate(_id,window.localStorage.getItem('username'))){
        setCurrLikes(currLikes.slice(0,-1))
        setCanLike(true)
      }
    }
  }

  useEffect(() => {
    setCurrLikes(likes)
    setCurrComments(comments)
  },[])
  return (
    <>
        {triggerCommentModal?<ExplorePostModal _id = {_id} post = {post} postTime = {postTime} changeModalPost = {(ind) => setTriggerCommentModal(false)} triggerCloseModal = {() => setTriggerCommentModal(false)}/>:null}

      <div className="post-container">
        <div className="post-header">
          <div className="post-author">
            <div className="post-author-picture"  onClick={() => document.body.style.overflow = "visible"}>
               <Link to = {'/' + author}>
               <img src={authorPic} alt="" />
               </Link>
            </div>
            <p className="post-author-name"  onClick={() => document.body.style.overflow = "visible"}>
              <Link to = {'/' + author} style={{textDecoration:"none",color:"black"}}>
              {author}
              </Link>
            </p>
          </div>
          <div className="post-more">
            <svg aria-label="More options" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
          </div>
        </div>

        <div className="post-main">
          <div className="post-main-container">
            {type==="image"?<img src={post} alt="" />:<><video id="output-post-video" src = {post} controls/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}
          </div>

          <div className="post-main-next">

          
          <div className="post-actions">
            <div className="post-actions-left">
              <div className="post-actions-like post-action" onClick={() => handleLikeandUnlike()}>
                {canLike?<svg aria-label="Like" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>:
                
                <svg aria-label="Unlike" class="_8-yf5 " color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}
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
                <img src={authorPic} alt="" />
              </div>
              <p> <b> Liked by {currLikes?currLikes.length:"nobody"} </b></p>
            </div>

            <div className="post-caption">
              <div className="post-author-name"><b>{author}</b></div>
              <div className="post-caption-value">{caption}</div>
            </div>
            <div className="post-comment-section" onClick={() => setTriggerCommentModal(true)}>
                 {currComments.length > 0 ? "View all comments" : null }
            </div>


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
    </>
  )
}

export default Posts