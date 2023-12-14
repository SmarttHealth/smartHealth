const mongoose = require('mongoose')

module.exports = mongoose.model('Assistant', {
    firstName: { type: String},
    lastName: { type: String},
    phone: { type: String},
    address: { type: String},
    specialite: {type: String},
    id_compte: {
        type: mongoose.Types.ObjectId, ref: "Compte"
    }
})
