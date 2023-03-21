import React from 'react'
import '../CSS/cards.css'

function Cards() {
  return (
    <>
<div class="card myCard" style={{"width": "10rem"}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5>Create a new <span className='vibe'>Vibe</span></h5>
              {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal</button> */}
            </div>
            </div>
    </>
  )
}

export default Cards
