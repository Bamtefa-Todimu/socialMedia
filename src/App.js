import './App.css';
import Login from './components/login';
import Register from './components/register';
import Feed from './components/feed';
import Header from './components/feedComponents/header';
import Explore from './components/explore';
import CreatePostModal from './components/createPostModal';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [hasLoggedIn,setHasLoggedIn] = useState(false || window.localStorage.getItem("loggedIn") === "true")

  

  return (

    <>

    {!hasLoggedIn?

    <div className="site-container">

    <Router>
      <Routes>
        <Route exact path="/" element = {<Login setLoggedIn = {() => setHasLoggedIn(true)}/>}/>
        <Route exact path="/register" element = {<Register/>}/>
      </Routes>
      </Router>
    </div>
      :
        <div className="site-container">
      <Router>
         
          <Header />
      <Routes>
        <Route exact path="/" element = {<Feed/>}/>
        <Route exact path="/explore" element = {<Explore/>}/>
      </Routes>
      </Router>
    </div>
}
    </>
  );
}

export default App;
