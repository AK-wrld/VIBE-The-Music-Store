import React from 'react'
import '../CSS/cards.css'

function Cards() {
  return (
    <>
<div class="card myCard" style={{"width": "10rem"}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5>Top 50 India</h5>
              <p class="card-text">Your daily update on the most played tracks.</p>
            </div>
            </div>
    </>
  )
}

export default Cards
