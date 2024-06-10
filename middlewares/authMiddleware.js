const Keycloak = require("keycloak-connect");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const keycloak = require("../config/keycloak");

const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    if (req.headers.authorization) {
      keycloak.grantManager
        .validateAccessToken(token)
        .then((result) => {
          req.tokenInfo = result;
          if (result === false) {
            res.status(401).json({
              message: "Secret Token Invalid",
              authendication: "Unauthorized",
            });
          } else {
            const decoded = Jwt.decode(result);
            req.tokenData = decoded;
            next();
          }
        })
        .catch((err) => {
          // Token is invalid
          res.status(403).json({ error: "Token không hợp lệ", details: err });
        });
    } else {
      // there is no token, don't process request further
      res.status(401).json({
        message: "Token is required",
        authendication: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  authMiddleware,
};
