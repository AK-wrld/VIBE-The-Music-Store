import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {easeIn, easeOut, motion } from "framer-motion"
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
    <motion.div id="cardContainer" className="container"
  
    initial="hidden"
    animate="visible">
    <div className="card myCard" style={{ "width": "10rem" }} onClick={setModalAsNew}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5>Create a new <span className='vibe'>Vibe</span></h5>
         
        </div>
      </div>
     
      {
        
        cardsProps.userPlaylist.map((el,index)=> {
          return <motion.div className="card myCard" style={{ "width": "10rem" }} key = {el._id} onClick={()=>setUserPlaylistDetails(el.name,el.quote,el.img,el._id)} initial = {{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:index*0.1 ,ease:easeIn}} >
            <Link to='/userplaylist'>
          <img className="card-img-top" src={el.img} alt="..."  />
          <div className="card-body">
            <h5 style={{fontFamily:'Delicious Handrawn'}}>{el.name}</h5>
            {/* <h6>{el.quote?el.quote.slice(0,15):''}...</h6> */}
          </div>
            </Link>
            <div className="userPlaylistBtns">

          <button type="button" className="btn btn-danger deleteUserPlaylist" onClick={()=>cardsProps.deleteUserPlaylist(el._id)}><i className="bi bi-x"></i></button>
          <button type="button" className="btn btn-info updateUserPlaylist"><i className="bi bi-pencil-square" onClick={()=>setModalAsUpdate(el._id,el.name,el.quote,el.img)}></i></button>
            </div>
        </motion.div>
        })
      }
      
    </motion.div>
      
      

    </>
  )
}

export default Cards
