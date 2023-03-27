import React, {useEffect, useRef, useState} from 'react'
import LoginContext from '../ContextFiles/LoginContext'

const loginState = (props)=> {
    const [loginState,isLogged] = useState(false)
    const [authToken,setAuthToken] = useState('')
    const [userDetails,setUserDetails] = useState({
        _id : '',
        username: '',
        email: '',
        date: '',
    })
    const [seePass,setSeepass] = useState(false)
    const passRef = useRef(false)
    
    return (
        <LoginContext.Provider value={{loginState,isLogged,authToken,setAuthToken,userDetails,setUserDetails,seePass,setSeepass,passRef}}>
           
            {props.children}
        </LoginContext.Provider>
    )
}
export default loginState