import React, { useContext,useEffect } from 'react'
import ModeContext from '../context/ContextFiles/ModeContext'
import NavbarContext from '../context/ContextFiles/NavbarContext'
import Navbar from './Navbar'
import QueueList from './QueueList'
import SearchItem from './SearchItem'
import Alert from './Alert'
import '../CSS/SearchItem.css'
import BottomPlayer from './BottomPlayer'
import { useSelector } from 'react-redux'
import ProfileList from './ProfileList'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const token = window.localStorage.getItem('token')
  if(!token) {
   navigate('/login')
  }
    const props = useContext(ModeContext)
    const navbar = useContext(NavbarContext)
    const isEmpty = useSelector((state) => state.isEmpty)
    useEffect(props.toggleMode,[props.mode])
    // console.log(navbar.results)
  return (
    <>
    <Navbar/>
    <Alert/>
    <QueueList/>
    <ProfileList/>

    <div className="carousel__container" >

     {navbar.results? navbar.results.map((el,index)=> {
        return <SearchItem key={index} artist ={el.artistName} imgUrl = {el.artworkUrl100} trackname = {el.trackName} audioUrl={el.previewUrl} date = {el.releaseDate}/>
    }):""}
    </div>
    {!isEmpty?<BottomPlayer/>:''}
    </>
  )
}

export default Search
