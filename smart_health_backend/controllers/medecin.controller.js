const db = require("../models/db")
const bcrypt = require("bcrypt")
const UserCrud = require("../models/medecin.model")
const ServiceCrud = require("../models/service.model")
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

exports.addUser = async (req, res) => {
    if (req.body === null) {
        res.status(400).json({ error: 'given user null' });
    } else {
        try {
            const { email, password, specialite } = req.body;
            const role = "Medecin";
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const compte = await CompteCrud.create({ email, password: hashedPassword, role });
            const compteId = compte._id;

            const medecinData = {
                ...req.body,
                id_compte: compteId
            };

            const medecin = await UserCrud.create(medecinData);

            const service = await ServiceCrud.findOne({ nameService: specialite });

            if (service) {
                await ServiceCrud.findByIdAndUpdate(service._id, {
                    $push: {
                        medecins: { _id: medecin._id }
                    }
                }, { new: true, useFindAndModify: false });
            } else {
                res.status(400).json({ error: 'no medecin' });
            }

            res.status(201).json(medecin);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

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

exports.deleteUser = async (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        try {
         const medecin = await UserCrud.findById(req.params.id)
         CompteCrud.findByIdAndDelete(medecin.id_compte).exec()
         UserCrud.findByIdAndDelete(medecin.id_compte).exec()
         const service = await ServiceCrud.findOne({ nameService: medecin.specialite });

         if (service) {
             await ServiceCrud.findByIdAndUpdate(service._id, {
                 $pull: {
                     medecins: { _id: medecin._id }
                 }
             }, { new: true, useFindAndModify: false });
         } else {
             res.status(400).json({ error: 'no medecin' });
         }
         res.status(201).json({ message: ' medecin deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error' });
        }
        
    }
}