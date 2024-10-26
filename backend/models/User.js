const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
        // we dont have to call this method now , it will run when the document is being inserted 
    }
});
 
// schema se model bana rhe hai
const User = mongoose.model('user',UserSchema);
module.exports = User;