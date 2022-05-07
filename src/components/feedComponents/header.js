import React , {useState,useContext, createContext} from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import CreatePostModal from '../createPostModal'
import { useNavigate } from "react-router-dom";


const loggedInContext = createContext()

const Header = ({profilePicture,triggerCreateModal,setLoggedIn}) => {
    const [selected,setSelected] = useState(1)
    const [createModal,setCreateModal] = useState(false)
    const [showProfileModal,setShowProfileModal] = useState(false)

    

  return (
    <div className="header-container">
        {createModal && <CreatePostModal triggerCreateModal = {(val) => setCreateModal(val)}/>}
        <div className="header-wrapper">
        {showProfileModal && <loggedInContext.Provider value={() => setLoggedIn()}> <ProfileSubMenu/> </loggedInContext.Provider>}
            <div className="logo-section">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </div>

            <div className="search-section">
                <div className="search-container">
                    <div className="search-icon">
                        <svg aria-label="Search" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                    </div>
                    <input type="text" id="search-input" placeholder='Search'/>
                </div>
            </div>

            <div className="links-section">
                <div className="home-btn" onClick={() => setSelected(1)}>
                    <Link to = "/">
                        <svg aria-label="Home" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z" fill={(selected === 1)?"":"none"} stroke='currentColor' strokeLinejoin='round' strokeWidth={2}></path></svg>
                    </Link>
                </div>
                <div className="messenger-btn"onClick={() => setSelected(2)}><Link to = {"/direct/inbox/"}><svg aria-label="Messenger" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill={(selected === 2)?"":"none"} stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fill={(selected === 2)?"white":""} fill-rule="evenodd"></path></svg></Link></div>
                <div className="create-btn" onClick={() => {setSelected(3);setCreateModal(true)}}><svg aria-label="New Post" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg></div>
                <div className="feed-btn"onClick={() => setSelected(4)}><Link to = "/explore">{(selected !== 4)?<svg aria-label="Find People" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon   fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>:<svg aria-label="Find People" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path></svg>}</Link></div>
                <div className="activity-btn"onClick={() => setSelected(5)}><Link to = "/"><svg aria-label="Activity Feed" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg></Link></div>
                <div className="profile-btn"onClick={() => {setSelected(6); setShowProfileModal(!showProfileModal)}}><img src={window.localStorage.profilePicture} alt="" /></div>
                    
            </div>
        </div>
    </div>
  )
}

const ProfileSubMenu = () => {
    const setLoggedIn = useContext(loggedInContext)
    let navigate = useNavigate()
    return(
        <div className="profile-submenu">

            <div className="ps-triangle"></div>
            <div className="profile-submenu-wrapper">
                <ul className="ps-list">
                    <div className="ps-item"><Link style = {{textDecoration:"none",color:"black",display:"flex",alignItems:"center"}} to = {"/" + window.localStorage.getItem('username')}><svg aria-label="Profile" class="_8-yf5 " color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle><path d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle></svg> &nbsp; &nbsp; <p>Profile</p></Link></div>
                    <div className="ps-item"><Link style = {{textDecoration:"none",color:"black",display:"flex",alignItems:"center"}} to = "/"><svg aria-label="Saved" class="_8-yf5 " color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg> &nbsp; &nbsp; <p>Saved</p></Link></div>
                    <div className="ps-item ps-logout" onClick={() => {setLoggedIn();window.localStorage.clear();navigate('/')}}>Log Out</div>
                </ul>
            </div>
        </div>
    )
}

export default Header