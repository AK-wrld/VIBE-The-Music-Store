import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
import '../CSS/userPlaylist.css';
import QueueList from './QueueList';
import ModeContext from '../context/ContextFiles/ModeContext'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import { useSelector } from 'react-redux';
import BottomPlayer from './BottomPlayer'
import ProfileList from './ProfileList';


export default function userPlaylist() {
  const props = useContext(ModeContext)
  const playlistProps = useContext(PlaylistContext)  
  const isEmpty = useSelector((state) => state.isEmpty)
  
  const token = window.localStorage.getItem('token')
  if (!token) {
    return window.location = ('/login')
  }

  const obj = JSON.parse(window.localStorage.getItem('userPlaylist'))

  return (
    <>
      <Navbar />
      <QueueList />
      <ProfileList/>
      <div className="container main" style = {{height : "100vh"}}>
        <div className="container">
          <div className="container photoTitleContainer">

            <img src={obj.img} alt="" style={{ width: "250px", height: "170px" }} />
            <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} </h1>
          </div>
          <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
         <div className="btns mb-3">

          <button className='play playlistBtn' id='play' onClick={() => { isEmpty === false && playlistProps.playBtn === false ? playlistProps.isClicked(true)  : playlistProps.isClicked(false)  }}><i  ></i></button>
          <button className='addToQueue playlistBtn' ><i class="bi bi-plus-square icon" onClick={() => addSongs(playlistProps.songArray)}></i></button>
          <button className='playlistBtn' onClick={()=>playlistProps.setOnLoop(!playlistProps.onLoop)} ><i class="bi bi-infinity icon"></i></button>
         </div>

        </div>
        <div className="container">

          <table className='table'>
            <thead style={props.textCol}>

              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Date of Release</th>

            </thead>
            <tbody style={props.textCol} >

<tr >
  <th scope="row">1</th>
  <td><img src={obj.img} alt="" style={{ width: "50px" }} />&nbsp;&nbsp;<span className='vibe'></span></td>
  <td>Arijit Singh</td>
  <td><p style={{ padding: "0px 2px" }}>27/08/2023</p></td>
</tr>
</tbody>

          </table>
        </div>

      </div>
      {!isEmpty?<BottomPlayer/>:''}
    </>
  )
}
