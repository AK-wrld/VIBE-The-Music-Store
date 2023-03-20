import React, { useEffect, useState,useRef} from 'react'
import QueueContext from '../ContextFiles/QueueContext'

const QueueState = (props)=> {
   //make global props and global states here 
   const btnref = useRef(false)
   const trref = useRef(false)
  // const [counter,setCounter] = useState(0)
   const [play,isPlaying] = useState(false)
  //  const [empty,isEmpty]=useState(true)
   const [array,setArray] = useState([])
   const [queue, showQueue] = useState("show")
   const [btnStyle, switchBtn] = useState({
    
    transform : 'translateX(0px) scaleX()',
        
        transition :'transform 1s'
  })
  
  const [queueshift,changeQueueShift] = useState({
    transform:'translateX(-100%)'
  })
    return (
        <QueueContext.Provider value={{queue,showQueue,btnStyle,switchBtn,queueshift,changeQueueShift,array,setArray,play,isPlaying,btnref,trref}}>
           
            {props.children}
        </QueueContext.Provider>
    )
    }
export default QueueState 