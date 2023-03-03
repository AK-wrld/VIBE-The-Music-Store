const express = require('express')
const router = express.Router()
const Def = require('../models/DefPlaylist')
const Song = require('../models/DefSongs')

router.get('/getDefaultPlaylist', async (req, res) => {

    try {
        const defaultPlaylists = await Def.find({})
        res.status(200).json({ "success": true, defaultPlaylists })
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})
router.post('/addDefPlaylist', async (req, res) => {
    const { name, quote, img } = req.body
    try {
        const newPlaylist = await Def.create({
            name, quote, img
        })
        res.json({ success: true, newPlaylist })
    } catch {

        res.status(500).json({ "success": false, message: "Internal server error" })
    }

})
//FETCHING ALL THE SONGS OF A PARTICULAR DEFAULT PLAYLIST
router.get('/:_id', async (req, res) => {
    const {_id} = req.params
    // console.log(_id)
    try {
        const songs = await Song.find({playlist:_id})
        res.status(200).json({success:true,songs})
    } catch {

        res.status(500).json({ success: "false", "message": "Internal server error" })
    }

})
//ADDING SONGS IN DEFAULT PLAYLIST
router.post('/addDefSong', async (req, res) => {
    try {
        const { playlist, name, url, artist, img, date } = req.body
        const newSong = await Song.create({
            playlist, name, url, artist, img, date
        })
        res.status(200).json({ "success": true, newSong })
    } catch {
        res.status(500).json({ "success": false, message: "Internal server error" })
    }

})


module.exports = router
