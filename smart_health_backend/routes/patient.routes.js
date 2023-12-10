const express = require("express")
const router = express.Router()
const PatientController = require("../controllers/patient.controller")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

    router.get("/", PatientController.findAll);
    router.post("/", PatientController.addUser);
    router.get("/:id",PatientController.findUser);
    router.delete("/:id", PatientController.deleteUser);
    router.put("/:id", PatientController.updateUser);
module.exports = router;