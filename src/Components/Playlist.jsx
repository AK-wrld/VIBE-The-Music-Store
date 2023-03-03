import React, { useEffect, useContext, useRef } from 'react'
import Navbar from './Navbar'
// import LoadingBar from 'react-top-loading-bar'
import '../CSS/Playlist.css';
import QueueList from './QueueList';
import ModeContext from '../context/ContextFiles/ModeContext'
import PlaylistContext from '../context/ContextFiles/PlaylistContext'
import QueueContext from '../context/ContextFiles/QueueContext';


export default function Playlist() {
  const token = window.localStorage.getItem('token')
  if (!token) {
    return window.location = ('/login')
  }

  const obj = JSON.parse(window.localStorage.getItem('playlistdata'))


  const DefProps = useContext(PlaylistContext)
  useEffect(() => {
    DefProps.fetchSongs(obj._id)

  }, [])

  // console.log(DefProps.songArray)
  const props = useContext(ModeContext)
  useEffect(props.toggleMode, [props.mode])


  const changeStyle = () => {
    const PlaylistTitle = document.getElementById('playlistTitle')
    if (props.mode === 'light') {
      PlaylistTitle.classList.replace('darkPlaylistTitle', 'lightPlaylistTitle')
    }
    else {
      PlaylistTitle.classList.replace('lightPlaylistTitle', 'darkPlaylistTitle')
    }
    // console.log(PlaylistTitle)
  }
  useEffect(changeStyle, [props.mode])

  const queue = useContext(QueueContext)
  const handleClick = ()=> {
    queue.btnref.current = true
    // console.log(btnref.current)
    const newarr = [...queue.array]
    addSongs(newarr)
    
  }
  
  const addSongs = (newarr)=> {
    if(queue.btnref.current === true) {
      // console.log(DefProps.songArray[0].name)
      // queue.setArray(DefProps.songArray)
      // console.log(queue.array)
      
    newarr.push(...DefProps.songArray)
    queue.setArray(newarr)
    queue.setCounter((counter)=>counter+newarr.length-1)
    queue.isEmpty(false)
    // console.log(queue.array)
    queue.btnref.current=false
    // console.log(btnref.current)
    }
  }
  useEffect(addSongs,[queue.btnref.current])
  
  const handleClickForASong = (el)=> {
    // console.log(el)
    queue.trref.current=true
    addASong(el)
    
  }
  const addASong = (el)=> {
    if(queue.trref.current===true) {
      const newarr = [...queue.array]
    newarr.push(el)
    queue.setArray(newarr)
    queue.setCounter((counter)=>counter+1)
    queue.isEmpty(false)
    // console.log(queue.array)
    queue.trref.current = false
    }
  }
  
  useEffect(addASong,[queue.trref.current])
  // useEffect(queue.GetASong,[queue.play,queue.empty])
  return (
    <div>
      {/* {console.log(props.queue)} */}
      <Navbar />
      <QueueList />
      <div className="container main">
        <div className="container">
          <div className="container photoTitleContainer">

            <img src={obj.img} alt="" style={{ width: "250px", height: "170px" }} />
            <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} VLBE</h1>
          </div>
          <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
          <button className='mb-3 play' ><i className="bi bi-play-fill icon" ref={queue.btnref} onClick={handleClick}></i></button>
        </div>
        <div className="container">

          <table className='table'>
            <thead style={props.textCol}>

              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Date of Release</th>

            </thead>
            {DefProps.songArray.map((el, index) => {
              const itemIndex = DefProps.songArray.indexOf(el);
              return <tbody style={props.textCol} key={el._id} >

                <tr key={el._id} ref={queue.trref} onClick={()=>handleClickForASong(el)}>
                  <th scope="row">{itemIndex}</th>
                  <td><img src={el.img} alt="" style={{ width: "50px" }} />&nbsp;&nbsp;<span className='vibe'>{el.name}</span></td>
                  <td>{el.artist}</td>
                  <td><p style={{ padding: "0px 2px" }}>{el.date.split('T')[0]}</p></td>
                </tr>
              </tbody>
            })
            }

          </table>
        </div>

      </div>
    </div>
  )
}
