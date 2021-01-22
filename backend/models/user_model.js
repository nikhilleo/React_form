

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = mongoose.Schema({
    fname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    mobile:{
        type:String,
        trim:true,
        required:true,
        unique:true
    }
},{timestamp:true});



userSchema.statics.findByCredentials = async function(email,password){
    const user = await User.findOne({email:email});
    if(!user)
    {
        throw new Error("No User Found With Given Credentails");
    }
    const bool = await bcrypt.compare(password,user.password);
    if(bool)
    {
        return user;
    }
    else
    {
        return false
    }
}


userSchema.methods.genToken = async function()
{
    const user = this;
    const token = await jwt.sign({email:user.email},process.env.JWT_KEY,{expiresIn:'5h'});
    console.log(token);
    return token;
}

userSchema.pre("save",async function (next) 
{
    const user = this;
    if(user.isModified("password"))
    {
        user.password = await bcrypt.hash(user.password,14);
    }
    next();
});


const User = mongoose.model("User",userSchema);
module.exports = User;