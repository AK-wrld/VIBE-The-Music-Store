import React, { useContext,useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../context/ContextFiles/AlertContext'
import ModeContext from '../context/ContextFiles/ModeContext'
import Alert from './Alert'


import '../CSS/signup.css'
import LoginContext from '../context/ContextFiles/LoginContext'
export default function Signup()  {
    const loginProps = useContext(LoginContext)
    const navigate = useNavigate()
    const alertProp = useContext(AlertContext)
    const modeProp = useContext(ModeContext)
    useEffect(modeProp.toggleMode,[modeProp.mode])
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
            var params=''
            if(authToken.errors) {

                const errors = authToken.errors
                // console.log(errors)
                 params = errors[0].param
                 let error = errors[0].msg
                 if(params === 'password') {
                    
                     errorUsernameHandler.innerText = ''
                     errorEmailHandler.innerText = ''
                     errorPassHandler.innerText =error
                     alertProp.showAlert('Could not create Account','danger')
                 }
                 else if(params === 'email') {
                     errorPassHandler.innerText =''
                    errorUsernameHandler.innerText = ''
                    errorEmailHandler.innerText = error
                    alertProp.showAlert('Could not create Account','danger')
                 }
                 else  {
                     errorPassHandler.innerText =''
                     errorEmailHandler.innerText = ''
                    errorUsernameHandler.innerText = error
                    alertProp.showAlert('Could not create Account','danger')
                 }
            }
            // console.log(params)
            
            else if (authToken.error === 'Sorry this email already exists') {
                console.log("hi")
                errorUsernameHandler.innerText = ''
                errorEmailHandler.innerText = authToken.error
                alertProp.showAlert('Could not create Account','danger')

            }
            else if (authToken.error === 'Sorry this username already exists') {
                console.log("hi")
                errorEmailHandler.innerText = ''
                errorPassHandler.innerText = ''
                errorUsernameHandler.innerText = authToken.error
                alertProp.showAlert('Could not create Account','danger')

            }
            else {
                console.log("hi")
                errorEmailHandler.innerText = ''
                errorPassHandler.innerText = ''

                errorUsernameHandler.innerText = ''
                alertProp.showAlert('Internal Server Error','danger')

            }
            
        }
        else {
            const errorHandler = document.getElementById('emailError')
            errorHandler.innerText = ''
            const errorHandler2 = document.getElementById('usernameError')
            errorHandler2.innerText = ''
            alertProp.showAlert('Account successfully created','success')
            setTimeout(() => {
                
                navigate("/login");
            }, 1500);
            
            
        }
    }
    useEffect(()=> {
        if(loginProps.seePass===true) {
          loginProps.passRef.current.type='text'
        }
        else {
          loginProps.passRef.current.type='password'
        }
      },[loginProps.seePass])
    return (
        <>
        <Alert/>
            <div className="signupBox container">
                <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>


                </div>
                <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>

                    <h2>Sign in to <span className='vibe'>VLBE</span></h2>
                </div>
                <div className="container">
                     <label htmlFor="username">Your Username</label><br />
                    <input type="text" id="username" name="username" style={{ "width": "90%" }} placeholder="Username" className="my-2" required /><br />
                    <div ><p id="usernameError" className='error'></p></div>
                    <label htmlFor="username">Your Email</label><br />
                    <input type="email" id="email" style={{ "width": "90%" }} name="email" placeholder="Email" className="my-2" required /><br />
                    <div ><p id="emailError" className='error'></p></div>
                    <label htmlFor="password">Create Your Password</label><br />
                    <div className="createPasswordContainer">

                    <input type="password" id="password" ref={loginProps.passRef} style={{ "width": "90%" }} name="password" minLength="5" placeholder="Password" className="my-2" required /><br />
                    <i class={`bi bi-eye${loginProps.seePass===false?'-slash':''}-fill`} style={{fontSize:'large',cursor:'pointer'}} onClick={()=>loginProps.setSeepass(!loginProps.seePass)}></i><br /><br />
                    <div ><p id="passError" className='error'></p></div>
                    </div>
                    <button type="submit" className="signupBtn" onClick={() => checkSignUp()}>Sign Up</button>

                </div>
                <div className="signupBtnCont" style={{ "display": "flex", "alignItems": "center", flexDirection: "column" }}>

                    <h6>Existing User?</h6>
                    <Link className="signinBtn" to='/login'>Sign In</Link>

                </div>
            </div>
        </>
    )
}
