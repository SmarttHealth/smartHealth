const mongoose = require("mongoose")

module.exports = mongoose.model("Traitement", {
    content: { type: String},
})