const express = require("express")
const router = express.Router()
const ServiceController = require("../controllers/service.controller")
const verifyJWT = require("../middleware/verifyJWT")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//router.use(verifyJWT)

    router.get("/", ServiceController.findAll);
    router.post("/", ServiceController.addService);
    router.get("/:id",ServiceController.findService);
    router.delete("/:id", ServiceController.deleteService);
    router.put("/:id", ServiceController.updateService);
    router.get('/:id/doctors', ServiceController.findDoctorsForService);
module.exports = router;