import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {easeOut, motion } from "framer-motion"
import AlertContext from '../context/ContextFiles/AlertContext'
import ModeContext from '../context/ContextFiles/ModeContext'
import Alert from './Alert'


import '../CSS/signup.css'
import LoginContext from '../context/ContextFiles/LoginContext'
export default function Signup() {
    const loginProps = useContext(LoginContext)
    const navigate = useNavigate()
    const alertProp = useContext(AlertContext)
    const modeProp = useContext(ModeContext)
    useEffect(modeProp.toggleMode, [modeProp.mode])
    const checkSignUp = async () => {
        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",


            },
            body: JSON.stringify({ username: username, email: email, password: password }), // body data type must match "Content-Type" header
        });
        // console.log(headers.prompt)
        let authToken = await response.json();
        console.log(authToken)
        if (!authToken.success) {
            const errorEmailHandler = document.getElementById('emailError')
            const errorUsernameHandler = document.getElementById('usernameError')
            const errorPassHandler = document.getElementById('passError')
            console.log(authToken)
            var params = ''
            if (authToken.errors) {

                const errors = authToken.errors
                // console.log(errors)
                params = errors[0].param
                let error = errors[0].msg
                if (params === 'password') {

                    errorUsernameHandler.innerText = ''
                    errorEmailHandler.innerText = ''
                    errorPassHandler.innerText = error
                    alertProp.showAlert('Could not create Account', 'danger')
                }
                else if (params === 'email') {
                    errorPassHandler.innerText = ''
                    errorUsernameHandler.innerText = ''
                    errorEmailHandler.innerText = error
                    alertProp.showAlert('Could not create Account', 'danger')
                }
                else {
                    errorPassHandler.innerText = ''
                    errorEmailHandler.innerText = ''
                    errorUsernameHandler.innerText = error
                    alertProp.showAlert('Could not create Account', 'danger')
                }
            }
            // console.log(params)

            else if (authToken.error === 'Sorry this email already exists') {
                console.log("hi")
                errorUsernameHandler.innerText = ''
                errorEmailHandler.innerText = authToken.error
                alertProp.showAlert('Could not create Account', 'danger')

            }
            else if (authToken.error === 'Sorry this username already exists') {
                console.log("hi")
                errorEmailHandler.innerText = ''
                errorPassHandler.innerText = ''
                errorUsernameHandler.innerText = authToken.error
                alertProp.showAlert('Could not create Account', 'danger')

            }
            else {
                console.log("hi")
                errorEmailHandler.innerText = ''
                errorPassHandler.innerText = ''

                errorUsernameHandler.innerText = ''
                alertProp.showAlert('Internal Server Error', 'danger')

            }

        }
        else {
            const errorHandler = document.getElementById('emailError')
            errorHandler.innerText = ''
            const errorHandler2 = document.getElementById('usernameError')
            errorHandler2.innerText = ''
            alertProp.showAlert('Account successfully created', 'success')
            setTimeout(() => {

                navigate("/login");
            }, 1500);


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
            <motion.div className="signupBox container" initial={{ opacity: 0, y:150 }}
      animate={{ opacity: 1, y:100}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease:easeOut
      }}>

                <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>

                    <h2>Sign in to <span className='vibe'>VLBE</span></h2>
                </div>
                <div className="container">
                    <div className="form-floating " style={{ height: "65px" }}>

                        <input type="text" id="username" name="username" style={{ "width": "90%" }} placeholder="Username" className="my-2 form-control" required /><br />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div ><p id="usernameError" className='error'></p></div>
                    <div className="form-floating " style={{ height: "65px" }}>

                        <input type="email" id="email" name="email" style={{ "width": "90%" }} placeholder="Email" className="my-2 form-control" required /><br />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div ><p id="emailError" className='error'></p></div>
                    <div className="form-floating passwordContainer mb-2" >


                        <input type="password" ref={loginProps.passRef} id="password" name="password" style={{ "width": "100%" }} placeholder="Password" className=" form-control" minLength="5" required />

                        <i className={`bi bi-eye${loginProps.seePass === false ? '-slash' : ''}-fill`} style={{ fontSize: 'large', cursor: 'pointer' }} onClick={() => loginProps.setSeepass(!loginProps.seePass)}></i>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div ><p id="passError" className='error'></p></div>

                    <button type="submit" className="signupBtn" onClick={() => checkSignUp()}>Sign Up</button>

                </div>
                <div className="signupBtnCont" style={{ "display": "flex", "alignItems": "center", flexDirection: "column" }}>

                    <h6>Existing User?</h6>
                    <Link className="signinBtn" to='/login'>Login</Link>

                </div>
            </motion.div>
        </>
    )
}
