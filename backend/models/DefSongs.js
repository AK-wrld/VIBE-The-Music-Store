const mongoose = require('mongoose');
const { Schema } = mongoose;
const songs = new Schema({
    playlist: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'defaultPlaylists'
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type:String,
        required:true
    },
    artist: {
        type: String,
    
      
    },
    img: {
        type: String,
        default : 'https://pin.it/62qltKp' 
    },
    date: {
        type:String
    }
   
  });
  const Song = mongoose.model('songs',songs)
  module.exports = Song