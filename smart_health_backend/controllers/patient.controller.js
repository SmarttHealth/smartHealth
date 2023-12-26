const db = require("../models/db")
const bcrypt = require("bcrypt")
const UserCrud = require("../models/patient.model")
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
    console.log("Received data:", req.body);
    if(req.body === null)
        res.status(400).json({
        error:'given user null'
        })
    else{
        const { email, password } = req.body;
        const role = "Patient"
        //const dateString = birthday;
        //const parts = dateString.split('/'); // Séparer la chaîne par "/"
       // const day = parseInt(parts[0], 10); // Récupérer le jour
       // const month = parseInt(parts[1], 10) - 1; // Récupérer le mois (soustraire 1 car les mois commencent à 0)
        //const year = parseInt(parts[2], 10); // Récupérer l'année

        // Créer un objet Date avec les parties extraites
       // const birthdayy = new Date(year, month, day);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        CompteCrud.create({email,"password": hashedPassword, role})
        .then(CptData => {
            const compteId = CptData._id;
            const patientData = {
                ...req.body,
                id_compte: compteId
                //birthday: birthdayy
            }; 
            UserCrud.create(patientData)
            .then(data => res.status(201).json(data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        
    }
}

exports.updateUser =async (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        const { email, password, birthday } = req.body
        const dateString = birthday;
        const parts = dateString.split('/'); // Séparer la chaîne par "/"
        const day = parseInt(parts[0], 10); // Récupérer le jour
        const month = parseInt(parts[1], 10) - 1; // Récupérer le mois (soustraire 1 car les mois commencent à 0)
        const year = parseInt(parts[2], 10); // Récupérer l'année

        // Créer un objet Date avec les parties extraites
        const birthdayy = new Date(year, month, day);
        const patientData = {
            ...req.body,
            birthday: birthdayy
        }; 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const cptData = {email, "password": hashedPassword}

        UserCrud.findByIdAndUpdate(req.params.id, patientData)
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
exports.patientWithInactiveState = async (req, res) => {
    try {
      const patients = await UserCrud.find();
      const result = [];
      for (const patient of patients) {
        const compte = await CompteCrud.findById(patient.id_compte);
  
        if (compte && compte.active === false) {
          result.push({
            _id: patient._id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            phone: patient.phone,
            address: patient.address,
            birthday: patient.birthday,
            id_compte: patient.id_compte,
          });
        }
      }
  
      res.send(result);
    } catch (err) {
      console.error('Error during findAll:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  