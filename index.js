const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db_conn = require("./config/connect.database");
// const { User } = require("./models");

const routers = require("./routes");
require("dotenv").config();

// var corsOptions = {
//   origin: process.env.COR_ORIGIN,
// };
// Cache me baby
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(cookieParser());
// app.use(bodyParser.json())
// app.use(cookieParser());

const port = process.env.PORT || 3000;

const initApp = async () => {
  console.log("Kiểm tra kết nối đến cơ sở dữ liệu..");

  // Test the connection.
  // You can use the .authenticate() function to test if the connection works.

  try {
    await db_conn.dbConnect()
    // if (isConnectedToDB) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(process.env.API_PATH, routers);

    // Start the web server on the specified port.
    app.listen(port, () => {
      console.log(`Khởi tạo server ở: http://localhost:${port}`);
    });
    // } else {
    //   console.error("Có lỗi xảy ra khi kết nối đến db")
    // }


  } catch (error) {
    console.error("Có lỗi khi khởi tạo ứng dụng", error);
    process.exit(1);

  }
};

initApp();

module.exports = app