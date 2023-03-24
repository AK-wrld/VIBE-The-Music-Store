import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardsContext from '../context/ContextFiles/CardsContext'
import ProfileContext from '../context/ContextFiles/ProfileContext'
import '../CSS/cards.css'

function Cards() {
  const profileProps = useContext(ProfileContext)
  const cardsProps = useContext(CardsContext)
  
  useEffect(() => {
    
    cardsProps.getUserPlaylist()
  }, [profileProps.User])
  const setUserPlaylistDetails =(name,quote,img,_id)=> {
    window.localStorage.setItem('userPlaylist', JSON.stringify({ name: name,quote:quote,img:img,_id:_id }))
  }

  return (
    cardsProps.userPlaylist && <>
    <div id="cardContainer">
    <div class="card myCard" style={{ "width": "10rem" }} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5>Create a new <span className='vibe'>Vibe</span></h5>
          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}
        </div>
      </div>
     
      {
        
        cardsProps.userPlaylist.map((el)=> {
          return <Link class="card myCard" style={{ "width": "10rem" }} key = {el._id} onClick={()=>setUserPlaylistDetails(el.name,el.quote,el.img,el._id)} to='/userplaylist'>
          <img class="card-img-top" src={el.img} alt="..." />
          <div class="card-body">
            <h5>{el.name}</h5>
            <h6>{el.quote}</h6>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}
          </div>
        </Link>
        })
      }
      
    </div>
      
      

    </>
  )
}

export default Cards
