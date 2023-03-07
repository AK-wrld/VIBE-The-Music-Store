import React from 'react'
import '../CSS/SearchItem.css'
const SearchItem = (props) => {
    const makeSongObj = (props)=> {
        const {trackname,audioUrl} = props
        // console.log(trackname)
        const song = {
            name:trackname,
            url:audioUrl

        }
        // console.log(song)
        
    }
  return (
    <>
   <div class="carouselItem">
          <img
            class="carousel-item__img"
            src={props.imgUrl}
            alt="people"
          />
          <div class="carousel-item__details">
            <div class="controls">
              <span class="fas fa-play-circle"></span>
              <span class="fas fa-plus-circle" onClick={()=> {makeSongObj(props)}}></span>
            </div>
            <h5 class="carousel-item__details--title">{props.trackname}</h5>
            <h6 class="carousel-item__details--subtitle">{props.artist}</h6>
          </div>
        </div>

    </>
  )
}

export default SearchItem
