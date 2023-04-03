const mongoose = require('mongoose');
const password = encodeURIComponent("Vibe@123");
mongoose.connect(`mongodb+srv://apurbakoley43:${password}@cluster0.kdwao1b.mongodb.net/Vibe`,{
  useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));

db.once('open',function() {
  //we are connected!
  console.log("we are connected");
})
module.exports = db