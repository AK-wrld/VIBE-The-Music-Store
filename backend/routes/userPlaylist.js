const express = require('express')
const router = express.Router()
const userPlaylist = require('../models/UserPlaylist')
const userSongs = require('../models/UserSongs')


// Getting user playlists

router.get('/getUserPlaylist/:_id', async (req, res) => {

    try { 
    const {_id} = req.params
    const userPlaylists = await userPlaylist.find({user:_id})
    res.status(200).json({ "success": true, userPlaylists})
        
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})

// Adding a user playlist

router.post('/addUserPlaylist', async (req, res) => {

    try { 
        const { user, name, quote, img } = req.body
    const oldPlaylists = await userPlaylist.find({ $and: [{ user: user }, { name: name }] })
    // console.log(oldPlaylists)
    if (oldPlaylists.length == 0) {
        const newPlaylists = await userPlaylist.create({
            user, name, quote, img
        })
        res.status(200).json({ "success": true, newPlaylists})
    }
    else {
        res.status(400).json({ "success": false, error : "Playlist name already exists"})
    }
    
        
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})

// Updating the playlist

router.post('/updateUserPlaylist', async (req, res) => {

    try { 
        const { _id, name, quote, img,changeName } = req.body
        if(changeName==true) {

            const oldPlaylists = await userPlaylist.find({name})
            if(oldPlaylists.length != 0) {
                res.status(400).json({ "success": false, error : "Playlist name already exists"})
            }
            else {
    
                await userPlaylist.findByIdAndUpdate(_id,{name , quote, img},{new:true})
               res.status(200).json({ "success": true, "message": "The playlist has been succesfully updated"})
            }
        }
        else {
            await userPlaylist.findByIdAndUpdate(_id,{name , quote, img},{new:true})
               res.status(200).json({ "success": true, "message": "The playlist has been succesfully updated"})
        }
        
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})

// Deleting the playlist

router.get('/deleteUserPlaylist/:_id', async (req, res) => {

    try { const {_id} = req.params
     await userPlaylist.findByIdAndDelete({_id})
    res.status(200).json({ "success": true, "message": "The playlist has been succesfully deleted"})
        
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})

// Getting the songs

router.get('/getusersongs/:_id', async (req, res) => {
    const {_id} = req.params
    // console.log(_id)
    try {
        const fetchSongs = await userSongs.find({playlist:_id})
        res.status(200).json({success:true,fetchSongs})
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})

// Adding user songs to a particular playlist 

router.post('/addusersong', async (req, res) => {
    try {
        const { playlist, name, url, artist, img, date } = req.body
        // console.log(playlist)
        // console.log(url)
        const oldSongs = await userSongs.findOne({ $and: [{ playlist: playlist }, { url: url }] })
        // console.log(oldSongs)
        if (!oldSongs) {
            console.log('adding new song')
            const newSong = await userSongs.create({
            playlist, name, url, artist, img, date
        })
        res.status(200).json({ "success": true, newSong })
    } else { 
        res.status(400).json({ "success": false, error : "This song is already added to your playlist" })
    }
    } catch {
        res.status(500).json({ "success": false, message: "Internal server error" })
    }

})

// Deleting user song from a playlist 

router.post('/deleteusersong', async (req, res) => {
    try {
        const { _id } = req.body
        await userSongs.findByIdAndDelete({
            _id
        })
        res.status(200).json({ "success": true, message: "Song has been succesfully deleted" })
    } catch {
        res.status(500).json({ "success": false, message: "Internal server error" })
    }

})

module.exports = router