import React, { useContext, useEffect, useState } from 'react'
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import '../CSS/Modal.css'
import ProfileContext from '../context/ContextFiles/ProfileContext';
import AlertContext from '../context/ContextFiles/AlertContext';
import CardsContext from '../context/ContextFiles/CardsContext';
import ModalContext from '../context/ContextFiles/ModalContext';
const uploader = Uploader({ apiKey: "public_12a1y4W92rvGsWT6PTzPXWBNPkQP" })
function Model() {
  const [imgUrl,setFileUrl] = useState('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fcb2c7102027459.5f2cc34b5cebc.png')
  const [name,setName] = useState('')
  const [quote,setQuote] = useState('')
  const profileProps = useContext(ProfileContext)
  const alertProp = useContext(AlertContext)
  const cardsProps = useContext(CardsContext)
  const modalProps = useContext(ModalContext)
  
//   useEffect(()=> {
// console.log(quote)
//   },[quote])
const changeName =(event)=> {
  if(modalProps.modalType==='New Vibe') {

    setName(event.target.value)
  }
  else {
    modalProps.setUserPlaylistName(event.target.value)
  }
  
}
const changeQuote =(event)=> {
  if(modalProps.modalType==='New Vibe') {
  setQuote(event.target.value)
  }
  else {
    modalProps.setUserPlaylistQuote(event.target.value)
  }
  
}
const removeData = ()=> {
  // console.log('removing data')
  console.log(name)
  setName('')
  setQuote('')
  setFileUrl('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fcb2c7102027459.5f2cc34b5cebc.png')
  modalProps.setModalType('')
  cardsProps.getUserPlaylist()
}

const addNewPlaylist = async(ev)=> {
ev.preventDefault()
console.log(name)
const playlistNameError = document.getElementsByClassName('playlistNameError')[0]
  if(name.length===0) {
    // console.log('nahi jaega')
    
    playlistNameError.innerText = 'Name is required'
  }
  else {
    playlistNameError.innerText = ''
    const playlistObj = {
      user : profileProps.User._id,
      name: name,
      quote: quote,
      img: imgUrl
    }
    const response = await fetch('http://localhost:5000/api/user/addUserPlaylist', {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(playlistObj), // body data type must match "Content-Type" header
    });
    const data = await response.json()
    if(data.success===false) {
      alertProp.showAlert(data.error,'danger')
    }
    else {
      
      // modal.classList.remove('show')
      alertProp.showAlert('New Vibe successfully created','success')
      
      
    }
  }
}
const updateNewPlaylist = async(ev)=> {
ev.preventDefault()
    let playlistObj={}
    if(modalProps.userPlaylistName===modalProps.userPlaylistOldName) {
      playlistObj = {
        _id:modalProps.userPlaylistId,
        name:modalProps.userPlaylistName,
        quote: modalProps.userPlaylistQuote,
        img: modalProps.userPlaylistImg,
        changeName: false
      }
    }
    else {

      playlistObj = {
       _id:modalProps.userPlaylistId,
       name: modalProps.userPlaylistName,
       quote: modalProps.userPlaylistQuote,
       img: modalProps.userPlaylistImg,
       changeName: true
     }
    }
   
    console.log(playlistObj)
    const response = await fetch('http://localhost:5000/api/user/updateUserPlaylist', {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(playlistObj), // body data type must match "Content-Type" header
    });
    const data = await response.json()
    if(data.success===false) {
      alertProp.showAlert(data.error,'danger')
    }
    else {
      
      // modal.classList.remove('show')
      alertProp.showAlert('Vibe successfully updated','success')
      
      
    }
  
}

  return (
    modalProps.modalType && <div>
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        {/* <h1 className="modal-title fs-5" id="exampleModalLabel">New  <span className='vibe'>Vibe</span> </h1> */}
        <h1 className="modal-title fs-5" id="exampleModalLabel">{modalProps.modalType}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={removeData}></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Enter Name Of The <span className='vibe'>Vibe</span></label>
            <input required type="text" onChange={changeName} className="form-control" id="recipient-name"/>
            <p  className='playlistNameError error'></p>
          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label" >Enter Quote (if any) </label>
            <textarea className="form-control" id="message-text" onChange={changeQuote}></textarea>
          </div>
        </form>
        <UploadButton uploader={uploader}
                options={{ multi: false }}
                onComplete={files => {
                  if(modalProps.modalType==='New Vibe'){
                    setFileUrl(files[0].fileUrl)
                  }
                  else {
                    modalProps.setUserPlaylistImg(files[0].fileUrl)
                  }}}>
    {({onClick}) =>
      <button onClick={onClick} className="btn btn-info">
       Upload Image
      </button>
    }
  </UploadButton>
      </div>
      <div className="modal-footer">
        
        <button type="button" className="btn btn-primary" onClick={modalProps.modalType==='New Vibe'? addNewPlaylist:updateNewPlaylist}>Save</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Model
