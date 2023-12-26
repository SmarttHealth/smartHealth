const db = require("../models/db")
const RDV = require("../models/RDV.model")
const Patient = require("../models/patient.model")
const Medecin = require("../models/medecin.model")
const ObejectId = require("mongoose").Types.ObjectId


exports.findAll = (req, res) =>{
    RDV.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findAllRDVDetails = async (req, res) => {
    try {
      const rdvs = await RDV.find();
      const rdvDetails = [];
  
      for (const rdv of rdvs) {
        const patient = await Patient.findById(rdv.id_patient);
        const medecin = await Medecin.findById(rdv.id_medecin);
  
        rdvDetails.push({
          ...rdv._doc,
          patient: patient ? { id: patient._id, firstName: patient.firstName, lastName: patient.lastName, contact: patient.phone } : null,
          medecin: medecin ? { id: medecin._id, firstName: medecin.firstName, lastName: medecin.lastName } : null,
        });
      }
  
      res.status(200).json(rdvDetails);
    } catch (err) {
      console.error('Error fetching rdvs:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des rdvs' });
    }
  };

exports.findRDV = (req, res) => {
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        RDV.findById(req.params.id)
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

exports.addRDV = (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else
        RDV.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
}

exports.updateRDV = async (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        const rdv = await RDV.findByIdAndUpdate(req.params.id, req.body)
        res.json(rdv)
    }
}

exports.deleteRDV = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        RDV.findByIdAndDelete(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
}
