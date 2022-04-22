import React , {useEffect,useState} from 'react'
import instagramLogo from '../images/instagram-logo-font.webp'
import facebookLogo from '../images/facebook.svg'
import { Link } from 'react-router-dom'
import {app} from '../firebase-config'
import {signInWithPopup,FacebookAuthProvider,getAuth} from 'firebase/auth'
import '../styles/login.css'

const Login = ({setLoggedIn}) => {

  const authentication = getAuth(app)

  const [userPassword,setUserPassword] = useState("")
  const [usernameVal,setUsernameVal] = useState("")
  const [allowLogin,setAllowLogin] = useState(false)
  const [showErrMsg,setShowErrMsg] = useState({msg:"empty fields",show:false})

  const signInWithFacebook = () => {
      const provider = new FacebookAuthProvider()

      signInWithPopup(authentication,provider)
      .then((re) => {console.log(re)})
      .catch((err) => {console.log(err)})
  }

  // const handleFacebookLogin = async () => {

  // }

  const handleUserLogin = async () => {
    if(usernameVal && userPassword)
    {
      const loginUser = await fetch('http://localhost:5000/api/v1/loginUser',
      
      {
        method:"POST",
        body:JSON.stringify({username:usernameVal,password:userPassword}),
        headers:{
          "Content-Type":"application/json"
        }
      })

      const tokenUser = await loginUser.json()
      if(tokenUser.message)
      {
        return setShowErrMsg({msg:"incorrect username or password",show:true})
      }
      window.localStorage.setItem("loggedIn","true")
      setLoggedIn()
      window.localStorage.setItem("token",tokenUser.token)
      window.localStorage.setItem("username",tokenUser.username)
      window.localStorage.setItem("password",tokenUser.password)
      window.localStorage.setItem("profilePicture",tokenUser.profilePicture)
      // window.location.href = "http://localhost:3000/feed"
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
  return (
    <div className="login-page-container">
        <div className="login-page-wrapper">
            <div className="login-container">
                <div className="instagram-logo">
                    <img src={instagramLogo} alt="" />
                </div>


                <div className="facebook-btn" onClick={() => signInWithFacebook()}>
                    <div className="facebook-icon">
                      <img src={facebookLogo} alt="fl" />
                    </div>
                    <span className="login-with-facebook">
                      Continue with Facebook
                    </span>
                </div>

                <div className="login-or-section">
                  <span className='or-line'></span>
                  <span>OR</span>
                  <span className='or-line'></span>
                </div>

                <form action="" className="login-form">
                  <input type="text" onChange={(e) => setUsernameVal(e.target.value)} name = "username" placeholder='Phone number, username, or email'  className='login-input' value={usernameVal}/>
                  <input type="text" onChange={(e) => setUserPassword(e.target.value)} name = "password" placeholder='Password' className='login-input' value={userPassword}/>

                <div className="forgot-password-link">
                  <Link style = {{textDecoration:"none",color:"#0095F6"}} to = "/">Forgot password?</Link>
                </div>

                <div className="login-btn" style={allowLogin?{backgroundColor:"#0095f6"}:{}} onClick = {() => handleUserLogin()}>
                  Log In
                </div>
                </form>

                {showErrMsg.show?<p style={{color:"red",fontSize:"0.9rem",fontWeight:"400",margin:"0 auto"}}>{showErrMsg.msg}</p>:null}
                <p style={{color:"#8e8e8e",fontSize:"0.9rem",fontWeight:"400",margin:"0 auto"}}> Dont have an Account? &nbsp; <Link style={{color:"#0095f6",fontWeight:"400",textDecoration:"none"}} to = "/register">Sign up</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login