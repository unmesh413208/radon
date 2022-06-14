const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",auth.validateUserIdInPathParem,auth.tokenVerification,userController.getUserData)

router.put("/users/:userId",auth.validateUserIdInPathParem,auth.tokenVerification,userController.updateUser)

router.delete("/users/:userId", auth.validateUserIdInPathParem,auth.tokenVerification,userController.deleteUser)

module.exports = router;