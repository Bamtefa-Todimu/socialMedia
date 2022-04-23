import React,{useEffect, useState} from 'react'
import '../styles/createPostModal.css'

const url = "https://api.cloudinary.com/v1_1/demo/image/upload";

const CreatePostModal = ({triggerCreateModal}) => {

    const [userPost,setUserPost] = useState(false)
    const [captionSection,setCaptionSection] = useState(false)
    const [captionVal,setCaptionVal] = useState("")
    const [imageLink,setImageLink] = useState("")
    const [uploadState,setUploadState] = useState("")

    const handleFileUpload = (e) => {
       
        console.log(e.target.files[0]);
	    var image = document.getElementById('output');
	    image.src = URL.createObjectURL(e.target.files[0]);
        setUserPost(e.target.files[0])
    }


    const handleCaptionChange = (e) => {
        setCaptionVal(e.target.value)
    }

    const handleCloudinaryUpload = () =>
    {
        const formData = new FormData();
        formData.append("file", userPost);
    formData.append("upload_preset", "docs_upload_example_us_preset");
        setUploadState("loading")
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          setImageLink(data.secure_url)
        console.log(data);
      });
    }

    const handleServerUpload = () => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        fetch("http://localhost:5000/api/v1/uploadPost",
        {
            method:"POST",
            body:JSON.stringify({
                author:window.localStorage.getItem("username"),
                authorPic:window.localStorage.getItem("profilePicture"),
                caption:captionVal,
                post:imageLink,
                postTime:Date.now(),
                postDate:date.toLocaleDateString("en-us",options)

            })
            ,headers:
            {
                "Content-Type":"application/json"
            }
        })
    }

    useEffect(() => {
        handleServerUpload()
        setUploadState("uploaded")
    },[imageLink])
    
  return (
    <div className="modal-container" >
        
        <div className="modal-close-surrounding" onClick={() => triggerCreateModal(false)}>

        </div>

        <div className="close-btn" onClick={() => triggerCreateModal(false)}>
            {uploadState?uploadState==="loading"?<p>loading</p>: <p>Uploaded</p>:null}
            <svg aria-label="Close" class="_8-yf5 " color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
        </div>
        <div className="modal-wrapper" >
            
            

            
            <div className="modal-header">
                <p></p>
                <p> Create new post </p>
                {
                    (userPost && !captionSection)?<p style={{color:"#0095F6",cursor:"pointer"}} onClick = {() => setCaptionSection(true)}>Next</p>:<p style={{color:"#0095F6",cursor:"pointer"} } onClick ={(e) => {handleCloudinaryUpload()}}>Share</p>
                }
                
            </div>
            <div className="modal-main-container">

                
                <div className="modal-main">

                {!userPost && <>
                <div className="modal-img">
                    <svg aria-label="Icon to represent media such as images or videos" class="_8-yf5 " color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                </div>
                <div className="modal-message">
                    Drag photos and videos here
                </div>
                <label htmlFor="select-post">Select from computer</label>
                <input type="file" name="userPost" id="select-post" onChange={(e) => {handleFileUpload(e)}} />
                </> }

                 <img src="" alt="" id="output" style={userPost?{display:"flex"}:{display:"none"}}/>
                </div>
            
            
            

                { captionSection?<div className="caption-section">
                     <div className="caption-section-header">
                         <div className="post-author-pic">
                             <img src={window.localStorage.getItem("profilePicture")} alt="" />
                         </div>

                         <div className="post-author-name">
                             <b> {window.localStorage.getItem("username")} </b>
                         </div>
                     </div>

                     <div className="caption-body">
                         <textarea name="caption-value" id="" width="100%" cols = "36" rows="22" placeholder='Write a caption...' onChange={(e) => handleCaptionChange(e)} value = {captionVal}></textarea>
                         <div className="caption-footer">
                             <svg aria-label="Emoji" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                             <div className="caption-words-counter">
                                 {captionVal?captionVal.length:0}/2,200
                             </div>
                         </div>
                     </div>
                 </div>:null }

            
            
            </div>

            
        </div>
    </div>
    )
  }


export default CreatePostModal