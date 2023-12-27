const express = require("express")
const router = express.Router()
const ConController = require("../controllers/consultation.controller")
const verifyJWT = require("../middleware/verifyJWT")
const multer = require("multer");
const path = require("path");
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use multer.diskStorage to specify storage destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../smart_health_front/public/documents"));
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
router.use(verifyJWT)

    router.get("/", ConController.findAll);
    router.get("/consultations", ConController.findAllConsultationDetails);
    router.post("/", ConController.addConsultation);
    router.get("/:id",ConController.findConsultation);
    router.delete("/:id", ConController.deleteConsultation);
    router.put("/:id", ConController.updateConsultation);
    router.post("/:id/documents",multer({ storage }).array("files", 5), ConController.addDocumentsToConsultation)
module.exports = router;