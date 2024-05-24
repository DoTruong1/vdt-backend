const AllModels = require('../models');


exports.dbConnect = async () => {

  await AllModels.sequelize.authenticate().then(async () => {
    console.info("kết nối đến cơ sở dữ liệu thành không");

    console.info("Sync database.....")
    await AllModels.sequelize.sync({ alter: true }).then(() => {
      console.info("Sync database thành công")
      // return true
    }).catch((err) => {
      console.error("Có lỗi khi Sync database: ", err.message);
      // return false
    });

  }).catch((err) => {
    console.error("Có lỗi khi kết nối đến cơ sở dữ liệu", err.message);
  });
};

exports.dbDisconnect = async () => {

  await AllModels.sequelize.close().then(() => {
    console.info("Ngắt kết nốt đến cơ sở dữ liệu")
  });
};