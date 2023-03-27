import React, { useState, useEffect, useContext } from 'react'
import CardsContext from '../context/ContextFiles/CardsContext'
import NavbarContext from '../context/ContextFiles/NavbarContext';
import AlertContext from '../context/ContextFiles/AlertContext';
import '../CSS/ModalAddingSongs.css'


function ModalAddingSongs() {
    const cardsProps = useContext(CardsContext);
    const navbarProps = useContext(NavbarContext)
    const alertProp = useContext(AlertContext)
    const addSongToUserPlaylist = async(playlistId) =>{
      console.log(playlistId)
        const {artist,imgUrl,trackname,audioUrl,date} = navbarProps.songObj
        console.log(navbarProps.songObj)
        const addSongObj = {
            playlist:playlistId,
            name:trackname,
            url:audioUrl,
            artist:artist,
            img:imgUrl,
            date:date
        } 

        const response = await fetch(`http://localhost:5000/api/user/addusersong`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addSongObj), // body data type must match "Content-Type" header
          });
          const data = await response.json ()
          if(data.success===false) {
            alertProp.showAlert(data.error,'danger')
          }
          else {
            
            // modal.classList.remove('show')
            alertProp.showAlert('Song successfully added','success')
            
            
          }
    }




  return (
    <>
    
      <div>
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Your Playlists</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {
                    cardsProps.userPlaylist.map((el)=>{
                        return <div className ="playlistModalMainDiv" key = {el._id} onClick = {()=>addSongToUserPlaylist(el._id)} > 
                        <img className='imgModal' src={el.img} alt="" />
                        <p>{el.name}</p>

                        </div>
                    })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalAddingSongs
