import { useEffect,useState} from "react"
// import Header from "./feedComponents/header"
import Stories from "./feedComponents/stories"
import Posts from "./feedComponents/posts"
import '../styles/feed.css'
// import CreatePostModal from "./createPostModal"

const Feed = () => {

  // const [showFeed,setShowFeed] = useState(false)
  const [user,setUser] = useState("")
  // const [posts,setPosts] = useState("")
  // const [createModal,setCreateModal] = useState(false)

  

  const verifyUser = async() => {
    fetch('http://localhost:5000/api/v1/verifyUser',
    {
      method:"POST",
      body:JSON.stringify({}),
      headers:{
        "x-access-token":window.localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.message)
      {
        window.localStorage.clear()
        window.location.href = "http://localhost:3000/"
        return
      }
      setUser(user)
    })
    .catch(err => console.log(err))
    
  }

  useEffect(()=> {
    verifyUser()
  },[])

  return (
    <div className = "feed-container">

      {/* {createModal && <CreatePostModal triggerCreateModal = {(val) => setCreateModal(val)}/>}
      <Header triggerCreateModal = {() => setCreateModal(true)}/> */}

      <div className="feed-wrapper">
          <div className="feed-left-section">
            <Stories/>
            <Posts {...user}/>
          </div>
          <div className="feed-right-section">
            <div className="user-profile">
              <div className="user-profile-left">
                <div className="user-image">
                  <img src={window.localStorage.getItem("profilePicture")} alt="" />
                </div>
                <div className="user-name">
                  {window.localStorage.getItem("username")} <br /><span> Discover</span>
                </div>
              </div>

              <p> <b> Switch </b></p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Feed