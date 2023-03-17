
const Reducer = (state = {
    playingQueue: [],
    nextSong:'',
 
  isEmpty:true
}, action) => {
    // }
    if (action.type === 'add') {
        const newarr = state.playingQueue
       
        newarr.push(action.payload)
        const checkEmpty = newarr.length>0?false:true
        // console.log(checkEmpty)
        return { ...state, playingQueue: newarr,isEmpty:checkEmpty  }
    }
    if (action.type === 'priorityAdd') {
        const newarr = state.playingQueue
       
        newarr.unshift(action.payload)
        const checkEmpty = newarr.length>0?false:true
        // console.log(checkEmpty)
        return { ...state, playingQueue: newarr,isEmpty:checkEmpty  }
    }
    else if(action.type==='multiAdd') {
        const newarr = state.playingQueue
        const concArr = newarr.concat(...action.payload)
        const checkEmpty = concArr.length>0?false:true
        return {...state,playingQueue:concArr,isEmpty:checkEmpty}
    }
    else if(action.type==='removeSong') {
        const newarr = state.playingQueue.slice(1)
        const checkEmpty = newarr.length>0?false:true
        return {...state,playingQueue:newarr,isEmpty:checkEmpty}
          
        
    }
    else if(action.type==='loopRemove') {
        const song = state.playingQueue.shift()
        console.log(song)
        const newarr = state.playingQueue.concat(song)
        console.log(newarr)
        const checkEmpty = newarr.length>0?false:true
        return {...state,playingQueue:newarr,isEmpty:checkEmpty}
          
        
    }
    
    else if(action.type==='clearQueue') {
        const newarr = []
        
        return {...state,playingQueue:newarr,isEmpty:true}
          
        
    }

    return state
}
export default Reducer