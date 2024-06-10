const Keycloak = require("keycloak-connect");

const dotenv = require("dotenv").config();

const keycloakConfig = {
  clientId: `${process.env.KEYCLOAK_CLIENT}`,
  bearerOnly: true,
  serverUrl: `${process.env.KEYCLOAK_URL}`,
  realm: `${process.env.KEYCLOAK_REALM}`,
  credentials: {
    secret: `${process.env.KEYCLOAK_CLIENT_SEC}`,
  },
};
const keycloak = new Keycloak({}, keycloakConfig);
module.exports = keycloak;
