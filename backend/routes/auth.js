const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const fetchuser = require('../middlewares/fetchuser')
const jwt = require('jsonwebtoken');
const JWT_Secret = 'aVerySecretSignature'
//1. ENDPOINT: we will create an endpoint for creating a user using POST: '/api/auth/createUser'

router.post('/createUser',[
    body('username','Enter a valid username').isLength({ min: 1 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
    
],async (req,res)=> {
    const errors = validationResult(req);
    //error handling
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    console.log(req.body)
    try {

      //check if user with this email is present or not
      let user = await User.findOne({email: req.body.email})
      if(user) {
        return res.status(400).json({success:false,error:"Sorry this email already exists"})
      }
      let anotherUser = await User.findOne({username: req.body.username})
      if(anotherUser) {
        return res.status(400).json({success:false,error:"Sorry this username already exists"})
      }
      
      //Creating a secured pass hash using bcryptjs  
      var salt = await bcrypt.genSaltSync(10);
      var securedPass = await bcrypt.hash(req.body.password,salt)
      //create a new user
       user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: securedPass,
        })

        //authentcating user with authtoken
        var data = {
          user: {
            id: user.id
            //jo user ki id mongo me store hui(unique for each entry) usse hum bhejre hai
          }
        }
        const authToken = jwt.sign(data,JWT_Secret) //this will generate a unique token which users will get
        res.json({success:true,authToken:authToken})
          
      // res.send('your data has been stored')
    }
    catch {
      console.log("unexpected error occured")
      res.status(500).json({success:false,error:"Internal server error"})
    }
})


//2. ENDPOINT: creating endpoint for login: /api/auth/login
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be left blank').exists(),
  
],async (req,res)=> {
  // console.log(req.body)
  const errors = validationResult(req.body);
  //error handling
  if (!errors.isEmpty()) {
    return res.status(400).json({success:false, errors: errors.array() });
  }
  let {email,password}=req.body
  // console.log(email)
  try {
    //check if user with this email is present or not
    let user = await User.findOne({email: email})
    if(!user) {
      return res.status(400).json({success:false,error:"Please enter a valid email"})
    }
    
      let passCompare = await bcrypt.compare(password,user.password)
      // console.log(passCompare)
      if(!passCompare) {
      return res.status(400).json({success:false,error:"Paswword does not match the email.Either check your password or email"})

      }
      else {
        var data = {
          user: {
            id: user.id
            //jo user ki id mongo me store hui(unique for each entry) usse hum bhejre hai
          }
        }
        const authToken = jwt.sign(data,JWT_Secret) //this will generate a unique token which user will get and will contain the data obj
        res.json({success:true,authToken:authToken})
      
    }
  } catch {
    console.log("unexpected error occured")
      res.status(500).json({success:false,error:"Internal server error"})
  }
})

//3. ENDPOINT : fetching an existing logged in user details from auth token using post : /api/auth/getuser
//fetching user data using a middleware fn fetchuser
router.post('/getuser',fetchuser,async(req,res)=> {
  try {
    let userId = req.user.id
    // console.log(userId)
    const user = await User.findById(userId).select("-password")
    res.json({success:true,user})
  } catch {
    console.log("unexpected error occured")
      res.status(500).json({success:false,error:"Internal server error"})
  }
})
module.exports = router