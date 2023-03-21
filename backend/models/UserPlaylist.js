const mongoose = require('mongoose');
const { Schema } = mongoose;
const userPlaylistSchema = new Schema({

    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
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

const userPlaylist = mongoose.model('userplaylists',userPlaylistSchema)
module.exports = userPlaylist