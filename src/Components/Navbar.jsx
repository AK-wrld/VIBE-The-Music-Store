import {React,useContext, useEffect} from 'react'
import '../CSS/Navbar.css'
import { Link ,useLocation, useNavigate, } from 'react-router-dom';
import rightarrow from '../Images/rightarrow.png'
import leftarrow from '../Images/leftarrow.png'
import ModeContext from '../context/ContextFiles/ModeContext';
import QueueContext from '../context/ContextFiles/QueueContext';
import NavbarContext from '../context/ContextFiles/NavbarContext';
import ProfileContext from '../context/ContextFiles/ProfileContext'


// import PropTypes from 'prop-types'
// import  { useState } from 'react'
export default function Navbar() {
  const navbar = useContext(NavbarContext)
const props = useContext(ModeContext)
const location = useLocation()
const navigate = useNavigate()
const q = useContext(QueueContext)
const profileProps = useContext(ProfileContext)
const checkSearch = ()=> {
  if(location.pathname!=='/search') {
    navigate("/search");
  }
  
}
const handleNavInpChange = (ev)=> {
  navbar.setNavInp(ev.target.value)
  // console.log(navbar.navInp)
}
useEffect(()=>{
  
    navbar.filter()
  
  },[navbar.navInp])
  return (
    <>
 
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
          <Link className={`nav-link ${location.pathname==='/home'?'active':''}`} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={()=>{q.queue==='hidden'?q.showQueue('show'):q.showQueue('hidden')}}>Queue List</Link>
        </li>
        
        <li className="nav-item">
        <Link className="nav-link" onClick={()=>{profileProps.Profile==='hidden'?profileProps.showProfile('show'):profileProps.showProfile('hidden')}}>My Profile</Link>
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

        <input className="form-control me-2" type="search" placeholder="Search" value={navbar.navInp} aria-label="Search" id='navbarInp' onClick={checkSearch} onChange={handleNavInpChange}/>
        <button className="btn btn-outline-success searchbtn" onClick={(ev)=>ev.preventDefault() && navbar.filter()} >Search</button>
      </form>
    
      
    </div>
  </div>
</nav>
    </>
  )
}
