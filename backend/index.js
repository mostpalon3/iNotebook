require('dotenv').config()
const connectToMongo = require('./db');
const express = require('express');
let cors = require('cors')//helps use to make request from the browser as we cannot make request to different domain 
//the boilerplate was copied from express docs
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI)
connectToMongo(mongoURI);
// connectToMongo(process.env.REACT_APP_MONGO_URI);
//below code will run while waiting to run mongo server 
const app = express()
const port = 5001 || 6000;

app.use(cors())

//if u want to use req.body then u have to use a middleware
app.use(express.json())

//Available routes
//app.use se route ko link karenge
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port,() => {
  console.log(`iNotebook app backend listening on port ${port}`)
})
// The 0.0.0.0 tells the backend to listen on all IP addresses, not just localhost.
