import React, { useContext,useEffect } from 'react'
import ModeContext from '../context/ContextFiles/ModeContext'
import NavbarContext from '../context/ContextFiles/NavbarContext'
import Navbar from './Navbar'
import QueueList from './QueueList'
import SearchItem from './SearchItem'
import '../CSS/SearchItem.css'


const Search = () => {
    const props = useContext(ModeContext)
    const navbar = useContext(NavbarContext)
    useEffect(props.toggleMode,[props.mode])
    // console.log(navbar.results)
  return (
    <>
    <Navbar/>
    <QueueList/>
    <section class="Carousel">

    <div class="carousel__container">

     {navbar.results? navbar.results.map((el,index)=> {
        return <SearchItem key={index} artist ={el.artistName} imgUrl = {el.artworkUrl100} trackname = {el.trackName} audioUrl={el.previewUrl}/>
    }):""}
    </div>
    </section>
    </>
  )
}

export default Search
