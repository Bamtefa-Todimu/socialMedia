import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../styles/profile.css'
import ExplorePostModal from './exploreComponents/explorePostModal'

const Profile = () => {
    const {usersName} = useParams() 
    const [user,setUser] = useState([])
    const [allPosts,setAllPosts] = useState([])
    const [modalInfo,setModalInfo] = useState("")
    const [currentPostIndex,setCurrentPostIndex] = useState("")

  const handleFetchAllPosts = async(req,res) => {
    const fetchedPosts = await fetch("http://localhost:5000/api/v1/getAllPosts")
    const jsonPost = await fetchedPosts.json()
    setAllPosts(jsonPost.filter((post) => post.author === window.localStorage.getItem("username")))
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
  },[])
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
                        <div className="puir-edit">Edit Profile</div>
                    </div>

                    <div className="pui-right-middle">
                        <div className="pui-post-no puin"> <b>0</b> posts</div>
                        <div className="pui-followers-no puin"> <b>0</b> followers</div>
                        <div className="pui-following-no puin"> <b>0</b> following</div>
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
                    return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item"><img src={post.post} alt="" /></div> )  
                })}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Profile