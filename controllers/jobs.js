const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFoundErr } = require('../errors')

const getAll = async (req, res) => {
    const allJobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({allJobs, nbHits:allJobs.length});
}

const getJob = async (req, res) => {
    const jobId = req.params.id;
    const personJobs = await Job.findOne({createdBy: req.user.userId, _id:jobId})
    
    if(!personJobs){
        throw new NotFoundErr("Cannot find the job you're looking for!");
    }
    res.status(StatusCodes.OK).json(personJobs);
}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;
    const company = req.body.company;
    if(!company){
        throw new BadRequest("Missing company value");
    }
    const position = req.body.position;
    if(!position){
        throw new BadRequest("Missing position value");
    }
    const job = await Job.create({...req.body});
    res.status(StatusCodes.OK).json({msg: "Job created successfully"});
}

const updateJob = async (req, res) => {
    const { body:{position, company}, params:{id: jobId}, user:{userId} } = req;
    if(!position || !company){
        throw new BadRequest("Please provide both company and position");
    }
    const personJob = await Job.findOneAndUpdate({createdBy: userId, _id: jobId}, req.body, {new:true, runValidators:true});
    if(!personJob){
        throw new NotFoundErr("Cannot find the job you're looking for!");
    }  
    res.status(StatusCodes.OK).json({msg: personJob});
}

const deleteJob = async (req, res) => {
    const {params:{id:jobId}, user:{userId}} = req
    if(!jobId || !userId){
        throw new BadRequest("Missing jobId");
    }
    const job = await Job.findOneAndDelete({_id:jobId, createdBy:userId});
    if(!job){
        throw new NotFoundErr("cannot find the job you're looking for!");
    }
    res.status(StatusCodes.OK).json({msg: "Job deleted successfully"});
}

module.exports = {getAll,
getJob,
createJob,
updateJob,
deleteJob,}