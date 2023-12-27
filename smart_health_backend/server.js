const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const connectDb = require("./models/db")
const cookieParser = require('cookie-parser');
const path = require('path');

const PatientRoutes = require("./routes/patient.routes")
const MedecinRoutes = require("./routes/medecin.routes")
const AssistantRoutes = require("./routes/assistant.routes")
const ServiceRoutes = require("./routes/service.routes")
const CompteRoutes = require("./routes/compte.routes")
const RDVRoutes = require("./routes/RDV.routes")
const ConsultationRoutes = require("./routes/consultation.routes")

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/users/patient', PatientRoutes)
app.use('/api/users/medecin', MedecinRoutes)
app.use('/api/users/assistant', AssistantRoutes)
app.use('/api/service', ServiceRoutes)
app.use('/api/users', CompteRoutes)
app.use('/api/RDV', RDVRoutes)
app.use('/api/consultation', ConsultationRoutes)
// Serve static files from the '../../smart_health_front/public' directory
app.use('/public', express.static(path.join(__dirname, '../../smart_health_front/public')));

connectDb()
    .then(()=>{
        console.log("db connection succeeded");
        app.listen(8082, ()=>{console.log('server started at 8082 !!');})
    })
    .catch(err => console.log(err))
