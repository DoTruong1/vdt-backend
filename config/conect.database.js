const AllModels = require('../models');


exports.dbConnect = async () => {

  await AllModels.sequelize.authenticate().then(() => {
    console.info("kết nối đến cơ sở dữ liệu thành không");
  }).catch((err) => {
    console.error("Có lỗi khi kết nối đến cơ sở dữ liệu", err.message);
  });
};

exports.dbDisconnect = async () => {

  await AllModels.sequelize.close().then(() => {
    console.info("Ngắt kết nốt đến cơ sở dữ liệu")
  });
};