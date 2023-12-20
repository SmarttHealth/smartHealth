const db = require("../models/db")
const Consultation = require("../models/consultation.model")
const ObejectId = require("mongoose").Types.ObjectId


exports.findAll = (req, res) =>{
    Consultation.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}

exports.findConsultation = (req, res) => {
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else
        Consultation.findById(req.params.id)
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

exports.addConsultation = (req, res) => {
    if(req.body === null)
        res.status(400).json({
        error:'given consultation null'
        })
    else
        Consultation.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log(err))
}

exports.updateConsultation = async (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        const rdv = await Consultation.findByIdAndUpdate(req.params.id, req.body)
        res.json(rdv)
    }
}

exports.deleteConsultation = (req, res) =>{
    if(ObejectId.isValid(req.params.id) == false)
        res.status(400).json({
            error: 'given Object id is not valid : '+ req.params.id
        })
    else{
        Consultation.findByIdAndDelete(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
}


exports.addDocumentsToConsultation = async (req, res) => {
    const { id } = req.params;
  const { documents } = req.body;

  try {
    // Vérifier si la consultation existe
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation non trouvée' });
    }

    // Ajouter les documents à la consultation existante
    consultation.documents.push(...documents);
    await consultation.save();

    return res.status(200).json(consultation);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de l\'ajout des documents à la consultation' });
  }
};

