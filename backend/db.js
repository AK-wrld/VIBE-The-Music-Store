const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Vibe');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));

db.once('open',function() {
  //we are connected!
  console.log("we are connected");
})
module.exports = db