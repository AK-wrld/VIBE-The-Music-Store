
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './Components/Home';
import Landing from './Components/Landing';
import Playlist from './Components/Playlist'
function App() {
  const [queue, showQueue] = useState("show")
  const [mode, setmode] = useState("light")
  const [attributes , setAttributes] = useState(null)
  const [textCol,changetextCol] = useState({
    color : "black"
  })
  const displayTime = () => {
    let time = new Date();
    // console.log(time);
    let hours = time.getHours()
    // console.log(hours)
    return hours

  }

  const toggleMode = () => {
    let hours = displayTime();
    if (hours >= 6 && hours <= 9) {
      document.body.style.backgroundColor = "rgb(250, 139, 255)"
      document.body.style.backgroundImage = "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
      document.body.style.transition = "background-color 0.5s"
      setmode("light")
      changetextCol({
        color : "black"
      })
    }
    else {
      setmode("dark")
      changetextCol({
        color : "white"
      })
      document.body.style.backgroundColor = "rgb(0, 0, 0)"
      document.body.style.backgroundImage = "linear-gradient(24deg, rgba(0,0,0,1) 0%, rgba(75,0,85,1) 100%)"
      document.body.style.transition = "background-color 0.5s,background-image 0.5s"
      
      
    }


  }
  
  useEffect(toggleMode, [mode])

const changePlaylist = (name) => {
  setAttributes({
    name : name
  })
}


  return (

    <>
      {/* {console.log(mode)} */}
      <Router>

        <Routes>
          <Route exact path="/" element={<Landing  mode={mode} toggleMode={toggleMode} />}>
            {/* exact path instead of path is used to avoid partial matching of react */}
          </Route>
          <Route exact path="/home" element={<Home  mode={mode} attributes = {attributes} changePlaylist={changePlaylist} textCol={textCol} queue={queue} showQueue={showQueue}/>}>
          </Route>
          <Route exact path="/playlist" element={<Playlist  mode={mode} attributes = {attributes} textCol={textCol} queue={queue} showQueue={showQueue}/>}>
          </Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;
