const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")

    router.get("/", userController.findAll);
    router.post("/", userController.addUser);
    router.get("/:id",userController.findByIdUser);
    router.delete("/:id", userController.deleteUser);
    router.post("/signin", userController.login);

module.exports = router;