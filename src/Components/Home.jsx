import React from 'react'
import '../home.css'

// import PropTypes from 'prop-types'
import Navbar from './Navbar'
import QueueList from './QueueList'
import Carousel from './Carousel'
import Cards from './Cards'
import LoadingBar from 'react-top-loading-bar'
import { useState,useContext,useEffect } from 'react'
import '../CSS/home.css'
import ModeContext from '../context/ContextFiles/ModeContext'
import LoginContext from '../context/ContextFiles/LoginContext'
import QueueContext from '../context/ContextFiles/QueueContext'
import BottomPlayer from './BottomPlayer'
import ProfileList from './ProfileList'
import Modal from './Modal'
import { useSelector } from 'react-redux'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  const q = useContext(QueueContext)
  const loginProp = useContext(LoginContext)
  const props = useContext(ModeContext)
  const isEmpty = useSelector((state) => state.isEmpty)
    useEffect(props.toggleMode,[props.mode])
  const [progress, setProgress] = useState(100)
  
  const changeProgress = (progress)=> {
    setProgress( {
      progress:progress
    })
  }
 const token = window.localStorage.getItem('token')
 if(!token) {
  navigate('/login')
 }
 
 
  return (
    <>
    {/* {console.log(props.mode)} */}
    <Navbar   />
    <Alert/>
    <LoadingBar
        color='#f11946'
        
        height={3}
        waitingTime={1000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      changeProgress={progress}/>
      <div className="container my-3" >

     <QueueList  />
     <ProfileList/>
     <Modal/>
     
     <h1 style={props.textCol} className='homeTitle' >Create your own <span className='vibe'>VLBE</span>  </h1>
     <Cards/>
     <h3 style={props.textCol} className='homeTitle' >Haven't created a <span className='vibe'>VLBE</span>  yet? Dont worry we got you covered</h3>
     <h1 style={props.textCol} className='homeTitle' id='defVibeTitle'> <span className='vibe'>VLBE</span>  we created for You</h1>
     <Carousel />
     
      </div>
      {!isEmpty?<BottomPlayer/>:''}
    
    </>
    
  )
}
