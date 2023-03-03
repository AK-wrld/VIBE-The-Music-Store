import React from 'react'


const QueueItem = (props) => {
    // console.log(props)
    
  return (
    <>
    <input type="hidden" name="" id="" value={props.url}/>
      <div>{props.name}</div>
      <audio id='audio' src={props.url} style={{display:"none"}}></audio>
    </>
  )
}

export default QueueItem
