const mongoose = require("mongoose")

module.exports = mongoose.model("RDV",{
    type: { type: String},
    date_RDV: { type: Date},
    Heure_debut_RDV: { type: String},
    Heure_fin_RDV: { type: String},
    etat: { type: String, default: 'Create' },
    id_patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
    id_medecin: { type: mongoose.Types.ObjectId, ref: "Medecin"}
})