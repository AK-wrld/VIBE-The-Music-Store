import React, {useState} from 'react'
import modeContext from '../ContextFiles/ModeContext'

const modeState = (props)=> {
   //make global props and global states here 
   const [mode, setmode] = useState("dark")
   const [textCol,changetextCol] = useState({
    color : "black"
  })
  const displayTime = () => {
    let time = new Date();
    // console.log(time);
    let hours = time.getHours()
    // console.log(hours)
    return hours

  }

  const toggleMode = () => {
    let hours = displayTime();
    if (hours >= 6 && hours <= 9) {
      document.body.style.backgroundColor = "rgb(250, 139, 255)"
      document.body.style.backgroundImage = "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
      document.body.style.transition = "background-color 0.5s"
      setmode("light")
      changetextCol({
        color : "black"
      })
    }
    else {
      setmode("dark")
      changetextCol({
        color : "white"
      })
      document.body.style.backgroundColor = "rgb(0, 0, 0)"
      document.body.style.backgroundImage = "linear-gradient(24deg, rgba(0,0,0,1) 0%, rgba(75,0,85,1) 100%)"
      document.body.style.transition = "background-color 0.5s,background-image 0.5s"
      
      
    }


  }
    return (
        <modeContext.Provider value={{mode,setmode,textCol,changetextCol,toggleMode}}>
           
            {props.children}
        </modeContext.Provider>
    )
}
export default modeState