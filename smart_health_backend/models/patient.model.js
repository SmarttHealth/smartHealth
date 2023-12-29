const mongoose = require('mongoose')



module.exports = mongoose.model('Patient', {
    firstName: { type: String},
    lastName: { type: String},
    phone: { type: String},
    address: { type: String},
    birthday: {type: Date},
    image:{type:String},
    id_compte: {
        type: mongoose.Types.ObjectId, ref: "Compte"
    }
    })
