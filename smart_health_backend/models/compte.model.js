const mongoose = require("mongoose");

module.exports = mongoose.model(
    "Compte",{
                email: {type: String},
                password: {type: String},
                active: {type: Boolean, 
                           default: true 
                        },
                role: {type: String}
            })