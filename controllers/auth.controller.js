const { resource } = require("..");
const keycloak = require("../config/keycloak");

const authLogin = async (req, res) => {
  try {
    const { email_id, user_password } = req.body;
    const username = email_id;
    const password = user_password;
    await keycloak.grantManager
      .obtainDirectly(username, password)
      .then((grant) => {
        res.json({
          message: "User Login Successful",
          status: true,
          access_token: grant.access_token.token,
          refresh_token: grant.refresh_token.token,
          user_id: grant.access_token.content.sub,
          role: grant.access_token.content?.realm_access?.roles,
          resource_access: grant.access_token.content?.resource_access,
        });
      })
      .catch((err) => {
        // Error occurred during authentication
        console.error("Authentication error:", err);
        res.status(403).json({
          message: "Authentication failed",
          status: false,
          access_token: null,
          refresh_token: null,
          user_id: null,
        });
      });
  } catch (error) {
    console.log("Error Occurred in User Login : ", error);
    res.status(500).json({
      message: "Internal Server error",
      status: false,
      access_token: null,
      refresh_token: null,
      user_id: null,
    });
  }
};

module.exports = {
  authLogin,
};
