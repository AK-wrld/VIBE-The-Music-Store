
const Reducer = (state = {
    playingQueue: [],
   
  isEmpty:true
}, action) => {

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
    else if(action.type==='removeParticularSong') {
        const newarr = state.playingQueue.filter((el,index)=> {
            if(index!==action.payload) {
                return true
            }
        })
        // console.log(newarr)
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
    else if(action.type==='shuffle') {
        const newarr = state.playingQueue.filter((el,index)=> {
            if(index!==0) {
                return true
            }
        })
        // console.log(newarr)
        let currentIndex = newarr.length,  randomIndex;
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [newarr[currentIndex], newarr[randomIndex]] = [
                newarr[randomIndex], newarr[currentIndex]];
          }
          newarr.unshift(state.playingQueue[0])
            console.log(newarr)
        return {...state,playingQueue:newarr}
          
        
    }

    return state
}
export default Reducer