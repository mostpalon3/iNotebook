//capital me Notes isliye hai kyunki ye hamara model hao

const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now,//we dont have to call this method now , it will run when the document is being inserted 
    }
});
 
// schema se model bana rhe hai
module.exports = mongoose.model('notes', NotesSchema);