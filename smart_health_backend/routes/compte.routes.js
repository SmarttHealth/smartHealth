const express = require("express")
const router = express.Router()
const CompteController = require("../controllers/compte.controller")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
   
    router.post("/login", CompteController.login);
    router.post("/logout", CompteController.logout);
    router.get("/refresh", CompteController.refresh);
    router.put("/activate", CompteController.activateAccount);

module.exports = router;