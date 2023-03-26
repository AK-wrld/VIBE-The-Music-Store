
import React, { useContext ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { createAction } from '../action'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
  import '../CSS/BottomPlayer.css'
import store from '../store'
  const BottomPlayer = () => {
    const playlistProps = useContext(PlaylistContext)
    const playingQueuee = useSelector((state) => state.playingQueue)
    const isEmpty = useSelector((state) => state.isEmpty)

    const myProgressBar = document.getElementById('myProgressBar')
    const changeAudioTime = ()=> {
      
      playlistProps.audioRef.current.currentTime = myProgressBar.value*playlistProps.audioRef.current.duration/100
    }
    const volumeBar = document.getElementById('volumeBar')
    const changeAudioVolume = ()=> {
      // console.log(playlistProps.audioRef.current.volume)
      playlistProps.audioRef.current.volume = volumeBar.value/100
    }
    //handling fast forward btn
    const handleFastForwardClick = ()=> {
     
        // console.log('play btn false')
        playlistProps.audioRef.current.pause()
        if(playlistProps.onLoop===false) {

          const action = createAction('removeSong')
          store.dispatch(action)
        }
        else {
          const action = createAction('loopRemove')
          store.dispatch(action)
        }
        playlistProps.audioRef.current.currentTime=0
        playlistProps.isPlaying(false)
        playlistProps.isClicked(true)
        playlistProps.isPaused(false)
     
    }
    //handling prev button
    const handlePrevClick = ()=> {
      if(playlistProps.playBtn===false) {
        // console.log('play btn false')
        playlistProps.audioRef.current.pause()

      playlistProps.audioRef.current.currentTime = 0
      // playlistProps.setProgressBarValue(0)
      const action = createAction('remove','')
      store.dispatch(action)
      playlistProps.isPlaying(false)
      playlistProps.isPaused(false)     
      
      }
      else {
        playlistProps.audioRef.current.pause()
        playlistProps.audioRef.current.currentTime = 0
        playlistProps.setProgressBarValue(0)
        playlistProps.audioRef.current.play()
      }
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
              <div style={{marginLeft:'325px',marginRight:'160px'}}>

                <button className='footerBtn' ><i class="fa-solid fa-shuffle" id="shuffle" style={{fontSize:'24px'}}></i></button>
                <button className='footerBtn' ><i class="fas fa-3x fa-step-backward" id="previous" style={{fontSize:'24px'}} onClick={handlePrevClick}></i></button>
                <button className='footerBtn' ><i  id="masterPlay" onClick={() => { isEmpty === false && playlistProps.playBtn === false ? playlistProps.isClicked(true)  : playlistProps.isClicked(false)  }}></i></button>
                <button className='footerBtn' ><i class="fas fa-3x fa-step-forward" id="next" style={{fontSize:'24px'}} onClick={handleFastForwardClick}></i> </button>
                <button className='footerBtn' ><i class="fa-solid fa-repeat jello" id="repeat" style={{fontSize:'24px',color:playlistProps.onLoop?'springgreen':'white'}} onClick={()=>playlistProps.setOnLoop(!playlistProps.onLoop)}></i></button>
              </div>
                <div className="volumeContainer">
                <i className={`fa-solid fa-volume-${playlistProps.audioRef.current.volume===0?'xmark':playlistProps.audioRef.current.volume<=0.5?'low':'high'}`}></i>
                <input type="range" name="" id="volumeBar" min={0} max='100'  onChange={changeAudioVolume}/>
                </div>
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
  
    