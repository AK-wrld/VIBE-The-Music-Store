const db = require('./db')
const express = require('express')
var cors = require('cors')
const port= 5000
const app = express()
app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended:true})) // middleware jisse body dikhe
app.use('/api/auth',require('./routes/auth'))
app.use('/api/def',require('./routes/default'))
app.use('/api/user',require('./routes/userPlaylist'))
app.listen(port,()=> {
    console.log(`Server running succesfully at http://localhost:${port}/`)
})