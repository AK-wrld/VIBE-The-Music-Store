const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSongsSchema = new Schema({

    playlist: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userplaylists'
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

const userSongs = mongoose.model('userSongs',userSongsSchema)
module.exports = userSongs




