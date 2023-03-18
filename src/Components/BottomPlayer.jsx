
import React, { useContext ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
  import '../CSS/BottomPlayer.css'
  const BottomPlayer = () => {
    const playlistProps = useContext(PlaylistContext)
    const playingQueuee = useSelector((state) => state.playingQueue)
    const isEmpty = useSelector((state) => state.isEmpty)

    const changeAudioTime = ()=> {
      const myProgressBar = document.getElementById('myProgressBar')
      playlistProps.audioRef.current.currentTime = myProgressBar.value*playlistProps.audioRef.current.duration/100
    }
    
    useEffect(()=> {
      const play = document.getElementById('masterPlay')
      
      // console.log(play)
      if(playlistProps.playBtn===true) {
        play.className = ''
        play.classList.add('bi')
        play.classList.add('bi-pause')
        // icon.classList.add('icon')
      }
      else {
        play.className = ''
        play.classList.add('bi')
        play.classList.add('bi-play-fill')
        // icon.classList.add('icon')
      }
    },[playlistProps.playBtn])
    return (
      <>
        <div class="bottom">
        <div class="bottom-bar">
          <div class="bottom-bar-song-img">
            <img src={playingQueuee[0].img} alt="" />
          </div>
          <div class="bottom-bar-song-details">
            <div class="bottom-bar-song--details--wrapper">
              <a href="#" class="bottom-bar-song-details-title">{playingQueuee[0].name}</a>
            </div>
            <div class="bottom-bar-song-details">
              <a href="#" class="bottom-bar-song-details-artist">{playingQueuee[0].artist}</a>
            </div>
          </div>
          <div class="bottom-bar-progress">
            <input type="range" name="range" id="myProgressBar" min="0" value={isNaN(playlistProps.progressBar)?0:playlistProps.progressBar} max="100" onChange={changeAudioTime}/>
            <div class="icons">
                <button className='footerBtn' ><i class="fa-solid fa-shuffle" id="shuffle" style={{fontSize:'24px'}}></i></button>
                <button className='footerBtn' ><i class="fas fa-3x fa-step-backward" id="previous" style={{fontSize:'24px'}}></i></button>
                <button className='footerBtn' ><i  id="masterPlay" onClick={() => { isEmpty === false && playlistProps.playBtn === false ? playlistProps.isClicked(true)  : playlistProps.isClicked(false)  }}></i></button>
                <button className='footerBtn' ><i class="fas fa-3x fa-step-forward" id="next" style={{fontSize:'24px'}} ></i> </button>
                <button className='footerBtn' ><i class="fa-solid fa-repeat" id="repeat" style={{fontSize:'24px'}}></i></button>
          </div>
           {/* <div class="righticons">
            <div class="icons">
                <i class="fa-solid fa-volume" id="volume"></i>
            </div>  */}
          </div>
        </div>
      </div>
      

      </>
    )
  }
  
  export default BottomPlayer
  
    