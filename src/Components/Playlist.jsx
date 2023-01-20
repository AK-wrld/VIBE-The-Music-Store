import React, {useEffect} from 'react'
import Navbar from './Navbar'
// import LoadingBar from 'react-top-loading-bar'
import '../CSS/Playlist.css';
import QueueList from './QueueList';

export default function Playlist(props) {
  const changeStyle=()=> {
    const PlaylistTitle = document.getElementById('playlistTitle')
    if(props.mode==='light') {
      PlaylistTitle.classList.replace('darkPlaylistTitle','lightPlaylistTitle')
    }
    else {
      PlaylistTitle.classList.replace('lightPlaylistTitle','darkPlaylistTitle')
    }
    // console.log(PlaylistTitle)
  }
  useEffect(changeStyle,[props.mode])
  const obj = JSON.parse(window.localStorage.getItem('playlistdata'))
  // console.log(obj)
  return (
    <div>
      {/* {console.log(props.queue)} */}
      <Navbar mode={props.mode} textCol={props.textCol}queue={props.queue} showQueue={props.showQueue}/>
      <QueueList mode={props.mode} queue={props.queue} showQueue={props.showQueue}/>
      <div className="container main">
      <div className="container">
        <div className="container photoTitleContainer">

      <img src={`/pubImages/${obj.img}.jpg`} alt="" style={{width:"250px",height:"170px"}} />
      <h1 className="my-3 lightPlaylistTitle" id='playlistTitle'> {obj.name} VLBE</h1>
        </div>
      <h1 className='playlistquote my-3' style={props.textCol}>{obj.quote}</h1>
      <button className='mb-3 play' ><i className="bi bi-play-fill icon"></i></button>
      </div>
      <div className="container">

      <table className={`table table-borderless table-${props.mode}`}>
      <thead style={props.textCol}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Artist</th>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody className="table-group-divider" style={props.textCol}>

    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td >Larry the Bird</td>
      <td></td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
      </div>

      </div>
    </div>
  )
}
