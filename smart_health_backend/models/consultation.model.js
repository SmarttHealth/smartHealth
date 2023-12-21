const mongoose = require("mongoose")

module.exports = mongoose.model("Consultation", {
    id_patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
    id_medecin: { type: mongoose.Types.ObjectId, ref: "Medecin"},
    date_creation: { type: Date},
    heure_creation: {type: String},
    etat: {type: String},
    documents: [{ type: String}]
})