const express = require("express")
const router = express.Router()
const MedecinController = require("../controllers/medecin.controller")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//router.use(verifyJWT)

    router.get("/", MedecinController.findAll);
    router.post("/", MedecinController.addUser);
    router.get("/:id",MedecinController.findUser);
    router.delete("/:id", MedecinController.deleteUser);
    router.put("/:id", MedecinController.updateUser);
module.exports = router;