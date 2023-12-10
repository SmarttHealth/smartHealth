const db = require("../models/db")
const bcrypt = require("bcrypt")
const UserCrud = require("../models/medecin.model")
const CompteCrud = require("../models/compte.model")
const ObejectId = require("mongoose").Types.ObjectId


exports.findAll = (req, res) =>{
    UserCrud.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findUser = (req, res) => {
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

exports.addUser =async (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else{
        const { email, password} = req.body;
        const role = "Medecin"
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        CompteCrud.create({email,"password": hashedPassword, role})
        .then(CptData => {
            const compteId = CptData._id;
            const medecinData = {
                ...req.body,
                id_compte: compteId
            }; 
            UserCrud.create(medecinData)
            .then(data => res.status(201).json(data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        
    }
}

exports.updateUser = async (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const cptData = {email, "password": hashedPassword}
    UserCrud.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
         const cpt = CompteCrud.findByIdAndUpdate(data.id_compte, cptData).exec()
        res.json(data)
    })
       
    .catch(err => console.log(err))
}
}

exports.deleteUser = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
         UserCrud.findById(req.params.id)
        .then(data => { 
            CompteCrud.findByIdAndDelete(data.id_compte).exec()
            UserCrud.findByIdAndDelete(req.params.id).exec()
            res.json(data)
        })
        .catch(err => console.log(err))
        
    }
}