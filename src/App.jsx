
import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import ModeState from './context/StateFiles/ModeState'
import QueueState from './context/StateFiles/QueueState'
import PlaylistState from './context/StateFiles/PlaylistState'
import Home from './Components/Home';
import Landing from './Components/Landing';
import Playlist from './Components/Playlist'

function App() {
  return (

    <>
      {/* {console.log(mode)} */}
      <ModeState>
        <QueueState>
          <PlaylistState>
            <Router>

              <Routes>
                <Route exact path="/" element={<Landing />}>
                  {/* exact path instead of path is used to avoid partial matching of react */}
                </Route>
                <Route exact path="/home" element={<Home  />}>
                </Route>
                <Route exact path="/playlist" element={<Playlist  />}>
                </Route>
              </Routes>

            </Router>
          </PlaylistState>

        </QueueState>

      </ModeState>
    </>
  );
}

export default App;
