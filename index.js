const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db_conn = require("./config/connect.database");
const heatlthCheckRouters = require("./routes/healthCheck.route")
// const { User } = require("./models");

const routers = require("./routes");
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

const initApp = async () => {
  console.log("Kiểm tra kết nối đến cơ sở dữ liệu..");



  try {
    await db_conn.dbConnect()
    // if (isConnectedToDB) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    heatlthCheckRouters.get('/healthz', async (_req, res, _next) => {

      const healthcheck = {
          uptime: process.uptime(),
          message: 'OK',
          timestamp: Date.now()
      };
      try {
          res.send(healthcheck);
      } catch (error) {
          healthcheck.message = error;
          res.status(503).send();
      }
    });

    app.use(process.env.API_PATH, routers);

    app.listen(port, () => {
      console.log(`Khởi tạo server ở: http://localhost:${port}`);
    });



  } catch (error) {
    console.error("Có lỗi khi khởi tạo ứng dụng", error);
    process.exit(1);

  }
};

initApp();

module.exports = app
