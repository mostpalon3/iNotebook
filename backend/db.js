const mongoose = require('mongoose');
// const mongoURI = require('./mongoURI');



const connectToMongo = async (url) => {
    await mongoose.connect(url,{
        ssl: true
    });
    console.log("Connected to MongoDB successfully");
}

module.exports = connectToMongo;