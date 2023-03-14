import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
// import LoadingBar from 'react-top-loading-bar'
import '../CSS/Playlist.css';
import QueueList from './QueueList';
import ModeContext from '../context/ContextFiles/ModeContext'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import { createAction } from '../action';
import store from '../store';
import { useSelector } from 'react-redux';


export default function Playlist() {
  const props = useContext(ModeContext)
  const playlistProps = useContext(PlaylistContext)  
  const playingQueuee = useSelector((state) => state.playingQueue)
  const isEmpty = useSelector((state) => state.isEmpty)

  const token = window.localStorage.getItem('token')
  if (!token) {
    return window.location = ('/login')
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



  const addSongs = (newarr) => {
    // console.log(newarr)
    const action = createAction("multiAdd", newarr)
    store.dispatch(action)

  }
  const addASong = (el) => {
    const action = createAction("add", el)
    store.dispatch(action)

  }


 
  // useEffect(() => {
  //   if (playlistProps.playBtn === true) {
  //     console.log("play btn clicked")
  //     if (isEmpty === false) {
  //       console.log("not empty")

  //       if (playlistProps.play === false) {
  //         console.log("not playing")
  //         console.log(playingQueuee)
  //         playlistProps.playSong(playingQueuee[0].url)
  //       }
  //     }
  //   }
  //   else {
  //     console.log('play btn not clicked')
  //   }

  // }, [playingQueuee, playlistProps.play, playlistProps.playBtn])

  return (
    <div>
      {/* {console.log(props.queue)} */}
      <Navbar />
      <QueueList />
      <div className="container main">
        <div className="container">
          <div className="container photoTitleContainer">

            <img src={obj.img} alt="" style={{ width: "250px", height: "170px" }} />
            <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} VLBE</h1>
          </div>
          <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
          <button className='mb-3 play me-3' id='play' onClick={() => { isEmpty === false && playlistProps.play === false ? playlistProps.isClicked(true)  : playlistProps.isClicked(false)&& playlistProps.isPaused(true) }}><i className="bi bi-play-fill icon" ></i></button>
          <button className='mb-3 addToQueue' ><i class="bi bi-plus-square icon" onClick={() => addSongs(playlistProps.songArray)}></i></button>

        </div>
        <div className="container">

          <table className='table'>
            <thead style={props.textCol}>

              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Date of Release</th>

            </thead>
            {playlistProps.songArray.map((el, index) => {
              const itemIndex = playlistProps.songArray.indexOf(el);
              return <tbody style={props.textCol} key={el._id} >

                <tr key={el._id} onClick={() => addASong(el)}>
                  <th scope="row">{itemIndex}</th>
                  <td><img src={el.img} alt="" style={{ width: "50px" }} />&nbsp;&nbsp;<span className='vibe'>{el.name}</span></td>
                  <td>{el.artist}</td>
                  <td><p style={{ padding: "0px 2px" }}>{el.date.split('T')[0]}</p></td>
                </tr>
              </tbody>
            })
            }

          </table>
        </div>

      </div>
    </div>
  )
}
