
import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import ModeState from './context/StateFiles/ModeState'
import QueueState from './context/StateFiles/QueueState'
import PlaylistState from './context/StateFiles/PlaylistState'
import LoginState from './context/StateFiles/LoginState'
import Home from './Components/Home';
import Landing from './Components/Landing';
import Playlist from './Components/Playlist'
import Signup from './Components/Signup'
import Login from './Components/Login'

import AlertState from "./context/StateFiles/AlertState";
import Search from "./Components/Search";
import NavbarState from "./context/StateFiles/NavbarState";
import ProfileState from "./context/StateFiles/ProfileState";
function App() {


  return (

    <>
      {/* {console.log(mode)} */}
      <ModeState>
        <QueueState>
          <PlaylistState>
            <LoginState>
              <AlertState>
                <NavbarState>
                  <ProfileState>
                <BrowserRouter>

                  <Routes>
                    <Route exact path="/" element={<Landing />}>
                      {/* exact path instead of path is used to avoid partial matching of react */}
                    </Route>
                    <Route exact path="/signup" element={<Signup />}>
                      {/* exact path instead of path is used to avoid partial matching of react */}
                    </Route>
                    <Route exact path="/login" element={<Login />}>
                      {/* exact path instead of path is used to avoid partial matching of react */}
                    </Route>
                    <Route exact path="/home" element={<Home />}>
                    </Route>
                    <Route exact path="/playlist" element={<Playlist />}>
                    </Route>
                    <Route exact path="/search" element={<Search />}>
                    </Route>
                  </Routes>
                

                </BrowserRouter>
                </ProfileState>

                </NavbarState>
              </AlertState>


            </LoginState>
          </PlaylistState>

        </QueueState>

      </ModeState>
    </>
  );
}

export default App;
