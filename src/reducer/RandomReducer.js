
const Reducer = (state = {
    playingQueue: [],
    nextSong:'',
  isPlaying: false,
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
    else if(action.type==='multiAdd') {
        const newarr = state.playingQueue
        const concArr = newarr.concat(...action.payload)
        const checkEmpty = concArr.length>0?false:true
        return {...state,playingQueue:concArr,isEmpty:checkEmpty}
    }
    else if(action.type==='removeSong') {
        return {
            ...state,
            playingQueue: state.playingQueue.filter((song, index) => index !== action.payload)
          };
          
        
    }

    return state
}
export default Reducer