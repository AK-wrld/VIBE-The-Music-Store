import React, {useState} from 'react'
import ModalContext from '../ContextFiles/ModalContext'

const ModalState = (props)=> {
    const [modalType,setModalType] = useState('')
    const [userPlaylistId,setUserPlaylistId] = useState('')
    const [userPlaylistQuote,setUserPlaylistQuote] = useState('')
    const [userPlaylistImg,setUserPlaylistImg] = useState('')
    const [userPlaylistName,setUserPlaylistName] = useState('')
    const [userPlaylistOldName,setUserPlaylistOldName] = useState('')
    return (
        <ModalContext.Provider value={{modalType,setModalType,userPlaylistId,setUserPlaylistId,userPlaylistQuote,setUserPlaylistQuote,userPlaylistImg,setUserPlaylistImg,userPlaylistName,setUserPlaylistName,userPlaylistOldName,setUserPlaylistOldName}}>
           
            {props.children}
        </ModalContext.Provider>
    )
}
export default ModalState