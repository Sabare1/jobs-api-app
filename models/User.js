const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    }
})

UserSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createToken = function (){
    return jwt.sign({username:this.name, id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
}

UserSchema.methods.comparePasswords = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User",UserSchema);