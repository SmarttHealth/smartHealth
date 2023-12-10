const mongoose = require("mongoose")

module.exports = mongoose.model("Service", {
    nameService: { type: String},
    descService: { type: String}
})