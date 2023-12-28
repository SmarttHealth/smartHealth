const db = require("../models/db")
const Consultation = require("../models/consultation.model")
const Patient = require("../models/patient.model")
const Medecin = require("../models/medecin.model")
const ObejectId = require("mongoose").Types.ObjectId



exports.findAll = (req, res) =>{
    Consultation.find()
    .then(data => res.send(data))
    .catch(err => console.log(err))
}
exports.findAllConsultationDetails = async (req, res) => {
    try {
      const consultations = await Consultation.find();
      const consultationsWithDetails = [];
  
      for (const consultation of consultations) {
        const patient = await Patient.findById(consultation.id_patient);
        const medecin = await Medecin.findById(consultation.id_medecin);
  
        consultationsWithDetails.push({
          ...consultation._doc,
          patient: patient ? { id: patient._id, firstName: patient.firstName, lastName: patient.lastName } : null,
          medecin: medecin ? { id: medecin._id, firstName: medecin.firstName, lastName: medecin.lastName } : null,
        });
      }
  
      res.status(200).json(consultationsWithDetails);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des consultations' });
    }
  };
  

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


// exports.addDocumentsToConsultation = async (req, res) => {
//     const { id } = req.params;
//     const fileNames = req.files.map(file => file.filename);

//   try {
//     // // Vérifier si la consultation existe
//     // const consultation = await Consultation.findById(id);
//     console.log("fffffffffffffffffff:****************: ",fileNames)
//     if (!consultation) {
//       return res.status(404).json({ error: 'Consultation non trouvée' });
//     }
//     // Mettez à jour la consultation avec les nouveaux noms de fichiers
//     const consultation = await Consultation.findByIdAndUpdate(
//       id,
//       { $push: { documents: { $each: fileNames } } },
//       { new: true }
//     );

//     // // Ajouter les documents à la consultation existante
//     // consultation.documents.push(...documents);
//     await consultation.save();

//     return res.status(200).json(consultation);
//   } catch (err) {
//     return res.status(500).json({ error: 'Erreur lors de l\'ajout des documents à la consultation' });
//   }
// };
// Additional route for handling file uploads
exports.addDocumentsToConsultation = async (req, res) => {
  try {
    const consultationId = req.params.id;
    const fileNames = req.files.map(file => file.filename);

    // Mettez à jour la consultation avec les nouveaux noms de fichiers
    const consultation = await Consultation.findByIdAndUpdate(
      consultationId,
      { $push: { documents: { $each: fileNames } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Documents ajoutés avec succès", consultation });
  } catch (error) {
    console.error("Erreur lors de l'ajout des documents :", error);
    res.status(500).json({ success: false, message: "Erreur lors de l'ajout des documents" });
  }
};
exports.uploadDocument = (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
  
    // Handle the uploaded files as needed
    const fileNames = req.files.map((file) => file.originalname);
    console.log('Files uploaded successfully:', fileNames);
  
    // You can perform additional actions with the files if needed
  
    return res.status(200).json({ success: true, fileNames });
  };
  exports.findConsultationsByPatient = async (req, res) => {
    try {
      const patientId = req.params.id; // Ajoutez la récupération de l'ID du patient depuis les paramètres de la requête
      const consultations = await Consultation.find({ id_patient: patientId });
  
      const consultationsWithDetails = [];
  
      for (const consultation of consultations) {
        const patient = await Patient.findById(consultation.id_patient);
        const medecin = await Medecin.findById(consultation.id_medecin);
  
        consultationsWithDetails.push({
          ...consultation._doc,
          patient: patient ? { id: patient._id, firstName: patient.firstName, lastName: patient.lastName } : null,
          medecin: medecin ? { id: medecin._id, firstName: medecin.firstName, lastName: medecin.lastName } : null,
        });
      }
  
      res.status(200).json(consultationsWithDetails);
      console.log("response pour getter les consultations par id Patient",res);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des consultations' });
    }
  };
  
