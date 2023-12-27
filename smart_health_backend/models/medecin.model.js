const mongoose = require('mongoose')

module.exports = mongoose.model('Medecin', {
    firstName: { type: String},
    lastName: { type: String},
    phone: { type: String},
    address: { type: String},
    specialite: {type: String},
    image:{type:String},
    id_compte: {
        type: mongoose.Types.ObjectId, ref: "Compte"
    }
    })
