import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
// import LoadingBar from 'react-top-loading-bar'
import {easeOut, motion } from "framer-motion"
import '../CSS/Playlist.css';
import QueueList from './QueueList';
import ModeContext from '../context/ContextFiles/ModeContext'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import { createAction } from '../action';
import store from '../store';
import { useSelector } from 'react-redux';
import BottomPlayer from './BottomPlayer'
import ProfileList from './ProfileList';
import { useNavigate } from 'react-router-dom';


export default function Playlist() {
  const navigate=useNavigate()
  const props = useContext(ModeContext)
  const playlistProps = useContext(PlaylistContext)  
  const playingQueuee = useSelector((state) => state.playingQueue)
  const isEmpty = useSelector((state) => state.isEmpty)
  
  const token = window.localStorage.getItem('token')
  if (!token) {
    navigate('/login')
  }

  const obj = JSON.parse(window.localStorage.getItem('playlistdata'))



  useEffect(() => {
    playlistProps.fetchSongs(obj._id)

  }, [])

  // console.log(playlistProps.songArray)

  useEffect(props.toggleMode, [props.mode])


  const changeStyle = () => {
    const PlaylistTitle = document.getElementById('playlistTitle')
    if (props.mode === 'light') {
      PlaylistTitle.classList.replace('darkPlaylistTitle', 'lightPlaylistTitle')
    }
    else {
      PlaylistTitle.classList.replace('lightPlaylistTitle', 'darkPlaylistTitle')
    }
    // console.log(PlaylistTitle)
  }
  useEffect(changeStyle, [props.mode])



  
  useEffect(()=> {
    const play = document.getElementById('play')
    const icon = play.lastChild
    // console.log(play)
    if(playlistProps.playBtn===true) {
      icon.className = ''
      icon.classList.add('bi')
      icon.classList.add('bi-pause')
      icon.classList.add('icon')
    }
    else {
      icon.className = ''
      icon.classList.add('bi')
      icon.classList.add('bi-play-fill')
      icon.classList.add('icon')
    }
  },[playlistProps.playBtn])
  return (
    playlistProps.songArray && <>
      {/* {console.log(props.queue)} */}
      <Navbar />
      <QueueList />
      <ProfileList/>
      <div className="container main" >
        <div className="container">
          <div className="container photoTitleContainer">

            <img src={obj.img} alt="" style={{ width: "250px", height: "170px" }} />
            <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} VLBE</h1>
          </div>
          <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
         <div className="btns mb-3">

          <button className='play playlistBtn jello' id='play' style={{backgroundColor: playlistProps.playBtn?'springgreen':'rgba(255, 3, 100, 0.699)'}} onClick={() => { isEmpty === false && playlistProps.playBtn === false ? playlistProps.isClicked(true)  : playlistProps.isClicked(false)  }}><i  ></i></button>
          <button className='addToQueue playlistBtn jello' ><i className="bi bi-plus-square icon" onClick={() => playlistProps.addSongs(playlistProps.songArray)}></i></button>
          <button className='playlistBtn jello' onClick={()=>playlistProps.setOnLoop(!playlistProps.onLoop)} style={{backgroundColor: playlistProps.onLoop?'springgreen':'rgba(255, 3, 100, 0.699)'}} ><i className="bi bi-infinity icon"></i></button>
         </div>

        </div>
        <div className="container">

          <motion.table className='table'
           initial={{ opacity: 0, y:50 }}
           animate={{ opacity: 1, y:0}}
           transition={{
            duration: 0.6,
            delay: 0.3,
             ease:easeOut
           }}>
            <thead style={props.textCol}>

              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Date of Release</th>

            </thead>
            {playlistProps.songArray.map((el, index) => {
              const itemIndex = playlistProps.songArray.indexOf(el);
              return <tbody style={props.textCol} key={el._id} >

                <tr key={el._id} onClick={() => playlistProps.priorityAdd(el)}>
                  <th scope="row">{itemIndex+1}</th>
                  <td><img src={el.img} alt="" style={{ width: "50px" }} />&nbsp;&nbsp;<span>{el.name}</span></td>
                  <td>{el.artist}</td>
                  <td><p style={{ padding: "0px 2px" }}>{el.date.split('T')[0]}</p></td>
                </tr>
              </tbody>
            })
            }

          </motion.table>
        </div>

      </div>
      {!isEmpty?<BottomPlayer/>:''}
    </>
  )
}
