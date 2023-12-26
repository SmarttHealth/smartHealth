const express = require("express")
const router = express.Router()
const AssistantController = require("../controllers/assistant.controller")
const verifyJWT= require("../middleware/verifyJWT")

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(verifyJWT)

    router.get("/", AssistantController.findAll);
    router.post("/", AssistantController.addUser);
    router.get("/:id",AssistantController.findUser);
    router.delete("/:id", AssistantController.deleteUser);
    router.put("/:id", AssistantController.updateUser);
module.exports = router;