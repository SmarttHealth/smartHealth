const mongoose = require('mongoose')

module.exports = mongoose.model('Users', {
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    phone: { type: String},
    address: { type: String},
    password: { type: String}
    
    })
