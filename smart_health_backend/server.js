const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const connectDb = require("./models/db")
const cookieParser = require('cookie-parser');

const PatientRoutes = require("./routes/patient.routes")
const MedecinRoutes = require("./routes/medecin.routes")
const AssistantRoutes = require("./routes/assistant.routes")
const ServiceRoutes = require("./routes/service.routes")
const CompteRoutes = require("./routes/compte.routes")

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/users/patient', PatientRoutes)
app.use('/api/users/medecin', MedecinRoutes)
app.use('/api/users/assistant', AssistantRoutes)
app.use('/api/service', ServiceRoutes)
app.use('/api/users', CompteRoutes)
connectDb()
    .then(()=>{
        console.log("db connection succeeded");
        app.listen(8082, ()=>{console.log('server started at 8082 !!');})
    })
    .catch(err => console.log(err))
