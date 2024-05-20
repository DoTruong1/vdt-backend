let userRoutes = require('express').Router();



const userController = require("../controllers/user.controller")

userRoutes.get("/", userController.getUsers)
userRoutes.get("/:userID", userController.getUser)

userRoutes.post("/", userController.createUser)
// update user info
userRoutes.put("/:userID", userController.updateUserInfo)
// delete user with matching id
userRoutes.delete("/:userID", userController.deleteUser)
/* GET users listing. */

module.exports = userRoutes;
