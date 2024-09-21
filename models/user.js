//   user model for login 
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
   const userSchema = new Schema ({
     email:{
        type:String,
        required:true,
     }
   });
    userSchema.plugin(passportLocalMongoose);// automatically  store ussername and  ppassword in hashed formss
    module.exports = mongoose.model("User",userSchema);   