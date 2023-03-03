import { useState } from "react";
import PlaylistContext from '../ContextFiles/PlaylistContext'

const PlaylistState = (props)=> {
    const [attributes, setAttributes] = useState(null)
    const [songArray,setSongs] = useState([])
    const fetchSongs = async(playlistId) =>{
      const response = await fetch(`http://localhost:5000/api/def/${playlistId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",


            },
            
        });
        const json = await response.json()
        if(json.success) {
          // console.log(json.songs)
          setSongs(json.songs)
        }
        else{
          console.log(json.message)
        }
    }
  
    return(
        <PlaylistContext.Provider value={{songArray,setSongs,fetchSongs}}>
            {props.children}
        </PlaylistContext.Provider>
    )
}
export default PlaylistState