import React from 'react'
import Navbar from './Navbar'
import ProfileList from './ProfileList'
import QueueList from './QueueList'

const UserPlaylist = () => {
   
  return (
    <div>
        <Navbar/>
        <QueueList/>
        <ProfileList/>
        {/* {props.name} */}
    <h1>User Playlist</h1>
    </div>
  )
}

export default UserPlaylist
