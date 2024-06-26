const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const promMid = require("express-prometheus-middleware");
const app = express();
const morgan = require("morgan");
const json = require("morgan-json");
const moment = require("moment-timezone");
const db_conn = require("./config/connect.database");
const heatlthCheckRouters = require("./routes/healthCheck.route");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const keyCloakConfig = require("./config/keycloak");
// const { User } = require("./models");

const routers = require("./routes");

const keycloak = new Keycloak({}, keyCloakConfig);

require("dotenv").config();
const port = process.env.PORT || 3000;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const initApp = async () => {
  console.log("Kiểm tra kết nối đến cơ sở dữ liệu..");

  try {
    await db_conn.dbConnect();
    // if (isConnectedToDB) {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      keycloak.middleware({
        logout: "/logout",
        admin: "/",
      }),
    );
    app.use(express.json());
    morgan.token("date", function () {
      return moment().tz("Asia/Ho_Chi_Minh").format("DD/MMM/YYYY:HH:mm:ss ZZ");
    });

    app.use(
      morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
      ),
    );

    app.use(
      promMid({
        metricsPath: "/metrics",
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        prefix: "vdt_backend_",
        /**
         * Uncomenting the `authenticate` callback will make the `metricsPath` route
         * require authentication. This authentication callback can make a simple
         * basic auth test, or even query a remote server to validate access.
         * To access /metrics you could do:
         * curl -X GET user:password@localhost:9091/metrics
         */
        // authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
        /**
         * Uncommenting the `extraMasks` config will use the list of regexes to
         * reformat URL path names and replace the values found with a placeholder value
         */
        // extraMasks: [/..:..:..:..:..:../],
        /**
         * The prefix option will cause all metrics to have the given prefix.
         * E.g.: `app_prefix_http_requests_total`
         */
        // prefix: 'app_prefix_',
        /**
         * Can add custom labels with customLabels and transformLabels options
         */
        // customLabels: ['contentType'],
        // transformLabels(labels, req) {
        //   // eslint-disable-next-line no-param-reassign
        //   labels.contentType = req.headers['content-type'];
        // },
      }),
    );
    app.use("/healthz", heatlthCheckRouters);

    app.use(process.env.API_PATH, routers);

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization",
      );
      next();
    });

    app.listen(port, () => {
      console.log(`Khởi tạo server ở: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Có lỗi khi khởi tạo ứng dụng", error);
    process.exit(1);
  }
};

initApp();

module.exports = app;
