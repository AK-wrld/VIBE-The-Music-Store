import React, {useState} from 'react'
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
    return (
        <LoginContext.Provider value={{loginState,isLogged,authToken,setAuthToken,userDetails,setUserDetails}}>
           
            {props.children}
        </LoginContext.Provider>
    )
}
export default loginState