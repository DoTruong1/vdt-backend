let userRoutes = require("express").Router();
const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const keycloak = require("../config/keycloak");

userRoutes.get(
  "/",
  keycloak.enforcer(["users:get"], {
    resource_server_id: "vdt-be",
  }),
  userController.getUsers,
);
userRoutes.get(
  "/:userID",
  keycloak.enforcer(["users:get"], {
    resource_server_id: "vdt-be",
  }),
  userController.getUser,
);

userRoutes.post(
  "/",
  keycloak.enforcer(["users:create"], {
    resource_server_id: "vdt-be",
  }),
  userController.createUser,
);
// update user info
userRoutes.put(
  "/:userID",
  keycloak.enforcer(["users:update"], {
    resource_server_id: "vdt-be",
  }),
  userController.updateUserInfo,
);
// delete user with matching id
userRoutes.delete(
  "/:userID",
  keycloak.enforcer(["users:delete"], {
    resource_server_id: "vdt-be",
  }),
  userController.deleteUser,
);
/* GET users listing. */

module.exports = userRoutes;
