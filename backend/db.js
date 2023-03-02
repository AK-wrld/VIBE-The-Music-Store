const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Vibe',{ useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));

db.once('open',function() {
  //we are connected!
  console.log("we are connected");
})
module.exports = db