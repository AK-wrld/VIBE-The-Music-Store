import React from 'react'
import '../CSS/Navbar.css'
import { Link } from 'react-router-dom';
import rightarrow from '../Images/rightarrow.png'
import leftarrow from '../Images/leftarrow.png'

// import PropTypes from 'prop-types'
// import  { useState } from 'react'
export default function Navbar(props) {

  return (
    <>
  {console.log(window.history.length)}
    {/* {console.log(props.mode)} */}
      <nav style={{backgroundColor: props.mode==="dark"?" #000000":" #FA8BFF",backgroundImage:props.mode==="dark"?'linear-gradient(45deg, #000000 0%, #ba2593 94%)':'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)'}}
       className={`navbar navbar-expand-lg navbar-${props.mode==="dark"?"dark":"light" }`}>
  <div className="container-fluid">
    <div className="container titlecont">
    <Link className="navbar-brand navtitle" to="/home">VLBE</Link>
    <i className="bi bi-headphones navheadphone" id="headphone" ></i>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={()=>{props.queue==='hidden'?props.showQueue('show'):props.showQueue('hidden')}}>Queue List</Link>
        </li>
        
        <li className="nav-item">
          <a className="nav-link">My Profile</a>
        </li>
        <li className="nav-item">

        <div className="container rightarrow" style={{height:"100%"}} onClick={()=>{window.history.back()}}>
          <Link className={`nav-link navbar-brand`} ><img src={leftarrow} alt="" className='rightarrowimg' style={{filter: props.mode==="dark"?"invert(1)":"invert(0)"}}/></Link>
        </div>
        </li>
        <li className="nav-item">

        <div className="container rightarrow"style={{height:"100%"}} onClick={()=>{window.history.forward()}} >
          <Link className={`nav-link navbar-brand`} id="rightarrow" ><img src={rightarrow} alt="" className='rightarrowimg' style={{filter: props.mode==="dark"?"invert(1)":"invert(0)"}}/></Link>
        </div>
        </li>

      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success searchbtn" type="submit">Search</button>
      </form>
      
    </div>
  </div>
</nav>
    </>
  )
}
