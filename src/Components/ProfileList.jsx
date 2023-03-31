import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ModeContext from '../context/ContextFiles/ModeContext'
import ProfileContext from '../context/ContextFiles/ProfileContext'
import '../CSS/profile.css'
import btn from '../Images/leftarrow.png'
export default function ProfileList() {
  const navigate = useNavigate()
  const profileProps = useContext(ProfileContext)
  const props = useContext(ModeContext)
  const changeProfileBg = () => {
    const ProfileList = document.getElementById("ProfileList")
    // console.log(queueList)
    if (props.mode === 'dark') {
      ProfileList.style.backgroundColor = "black";
      ProfileList.style.color = "white"
    }
    else {
      ProfileList.style.backgroundColor = "beige";
      ProfileList.style.color = "black"
    }

  }
  useEffect(changeProfileBg, [props.mode])


  const flipBtn = () => {
    if (profileProps.Profile === "hidden") {

      profileProps.switchBtn({
        transform: "translateX(-345px) scaleX(-1)",

        transition: 'transform 1s'
      })
      profileProps.changeProfileShift({
        transform: 'translateX(0%)'
      })
    }
    else {

      profileProps.switchBtn({
        transform: 'translateX(0px) scaleX(1)',

        transition: 'transform 1s'
      })
      profileProps.changeProfileShift({
        transform: 'translateX(100%)'
      })
    }
  }
  useEffect(flipBtn, [profileProps.Profile])
  const logout = ()=> {
    window.localStorage.clear()
    navigate('/login')
  }

  return (
    profileProps.User && <>
      {/* {console.log(User.user.username)} */}
      {/* {console.log(User.username)} */}
      <div className="ProfileList" id='ProfileList' style={profileProps.Profileshift}>
        <h2 className='py-3'>Your Profile</h2>

        <div className="Profileimg">
          <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png" alt="" style={{ width: '150px', height: '150px' }} />
        </div>

        <h4 className='Nameheading'>Username: {profileProps.User.username}</h4>
        <h6 className='emailHeading'>Email: {profileProps.User.email}</h6>

        <li className="yourplaylists">Your Playlists</li>
        <li className="likedsongs">Your Liked Songs</li>



        <div className="navigation">
          <button className="buttonLogout" id="profileLogout" onClick={logout}>

            <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png" />


            <div className="logout">LOGOUT</div>
          </button>
        </div>
      </div>



      <button className="Profilebtn" style={profileProps.btnStyle} onClick={() => { profileProps.Profile === 'hidden' ? profileProps.showProfile('show') : profileProps.showProfile('hidden') }}>
        {/* {console.log(props.Profile)} */}
        <img src={btn} alt="" />
      </button>

    </>
  )
}
