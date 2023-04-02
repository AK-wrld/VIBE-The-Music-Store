
import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
import {easeOut, motion } from "framer-motion"
import '../CSS/userPlaylist.css';
import QueueList from './QueueList';
import ModeContext from '../context/ContextFiles/ModeContext'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import AlertContext from '../context/ContextFiles/AlertContext'
import { useSelector } from 'react-redux';
import BottomPlayer from './BottomPlayer'
import ProfileList from './ProfileList';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';


export default function userPlaylist() {
  const navigate = useNavigate()
  const props = useContext(ModeContext)
  const playlistProps = useContext(PlaylistContext)
  const alertProp = useContext(AlertContext)
  const isEmpty = useSelector((state) => state.isEmpty)

  const token = window.localStorage.getItem('token')
  if (!token) {
    navigate('/login')
  }

  const obj = JSON.parse(window.localStorage.getItem('userPlaylist'))
  useEffect(() => {
    playlistProps.fetchUserSongs(obj._id)

  }, [])
  useEffect(props.toggleMode, [props.mode])
  useEffect(() => {
    const play = document.getElementById('play')
    const icon = play.lastChild
    // console.log(play)
    if (playlistProps.playBtn === true) {
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
  }, [playlistProps.playBtn])
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
  const removeUserSong = async (id) => {
    const obj = {
      _id: id
    }
    const response = await fetch(`http://localhost:5000/api/user/deleteusersong`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(obj), // body data type must match "Content-Type" header
    });
    const data = await response.json()
    if (data.success === true) {
      alertProp.showAlert(data.message, 'success')
      const newarr = playlistProps.UsersongArray.filter((el) => {
        if (el._id !== id) {
          return true
        }
      })
      playlistProps.setUserSongs(newarr)
    }
    else {
      alertProp.showAlert(data.message, 'danger')
    }

  }
  return (
    <>
      <Navbar />
      <Alert />
      <QueueList />
      <ProfileList />
      <div className="container main" >
        <div className="container">
          <div className="container photoTitleContainer">

            <img src={obj.img} alt="" style={{ width: "250px", height: "170px" }} />
            <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} </h1>
          </div>
          <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
          <div className="btns mb-3">

            <button className='play playlistBtn jello' id='play' style={{backgroundColor: playlistProps.playBtn?'springgreen':'rgba(255, 3, 100, 0.699)'}} onClick={() => { isEmpty === false && playlistProps.playBtn === false ? playlistProps.isClicked(true) : playlistProps.isClicked(false) }}><i  ></i></button>
            <button className='addToQueue playlistBtn jello' ><i className="bi bi-plus-square icon" onClick={() => playlistProps.addSongs(playlistProps.UsersongArray)}></i></button>
            <button className='playlistBtn jello' onClick={() => playlistProps.setOnLoop(!playlistProps.onLoop)} style={{backgroundColor: playlistProps.onLoop?'springgreen':'rgba(255, 3, 100, 0.699)'}} ><i className="bi bi-infinity icon"></i></button>
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
            {playlistProps.UsersongArray.map((el, index) => {
              const itemIndex = playlistProps.UsersongArray.indexOf(el);
              return <tbody style={props.textCol} key={el._id} >

                <tr key={el._id} >
                  <th scope="row" onClick={() => playlistProps.priorityAdd(el)}>{itemIndex + 1}</th>
                  <td onClick={() => playlistProps.priorityAdd(el)}><img src={el.img} alt="" style={{ width: "50px" }} />&nbsp;&nbsp;<span >{el.name}</span></td>
                  <td onClick={() => playlistProps.priorityAdd(el)}>{el.artist}</td>
                  <td onClick={() => playlistProps.priorityAdd(el)}><span style={{ padding: "0px 2px" }}>{el.date.split('T')[0]}</span></td>
                  <td> <i className="bi bi-x deleteUserSongItem jello" onClick={() => removeUserSong(el._id)}></i></td>
                </tr>
              </tbody>
            })
            }

          </motion.table>
        </div>

      </div>
      {!isEmpty ? <BottomPlayer /> : ''}
    </>
  )
}
