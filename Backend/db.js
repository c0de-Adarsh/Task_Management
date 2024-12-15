const mongoose = require('mongoose');
require('dotenv').config()
const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('mongodb connected successfully')
})

db.on('disconnect',()=>{
    console.log('mongodb disconnect successfully')
})

db.on('err',(err)=>{
    console.log('mongodb connection error',err)
})

module.exports = db