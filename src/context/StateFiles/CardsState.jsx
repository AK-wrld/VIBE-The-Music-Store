import React, {useContext, useState} from 'react'
import AlertContext from '../ContextFiles/AlertContext'
import CardsContext from '../ContextFiles/CardsContext'
import ProfileContext from '../ContextFiles/ProfileContext'

const CardsState = (props)=> {
   //make global props and global states here 
   const [userPlaylist, setUserPlaylist] = useState([])
   const profileProps = useContext(ProfileContext)
   const alertProp = useContext(AlertContext)
   const getUserPlaylist = async () => {
    const _id = profileProps.User._id
    console.log(_id)
    if(_id) {

      const response = await fetch(`http://localhost:5000/api/user/getUserPlaylist/${profileProps.User._id}`)
  
      const data = await response.json()
      // console.log(data)
      if (data.success) {
        setUserPlaylist(data.userPlaylists)
      }
    }
  }
   const deleteUserPlaylist = async (_id) => {
    
    const response = await fetch(`http://localhost:5000/api/user/deleteUserPlaylist/${_id}`)

    const data = await response.json()
    // console.log(data)
    if (data.success) {
      alertProp.showAlert(data.message,'success')
      const newarr = userPlaylist.filter((el)=> {
        if(el._id!==_id) {
          return true
        }
      })
      setUserPlaylist(newarr)
    }
    else {
     alertProp.showAlert(data.message,'danger')
    }
  }
    return (
        <CardsContext.Provider value={{userPlaylist,setUserPlaylist,getUserPlaylist,deleteUserPlaylist}}>
           
            {props.children}
        </CardsContext.Provider>
    )
    }
export default CardsState 