import React, { useContext, useEffect, useState } from 'react'
import '../CSS/carousel.css'
import { Link } from 'react-router-dom';

function Carousel() {
  let [carousel, setCarousel] = useState([])

  async function getDefaultPlaylist() {

    const response = await fetch('http://localhost:5000/api/def/getDefaultPlaylist');
    const json = await response.json()
    setCarousel((carousel) = json.defaultPlaylists)
    // console.log(carousel)
  }
  useEffect(() => {
    // console.log("inside useEffect")
    getDefaultPlaylist()
  }, [])

  
  const selectCarousel = () => {
    const parent = document.getElementsByClassName('carousel-item active');
    //  console.log(name)
    for (let item of parent) {
      // console.log(item.lastChild)
      let innerchild = item.lastChild
      var Name = innerchild.firstChild.innerText
      var quote = innerchild.lastChild.innerText
      var img = item.firstChild.getAttribute('src')
      var inp = item.getElementsByTagName('input')[0].getAttribute('value')
      // console.log(inp)
      // console.log(item_id)
      // console.log(img)

      
      window.localStorage.setItem('playlistdata', JSON.stringify({ name: Name, quote, img, _id: inp }))
      // console.log(JSON.parse(window.localStorage.getItem('name')))

    }

  }


  return (
    <>
      {/* {console.log(carousel)} */}
      <div className="carouselcontainer" >


        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <Link to={'/playlist'}>
            <div className="carousel-inner" onClick={selectCarousel} >
              {carousel.map((el) => {
                // {console.log(el)}
                return <div className={`carousel-item ${el.name == "Happy" ? 'active' : ""}`} data-bs-interval="2000" key={el._id} >
                  <img src={el.img} className="d-block w-100" alt="..." />
                  <input type="hidden" name="" id="" value={el._id} />
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
