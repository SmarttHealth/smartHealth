const express = require("express")
const router = express.Router()
const ConController = require("../controllers/consultation.controller")
const verifyJWT = require("../middleware/verifyJWT")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//router.use(verifyJWT)

    router.get("/", ConController.findAll);
    router.post("/", ConController.addConsultation);
    router.get("/:id",ConController.findConsultation);
    router.delete("/:id", ConController.deleteConsultation);
    router.put("/:id", ConController.updateConsultation);
    router.post("/:id/documents", ConController.addDocumentsToConsultation)
module.exports = router;