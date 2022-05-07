import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../styles/profile.css'
import ExplorePostModal from './exploreComponents/explorePostModal'

const accountUser = window.localStorage.getItem('username')

const Profile = () => {
    const {usersName} = useParams() 
    const [user,setUser] = useState([])
    const [allPosts,setAllPosts] = useState([])
    const [modalInfo,setModalInfo] = useState("")
    const [currentPostIndex,setCurrentPostIndex] = useState("")
    const [followTriggered,setFollowTriggered] = useState("")
    const [hasFollowed,setHasFollowed] = useState(false)
    

    const handleUserFollowing = async() =>{
        const followHandled = await fetch(`http://localhost:5000/api/v1/followUser/${user.username}`, {
            method:"post",
            body:JSON.stringify({username:accountUser}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })
        const followJson = await followHandled.json()
        setHasFollowed(!hasFollowed)
        console.log(followJson)
    }
    const handleUserUnFollowing = async() =>{
        const unfollowHandled = await fetch(`http://localhost:5000/api/v1/unfollowUser/${user.username}`, {
            method:"post",
            body:JSON.stringify({username:accountUser}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })

        const followJson = await unfollowHandled.json()
        setHasFollowed(!hasFollowed)
        console.log(followJson)
        
    }

    useEffect(() => {
        if(followTriggered === "follow" )
        {
            handleUserFollowing()
        }
        else if(followTriggered === "unfollow")
        {
            handleUserUnFollowing()
        }
        // triggerRender()        
    },[followTriggered])


  const handleFetchAllPosts = async(req,res) => {
    const fetchedPosts = await fetch("http://localhost:5000/api/v1/getAllPosts")
    const jsonPost = await fetchedPosts.json()
    setAllPosts(jsonPost.filter((post) => post.author === usersName))
  }
  const handleFetchUser = async(req,res) => {
    const fetchedUser = await fetch(`http://localhost:5000/api/v1/getSingleUser/${usersName}`)
    const jsonUser = await fetchedUser.json()
    console.log(jsonUser)
    setUser(jsonUser)
  }

  const handleChangeModalPost = (ind) => {
      setModalInfo(allPosts[ind])
      setCurrentPostIndex(ind)
  }

  useEffect(() => {
    handleFetchAllPosts()
    handleFetchUser()
    window.scrollTo({
  top: 0
});
  },[usersName,hasFollowed])
  return (
    <div className="profile-container">

        <div className="profile-wrapper">
        {modalInfo?<ExplorePostModal {...modalInfo} currPostIndex = {currentPostIndex} changeModalPost = {(ind) => handleChangeModalPost(ind)} triggerCloseModal = {() => setModalInfo("")}/>:null}
            <div className="profile-user-info">
                <div className="pui-left">
                    <div className="pui-left-img">
                        <img src={user.profilePicture} alt="" />
                    </div>
                </div>

                <div className="pui-right">
                    <div className="pui-right-top">
                        <div className="puir-name">{user.username}</div>
                        {usersName === window.localStorage.getItem('username')?<div className="puir-edit">Edit Profile</div>: user.followers?user.followers.includes(window.localStorage.getItem('username'))?<div className="puir-edit" onClick={() => setFollowTriggered("unfollow")}><svg aria-label="Following" class="_8-yf5 " color="#262626" fill="#262626" height="15" role="img" viewBox="0 0 95.28 70.03" width="20"><path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path></svg></div>:<div className="puir-edit follow-btn" onClick={() => setFollowTriggered("follow")}>Follow</div>:null}
                    </div>

                    <div className="pui-right-middle">
                        <div className="pui-post-no puin"> <b>{allPosts.length}</b> posts</div>
                        <div className="pui-followers-no puin"> <b>{user.followers?user.followers.length:0}</b> followers</div>
                        <div className="pui-following-no puin"> <b>{user.following?user.following.length:0}</b> following</div>
                    </div>

                    <div className="pui-right-bottom">
                        <p className="pui-desc">
                            Bio
                        </p>
                    </div>
                </div>

            </div>

            <div className="profile-cat-section">
                <div className="posts-cat prof-cat-selected">
                    <svg aria-label="" class="_8-yf5 " color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line> </svg> &nbsp; POSTS
                </div>
                <div className="saved-cat">
                    <svg aria-label="" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg> &nbsp; SAVED
                </div>
                <div className="tagged-cat">
                    <svg aria-label="" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg> &nbsp; TAGGED
                </div>
            </div>

            <div className="user-posts-section">
                <div className="media-grid">
                {allPosts.map((post,index) => {
                    return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item">{post.type === "image"?<img src={post.post} alt="" />:<><video id="outputd" src = {post.post}/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}</div> )  
                })}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Profile