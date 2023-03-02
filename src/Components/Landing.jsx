
import React,{useContext, useEffect} from 'react'
import dolphin from '../Images/dolphin.gif'
import '../CSS/Landing.css';
import { Link } from 'react-router-dom';
import ModeContext from '../context/ContextFiles/ModeContext'
export default function Landing() {
  const headAniAdd = function headAniAdd() {
    var headphone = document.getElementById('headphone')
    headphone.classList.add('headphoneAnimation')
  }
  const headAniRem = function headAniRem() {
    var headphone = document.getElementById('headphone')
    headphone.classList.remove('headphoneAnimation')
  }

  const props = useContext(ModeContext)
    useEffect(props.toggleMode,[props.mode])
      
      return (
        <>
      
      <div className="logo" style={{backgroundImage:props.mode==="dark"?'radial-gradient(circle farthest-corner at 10% 20%, rgba(255,255,255) 0%, rgba(255 255 255) 90%)':"radial-gradient(circle farthest-corner at 10% 20%, rgba(14, 174, 87, 1) 0%, rgba(12, 116, 117, 1) 90%)"}}>
        <Link to = "/login">
        <h1 className="title" onMouseOver={headAniAdd} onMouseOut={headAniRem} style={{backgroundImage:props.mode==="light"?'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)':"linear-gradient(45deg, rgb(58,0,65) 0%, rgb(58,0,65) 100%)"}}>VLBE</h1>
        <i className="bi bi-headphones headphone" id="headphone" onMouseOver={headAniAdd} onMouseOut={headAniRem} style={{backgroundImage:props.mode==="light"?'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)':"linear-gradient(45deg, rgb(58,0,65) 0%, rgb(58,0,65) 100%)"}}></i>
    </Link>
    </div>
    <div className="wave" >
        
    </div>
    <div className="dolphin">

        <img src={dolphin} alt=""/>
    </div>
  
      
    </>
  )
}
