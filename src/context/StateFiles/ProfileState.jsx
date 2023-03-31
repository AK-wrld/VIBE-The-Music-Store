import React, { useEffect, useState,useRef} from 'react'
import ProfileContext from '../ContextFiles/ProfileContext'

const ProfileState = (props)=> {
   const [Profile, showProfile] = useState("show")
   const [checkUser,isSet] = useState(false)
   const [User, setUser] = useState({})
   const [btnStyle, switchBtn] = useState({
    
    transform : 'translateX(0px) ',
        
        transition :'transform 1s'
  })
  
  const [Profileshift,changeProfileShift] = useState({
    transform:'translateX(100%)'
  })

  useEffect(() => {
    const getLoggedinUserData = async () => {
      // console.log(authToken)
      const authToken = window.localStorage.getItem('token')
      if (!authToken) {
        return window.location = ('/login')
      }
      if (authToken) {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken

          },

        });
        let userData = await response.json();
        if (userData.success) {
          // console.log(userData)
          isSet(true)
          setUser(userData.user)

        }
        else {
          console.log(userData.error)
        }
      }


    }
    if(window.location.pathname!=='/' && window.location.pathname!=='/login' &&window.location.pathname!=='/signup' && checkUser===false) {
      console.log('running')
      getLoggedinUserData()
    }

  }, [checkUser])


    return (
        <ProfileContext.Provider value={{Profile,showProfile,btnStyle,switchBtn,Profileshift,changeProfileShift,User,setUser}}>
           
            {props.children}
        </ProfileContext.Provider>
    )
    }
export default ProfileState 