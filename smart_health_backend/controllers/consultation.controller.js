const db = require("../models/db")
const Consultation = require("../models/consultation.model")
const Patient = require("../models/patient.model")
const Medecin = require("../models/medecin.model")
const ObejectId = require("mongoose").Types.ObjectId
const fs = require("fs");
const PDFDocument = require("pdfkit-table");



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
exports.uploadDocument = (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
  
    // Handle the uploaded files as needed
    const fileNames = req.files.map((file) => file.originalname);
    console.log('Files uploaded successfully:', fileNames);
  
    // You can perform additional actions with the files if needed
  
    return res.status(200).json({ success: true, fileNames });
  };


exports.getConsultationByIdPatient = (req, res) => {
  const {id_patient, id_medecin} = req.params;
  Consultation.find({ id_patient: id_patient, id_medecin: id_medecin })
    .then((consultations) => {
      if (!consultations) {
        return res.status(404).json({ message: 'Aucune consultation trouvée pour ce patient' });
      }
      // Retourner les consultations trouvées
      return res.status(200).json(consultations);
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Erreur lors de la récupération des consultations', error: err });
    });
}

exports.generateOrdonnace = (req, res) => {
  const { medicaments, medecin, patient } = req.body;
  console.log('med ::: ',medicaments);
    console.log('medecin ::: ',medecin );
    console.log('patient ::: ',patient);
  const doc = new PDFDocument();
  const filePath = `../docs/ordonance_${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  const currentDate = new Date().toLocaleDateString('fr-FR');
  doc.pipe(writeStream);

  doc
    .image("./img/logo.png", 50, 45, { width: 80 })
    .fillColor("#444444")
    .fontSize(20)
    .text("SMARTH_HEALTH", 110, 70)
    .moveDown(2)
    .fontSize(12)
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`,200, 65, { align: "right" })
    .text(`${medecin.phone}`,200, 80, { align: "right" })
    .text(`${medecin.address}`,200, 95, { align: "right" })
    .text(medecin.specialite, 200, 110, { align: "right" })
    .moveDown()
    .text(`Ordonnance Médicale`, { indent: 50 })
    .text(`Date: ${currentDate}`, 200, 150, { align: "right" })
    .moveDown();

    doc.moveDown(2)
    .fontSize(12)
    .text(`Patient:`, 50)
    .text(`Nom & Prénom :${patient.firstName} ${patient.lastName}`, { indent: 50 })
    .text(`téléphone: ${patient.phone}`, { indent: 50 })
    .text(`date de naissance: ${patient.birthday}`, { indent: 50 })
    .text(`addresse: ${patient.address}`, { indent: 50 })
    .moveDown(2);

  const table = {
    headers: ["Name of Medicament", "Nombre de prise par jour", "Période", "Commentaire"],
    rows: [],
    options: {
      width: 500,
      align: 'left',
      fontSize: 12
    }
  };

  // Add the medications to the table
  for (const med of medicaments) {
    table.rows.push([med.medicament, med.nbPrise, med.periode, med.comment]);
  }

  doc.table(table, 50, 180, { width: 500 });

 

  doc.moveDown(6)
    .fontSize(12)
    .text(`Signature du médecin :`, { align: "right" })
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`,200, 420, { align: "right" })
    .moveDown(2);

  
 doc.end(); // Finalize the PDF document

  writeStream.on('finish', () => {
    res.status(200).json({ success: true, message: "Ordonnance généré avec succès", filePath });
  });

  writeStream.on('error', (err) => {
    console.error("Erreur lors de la génération du rapport:", err);
    res.status(500).json({ success: false, message: "Erreur lors de la génération du rapport" });
  });
};


exports.generateAnalyse = (req, res) => {
  const { analyses, medecin, patient } = req.body;
  const doc = new PDFDocument();
  const filePath = `../docs/analyse_${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  const currentDate = new Date().toLocaleDateString('fr-FR');
  doc.pipe(writeStream);

  // En-tête
  doc
    .image("./img/logo.png", 50, 45, { width: 80 })
    .fillColor("#444444")
    .fontSize(20)
    .text("NOM DU CABINET", 110, 70)
    .moveDown(2)
    .fontSize(12)
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`, { align: "right" })
    .text(`${medecin.phone}`, { align: "right" })
    .text(`${medecin.address}`, { align: "right" })
    .moveDown()
    .text(`Ordonnance d'Analyses Médicales`, { indent: 50 })
    .text(`Date: ${currentDate}`, { align: "right" })
    .moveDown();

  // Informations sur le patient
  doc.moveDown(2)
    .fontSize(12)
    .text(`Patient:`, 50)
    .text(`Nom & Prénom : ${patient.firstName} ${patient.lastName}`, { indent: 50 })
    .text(`Téléphone: ${patient.phone}`, { indent: 50 })
    .text(`Date de naissance: ${patient.birthday}`, { indent: 50 })
    .text(`Adresse: ${patient.address}`, { indent: 50 })
    .moveDown(2);

  // Prescription des analyses médicales
  doc.moveDown()
    .fontSize(12)
    .text(`Je soussigné, Dr. ${medecin.firstName} ${medecin.lastName}, prescris les analyses suivantes pour le diagnostic et le suivi médical du patient :`)
    .moveDown();

  for (const analyse of analyses) {
    doc.text(`- ${analyse.analyse}`, { indent: 70 });
  }

  // Instruction sur les résultats et la communication
  doc.moveDown()
    .text(`Ces analyses doivent être réalisées dans un laboratoire médical accrédité. Les résultats sont à communiquer au médecin prescripteur dans un délai raisonnable pour évaluation.`)
    .moveDown();

  // Signature du médecin
  doc.moveDown(4)
    .fontSize(12)
    .text(`Signature du médecin :`, { align: "right" })
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`, { align: "right" })
    .moveDown(2);

  doc.end(); // Finalize the PDF document

  writeStream.on('finish', () => {
    res.status(200).json({ success: true, message: "Analyse générée avec succès", filePath });
  });

  writeStream.on('error', (err) => {
    console.error("Erreur lors de la génération du rapport:", err);
    res.status(500).json({ success: false, message: "Erreur lors de la génération du rapport" });
  });
};

exports.generateScanner = (req, res) => {
  const { medecin, patient, typeScanner, indications } = req.body;
  const doc = new PDFDocument();
  const filePath = `../docs/scanner_${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  const currentDate = new Date().toLocaleDateString('fr-FR');
  doc.pipe(writeStream);

  // En-tête
  doc
    .image("./img/logo.png", 50, 45, { width: 80 })
    .fillColor("#444444")
    .fontSize(20)
    .text("NOM DU CABINET", 110, 70)
    .moveDown(2)
    .fontSize(12)
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`, { align: "right" })
    .text(`${medecin.phone}`, { align: "right" })
    .text(`${medecin.address}`, { align: "right" })
    .moveDown();

    doc.moveDown()
    .fontSize(12)
    .text(`Ordonnance pour Scanner Médical`, { align: "center" })
    .text(`Date: ${currentDate}`, { align: "right" })
    .moveDown();

  // Informations sur le patient
  doc.moveDown(2)
    .fontSize(12)
    .text(`Patient:`, 50)
    .text(`Nom & Prénom : ${patient.firstName} ${patient.lastName}`, { indent: 50 })
    .text(`Téléphone: ${patient.phone}`, { indent: 50 })
    .text(`Date de naissance: ${patient.birthday}`, { indent: 50 })
    .text(`Adresse: ${patient.address}`, { indent: 50 })
    .moveDown(2);

  // Prescription des analyses médicales
  doc.moveDown()
    .fontSize(12)
    .text(`Je soussigné, Dr. ${medecin.firstName} ${medecin.lastName}, prescris le scanner suivant pour le diagnostic et le suivi médical du patient :`)
    .moveDown();

  doc.moveDown()
    .fontSize(12)
    .text(`Type de Scanner : ${typeScanner}`, 50)
    .text(`Indications cliniques : ${indications}`, 50)
    .moveDown();

  // Instruction sur les résultats et la communication
  doc.moveDown()
    .text(`Le scanner doit être effectué dans un établissement médical approprié et les résultats sont à communiquer au médecin prescripteur dans les plus brefs délais pour évaluation.`)
    .moveDown();

  // Signature du médecin
  doc.moveDown(4)
    .fontSize(12)
    .text(`Signature du médecin :`, { align: "right" })
    .text(`Dr. ${medecin.firstName} ${medecin.lastName}`, { align: "right" })
    .moveDown(2);

  doc.end(); // Finalize the PDF document

  writeStream.on('finish', () => {
    res.status(200).json({ success: true, message: "Analyse générée avec succès", filePath });
  });

  writeStream.on('error', (err) => {
    console.error("Erreur lors de la génération du rapport:", err);
    res.status(500).json({ success: false, message: "Erreur lors de la génération du rapport" });
  });
};
