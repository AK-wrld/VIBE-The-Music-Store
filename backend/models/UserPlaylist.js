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
        default : 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fcb2c7102027459.5f2cc34b5cebc.png'
    },


});

const userPlaylist = mongoose.model('userplaylists',userPlaylistSchema)
module.exports = userPlaylist