// Model for interacting with database MongoDB 
const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String ,
        required:true
    },
    spotifyID:{
        type: String,
        required: true
    },
    signupDate:{
        type: Date,
        required:true,
        default: Date.now
    }

})

/*
The first argument is the singular name of the collection your model is for. 
Mongoose automatically looks for the plural, lowercased version of your model name. 
Thus, for the example above, the model Signup is for the signups collection in the database.
*/
module.exports = mongoose.model('Signup', signupSchema)