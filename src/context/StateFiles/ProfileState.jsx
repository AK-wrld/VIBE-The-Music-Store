import React, { useEffect, useState,useRef} from 'react'
import ProfileContext from '../ContextFiles/ProfileContext'

const ProfileState = (props)=> {
   const [Profile, showProfile] = useState("show")
   const [btnStyle, switchBtn] = useState({
    
    transform : 'translateX(0px) ',
        
        transition :'transform 1s'
  })
  
  const [Profileshift,changeProfileShift] = useState({
    transform:'translateX(100%)'
  })
    return (
        <ProfileContext.Provider value={{Profile,showProfile,btnStyle,switchBtn,Profileshift,changeProfileShift}}>
           
            {props.children}
        </ProfileContext.Provider>
    )
    }
export default ProfileState 