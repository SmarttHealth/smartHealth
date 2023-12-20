const mongoose = require("mongoose")

module.exports = mongoose.model("Service", {
    nameService: { type: String},
    descService: { type: String},
    medecins: [{_id:{
        type: mongoose.Types.ObjectId, ref: "Medecin"
    }}]
})