import React, { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import ModeContext from '../context/ContextFiles/ModeContext'
import '../CSS/signup.css'
const Signup = () => {
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
            if (authToken.error === 'Sorry this email already exists') {
                errorUsernameHandler.innerText = ''
                errorEmailHandler.innerText = authToken.error


            }
            else {
                errorEmailHandler.innerText = ''
                errorUsernameHandler.innerText = authToken.error
            }
        }
        else {
            const errorHandler = document.getElementById('emailError')
            errorHandler.innerText = ''
            const errorHandler2 = document.getElementById('usernameError')
            errorHandler2.innerText = ''
        }
    }
    return (
        <>
            <div className="signupBox container">
                <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>


                </div>
                <div className="container" style={{ "display": "flex", "justifyContent": "center" }}>

                    <h2>Sign in to <span className='vibe'>VLBE</span></h2>
                </div>
                <div className="container">


                    <label htmlFor="username">Your Username</label><br />
                    <input type="text" id="username" name="username" style={{ "width": "100%" }} placeholder="Username" className="my-2" required /><br />
                    <div ><p id="usernameError" className='error'></p></div>
                    <label htmlFor="username">Your Email</label><br />
                    <input type="email" id="email" style={{ "width": "100%" }} name="email" placeholder="Email" className="my-2" required /><br />
                    <div ><p id="emailError" className='error'></p></div>
                    <label htmlFor="password">Create Your Password</label><br />
                    <input type="password" id="password" style={{ "width": "100%" }} name="password" minLength="5" placeholder="Password" className="my-2" required /><br /><br />
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

export default Signup
