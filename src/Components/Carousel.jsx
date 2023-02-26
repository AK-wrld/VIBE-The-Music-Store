import React,{useContext} from 'react'
import '../CSS/carousel.css'
import { Link } from 'react-router-dom';

import Happy from '../Images/Happy.jpg'
import Sad from '../Images/Sad.jpg'
import Romantic from '../Images/Romantic.jpg'
import PlaylistContext from '../context/ContextFiles/PlaylistContext';
function Carousel() {
  const playlist = useContext(PlaylistContext)
  const selectCarousel = ()=> {
     const parent = document.getElementsByClassName('carousel-item active');
    //  console.log(name)
     for(let item of parent) {
      // console.log(item.lastChild)
      let innerchild = item.lastChild
      var Name = innerchild.firstChild.innerText
      var quote = innerchild.lastChild.innerText
     
      
      playlist.changePlaylist(Name)
      window.localStorage.setItem('playlistdata',JSON.stringify({name:Name,quote:quote,img:Name}))
      // console.log(JSON.parse(window.localStorage.getItem('name')))
      
    }
   
  }
  let carousel = [{name:"Happy",quote:"Happiness is discovering a great new song.",img:Happy,indx:1},
                  {name:"Sad",quote:"Feeling sad? Dont worry this too shall pass.",img:Sad,indx:2},
                  {name:"Romantic",quote:"Where words fail music speaks.",img:Romantic,indx:3},
                                    
                  ]
  
  return (
    <>
      <div className="carouselcontainer" >


<div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
    <Link to={'/playlist'}>
    <div className="carousel-inner" onClick={selectCarousel} >
      {carousel.map((el)=> {
        // {console.log(el)}
        return <div className={`carousel-item ${el.indx==1?'active':""}`} data-bs-interval="2000" key={el.indx} >
        <img src={el.img} className="d-block w-100" alt="..."/>
        <div className="carousel-caption d-none d-md-block">
            <h5 className="titleQuote title1" >{el.name}</h5>
            <p className="quote">{el.quote}</p>
          </div>
      </div>
      })}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
    </Link>
  </div>
</div>
    </>
  )
}

export default Carousel
