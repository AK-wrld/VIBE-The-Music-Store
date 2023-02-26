import { useState } from "react";
import PlaylistContext from '../ContextFiles/PlaylistContext'

const PlaylistState = (props)=> {
    const [attributes, setAttributes] = useState(null)

    const changePlaylist = (name) => {
      setAttributes({
        name: name
      })
    }
  
    return(
        <PlaylistContext.Provider value={{attributes,changePlaylist}}>
            {props.children}
        </PlaylistContext.Provider>
    )
}
export default PlaylistState