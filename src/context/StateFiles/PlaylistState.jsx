import { useEffect, useState, useRef } from "react";
import PlaylistContext from '../ContextFiles/PlaylistContext'
import { createAction } from '../../action';
import store from '../../store';
import { useSelector } from "react-redux";
const PlaylistState = (props) => {
  const audioRef = useRef(false)
  useEffect(() => {
    audioRef.current = document.getElementById('audio')
    console.log(audioRef.current)
  }, [])
  const playingQueuee = useSelector((state) => state.playingQueue)
  const isEmpty = useSelector((state) => state.isEmpty)
  const [playBtn, isClicked] = useState(false)
  const [play, isPlaying] = useState(false)
  const [paused, isPaused] = useState(false)
  const [onLoop,setOnLoop] = useState(false)
  const [shuffle,onShuffle] = useState(false)
  const [songArray, setSongs] = useState([])
  const [UsersongArray, setUserSongs] = useState([])
  const [progressBar,setProgressBarValue] = useState(0)
  const [volumeBar,setVolumeBar] = useState(50)
  const fetchSongs = async (playlistId) => {
    const response = await fetch(`http://localhost:5000/api/def/${playlistId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",


      },

    });
    const json = await response.json()
    if (json.success) {
      // console.log(json.songs)
      setSongs(json.songs)
    }
    else {
      console.log(json.message)
    }
  }
  const fetchUserSongs = async (playlistId) => {
    const response = await fetch(`http://localhost:5000/api/user/getusersongs/${playlistId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
    const json = await response.json()
    if (json.success) {
      console.log(json.fetchSongs)
      setUserSongs(json.fetchSongs)
    }
    else {
      console.log(json.message)
    }
  }
  
  const addSongs = (newarr) => {
    // console.log(newarr)
    const action = createAction("multiAdd", newarr)
    store.dispatch(action)

  }
  const addASong = (el) => {
    const action = createAction("add", el)
    store.dispatch(action)

  }

  const priorityAdd = (el)=> {
    
    const {name,url,artist,img} = el
    // console.log(trackname)
    const song = {
      name:name,
      url:url,
      artist:artist,
      img:img
      
    }
    const action = createAction("priorityAdd", song)
    // console.log(action)
    store.dispatch(action)
    isPaused(false)
    isPlaying(false)
    isClicked(true)
   
      
  }
  const handleTimeUpdate = ()=> {
    const progress = parseInt((audioRef.current.currentTime/audioRef.current.duration)*100)
    // console.log(audioRef.current.currentTime)
    // console.log(progress)

    setProgressBarValue(progress)
  }
 
  const handleAudioEnd = () => {
    isPlaying(false)
    
    if(onLoop===false) {

      const action = createAction("removeSong", "")
      store.dispatch(action)
    }
    else {
      console.log('loop happening')
      const action = createAction("loopRemove", "")
      store.dispatch(action)
    }
  }

  useEffect(() => {
    if (playBtn === true && isEmpty === false && play === false && paused===false) {
      console.log(playingQueuee)
      audioRef.current.setAttribute('src', playingQueuee[0].url)
      console.log(audioRef.current)
      audioRef.current.play()
      isPlaying(true)
    }
    if (playBtn === true && isEmpty === false && play === false && paused===true) {
      //play a song from wherever it is paused
      // console.log(playBtn,isEmpty,play,paused)
      console.log(audioRef.current)
      audioRef.current.play()
      isPlaying(true)
      isPaused(false)
    }
    else if(playBtn === false && isEmpty === false && play === true) {
      //current song is paused
      // console.log(playBtn,isEmpty,play,paused)
      audioRef.current.pause()
      audioRef.current.currentTime = audioRef.current.currentTime
      isPaused(true)
      isPlaying(false)
      // audioRef.current.pause()
      console.log('play btn not clicked')
    }
    

  }, [playingQueuee, play, playBtn])
 
  useEffect(() => {
    if (isEmpty === true) {
      // console.log("isClicked false")
      audioRef.current.pause()
      isClicked(false)
      isPaused(false)
      isPlaying(false)
      onShuffle(false)
    }
    else {
      console.log('not empty')
    }
  }, [playingQueuee])
  useEffect(()=> {
    if(audioRef.current.currentTime===100) {
      console.log('audio ended')
      handleAudioEnd()
    }
    else {
      console.log('audio still playing')
    }
  },[audioRef])
  return (
    <PlaylistContext.Provider value={{ songArray, setSongs, fetchSongs, playBtn, isClicked, play, isPlaying, audioRef,paused,isPaused,onLoop,setOnLoop,progressBar,setProgressBarValue,addSongs,addASong,priorityAdd,UsersongArray,setUserSongs,fetchUserSongs,volumeBar,setVolumeBar,shuffle,onShuffle }}>
      {props.children}
      <audio src="" ref={audioRef} id='audio' onEnded={handleAudioEnd} onTimeUpdate={handleTimeUpdate} ></audio>
    </PlaylistContext.Provider>
  )
}
export default PlaylistState