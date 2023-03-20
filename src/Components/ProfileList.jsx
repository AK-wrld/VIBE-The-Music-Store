import React, { useContext, useEffect,useState } from 'react'
import ProfileContext from '../context/ContextFiles/ProfileContext'
import '../CSS/profile.css'
import btn from '../Images/leftarrow.png'
export default function ProfileList() {
  const profileProps = useContext(ProfileContext)
  // const getLoggedinUserData = async () => {
  //   // console.log(authToken)
  //   const authToken = window.localStorage.getItem('token')
  //   if (authToken) {
  //     const response = await fetch('http://localhost:5000/api/auth/getuser', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": authToken
  
  //       },
  
  //     });
  //     let userData = await response.json();
  //     if(userData.success) {
  
  //       console.log(userData)
  
  //     }
  //     else {
  //       console.log(userData.error)
  //     }
  //   }
  
  // }
  
  // useEffect(getLoggedinUserData,[])

  const flipBtn = ()=> {
    if(profileProps.Profile ==="hidden") {
      
      profileProps.switchBtn({
        transform : "translateX(-345px) scaleX(-1)",
    
    transition :'transform 1s'
      })
      profileProps.changeProfileShift({
        transform:'translateX(0%)'
      })
    }
    else {
      
      profileProps.switchBtn({
        transform : 'translateX(0px) scaleX(1)',
      
        transition :'transform 1s'
      })
      profileProps.changeProfileShift({
        transform:'translateX(100%)'
      })
    }
  }
  useEffect(flipBtn,[profileProps.Profile])

 
  return (
    <>
      

      <div className="ProfileList" id='ProfileList'style= {profileProps.Profileshift}>
  <h2 className='py-3'>Your Profile</h2>
  
  <div className="Profileimg">
    <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png" alt="" style={{ width: '150px', height: '150px' }} />
  </div>
  
  <h4 className='Nameheading'>Name</h4>

        <li className="yourplaylists">Your Playlists</li>
        <li className="likedsongs">Your Liked Songs</li>


  
  <div class="navigation">
    <a class="buttonLogout" id = "profileLogout" href="">
      <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png" />

      <div class="logout">LOGOUT</div>
    </a>
  </div>
</div>
      


      <button className="Profilebtn" style = {profileProps.btnStyle} onClick={()=>{profileProps.Profile==='hidden'?profileProps.showProfile('show'):profileProps.showProfile('hidden')}}>
        {/* {console.log(props.Profile)} */}
      <img src={btn} alt="" />
      </button>
      
    </>
  )
}
