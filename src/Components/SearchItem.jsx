import React, { useContext,useEffect } from 'react'
import '../CSS/SearchItem.css'
import store from '../store';
import { createAction } from '../action';
import PlaylistContext from '../context/ContextFiles/PlaylistContext';
import { useSelector } from 'react-redux';
const SearchItem = (props) => {
  const playlistProps = useContext(PlaylistContext)
  const playingQueuee = useSelector((state) => state.playingQueue)
  const isEmpty = useSelector((state) => state.isEmpty)
    const makeSongObj = (props)=> {
        const {trackname,audioUrl} = props
        // console.log(trackname)
        const song = {
            name:trackname,
            url:audioUrl

        }
        const action = createAction("add", song)
        // console.log(action)
        store.dispatch(action)
        // console.log(song)
        // console.log(song)
        
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
  
    // }, [playingQueuee, playlistProps.play, playlistProps.playBtn])
    const priorityAdd = ()=> {
      
      
      const {trackname,audioUrl} = props
        // console.log(trackname)
        const song = {
            name:trackname,
            url:audioUrl

        }
        const action = createAction("priorityAdd", song)
        // console.log(action)
        store.dispatch(action)
        
        playlistProps.isPaused(false)
          playlistProps.isPlaying(false)
          playlistProps.isClicked(true)
        
        
    }
  return (
    <>
   <div class="carouselItem">
          <img
            class="carousel-item__img"
            src={props.imgUrl}
            alt="people"
          />
          <div class="carousel-item__details">
            <div class="controls">
              {/* <span class="fas fa-play-circle" onClick={()=> {isEmpty === false && playlistProps.play === false ? playlistProps.isClicked(true)  : '' }}></span> */}
              <span class="fas fa-play-circle" onClick={()=> {priorityAdd(props) }}></span>
              {/* <span class="fas fa-play-circle" onClick={()=> playlistProps.playSong(playingQueuee[0].url)}></span> */}
              <span class="fas fa-plus-circle" onClick={()=> {makeSongObj(props)}}></span>
            </div>
            <h5 class="carousel-item__details--title">{props.trackname}</h5>
            <h6 class="carousel-item__details--subtitle">{props.artist}</h6>
          </div>
        </div>

    </>
  )
}

export default SearchItem
