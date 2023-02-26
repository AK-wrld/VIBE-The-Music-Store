import React, { useEffect,useState,useContext } from 'react'
import ModeContext from '../context/ContextFiles/ModeContext'
import QueueContext from '../context/ContextFiles/QueueContext'
import '../CSS/Queue.css'
import btn from '../Images/rightarrow.png'
export default function QueueList() {
  const props = useContext(ModeContext)
  const q = useContext(QueueContext)
  const changeQueueBg=()=> {
    const queueList = document.getElementById("queueList")
    // console.log(queueList)
    if(props.mode==='dark') {
      queueList.style.backgroundColor="black";
      queueList.style.color="white"
    }
    else {
      queueList.style.backgroundColor="beige";
      queueList.style.color="black"
    }
    
  }
  const flipBtn = ()=> {
    if(q.queue ==="hidden") {
      
      q.switchBtn({
        transform : "translateX(345px) scaleX(-1)",
    
    transition :'transform 1s'
      })
      q.changeQueueShift({
        transform:'translateX(0%)'
      })
    }
    else {
      
      q.switchBtn({
        transform : 'translateX(0px) scaleX(1)',
      
        transition :'transform 1s'
      })
      q.changeQueueShift({
        transform:'translateX(-100%)'
      })
    }
  }
  useEffect(flipBtn,[q.queue])
  useEffect(changeQueueBg,[props.mode])
  return (
    <>
      

      <div className="queueList" id='queueList' style={q.queueshift  }>
      <h2 className='py-3'>Your Queue</h2>
      <ul>
        <li className="song1">Hello</li>
        <li className="song2">world</li>
        <li className="song3">nice</li>
        <li className="song4">to</li>
        <li className="song5">meet</li>
      </ul>
      </div>
      <button className="queuebtn" style={q.btnStyle} onClick={()=>{q.queue==='hidden'?q.showQueue('show'):q.showQueue('hidden')}}>
        {/* {console.log(props.queue)} */}
      <img src={btn} alt="" />
      </button>
      
    </>
  )
}
