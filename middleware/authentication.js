const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthError } = require('../errors');

const authorize = async (req, res, next) => {
    const authHead = req.headers.authorization;
    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new UnauthError("unauthorized to access");
    }
    const token = authHead.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {username:payload.username, userId:payload.id};
        next();
    }
    catch(error){
        throw new UnauthError("unauthorized to access");
    }
} 

module.exports = authorize;