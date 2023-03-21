const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default : Date.now
    },
    img: {
        type: String,
        default:'https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png'
    }
  });
  const User = mongoose.model('user',UserSchema)
  module.exports = User