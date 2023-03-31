import React from 'react'
import { useContext } from 'react'
import { createAction } from '../action'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import '../CSS/queueItem.css'
import store from '../store'

const QueueItem = (props) => {
  // console.log(props)
  const playlistProps = useContext(PlaylistContext)
const deleteQueueItem = (index)=> {
  // console.log(index)
  if(index===0) {
    playlistProps.audioRef.current.pause()
    playlistProps.audioRef.current.currentTime = 0
    const action = createAction('removeParticularSong',index)
    store.dispatch(action)
    playlistProps.isPlaying(false)
    playlistProps.isPaused(false)
  }
  else {
    const action = createAction('removeParticularSong',index)
    store.dispatch(action)
  }
}
  return (
    <>
      {/* <input type="hidden" name="" id="" value={props.url}/> */}
      <div id='queueItem' >
        <span className='queueItemName' style={{color:props.index===0?'white':'gray'}}>{props.name}</span>
        <i className="bi bi-x deleteQueueItem jello" onClick={()=>deleteQueueItem(props.index)}></i>
      </div>
      {/* <audio id='audio' src={props.url} style={{display:"none"}}></audio> */}
    </>
  )
}

export default QueueItem
