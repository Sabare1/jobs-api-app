const {StatusCodes} = require('http-status-codes');

const errorHandleMiddleware = (err, req, res, next) => {
    const customError = {statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, 
        msg: err.message || "something went wrong! please try again later"};
    if(err.code && err.code === 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}, please use another email`
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if(err.name && err.name === "CastError"){
        customError.msg = `Invalid mongoose id for the id: ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if(err.name && err.name === "ValidationError"){
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    res.status(customError.statusCode).json(customError.msg);
}

module.exports = errorHandleMiddleware;