import React, { useEffect, useState,useRef} from 'react'
import { useSelector } from 'react-redux'
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
  // const getASong = ()=> {
  //   // if(playingQueuee.length!==0) {
  //   //   const Song = playingQueuee[0].url
  //   //   console.log(Song)
  //   // }
  // }
  
//   const GetASong = ()=> {
//     // console.log("inside fn")
//     // console.log(play)
//     // console.log("array before",array)
//     if(empty===false ) {
//       console.log(array)
//       const ul =document.getElementById('ul')
//       const li = ul.firstChild
//       li.style.backgroundColor = "pink"
      
//       const url = li.firstChild.getAttribute('value')
//       // console.log(url)
      
      
// if(play===false) {

//   fetchSong(url)
// }
      
//     }
//   }
//   const fetchSong = async(url)=> {
    
//     isPlaying(true)
//       const audio = document.getElementById('audio')
//     audio.setAttribute('src',url)
//       await audio.play()
//       audio.onended = ()=> {
//         console.log("array after audio end",array)
//         // const ul = document.getElementById("ul");
//         // ul.removeChild(ul.firstChild)
//         // const liCount = ul.getElementsByTagName("li").length;
//         // //  console.log(liCount)
//         // if(liCount===0) {
//         //   isEmpty(true)
//         // }
//         if(array.slice(1).length!==0) {

//           const newarr = array.slice(1)
//           console.log(newarr)
//           removeEl(newarr)
//         }
//         else {
//           console.log(array.length)
//           isEmpty(true)
//         }
        
//         // console.log(newarr)
//         isPlaying(false)
//       }
      
//     }
//     const removeEl = (newarr) => {
      
//       console.log(newarr)
//       setArray(newarr)
//       console.log("array after",newarr)
    
//     // console.log(array)
//   }
 
//   useEffect(GetASong,[play,array])
  
 
    return (
        <QueueContext.Provider value={{queue,showQueue,btnStyle,switchBtn,queueshift,changeQueueShift,array,setArray,play,isPlaying,btnref,trref}}>
           
            {props.children}
        </QueueContext.Provider>
    )
    }
export default QueueState 