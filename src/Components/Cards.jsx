import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardsContext from '../context/ContextFiles/CardsContext'
import ModalContext from '../context/ContextFiles/ModalContext'
import ProfileContext from '../context/ContextFiles/ProfileContext'
import '../CSS/cards.css'

function Cards() {
  const profileProps = useContext(ProfileContext)
  const cardsProps = useContext(CardsContext)
  const modalContext = useContext(ModalContext)
 
  useEffect(() => {
    
    cardsProps.getUserPlaylist()
  }, [profileProps.User])
  const setUserPlaylistDetails =(name,quote,img,_id)=> {
    window.localStorage.setItem('userPlaylist', JSON.stringify({ name: name,quote:quote,img:img,_id:_id }))
  }
  const setModalAsNew = ()=> {
    modalContext.setModalType('New Vibe')    
    
  }
  const setModalAsUpdate = (id,name,quote,img)=> {
    modalContext.setModalType('Update Vibe')    
    modalContext.setUserPlaylistId(id)    
    modalContext.setUserPlaylistName(name)    
    modalContext.setUserPlaylistQuote(quote)    
    modalContext.setUserPlaylistImg(img)    
    modalContext.setUserPlaylistOldName(name)    
    
  }
  return (
    cardsProps.userPlaylist && <>
    <div id="cardContainer">
    <div class="card myCard" style={{ "width": "10rem" }} onClick={setModalAsNew}  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5>Create a new <span className='vibe'>Vibe</span></h5>
          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}
        </div>
      </div>
     
      {
        
        cardsProps.userPlaylist.map((el)=> {
          return <div class="card myCard" style={{ "width": "10rem" }} key = {el._id} onClick={()=>setUserPlaylistDetails(el.name,el.quote,el.img,el._id)} >
            <Link to='/userplaylist'>
          <img class="card-img-top" src={el.img} alt="..."  />
          <div class="card-body">
            <h5>{el.name}</h5>
            <h6>{el.quote?el.quote.slice(0,15):''}...</h6>
          </div>
            </Link>
            <div className="userPlaylistBtns">

          <button type="button" class="btn btn-danger deleteUserPlaylist" onClick={()=>cardsProps.deleteUserPlaylist(el._id)}><i class="bi bi-x"></i></button>
          <button type="button" class="btn btn-info updateUserPlaylist" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap"><i class="bi bi-pencil-square" onClick={()=>setModalAsUpdate(el._id,el.name,el.quote,el.img)}></i></button>
            </div>
        </div>
        })
      }
      
    </div>
      
      

    </>
  )
}

export default Cards
