import React, { useEffect,useState } from 'react'
import '../CSS/Queue.css'
import btn from '../Images/rightarrow.png'
export default function QueueList(props) {

  const [btnStyle, switchBtn] = useState({
    
    transform : 'translateX(0px) scaleX()',
        
        transition :'transform 1s'
  })
  
  const [queueshift,changeQueueShift] = useState({
    transform:'translateX(-100%)'
  })
 
  
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
    if(props.queue ==="hidden") {
      
      switchBtn({
        transform : "translateX(345px) scaleX(-1)",
    
    transition :'transform 1s'
      })
      changeQueueShift({
        transform:'translateX(0%)'
      })
    }
    else {
      
      switchBtn({
        transform : 'translateX(0px) scaleX(1)',
      
        transition :'transform 1s'
      })
      changeQueueShift({
        transform:'translateX(-100%)'
      })
    }
  }
  useEffect(flipBtn,[props.queue])
  useEffect(changeQueueBg,[props.mode])
  return (
    <>
      

      <div className="queueList" id='queueList' style={queueshift  }>
      <h2 className='py-3'>Your Queue</h2>
      <ul>
        <li className="song1">Hello</li>
        <li className="song2">world</li>
        <li className="song3">nice</li>
        <li className="song4">to</li>
        <li className="song5">meet</li>
      </ul>
      </div>
      <button className="queuebtn" style={btnStyle} onClick={()=>{props.queue==='hidden'?props.showQueue('show'):props.showQueue('hidden')}}>
        {/* {console.log(props.queue)} */}
      <img src={btn} alt="" />
      </button>
      
    </>
  )
}
