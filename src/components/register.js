import React , {useEffect,useState} from 'react'
import instagramLogo from '../images/instagram-logo-font.webp'
import facebookLogo from '../images/facebook.svg'
import { Link } from 'react-router-dom'
import '../styles/register.css'
import defaultImg from './images/default-profile.jpg'

const url = "https://api.cloudinary.com/v1_1/demo/auto/upload";


const Login = () => {

  const [showUploadPicture,setShowUploadPicture] = useState("")
  
  const [userEmail,setUserEmail] = useState("")
  const [userFullName,setUserFullName] = useState("")
  const [userPassword,setUserPassword] = useState("")
  const [usernameVal,setUsernameVal] = useState("")
  const [allowLogin,setAllowLogin] = useState(false)
  const [showErrMsg,setShowErrMsg] = useState({msg:"empty fields",show:false})

  const handleUserLogin = async () => {
    if(usernameVal && userPassword && userEmail && userFullName)
    {
      const registerUser = await fetch('http://localhost:5000/api/v1/registerUser',
      
      {
        method:"POST",
        body:JSON.stringify({email:userEmail,fullname:userFullName,username:usernameVal,password:userPassword}),
        headers:{
          "Content-Type":"application/json"
        }
      })

      const registeredUser = await registerUser.json()
      if(registeredUser.message)
      {
        return setShowErrMsg({msg:"Unable to Register User",show:true})
      }
      // window.location.href = "http://localhost:3000/"
      setShowUploadPicture(true)
    }
    else
    {
      setShowErrMsg({...showErrMsg,show:true})
    }
  }

  useEffect(()=>{
    if(userPassword.length > 5 && usernameVal.length > 0)
    {
      setAllowLogin(true)
    }
    else
    {
      setAllowLogin(false)
    }
  },[userPassword,usernameVal])

  if(!showUploadPicture)
  {  return (
    <div className="register-page-container">
        <div className="register-page-wrapper">
            <div className="register-container">
                <div className="instagram-logo-register">
                    <img src={instagramLogo} alt="" />
                </div>
                
                <p style={{color:"#8e8e8e",marginBottom:"1rem",fontSize:"1.1rem",textAlign:"center"}}>
                  Sign up to see photos and videos from your friends.
                </p>

                <div className="register-facebook-btn">
                    <div className="facebook-icon">
                      <img src={facebookLogo} alt="fl" />
                    </div>
                    <span className="login-with-facebook">
                      Login with facebook
                    </span>
                </div>

                <div className="login-or-section">
                  <span className='or-line'></span>
                  <span>OR</span>
                  <span className='or-line'></span>
                </div>

                <form action="" className="login-form">
                  <input type="text" onChange={(e) => setUserEmail(e.target.value)} name = "email" placeholder='Phone number, email'  className='register-input'/>
                  <input type="text" onChange={(e) => setUserFullName(e.target.value)} name = "fullname" placeholder='Fullname'  className='register-input'/>
                  <input type="text" onChange={(e) => setUsernameVal(e.target.value)} name = "username" placeholder='username'  className='register-input'/>
                  <input type="text" onChange={(e) => setUserPassword(e.target.value)} name = "password" placeholder='Password' className='register-input' value={userPassword}/>

                <div className="login-btn" style={allowLogin?{backgroundColor:"#0095f6"}:{}} onClick = {() => handleUserLogin()}>
                  Sign up
                </div>

                <p style={{textAlign:"center",color:"#8e8e8e",fontSize:"0.8rem",padding:"0 0.5rem"}}>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                </form>

                {showErrMsg.show?<p style={{color:"red",fontSize:"0.9rem",fontWeight:"400",margin:"0 auto"}}>{showErrMsg.msg}</p>:null}
            </div>

            <div className="hac-container">
                <p style={{color:"#8e8e8e",fontSize:"0.9rem",fontWeight:"400",margin:"0 auto"}}> Have an Account? &nbsp; <Link style={{color:"#0095f6",fontWeight:"400",textDecoration:"none"}} to = "/">Login</Link></p>
            </div>
        </div>
    </div>
  )
  }
  else
  {
    return(
    <div className="register-page-container">
      <div className="register-page-wrapper">
      <UploadPicture username = {usernameVal}/>

      </div>
    </div>

    )
  }
}


const UploadPicture = ({username}) => {


  const [uploadedPicture,setUploadedPicture] = useState("")
  const [ppLink,setPplink] = useState("")
  const [uploadState,setUploadState] = useState("")

  const handleFileUpload = (e) => {
       
        console.log(e.target.files[0]);

        
            var image = document.getElementById('up-output');
	        image.src = URL.createObjectURL(e.target.files[0]);
            setUploadedPicture(e.target.files[0])  
        
    }

    const handleCloudinaryUpload = () =>
    {
        const formData = new FormData();
        formData.append("file", uploadedPicture);
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
          setPplink(data.secure_url)
        console.log(data);
      });
    }

    const handleServerUpload = () => {
       fetch(`http://localhost:5000/api/v1/updateUser/${username}`,
        {
            method:"POST",
            body:JSON.stringify({
                profilePicture:ppLink,
                type:"image"

            })
            ,headers:
            {
                "Content-Type":"application/json"
            }
        })
    }

    useEffect(() => {
      if(ppLink)
      {
        handleServerUpload()
        setUploadState("uploaded")
        var ppTime = setTimeout(() => window.location.href = "http://localhost:3000/",500)
      }

      return(() => clearTimeout(ppTime))
    },[ppLink])
  return(
    <div className="upload-picture-container">
      <div className="up-container">
        <img src={defaultImg} alt="" id = "up-output"/>
      </div>

      <label htmlFor="up-input" id="up-label">Choose a Picture</label>
      <input type="file" name="profile-pic" id="up-input" onChange={(e) => handleFileUpload(e)}/>

    <div className="up-action">
      
      <div className="upload-picture" onClick={() => handleCloudinaryUpload()}>Upload</div>
      <div className="upload-cancel">Cancel</div>
    </div>

    <div className="upload-state">
      {uploadState}
    </div>
    </div>
  )
}

export default Login