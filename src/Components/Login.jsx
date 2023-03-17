import React, { useContext, useState,useEffect } from 'react'
import { Link, } from 'react-router-dom'
import AlertContext from '../context/ContextFiles/AlertContext'
import LoginContext from '../context/ContextFiles/LoginContext'
import ModeContext from '../context/ContextFiles/ModeContext'
import '../CSS/login.css'
import Alert from './Alert'

const Login = () => {
  const modeProp = useContext(ModeContext)
  const alertProp = useContext(AlertContext)
  useEffect(modeProp.toggleMode,[modeProp.mode])
  const props = useContext(LoginContext)
  

  const checkLogin = async () => {
    // ev.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",


      },
      body: JSON.stringify({ email: email, password: password }), // body data type must match "Content-Type" header
    });
    // console.log(headers.prompt)
    let authtoken = await response.json();
    // console.log(authToken)
    // console.log(authtoken.authToken)
    if (authtoken.success) {
      
      const errorHandler = document.getElementById('error')
      errorHandler.innerText = ''
      window.localStorage.setItem('token',authtoken.authToken)
      
      
      getLoggedinUserData(authtoken.authToken)
    }
    else {
      
        const errorEmailHandler = document.getElementById('emailError')
        
        const errorPassHandler = document.getElementById('passError')
        console.log(authtoken)
        var params=''
        if(authtoken.errors) {

            const errors = authtoken.errors
            // console.log(errors)
             params = errors[0].param
             let error = errors[0].msg
             if(params === 'password') {
                
                
                 errorEmailHandler.innerText = ''
                 errorPassHandler.innerText =error
                 alertProp.showAlert('Could not create Account','danger')
             }
             else  {
                 errorPassHandler.innerText =''
               
                errorEmailHandler.innerText = error
                alertProp.showAlert('Could not create Account','danger')
             }
             
        }
      const errorHandler = document.getElementById('error')
      errorHandler.innerText = authtoken.error
      console.log(authtoken.error)
      alertProp.showAlert('Login Failed','danger')
    }
    
  }

  const getLoggedinUserData = async (authToken) => {
    // console.log(authToken)
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken

      },

    });
    let userData = await response.json();
    if(userData.success) {

      window.localStorage.setItem('userData',JSON.stringify(userData))
      window.location.assign("/home");
    }
    else {
      console.log(userData.error)
    }
  }
  
 
  return (
    <>
    <Alert/>
      <div className="loginBox container">
        <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>


        </div>
        <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>

          <h2>Sign in to <span className='vibe'>VLBE</span> </h2>
        </div>
        <div className="container">
          <label htmlFor="email">Email</label><br />
          <input type="email" id="email" name="email" style={{ "width": "100%" }} placeholder="Enter Email" className="my-2" required /><br />
          <div ><p id="error" className='error'></p></div>
          <label htmlFor="password">Password</label><br />
          <input type="password" id="password" name="password" style={{ "width": "100%" }} placeholder="Enter Password" className="my-2" required /><br /><br />
          <button type="submit" className="signinBtn" onClick={ checkLogin}>Sign In</button><br />

        </div>
        <div className="signupBtnCont" style={{ "display": "flex", "alignItems": "center", flexDirection: "column" }}>

          <h6>New User?</h6>
          <Link type="submit" style={{ "textAlign": "centre" }} className="signupBtn" to="/signup">Sign Up</Link>

        </div>
      </div>
    </>
  )
}

export default Login
