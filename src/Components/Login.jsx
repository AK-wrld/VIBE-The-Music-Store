import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, } from 'react-router-dom'
import {easeOut, motion } from "framer-motion"
import AlertContext from '../context/ContextFiles/AlertContext'
import LoginContext from '../context/ContextFiles/LoginContext'
import ModeContext from '../context/ContextFiles/ModeContext'
import '../CSS/login.css'
import Alert from './Alert'

const Login = () => {


  const modeProp = useContext(ModeContext)
  const alertProp = useContext(AlertContext)
  useEffect(modeProp.toggleMode, [modeProp.mode])
  const loginProps = useContext(LoginContext)


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
      window.localStorage.setItem('token', authtoken.authToken)
      window.location.assign('/home')
    }
    else {

      const errorEmailHandler = document.getElementById('emailError')

      const errorPassHandler = document.getElementById('passError')
      console.log(authtoken)
      var params = ''
      if (authtoken.errors) {

        const errors = authtoken.errors
        // console.log(errors)
        params = errors[0].param
        let error = errors[0].msg
        if (params === 'password') {


          errorEmailHandler.innerText = ''
          errorPassHandler.innerText = error
          alertProp.showAlert('Could not create Account', 'danger')
        }
        else {
          errorPassHandler.innerText = ''

          errorEmailHandler.innerText = error
          alertProp.showAlert('Could not create Account', 'danger')
        }

      }
      const errorHandler = document.getElementById('error')
      errorHandler.innerText = authtoken.error
      console.log(authtoken.error)
      alertProp.showAlert('Login Failed', 'danger')
    }

  }
  useEffect(() => {
    if (loginProps.seePass === true) {
      loginProps.passRef.current.type = 'text'
    }
    else {
      loginProps.passRef.current.type = 'password'
    }
  }, [loginProps.seePass])


  return (
    <>
      <Alert />
      <motion.div className="loginBox container" initial={{ opacity: 0, y:150 }}
      animate={{ opacity: 1, y:100}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease:easeOut
      }}>
        
        <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>

          <h2>Sign in to <span className='vibe'>VLBE</span> </h2>
        </div>
        <div className="container">
          <div className="form-floating " style={{height:"65px"}}>
            
          <input type="email" id="email" name="email" style={{ "width": "92%" }} placeholder="Email" className="my-2 form-control" required /><br />
          <label htmlFor="email">Email</label>
          </div>
          <div ><p id="error" className='error'></p></div>
          <div className="form-floating passwordContainer mb-3" >


            <input type="password" ref={loginProps.passRef} id="password" name="password" style={{ "width": "100%" }} placeholder="Password" className=" form-control" minLength="5" required />
            
            <i className={`bi bi-eye${loginProps.seePass === false ? '-slash' : ''}-fill`} style={{ fontSize: 'large', cursor: 'pointer' }} onClick={() => loginProps.setSeepass(!loginProps.seePass)}></i>
          <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="signinBtn" onClick={checkLogin}>Login</button><br />

        </div>
        <div className="signupBtnCont" style={{ "display": "flex", "alignItems": "center", flexDirection: "column" }}>

          <h6>New User?</h6>
          <Link type="submit" style={{ "textAlign": "centre" }} className="signupBtn" to="/signup">Sign Up</Link>

        </div>
      </motion.div>
    </>
  )
}

export default Login
