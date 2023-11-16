const mongoose = require('mongoose')
const dbConfig = require("../config/db.config")

const dbUri = dbConfig.uri;
module.exports= () => {
   return mongoose.connect(dbUri, 
    )
}