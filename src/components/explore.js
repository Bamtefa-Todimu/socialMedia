import React , {useEffect,useState} from 'react'
import '../styles/explore.css'
import ExplorePostModal from './exploreComponents/explorePostModal'
const Explore = () => {

    var count = 1
    const [allPosts,setAllPosts] = useState([])
    const [modalInfo,setModalInfo] = useState("")
    const [currentPostIndex,setCurrentPostIndex] = useState("")
    const [reRenderComp,setReRenderComp] = useState(0)

  const handleFetchAllPosts = async(req,res) => {
    const fetchedPosts = await fetch("http://localhost:5000/api/v1/getAllPosts")
    const jsonPost = await fetchedPosts.json()
    setAllPosts(jsonPost)
  }

  const handleChangeModalPost = (ind) => {
      setModalInfo(allPosts[ind])
      setCurrentPostIndex(ind)
  }

  const handleReRender = () => {
    setReRenderComp()
    console.log("fetched")
  }

//   window.scrollTo({
//   top: 0
// });

  useEffect(() => {
    handleFetchAllPosts()
  },[reRenderComp])

  return (
    <div className="explore-container">
        {modalInfo?<ExplorePostModal {...modalInfo} activateRender = {() => handleReRender()} currPostIndex = {currentPostIndex} changeModalPost = {(ind) => handleChangeModalPost(ind)} triggerCloseModal = {() => setModalInfo("")}/>:null}
        <div className="explore-wrapper">
            <div className="media-grid">
                {allPosts.map((post,index) => {
                    
                    if(count === 2)
                    {
                        count++
                        return( <div  key = {post._id} onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg">{post.type === "image"?<img src={post.post} alt="" />:<><video id="outpute" src = {post.post}/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}</div> )
                    }
                    else if(count === 10)
                    {
                        count++
                        return( <div  key = {post._id} onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg">{post.type === "image"?<img src={post.post} alt="" />:<><video id="outpute" src = {post.post}/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}</div> )
                    }
                    else if(count === 20)
                    {
                        count = 3
                        return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg">{post.type === "image"?<img src={post.post} alt="" />:<><video id="outpute" src = {post.post}/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}</div> )
                    }
                    else
                    {
                        console.log(count)
                        count++
                        return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item">{post.type === "image"?<img src={post.post} alt="" />:<><video id="outputd" src = {post.post}/><svg aria-label="Video" class="_8-yf5 edmGD" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg></>}</div> )
                        
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default Explore