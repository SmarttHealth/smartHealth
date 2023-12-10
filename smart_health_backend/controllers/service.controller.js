const db = require("../models/db")
const Service = require("../models/service.model")
const ObejectId = require("mongoose").Types.ObjectId


exports.findAll = (req, res) =>{
    Service.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findService = (req, res) => {
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        Service.findById(req.params.id)
        .then(data => {
            if (data)
                res.send(data)
            else
                res.status(404).json({
                    error: 'no record with given_id : '+ req.params.id
            })
            })
        .catch(err => console.log(err))
}

exports.addService = (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else
        Service.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
}

exports.updateService = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        Service.updateOne(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

exports.deleteService = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        Service.findByIdAndDelete(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
}
