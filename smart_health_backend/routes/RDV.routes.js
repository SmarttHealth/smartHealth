const express = require("express")
const router = express.Router()
const RDVController = require("../controllers/RDV.controller")
const verifyJWT = require("../middleware/verifyJWT")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(verifyJWT)

    router.get("/", RDVController.findAll);
    router.get("/rdvs", RDVController.findAllRDVDetails);
    router.post("/", RDVController.addRDV);
    router.get("/:id",RDVController.findRDV);
    router.delete("/:id", RDVController.deleteRDV);
    router.put("/:id", RDVController.updateRDV);
    router.get("/medecin/:id_medecin/etat/:etat", RDVController.getPatientsWithAppointmentsTodayByStatus);
    router.get("/exitingRdv",RDVController.checkAvailability);
    router.get("/rdvPatient/:id",RDVController.getRdvByPatientId);
    router.get("/countRDV/:id",RDVController.getRdvCountByPatientId);
module.exports = router;