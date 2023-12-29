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

exports.addRDV = async (req, res) => {
  console.log("rendez-vous en cours de création...");
  try {
      if (!req.body) {
          return res.status(400).json({
              error: 'Données utilisateur manquantes',
          });
      }

      const { id_medecin, date_RDV, Heure_debut_RDV, Heure_fin_RDV } = req.body;

      // Vérification de la disponibilité
      const existingRDV = await RDV.findOne({
          id_medecin,
          date_RDV,
          $or: [
              { $and: [{ Heure_debut_RDV: { $lte: Heure_debut_RDV } }, { Heure_fin_RDV: { $gte: Heure_debut_RDV } }] },
              { $and: [{ Heure_debut_RDV: { $lte: Heure_fin_RDV } }, { Heure_fin_RDV: { $gte: Heure_fin_RDV } }] },
              { $and: [{ Heure_debut_RDV: { $gte: Heure_debut_RDV } }, { Heure_fin_RDV: { $lte: Heure_fin_RDV } }] },
          ],
      });

      if (existingRDV) {
          return res.status(200).json({
              available: false,
              message: 'Le médecin n\'est pas disponible à cette date et heure.',
          });
      }

      // Si le médecin est disponible, créer le rendez-vous
      const newRDV = await RDV.create(req.body);
      res.status(201).json(newRDV);
  } catch (err) {
      console.error('Erreur lors de l\'ajout du rendez-vous:', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du rendez-vous' });
  }
};

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

exports.deleteRDV = (req, res) => {
  if (!ObejectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'Given Object ID is not valid: ' + req.params.id
    });
  } else {
    RDV.findByIdAndDelete(req.params.id)
      .then(data => {
        console.log("Rendez-vous supprimé avec succès");
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
};

exports.checkAvailability = async (req, res) => {
    try {
      const { medecinId, date_RDV, heureDebut, heureFin } = req.body;
  
      const existingRDV = await RDV.findOne({
        id_medecin: medecinId,
        date_RDV,
        $or: [
          {
            $and: [
              { Heure_debut_RDV: { $lte: heureDebut } },
              { Heure_fin_RDV: { $gte: heureDebut } },
            ],
          },
          {
            $and: [
              { Heure_debut_RDV: { $lte: heureFin } },
              { Heure_fin_RDV: { $gte: heureFin } },
            ],
          },
          {
            $and: [
              { Heure_debut_RDV: { $gte: heureDebut } },
              { Heure_fin_RDV: { $lte: heureFin } },
            ],
          },
        ],
      });
  
      if (existingRDV) {
    
        res.status(200).json({ available: false, message: 'Le médecin n\'est pas disponible à cette date et heure.' });
      } else {
        // Aucun rendez-vous existant trouvé, le médecin est disponible
        res.status(200).json({ available: true, message: 'Le médecin est disponible à cette date et heure.' });
      }
    } catch (err) {
      console.error('Erreur lors de la vérification de la disponibilité du médecin:', err);
      res.status(500).json({ error: 'Erreur lors de la vérification de la disponibilité du médecin' });
    }

}

/*
exports.getPatientsWithAppointmentsToday = async (req, res) =>{
    try {
        const { id_medecin } = req.params;
        // Récupérer la date d'aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        // Requête pour obtenir les RDV d'aujourd'hui
        const appointmentsToday = await RDV.find({
          date_RDV: {
            $gte: today, 
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) 
          },
          id_medecin: id_medecin
        }).populate('id_patient'); // Populate pour obtenir les détails des patients associés aux RDV
  
        // Nombre de patients ayant un RDV aujourd'hui
        const numberOfPatientsToday = appointmentsToday.length;
  
        // Liste des patients ayant un RDV aujourd'hui
        const patientsList = appointmentsToday.map(appointment => ({
          patient: appointment.id_patient,
          date_RDV: appointment.date_RDV,
          heure_debut_RDV: appointment.Heure_debut_RDV,
          heure_fin_RDV: appointment.Heure_fin_RDV,
          etat: appointment.etat
        }));
  
        // Envoyer la réponse avec le nombre et la liste des patients
        return res.status(200).json({
          numberOfPatientsToday,
          patientsList
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des RDV' });
      }
}
*/

exports.getPatientsWithAppointmentsTodayByStatus = async (req, res) =>{
    try {
        const { id_medecin, etat } = req.params;
        // Récupérer la date d'aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let appointmentsToday = [];

        if(etat === "any"){
            // Requête pour obtenir les RDV d'aujourd'hui
           appointmentsToday = await RDV.find({
            date_RDV: {
              $gte: today, 
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) 
            },
            id_medecin: id_medecin
          }).populate('id_patient'); 
        }else{
            // Requête pour obtenir les RDV d'aujourd'hui
             appointmentsToday = await RDV.find({
              date_RDV: {
                $gte: today, 
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) 
              },
              id_medecin: id_medecin,
              etat: etat
            }).populate('id_patient'); 
        }

        // Nombre de patients ayant un RDV aujourd'hui
        const numberOfPatientsToday = appointmentsToday.length;
        // Liste des patients ayant un RDV aujourd'hui
        const patientsList = appointmentsToday.map(appointment => ({
          patient: appointment.id_patient,
          date_RDV: appointment.date_RDV,
          heure_debut_RDV: appointment.Heure_debut_RDV,
          heure_fin_RDV: appointment.Heure_fin_RDV,
          etat: appointment.etat
        }));
  
        // Envoyer la réponse avec le nombre et la liste des patients
        return res.status(200).json({
          numberOfPatientsToday,
          patientsList
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des RDV' });
      }
}

  };
  exports.getRdvByPatientId = async (req, res) => {
    
    try {
      // Récupérez l'ID du patient depuis les paramètres de la requête
      const patientId = req.params.id;
      console.log("id patient",req.params.id);
      // Vérifiez si le patient existe
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Récupérez les rendez-vous du patient
      const rdvs = await RDV.find({ id_patient: patientId });
      console.log('Rendez-vous:', rdvs);
  
      // Retournez les rendez-vous
      res.status(200).json(rdvs);
    } catch (error) {
      console.error('Error fetching rdvs by patient ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  exports.getRdvCountByPatientId = async (req, res) => {
    try {
      // Récupérez l'ID du patient depuis les paramètres de la requête
      const patientId = req.params.id;
  
      
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      
      const rdvCount = await RDV.countDocuments({ id_patient: patientId });
  
      
      res.status(200).json({ rdvCount });
    } catch (error) {
      console.error('Error fetching rdv count by patient ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

