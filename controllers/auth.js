const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, UnauthError } = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res) => {
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token:user.createToken()});
}

const login = async (req, res) => {
    const {email, password} = {...req.body};
    if(!email || !password){
        throw new BadRequest("Please provide email and password");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnauthError("Please provide valid email and password");
    }
    const compare = await user.comparePasswords(password);
    if(!compare){
        throw new UnauthError("Please provide valid email and password");
    }
    const token = user.createToken();
    res.status(StatusCodes.OK).json({user:{name:user.name}, token});
}

module.exports = {register, login};