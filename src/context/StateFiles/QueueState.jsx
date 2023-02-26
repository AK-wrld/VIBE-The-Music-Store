import React, {useState} from 'react'
import QueueContext from '../ContextFiles/QueueContext'

const QueueState = (props)=> {
   //make global props and global states here 
   const [queue, showQueue] = useState("show")
   const [btnStyle, switchBtn] = useState({
    
    transform : 'translateX(0px) scaleX()',
        
        transition :'transform 1s'
  })
  
  const [queueshift,changeQueueShift] = useState({
    transform:'translateX(-100%)'
  })
 
  
 
    return (
        <QueueContext.Provider value={{queue,showQueue,btnStyle,switchBtn,queueshift,changeQueueShift}}>
           
            {props.children}
        </QueueContext.Provider>
    )
    }
export default QueueState 