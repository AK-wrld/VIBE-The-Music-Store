import React, { useEffect,useState,useContext } from 'react'
import { useSelector } from 'react-redux'
import ModeContext from '../context/ContextFiles/ModeContext'
import QueueContext from '../context/ContextFiles/QueueContext'
import '../CSS/Queue.css'
import btn from '../Images/rightarrow.png'
import QueueItem from './QueueItem'
export default function QueueList(prop) {
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
  const playingQueuee = useSelector((state)=>state.playingQueue)
  
  //TODO: Quelist kholke nhi print hora
  // console.log(playingQueuee)

  
  return (
    <>
      

      <div className="queueList" id='queueList' style={q.queueshift  }>
      <h2 className='py-3'>Your Queue</h2>
      <ul id='ul'>
        {playingQueuee.map((el)=> {
          // console.log(el)
          
            return <li key={el._id} >
              <QueueItem key={el._id} name = {el.name} url = {el.url} />
              </li>
          
          
          
        })}
        
        
      </ul>
      </div>
      
      <button className="queuebtn" style={q.btnStyle} onClick={()=>{q.queue==='hidden'?q.showQueue('show'):q.showQueue('hidden')}}>
        {/* {console.log(props.queue)} */}
      <img src={btn} alt="" />
      </button>
      
    </>
  )
}
