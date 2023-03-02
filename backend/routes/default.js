const express = require('express')
const router = express.Router()
const Def = require('../models/DefPlaylist')

router.get('/getDefaultPlaylist',async(req,res)=> {
    
    try {
        const defaultPlaylists = await Def.find({})
        res.status(200).json({"success":true,defaultPlaylists})
    } catch {
        
        res.status(500).json({success:"false","message":"Internal server error"})
    }
    
})
router.post('/addDefPlaylist',async(req,res)=> {
    const {name,quote,img}= req.body
    try {
        const newPlaylist = await Def.create({
            name,quote,img
        })
        res.json({success:true,newPlaylist})
    } catch {
        
        res.status(500).json({"success":false,message:"Internal server error"})
    }
    
})


module.exports = router
