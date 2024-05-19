const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const database = require("./sequelize");
const models = require("./models");

const routers = require("./routes");
require("dotenv").config();

var corsOptions = {
  origin: process.env.COR_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(cookieParser());

const port = 3000;

const initApp = async () => {
  console.log("Kiểm tra kết nối đến cơ sở dữ liệu..");

  // Test the connection.
  // You can use the .authenticate() function to test if the connection works.

  try {
    await database.authenticate();
    console.log("Kết nối đến cơ sở dữ liệu thành công.");

    // Syncronize the Book model.
    models.User.sync({ alter: true });
    console.log("Kết nối đến cơ sở dữ liệu thành công.");

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/v1", routers);

    // Start the web server on the specified port.
    app.listen(port, () => {
      console.log(`Khởi tạo server ở: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Có lỗi khi kết nối đến cơ sở dữ liệu:", error.original);
  }
};

initApp();
