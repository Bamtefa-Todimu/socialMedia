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
                        return( <div  key = {post._id} onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg"><img src={post.post} alt="" /></div> )
                    }
                    else if(count === 10)
                    {
                        count++
                        return( <div  key = {post._id} onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg"><img src={post.post} alt="" /></div> )
                    }
                    else if(count === 20)
                    {
                        count = 3
                        return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item gibg"><img src={post.post} alt="" /></div> )
                    }
                    else
                    {
                        console.log(count)
                        count++
                        return( <div key = {post._id}  onClick = {() => {setModalInfo(post);setCurrentPostIndex(index)}} className="grid-item"><img src={post.post} alt="" /></div> )
                        
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default Explore