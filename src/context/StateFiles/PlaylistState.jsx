import { useEffect, useState ,useRef} from "react";
import PlaylistContext from '../ContextFiles/PlaylistContext'
import { createAction } from '../../action';
import store from '../../store';
import { useSelector } from "react-redux";
const PlaylistState = (props)=> {
  const audioRef = useRef(false)
  useEffect(()=> {
    audioRef.current = document.getElementById('audio')
    console.log(audioRef.current)
  },[])
  const playingQueuee = useSelector((state) => state.playingQueue)
  const isEmpty = useSelector((state) => state.isEmpty)
    const [playBtn,isClicked] = useState(false)
  const [play,isPlaying] = useState(false)
  const [paused,isPaused] = useState(false)
    const [songArray,setSongs] = useState([])
    const fetchSongs = async(playlistId) =>{
      const response = await fetch(`http://localhost:5000/api/def/${playlistId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",


            },
            
        });
        const json = await response.json()
        if(json.success) {
          // console.log(json.songs)
          setSongs(json.songs)
        }
        else{
          console.log(json.message)
        }
    }
    // const playSong = (url) => {
    //   // console.log(url)
    //   isClicked(true)
    //   isPlaying(true)
  
      
    //   audioRef.current.addEventListener("canplaythrough", () => {
    //     /* the audio is now playable; play it if permissions allow */
    //     audio.play();
    //   });
    //   audio.addEventListener('ended', () => {
    //     audio.pause()
    //     isPlaying(false)
  
    //     const action = createAction("removeSong", "")
    //     store.dispatch(action)
    //     // const unsubscribe = store.subscribe(handleChange )
    //     //   unsubscribe();
  
  
  
    //   })
  
    // }
    const handleAudioEnd = ()=> {
      isPlaying(false)
      const action = createAction("removeSong", "")
      store.dispatch(action)
    }
    
  useEffect(() => {
    if (playBtn === true) {
      console.log("play btn clicked")
      console.log(paused)
      if (isEmpty === false) {
        console.log("not empty")

        if (play === false) {
          console.log("not playing")
          console.log(playingQueuee)
          // if(paused===false) {

            audioRef.current.setAttribute('src',playingQueuee[0].url)
            console.log(audioRef.current)
            audioRef.current.play()
          // }
          // else {
            audioRef.current.play()
          // }
        isPlaying(true)
        }
        
      }
    }
    else {   
     
      // isPaused(true)
      audioRef.current.pause()
      console.log('play btn not clicked')
    }

  }, [playingQueuee, play, playBtn])
  // useEffect(()=> {
  //   if(paused===true) {
  //     audioRef.current.pause()
  //     audioRef.current.currentTime = audioRef.current.currentTime
  //     isPlaying(false)
  //   }
  // },[paused])
    useEffect(()=> {
      if(isEmpty===true) {
        // console.log("isClicked false")
        isClicked(false)
      }
      else {
        console.log('not empty')
      }
    },[playingQueuee])
    return(
        <PlaylistContext.Provider value={{songArray,setSongs,fetchSongs,playBtn,isClicked,play,isPlaying,}}>
            {props.children}
             <audio src="" ref={audioRef} id='audio' onEnded={handleAudioEnd}></audio>
        </PlaylistContext.Provider>
    )
}
export default PlaylistState