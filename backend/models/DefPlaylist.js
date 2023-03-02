const mongoose = require('mongoose');
const { Schema } = mongoose;
const defPlaylist = new Schema({
    
    name: {
        type: String,
        required: true
    },
    quote: {
        type: String,
    
      
    },
    img: {
        type: String,
        default : 'https://pin.it/62qltKp'
    },
   
  });
  const Def = mongoose.model('defaultPlaylists',defPlaylist)
  module.exports = Def