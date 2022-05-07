import './App.css';
import Login from './components/login';
import Register from './components/register';
import Feed from './components/feed';
import Header from './components/feedComponents/header';
import Explore from './components/explore';
import Profile from './components/profile';
import Inbox from './components/inbox';
// import CreatePostModal from './components/createPostModal';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [hasLoggedIn,setHasLoggedIn] = useState(false || window.localStorage.getItem("loggedIn") === "true")

  

  

    if(!hasLoggedIn)
    {
      return(
        <>

    <Router>
      <Routes>
        <Route exact path="/" element = {<Login setLoggedIn = {() => setHasLoggedIn(true)}/>}/>
        <Route exact path="/register" element = {<Register/>}/>
      </Routes>
      </Router>
    </>
      )
    }

     
      if(hasLoggedIn)
      {
        return(
          <div className="site-container">
      <Router>
         
          <Header setLoggedIn = {() => setHasLoggedIn(false)}/>
      <Routes>
        <Route exact path="/" element = {<Feed/>}/>
        <Route exact path="/explore" element = {<Explore/>}/>
        <Route exact path="/:usersName" element = {<Profile/>}/>
        <Route exact path="/direct/inbox/*" element = {<Inbox loggedUser = {window.localStorage.getItem('username')}/>}/>
      </Routes>
      </Router>
    </div>
        )
      }
        
}

  


export default App;
