import React, {useEffect, useState} from 'react'
import ModalContext from '../ContextFiles/ModalContext'

const ModalState = (props)=> {
    const [modalType,setModalType] = useState('')
    const [userPlaylistId,setUserPlaylistId] = useState('')
    const [userPlaylistQuote,setUserPlaylistQuote] = useState('')
    const [userPlaylistImg,setUserPlaylistImg] = useState('')
    const [userPlaylistName,setUserPlaylistName] = useState('')
    const [userPlaylistOldName,setUserPlaylistOldName] = useState('')
    useEffect(()=> {
        if(modalType!=='') {
            console.log('opening modal')
            const modal = document.getElementById('exampleModal')
            const bootstrapModal = new window.bootstrap.Modal(modal);
    bootstrapModal.show();
        }
    },[modalType])
    return (
        <ModalContext.Provider value={{modalType,setModalType,userPlaylistId,setUserPlaylistId,userPlaylistQuote,setUserPlaylistQuote,userPlaylistImg,setUserPlaylistImg,userPlaylistName,setUserPlaylistName,userPlaylistOldName,setUserPlaylistOldName}}>
           
            {props.children}
        </ModalContext.Provider>
    )
}
export default ModalState