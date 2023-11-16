const db = require("../models/db")
const UserCrud = require("../models/user.model")
const ObejectId = require("mongoose").Types.ObjectId


exports.findAll = (req, res) =>{
    UserCrud.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findByIdUser = (req, res) => {
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        UserCrud.findById(req.params.id)
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

exports.login = (req, res) => {
    
    const { email, password } = req.body;

    UserCrud.findOne({ email, password })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).json({
                error: 'no record found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'internal server error'
        });
    });
}

exports.addUser = (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else
        UserCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
}

exports.updateUser = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        UserCrud.updateOne(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
}

exports.deleteUser = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        const user = UserCrud.findById(req.params.id)
        UserCrud.deleteOne(user)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
}
