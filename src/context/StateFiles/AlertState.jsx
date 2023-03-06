import React, {useState} from 'react'
import AlertContext from '../ContextFiles/AlertContext'

const AlertState = (props)=> {
   //make global props and global states here 
   const [alert,setAlert]= useState(null);
   const showAlert = (message,type)=> {
    setAlert({
      message:message,
      type: type
    })  
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
    return (
        <AlertContext.Provider value={{alert,setAlert,showAlert}}>
           
            {props.children}
        </AlertContext.Provider>
    )
    }
export default AlertState 